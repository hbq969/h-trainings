import { ChapterTitleSlide } from '../../components/ChapterTitleSlide'
import { ContentSlide } from '../../components/ContentSlide'
import { SectionBox, ScrollableTable, CompactCard } from '../../components/shared'
import { Card, Typography, Tag } from 'antd'

const { Text } = Typography

// 核心结论数据
const conclusions = [
  { num: '1', title: 'AI API 网关安全是系统工程', desc: '认证、限流、内容安全、合规、高可用必须协同设计' },
  { num: '2', title: 'Token 感知限流是必要能力', desc: 'RPS 限流已不适用，Token 计费模型需要新的流量控制范式' },
  { num: '3', title: '内容安全是差异化竞争点', desc: '提示词注入检测和输出过滤能力直接影响客户信任' },
  { num: '4', title: '合规能力决定市场准入', desc: 'GDPR、数据驻留、审计日志是企业客户的硬性要求' },
  { num: '5', title: '安全与成本必须统一设计', desc: '安全措施不当反而增加成本风险，需整体规划' },
]

// 风险缓解措施数据
const riskMitigations = [
  { risk: 'API Key 泄露', mitigation: 'GitHub Secret Scanning + 定期轮换 + 最小权限原则' },
  { risk: '提示词注入', mitigation: '多层检测 + 指令层级 + 沙箱隔离' },
  { risk: '成本爆发', mitigation: 'Token 限流 + 成本熔断 + 异常告警' },
  { risk: '数据泄露', mitigation: 'TLS 1.3 + 加密存储 + ZDR + DLP' },
]

// 后续研究方向
const futureDirections = [
  { area: '自适应安全', desc: '基于 ML 的异常检测和动态策略调整' },
  { area: '联邦学习', desc: '隐私保护下的跨域模型协作' },
  { area: '零信任架构', desc: '细粒度访问控制和持续身份验证' },
  { area: '安全基准', desc: 'AI API 网关安全成熟度模型' },
]

export function Chapter12() {
  return (
    <>
      {/* 章节标题页 */}
      <ChapterTitleSlide
        number="Chapter 12"
        title="结论与建议"
        subtitle="核心结论与后续研究方向"
      />

      {/* 内容页 */}
      <ContentSlide layout="twoCol">
        {/* 左列：核心结论 */}
        <div>
          <SectionBox label="Core Conclusions" title="核心结论">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {conclusions.map(c => (
                <CompactCard key={c.num}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '22px',
                      height: '22px',
                      background: 'linear-gradient(135deg, #146ef5, #7a3dff)',
                      color: '#fff',
                      fontSize: '12px',
                      fontWeight: 600,
                      borderRadius: '50%',
                      flexShrink: 0,
                    }}>{c.num}</span>
                    <div>
                      <Text strong style={{ fontSize: '13px', display: 'block', marginBottom: '2px' }}>
                        {c.title}
                      </Text>
                      <Text type="secondary" style={{ fontSize: '11px' }}>{c.desc}</Text>
                    </div>
                  </div>
                </CompactCard>
              ))}
            </div>
          </SectionBox>
        </div>

        {/* 右列：风险缓解 + 后续研究 */}
        <div>
          <SectionBox label="Risk Mitigation" title="风险缓解措施">
            <ScrollableTable
              dataSource={riskMitigations}
              columns={[
                { title: '风险', dataIndex: 'risk', width: 100 },
                { title: '缓解措施', dataIndex: 'mitigation' },
              ]}
              rowKey={(_r, i) => String(i)}
            />
          </SectionBox>

          <SectionBox label="Future Research" title="后续研究方向">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {futureDirections.map((f, idx) => (
                <Card
                  key={idx}
                  size="small"
                  style={{
                    background: 'rgba(255,255,255,0.8)',
                    borderRadius: '6px',
                  }}
                >
                  <Tag color="blue" style={{ margin: 0, marginBottom: '4px' }}>
                    {f.area}
                  </Tag>
                  <Text type="secondary" style={{ fontSize: '11px', display: 'block' }}>
                    {f.desc}
                  </Text>
                </Card>
              ))}
            </div>
          </SectionBox>

          <Card
            size="small"
            style={{
              marginTop: '12px',
              background: 'linear-gradient(135deg, rgba(20, 110, 245, 0.1), rgba(122, 61, 255, 0.1))',
              border: '1px solid rgba(20, 110, 245, 0.2)',
            }}
          >
            <Text strong style={{ fontSize: '13px', display: 'block', marginBottom: '4px' }}>
              最终建议
            </Text>
            <Text style={{ fontSize: '12px' }}>
              AI API 网关安全建设应遵循"最小权限、深度防御、持续监控"原则，
              分阶段实施，优先解决 P0 级风险，建立安全运营闭环。
            </Text>
          </Card>
        </div>
      </ContentSlide>
    </>
  )
}
