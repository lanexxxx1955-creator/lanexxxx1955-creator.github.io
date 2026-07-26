const REF_URL = 'https://whitebird.io/signup?refid=UwOUC'

type TelegramWebApp = {
  openLink?: (url: string) => void
  HapticFeedback?: { impactOccurred?: (style: string) => void }
}

function getTG(): TelegramWebApp | undefined {
  return (window as unknown as { Telegram?: { WebApp?: TelegramWebApp } }).Telegram?.WebApp
}

export function openReferral() {
  const tg = getTG()
  tg?.HapticFeedback?.impactOccurred?.('light')
  if (tg?.openLink) tg.openLink(REF_URL)
  else window.open(REF_URL, '_blank', 'noopener,noreferrer')
}

type Props = {
  result: 'buy' | 'sell'
  onDismiss: () => void
}

/** Referral CTA shown right after the coin lands — the user's moment of decision. */
export default function ReferralCard({ result, onDismiss }: Props) {
  const isBuy = result === 'buy'
  return (
    <div className="cta-rise relative w-full max-w-[320px] overflow-hidden rounded-2xl border border-[#d9ab2c]/40 bg-[#0a0e18]/90 p-3.5 shadow-[0_8px_32px_rgba(0,0,0,0.6)] backdrop-blur-sm">
      {/* gold top glint */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#f8e28e]/70 to-transparent" />

      <button
        type="button"
        onClick={onDismiss}
        aria-label="Скрыть"
        className="absolute right-2.5 top-2.5 flex h-6 w-6 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-white/5 hover:text-slate-300"
      >
        ✕
      </button>

      <p className="pr-7 text-[13px] font-bold leading-snug text-slate-200">
        {isBuy ? 'Монета сказала BUY 🐂' : 'Монета сказала SELL 🐻'} — время действовать
      </p>
      <p className="mt-1 pr-7 text-[11px] leading-snug text-slate-400">
        Исполни сделку на криптообменнике WhiteBird
      </p>

      <button
        type="button"
        onClick={openReferral}
        className="mt-2.5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-[#f8e28e] via-[#e8c552] to-[#c79f2e] px-4 py-2.5 text-[13px] font-black tracking-wide text-[#3d2c04] shadow-[0_2px_12px_rgba(232,197,82,0.35),inset_0_1px_0_rgba(255,255,255,0.6)] transition-transform active:scale-[0.97]"
      >
        Открыть WhiteBird
        <span aria-hidden>↗</span>
      </button>

      <p className="mt-2 text-center text-[9.5px] tracking-wide text-slate-600">
        Реферальная ссылка автора — поддерживает развитие аппа 🙏
      </p>
    </div>
  )
}
