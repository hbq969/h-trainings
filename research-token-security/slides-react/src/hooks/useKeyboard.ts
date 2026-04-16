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
