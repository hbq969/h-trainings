import { ChapterTitleSlide } from '../../components/ChapterTitleSlide'
import { ContentSlide } from '../../components/ContentSlide'
import { ScrollableTable, PriorityBadge } from '../../components/shared'
import { Card, Typography, Tag } from 'antd'

const { Text } = Typography

// OWASP LLM Top 10 数据
const owaspTop10 = [
  { rank: 'LLM01', threat: 'Prompt Injection', impact: '攻击者绕过安全策略，获取未授权访问' },
  { rank: 'LLM02', threat: 'Sensitive Information Disclosure', impact: '输出中泄露训练数据或敏感信息' },
  { rank: 'LLM03', threat: 'Supply Chain Vulnerabilities', impact: '恶意模型或依赖引入后门' },
  { rank: 'LLM04', threat: 'Data and Model Poisoning', impact: '污染训练数据影响模型输出' },
  { rank: 'LLM05', threat: 'Improper Output Handling', impact: '未过滤输出导致 XSS 或注入攻击' },
  { rank: 'LLM06', threat: 'Excessive Agency', impact: '模型权限过大导致未预期操作' },
  { rank: 'LLM07', threat: 'System Prompt Leakage', impact: '系统提示词泄露暴露内部逻辑' },
  { rank: 'LLM08', threat: 'Vector and Embedding Weaknesses', impact: '向量数据库安全缺陷' },
  { rank: 'LLM09', threat: 'Misinformation', impact: '生成虚假信息造成业务风险' },
  { rank: 'LLM10', threat: 'Unbounded Consumption', impact: '无限资源消耗导致 DoS 或成本爆发' },
]

// 风险等级评估数据
const riskMatrix = [
  { threat: 'API Key 泄露', likelihood: '高', impact: '高', level: '严重', priority: 'P0' as const },
  { threat: '提示词注入', likelihood: '高', impact: '高', level: '严重', priority: 'P0' as const },
  { threat: '模型 DoS', likelihood: '中', impact: '高', level: '高', priority: 'P1' as const },
  { threat: '数据泄露', likelihood: '中', impact: '高', level: '高', priority: 'P1' as const },
  { threat: '未授权访问', likelihood: '中', impact: '中', level: '中', priority: 'P1' as const },
  { threat: '成本滥用', likelihood: '高', impact: '中', level: '高', priority: 'P1' as const },
  { threat: '内容安全', likelihood: '中', impact: '中', level: '中', priority: 'P2' as const },
]

// 风险等级颜色
const levelColors: Record<string, string> = {
  '严重': 'error',
  '高': 'warning',
  '中': 'default',
}

export function Chapter03() {
  return (
    <>
      {/* 章节标题页 */}
      <ChapterTitleSlide
        number="Chapter 03"
        title="安全威胁分析"
        subtitle="OWASP LLM Top 10 与风险评估"
      />

      {/* 内容页1: OWASP LLM Top 10 */}
      <ContentSlide label="Threat Landscape" title="OWASP LLM Top 10 威胁分析">
        <ScrollableTable
          dataSource={owaspTop10}
          columns={[
            {
              title: '排名',
              dataIndex: 'rank',
              width: 80,
              render: (r) => <Tag color="blue">{r}</Tag>
            },
            { title: '威胁类型', dataIndex: 'threat', width: 200 },
            { title: '对 API 网关的影响', dataIndex: 'impact' },
          ]}
          rowKey="rank"
        />
      </ContentSlide>

      {/* 内容页2: 风险等级评估矩阵 */}
      <ContentSlide label="Risk Assessment" title="风险等级评估矩阵">
        <div style={{ display: 'flex', gap: '16px', height: '100%' }}>
          <div style={{ flex: 2 }}>
            <ScrollableTable
              dataSource={riskMatrix}
              columns={[
                { title: '威胁', dataIndex: 'threat', width: 120 },
                { title: '可能性', dataIndex: 'likelihood', width: 80 },
                { title: '影响度', dataIndex: 'impact', width: 80 },
                {
                  title: '风险等级',
                  dataIndex: 'level',
                  width: 100,
                  render: (l) => <Tag color={levelColors[l]}>{l}</Tag>
                },
                {
                  title: '优先级',
                  dataIndex: 'priority',
                  width: 80,
                  render: (p) => <PriorityBadge priority={p} />
                },
              ]}
              rowKey="threat"
            />
          </div>
          <div style={{ flex: 1 }}>
            <Card
              size="small"
              title="风险矩阵说明"
              style={{ height: '100%' }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Card size="small" style={{ background: '#fff1f0', border: '1px solid #ffa39e' }}>
                  <Text strong>严重 (P0)</Text>
                  <br />
                  <Text type="secondary" style={{ fontSize: '12px' }}>
                    需立即处理，可能导致重大损失
                  </Text>
                </Card>
                <Card size="small" style={{ background: '#fffbe6', border: '1px solid #ffe58f' }}>
                  <Text strong>高 (P1)</Text>
                  <br />
                  <Text type="secondary" style={{ fontSize: '12px' }}>
                    需优先处理，影响核心业务
                  </Text>
                </Card>
                <Card size="small" style={{ background: '#f6ffed', border: '1px solid #b7eb8f' }}>
                  <Text strong>中 (P2)</Text>
                  <br />
                  <Text type="secondary" style={{ fontSize: '12px' }}>
                    计划处理，提升整体安全态势
                  </Text>
                </Card>
              </div>
            </Card>
          </div>
        </div>
      </ContentSlide>
    </>
  )
}
