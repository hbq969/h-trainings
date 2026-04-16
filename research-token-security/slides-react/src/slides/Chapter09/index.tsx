import { ChapterTitleSlide } from '../../components/ChapterTitleSlide'
import { ContentSlide } from '../../components/ContentSlide'
import { SectionBox, ScrollableTable, CompactCard } from '../../components/shared'
import { Typography, Tag } from 'antd'

const { Text } = Typography

// 计费模型数据
const billingModels = [
  {
    model: 'Token计费',
    desc: '按token数量',
    advantage: '精确公平',
    disadvantage: '复杂度高'
  },
  {
    model: '请求计费',
    desc: '按请求次数',
    advantage: '简单',
    disadvantage: '不反映真实成本'
  },
  {
    model: '订阅制',
    desc: '月/年固定',
    advantage: '可预测',
    disadvantage: '需超量策略'
  },
]

// 模型价格数据
const modelPricing = [
  { model: 'GPT-4o', inputPrice: '$0.0025/1K', outputPrice: '$0.01/1K' },
  { model: 'GPT-4o mini', inputPrice: '$0.00015/1K', outputPrice: '$0.0006/1K' },
  { model: 'Claude Sonnet', inputPrice: '$0.003/1K', outputPrice: '$0.015/1K' },
  { model: 'Claude Haiku', inputPrice: '$0.00025/1K', outputPrice: '$0.00125/1K' },
  { model: 'Gemini Pro', inputPrice: '$0.0005/1K', outputPrice: '$0.0015/1K' },
]

// 成本监控指标
const costMetrics = [
  { metric: 'Token 消耗速率', desc: '实时监控 token 使用趋势', alert: '突增 50% 告警' },
  { metric: 'API 调用分布', desc: '按模型、用户、端点分布', alert: '异常模式检测' },
  { metric: '预算使用率', desc: '月度/日度预算消耗', alert: '达到 80% 提醒' },
  { metric: '成本归属', desc: '按项目/团队分摊成本', alert: '超预算预警' },
]

export function Chapter09() {
  return (
    <>
      {/* 章节标题页 */}
      <ChapterTitleSlide
        number="Chapter 09"
        title="成本控制与计费"
        subtitle="透明定价与智能成本管理"
      />

      {/* 内容页 */}
      <ContentSlide layout="twoCol">
        {/* 左列：计费模型 */}
        <div>
          <SectionBox label="Billing Models" title="计费模型对比">
            <ScrollableTable
              dataSource={billingModels}
              columns={[
                { title: '模型', dataIndex: 'model', width: 90 },
                { title: '说明', dataIndex: 'desc', width: 100 },
                {
                  title: '优势',
                  dataIndex: 'advantage',
                  render: (v) => <Tag color="green">{v}</Tag>
                },
                {
                  title: '劣势',
                  dataIndex: 'disadvantage',
                  render: (v) => <Tag color="orange">{v}</Tag>
                },
              ]}
              rowKey="model"
            />
          </SectionBox>

          <SectionBox label="Model Pricing" title="模型价格对比">
            <ScrollableTable
              dataSource={modelPricing}
              columns={[
                { title: '模型', dataIndex: 'model' },
                { title: 'Input 价格', dataIndex: 'inputPrice', width: 100 },
                { title: 'Output 价格', dataIndex: 'outputPrice', width: 100 },
              ]}
              rowKey="model"
            />
          </SectionBox>
        </div>

        {/* 右列：成本监控 */}
        <div>
          <SectionBox label="Cost Monitoring" title="成本监控体系">
            <CompactCard>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {costMetrics.map((item, idx) => (
                  <div key={idx} style={{
                    padding: '8px 12px',
                    background: 'rgba(20, 110, 245, 0.05)',
                    borderRadius: '6px',
                    borderLeft: '3px solid #146ef5',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <Text strong style={{ fontSize: '13px' }}>{item.metric}</Text>
                      <Text type="warning" style={{ fontSize: '11px' }}>{item.alert}</Text>
                    </div>
                    <Text type="secondary" style={{ fontSize: '12px' }}>{item.desc}</Text>
                  </div>
                ))}
              </div>
            </CompactCard>
          </SectionBox>

          <SectionBox label="Cost Control Strategy" title="成本控制策略">
            <CompactCard>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                {[
                  { icon: '🎯', title: '预算配额', desc: '按用户/项目设定上限' },
                  { icon: '🔄', title: '智能路由', desc: '自动选择最优性价比模型' },
                  { icon: '📊', title: '用量分析', desc: '识别异常使用模式' },
                  { icon: '⚡', title: '缓存优化', desc: '相似请求复用结果' },
                ].map((strategy, idx) => (
                  <div key={idx} style={{
                    padding: '8px',
                    background: 'rgba(122, 61, 255, 0.08)',
                    borderRadius: '6px',
                    textAlign: 'center',
                  }}>
                    <div style={{ fontSize: '20px', marginBottom: '4px' }}>{strategy.icon}</div>
                    <Text strong style={{ fontSize: '12px', display: 'block' }}>{strategy.title}</Text>
                    <Text type="secondary" style={{ fontSize: '11px' }}>{strategy.desc}</Text>
                  </div>
                ))}
              </div>
            </CompactCard>
          </SectionBox>
        </div>
      </ContentSlide>
    </>
  )
}
