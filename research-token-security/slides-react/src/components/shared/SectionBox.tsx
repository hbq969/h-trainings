import { ReactNode } from 'react'

interface SectionBoxProps {
  label?: string
  title?: string
  children: ReactNode
}

export function SectionBox({ label, title, children }: SectionBoxProps) {
  return (
    <div style={{ marginBottom: '16px' }}>
      {label && (
        <span style={{
          display: 'inline-block',
          fontSize: '11px',
          fontWeight: 500,
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
          color: '#146ef5',
          marginBottom: '4px',
        }}>
          {label}
        </span>
      )}
      {title && (
        <h4 style={{
          fontSize: '14px',
          fontWeight: 600,
          color: '#080808',
          margin: '0 0 8px 0',
        }}>
          {title}
        </h4>
      )}
      {children}
    </div>
  )
}
