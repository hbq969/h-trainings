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
