import { useEffect, useRef } from 'react'

type Candle = {
  open: number
  close: number
  high: number
  low: number
}

/** Animated BTC-style candlestick chart rendered on a canvas behind the app. */
export default function CandleChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = 0
    let height = 0
    let raf = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const CANDLE_W = 14 * dpr
    const GAP = 6 * dpr
    const STEP = CANDLE_W + GAP

    let candles: Candle[] = []
    let price = 0.5 // normalized 0..1
    let offset = 0 // px scroll offset
    const SPEED = 0.35 * dpr

    const rand = () => Math.random()

    const nextCandle = (): Candle => {
      const drift = (rand() - 0.485) * 0.11
      const open = price
      const close = Math.min(0.92, Math.max(0.08, open + drift))
      const high = Math.min(0.97, Math.max(open, close) + rand() * 0.05)
      const low = Math.max(0.03, Math.min(open, close) - rand() * 0.05)
      price = close
      return { open, close, high, low }
    }

    const resize = () => {
      width = canvas.clientWidth * dpr
      height = canvas.clientHeight * dpr
      canvas.width = width
      canvas.height = height
      const needed = Math.ceil(width / STEP) + 3
      while (candles.length < needed) candles.push(nextCandle())
    }

    const y = (v: number) => height * (1 - v)

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      // horizontal grid
      ctx.strokeStyle = 'rgba(120, 140, 180, 0.07)'
      ctx.lineWidth = 1 * dpr
      for (let i = 1; i < 8; i++) {
        const gy = (height / 8) * i
        ctx.beginPath()
        ctx.moveTo(0, gy)
        ctx.lineTo(width, gy)
        ctx.stroke()
      }

      offset += SPEED
      while (offset >= STEP) {
        offset -= STEP
        candles.shift()
        candles.push(nextCandle())
      }

      candles.forEach((c, i) => {
        const x = i * STEP - offset
        const up = c.close >= c.open
        const col = up ? 'rgba(38, 198, 134, 0.5)' : 'rgba(235, 69, 90, 0.5)'
        const wick = up ? 'rgba(38, 198, 134, 0.35)' : 'rgba(235, 69, 90, 0.35)'

        ctx.strokeStyle = wick
        ctx.lineWidth = 1.6 * dpr
        ctx.beginPath()
        ctx.moveTo(x + CANDLE_W / 2, y(c.high))
        ctx.lineTo(x + CANDLE_W / 2, y(c.low))
        ctx.stroke()

        const top = y(Math.max(c.open, c.close))
        const h = Math.max(2 * dpr, Math.abs(y(c.open) - y(c.close)))
        ctx.fillStyle = col
        ctx.beginPath()
        ctx.roundRect(x, top, CANDLE_W, h, 2 * dpr)
        ctx.fill()
      })

      raf = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden
    />
  )
}
