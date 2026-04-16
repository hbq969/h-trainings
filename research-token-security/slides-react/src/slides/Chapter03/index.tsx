import { ChapterTitleSlide } from '../../components/ChapterTitleSlide'
import { ContentSlide } from '../../components/ContentSlide'
import { SectionBox, ScrollableTable, PriorityBadge } from '../../components/shared'
import { Typography, Tag } from 'antd'

const { Text } = Typography

// OWASP LLM Top 10
const owaspTop10 = [
  { rank: 'LLM01', threat: 'Prompt Injection', impact: '攻击者绕过安全策略，提取敏感信息' },
  { rank: 'LLM02', threat: 'Sensitive Information Disclosure', impact: '输出中泄露训练数据或系统信息' },
  { rank: 'LLM03', threat: 'Supply Chain Vulnerabilities', impact: '恶意模型或插件引入后门' },
  { rank: 'LLM04', threat: 'Training Data Poisoning', impact: '数据投毒影响模型输出' },
  { rank: 'LLM05', threat: 'Improper Output Handling', impact: '未验证的输出导致下游漏洞' },
  { rank: 'LLM06', threat: 'Excessive Agency', impact: '过度授权导致非预期操作' },
  { rank: 'LLM07', threat: 'System Prompt Leakage', impact: '系统提示词被提取' },
  { rank: 'LLM08', threat: 'Vector and Embedding Weaknesses', impact: 'RAG 系统的向量攻击' },
  { rank: 'LLM09', threat: 'Misinformation', impact: '模型幻觉导致的错误决策' },
  { rank: 'LLM10', threat: 'Unbounded Consumption', impact: '资源滥用、成本爆发' },
]

// 风险等级矩阵
const riskMatrix = [
  { threat: 'API Key 泄露', likelihood: '高', impact: '高', risk: '严重', priority: 'P0' as const },
  { threat: '提示词注入', likelihood: '高', impact: '高', risk: '严重', priority: 'P0' as const },
  { threat: '模型 DoS', likelihood: '中', impact: '高', risk: '高', priority: 'P1' as const },
  { threat: '成本攻击', likelihood: '中', impact: '高', risk: '高', priority: 'P1' as const },
  { threat: '数据泄露', likelihood: '中', impact: '高', risk: '高', priority: 'P1' as const },
  { threat: '供应链攻击', likelihood: '低', impact: '极高', risk: '中', priority: 'P2' as const },
  { threat: '输出处理漏洞', likelihood: '中', impact: '中', risk: '中', priority: 'P2' as const },
]

const riskColors: Record<string, string> = {
  '严重': 'red',
  '高': 'orange',
  '中': 'gold',
}

export function Chapter03() {
  return (
    <>
      <ChapterTitleSlide
        number="Chapter 03"
        title="安全威胁分析"
        subtitle="OWASP LLM Top 10 与风险评估"
      />

      <ContentSlide layout="twoCol">
        <div>
          <SectionBox label="OWASP LLM Top 10 (2025)" title="LLM 应用安全风险清单">
            <ScrollableTable
              dataSource={owaspTop10}
              columns={[
                { title: '排名', dataIndex: 'rank', width: 80 },
                { title: '威胁', dataIndex: 'threat' },
                { title: '对 API 网关的影响', dataIndex: 'impact' },
              ]}
              rowKey={(_r, i) => String(i)}
            />
          </SectionBox>
        </div>

        <div>
          <SectionBox label="Risk Assessment" title="风险等级评估矩阵">
            <ScrollableTable
              dataSource={riskMatrix}
              columns={[
                { title: '威胁', dataIndex: 'threat' },
                { title: '可能性', dataIndex: 'likelihood', width: 70 },
                { title: '影响度', dataIndex: 'impact', width: 70 },
                { title: '风险', dataIndex: 'risk', width: 70, render: (r) => <Tag color={riskColors[r]}>{r}</Tag> },
                { title: '优先级', dataIndex: 'priority', width: 70, render: (p) => <PriorityBadge priority={p} /> },
              ]}
              rowKey={(_r, i) => String(i)}
            />
          </SectionBox>

          <div style={{ marginTop: '16px', padding: '12px', background: 'rgba(238, 29, 54, 0.05)', borderRadius: '8px', borderLeft: '3px solid #ee1d36' }}>
            <Text type="danger" strong>关键发现：</Text>
            <Text> 73% 的生产环境 AI 应用存在提示词注入漏洞，成功攻击率可达 88%</Text>
          </div>
        </div>
      </ContentSlide>
    </>
  )
}
