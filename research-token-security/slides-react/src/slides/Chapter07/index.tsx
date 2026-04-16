import { ChapterTitleSlide } from '../../components/ChapterTitleSlide'
import { ContentSlide } from '../../components/ContentSlide'
import { SectionBox, ScrollableTable } from '../../components/shared'
import { Typography } from 'antd'

const { Text } = Typography

// 限流对比
const rateLimitComparison = [
  { dimension: '限流单位', traditional: '请求数/秒 (RPS)', ai: 'Token/秒 + RPS + $/小时' },
  { dimension: '请求成本', traditional: '基本一致', ai: '差异可达 100 倍' },
  { dimension: '关键风险', traditional: '服务可用性', ai: '成本爆发 + 可用性' },
  { dimension: '限流粒度', traditional: '粗粒度', ai: '细粒度、多维度' },
]

// 限流算法对比
const algorithms = [
  { algorithm: '固定窗口', principle: '固定时间窗口计数', suitability: '低', scenario: '简单限流' },
  { algorithm: '滑动窗口', principle: '平滑时间窗口', suitability: '中', scenario: '通用场景' },
  { algorithm: '令牌桶', principle: '桶中令牌匀速补充', suitability: '高', scenario: 'AI 场景首选' },
  { algorithm: '漏桶', principle: '匀速处理请求', suitability: '中', scenario: '流量整形' },
]

// 成本监控指标
const costMetrics = [
  { metric: '实时花费', frequency: '秒级', threshold: '>80% 小时预算', response: '自动降级' },
  { metric: '日花费', frequency: '小时级', threshold: '>80% 日预算', response: '邮件通知' },
  { metric: '月花费', frequency: '天级', threshold: '>80% 月预算', response: '升级告警' },
  { metric: '单请求成本', frequency: '实时', threshold: '>平均值 10x', response: '标记异常' },
]

export function Chapter07() {
  return (
    <>
      <ChapterTitleSlide
        number="Chapter 07"
        title="模型滥用防护"
        subtitle="Token 感知限流与成本控制"
      />

      <ContentSlide layout="twoCol">
        <div>
          <SectionBox label="Core Challenges" title="核心挑战">
            <ul style={{ fontSize: '13px', color: '#363636', paddingLeft: '16px', margin: 0 }}>
              <li><Text strong>成本不对称</Text>：单请求可消耗 $0.001 到 $10+</li>
              <li><Text strong>流量特征模糊</Text>：AI Agent 流量与攻击流量相似</li>
              <li><Text strong>多维度滥用</Text>：资源、经济、内容滥用并存</li>
            </ul>
          </SectionBox>

          <SectionBox label="Rate Limiting Comparison" title="传统限流 vs AI 限流">
            <ScrollableTable
              dataSource={rateLimitComparison}
              columns={[
                { title: '维度', dataIndex: 'dimension' },
                { title: '传统 API', dataIndex: 'traditional' },
                { title: 'AI API', dataIndex: 'ai' },
              ]}
              rowKey={(_r, i) => String(i)}
            />
          </SectionBox>
        </div>

        <div>
          <SectionBox label="Algorithm Comparison" title="限流算法对比">
            <ScrollableTable
              dataSource={algorithms}
              columns={[
                { title: '算法', dataIndex: 'algorithm' },
                { title: '原理', dataIndex: 'principle' },
                { title: 'AI 适用性', dataIndex: 'suitability', width: 80 },
                { title: '适用场景', dataIndex: 'scenario' },
              ]}
              rowKey={(_r, i) => String(i)}
            />
          </SectionBox>

          <SectionBox label="Cost Monitoring" title="成本监控体系">
            <ScrollableTable
              dataSource={costMetrics}
              columns={[
                { title: '指标', dataIndex: 'metric' },
                { title: '频率', dataIndex: 'frequency', width: 70 },
                { title: '告警阈值', dataIndex: 'threshold' },
                { title: '响应方式', dataIndex: 'response' },
              ]}
              rowKey={(_r, i) => String(i)}
            />
          </SectionBox>

          <div style={{ marginTop: '12px', padding: '10px', background: 'rgba(255, 107, 0, 0.05)', borderRadius: '8px', borderLeft: '3px solid #ff6b00' }}>
            <Text type="warning" strong>真实案例：</Text>
            <Text> 单个客户端 48 小时内产生 $15,000+ 额外费用</Text>
          </div>
        </div>
      </ContentSlide>
    </>
  )
}
