"use client"

import { useLenis } from "@studio-freight/react-lenis"
import { useEffect, useState, useRef, useCallback } from "react"

export function CustomScrollbar() {
  const [scroll, setScroll] = useState(0)
  const [limit, setLimit] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const lenisRef = useRef<any>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useLenis((lenis) => {
    lenisRef.current = lenis
    setScroll(lenis.scroll)
    setLimit(lenis.limit)
  })

  const updateScroll = useCallback((clientY: number) => {
    if (!lenisRef.current || !trackRef.current || limit === 0) return

    const trackHeight = trackRef.current.clientHeight
    const dotHeight = 12
    const availableHeight = Math.max(0, trackHeight - dotHeight)
    const rect = trackRef.current.getBoundingClientRect()
    const relativeY = Math.min(Math.max(0, clientY - rect.top - dotHeight / 2), availableHeight)
    const progress = availableHeight === 0 ? 0 : relativeY / availableHeight
    const targetScroll = progress * limit

    lenisRef.current.scrollTo(targetScroll, { immediate: true })
  }, [limit])

  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
    updateScroll(e.clientY)
  }, [updateScroll])

  useEffect(() => {
    if (!isDragging) return

    const onPointerMove = (e: PointerEvent) => {
      e.preventDefault()
      updateScroll(e.clientY)
    }

    const onPointerUp = () => {
      setIsDragging(false)
    }

    window.addEventListener("pointermove", onPointerMove)
    window.addEventListener("pointerup", onPointerUp)

    return () => {
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("pointerup", onPointerUp)
    }
  }, [isDragging, updateScroll])

  const dotHeight = 12
  const trackHeight = typeof window !== "undefined" && trackRef.current ? trackRef.current.clientHeight : 0
  const progress = limit === 0 ? 0 : scroll / limit
  const top = trackHeight === 0 ? 0 : progress * (trackHeight - dotHeight)

  return (
    <div
      ref={trackRef}
      onPointerDown={handlePointerDown}
      className="fixed right-0 top-0 bottom-0 w-6 z-[100] cursor-pointer touch-none flex justify-center group mix-blend-difference"
    >
      <div
        onPointerDown={handlePointerDown}
        className={`absolute right-1.5 w-2 h-2 rounded-full shadow-sm transition-all duration-100 ease-out will-change-transform cursor-grab'}
        `}
        style={{
          top: 0,
          height: `${dotHeight}px`,
          transform: `translateY(${top}px)`,
          background: 'white',
          pointerEvents: 'auto'
        }}
      />
    </div>
  )
}
