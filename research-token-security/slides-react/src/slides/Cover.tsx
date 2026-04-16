import { CoverSlide } from '../../components/CoverSlide'

export function Cover() {
  return (
    <CoverSlide
      label="Security Research Report"
      title="<span class='titleAccent'>AI Token API</span> 网关<br>安全研究报告"
      subtitle="系统性分析 AI API 网关/中转平台的安全防护与设计"
      date="2026-04-16"
      meta={[
        { icon: '📊', text: '12 章节' },
        { icon: '🔒', text: '7 安全维度' },
      ]}
    />
  )
}
