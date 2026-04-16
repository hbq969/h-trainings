import styles from './styles.module.css'

interface ChapterIndicatorProps {
  chapterNumber: string
  chapterTitle: string
  visible: boolean
}

export function ChapterIndicator({ chapterNumber, chapterTitle, visible }: ChapterIndicatorProps) {
  return (
    <div className={`${styles.indicator} ${!visible ? styles.hidden : ''}`}>
      <span className={styles.badge}>{chapterNumber}</span>
      <span className={styles.title}>{chapterTitle}</span>
    </div>
  )
}
