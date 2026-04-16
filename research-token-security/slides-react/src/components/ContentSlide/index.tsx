import { ReactNode } from 'react'
import styles from './styles.module.css'

interface ContentSlideProps {
  label?: string
  title?: string
  children: ReactNode
  layout?: 'single' | 'twoCol' | 'threeCol'
}

export function ContentSlide({ label, title, children, layout = 'single' }: ContentSlideProps) {
  const layoutClass = layout === 'twoCol' ? styles.twoCol : layout === 'threeCol' ? styles.threeCol : ''

  return (
    <section className={styles.slide}>
      <div className={styles.content}>
        {(label || title) && (
          <div className={styles.header}>
            {label && <span className={styles.label}>{label}</span>}
            {title && <h3 className={styles.title}>{title}</h3>}
          </div>
        )}
        <div className={`${styles.body} ${layoutClass}`}>
          {children}
        </div>
      </div>
    </section>
  )
}
