import { ChapterTitleSlide } from '../../components/ChapterTitleSlide'
import { ContentSlide } from '../../components/ContentSlide'
import { SectionBox, ScrollableTable } from '../../components/shared'
import { Typography } from 'antd'

const { Text } = Typography

// 认证方式对比
const authMethods = [
  { method: 'API Key (Bearer Token)', scenario: '服务端调用、简单集成', security: '中', complexity: '低' },
  { method: 'OAuth 2.0 / PKCE', scenario: '第三方应用接入、用户授权', security: '高', complexity: '中' },
  { method: 'mTLS', scenario: '服务间通信、高安全需求', security: '极高', complexity: '高' },
  { method: 'SSO (SAML/OIDC)', scenario: '企业内部、统一身份管理', security: '高', complexity: '中' },
]

// MFA 场景
const mfaScenarios = [
  { scenario: '控制台登录', requirement: '必须', reason: '管理敏感配置' },
  { scenario: 'Management API 调用', requirement: '建议', reason: '管理密钥生命周期' },
  { scenario: '业务 API 调用', requirement: '不适用', reason: '服务端自动化调用' },
  { scenario: '高权限操作', requirement: '必须', reason: '密钥创建、策略修改' },
]

// RBAC 角色
const rbacRoles = [
  { role: 'Admin', permissions: '全部权限、策略管理', target: '组织管理员' },
  { role: 'Developer', permissions: '创建/管理自有 Key', target: '开发人员' },
  { role: 'Viewer', permissions: '只读访问、查看日志', target: '审计人员' },
  { role: 'Service Account', permissions: '仅 API 调用', target: '自动化服务' },
]

export function Chapter04() {
  return (
    <>
      <ChapterTitleSlide
        number="Chapter 04"
        title="认证与访问控制"
        subtitle="零信任原则下的身份与权限管理"
      />

      <ContentSlide layout="twoCol">
        <div>
          <SectionBox label="Design Principles" title="设计原则">
            <ul style={{ fontSize: '13px', color: '#363636', paddingLeft: '16px', margin: 0 }}>
              <li><Text strong>零信任原则</Text>：每个请求都需验证</li>
              <li><Text strong>最小权限原则</Text>：默认拒绝，仅授予必要权限</li>
              <li><Text strong>身份优先</Text>：基于身份而非 IP 进行访问控制</li>
              <li><Text strong>职责分离</Text>：管理凭证与业务凭证隔离</li>
            </ul>
          </SectionBox>

          <SectionBox label="Authentication Methods" title="认证方式对比">
            <ScrollableTable
              dataSource={authMethods}
              columns={[
                { title: '认证方式', dataIndex: 'method' },
                { title: '适用场景', dataIndex: 'scenario' },
                { title: '安全等级', dataIndex: 'security', width: 70 },
                { title: '复杂度', dataIndex: 'complexity', width: 70 },
              ]}
              rowKey={(_r, i) => String(i)}
            />
          </SectionBox>
        </div>

        <div>
          <SectionBox label="MFA Requirements" title="MFA 实施场景">
            <ScrollableTable
              dataSource={mfaScenarios}
              columns={[
                { title: '场景', dataIndex: 'scenario' },
                { title: 'MFA 要求', dataIndex: 'requirement', width: 80 },
                { title: '理由', dataIndex: 'reason' },
              ]}
              rowKey={(_r, i) => String(i)}
            />
          </SectionBox>

          <SectionBox label="RBAC Design" title="角色设计">
            <ScrollableTable
              dataSource={rbacRoles}
              columns={[
                { title: '角色', dataIndex: 'role', width: 120 },
                { title: '权限', dataIndex: 'permissions' },
                { title: '适用对象', dataIndex: 'target' },
              ]}
              rowKey={(_r, i) => String(i)}
            />
          </SectionBox>
        </div>
      </ContentSlide>
    </>
  )
}
