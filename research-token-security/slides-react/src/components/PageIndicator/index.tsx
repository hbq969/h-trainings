import { Progress } from 'antd'
import styles from './styles.module.css'

interface PageIndicatorProps {
  current: number
  total: number
  onToggleNav?: () => void
  onToggleFullscreen?: () => void
}

export function PageIndicator({ current, total }: PageIndicatorProps) {
  const percent = Math.round(((current + 1) / total) * 100)

  return (
    <div className={styles.indicator}>
      <div className={styles.left}>
        <Progress
          percent={percent}
          size="small"
          showInfo={false}
          className={styles.progress}
          strokeColor="#146ef5"
        />
        <span className={styles.pageInfo}>
          {current + 1} / {total}
        </span>
      </div>
      <div className={styles.right}>
        <span className={styles.hint}>
          <span className={styles.key}>←→</span> 翻页
          <span className={styles.key}>M</span> 目录
          <span className={styles.key}>F</span> 全屏
        </span>
      </div>
    </div>
  )
}
