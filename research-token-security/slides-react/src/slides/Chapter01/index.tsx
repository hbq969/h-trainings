import { ChapterTitleSlide } from '../../components/ChapterTitleSlide'
import { ContentSlide } from '../../components/ContentSlide'
import { SectionBox, ScrollableTable, CompactCard, PriorityBadge } from '../../components/shared'
import { Card, Typography } from 'antd'

const { Text, Paragraph } = Typography

// 核心发现数据
const findings = [
  { num: '1', title: '威胁格局复杂化', desc: 'OWASP LLM Top 10：提示词注入和敏感信息泄露是首要威胁' },
  { num: '2', title: '传统安全边界不足', desc: 'RPS 限流不适用，需转向 Token 感知控制' },
  { num: '3', title: '合规成为准入门槛', desc: 'GDPR、数据驻留、ZDR 成为企业客户刚需' },
  { num: '4', title: '成本与安全强耦合', desc: '单点配置错误可致 $15,000+ 损失' },
]

// 核心建议数据
const recommendations = [
  { priority: 'P0' as const, advice: '采用 Token 感知的混合限流策略', impact: '防止成本爆发和模型 DoS' },
  { priority: 'P0' as const, advice: '建立集中式 API 网关安全层', impact: '统一认证、授权、审计' },
  { priority: 'P0' as const, advice: '实施 MFA 和细粒度 API Key 管理', impact: '降低凭证泄露风险' },
  { priority: 'P1' as const, advice: '部署提示词注入检测和输出过滤', impact: '防范 OWASP LLM Top 1' },
  { priority: 'P1' as const, advice: '建立合规体系', impact: '满足企业客户准入要求' },
  { priority: 'P2' as const, advice: '构建多区域高可用架构', impact: '保障 SLA 和灾难恢复' },
]

export function Chapter01() {
  return (
    <>
      {/* 章节标题页 */}
      <ChapterTitleSlide
        number="Chapter 01"
        title="执行摘要"
        subtitle="关键发现与核心建议"
      />

      {/* 内容页 */}
      <ContentSlide layout="twoCol">
        {/* 左列：研究背景 */}
        <div>
          <SectionBox label="Research Background" title="研究背景">
            <Paragraph>
              随着<Text strong>大型语言模型（LLM）</Text>和生成式 AI 的爆发式增长，
              <Text strong>AI Token API 网关/中转平台</Text>已成为连接企业与 AI 能力的关键基础设施。
            </Paragraph>
            <Card size="small" style={{ background: 'rgba(20, 110, 245, 0.05)', borderLeft: '3px solid #146ef5' }}>
              <Text type="danger" strong>提示词注入、API 密钥泄露、模型滥用、数据合规</Text> 等风险层出不穷
            </Card>
          </SectionBox>

          <SectionBox label="Key Findings" title="核心发现">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {findings.map(f => (
                <CompactCard key={f.num}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '20px',
                      height: '20px',
                      background: 'linear-gradient(135deg, #146ef5, #7a3dff)',
                      color: '#fff',
                      fontSize: '12px',
                      fontWeight: 600,
                      borderRadius: '50%',
                    }}>{f.num}</span>
                    <Text strong style={{ fontSize: '13px' }}>{f.title}</Text>
                  </div>
                  <Text type="secondary" style={{ fontSize: '12px' }}>{f.desc}</Text>
                </CompactCard>
              ))}
            </div>
          </SectionBox>
        </div>

        {/* 右列：核心建议 */}
        <div>
          <SectionBox label="Core Recommendations" title="核心建议">
            <ScrollableTable
              dataSource={recommendations}
              columns={[
                { title: '优先级', dataIndex: 'priority', width: 70, render: (p) => <PriorityBadge priority={p} /> },
                { title: '建议', dataIndex: 'advice' },
                { title: '影响', dataIndex: 'impact' },
              ]}
              rowKey={(r, i) => String(i)}
            />
          </SectionBox>
        </div>
      </ContentSlide>
    </>
  )
}
