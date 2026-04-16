import { Tag } from 'antd'

type Priority = 'P0' | 'P1' | 'P2'

const priorityColors: Record<Priority, string> = {
  P0: 'error',
  P1: 'warning',
  P2: 'success',
}

interface PriorityBadgeProps {
  priority: Priority
}

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  return <Tag color={priorityColors[priority]}>{priority}</Tag>
}
