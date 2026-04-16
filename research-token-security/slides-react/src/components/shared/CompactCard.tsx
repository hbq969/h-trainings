import { Card } from 'antd'
import type { CardProps } from 'antd'

export function CompactCard({ children, ...props }: CardProps) {
  return (
    <Card
      size="small"
      style={{ height: '100%', ...props.style }}
      styles={{ body: { padding: '12px' } }}
      {...props}
    >
      {children}
    </Card>
  )
}
