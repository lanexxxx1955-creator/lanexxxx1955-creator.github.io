import { useEffect, useRef, useState } from 'react'
import CandleChart from '../components/CandleChart'
import Coin from '../components/Coin'
import ReferralCard, { openReferral } from '../components/ReferralCard'

type Side = 'buy' | 'sell'

type TelegramWebApp = {
  ready?: () => void
  expand?: () => void
  setHeaderColor?: (color: string) => void
  setBackgroundColor?: (color: string) => void
  HapticFeedback?: {
    impactOccurred?: (style: string) => void
    notificationOccurred?: (type: string) => void
  }
}

function getTG(): TelegramWebApp | undefined {
  return (window as unknown as { Telegram?: { WebApp?: TelegramWebApp } }).Telegram?.WebApp
}

export default function Home() {
  const [rotation, setRotation] = useState(0)
  const [duration, setDuration] = useState(3)
  const [spinning, setSpinning] = useState(false)
  const [result, setResult] = useState<Side | null>(null)
  const [stats, setStats] = useState({ buy: 0, sell: 0 })
  const [history, setHistory] = useState<Side[]>([])
  const [ctaVisible, setCtaVisible] = useState(false)
  const [ctaDismissed, setCtaDismissed] = useState(false)
  const rotationRef = useRef(0)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    const tg = getTG()
    tg?.ready?.()
    tg?.expand?.()
    tg?.setHeaderColor?.('#04060c')
    tg?.setBackgroundColor?.('#04060c')
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current)
    }
  }, [])

  // Referral CTA appears with a short delay after the coin lands —
  // the user's moment of decision, when motivation to act is highest.
  useEffect(() => {
    if (result && !spinning && !ctaDismissed) {
      const t = window.setTimeout(() => setCtaVisible(true), 1100)
      return () => window.clearTimeout(t)
    }
    setCtaVisible(false)
  }, [result, spinning, ctaDismissed])

  const flip = () => {
    if (spinning) return

    const res: Side = Math.random() < 0.5 ? 'buy' : 'sell'
    const current = rotationRef.current
    const mod = ((current % 360) + 360) % 360
    const faceAngle = res === 'buy' ? 0 : 180
    const delta = (faceAngle - mod + 360) % 360
    const spins = 6 + Math.floor(Math.random() * 4) // 6–9 оборотов
    const next = current + spins * 360 + delta
    const dur = 2.4 + Math.random() * 1.1

    rotationRef.current = next
    setDuration(dur)
    setRotation(next)
    setSpinning(true)
    setResult(null)

    const tg = getTG()
    tg?.HapticFeedback?.impactOccurred?.('medium')
    if (!tg?.HapticFeedback) navigator.vibrate?.(30)

    timerRef.current = window.setTimeout(() => {
      setSpinning(false)
      setResult(res)
      setStats((s) => ({ ...s, [res]: s[res] + 1 }))
      setHistory((h) => [...h, res].slice(-14))
      tg?.HapticFeedback?.notificationOccurred?.(res === 'buy' ? 'success' : 'warning')
      if (!tg?.HapticFeedback) navigator.vibrate?.([40, 40, 40])
    }, dur * 1000 + 80)
  }

  const isBuy = result === 'buy'

  return (
    <div className="relative flex min-h-dvh flex-col overflow-hidden bg-[#04060c]">
      {/* фон: свечной график + виньетка */}
      <CandleChart />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(4,6,12,0.55)_70%,rgba(4,6,12,0.9)_100%)]" />

      <div
        className="relative z-10 flex min-h-dvh flex-col items-center justify-between px-6 pb-10"
        style={{ paddingTop: 'max(env(safe-area-inset-top), 20px)' }}
      >
        {/* header */}
        <header className="flex w-full flex-col items-center gap-1.5">
          <div className="flex items-center gap-2">
            <span className="text-xl font-black text-[#f7931a]">₿</span>
            <h1 className="text-sm font-extrabold uppercase tracking-[0.3em] text-slate-200">
              Trader's Coin
            </h1>
          </div>
          <p className="text-[11px] tracking-wide text-slate-500">
            Момент неопределённости? Пусть решит монета
          </p>
          {/* stats */}
          <div className="mt-3 flex gap-3">
            <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1">
              <span className="text-[10px] font-bold tracking-widest text-emerald-400">BUY</span>
              <span className="text-sm font-black tabular-nums text-emerald-300">{stats.buy}</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1">
              <span className="text-[10px] font-bold tracking-widest text-red-400">SELL</span>
              <span className="text-sm font-black tabular-nums text-red-300">{stats.sell}</span>
            </div>
          </div>
        </header>

        {/* result banner */}
        <div className="flex h-20 items-center">
          {result && !spinning ? (
            <div key={`${result}-${stats.buy}-${stats.sell}`} className="result-pop flex items-center gap-3">
              <span className="text-4xl">{isBuy ? '🐂' : '🐻'}</span>
              <span
                className={`text-5xl font-black tracking-wider ${
                  isBuy
                    ? 'text-emerald-400 [text-shadow:0_0_24px_rgba(52,211,153,0.65)]'
                    : 'text-red-400 [text-shadow:0_0_24px_rgba(248,113,113,0.65)]'
                }`}
              >
                {isBuy ? 'BUY' : 'SELL'}
              </span>
            </div>
          ) : (
            <p className={`text-xs font-bold uppercase tracking-[0.35em] text-slate-400 ${spinning ? '' : 'hint-pulse'}`}>
              {spinning ? 'Крутится…' : 'Тапни по монете'}
            </p>
          )}
        </div>

        {/* coin */}
        <div style={{ ['--spin-duration' as string]: `${duration}s` }}>
          <Coin rotation={rotation} duration={duration} tossing={spinning} onTap={flip} />
        </div>

        {/* history */}
        <footer className="flex w-full flex-col items-center gap-3">
          <div className="flex min-h-[18px] items-center gap-1.5">
            {history.map((h, i) => (
              <span
                key={i}
                title={h === 'buy' ? 'BUY' : 'SELL'}
                className={`flex h-[18px] w-[18px] items-center justify-center rounded-full text-[10px] font-black ${
                  h === 'buy'
                    ? 'bg-emerald-500/80 text-emerald-950'
                    : 'bg-red-500/80 text-red-950'
                } ${i === history.length - 1 ? 'ring-2 ring-white/60' : 'opacity-70'}`}
              >
                {h === 'buy' ? 'B' : 'S'}
              </span>
            ))}
          </div>
          <p className="text-[10px] tracking-wide text-slate-600">
            Не финансовый совет. Монета просто снимает с тебя выбор. 🪙
          </p>
          <div className="flex items-center gap-2 text-[9.5px] tracking-wide text-slate-700">
            <span>© 2026 ALIAKSANDR LEMESHAU (LANEX)</span>
            {ctaDismissed && (
              <>
                <span aria-hidden>·</span>
                <button
                  type="button"
                  onClick={openReferral}
                  className="font-bold text-[#d9ab2c]/80 transition-colors hover:text-[#f8e28e]"
                >
                  WhiteBird ↗
                </button>
              </>
            )}
          </div>
        </footer>
      </div>

      {/* referral CTA — rises after the coin lands */}
      {ctaVisible && result && (
        <div
          className="absolute inset-x-0 z-20 flex justify-center px-6"
          style={{ bottom: 'calc(env(safe-area-inset-bottom, 0px) + 92px)' }}
        >
          <ReferralCard result={result} onDismiss={() => { setCtaDismissed(true); setCtaVisible(false) }} />
        </div>
      )}
    </div>
  )
}
