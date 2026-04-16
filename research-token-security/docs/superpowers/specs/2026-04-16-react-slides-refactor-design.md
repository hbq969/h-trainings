# AI Token API 网关安全研究报告 - React 幻灯片重构设计

## 背景

现有 `slides-compact.html` 存在以下问题：
1. 部分页面内容超出可视区域，被章节标注和底部翻页标注遮挡
2. 页面布局不协调（Chapter 01、03、04、05、10 等章节）
3. 表格风格不统一（蓝色表头/黑色表头混用）

## 目标

使用 React + Ant Design 重构，解决布局问题，统一视觉风格，最终构建为单个 HTML 文件。

## 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Vite | 5.x | 构建工具 |
| React | 18.x | UI 框架 |
| TypeScript | 5.x | 类型安全 |
| Ant Design | 5.x | UI 组件库 |
| vite-plugin-singlefile | — | 输出单文件 HTML |

## 核心功能

### 1. 翻页导航
- 键盘方向键（↑↓ 或 ←→）
- 点击导航点
- 滚动切换
- 触摸滑动（移动端）

### 2. 章节导航
- 左侧抽屉式目录
- 点击跳转到指定章节
- 高亮当前章节
- 显示章节进度

### 3. 进度指示
- 当前页码 / 总页数
- 进度条可视化
- 章节内页码

### 4. 全屏模式
- 全屏按钮切换
- ESC 退出全屏
- 全屏时隐藏导航

### 5. PDF 导出
- 打印样式优化
- 分页控制
- 页眉页脚

## 页面布局设计

### 视口边界

```
┌─────────────────────────────────────────────┐
│  ChapterIndicator (固定 40px)               │  ← 顶部章节标注
├─────────────────────────────────────────────┤
│                                             │
│                                             │
│              内容区域                        │  ← 固定高度，内容不溢出
│         (100vh - 40px - 50px)               │
│                                             │
│                                             │
├─────────────────────────────────────────────┤
│  PageIndicator (固定 50px)                  │  ← 底部翻页/进度
└─────────────────────────────────────────────┘
```

### 内容溢出处理策略

| 内容类型 | 处理组件 | 适用场景 |
|----------|----------|----------|
| 表格（行数 > 10） | ScrollableTable | 表头固定，内容滚动 |
| 并列内容（> 4 项） | TabbedContent | 标签页切换 |
| 详细说明 | CollapsibleSection | 折叠面板 |
| 流程步骤 | CarouselSteps | 走马灯轮播 |
| 默认内容 | CompactGrid | 网格布局 |

## 组件架构

### 目录结构

```
src/
├── main.tsx                    # 入口
├── App.tsx                     # 主应用
├── index.css                   # 全局样式
├── components/
│   ├── SlideContainer/         # 幻灯片容器（翻页逻辑）
│   ├── ChapterNav/             # 左侧章节导航
│   ├── PageIndicator/          # 底部页码/进度
│   ├── ChapterIndicator/       # 顶部章节标注
│   ├── FullscreenButton/       # 全屏按钮
│   ├── ExportPDF/              # PDF 导出
│   ├── CoverSlide/             # 封面页模板
│   ├── ChapterTitleSlide/      # 章节标题页模板
│   ├── ContentSlide/           # 内容页模板（固定边界）
│   └── shared/
│       ├── ScrollableTable/    # 内部滚动表格
│       ├── TabbedContent/      # 标签页内容
│       ├── CollapsibleSection/ # 折叠面板
│       └── CarouselSteps/      # 走马灯步骤
├── slides/
│   ├── index.ts                # 幻灯片注册
│   ├── Cover/                  # 封面
│   ├── Chapter01/              # 执行摘要
│   ├── Chapter02/              # 行业背景
│   ├── Chapter03/              # 安全威胁分析
│   ├── Chapter04/              # 认证与访问控制
│   ├── Chapter05/              # 数据安全
│   ├── Chapter06/              # 内容安全防护
│   ├── Chapter07/              # 模型滥用防护
│   ├── Chapter08/              # 合规性设计
│   ├── Chapter09/              # 成本控制与计费
│   ├── Chapter10/              # 高可用架构
│   ├── Chapter11/              # 实施方案
│   └── Chapter12/              # 结论与建议
└── hooks/
    ├── useSlideNavigation.ts   # 翻页逻辑
    ├── useFullscreen.ts        # 全屏控制
    └── useKeyboard.ts          # 键盘事件
```

### 核心组件职责

| 组件 | 职责 | Props |
|------|------|-------|
| `SlideContainer` | 管理所有幻灯片，处理翻页动画、滚动监听 | children, currentIndex |
| `ChapterNav` | 左侧抽屉式目录，点击跳转，高亮当前章节 | chapters, currentChapter, onNavigate |
| `ContentSlide` | 固定高度容器，内容溢出时自动适配组件 | title, label, children |
| `ScrollableTable` | 表头固定，内容可滚动，最大高度自适应 | columns, dataSource, maxHeight |
| `TabbedContent` | 内容过多时拆分为多个 Tab | tabs, defaultActiveKey |

### ContentAdapter 智能适配

```tsx
function ContentAdapter({ content }: ContentAdapterProps) {
  // 表格行数超过 10 行，使用滚动表格
  if (content.type === 'table' && content.rows > 10) {
    return <ScrollableTable {...content} maxHeight="calc(100vh - 180px)" />
  }

  // 并列内容超过 4 项，使用标签页
  if (content.type === 'comparison' && content.items > 4) {
    return <TabbedContent tabs={content.items} />
  }

  // 详细说明内容，使用折叠面板
  if (content.type === 'details') {
    return <CollapsibleSection panels={content.panels} />
  }

  // 流程步骤，使用走马灯
  if (content.type === 'steps') {
    return <CarouselSteps steps={content.steps} />
  }

  // 默认网格布局
  return <CompactGrid columns={content.columns}>{content.children}</CompactGrid>
}
```

## 视觉风格

### Ant Design 主题定制

```ts
const theme = {
  token: {
    colorPrimary: '#146ef5',      // Webflow Blue
    borderRadius: 8,
    fontSize: 14,
  },
  components: {
    Table: {
      headerBg: '#146ef5',
      headerColor: '#ffffff',
    },
    Card: {
      borderRadiusLG: 8,
    },
  },
}
```

### 统一表格样式

- 表头：蓝色背景 (#146ef5) + 白色文字
- 边框：浅灰色 (#d8d8d8)
- 行悬停：浅蓝色背景 (rgba(20, 110, 245, 0.05))
- 圆角：8px

### 统一卡片样式

- 背景：白色
- 边框：浅灰色 (#d8d8d8)
- 圆角：8px
- 悬停：上移 3px + 阴影

## 开发计划

### Phase 1: 基础框架

- [ ] 项目初始化（Vite + React + TypeScript）
- [ ] 安装依赖（Ant Design, vite-plugin-singlefile）
- [ ] 实现 SlideContainer 组件
- [ ] 实现 ChapterNav 组件
- [ ] 实现 PageIndicator 组件
- [ ] 实现 ChapterIndicator 组件
- [ ] 实现翻页 Hooks（useSlideNavigation, useKeyboard）

### Phase 2: 模板组件

- [ ] 实现 CoverSlide 封面模板
- [ ] 实现 ChapterTitleSlide 章节标题模板
- [ ] 实现 ContentSlide 内容页模板
- [ ] 实现 shared 组件（ScrollableTable, TabbedContent, CollapsibleSection, CarouselSteps）

### Phase 3: 章节内容

#### Chapter 01 执行摘要（2 页）
- [ ] 章节标题页
- [ ] 内容页：研究背景 + 核心发现 + 核心建议表格

#### Chapter 02 行业背景（2 页）
- [ ] 章节标题页
- [ ] 内容页：定义 + 市场驱动 + 主要玩家表格 + 架构模式

#### Chapter 03 安全威胁分析（3 页）
- [ ] 章节标题页
- [ ] 内容页：OWASP LLM Top 10 + 威胁模型
- [ ] 内容页：攻击向量 + 风险矩阵

#### Chapter 04 认证与访问控制（3 页）
- [ ] 章节标题页
- [ ] 内容页：认证原则 + 方式对比 + API Key 层级
- [ ] 内容页：MFA + RBAC + 对外内部差异

#### Chapter 05 数据安全（3 页）
- [ ] 章节标题页
- [ ] 内容页：安全原则 + TLS + 存储加密
- [ ] 内容页：ZDR + 数据驻留

#### Chapter 06 内容安全防护（2 页）
- [ ] 章节标题页
- [ ] 内容页：提示词注入 + 多层防护 + 输出安全

#### Chapter 07 模型滥用防护（2 页）
- [ ] 章节标题页
- [ ] 内容页：限流策略 + 算法对比 + 成本监控

#### Chapter 08 合规性设计（2 页）
- [ ] 章节标题页
- [ ] 内容页：合规框架 + 审计日志 + GDPR

#### Chapter 09 成本控制与计费（2 页）
- [ ] 章节标题页
- [ ] 内容页：计费模型 + 价格对比

#### Chapter 10 高可用架构（2 页）
- [ ] 章节标题页
- [ ] 内容页：设计目标 + 多区域部署 + 故障转移

#### Chapter 11 实施方案（2 页）
- [ ] 章节标题页
- [ ] 内容页：分阶段实施 + 优先级矩阵

#### Chapter 12 结论与建议（2 页）
- [ ] 章节标题页
- [ ] 内容页：核心结论 + 风险缓解 + 后续方向

### Phase 4: 功能完善

- [ ] 实现 FullscreenButton 全屏功能
- [ ] 实现 ExportPDF 导出功能
- [ ] 打印样式优化
- [ ] 浏览器兼容性测试（Chrome, Edge, Safari）

## 构建配置

### vite.config.ts

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

export default defineConfig({
  plugins: [
    react(),
    viteSingleFile(),
  ],
  build: {
    outDir: 'dist',
    assetsInlineLimit: 100000000,
  },
})
```

## 验收标准

1. **功能验收**
   - 所有翻页方式正常工作
   - 章节导航跳转准确
   - 全屏模式正常
   - PDF 导出可用

2. **布局验收**
   - 所有页面内容不超出边界
   - 章节标注和底部翻页不遮挡内容
   - 表格风格统一（蓝色表头）
   - 响应式布局正常

3. **浏览器兼容**
   - Chrome (最新版)
   - Edge (最新版)
   - Safari (最新版)

4. **构建验收**
   - 输出单个 HTML 文件
   - 文件大小合理（< 5MB）
   - 无外部依赖请求
