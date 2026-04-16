import { ChapterTitleSlide } from '../../components/ChapterTitleSlide'
import { ContentSlide } from '../../components/ContentSlide'
import { SectionBox, ScrollableTable, CompactCard } from '../../components/shared'
import { Card, Typography, Tag } from 'antd'

const { Text, Paragraph } = Typography

// 认证方式对比数据
const authMethods = [
  { method: 'API Key', scenario: '服务端调用', security: '中', complexity: '低' },
  { method: 'OAuth 2.0', scenario: '第三方应用', security: '高', complexity: '中' },
  { method: 'mTLS', scenario: '服务间通信', security: '极高', complexity: '高' },
  { method: 'SSO', scenario: '企业内部', security: '高', complexity: '中' },
]

// API Key 层级结构
const keyLevels = [
  { level: 'Root Key', scope: '组织级', desc: '管理所有资源，仅限管理员' },
  { level: 'Project Key', scope: '项目级', desc: '项目内所有模型访问权限' },
  { level: 'Service Key', scope: '服务级', desc: '特定模型或端点访问权限' },
]

// MFA 场景数据
const mfaScenarios = [
  { scenario: '控制台登录', requirement: '必须', reason: '管理敏感配置' },
  { scenario: 'Management API', requirement: '建议', reason: '管理密钥生命周期' },
  { scenario: 'Business API', requirement: '不适用', reason: '服务端自动化' },
]

// RBAC 角色数据
const rbacRoles = [
  { role: 'Admin', permissions: '全部权限', target: '组织管理员' },
  { role: 'Developer', permissions: '创建/管理自有 Key', target: '开发人员' },
  { role: 'Viewer', permissions: '只读访问', target: '审计人员' },
]

export function Chapter04() {
  return (
    <>
      {/* 章节标题页 */}
      <ChapterTitleSlide
        number="Chapter 04"
        title="认证与访问控制"
        subtitle="API Key 管理与 RBAC 设计"
      />

      {/* 内容页1: 认证方式对比 + API Key 层级 */}
      <ContentSlide layout="twoCol">
        {/* 左列 */}
        <div>
          <SectionBox label="Authentication Methods" title="认证方式对比">
            <ScrollableTable
              dataSource={authMethods}
              columns={[
                { title: '认证方式', dataIndex: 'method', width: 100 },
                { title: '适用场景', dataIndex: 'scenario', width: 100 },
                {
                  title: '安全等级',
                  dataIndex: 'security',
                  width: 80,
                  render: (s) => {
                    const color = s === '极高' ? 'error' : s === '高' ? 'warning' : 'default'
                    return <Tag color={color}>{s}</Tag>
                  }
                },
                { title: '实现复杂度', dataIndex: 'complexity', width: 80 },
              ]}
              rowKey="method"
            />
          </SectionBox>

          <SectionBox label="API Key Hierarchy" title="API Key 层级结构">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {keyLevels.map((k, i) => (
                <CompactCard key={i}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Tag color="blue">{k.level}</Tag>
                    <Tag>{k.scope}</Tag>
                    <Text type="secondary" style={{ fontSize: '12px' }}>{k.desc}</Text>
                  </div>
                </CompactCard>
              ))}
            </div>
          </SectionBox>
        </div>

        {/* 右列: 架构图示 */}
        <div>
          <SectionBox label="Key Hierarchy Diagram" title="层级架构">
            <Card size="small" style={{ height: 'calc(100% - 40px)' }}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px',
                padding: '16px 0'
              }}>
                {/* Root Key */}
                <div style={{
                  padding: '12px 24px',
                  background: 'linear-gradient(135deg, #ff4d4f, #ff7a45)',
                  borderRadius: '8px',
                  color: '#fff',
                  fontWeight: 600,
                  width: '200px',
                  textAlign: 'center'
                }}>
                  Root Key (组织级)
                </div>

                {/* 连接线 */}
                <div style={{ width: '2px', height: '20px', background: '#d9d9d9' }} />

                {/* Project Keys */}
                <div style={{ display: 'flex', gap: '16px' }}>
                  {['Project A', 'Project B'].map(p => (
                    <div key={p} style={{
                      padding: '10px 20px',
                      background: 'linear-gradient(135deg, #faad14, #ffc53d)',
                      borderRadius: '6px',
                      color: '#fff',
                      fontWeight: 500,
                      width: '120px',
                      textAlign: 'center',
                      fontSize: '13px'
                    }}>
                      {p}
                      <div style={{
                        width: '2px',
                        height: '16px',
                        background: '#d9d9d9',
                        margin: '8px auto 0'
                      }} />
                    </div>
                  ))}
                </div>

                {/* Service Keys */}
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
                  {['GPT-4', 'Claude', 'Gemini', 'Llama'].map(s => (
                    <div key={s} style={{
                      padding: '6px 12px',
                      background: 'linear-gradient(135deg, #52c41a, #73d13d)',
                      borderRadius: '4px',
                      color: '#fff',
                      fontSize: '12px'
                    }}>
                      {s}
                    </div>
                  ))}
                </div>
              </div>

              <Paragraph style={{ marginTop: '16px', fontSize: '12px', textAlign: 'center' }} type="secondary">
                每个层级的 Key 只能访问其权限范围内的资源
              </Paragraph>
            </Card>
          </SectionBox>
        </div>
      </ContentSlide>

      {/* 内容页2: MFA 与 RBAC */}
      <ContentSlide layout="twoCol">
        {/* 左列: MFA */}
        <div>
          <SectionBox label="Multi-Factor Authentication" title="MFA 场景要求">
            <ScrollableTable
              dataSource={mfaScenarios}
              columns={[
                { title: '场景', dataIndex: 'scenario', width: 120 },
                {
                  title: 'MFA 要求',
                  dataIndex: 'requirement',
                  width: 100,
                  render: (r) => {
                    const color = r === '必须' ? 'error' : r === '建议' ? 'warning' : 'default'
                    return <Tag color={color}>{r}</Tag>
                  }
                },
                { title: '理由', dataIndex: 'reason' },
              ]}
              rowKey="scenario"
            />
          </SectionBox>

          <Card size="small" style={{ marginTop: '16px', background: 'rgba(20, 110, 245, 0.05)' }}>
            <Paragraph style={{ fontSize: '12px', marginBottom: 0 }}>
              <Text strong>MFA 最佳实践：</Text>
              <br />
              1. 支持 TOTP、短信、硬件 Key 等多种方式
              <br />
              2. 敏感操作二次确认（删除 Key、修改权限）
              <br />
              3. 异常登录检测与强制 MFA 触发
            </Paragraph>
          </Card>
        </div>

        {/* 右列: RBAC */}
        <div>
          <SectionBox label="Role-Based Access Control" title="RBAC 角色设计">
            <ScrollableTable
              dataSource={rbacRoles}
              columns={[
                {
                  title: '角色',
                  dataIndex: 'role',
                  width: 100,
                  render: (r) => {
                    const color = r === 'Admin' ? 'error' : r === 'Developer' ? 'warning' : 'default'
                    return <Tag color={color}>{r}</Tag>
                  }
                },
                { title: '权限', dataIndex: 'permissions' },
                { title: '适用对象', dataIndex: 'target' },
              ]}
              rowKey="role"
            />
          </SectionBox>

          <Card size="small" style={{ marginTop: '16px', background: 'rgba(20, 110, 245, 0.05)' }}>
            <Paragraph style={{ fontSize: '12px', marginBottom: 0 }}>
              <Text strong>权限粒度：</Text>
              <br />
              <Text code>api-key:create</Text> <Text code>api-key:read</Text> <Text code>api-key:update</Text> <Text code>api-key:delete</Text>
              <br />
              <Text code>model:invoke</Text> <Text code>audit:read</Text> <Text code>config:manage</Text>
            </Paragraph>
          </Card>
        </div>
      </ContentSlide>
    </>
  )
}
