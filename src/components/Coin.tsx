type CoinProps = {
  rotation: number
  duration: number
  tossing: boolean
  onTap: () => void
}

const RELIEF = 'url(#relief)'
const BRONZE_GRAD = 'url(#bronzeGrad)'
const ENGRAVE = '#3d2c04'

/** Shared defs: gold field gradient, bronze relief gradient, emboss filter. */
function CoinDefs({ id }: { id: string }) {
  return (
    <defs>
      <radialGradient id={`field-${id}`} cx="38%" cy="30%" r="75%">
        <stop offset="0%" stopColor="#fff3c8" />
        <stop offset="35%" stopColor="#f6d876" />
        <stop offset="70%" stopColor="#e0b232" />
        <stop offset="100%" stopColor="#b08010" />
      </radialGradient>
      <radialGradient id={`rim-${id}`} cx="50%" cy="50%" r="50%">
        <stop offset="78%" stopColor="#d9ab2c" />
        <stop offset="88%" stopColor="#f8e28e" />
        <stop offset="94%" stopColor="#a67c0e" />
        <stop offset="100%" stopColor="#7a5a08" />
      </radialGradient>
      <linearGradient id="bronzeGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#8a6a14" />
        <stop offset="50%" stopColor="#6b4d0c" />
        <stop offset="100%" stopColor="#4a3405" />
      </linearGradient>
      <filter id="relief" x="-25%" y="-25%" width="150%" height="150%">
        <feDropShadow dx="0" dy="1.4" stdDeviation="0.7" floodColor="#fff6cf" floodOpacity="0.9" />
        <feDropShadow dx="0" dy="-1.6" stdDeviation="0.9" floodColor="#33240266" floodOpacity="0.85" />
      </filter>
      {/* arcs for circular inscriptions */}
      <path id={`arc-top-${id}`} d="M 38 120 A 82 82 0 0 1 202 120" fill="none" />
      <path id={`arc-bottom-${id}`} d="M 50 120 A 70 70 0 0 0 190 120" fill="none" />
    </defs>
  )
}

function BullRelief() {
  return (
    <g transform="translate(44,40) scale(1.28)" filter={RELIEF}>
      {/* horns */}
      <path d="M30 40 C16 35 9 23 10 9 C21 17 31 23 41 26 Z" fill={BRONZE_GRAD} />
      <path d="M90 40 C104 35 111 23 110 9 C99 17 89 23 79 26 Z" fill={BRONZE_GRAD} />
      {/* horn engraving lines */}
      <path d="M14 15 C20 21 26 25 33 28 M106 15 C100 21 94 25 87 28" stroke={ENGRAVE} strokeWidth="1.2" fill="none" opacity="0.55" />
      {/* ears */}
      <ellipse cx="25" cy="52" rx="11" ry="6" fill={BRONZE_GRAD} transform="rotate(-22 25 52)" />
      <ellipse cx="95" cy="52" rx="11" ry="6" fill={BRONZE_GRAD} transform="rotate(22 95 52)" />
      {/* head */}
      <path
        d="M41 25 L79 25 C88 25 92 34 92 46 C92 61 84 73 74 83 L70 96 C68 103 64 107 60 107 C56 107 52 103 50 96 L46 83 C36 73 28 61 28 46 C28 34 32 25 41 25 Z"
        fill={BRONZE_GRAD}
      />
      {/* engraved details */}
      <path d="M44 40 C50 36 70 36 76 40" stroke={ENGRAVE} strokeWidth="1.4" fill="none" opacity="0.5" />
      <path d="M52 62 C54 68 56 74 58 80 M68 62 C66 68 64 74 62 80" stroke={ENGRAVE} strokeWidth="1.1" fill="none" opacity="0.4" />
      {/* eyes */}
      <circle cx="47" cy="53" r="3.6" fill="#f4cf5e" />
      <circle cx="47.8" cy="52.2" r="1.2" fill={ENGRAVE} />
      <circle cx="73" cy="53" r="3.6" fill="#f4cf5e" />
      <circle cx="73.8" cy="52.2" r="1.2" fill={ENGRAVE} />
      {/* nostrils */}
      <circle cx="53" cy="91" r="3" fill="#f4cf5e" />
      <circle cx="67" cy="91" r="3" fill="#f4cf5e" />
      {/* nose ring — premium touch */}
      <circle cx="60" cy="100" r="6.5" fill="none" stroke="#f8e28e" strokeWidth="2.4" />
    </g>
  )
}

function BearRelief() {
  return (
    <g transform="translate(44,42) scale(1.28)" filter={RELIEF}>
      {/* ears */}
      <circle cx="32" cy="30" r="14" fill={BRONZE_GRAD} />
      <circle cx="88" cy="30" r="14" fill={BRONZE_GRAD} />
      <circle cx="32" cy="30" r="6" fill="#d9ab2c" />
      <circle cx="88" cy="30" r="6" fill="#d9ab2c" />
      {/* head */}
      <circle cx="60" cy="63" r="36" fill={BRONZE_GRAD} />
      {/* fur engraving */}
      <path
        d="M30 44 l-5 -3 M32 56 l-6 -2 M30 70 l-6 1 M90 44 l5 -3 M88 56 l6 -2 M90 70 l6 1 M44 30 l-3 -5 M76 30 l3 -5"
        stroke={ENGRAVE} strokeWidth="1.2" fill="none" opacity="0.5" strokeLinecap="round"
      />
      {/* brow line */}
      <path d="M42 46 C48 42 72 42 78 46" stroke={ENGRAVE} strokeWidth="1.4" fill="none" opacity="0.5" />
      {/* eyes */}
      <circle cx="47" cy="54" r="3.6" fill="#f4cf5e" />
      <circle cx="47.8" cy="53.2" r="1.2" fill={ENGRAVE} />
      <circle cx="73" cy="54" r="3.6" fill="#f4cf5e" />
      <circle cx="73.8" cy="53.2" r="1.2" fill={ENGRAVE} />
      {/* snout */}
      <ellipse cx="60" cy="76" rx="15" ry="11.5" fill="#d9ab2c" />
      <ellipse cx="60" cy="71" rx="5.5" ry="4.2" fill={ENGRAVE} />
      <path d="M60 75 L60 80 M60 80 C56 84 52 83 50 81 M60 80 C64 84 68 83 70 81" stroke={ENGRAVE} strokeWidth="2" fill="none" strokeLinecap="round" />
    </g>
  )
}

function CoinFaceSvg({ side, id }: { side: 'bull' | 'bear'; id: string }) {
  const word = side === 'bull' ? 'BUY' : 'SELL'
  return (
    <svg viewBox="0 0 240 240" className="h-full w-full" aria-hidden>
      <CoinDefs id={id} />
      {/* rim */}
      <circle cx="120" cy="120" r="118" fill={`url(#rim-${id})`} />
      <circle cx="120" cy="120" r="118" fill="none" stroke="#5d4308" strokeWidth="1.5" />
      {/* field */}
      <circle cx="120" cy="120" r="104" fill={`url(#field-${id})`} />
      <circle cx="120" cy="120" r="104" fill="none" stroke="#8a6508" strokeWidth="1.6" opacity="0.8" />
      {/* beaded border */}
      <circle
        cx="120" cy="120" r="96" fill="none"
        stroke="#7a5a08" strokeWidth="4.5"
        strokeDasharray="0.1 8.03" strokeLinecap="round" opacity="0.85"
      />
      {/* circular inscriptions */}
      <g filter={RELIEF} style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
        <text fontSize="12.5" fontWeight="700" letterSpacing="3.2" fill="#6b4d0c">
          <textPath href={`#arc-top-${id}`} startOffset="50%" textAnchor="middle">
            ★ IN VOLATILITY WE TRUST ★
          </textPath>
        </text>
        <text fontSize="10.5" fontWeight="700" letterSpacing="4" fill="#6b4d0c">
          <textPath href={`#arc-bottom-${id}`} startOffset="50%" textAnchor="middle">
            EST · 2026
          </textPath>
        </text>
      </g>
      {/* animal relief */}
      {side === 'bull' ? <BullRelief /> : <BearRelief />}
      {/* denomination word */}
      <g filter={RELIEF}>
        <text
          x="120" y="205" textAnchor="middle"
          fontSize="30" fontWeight="900" letterSpacing="9"
          fill="#6b4d0c" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          {word}
        </text>
        <path d="M74 214 L166 214" stroke="#8a6508" strokeWidth="1.6" opacity="0.8" />
      </g>
      {/* specular highlight */}
      <ellipse cx="86" cy="64" rx="58" ry="34" fill="#ffffff" opacity="0.16" transform="rotate(-24 86 64)" />
    </svg>
  )
}

/** 3D premium golden coin. Front = bull/BUY, back = bear/SELL. */
export default function Coin({ rotation, duration, tossing, onTap }: CoinProps) {
  const LAYERS = 18
  const HALF = LAYERS / 2
  return (
    <div className={`coin-toss ${tossing ? 'coin-toss-active' : ''}`}>
      <div className="coin-float">
        <button
          type="button"
          onClick={onTap}
          aria-label="Подбросить монету"
          className="coin-scene focus:outline-none active:scale-[0.97] transition-transform"
        >
          <div
            className="coin"
            style={{
              transform: `rotateY(${rotation}deg)`,
              transitionDuration: `${duration}s`,
            }}
          >
            {/* reeded gold edge — stacked ridged layers */}
            {Array.from({ length: LAYERS }).map((_, i) => (
              <div
                key={i}
                className="coin-layer"
                style={{ transform: `translateZ(${i - HALF + 0.5}px)` }}
              />
            ))}
            <div className="coin-face-wrap" style={{ transform: `translateZ(${HALF}px)` }}>
              <div className="coin-face" style={{ backfaceVisibility: 'hidden' }}>
                <CoinFaceSvg side="bull" id="bull" />
                <div className="coin-sheen" />
              </div>
            </div>
            <div
              className="coin-face-wrap"
              style={{ transform: `rotateY(180deg) translateZ(${HALF}px)` }}
            >
              <div className="coin-face" style={{ backfaceVisibility: 'hidden' }}>
                <CoinFaceSvg side="bear" id="bear" />
                <div className="coin-sheen" />
              </div>
            </div>
          </div>
        </button>
      </div>
      <div className="coin-shadow" />
    </div>
  )
}
