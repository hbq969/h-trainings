import { ChapterTitleSlide } from '../../components/ChapterTitleSlide'
import { ContentSlide } from '../../components/ContentSlide'
import { SectionBox, ScrollableTable, CompactCard } from '../../components/shared'
import { Card, Typography, Tag } from 'antd'

const { Text, Paragraph } = Typography

// TLS 配置数据
const tlsConfig = [
  { item: 'TLS 版本', value: '1.2+', desc: '禁用 TLS 1.0/1.1' },
  { item: 'HSTS', value: '启用', desc: '强制 HTTPS' },
  { item: 'mTLS', value: '推荐用于服务间', desc: '双向认证' },
  { item: '证书轮换', value: '自动化', desc: 'Let\'s Encrypt + 自动续期' },
  { item: 'Cipher Suite', value: '强加密套件', desc: '禁用弱加密算法' },
]

// 存储加密数据
const storageEncryption = [
  { dataType: 'API Key', method: 'AES-256-GCM', keyMgmt: 'KMS' },
  { dataType: '用户密码', method: 'bcrypt/argon2', keyMgmt: '专用盐值' },
  { dataType: '日志数据', method: '列级加密', keyMgmt: '应用层加密' },
  { dataType: '审计记录', method: 'AES-256-GCM', keyMgmt: 'KMS + HSM' },
  { dataType: '缓存数据', method: '透明加密', keyMgmt: 'Redis 加密模块' },
]

// 数据驻留要求
const dataResidency = [
  { region: '欧盟', regulation: 'GDPR', requirement: '数据不出境或标准合同条款', sla: '99.9%' },
  { region: '中国', regulation: '数据安全法/PIPL', requirement: '本地存储 + 安全评估', sla: '99.9%' },
  { region: '美国', regulation: 'CCPA/行业法规', requirement: '隐私声明 + 用户控制', sla: '99.95%' },
  { region: '多区域', regulation: '客户要求', requirement: '区域化部署 + 数据隔离', sla: '99.95%' },
]

export function Chapter05() {
  return (
    <>
      {/* 章节标题页 */}
      <ChapterTitleSlide
        number="Chapter 05"
        title="数据安全"
        subtitle="传输加密、存储加密与数据合规"
      />

      {/* 内容页1: TLS配置 + 存储加密 */}
      <ContentSlide layout="twoCol">
        {/* 左列：数据安全原则 + TLS配置 */}
        <div>
          <SectionBox label="Security Principles" title="数据安全原则">
            <Paragraph style={{ marginBottom: 8 }}>
              遵循<Text strong>零信任架构</Text>原则，所有数据在传输和存储时均需加密保护。
            </Paragraph>
            <Card size="small" style={{ background: 'rgba(20, 110, 245, 0.05)', borderLeft: '3px solid #146ef5' }}>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <Tag color="blue">传输加密</Tag>
                <Tag color="green">存储加密</Tag>
                <Tag color="purple">密钥轮换</Tag>
                <Tag color="orange">访问审计</Tag>
              </div>
            </Card>
          </SectionBox>

          <SectionBox label="TLS Configuration" title="TLS 配置最佳实践">
            <ScrollableTable
              dataSource={tlsConfig}
              columns={[
                { title: '配置项', dataIndex: 'item', width: 100 },
                { title: '推荐值', dataIndex: 'value', width: 120 },
                { title: '说明', dataIndex: 'desc' },
              ]}
              rowKey={(_r, i) => String(i)}
            />
          </SectionBox>
        </div>

        {/* 右列：存储加密 */}
        <div>
          <SectionBox label="Storage Encryption" title="存储加密策略">
            <ScrollableTable
              dataSource={storageEncryption}
              columns={[
                { title: '数据类型', dataIndex: 'dataType', width: 90 },
                { title: '加密方式', dataIndex: 'method', width: 120 },
                { title: '密钥管理', dataIndex: 'keyMgmt' },
              ]}
              rowKey={(_r, i) => String(i)}
            />
          </SectionBox>

          <SectionBox label="Key Management" title="密钥管理要点">
            <CompactCard>
              <ul style={{ margin: 0, paddingLeft: 16, fontSize: 12 }}>
                <li><Text strong>KMS 托管：</Text>使用云厂商 KMS 管理主密钥</li>
                <li><Text strong>密钥轮换：</Text>自动 90 天轮换周期</li>
                <li><Text strong>密钥分级：</Text>主密钥 → 数据加密密钥</li>
                <li><Text strong>审计日志：</Text>所有密钥操作可追溯</li>
              </ul>
            </CompactCard>
          </SectionBox>
        </div>
      </ContentSlide>

      {/* 内容页2: ZDR + 数据驻留 */}
      <ContentSlide layout="twoCol">
        {/* 左列：ZDR说明 */}
        <div>
          <SectionBox label="Zero Data Retention" title="零数据保留 (ZDR)">
            <Card size="small" style={{ background: 'rgba(82, 196, 26, 0.05)', borderLeft: '3px solid #52c41a', marginBottom: 12 }}>
              <Paragraph style={{ marginBottom: 8 }}>
                <Text strong>ZDR 模式</Text>确保用户数据不被存储或用于模型训练：
              </Paragraph>
              <ul style={{ margin: 0, paddingLeft: 16, fontSize: 13 }}>
                <li>请求处理后立即删除临时数据</li>
                <li>不保留对话历史用于训练</li>
                <li>审计日志脱敏存储</li>
                <li>符合企业数据主权要求</li>
              </ul>
            </Card>
            <CompactCard>
              <Text strong>适用场景：</Text>
              <Text type="secondary"> 金融、医疗、政府等敏感行业，或对数据主权有严格要求的客户</Text>
            </CompactCard>
          </SectionBox>

          <SectionBox label="Data Lifecycle" title="数据生命周期管理">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <CompactCard>
                <Text code>请求阶段</Text>
                <Text type="secondary" style={{ marginLeft: 8 }}>内存处理，不落盘</Text>
              </CompactCard>
              <CompactCard>
                <Text code>响应阶段</Text>
                <Text type="secondary" style={{ marginLeft: 8 }}>流式返回，即时清理</Text>
              </CompactCard>
              <CompactCard>
                <Text code>审计阶段</Text>
                <Text type="secondary" style={{ marginLeft: 8 }}>脱敏后异步写入</Text>
              </CompactCard>
            </div>
          </SectionBox>
        </div>

        {/* 右列：数据驻留要求 */}
        <div>
          <SectionBox label="Data Residency" title="数据驻留合规要求">
            <ScrollableTable
              dataSource={dataResidency}
              columns={[
                { title: '区域', dataIndex: 'region', width: 70 },
                { title: '法规', dataIndex: 'regulation', width: 130 },
                { title: '合规要求', dataIndex: 'requirement' },
                { title: 'SLA', dataIndex: 'sla', width: 70 },
              ]}
              rowKey={(_r, i) => String(i)}
            />
          </SectionBox>

          <SectionBox label="Implementation" title="实施建议">
            <CompactCard>
              <ul style={{ margin: 0, paddingLeft: 16, fontSize: 12 }}>
                <li><Text strong>区域化部署：</Text>按客户要求选择数据中心</li>
                <li><Text strong>数据隔离：</Text>租户级别数据隔离</li>
                <li><Text strong>跨境传输：</Text>标准合同条款 (SCCs)</li>
                <li><Text strong>合规认证：</Text>SOC2、ISO27001、等保</li>
              </ul>
            </CompactCard>
          </SectionBox>
        </div>
      </ContentSlide>
    </>
  )
}
