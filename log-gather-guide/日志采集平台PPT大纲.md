# 日志采集平台 PPT 大纲

## 基本信息

- **汇报时长**：15-20 分钟
- **页数**：17 页
- **受众**：领导层 + 技术团队
- **主线**：技术架构驱动，从整体到细节，从核心到扩展

---

## 第一部分：概览与架构总览（P1-P4）

### P1 - 封面

- 日志采集平台 — 架构设计与技术实践
- 副标题：多源采集 · 规则驱动 · 插件化扩展

### P2 - 平台定位与解决的问题

- 异构日志源需要统一接入（Kafka / Syslog）
- 日志格式千差万别 → 规则驱动的可配置解析
- 不同业务场景不同处理逻辑 → 插件化扩展机制
- 运维需要可视化管理 → 统一管理界面

### P3 - 三模块关系全景

```
gather-manage（管理界面，Vue3 + Element Plus）
    │ Feign 调用管理接口
gather-adapter（核心引擎，采集→解析→富化→输出）
    │ 继承/扩展 AbstractCustomDeal 等
gather-adapter-ddos（DDoS 防护日志采集实例）
```

### P4 - 整体技术架构

- 数据流三层：
  - **采集层**：Kafka Consumer / Syslog Server (Netty UDP)
  - **处理层**：规则匹配 → 字段提取 → 脚本加工 → 资产富化 → 丢弃过滤 → 自定义处理
  - **输出层**：目标 Kafka / 通知 / 持久化
- 标注每层核心类和接口

---

## 第二部分：核心引擎深挖（P5-P9）

### P5 - 采集层：双源接入

- **统一接口 LogServer**：start / stop / isStart / isStop / ruleBoxSet / monitor
- **ServerFactory 工厂**：根据 `collectSourceWay` 创建 KafkaServer 或 SyslogServer
- **KafkaServer**：MessageHandler 多线程并发消费，Consumer/Producer 动态初始化
- **SyslogServer**：Netty UDP NioDatagramChannel，CompletableFuture 异步启动，ChannelOption 可配
- 热更新：`ruleBoxSet()` 触发规则重载 + Consumer/Producer 重建

### P6 - 处理层：一条日志的完整旅程

数据流（`DefaultCommonDeal.deal()`）：

1. 正则字段提取（LogField.regex → Pattern → Matcher）
2. 脚本二次加工（ScriptService.execute，支持 Python/JS）
3. 占位符模板填充（StrUtils.replacePlaceHolders）
4. 资产富化（ResourceRich.rich）
5. 丢弃过滤（ChainRule + 时间段窗口）
6. 自定义消息消费（CustomDealFacade.consume）
7. 输出到目标 Kafka（KafkaTemplate.send）

### P7 - 规则引擎：三层规则模型

- **RuleBox** 聚合三种规则：
  - ServerRuleEntity：采集源类型、端口、匹配策略（matchWay/regex/script）、丢弃策略、调试开关
  - LogRuleEntity：正则模板、格式模板、富化开关、关联字段
  - KafkaRuleEntity：源/目标 Kafka 连接与消费/生产参数
- 规则热更新：`ruleBoxSet()` → Server 动态切换，无需重启
- 匹配策略三选一，按 logRule.id 映射

### P8 - 日志解析规则详解

- **LogField** 字段模型：name + regex + scriptType + scriptContent
- 多字段依次正则匹配，捕获组拼接为字段值
- 脚本扩展点：对提取后的值做二次加工
- 管理界面可在线脚本测试（`/script/test`）

### P9 - 资产富化与丢弃过滤

- **ResourceRich 接口**：`rich(RuleBox, MatchLogRule, Map data)` → 新 formatTemplate
  - 典型实现：IP 反查归属（ResourceRichByIp）
  - ResourceRichFacade（OptionalFacade 模式）支持多实现
- **丢弃过滤**：ChainRule 规则引擎 + 时间段窗口（discardTimeArray）
  - 调试模式可观察丢弃详情

---

## 第三部分：扩展机制与实践（P10-P13）

### P10 - 插件化扩展：CustomDeal 机制

- **CustomDeal\<T\> 接口**：`consume(T msg, String origin)`，消费解析后的结构化消息
- **AbstractCustomDeal\<T\> 基类**：
  - 内置内存队列（有界 ArrayBlockingQueue / 无界 LinkedBlockingQueue，按规则可配）
  - 单线程/多线程消费模式
  - 实现 `consumeAsync(T msg)` 完成自定义业务逻辑
  - 优雅关闭：destroy 时 drain 队列残留 + 打印未处理消息
- **CustomDealFacade**（OptionalFacade）：按 getKey 路由到匹配的扩展实现

### P11 - DDoS 实例：扩展全景

- 项目如何复用核心引擎：

```
gather-adapter（核心引擎）
    ↓ 依赖，继承 AbstractCustomDeal
gather-adapter-ddos
    ↓ 实现多种 CustomDeal
TrafficCleanDeal        CloudInnerBlackHoleDeal
QingxiDeal              AlarmDeal
```

- 同时扩展 ResourceRich：DeviceRichImpl
- 扩展定时任务：IpStateCheckTask

### P12 - DDoS 实例：TrafficCleanDeal 业务流

从日志到通知的完整链路：

1. Kafka 接收流量清洗汇总日志
2. 核心引擎解析 → 提取 destIp、poolId、zoneName 等字段
3. `consumeAsync` 触发：
   - 去重判断（notifiedCache）
   - 云网接口查用户ID
   - 内循环IP匹配 → 自有产品通知
   - 关联客户通知（短信+邮件，MessageCenterService）
4. 保存清洗记录 + 通知历史

`getKey()` 返回 "log-189"，与采集规则中 LogRule 名称匹配

### P13 - DDoS 实例：其他消息处理

- **CloudInnerBlackHoleDeal**：云内黑洞事件处理
- **QingxiDeal**：清洗事件处理
- **AlarmDeal**：告警事件处理
- 每个 Deal 对应一种日志类型，通过 `getKey()` 路由

---

## 第四部分：管理与收尾（P14-P17）

### P14 - 管理界面：功能总览

- 架构：`gather-manage` 通过 Feign 调用 `gather-adapter` 管理接口
- 前端：Vue3 + Element Plus + TypeScript
- 核心页面：
  - 日志解析规则管理 — CRUD + 导入导出 + 启停 + 字段配置 + 脚本测试
  - 服务采集规则管理 — 采集实例启停 + 在线匹配测试
  - Kafka 配置管理 — Topic / Offset 管理
  - 客户端管理 — 在线实例监控

### P15 - 管理界面：规则配置工作流

一条采集规则的完整配置路径：

1. 配置 Kafka 源/目标连接
2. 创建日志解析规则（正则 + 字段 + 脚本）
3. 创建服务采集规则（关联 Kafka + 日志规则 + 匹配策略）
4. 启动采集实例（管理界面一键启停）
5. 在线匹配测试验证规则正确性

支持 Excel 批量导入/导出

### P16 - 平台技术亮点总结

- **多源接入**：Kafka + Syslog，统一 LogServer 接口，工厂模式创建
- **规则驱动**：ServerRule → LogRule → LogField 三层模型，正则/脚本灵活组合
- **插件化扩展**：CustomDeal + ResourceRich 双扩展点，OptionalFacade 模式路由
- **热更新**：规则变更不重启，ruleBoxSet 通知即生效
- **可管理**：完整前端管理界面，Excel 导入导出，在线规则测试

### P17 - 总结与展望

- 已支撑场景：DDoS 防护（流量清洗、黑洞、告警等）
- 可扩展方向：WAF 日志、CDN 日志、业务审计日志、更多协议支持
- 能力展望：流式处理、告警规则引擎、可视化大屏
