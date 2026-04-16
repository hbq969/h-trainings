import styles from './styles.module.css'

interface CoverSlideProps {
  label: string
  title: string
  subtitle: string
  date: string
  meta?: { icon: string; text: string }[]
}

export function CoverSlide({ label, title, subtitle, date, meta }: CoverSlideProps) {
  return (
    <section className={styles.slide}>
      <div className={styles.decoShape1} aria-hidden="true" />
      <div className={styles.decoShape2} aria-hidden="true" />
      <div className={styles.content}>
        <span className={styles.label}>{label}</span>
        <h1 className={styles.title} dangerouslySetInnerHTML={{ __html: title }} />
        <p className={styles.subtitle}>{subtitle}</p>
        <div className={styles.divider} />
        <time className={styles.date}>{date}</time>
        {meta && (
          <div className={styles.meta}>
            {meta.map((item, i) => (
              <div key={i} className={styles.metaItem}>
                <span>{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
