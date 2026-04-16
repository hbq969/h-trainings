import { useEffect, useRef, ReactNode } from 'react'
import styles from './styles.module.css'

interface SlideContainerProps {
  children: ReactNode
  currentIndex: number
}

export function SlideContainer({ children, currentIndex }: SlideContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  // 当 currentIndex 变化时滚动到对应幻灯片
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const slideHeight = window.innerHeight
    container.scrollTo({
      top: currentIndex * slideHeight,
      behavior: 'smooth',
    })
  }, [currentIndex])

  return (
    <div ref={containerRef} className={styles.container}>
      {children}
    </div>
  )
}
