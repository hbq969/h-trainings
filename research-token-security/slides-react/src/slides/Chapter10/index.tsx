import { ChapterTitleSlide } from '../../components/ChapterTitleSlide'
import { ContentSlide } from '../../components/ContentSlide'
import { SectionBox, ScrollableTable, CompactCard } from '../../components/shared'
import { Typography } from 'antd'

const { Text } = Typography

// 设计目标数据
const designGoals = [
  { metric: '可用性', target: '99.95%', desc: '年度服务可用率' },
  { metric: '请求延迟', target: 'P99 < 3s', desc: '99%请求响应时间' },
  { metric: '故障恢复', target: 'RTO < 5min', desc: '恢复时间目标' },
  { metric: '数据丢失', target: 'RPO < 1min', desc: '恢复点目标' },
]

// 多区域节点
const regionNodes = [
  { region: 'us-east-1', location: '美国东部', status: '主节点', latency: '10ms' },
  { region: 'eu-west-1', location: '欧洲西部', status: '备节点', latency: '80ms' },
  { region: 'ap-southeast-1', location: '亚太东南', status: '备节点', latency: '50ms' },
]

// 故障转移步骤
const failoverSteps = [
  { step: '1', action: '健康检查失败', detail: '连续3次检测失败' },
  { step: '2', action: '触发告警', detail: '通知运维团队' },
  { step: '3', action: '流量切换', detail: 'DNS更新到备用节点' },
  { step: '4', action: '服务恢复', detail: '备用节点接管请求' },
  { step: '5', action: '故障修复', detail: '主节点恢复后回切' },
]

export function Chapter10() {
  return (
    <>
      {/* 章节标题页 */}
      <ChapterTitleSlide
        number="Chapter 10"
        title="高可用架构"
        subtitle="多区域部署与故障自动转移"
      />

      {/* 内容页 */}
      <ContentSlide layout="twoCol">
        {/* 左列：设计目标 */}
        <div>
          <SectionBox label="Design Goals" title="设计目标">
            <ScrollableTable
              dataSource={designGoals}
              columns={[
                { title: '指标', dataIndex: 'metric', width: 90 },
                { title: '目标值', dataIndex: 'target', width: 100 },
                { title: '说明', dataIndex: 'desc' },
              ]}
              rowKey="metric"
            />
          </SectionBox>

          <SectionBox label="Multi-Region Deployment" title="多区域部署">
            <ScrollableTable
              dataSource={regionNodes}
              columns={[
                { title: '区域', dataIndex: 'region', width: 120 },
                { title: '位置', dataIndex: 'location', width: 90 },
                { title: '状态', dataIndex: 'status', width: 70 },
                { title: '延迟', dataIndex: 'latency', width: 60 },
              ]}
              rowKey="region"
            />
          </SectionBox>
        </div>

        {/* 右列：架构图与故障转移 */}
        <div>
          <SectionBox label="Architecture Pattern" title="架构模式">
            <CompactCard>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                padding: '10px',
              }}>
                {/* 用户层 */}
                <div style={{
                  textAlign: 'center',
                  padding: '10px',
                  background: 'linear-gradient(135deg, #e6f4ff, #bae0ff)',
                  borderRadius: '6px',
                }}>
                  <Text strong style={{ fontSize: '13px' }}>用户请求</Text>
                </div>
                {/* 箭头 */}
                <div style={{ textAlign: 'center', color: '#146ef5' }}>↓</div>
                {/* 负载均衡 */}
                <div style={{
                  textAlign: 'center',
                  padding: '10px',
                  background: 'linear-gradient(135deg, #f6ffed, #b7eb8f)',
                  borderRadius: '6px',
                }}>
                  <Text strong style={{ fontSize: '13px' }}>全球负载均衡 (GSLB)</Text>
                </div>
                {/* 箭头 */}
                <div style={{ textAlign: 'center', color: '#146ef5' }}>↓</div>
                {/* API网关层 */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '8px',
                }}>
                  {['US', 'EU', 'AP'].map(region => (
                    <div key={region} style={{
                      textAlign: 'center',
                      padding: '8px',
                      background: region === 'US' ? 'rgba(20, 110, 245, 0.15)' : 'rgba(122, 61, 255, 0.1)',
                      borderRadius: '4px',
                      border: region === 'US' ? '2px solid #146ef5' : '1px solid #ddd',
                    }}>
                      <Text strong style={{ fontSize: '12px' }}>{region}</Text>
                      <Text type="secondary" style={{ fontSize: '10px', display: 'block' }}>
                        {region === 'US' ? '主' : '备'}
                      </Text>
                    </div>
                  ))}
                </div>
              </div>
            </CompactCard>
          </SectionBox>

          <SectionBox label="Failover Process" title="故障转移流程">
            <CompactCard>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {failoverSteps.map(item => (
                  <div key={item.step} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '6px 10px',
                    background: 'rgba(20, 110, 245, 0.05)',
                    borderRadius: '4px',
                  }}>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '22px',
                      height: '22px',
                      background: 'linear-gradient(135deg, #146ef5, #7a3dff)',
                      color: '#fff',
                      fontSize: '11px',
                      fontWeight: 600,
                      borderRadius: '50%',
                    }}>{item.step}</span>
                    <Text strong style={{ fontSize: '12px', minWidth: '80px' }}>{item.action}</Text>
                    <Text type="secondary" style={{ fontSize: '11px' }}>{item.detail}</Text>
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
