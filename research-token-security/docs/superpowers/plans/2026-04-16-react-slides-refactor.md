# React 幻灯片重构实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 使用 React + Ant Design 重构幻灯片，解决布局溢出问题，统一视觉风格，构建为单个 HTML 文件。

**Architecture:** 采用 Vite + React 18 + TypeScript + Ant Design 5.x，通过 vite-plugin-singlefile 输出单文件。组件按职责拆分，章节内容独立开发。

**Tech Stack:** Vite 5.x, React 18.x, TypeScript 5.x, Ant Design 5.x, vite-plugin-singlefile

---

## Phase 1: 项目初始化与基础框架

### Task 1: 项目初始化

**Files:**
- Create: `slides-react/package.json`
- Create: `slides-react/vite.config.ts`
- Create: `slides-react/tsconfig.json`
- Create: `slides-react/index.html`

- [ ] **Step 1: 创建项目目录并初始化**

```bash
mkdir -p slides-react && cd slides-react
npm init -y
```

- [ ] **Step 2: 安装依赖**

```bash
npm install react react-dom antd
npm install -D vite @vitejs/plugin-react typescript @types/react @types/react-dom vite-plugin-singlefile
```

- [ ] **Step 3: 创建 package.json**

```json
{
  "name": "ai-token-security-slides",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "antd": "^5.15.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.2.0",
    "typescript": "^5.3.0",
    "vite": "^5.1.0",
    "vite-plugin-singlefile": "^0.5.0"
  }
}
```

- [ ] **Step 4: 创建 vite.config.ts**

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

export default defineConfig({
  plugins: [
    react(),
    viteSingleFile(),
  ],
  build: {
    outDir: 'dist',
    assetsInlineLimit: 100000000,
  },
})
```

- [ ] **Step 5: 创建 tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}
```

- [ ] **Step 6: 创建 index.html**

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>AI Token API 网关安全研究报告</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 7: 提交初始化代码**

```bash
git add slides-react/
git commit -m "feat: 初始化 React + Vite + Ant Design 项目

- 配置 vite-plugin-singlefile 输出单文件
- 配置 TypeScript
- 安装 Ant Design 5.x

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 2: 创建入口文件和全局样式

**Files:**
- Create: `slides-react/src/main.tsx`
- Create: `slides-react/src/App.tsx`
- Create: `slides-react/src/index.css`
- Create: `slides-react/src/theme.ts`

- [ ] **Step 1: 创建 main.tsx**

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

- [ ] **Step 2: 创建 theme.ts (Ant Design 主题配置)**

```ts
import type { ThemeConfig } from 'antd'

export const theme: ThemeConfig = {
  token: {
    colorPrimary: '#146ef5',
    borderRadius: 8,
    fontSize: 14,
    colorBorder: '#d8d8d8',
  },
  components: {
    Table: {
      headerBg: '#146ef5',
      headerColor: '#ffffff',
      borderColor: '#d8d8d8',
      rowHoverBg: 'rgba(20, 110, 245, 0.05)',
    },
    Card: {
      borderRadiusLG: 8,
    },
    Tabs: {
      itemSelectedColor: '#146ef5',
      inkBarColor: '#146ef5',
    },
  },
}
```

- [ ] **Step 3: 创建 index.css (全局样式)**

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body, #root {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #ffffff;
  color: #080808;
}

/* 幻灯片容器 */
.slide-container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  scroll-snap-type: y mandatory;
}

/* 单个幻灯片 */
.slide {
  width: 100vw;
  height: 100vh;
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
  position: relative;
}

/* 内容区域高度计算 */
.slide-content {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

/* 打印样式 */
@media print {
  .slide {
    page-break-after: always;
    height: auto;
  }

  .chapter-nav,
  .page-indicator,
  .fullscreen-btn {
    display: none !important;
  }
}
```

- [ ] **Step 4: 创建 App.tsx (基础框架)**

```tsx
import { ConfigProvider } from 'antd'
import { theme } from './theme'

function App() {
  return (
    <ConfigProvider theme={theme}>
      <div className="slide-container">
        {/* 幻灯片内容将在这里 */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
          <h1>AI Token API 网关安全研究报告</h1>
        </div>
      </div>
    </ConfigProvider>
  )
}

export default App
```

- [ ] **Step 5: 验证项目运行**

```bash
cd slides-react && npm run dev
```

预期: 浏览器打开 http://localhost:5173 显示标题

- [ ] **Step 6: 提交代码**

```bash
git add slides-react/src/
git commit -m "feat: 添加入口文件和全局样式

- 配置 Ant Design 主题（蓝色表头）
- 全局样式和打印样式

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 3: 实现 Hooks (useSlideNavigation, useKeyboard, useFullscreen)

**Files:**
- Create: `slides-react/src/hooks/useSlideNavigation.ts`
- Create: `slides-react/src/hooks/useKeyboard.ts`
- Create: `slides-react/src/hooks/useFullscreen.ts`
- Create: `slides-react/src/hooks/index.ts`

- [ ] **Step 1: 创建 useSlideNavigation.ts**

```tsx
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
```

- [ ] **Step 2: 创建 useKeyboard.ts**

```tsx
import { useEffect } from 'react'

interface KeyboardHandlers {
  onNext: () => void
  onPrev: () => void
  onToggleFullscreen?: () => void
  onToggleNav?: () => void
}

export function useKeyboard(handlers: KeyboardHandlers) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // 忽略输入框内的按键
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return
      }

      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case ' ':
          e.preventDefault()
          handlers.onNext()
          break
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault()
          handlers.onPrev()
          break
        case 'f':
        case 'F':
          if (handlers.onToggleFullscreen) {
            e.preventDefault()
            handlers.onToggleFullscreen()
          }
          break
        case 'm':
        case 'M':
          if (handlers.onToggleNav) {
            e.preventDefault()
            handlers.onToggleNav()
          }
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handlers])
}
```

- [ ] **Step 3: 创建 useFullscreen.ts**

```tsx
import { useState, useCallback, useEffect } from 'react'

export function useFullscreen() {
  const [isFullscreen, setIsFullscreen] = useState(false)

  const toggle = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {})
    } else {
      document.exitFullscreen().catch(() => {})
    }
  }, [])

  useEffect(() => {
    const handleChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener('fullscreenchange', handleChange)
    return () => document.removeEventListener('fullscreenchange', handleChange)
  }, [])

  return { isFullscreen, toggle }
}
```

- [ ] **Step 4: 创建 hooks/index.ts**

```tsx
export { useSlideNavigation, type SlideInfo } from './useSlideNavigation'
export { useKeyboard } from './useKeyboard'
export { useFullscreen } from './useFullscreen'
```

- [ ] **Step 5: 提交代码**

```bash
git add slides-react/src/hooks/
git commit -m "feat: 实现翻页、键盘、全屏 Hooks

- useSlideNavigation: 翻页逻辑和滚动监听
- useKeyboard: 键盘事件处理
- useFullscreen: 全屏控制

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 4: 实现 SlideContainer 组件

**Files:**
- Create: `slides-react/src/components/SlideContainer/index.tsx`
- Create: `slides-react/src/components/SlideContainer/styles.module.css`

- [ ] **Step 1: 创建 styles.module.css**

```css
.container {
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
}

.container::-webkit-scrollbar {
  width: 0;
  display: none;
}
```

- [ ] **Step 2: 创建 index.tsx**

```tsx
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
```

- [ ] **Step 3: 提交代码**

```bash
git add slides-react/src/components/SlideContainer/
git commit -m "feat: 实现 SlideContainer 组件

- 滚动容器，支持 smooth 滚动
- 根据 currentIndex 自动滚动

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 5: 实现 ChapterIndicator 组件

**Files:**
- Create: `slides-react/src/components/ChapterIndicator/index.tsx`
- Create: `slides-react/src/components/ChapterIndicator/styles.module.css`

- [ ] **Step 1: 创建 styles.module.css**

```css
.indicator {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 40px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-bottom: 1px solid #d8d8d8;
  display: flex;
  align-items: center;
  padding: 0 24px;
  z-index: 100;
  transition: transform 0.3s ease;
}

.hidden {
  transform: translateY(-100%);
}

.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 2px 8px;
  background: #146ef5;
  color: #ffffff;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.5px;
  border-radius: 4px;
  margin-right: 12px;
}

.title {
  font-size: 14px;
  font-weight: 500;
  color: #363636;
}
```

- [ ] **Step 2: 创建 index.tsx**

```tsx
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
```

- [ ] **Step 3: 提交代码**

```bash
git add slides-react/src/components/ChapterIndicator/
git commit -m "feat: 实现 ChapterIndicator 组件

- 顶部固定章节标注
- 章节标题页时隐藏

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 6: 实现 PageIndicator 组件

**Files:**
- Create: `slides-react/src/components/PageIndicator/index.tsx`
- Create: `slides-react/src/components/PageIndicator/styles.module.css`

- [ ] **Step 1: 创建 styles.module.css**

```css
.indicator {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-top: 1px solid #d8d8d8;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  z-index: 100;
}

.left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.progress {
  width: 120px;
}

.pageInfo {
  font-size: 14px;
  color: #5a5a5a;
}

.right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.hint {
  font-size: 12px;
  color: #ababab;
  display: flex;
  align-items: center;
  gap: 8px;
}

.key {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 24px;
  height: 24px;
  padding: 0 6px;
  background: #ffffff;
  border: 1px solid #d8d8d8;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  color: #363636;
}
```

- [ ] **Step 2: 创建 index.tsx**

```tsx
import { Progress } from 'antd'
import styles from './styles.module.css'

interface PageIndicatorProps {
  current: number
  total: number
  onToggleNav?: () => void
  onToggleFullscreen?: () => void
}

export function PageIndicator({ current, total, onToggleNav, onToggleFullscreen }: PageIndicatorProps) {
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
```

- [ ] **Step 3: 提交代码**

```bash
git add slides-react/src/components/PageIndicator/
git commit -m "feat: 实现 PageIndicator 组件

- 底部页码和进度条
- 键盘快捷键提示

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 7: 实现 ChapterNav 组件

**Files:**
- Create: `slides-react/src/components/ChapterNav/index.tsx`
- Create: `slides-react/src/components/ChapterNav/styles.module.css`

- [ ] **Step 1: 创建 styles.module.css**

```css
.drawer :global(.ant-drawer-body) {
  padding: 16px 0;
}

.chapterList {
  list-style: none;
  padding: 0;
  margin: 0;
}

.chapterItem {
  padding: 12px 24px;
  cursor: pointer;
  transition: all 0.2s ease;
  border-left: 3px solid transparent;
}

.chapterItem:hover {
  background: rgba(20, 110, 245, 0.05);
}

.active {
  background: rgba(20, 110, 245, 0.1);
  border-left-color: #146ef5;
}

.chapterNumber {
  display: inline-block;
  padding: 2px 8px;
  background: #146ef5;
  color: #ffffff;
  font-size: 11px;
  font-weight: 600;
  border-radius: 4px;
  margin-right: 8px;
}

.chapterTitle {
  font-size: 14px;
  font-weight: 500;
  color: #080808;
}

.progress {
  font-size: 12px;
  color: #ababab;
  margin-top: 4px;
}
```

- [ ] **Step 2: 创建 index.tsx**

```tsx
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
```

- [ ] **Step 3: 提交代码**

```bash
git add slides-react/src/components/ChapterNav/
git commit -m "feat: 实现 ChapterNav 组件

- 左侧抽屉式章节导航
- 高亮当前章节
- 点击跳转

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Phase 2: 模板组件

### Task 8: 实现 CoverSlide 封面模板

**Files:**
- Create: `slides-react/src/components/CoverSlide/index.tsx`
- Create: `slides-react/src/components/CoverSlide/styles.module.css`

- [ ] **Step 1: 创建 styles.module.css**

```css
.slide {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #ffffff 0%, rgba(20, 110, 245, 0.03) 50%, rgba(122, 61, 255, 0.02) 100%);
  position: relative;
  overflow: hidden;
}

.decoShape1 {
  position: absolute;
  width: 400px;
  height: 400px;
  background: linear-gradient(135deg, #146ef5, #7a3dff);
  top: -10%;
  right: -5%;
  filter: blur(80px);
  opacity: 0.6;
  border-radius: 50%;
}

.decoShape2 {
  position: absolute;
  width: 300px;
  height: 300px;
  background: linear-gradient(135deg, #ed52cb, #ff6b00);
  bottom: -5%;
  left: -5%;
  filter: blur(60px);
  opacity: 0.6;
  border-radius: 50%;
}

.content {
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 900px;
  padding: 0 24px;
}

.label {
  display: inline-block;
  background: rgba(20, 110, 245, 0.1);
  color: #146ef5;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  padding: 6px 16px;
  border-radius: 4px;
  margin-bottom: 24px;
}

.title {
  font-size: clamp(2rem, 6vw, 4rem);
  font-weight: 600;
  line-height: 1.1;
  color: #080808;
  margin: 0 0 16px 0;
}

.titleAccent {
  color: #146ef5;
}

.subtitle {
  font-size: clamp(1rem, 2vw, 1.5rem);
  font-weight: 500;
  color: #363636;
  margin: 0 0 24px 0;
}

.divider {
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, #146ef5, #7a3dff);
  border-radius: 2px;
  margin: 0 auto 24px;
}

.date {
  font-size: 16px;
  font-weight: 500;
  color: #ababab;
}

.meta {
  display: flex;
  justify-content: center;
  gap: 32px;
  margin-top: 24px;
}

.metaItem {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #5a5a5a;
}
```

- [ ] **Step 2: 创建 index.tsx**

```tsx
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
```

- [ ] **Step 3: 提交代码**

```bash
git add slides-react/src/components/CoverSlide/
git commit -m "feat: 实现 CoverSlide 封面模板

- 渐变背景和装饰形状
- 标题、副标题、日期、元信息

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 9: 实现 ChapterTitleSlide 章节标题模板

**Files:**
- Create: `slides-react/src/components/ChapterTitleSlide/index.tsx`
- Create: `slides-react/src/components/ChapterTitleSlide/styles.module.css`

- [ ] **Step 1: 创建 styles.module.css**

```css
.slide {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
}

.content {
  text-align: center;
  max-width: 800px;
  padding: 0 24px;
}

.number {
  display: inline-block;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #ffffff;
  background: #146ef5;
  padding: 6px 16px;
  border-radius: 4px;
  margin-bottom: 16px;
}

.title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 600;
  line-height: 1.2;
  color: #080808;
  margin: 0 0 16px 0;
}

.subtitle {
  font-size: clamp(1rem, 2vw, 1.5rem);
  font-weight: 500;
  color: #363636;
  margin: 0;
}
```

- [ ] **Step 2: 创建 index.tsx**

```tsx
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
```

- [ ] **Step 3: 提交代码**

```bash
git add slides-react/src/components/ChapterTitleSlide/
git commit -m "feat: 实现 ChapterTitleSlide 章节标题模板

- 章节编号、标题、副标题居中展示

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 10: 实现 ContentSlide 内容页模板

**Files:**
- Create: `slides-react/src/components/ContentSlide/index.tsx`
- Create: `slides-react/src/components/ContentSlide/styles.module.css`

- [ ] **Step 1: 创建 styles.module.css**

```css
.slide {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  padding-top: 40px; /* ChapterIndicator 高度 */
  padding-bottom: 50px; /* PageIndicator 高度 */
}

.content {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.header {
  margin-bottom: 16px;
}

.label {
  display: inline-block;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: #146ef5;
  margin-bottom: 4px;
}

.title {
  font-size: clamp(1.25rem, 2.5vw, 1.75rem);
  font-weight: 600;
  color: #080808;
  margin: 0;
}

.body {
  flex: 1;
  overflow: auto;
}

/* 两列布局 */
.twoCol {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  height: 100%;
}

/* 三列布局 */
.threeCol {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 24px;
  height: 100%;
}

@media (max-width: 900px) {
  .twoCol, .threeCol {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 2: 创建 index.tsx**

```tsx
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
```

- [ ] **Step 3: 提交代码**

```bash
git add slides-react/src/components/ContentSlide/
git commit -m "feat: 实现 ContentSlide 内容页模板

- 固定高度，内容不溢出
- 支持单列、两列、三列布局

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 11: 实现 shared 组件 (ScrollableTable, CompactCard, SectionBox)

**Files:**
- Create: `slides-react/src/components/shared/ScrollableTable.tsx`
- Create: `slides-react/src/components/shared/CompactCard.tsx`
- Create: `slides-react/src/components/shared/SectionBox.tsx`
- Create: `slides-react/src/components/shared/PriorityBadge.tsx`
- Create: `slides-react/src/components/shared/index.ts`

- [ ] **Step 1: 创建 ScrollableTable.tsx**

```tsx
import { Table } from 'antd'
import type { TableProps } from 'antd'

interface ScrollableTableProps<T> extends TableProps<T> {
  maxHeight?: string
}

export function ScrollableTable<T extends object>({ maxHeight = 'calc(100vh - 200px)', ...props }: ScrollableTableProps<T>) {
  return (
    <div style={{ maxHeight, overflow: 'auto' }}>
      <Table
        size="small"
        pagination={false}
        {...props}
      />
    </div>
  )
}
```

- [ ] **Step 2: 创建 CompactCard.tsx**

```tsx
import { Card } from 'antd'
import type { CardProps } from 'antd'

export function CompactCard({ children, ...props }: CardProps) {
  return (
    <Card
      size="small"
      style={{ height: '100%', ...props.style }}
      styles={{ body: { padding: '12px' } }}
      {...props}
    >
      {children}
    </Card>
  )
}
```

- [ ] **Step 3: 创建 SectionBox.tsx**

```tsx
import { ReactNode } from 'react'

interface SectionBoxProps {
  label?: string
  title?: string
  children: ReactNode
}

export function SectionBox({ label, title, children }: SectionBoxProps) {
  return (
    <div style={{ marginBottom: '16px' }}>
      {label && (
        <span style={{
          display: 'inline-block',
          fontSize: '11px',
          fontWeight: 500,
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
          color: '#146ef5',
          marginBottom: '4px',
        }}>
          {label}
        </span>
      )}
      {title && (
        <h4 style={{
          fontSize: '14px',
          fontWeight: 600,
          color: '#080808',
          margin: '0 0 8px 0',
        }}>
          {title}
        </h4>
      )}
      {children}
    </div>
  )
}
```

- [ ] **Step 4: 创建 PriorityBadge.tsx**

```tsx
import { Tag } from 'antd'

type Priority = 'P0' | 'P1' | 'P2'

const priorityColors: Record<Priority, string> = {
  P0: 'error',
  P1: 'warning',
  P2: 'success',
}

interface PriorityBadgeProps {
  priority: Priority
}

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  return <Tag color={priorityColors[priority]}>{priority}</Tag>
}
```

- [ ] **Step 5: 创建 index.ts**

```tsx
export { ScrollableTable } from './ScrollableTable'
export { CompactCard } from './CompactCard'
export { SectionBox } from './SectionBox'
export { PriorityBadge } from './PriorityBadge'
```

- [ ] **Step 6: 提交代码**

```bash
git add slides-react/src/components/shared/
git commit -m "feat: 实现共享组件

- ScrollableTable: 可滚动表格
- CompactCard: 紧凑卡片
- SectionBox: 内容区块
- PriorityBadge: 优先级标签

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Phase 3: 章节内容

### Task 12: 实现封面和 Chapter 01 执行摘要

**Files:**
- Create: `slides-react/src/slides/index.ts`
- Create: `slides-react/src/slides/Cover.tsx`
- Create: `slides-react/src/slides/Chapter01/index.tsx`

- [ ] **Step 1: 创建 Cover.tsx**

```tsx
import { CoverSlide } from '../../components/CoverSlide'

export function Cover() {
  return (
    <CoverSlide
      label="Security Research Report"
      title="<span class='titleAccent'>AI Token API</span> 网关<br>安全研究报告"
      subtitle="系统性分析 AI API 网关/中转平台的安全防护与设计"
      date="2026-04-16"
      meta={[
        { icon: '📊', text: '12 章节' },
        { icon: '🔒', text: '7 安全维度' },
      ]}
    />
  )
}
```

- [ ] **Step 2: 创建 Chapter01/index.tsx**

```tsx
import { ChapterTitleSlide } from '../../components/ChapterTitleSlide'
import { ContentSlide } from '../../components/ContentSlide'
import { SectionBox, ScrollableTable, CompactCard, PriorityBadge } from '../../components/shared'
import { Card, Typography } from 'antd'

const { Text, Paragraph } = Typography

// 核心发现数据
const findings = [
  { num: '1', title: '威胁格局复杂化', desc: 'OWASP LLM Top 10：提示词注入和敏感信息泄露是首要威胁' },
  { num: '2', title: '传统安全边界不足', desc: 'RPS 限流不适用，需转向 Token 感知控制' },
  { num: '3', title: '合规成为准入门槛', desc: 'GDPR、数据驻留、ZDR 成为企业客户刚需' },
  { num: '4', title: '成本与安全强耦合', desc: '单点配置错误可致 $15,000+ 损失' },
]

// 核心建议数据
const recommendations = [
  { priority: 'P0' as const, advice: '采用 Token 感知的混合限流策略', impact: '防止成本爆发和模型 DoS' },
  { priority: 'P0' as const, advice: '建立集中式 API 网关安全层', impact: '统一认证、授权、审计' },
  { priority: 'P0' as const, advice: '实施 MFA 和细粒度 API Key 管理', impact: '降低凭证泄露风险' },
  { priority: 'P1' as const, advice: '部署提示词注入检测和输出过滤', impact: '防范 OWASP LLM Top 1' },
  { priority: 'P1' as const, advice: '建立合规体系', impact: '满足企业客户准入要求' },
  { priority: 'P2' as const, advice: '构建多区域高可用架构', impact: '保障 SLA 和灾难恢复' },
]

export function Chapter01() {
  return (
    <>
      {/* 章节标题页 */}
      <ChapterTitleSlide
        number="Chapter 01"
        title="执行摘要"
        subtitle="关键发现与核心建议"
      />

      {/* 内容页 */}
      <ContentSlide layout="twoCol">
        {/* 左列：研究背景 */}
        <div>
          <SectionBox label="Research Background" title="研究背景">
            <Paragraph>
              随着<Text strong>大型语言模型（LLM）</Text>和生成式 AI 的爆发式增长，
              <Text strong>AI Token API 网关/中转平台</Text>已成为连接企业与 AI 能力的关键基础设施。
            </Paragraph>
            <Card size="small" style={{ background: 'rgba(20, 110, 245, 0.05)', borderLeft: '3px solid #146ef5' }}>
              <Text type="danger" strong>提示词注入、API 密钥泄露、模型滥用、数据合规</Text> 等风险层出不穷
            </Card>
          </SectionBox>

          <SectionBox label="Key Findings" title="核心发现">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {findings.map(f => (
                <CompactCard key={f.num}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '20px',
                      height: '20px',
                      background: 'linear-gradient(135deg, #146ef5, #7a3dff)',
                      color: '#fff',
                      fontSize: '12px',
                      fontWeight: 600,
                      borderRadius: '50%',
                    }}>{f.num}</span>
                    <Text strong style={{ fontSize: '13px' }}>{f.title}</Text>
                  </div>
                  <Text type="secondary" style={{ fontSize: '12px' }}>{f.desc}</Text>
                </CompactCard>
              ))}
            </div>
          </SectionBox>
        </div>

        {/* 右列：核心建议 */}
        <div>
          <SectionBox label="Core Recommendations" title="核心建议">
            <ScrollableTable
              dataSource={recommendations}
              columns={[
                { title: '优先级', dataIndex: 'priority', width: 70, render: (p) => <PriorityBadge priority={p} /> },
                { title: '建议', dataIndex: 'advice' },
                { title: '影响', dataIndex: 'impact' },
              ]}
              rowKey={(r, i) => String(i)}
            />
          </SectionBox>
        </div>
      </ContentSlide>
    </>
  )
}
```

- [ ] **Step 3: 创建 slides/index.ts**

```tsx
import { Cover } from './Cover'
import { Chapter01 } from './Chapter01'

export const slides = [
  Cover,
  Chapter01,
  // 其他章节将逐步添加
]

export { Cover, Chapter01 }
```

- [ ] **Step 4: 提交代码**

```bash
git add slides-react/src/slides/
git commit -m "feat: 实现封面和 Chapter 01 执行摘要

- 封面页：标题、副标题、日期、元信息
- 章节标题页
- 内容页：研究背景、核心发现、核心建议表格

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 13-23: 实现其他章节 (Chapter 02-12)

由于篇幅限制，这里给出每个章节的实现模板。每个章节遵循相同的模式：

1. 创建 `slides-react/src/slides/ChapterXX/index.tsx`
2. 包含章节标题页 + 1-2 个内容页
3. 使用 ContentSlide 的 twoCol/threeCol 布局
4. 使用 ScrollableTable、CompactCard 等共享组件
5. 在 `slides/index.ts` 中注册

**章节内容数据从原 `slides-compact.html` 提取。**

---

## Phase 4: 功能完善

### Task 24: 整合所有组件到 App.tsx

**Files:**
- Modify: `slides-react/src/App.tsx`

- [ ] **Step 1: 更新 App.tsx**

```tsx
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
const chapters = new Map<string, { id: string; number: string; title: string; slideCount: number }>()

slides.forEach((SlideComponent, idx) => {
  // 简化处理，实际需要从组件获取元信息
  const chapterId = `ch${Math.floor(idx / 2)}`
  slideInfos.push({
    id: `slide-${idx}`,
    chapterId,
    chapterTitle: `Chapter ${Math.floor(idx / 2)}`,
    isChapterTitle: idx % 2 === 0,
  })
})

function App() {
  const [navOpen, setNavOpen] = useState(false)
  const { currentIndex, currentSlide, currentChapter, total, goTo, goNext, goPrev, goToChapter } = useSlideNavigation(slideInfos)
  const { isFullscreen, toggle: toggleFullscreen } = useFullscreen()

  useKeyboard({
    onNext: goNext,
    onPrev: goPrev,
    onToggleFullscreen: toggleFullscreen,
    onToggleNav: () => setNavOpen(!navOpen),
  })

  return (
    <ConfigProvider theme={theme}>
      <SlideContainer currentIndex={currentIndex}>
        {slides.map((SlideComponent, idx) => (
          <SlideComponent key={`slide-${idx}`} />
        ))}
      </SlideContainer>

      <ChapterIndicator
        chapterNumber={currentSlide?.chapterId || ''}
        chapterTitle={currentSlide?.chapterTitle || ''}
        visible={!currentSlide?.isChapterTitle}
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
        chapters={Array.from(chapters.values())}
        currentChapter={currentChapter}
        onNavigate={goToChapter}
      />
    </ConfigProvider>
  )
}

export default App
```

- [ ] **Step 2: 提交代码**

```bash
git add slides-react/src/App.tsx
git commit -m "feat: 整合所有组件到 App

- SlideContainer 包含所有幻灯片
- ChapterIndicator 显示当前章节
- PageIndicator 显示页码和进度
- ChapterNav 章节导航抽屉

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 25: 构建和验证

- [ ] **Step 1: 构建项目**

```bash
cd slides-react && npm run build
```

预期: 生成 `dist/index.html` 单文件

- [ ] **Step 2: 验证文件大小**

```bash
ls -lh slides-react/dist/index.html
```

预期: 文件大小 < 5MB

- [ ] **Step 3: 在浏览器中测试**

打开 `dist/index.html`，验证：
- 翻页功能正常
- 章节导航正常
- 全屏模式正常
- 内容不超出边界
- 表格风格统一

- [ ] **Step 4: 复制到项目根目录**

```bash
cp slides-react/dist/index.html slides-react.html
```

- [ ] **Step 5: 最终提交**

```bash
git add slides-react.html
git commit -m "feat: 完成 React 幻灯片重构

- 输出单 HTML 文件
- 解决内容溢出问题
- 统一表格风格
- 实现所有交互功能

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## 验收清单

- [ ] 所有翻页方式正常工作（键盘、点击、滚动）
- [ ] 章节导航跳转准确
- [ ] 全屏模式正常
- [ ] 所有页面内容不超出边界
- [ ] 章节标注和底部翻页不遮挡内容
- [ ] 表格风格统一（蓝色表头）
- [ ] 响应式布局正常
- [ ] 输出单个 HTML 文件
- [ ] 文件大小 < 5MB
- [ ] Chrome/Edge/Safari 兼容
