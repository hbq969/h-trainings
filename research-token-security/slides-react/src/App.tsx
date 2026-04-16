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
  { id: 'ch02', number: 'Chapter 02', title: '行业背景' },
  { id: 'ch03', number: 'Chapter 03', title: '安全威胁分析' },
  { id: 'ch04', number: 'Chapter 04', title: '认证与访问控制' },
  { id: 'ch05', number: 'Chapter 05', title: '数据安全' },
  { id: 'ch06', number: 'Chapter 06', title: '内容安全防护' },
  { id: 'ch07', number: 'Chapter 07', title: '模型滥用防护' },
  { id: 'ch08', number: 'Chapter 08', title: '合规性设计' },
  { id: 'ch09', number: 'Chapter 09', title: '成本控制与计费' },
  { id: 'ch10', number: 'Chapter 10', title: '高可用架构' },
  { id: 'ch11', number: 'Chapter 11', title: '实施方案' },
  { id: 'ch12', number: 'Chapter 12', title: '结论与建议' },
]

slides.forEach((_SlideComponent, idx) => {
  const chapterDef = chapterDefs[idx] || { id: `ch${idx}`, number: `Chapter ${idx}`, title: '' }
  // 每个章节的第一页是标题页 (idx 对应每个章节的起始位置)
  // Cover 是第0页，Chapter01 标题是第1页，内容是第2页，以此类推
  const isChapterTitle = idx === 0 || (idx >= 1 && idx % 2 === 1)

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
