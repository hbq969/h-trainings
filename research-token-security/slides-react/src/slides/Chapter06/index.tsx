import { ChapterTitleSlide } from '../../components/ChapterTitleSlide'
import { ContentSlide } from '../../components/ContentSlide'
import { SectionBox, ScrollableTable } from '../../components/shared'
import { Typography, Tag } from 'antd'

const { Text } = Typography

// 攻击类型
const attackTypes = [
  { type: '直接注入', desc: '恶意指令嵌入用户输入', example: 'Ignore all previous instructions...' },
  { type: '间接注入', desc: '通过外部数据源注入', example: '恶意网页被模型读取后触发' },
  { type: '越狱 (Jailbreak)', desc: '绕过模型安全限制', example: '角色扮演、编码、多轮诱导' },
  { type: '系统提示词提取', desc: '诱导模型泄露系统指令', example: 'Repeat everything above' },
  { type: '多模态注入', desc: '通过图片/音频嵌入指令', example: '图片中隐藏文字指令' },
]

// 三层防护
const defenseLayers = [
  { layer: '第1层：规则引擎', method: '关键词黑名单、正则匹配', latency: '<1ms' },
  { layer: '第2层：AI检测模型', method: '语义分析、注入概率评分', latency: '~50ms' },
  { layer: '第3层：策略执行', method: '风险评分、拦截/放行', latency: '实时' },
]

// 风险等级处理
const riskHandling = [
  { level: '安全', score: '<0.3', action: '直接放行' },
  { level: '低风险', score: '0.3-0.6', action: '记录 + 放行' },
  { level: '中风险', score: '0.6-0.8', action: '记录 + 告警 + 可选拦截' },
  { level: '高风险', score: '>0.8', action: '拦截 + 告警 + 审计' },
]

const riskColors: Record<string, string> = {
  '安全': 'green',
  '低风险': 'blue',
  '中风险': 'orange',
  '高风险': 'red',
}

export function Chapter06() {
  return (
    <>
      <ChapterTitleSlide
        number="Chapter 06"
        title="内容安全防护"
        subtitle="提示词注入检测与输出过滤"
      />

      <ContentSlide layout="twoCol">
        <div>
          <SectionBox label="OWASP LLM01" title="提示词注入攻击类型">
            <ScrollableTable
              dataSource={attackTypes}
              columns={[
                { title: '攻击类型', dataIndex: 'type', width: 120 },
                { title: '描述', dataIndex: 'desc' },
                { title: '示例', dataIndex: 'example' },
              ]}
              rowKey={(_r, i) => String(i)}
            />
          </SectionBox>

          <div style={{ marginTop: '16px', padding: '12px', background: 'rgba(238, 29, 54, 0.05)', borderRadius: '8px', borderLeft: '3px solid #ee1d36' }}>
            <Text type="danger" strong>关键发现：</Text>
            <Text> 73% 的生产环境 AI 应用存在提示词注入漏洞</Text>
          </div>
        </div>

        <div>
          <SectionBox label="Defense Architecture" title="三层防护架构">
            <ScrollableTable
              dataSource={defenseLayers}
              columns={[
                { title: '防护层', dataIndex: 'layer' },
                { title: '检测方式', dataIndex: 'method' },
                { title: '延迟', dataIndex: 'latency', width: 70 },
              ]}
              rowKey={(_r, i) => String(i)}
            />
          </SectionBox>

          <SectionBox label="Risk Handling" title="风险等级处理">
            <ScrollableTable
              dataSource={riskHandling}
              columns={[
                { title: '风险等级', dataIndex: 'level', render: (l) => <Tag color={riskColors[l]}>{l}</Tag> },
                { title: '评分范围', dataIndex: 'score' },
                { title: '处理方式', dataIndex: 'action' },
              ]}
              rowKey={(_r, i) => String(i)}
            />
          </SectionBox>
        </div>
      </ContentSlide>
    </>
  )
}
