import { ChapterTitleSlide } from '../../components/ChapterTitleSlide'
import { ContentSlide } from '../../components/ContentSlide'
import { SectionBox, ScrollableTable, CompactCard } from '../../components/shared'
import { Typography } from 'antd'

const { Text } = Typography

// TLS 配置
const tlsConfig = [
  { item: 'TLS 版本', recommended: '1.2+ (推荐 1.3)', note: '禁用 TLS 1.0/1.1' },
  { item: 'HSTS', recommended: '启用', note: '强制 HTTPS' },
  { item: 'mTLS', recommended: '推荐用于服务间', note: '双向认证' },
  { item: '密码套件', recommended: '强加密套件', note: '禁用弱加密算法' },
]

// 存储加密
const storageEncryption = [
  { dataType: 'API Key', method: 'AES-256-GCM', keyManagement: 'KMS' },
  { dataType: '用户密码', method: 'bcrypt/argon2', keyManagement: '专用盐值' },
  { dataType: '日志数据', method: '列级加密', keyManagement: '应用层加密' },
  { dataType: '数据库', method: 'TDE', keyManagement: 'DB 内置' },
]

// 数据驻留要求
const dataResidency = [
  { region: '欧盟 (GDPR)', requirement: '个人数据必须在 EU/EEA 或充分性认定国家处理' },
  { region: '中国', requirement: '重要数据出境需安全评估' },
  { region: '俄罗斯', requirement: '个人数据存储必须在俄罗斯境内' },
]

export function Chapter05() {
  return (
    <>
      <ChapterTitleSlide
        number="Chapter 05"
        title="数据安全"
        subtitle="传输加密、存储安全与数据驻留"
      />

      <ContentSlide layout="twoCol">
        <div>
          <SectionBox label="Security Principles" title="数据安全原则">
            <ul style={{ fontSize: '13px', color: '#363636', paddingLeft: '16px', margin: 0 }}>
              <li><Text strong>数据最小化</Text>：仅收集必要数据</li>
              <li><Text strong>端到端加密</Text>：传输和存储全程加密</li>
              <li><Text strong>密钥分离</Text>：业务数据与加密密钥分离存储</li>
              <li><Text strong>可审计性</Text>：所有数据访问可追溯</li>
            </ul>
          </SectionBox>

          <SectionBox label="TLS Configuration" title="传输层安全配置">
            <ScrollableTable
              dataSource={tlsConfig}
              columns={[
                { title: '配置项', dataIndex: 'item' },
                { title: '推荐值', dataIndex: 'recommended' },
                { title: '说明', dataIndex: 'note' },
              ]}
              rowKey={(_r, i) => String(i)}
            />
          </SectionBox>

          <SectionBox label="Storage Encryption" title="存储层加密">
            <ScrollableTable
              dataSource={storageEncryption}
              columns={[
                { title: '数据类型', dataIndex: 'dataType' },
                { title: '加密方式', dataIndex: 'method' },
                { title: '密钥管理', dataIndex: 'keyManagement' },
              ]}
              rowKey={(_r, i) => String(i)}
            />
          </SectionBox>
        </div>

        <div>
          <SectionBox label="Zero Data Retention" title="ZDR 零数据保留">
            <div style={{ display: 'grid', gap: '8px' }}>
              <CompactCard>
                <Text strong>定义</Text>
                <br />
                <Text type="secondary" style={{ fontSize: '12px' }}>Provider 不存储任何用户 Prompt 或输出</Text>
              </CompactCard>
              <CompactCard>
                <Text strong>强制执行</Text>
                <br />
                <Text type="secondary" style={{ fontSize: '12px' }}>可在 Guardrails 中强制启用</Text>
              </CompactCard>
              <CompactCard>
                <Text strong>验证</Text>
                <br />
                <Text type="secondary" style={{ fontSize: '12px' }}>需监控供应商合规性</Text>
              </CompactCard>
            </div>
          </SectionBox>

          <SectionBox label="Data Residency" title="数据驻留要求">
            <ScrollableTable
              dataSource={dataResidency}
              columns={[
                { title: '区域', dataIndex: 'region' },
                { title: '要求', dataIndex: 'requirement' },
              ]}
              rowKey={(_r, i) => String(i)}
            />
          </SectionBox>
        </div>
      </ContentSlide>
    </>
  )
}
