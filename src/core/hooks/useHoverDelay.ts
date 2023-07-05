import { useState, useEffect, useRef } from 'react'

export default function useHoverDelay(delayMs: number, originalElement: any): boolean {
  const [isHovered, setIsHovered] = useState(false)
  const hoverTimeoutRef = useRef<number | null>(null)

  useEffect(() => {
    if (!originalElement.current) return

    const handleMouseEnter = () => {
      hoverTimeoutRef.current = window.setTimeout(() => {
        setIsHovered(true)
      }, delayMs)
    }

    const handleMouseLeave = () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
        hoverTimeoutRef.current = null
      }
      setIsHovered(false)
    }

    const targetElement = originalElement.current

    if (targetElement) {
      targetElement.addEventListener('mouseenter', handleMouseEnter)
      targetElement.addEventListener('mouseleave', handleMouseLeave)
    }

    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
        hoverTimeoutRef.current = null
      }

      if (targetElement) {
        targetElement.removeEventListener('mouseenter', handleMouseEnter)
        targetElement.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [delayMs, originalElement])

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
      hoverTimeoutRef.current = null
    }
  }

  useEffect(() => {
    const targetElement = originalElement.current
    if (targetElement) {
      targetElement.addEventListener('mouseleave', handleMouseLeave)
    }
    return () => {
      if (targetElement) {
        targetElement.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [originalElement])

  return isHovered
}