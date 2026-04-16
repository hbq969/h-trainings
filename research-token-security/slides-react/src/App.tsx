import { ConfigProvider } from 'antd'
import { theme } from './theme'

function App() {
  return (
    <ConfigProvider theme={theme}>
      <div className="slide-container">
        {/* 幻灯片内容将在这里 */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
          <h1>AI Token API 网关安全研究报告</h1>
        </div>
      </div>
    </ConfigProvider>
  )
}

export default App
