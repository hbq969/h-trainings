import { ChapterTitleSlide } from '../../components/ChapterTitleSlide'
import { ContentSlide } from '../../components/ContentSlide'
import { SectionBox, ScrollableTable, CompactCard } from '../../components/shared'
import { Typography } from 'antd'

const { Text, Paragraph } = Typography

// 主要玩家数据
const platforms = [
  { name: 'OpenRouter', positioning: '通用 AI API 聚合', features: '100+ 模型接入、BYOK', security: 'API Key 限额、Provider 白名单' },
  { name: 'Portkey', positioning: '企业 AI 网关', features: '多模型路由、语义缓存', security: '细粒度访问控制、审计日志' },
  { name: 'API7', positioning: '开源 API 网关', features: 'Token 感知限流', security: 'AI 专用限流插件' },
  { name: 'Zuplo', positioning: '边缘 AI 网关', features: '全球 300+ 节点', security: '身份感知限流、Token 预算' },
  { name: 'AWS Bedrock', positioning: '云厂商方案', features: '托管模型、VPC 集成', security: 'IAM 集成、私有端点' },
]

// 市场驱动因素
const drivers = [
  { icon: '🔀', title: '模型碎片化', desc: 'GPT-4、Claude、Gemini 等各有优势，需统一接入' },
  { icon: '💰', title: '成本敏感性', desc: 'Token 计费下，精细化成本控制成刚需' },
  { icon: '📋', title: '合规压力', desc: 'GDPR、行业监管对 AI 数据处理提出约束' },
  { icon: '🔒', title: '安全需求', desc: '提示词注入、模型滥用催生专用安全方案' },
]

export function Chapter02() {
  return (
    <>
      <ChapterTitleSlide
        number="Chapter 02"
        title="行业背景"
        subtitle="AI API 网关市场格局与典型架构"
      />

      <ContentSlide layout="twoCol">
        <div>
          <SectionBox label="Definition" title="AI API 网关定义">
            <Paragraph>
              AI API 网关是位于应用层与 AI 模型服务之间的<Text strong>中间层</Text>，主要职责包括：
            </Paragraph>
            <ul style={{ fontSize: '13px', color: '#363636', paddingLeft: '16px', margin: '8px 0' }}>
              <li>统一接入：标准化 API 接口，屏蔽底层差异</li>
              <li>模型路由：动态选择最优模型</li>
              <li>流量管理：限流、熔断、重试</li>
              <li>成本优化：Token 计费、预算控制</li>
              <li>安全防护：认证授权、内容安全</li>
            </ul>
          </SectionBox>

          <SectionBox label="Market Drivers" title="市场驱动因素">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {drivers.map((d, i) => (
                <CompactCard key={i}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ fontSize: '16px' }}>{d.icon}</span>
                    <Text strong style={{ fontSize: '13px' }}>{d.title}</Text>
                  </div>
                  <Text type="secondary" style={{ fontSize: '12px' }}>{d.desc}</Text>
                </CompactCard>
              ))}
            </div>
          </SectionBox>
        </div>

        <div>
          <SectionBox label="Market Landscape" title="主要玩家分析">
            <ScrollableTable
              dataSource={platforms}
              columns={[
                { title: '平台', dataIndex: 'name', width: 100 },
                { title: '定位', dataIndex: 'positioning', width: 120 },
                { title: '核心特性', dataIndex: 'features' },
                { title: '安全能力', dataIndex: 'security' },
              ]}
              rowKey={(r, i) => String(i)}
            />
          </SectionBox>
        </div>
      </ContentSlide>
    </>
  )
}
