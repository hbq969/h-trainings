import { useState } from 'react'
import { ConfigProvider } from 'antd'
import { theme } from './theme'
import { SlideContainer } from './components/SlideContainer'
import { ChapterIndicator } from './components/ChapterIndicator'
import { PageIndicator } from './components/PageIndicator'
import { ChapterNav } from './components/ChapterNav'
import { useSlideNavigation, useKeyboard, useFullscreen, SlideInfo } from './hooks'
import { slides } from './slides'

// 构建幻灯片信息
const slideInfos: SlideInfo[] = []
const chaptersMap = new Map<string, { id: string; number: string; title: string; slideCount: number }>()

// 定义章节信息
const chapterDefs = [
  { id: 'cover', number: '封面', title: 'AI Token API 网关安全研究报告' },
  { id: 'ch01', number: 'Chapter 01', title: '执行摘要' },
]

slides.forEach((_SlideComponent, idx) => {
  const chapterDef = chapterDefs[idx] || { id: `ch${idx}`, number: `Chapter ${idx}`, title: '' }
  const isChapterTitle = idx === 0 || idx === 1 // Cover 和 Chapter01 标题页

  slideInfos.push({
    id: `slide-${idx}`,
    chapterId: chapterDef.id,
    chapterTitle: chapterDef.title,
    isChapterTitle: isChapterTitle,
  })

  if (!chaptersMap.has(chapterDef.id)) {
    chaptersMap.set(chapterDef.id, {
      id: chapterDef.id,
      number: chapterDef.number,
      title: chapterDef.title,
      slideCount: 1,
    })
  } else {
    const ch = chaptersMap.get(chapterDef.id)!
    ch.slideCount++
  }
})

function App() {
  const [navOpen, setNavOpen] = useState(false)
  const { currentIndex, currentSlide, currentChapter, total, goNext, goPrev, goToChapter } = useSlideNavigation(slideInfos)
  const { toggle: toggleFullscreen } = useFullscreen()

  useKeyboard({
    onNext: goNext,
    onPrev: goPrev,
    onToggleFullscreen: toggleFullscreen,
    onToggleNav: () => setNavOpen(!navOpen),
  })

  // 获取当前章节编号
  const getCurrentChapterNumber = () => {
    const ch = chaptersMap.get(currentChapter)
    return ch?.number || ''
  }

  return (
    <ConfigProvider theme={theme}>
      <SlideContainer currentIndex={currentIndex}>
        {slides.map((SlideComponent, idx) => (
          <SlideComponent key={`slide-${idx}`} />
        ))}
      </SlideContainer>

      <ChapterIndicator
        chapterNumber={getCurrentChapterNumber()}
        chapterTitle={currentSlide?.chapterTitle || ''}
        visible={!currentSlide?.isChapterTitle && currentSlide?.chapterId !== 'cover'}
      />

      <PageIndicator
        current={currentIndex}
        total={total}
        onToggleNav={() => setNavOpen(true)}
        onToggleFullscreen={toggleFullscreen}
      />

      <ChapterNav
        open={navOpen}
        onClose={() => setNavOpen(false)}
        chapters={Array.from(chaptersMap.values()).filter(ch => ch.id !== 'cover')}
        currentChapter={currentChapter}
        onNavigate={goToChapter}
      />
    </ConfigProvider>
  )
}

export default App
