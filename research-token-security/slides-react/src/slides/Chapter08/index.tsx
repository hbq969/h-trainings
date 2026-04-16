import { ChapterTitleSlide } from '../../components/ChapterTitleSlide'
import { ContentSlide } from '../../components/ContentSlide'
import { SectionBox, ScrollableTable, CompactCard } from '../../components/shared'
import { Typography } from 'antd'

const { Text } = Typography

// 合规框架数据
const complianceFrameworks = [
  { framework: 'GDPR', region: '欧盟', requirements: '数据保护、跨境传输' },
  { framework: 'SOC 2', region: '全球', requirements: '安全、可用性、机密性' },
  { framework: 'ISO 27001', region: '全球', requirements: '信息安全管理体系' },
  { framework: 'HIPAA', region: '美国', requirements: '医疗数据保护' },
]

// 审计日志字段
const auditLogFields = [
  { field: 'timestamp', desc: '操作时间戳' },
  { field: 'user_id', desc: '用户标识' },
  { field: 'api_key_id', desc: 'API Key 标识' },
  { field: 'action', desc: '操作类型' },
  { field: 'resource', desc: '资源路径' },
  { field: 'tokens_used', desc: 'Token 消耗' },
  { field: 'model', desc: '调用模型' },
  { field: 'status_code', desc: '响应状态' },
  { field: 'ip_address', desc: '来源 IP' },
  { field: 'request_id', desc: '请求追踪 ID' },
]

// GDPR 关键条款
const gdprArticles = [
  { article: '第5条', title: '数据处理原则', desc: '合法、公平、透明、目的限制' },
  { article: '第17条', title: '删除权', desc: '用户有权要求删除个人数据' },
  { article: '第25条', title: '隐私设计', desc: '默认隐私保护措施' },
  { article: '第32条', title: '安全措施', desc: '技术和管理措施保障安全' },
  { article: '第44条', title: '跨境传输', desc: '需充分性决定或适当保障措施' },
]

export function Chapter08() {
  return (
    <>
      {/* 章节标题页 */}
      <ChapterTitleSlide
        number="Chapter 08"
        title="合规性设计"
        subtitle="满足全球数据保护与审计要求"
      />

      {/* 内容页 */}
      <ContentSlide layout="twoCol">
        {/* 左列：合规框架 */}
        <div>
          <SectionBox label="Compliance Framework" title="合规框架">
            <ScrollableTable
              dataSource={complianceFrameworks}
              columns={[
                { title: '框架', dataIndex: 'framework', width: 90 },
                { title: '适用区域', dataIndex: 'region', width: 70 },
                { title: '核心要求', dataIndex: 'requirements' },
              ]}
              rowKey="framework"
            />
          </SectionBox>

          <SectionBox label="Audit Log Fields" title="审计日志字段">
            <CompactCard>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '6px' }}>
                {auditLogFields.map(item => (
                  <div key={item.field} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '4px 8px',
                    background: 'rgba(20, 110, 245, 0.05)',
                    borderRadius: '4px',
                  }}>
                    <Text code style={{ fontSize: '11px' }}>{item.field}</Text>
                    <Text type="secondary" style={{ fontSize: '11px' }}>{item.desc}</Text>
                  </div>
                ))}
              </div>
            </CompactCard>
          </SectionBox>
        </div>

        {/* 右列：GDPR 条款 */}
        <div>
          <SectionBox label="GDPR Key Articles" title="GDPR 关键条款">
            <ScrollableTable
              dataSource={gdprArticles}
              columns={[
                { title: '条款', dataIndex: 'article', width: 70 },
                { title: '标题', dataIndex: 'title', width: 100 },
                { title: '描述', dataIndex: 'desc' },
              ]}
              rowKey="article"
            />
          </SectionBox>

          <SectionBox label="Compliance Checklist" title="合规检查清单">
            <CompactCard>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {[
                  { item: '数据分类与标记', status: '必须' },
                  { item: '访问日志保留 90 天以上', status: '必须' },
                  { item: '数据处理协议 (DPA)', status: '建议' },
                  { item: '隐私影响评估 (PIA)', status: '建议' },
                  { item: '数据驻留配置', status: '必须' },
                ].map((check, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '6px 10px',
                    background: 'rgba(22, 193, 128, 0.08)',
                    borderRadius: '4px',
                    borderLeft: '3px solid #16c180',
                  }}>
                    <Text style={{ fontSize: '12px' }}>{check.item}</Text>
                    <Text type="success" style={{ fontSize: '11px' }}>{check.status}</Text>
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
