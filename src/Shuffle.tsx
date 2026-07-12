import { useEffect, useRef, useState, type CSSProperties } from 'react'

type ShuffleProps = {
  text: string
  className?: string
  style?: CSSProperties
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  duration?: number
  shuffleTimes?: number
  scrambleCharset?: string
  triggerOnHover?: boolean
}

const defaultCharset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/·-'

function Shuffle({
  text,
  className = '',
  style,
  tag = 'span',
  duration = 520,
  shuffleTimes = 8,
  scrambleCharset = defaultCharset,
  triggerOnHover = true,
}: ShuffleProps) {
  const [displayText, setDisplayText] = useState(text)
  const [ready, setReady] = useState(false)
  const elementRef = useRef<HTMLElement | null>(null)
  const hasPlayedRef = useRef(false)
  const timerRef = useRef<ReturnType<typeof window.setInterval> | null>(null)

  const play = () => {
    if (timerRef.current) window.clearInterval(timerRef.current)

    let frame = 0
    const totalFrames = Math.max(1, shuffleTimes)
    const interval = Math.max(24, duration / totalFrames)

    timerRef.current = window.setInterval(() => {
      frame += 1
      const progress = frame / totalFrames
      const nextText = text.split('').map((character, index) => {
        if (character === ' ') return ' '
        const settlePoint = index / Math.max(1, text.length)
        if (progress > settlePoint + 0.24) return character
        return scrambleCharset[Math.floor(Math.random() * scrambleCharset.length)] || character
      }).join('')

      setDisplayText(frame >= totalFrames ? text : nextText)

      if (frame >= totalFrames && timerRef.current) {
        window.clearInterval(timerRef.current)
        timerRef.current = null
      }
    }, interval)
  }

  useEffect(() => {
    setDisplayText(text)
  }, [text])

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || hasPlayedRef.current) return
      hasPlayedRef.current = true
      setReady(true)
      play()
    }, { threshold: 0.35 })

    observer.observe(element)

    return () => {
      observer.disconnect()
      if (timerRef.current) window.clearInterval(timerRef.current)
    }
  }, [])

  const Tag = tag

  return (
    <Tag
      ref={elementRef as never}
      className={`shuffle-title ${ready ? 'is-ready' : ''} ${className}`}
      style={style}
      onMouseEnter={triggerOnHover ? play : undefined}
      aria-label={text}
    >
      <span aria-hidden="true">{displayText}</span>
    </Tag>
  )
}

export default Shuffle
