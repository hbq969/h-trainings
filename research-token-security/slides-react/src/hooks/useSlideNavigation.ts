import { useState, useCallback, useEffect } from 'react'

export interface SlideInfo {
  id: string
  chapterId: string
  chapterTitle: string
  isChapterTitle: boolean
}

export function useSlideNavigation(slides: SlideInfo[]) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const total = slides.length

  const currentSlide = slides[currentIndex] || null

  const currentChapter = currentSlide?.chapterId || ''

  const goTo = useCallback((index: number) => {
    if (index >= 0 && index < total) {
      setCurrentIndex(index)
    }
  }, [total])

  const goNext = useCallback(() => {
    goTo(currentIndex + 1)
  }, [currentIndex, goTo])

  const goPrev = useCallback(() => {
    goTo(currentIndex - 1)
  }, [currentIndex, goTo])

  const goToChapter = useCallback((chapterId: string) => {
    const index = slides.findIndex(s => s.chapterId === chapterId)
    if (index !== -1) {
      setCurrentIndex(index)
    }
  }, [slides])

  // 滚动监听
  useEffect(() => {
    const container = document.querySelector('.slide-container')
    if (!container) return

    const handleScroll = () => {
      const scrollTop = container.scrollTop
      const slideHeight = window.innerHeight
      const newIndex = Math.round(scrollTop / slideHeight)
      if (newIndex !== currentIndex && newIndex >= 0 && newIndex < total) {
        setCurrentIndex(newIndex)
      }
    }

    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [currentIndex, total])

  return {
    currentIndex,
    currentSlide,
    currentChapter,
    total,
    goTo,
    goNext,
    goPrev,
    goToChapter,
  }
}
