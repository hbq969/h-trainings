import { Table } from 'antd'
import type { TableProps } from 'antd'

interface ScrollableTableProps<T> extends TableProps<T> {
  maxHeight?: string
}

export function ScrollableTable<T extends object>({ maxHeight = 'calc(100vh - 200px)', ...props }: ScrollableTableProps<T>) {
  return (
    <div style={{ maxHeight, overflow: 'auto' }}>
      <Table
        size="small"
        pagination={false}
        {...props}
      />
    </div>
  )
}
