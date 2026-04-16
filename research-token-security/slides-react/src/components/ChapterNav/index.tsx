import { Drawer } from 'antd'
import styles from './styles.module.css'

interface Chapter {
  id: string
  number: string
  title: string
  slideCount: number
}

interface ChapterNavProps {
  open: boolean
  onClose: () => void
  chapters: Chapter[]
  currentChapter: string
  onNavigate: (chapterId: string) => void
}

export function ChapterNav({ open, onClose, chapters, currentChapter, onNavigate }: ChapterNavProps) {
  const handleClick = (chapterId: string) => {
    onNavigate(chapterId)
    onClose()
  }

  return (
    <Drawer
      title="章节导航"
      placement="left"
      open={open}
      onClose={onClose}
      width={280}
      className={styles.drawer}
    >
      <ul className={styles.chapterList}>
        {chapters.map((chapter) => (
          <li
            key={chapter.id}
            className={`${styles.chapterItem} ${currentChapter === chapter.id ? styles.active : ''}`}
            onClick={() => handleClick(chapter.id)}
          >
            <div>
              <span className={styles.chapterNumber}>{chapter.number}</span>
              <span className={styles.chapterTitle}>{chapter.title}</span>
            </div>
            <div className={styles.progress}>{chapter.slideCount} 页</div>
          </li>
        ))}
      </ul>
    </Drawer>
  )
}
