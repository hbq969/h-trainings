import { ChapterTitleSlide } from '../../components/ChapterTitleSlide'
import { ContentSlide } from '../../components/ContentSlide'
import { SectionBox, ScrollableTable, CompactCard, PriorityBadge } from '../../components/shared'
import { Card, Typography, Tag, Progress } from 'antd'

const { Text, Paragraph } = Typography

// 限流策略对比
const rateLimitComparison = [
  { dimension: '限流单位', traditional: '请求数/秒', ai: 'Token/秒 + $/小时' },
  { dimension: '请求成本', traditional: '基本一致', ai: '差异可达100倍' },
  { dimension: '关键风险', traditional: '服务可用性', ai: '成本爆发' },
  { dimension: '突发处理', traditional: '丢弃/排队', ai: '降级模型/截断' },
  { dimension: '监控粒度', traditional: 'QPS/延迟', ai: 'Token/$/质量' },
]

// 成本监控指标
const costMetrics = [
  { metric: 'Token 消耗速率', threshold: '设定阈值告警', action: '触发限流/降级', priority: 'P0' as const },
  { metric: '每小时成本', threshold: '预算的80%', action: '告警通知', priority: 'P0' as const },
  { metric: '单请求成本', threshold: '超出平均值3倍', action: '标记异常', priority: 'P1' as const },
  { metric: '模型调用分布', threshold: '异常偏离', action: '审计检查', priority: 'P1' as const },
  { metric: '用户配额使用', threshold: '达到90%', action: '预警通知', priority: 'P2' as const },
]

// 防滥用策略
const abusePrevention = [
  { strategy: '异常检测', desc: '检测异常请求模式和行为', effectiveness: '高' },
  { strategy: '配额管理', desc: '细粒度用户/应用配额控制', effectiveness: '高' },
  { strategy: '模型降级', desc: '成本超限时降级到更便宜模型', effectiveness: '中' },
  { strategy: '请求排队', desc: '平滑突发流量', effectiveness: '中' },
]

export function Chapter07() {
  return (
    <>
      {/* 章节标题页 */}
      <ChapterTitleSlide
        number="Chapter 07"
        title="模型滥用防护"
        subtitle="限流策略、成本控制与异常检测"
      />

      {/* 内容页: 限流对比 + 成本监控 */}
      <ContentSlide layout="twoCol">
        {/* 左列：限流策略对比 */}
        <div>
          <SectionBox label="Rate Limiting Evolution" title="限流策略对比">
            <Paragraph style={{ marginBottom: 8 }}>
              传统 API 限流策略<Text type="danger" strong>不适用于</Text>AI Token API，需要新的限流范式。
            </Paragraph>
            <ScrollableTable
              dataSource={rateLimitComparison}
              columns={[
                { title: '维度', dataIndex: 'dimension', width: 90 },
                { title: '传统 API', dataIndex: 'traditional', width: 110 },
                { title: 'AI API', dataIndex: 'ai' },
              ]}
              rowKey={(_r, i) => String(i)}
            />
          </SectionBox>

          <SectionBox label="Token Bucket" title="令牌桶算法优势">
            <Card size="small" style={{ background: 'rgba(82, 196, 26, 0.05)', borderLeft: '3px solid #52c41a' }}>
              <ul style={{ margin: 0, paddingLeft: 16, fontSize: 12 }}>
                <li><Text strong>平滑突发：</Text>允许短时突发，长期平滑</li>
                <li><Text strong>灵活配置：</Text>按 Token 而非请求数限流</li>
                <li><Text strong>分层限流：</Text>用户级 + 应用级 + 全局级</li>
                <li><Text strong>动态调整：</Text>根据负载自动调整速率</li>
              </ul>
            </Card>
          </SectionBox>
        </div>

        {/* 右列：成本监控 + 防滥用 */}
        <div>
          <SectionBox label="Cost Monitoring" title="成本监控指标">
            <ScrollableTable
              dataSource={costMetrics}
              columns={[
                { title: '监控指标', dataIndex: 'metric', width: 100 },
                { title: '阈值', dataIndex: 'threshold', width: 100 },
                { title: '动作', dataIndex: 'action' },
                {
                  title: '优先级',
                  dataIndex: 'priority',
                  width: 60,
                  render: (p) => <PriorityBadge priority={p} />
                },
              ]}
              rowKey={(_r, i) => String(i)}
            />
          </SectionBox>

          <SectionBox label="Abuse Prevention" title="防滥用策略">
            <ScrollableTable
              dataSource={abusePrevention}
              columns={[
                { title: '策略', dataIndex: 'strategy', width: 90 },
                { title: '描述', dataIndex: 'desc' },
                {
                  title: '效果',
                  dataIndex: 'effectiveness',
                  width: 60,
                  render: (e) => (
                    <Tag color={e === '高' ? 'green' : 'blue'}>{e}</Tag>
                  )
                },
              ]}
              rowKey={(_r, i) => String(i)}
            />
          </SectionBox>

          <SectionBox label="Cost Alert Example" title="成本预警示例">
            <CompactCard>
              <div style={{ marginBottom: 8 }}>
                <Text type="secondary" style={{ fontSize: 12 }}>小时成本进度</Text>
                <Progress
                  percent={78}
                  strokeColor={{ '0%': '#52c41a', '100%': '#f5222d' }}
                  size="small"
                  format={() => '$78 / $100'}
                />
              </div>
              <Text type="secondary" style={{ fontSize: 11 }}>
                预计超支时间：2小时15分钟后
              </Text>
            </CompactCard>
          </SectionBox>
        </div>
      </ContentSlide>
    </>
  )
}
