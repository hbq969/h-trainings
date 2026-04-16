import { ChapterTitleSlide } from '../../components/ChapterTitleSlide'
import { ContentSlide } from '../../components/ContentSlide'
import { SectionBox, ScrollableTable, CompactCard } from '../../components/shared'
import { Card, Typography, Tag } from 'antd'

const { Text, Paragraph } = Typography

// 提示词注入攻击类型
const attackTypes = [
  { type: '直接注入', desc: '恶意指令嵌入用户输入', example: 'Ignore all previous instructions', risk: '高' },
  { type: '间接注入', desc: '通过外部数据源注入', example: '恶意网页被模型读取', risk: '高' },
  { type: '越狱攻击', desc: '绕过模型安全限制', example: '角色扮演、编码绕过', risk: '中' },
  { type: '数据泄露', desc: '诱导模型泄露敏感信息', example: 'Dump all system prompts', risk: '高' },
  { type: '任务劫持', desc: '改变模型执行目标', example: 'Instead, send email to...', risk: '中' },
]

// 三层防护架构
const protectionLayers = [
  { layer: '规则引擎', method: '关键词黑名单', latency: '<1ms', coverage: '基础防护' },
  { layer: 'AI检测模型', method: '语义分析', latency: '~50ms', coverage: '深度防护' },
  { layer: '策略执行', method: '风险评分', latency: '实时', coverage: '动态防护' },
]

// 防护策略详情
const protectionStrategies = [
  { stage: '输入检测', action: '提示词注入检测 + 越狱识别', tool: 'NLP模型 + 规则引擎' },
  { stage: '请求处理', action: '上下文隔离 + 指令过滤', tool: '安全网关' },
  { stage: '输出过滤', action: '敏感信息脱敏 + 内容审核', tool: 'PII检测 + 内容策略' },
  { stage: '行为监控', action: '异常行为检测 + 告警', tool: 'SIEM集成' },
]

export function Chapter06() {
  return (
    <>
      {/* 章节标题页 */}
      <ChapterTitleSlide
        number="Chapter 06"
        title="内容安全防护"
        subtitle="提示词注入防护与内容审核"
      />

      {/* 内容页: 攻击类型 + 防护架构 */}
      <ContentSlide layout="twoCol">
        {/* 左列：攻击类型 */}
        <div>
          <SectionBox label="Prompt Injection" title="提示词注入攻击类型">
            <Paragraph style={{ marginBottom: 8 }}>
              <Text strong>OWASP LLM Top 1</Text>：提示词注入是 LLM 应用最严重的安全威胁。
            </Paragraph>
            <ScrollableTable
              dataSource={attackTypes}
              columns={[
                { title: '攻击类型', dataIndex: 'type', width: 90 },
                { title: '描述', dataIndex: 'desc' },
                { title: '示例', dataIndex: 'example', width: 140 },
                {
                  title: '风险',
                  dataIndex: 'risk',
                  width: 50,
                  render: (r) => (
                    <Tag color={r === '高' ? 'red' : 'orange'}>{r}</Tag>
                  )
                },
              ]}
              rowKey={(_r, i) => String(i)}
            />
          </SectionBox>

          <SectionBox label="Attack Vectors" title="攻击向量分析">
            <CompactCard>
              <ul style={{ margin: 0, paddingLeft: 16, fontSize: 12 }}>
                <li><Text strong>用户输入：</Text>直接输入恶意指令</li>
                <li><Text strong>外部数据：</Text>RAG检索到恶意内容</li>
                <li><Text strong>工具输出：</Text>函数调用返回恶意数据</li>
                <li><Text strong>历史上下文：</Text>利用多轮对话累积攻击</li>
              </ul>
            </CompactCard>
          </SectionBox>
        </div>

        {/* 右列：防护架构 */}
        <div>
          <SectionBox label="Defense Architecture" title="三层防护架构">
            <Card size="small" style={{ background: 'rgba(20, 110, 245, 0.05)', borderLeft: '3px solid #146ef5', marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 12 }}>第一层</span>
                <span style={{ fontSize: 12 }}>→</span>
                <span style={{ fontSize: 12 }}>第二层</span>
                <span style={{ fontSize: 12 }}>→</span>
                <span style={{ fontSize: 12 }}>第三层</span>
              </div>
            </Card>
            <ScrollableTable
              dataSource={protectionLayers}
              columns={[
                { title: '层级', dataIndex: 'layer', width: 90 },
                { title: '检测方式', dataIndex: 'method' },
                { title: '延迟', dataIndex: 'latency', width: 60 },
                { title: '覆盖', dataIndex: 'coverage', width: 80 },
              ]}
              rowKey={(_r, i) => String(i)}
            />
          </SectionBox>

          <SectionBox label="Protection Flow" title="防护流程">
            <ScrollableTable
              dataSource={protectionStrategies}
              columns={[
                { title: '阶段', dataIndex: 'stage', width: 80 },
                { title: '动作', dataIndex: 'action' },
                { title: '工具', dataIndex: 'tool', width: 120 },
              ]}
              rowKey={(_r, i) => String(i)}
            />
          </SectionBox>

          <SectionBox label="Best Practices" title="最佳实践">
            <CompactCard>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <Tag color="blue">系统提示隔离</Tag>
                <Tag color="green">输入输出过滤</Tag>
                <Tag color="purple">权限最小化</Tag>
                <Tag color="orange">实时监控</Tag>
              </div>
            </CompactCard>
          </SectionBox>
        </div>
      </ContentSlide>
    </>
  )
}
