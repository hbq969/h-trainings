import { ChapterTitleSlide } from '../../components/ChapterTitleSlide'
import { ContentSlide } from '../../components/ContentSlide'
import { SectionBox, ScrollableTable, CompactCard, PriorityBadge } from '../../components/shared'
import { Card, Typography, Tag } from 'antd'

const { Text, Paragraph } = Typography

// 实施阶段数据
const phases = [
  { phase: 'Phase 1', time: '1-2月', task: '安全基线：认证、TLS、基础限流', color: '#146ef5' },
  { phase: 'Phase 2', time: '2-3月', task: '内容安全：注入检测、输出过滤', color: '#7a3dff' },
  { phase: 'Phase 3', time: '3-4月', task: '合规成本：审计日志、多区域', color: '#00c4cc' },
  { phase: 'Phase 4', time: '持续', task: '高可用：智能路由、灾备演练', color: '#52c41a' },
]

// 优先级矩阵数据
const priorityMatrix = [
  { capability: 'Token 限流', priority: 'P0' as const, invest: '低', riskReduce: '高' },
  { capability: '认证授权', priority: 'P0' as const, invest: '中', riskReduce: '高' },
  { capability: '输入输出过滤', priority: 'P1' as const, invest: '中', riskReduce: '高' },
  { capability: '审计日志', priority: 'P1' as const, invest: '低', riskReduce: '中' },
  { capability: '多区域', priority: 'P2' as const, invest: '高', riskReduce: '中' },
]

export function Chapter11() {
  return (
    <>
      {/* 章节标题页 */}
      <ChapterTitleSlide
        number="Chapter 11"
        title="实施方案"
        subtitle="分阶段落地与优先级规划"
      />

      {/* 内容页 */}
      <ContentSlide layout="twoCol">
        {/* 左列：实施路线图 */}
        <div>
          <SectionBox label="Implementation Roadmap" title="四阶段实施路线图">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {phases.map((p, idx) => (
                <Card
                  key={p.phase}
                  size="small"
                  style={{
                    background: 'rgba(255,255,255,0.8)',
                    borderLeft: `4px solid ${p.color}`,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Tag color={p.color} style={{ margin: 0, fontWeight: 600 }}>
                      {p.phase}
                    </Tag>
                    <Tag style={{ margin: 0, background: '#f0f0f0', border: 'none' }}>
                      {p.time}
                    </Tag>
                    <Text strong style={{ fontSize: '13px' }}>{p.task}</Text>
                  </div>
                </Card>
              ))}
            </div>
          </SectionBox>

          <SectionBox label="Key Milestones" title="关键里程碑">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <CompactCard>
                <Text strong style={{ fontSize: '12px', display: 'block', marginBottom: '4px' }}>
                  M1: 基础安全就绪
                </Text>
                <Text type="secondary" style={{ fontSize: '11px' }}>
                  MFA + API Key 管理 + TLS 1.3
                </Text>
              </CompactCard>
              <CompactCard>
                <Text strong style={{ fontSize: '12px', display: 'block', marginBottom: '4px' }}>
                  M2: 内容安全上线
                </Text>
                <Text type="secondary" style={{ fontSize: '11px' }}>
                  注入检测率 >95% + 输出过滤
                </Text>
              </CompactCard>
              <CompactCard>
                <Text strong style={{ fontSize: '12px', display: 'block', marginBottom: '4px' }}>
                  M3: 合规认证通过
                </Text>
                <Text type="secondary" style={{ fontSize: '11px' }}>
                  SOC 2 Type II + GDPR 审计
                </Text>
              </CompactCard>
              <CompactCard>
                <Text strong style={{ fontSize: '12px', display: 'block', marginBottom: '4px' }}>
                  M4: 高可用达标
                </Text>
                <Text type="secondary" style={{ fontSize: '11px' }}>
                  99.99% SLA + RTO<5min
                </Text>
              </CompactCard>
            </div>
          </SectionBox>
        </div>

        {/* 右列：优先级矩阵 */}
        <div>
          <SectionBox label="Priority Matrix" title="能力优先级矩阵">
            <ScrollableTable
              dataSource={priorityMatrix}
              columns={[
                { title: '能力', dataIndex: 'capability', width: 100 },
                {
                  title: '优先级',
                  dataIndex: 'priority',
                  width: 70,
                  render: (p) => <PriorityBadge priority={p} />,
                },
                { title: '投入', dataIndex: 'invest', width: 60 },
                { title: '风险降低', dataIndex: 'riskReduce', width: 80 },
              ]}
              rowKey={(_r, i) => String(i)}
            />
          </SectionBox>

          <SectionBox label="Investment Strategy" title="投入策略">
            <Card size="small" style={{ background: 'rgba(20, 110, 245, 0.05)' }}>
              <Paragraph style={{ fontSize: '12px', marginBottom: '8px' }}>
                <Text strong>P0 能力</Text>：立即实施，4个月内完成
              </Paragraph>
              <Paragraph style={{ fontSize: '12px', marginBottom: '8px' }}>
                <Text strong>P1 能力</Text>：第二优先级，6个月内完成
              </Paragraph>
              <Paragraph style={{ fontSize: '12px', marginBottom: 0 }}>
                <Text strong>P2 能力</Text>：长期规划，12个月内完成
              </Paragraph>
            </Card>
            <Card size="small" style={{ marginTop: '8px', background: 'rgba(0, 196, 204, 0.05)' }}>
              <Text type="secondary" style={{ fontSize: '12px' }}>
                <Text strong>总投入估算</Text>：基础设施改造约 3-5 人月，
                持续运维成本约占总运营成本的 15-20%
              </Text>
            </Card>
          </SectionBox>
        </div>
      </ContentSlide>
    </>
  )
}
