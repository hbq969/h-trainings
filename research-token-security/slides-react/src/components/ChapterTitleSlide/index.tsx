import styles from './styles.module.css'

interface ChapterTitleSlideProps {
  number: string
  title: string
  subtitle: string
}

export function ChapterTitleSlide({ number, title, subtitle }: ChapterTitleSlideProps) {
  return (
    <section className={styles.slide}>
      <div className={styles.content}>
        <span className={styles.number}>{number}</span>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>
    </section>
  )
}
