import katex from 'katex'

// ── KaTeX wrappers ─────────────────────────────────────────────────────────
const KATEX_OPTS = {
  throwOnError: false,
  strict: false,
  trust: true,
  macros: {
    '\\argmax': '\\operatorname*{argmax}',
    '\\argmin': '\\operatorname*{argmin}',
    '\\V':     '\\mathbb{V}',
    '\\H':     '\\mathcal{H}',
    '\\K':     '\\mathcal{K}',
    '\\F':     '\\mathcal{F}',
  }
}

export const M = ({ m }) => (
  <span dangerouslySetInnerHTML={{
    __html: katex.renderToString(m, { ...KATEX_OPTS, displayMode: false })
  }} />
)

export const D = ({ m, cls = '' }) => (
  <div className={`eq ${cls}`} dangerouslySetInnerHTML={{
    __html: katex.renderToString(m, { ...KATEX_OPTS, displayMode: true })
  }} />
)

// ── Fragment helper ────────────────────────────────────────────────────────
export const Frag = ({ at, frag, children }) => (
  <div className={`frag ${frag >= at ? 'visible' : 'hidden'}`}>
    {children}
  </div>
)

// ── Dark section divider ───────────────────────────────────────────────────
export const DarkSlide = ({ accent = 'var(--blue)', eyebrow, eyebrowSize, title, sub, footer }) => (
  <div className="slide dark-slide" style={{ position: 'relative' }}>
    <div className="dark-accent" style={{ background: accent }} />
    {footer && (
      <div className="dark-footer"><span>{footer}</span></div>
    )}
    <div className="dark-body">
      {eyebrow && <div className="eyebrow" style={{ color: accent === 'var(--blue)' ? 'rgba(100,170,255,.9)' : accent === 'var(--red)' ? 'rgba(255,150,130,.9)' : 'rgba(255,200,80,.9)', fontSize: eyebrowSize || '13px' }}>{eyebrow}</div>}
      <div className="dark-h">{title}</div>
      {sub && <div className="dark-sub">{sub}</div>}
    </div>
  </div>
)

// ── Content slide shell ────────────────────────────────────────────────────
export const ContentSlide = ({ title, stripe = 'var(--blue)', children }) => (
  <div className="slide content-slide">
    <div className="ch"><h3>{title}</h3></div>
    <div className="cstripe" style={{ background: stripe }} />
    <div className="cb">{children}</div>
  </div>
)

// ── Card ───────────────────────────────────────────────────────────────────
export const Card = ({ color = 'blue', title, children, style }) => (
  <div className={`card ${color}`} style={style}>
    {title && <div className={`ct ${color}`}>{title}</div>}
    <div className="cb2">{children}</div>
  </div>
)

// ── Theorem box ────────────────────────────────────────────────────────────
export const Thm = ({ color = '', label, children, style }) => (
  <div className={`thm ${color}`} style={style}>
    {label && <div className={`thm-lbl ${color}`}>{label}</div>}
    <div className="thm-body">{children}</div>
  </div>
)

// ── Equation block ─────────────────────────────────────────────────────────
export const Eq = ({ m, color = '' }) => <D m={m} cls={color} />

// ── Intuition gold box ─────────────────────────────────────────────────────
export const Intuition = ({ children }) => (
  <div className="intuition">{children}</div>
)

// ── Bold insight quote ─────────────────────────────────────────────────────
export const Insight = ({ children }) => (
  <div className="insight">{children}</div>
)

// ── Paradox red box ────────────────────────────────────────────────────────
export const Paradox = ({ children }) => (
  <div className="paradox">{children}</div>
)

// ── Key (navy) banner ──────────────────────────────────────────────────────
export const Key = ({ children, style }) => (
  <div className="key" style={style}>{children}</div>
)

// ── Paper row ──────────────────────────────────────────────────────────────
export const PaperRow = ({ num, color, title, desc, tag }) => (
  <div className="paper-row">
    <div className="pnum" style={{ background: color }}>{num}</div>
    <div className="ptxt">
      <strong>{title}</strong>{tag && <> <span className={`tag ${tag}`}>{tag}</span></>}
      <br /><span className="c-muted">{desc}</span>
    </div>
  </div>
)

// ── SVG: BM paths simulation (Slide 5) ────────────────────────────────────
// Generates 5 deterministic BM-ish paths and their bridge versions
const N_STEPS = 60
const TV_STEP = 40 // 40/60 = 2/3 of the way = Tv
const VIEW_Y = 0.55  // the view target in data units

function genPath(seed) {
  let x = 0
  const pts = [0]
  for (let i = 1; i <= N_STEPS; i++) {
    // Deterministic pseudo-random via sin composition
    const r = Math.sin(seed * 113.1 + i * 17.7) * Math.cos(seed * 79.3 + i * 31.1)
    x += r * 0.12
    pts.push(Math.max(-1.4, Math.min(1.4, x)))
  }
  return pts
}

function toBridge(path, tv, target) {
  const xAtTv = path[tv]
  return path.map((x, i) => {
    if (i > tv) return null // don't show after Tv in bridge viz
    return x + (target - xAtTv) * (i / tv)
  })
}

const RAW_PATHS = [1, 2, 3, 4, 5].map(genPath)
const BRIDGE_PATHS = RAW_PATHS.map(p => toBridge(p, TV_STEP, VIEW_Y))

function pathToSvgD(pts, xScale, yScale, yOffset) {
  return pts
    .map((y, i) => {
      if (y === null) return null
      const sx = i * xScale
      const sy = yOffset - y * yScale
      return `${i === 0 ? 'M' : 'L'} ${sx.toFixed(1)} ${sy.toFixed(1)}`
    })
    .filter(Boolean)
    .join(' ')
}

export const BMSimulation = ({ showBridge = false }) => {
  const W = 340, H = 180
  const PAD_L = 28, PAD_R = 10, PAD_T = 10, PAD_B = 24
  const plotW = W - PAD_L - PAD_R
  const plotH = H - PAD_T - PAD_B
  const xScale = plotW / N_STEPS
  const yScale = plotH / 3.0   // maps [-1.5, 1.5] to plotH
  const yOff = PAD_T + plotH / 2 + plotH / 6  // center + slight shift up

  const tvX = PAD_L + TV_STEP * xScale
  const viewYpx = yOff - VIEW_Y * yScale

  const COLORS = ['#94A3B8', '#94A3B8', '#94A3B8', '#94A3B8', '#94A3B8']
  const BRIDGE_COLORS = ['#2463EB', '#3B82F6', '#1D4ED8', '#60A5FA', '#1E40AF']

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxHeight: 185 }}>
      {/* Axes */}
      <line x1={PAD_L} y1={PAD_T} x2={PAD_L} y2={H - PAD_B} stroke="#CBD5E1" strokeWidth="1" />
      <line x1={PAD_L} y1={H - PAD_B} x2={W - PAD_R} y2={H - PAD_B} stroke="#CBD5E1" strokeWidth="1" />
      <text x={PAD_L + plotW / 2} y={H - 4} textAnchor="middle" fontSize="9" fill="#94A3B8" fontFamily="Inter,sans-serif">time t</text>
      <text x={PAD_L - 6} y={PAD_T + 4} textAnchor="end" fontSize="9" fill="#94A3B8" fontFamily="Inter,sans-serif">X</text>

      {/* Prior BM paths (always shown) */}
      {RAW_PATHS.map((p, i) => (
        <path
          key={`bm-${i}`}
          d={pathToSvgD(p, xScale, yScale, yOff)}
          stroke={COLORS[i]} strokeWidth="1.2" fill="none"
          transform={`translate(${PAD_L},0)`}
          opacity="0.55"
        />
      ))}

      {/* Tv vertical line */}
      <line x1={tvX} y1={PAD_T} x2={tvX} y2={H - PAD_B} stroke="#D97706" strokeWidth="1.2" strokeDasharray="4,3" />
      <text x={tvX + 3} y={PAD_T + 10} fontSize="9" fill="#D97706" fontFamily="Inter,sans-serif" fontWeight="700">Tv</text>

      {/* View point y */}
      <circle cx={tvX} cy={viewYpx} r="4.5" fill="#D97706" />
      <text x={tvX + 6} y={viewYpx + 4} fontSize="9" fill="#D97706" fontFamily="Inter,sans-serif" fontWeight="700">y</text>

      {/* Bridge paths (shown when showBridge = true) */}
      {showBridge && BRIDGE_PATHS.map((p, i) => (
        <path
          key={`br-${i}`}
          d={pathToSvgD(p, xScale, yScale, yOff)}
          stroke={BRIDGE_COLORS[i]} strokeWidth="1.8" fill="none"
          transform={`translate(${PAD_L},0)`}
          opacity="0.85"
        />
      ))}

      {/* Labels */}
      {!showBridge && <text x={PAD_L + 4} y={PAD_T + 10} fontSize="8" fill="#94A3B8" fontFamily="Inter,sans-serif">prior paths X(t)</text>}
      {showBridge && <text x={PAD_L + 4} y={PAD_T + 10} fontSize="8" fill="#2463EB" fontFamily="Inter,sans-serif" fontWeight="600">conditional paths X(t)|Y=y</text>}
    </svg>
  )
}

// ── SVG: Brownian Bridge with hitting time (Slide 7) ───────────────────────
function genBridge(seed, startY, endY, steps) {
  let bm = [startY]
  let x = startY
  for (let i = 1; i <= steps; i++) {
    const r = Math.sin(seed * 117 + i * 23.4) * Math.cos(seed * 53 + i * 7.1)
    x += r * 0.09
    bm.push(x)
  }
  // Doob h-transform: bridge to endY at step `steps`
  const xEnd = bm[steps]
  return bm.map((v, i) => v + (endY - xEnd) * (i / steps))
}

export const BridgeSimulation = () => {
  const W = 340, H = 170
  const PAD = { l: 28, r: 16, t: 10, b: 24 }
  const plotW = W - PAD.l - PAD.r
  const plotH = H - PAD.t - PAD.b
  const STEPS = 50
  const TV_RATIO = 0.6   // Tv at 60% of the axis
  const TTILDE_RATIO_SMALL = 0.7  // small omega: T̃ slightly beyond Tv
  const TTILDE_RATIO_LARGE = 0.88 // large omega: T̃ further out

  // Generate bridges ending at step round(TTILDE_RATIO * STEPS)
  const TTILDE_STEPS_SMALL = Math.round(TTILDE_RATIO_SMALL * STEPS)
  const TTILDE_STEPS_LARGE = Math.round(TTILDE_RATIO_LARGE * STEPS)
  const TV_STEPS = Math.round(TV_RATIO * STEPS)

  const targetY = 0.5
  const startY = 0

  // Small omega: bridges end at TTILDE_SMALL → plot up to that point
  const smallPaths = [1, 2, 3].map(s => genBridge(s, startY, targetY, TTILDE_STEPS_SMALL))
  // Large omega: bridges end at TTILDE_LARGE
  const largePaths = [4, 5, 6].map(s => genBridge(s, startY, targetY, TTILDE_STEPS_LARGE))

  const toSvg = (pts, xRatio) => {
    const xScale = plotW * xRatio / (pts.length - 1)
    const yScale = plotH / 3.0
    const yOff = PAD.t + plotH * 0.55
    return pts
      .map((y, i) => `${i === 0 ? 'M' : 'L'} ${(PAD.l + i * xScale).toFixed(1)} ${(yOff - y * yScale).toFixed(1)}`)
      .join(' ')
  }

  const tvX = PAD.l + TV_RATIO * plotW
  const ttSmX = PAD.l + TTILDE_RATIO_SMALL * plotW
  const ttLgX = PAD.l + TTILDE_RATIO_LARGE * plotW
  const yOff = PAD.t + plotH * 0.55
  const yScale = plotH / 3.0
  const targetYpx = yOff - targetY * yScale

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxHeight: 175 }}>
      {/* Axes */}
      <line x1={PAD.l} y1={PAD.t} x2={PAD.l} y2={H - PAD.b} stroke="#CBD5E1" strokeWidth="1" />
      <line x1={PAD.l} y1={H - PAD.b} x2={W - PAD.r} y2={H - PAD.b} stroke="#CBD5E1" strokeWidth="1" />
      <text x={W / 2} y={H - 5} textAnchor="middle" fontSize="9" fill="#94A3B8" fontFamily="Inter,sans-serif">time t</text>

      {/* Tv line */}
      <line x1={tvX} y1={PAD.t} x2={tvX} y2={H - PAD.b} stroke="#D97706" strokeWidth="1" strokeDasharray="3,2" opacity="0.7" />
      <text x={tvX + 2} y={PAD.t + 9} fontSize="8" fill="#D97706" fontFamily="Inter,sans-serif">Tv</text>

      {/* Small omega bridges (blue, end at T̃ small) */}
      {smallPaths.map((p, i) => (
        <path key={`s${i}`} d={toSvg(p, TTILDE_RATIO_SMALL)}
          stroke="#2463EB" strokeWidth="1.6" fill="none" opacity="0.7" />
      ))}
      {/* T̃ small line */}
      <line x1={ttSmX} y1={PAD.t} x2={ttSmX} y2={H - PAD.b} stroke="#2463EB" strokeWidth="1.5" />
      <circle cx={ttSmX} cy={targetYpx} r="3.5" fill="#2463EB" />
      <text x={ttSmX + 2} y={PAD.t + 9} fontSize="8" fill="#2463EB" fontFamily="Inter,sans-serif" fontWeight="700">T̃ (small ω)</text>

      {/* Large omega bridges (purple/slate, end at T̃ large) */}
      {largePaths.map((p, i) => (
        <path key={`l${i}`} d={toSvg(p, TTILDE_RATIO_LARGE)}
          stroke="#7C3AED" strokeWidth="1.6" fill="none" opacity="0.7" />
      ))}
      {/* T̃ large line */}
      <line x1={ttLgX} y1={PAD.t} x2={ttLgX} y2={H - PAD.b} stroke="#7C3AED" strokeWidth="1.5" />
      <circle cx={ttLgX} cy={targetYpx} r="3.5" fill="#7C3AED" />
      <text x={ttLgX + 2} y={PAD.t + 9} fontSize="8" fill="#7C3AED" fontFamily="Inter,sans-serif" fontWeight="700">T̃ (large ω)</text>

      {/* Target y label */}
      <line x1={PAD.l - 4} y1={targetYpx} x2={PAD.l} y2={targetYpx} stroke="#94A3B8" strokeWidth="1" />
      <text x={PAD.l - 5} y={targetYpx + 4} textAnchor="end" fontSize="8" fill="#94A3B8" fontFamily="Inter,sans-serif">y</text>

      {/* Legend */}
      <rect x={W - 115} y={H - PAD.b - 24} width={108} height={22} rx="3" fill="white" opacity="0.85" />
      <line x1={W - 110} y1={H - PAD.b - 13} x2={W - 96} y2={H - PAD.b - 13} stroke="#2463EB" strokeWidth="2" />
      <text x={W - 93} y={H - PAD.b - 10} fontSize="7.5" fill="#2463EB" fontFamily="Inter,sans-serif">precise view</text>
      <line x1={W - 110} y1={H - PAD.b - 4} x2={W - 96} y2={H - PAD.b - 4} stroke="#7C3AED" strokeWidth="2" />
      <text x={W - 93} y={H - PAD.b - 1} fontSize="7.5" fill="#7C3AED" fontFamily="Inter,sans-serif">noisy view</text>
    </svg>
  )
}

// ── SVG: Portfolio components over time (Slide 8) ──────────────────────────
export const PortfolioGraph = () => {
  const W = 360, H = 155
  const PAD = { l: 42, r: 12, t: 12, b: 28 }
  const plotW = W - PAD.l - PAD.r
  const plotH = H - PAD.t - PAD.b
  const N = 50

  // MV component (myopic): constant at 0.45 units
  const MV_VAL = 0.45
  // M(t) × MV: starts at 0.28 (at t=0), decays to 0 at t=Tv (t=1)
  // Simplified: M(t) proportional to (1 - t)/(0.5 + (1-t))
  const getMt = (t) => {
    const k = 2.0
    return 0.28 * k * (1 - t) / (1 + k * (1 - t))
  }

  const xOf = (i) => PAD.l + (i / N) * plotW
  const yOf = (v) => PAD.t + plotH - (v / 0.9) * plotH  // 0 at bottom, 0.9 at top

  const mvD = Array.from({ length: N + 1 }, (_, i) =>
    `${i === 0 ? 'M' : 'L'} ${xOf(i).toFixed(1)} ${yOf(MV_VAL).toFixed(1)}`).join(' ')

  const hedgeD = Array.from({ length: N + 1 }, (_, i) => {
    const t = i / N
    return `${i === 0 ? 'M' : 'L'} ${xOf(i).toFixed(1)} ${yOf(getMt(t)).toFixed(1)}`
  }).join(' ')

  const totalD = Array.from({ length: N + 1 }, (_, i) => {
    const t = i / N
    return `${i === 0 ? 'M' : 'L'} ${xOf(i).toFixed(1)} ${yOf(MV_VAL + getMt(t)).toFixed(1)}`
  }).join(' ')

  // Shaded area for hedging band
  const hedgeAreaPts = [
    ...Array.from({ length: N + 1 }, (_, i) => {
      const t = i / N
      return `${i === 0 ? 'M' : 'L'} ${xOf(i).toFixed(1)} ${yOf(MV_VAL).toFixed(1)}`
    }),
    ...Array.from({ length: N + 1 }, (_, i) => {
      const ii = N - i, t = ii / N
      return `L ${xOf(ii).toFixed(1)} ${yOf(MV_VAL + getMt(t)).toFixed(1)}`
    }),
    'Z'
  ].join(' ')

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxHeight: 160 }}>
      {/* Axes */}
      <line x1={PAD.l} y1={PAD.t} x2={PAD.l} y2={H - PAD.b} stroke="#CBD5E1" strokeWidth="1" />
      <line x1={PAD.l} y1={H - PAD.b} x2={W - PAD.r} y2={H - PAD.b} stroke="#CBD5E1" strokeWidth="1" />
      <text x={PAD.l + plotW / 2} y={H - 6} textAnchor="middle" fontSize="9" fill="#94A3B8" fontFamily="Inter,sans-serif">time t</text>
      <text x={PAD.l - 6} y={H - PAD.b} textAnchor="end" fontSize="8" fill="#94A3B8" fontFamily="Inter,sans-serif">0</text>
      <text x={W - PAD.r + 2} y={H - PAD.b + 4} fontSize="8" fill="#D97706" fontFamily="Inter,sans-serif" fontWeight="700">Tv</text>
      <line x1={W - PAD.r} y1={PAD.t} x2={W - PAD.r} y2={H - PAD.b} stroke="#D97706" strokeWidth="1" strokeDasharray="3,2" opacity="0.7" />

      {/* Y-axis label */}
      <text x={8} y={H / 2} textAnchor="middle" fontSize="8.5" fill="#64748B" fontFamily="Inter,sans-serif" transform={`rotate(-90, 8, ${H / 2})`}>π*(t)</text>

      {/* Hedging band fill */}
      <path d={hedgeAreaPts} fill="#D97706" fillOpacity="0.12" />

      {/* MV component (blue, flat) */}
      <path d={mvD} stroke="#2463EB" strokeWidth="2" fill="none" />

      {/* Hedging demand (gold, decreasing to 0) */}
      <path d={hedgeD} stroke="#D97706" strokeWidth="1.5" fill="none" strokeDasharray="5,2" />

      {/* Total (green) */}
      <path d={totalD} stroke="#059669" strokeWidth="2.2" fill="none" />

      {/* Labels */}
      <text x={PAD.l + 6} y={yOf(MV_VAL) - 3} fontSize="8" fill="#2463EB" fontFamily="Inter,sans-serif" fontWeight="600">MV term (constant)</text>
      <text x={PAD.l + 6} y={yOf(getMt(0.1)) - 3} fontSize="8" fill="#D97706" fontFamily="Inter,sans-serif" fontWeight="600">Hedging M(t)·π_MV → 0</text>
      <text x={PAD.l + 6} y={yOf(MV_VAL + getMt(0.05)) + 10} fontSize="8" fill="#059669" fontFamily="Inter,sans-serif" fontWeight="600">Total π*(t)</text>
    </svg>
  )
}

// ── SVG: Efficient Frontier (Slide 19) ────────────────────────────────────
export const EfficientFrontierSVG = () => {
  const W = 380, H = 280
  const PAD = { l: 52, r: 20, t: 16, b: 44 }
  const plotW = W - PAD.l - PAD.r
  const plotH = H - PAD.t - PAD.b

  // Coordinate transforms
  const xOf = (s) => PAD.l + s * plotW        // s in [0,1]
  const yOf = (p) => PAD.t + plotH - p * plotH // p in [0,1]

  // Convex curve (Secretary) — parameterized by threshold θ ∈ [0,1]
  // perf(θ) ≈ (1-θ)/e * ... simplified as p = θ*(1-θ)+θ/e
  // sens(θ) = p*(1-p)
  const convexPts = Array.from({ length: 60 }, (_, i) => {
    const theta = 0.05 + i * 0.015
    const p = Math.max(0.05, Math.min(0.38, 1 / Math.E - (theta - 1 / Math.E) ** 2 * 2.5))
    const s = p * (1 - p)
    return { s, p }
  })

  // Concave curve (good problems)
  const concavePts = Array.from({ length: 60 }, (_, i) => {
    const t = i / 59
    const p = 0.05 + t * 0.75  // performance from 0.05 to 0.80
    const s = 0.25 * t * (1 - 0.6 * t)  // concave sensitivity curve
    return { s: Math.min(0.25, s), p }
  })

  const toD = (pts) => pts
    .map((pt, i) => `${i === 0 ? 'M' : 'L'} ${xOf(pt.s / 0.26).toFixed(1)} ${yOf(pt.p / 0.85).toFixed(1)}`)
    .join(' ')

  const convexD = toD(convexPts)
  const concaveD = toD(concavePts)

  // 1/e point on convex curve
  const oneEpt = { s: (1 / Math.E) * (1 - 1 / Math.E), p: 1 / Math.E }
  const oneEX = xOf(oneEpt.s / 0.26)
  const oneEY = yOf(oneEpt.p / 0.85)

  // DRO optimal point on concave curve (interior)
  const droOpt = { s: 0.055, p: 0.48 }
  const droX = xOf(droOpt.s / 0.26)
  const droY = yOf(droOpt.p / 0.85)

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxHeight: 285 }}>
      {/* Axes */}
      <line x1={PAD.l} y1={PAD.t} x2={PAD.l} y2={H - PAD.b} stroke="#1E293B" strokeWidth="1.5"
        markerEnd="url(#arrowh)" />
      <line x1={PAD.l} y1={H - PAD.b} x2={W - PAD.r} y2={H - PAD.b} stroke="#1E293B" strokeWidth="1.5"
        markerEnd="url(#arrowh)" />
      <defs>
        <marker id="arrowh" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#1E293B" />
        </marker>
      </defs>

      {/* Axis labels */}
      <text x={PAD.l + plotW / 2} y={H - 8} textAnchor="middle" fontSize="11" fill="#64748B" fontFamily="Inter,sans-serif">Sensitivity S</text>
      <text x={14} y={PAD.t + plotH / 2} textAnchor="middle" fontSize="11" fill="#64748B" fontFamily="Inter,sans-serif" transform={`rotate(-90, 14, ${PAD.t + plotH / 2})`}>Performance E[r]</text>

      {/* Convex curve (red - Secretary) */}
      <path d={convexD} stroke="#C0392B" strokeWidth="2.5" fill="none" />
      <text x={xOf(0.12)} y={yOf(0.28)} fontSize="9.5" fill="#C0392B" fontFamily="Inter,sans-serif" fontWeight="700">Secretary Problems</text>
      <text x={xOf(0.12)} y={yOf(0.28) + 12} fontSize="8.5" fill="#C0392B" fontFamily="Inter,sans-serif">(convex frontier)</text>

      {/* 1/e point */}
      <circle cx={oneEX} cy={oneEY} r="5.5" fill="#C0392B" />
      <text x={oneEX + 7} y={oneEY - 4} fontSize="9" fill="#C0392B" fontFamily="Inter,sans-serif" fontWeight="700">1/e policy</text>
      <text x={oneEX + 7} y={oneEY + 8} fontSize="8" fill="#C0392B" fontFamily="Inter,sans-serif">(DRO-optimal &amp; max sensitive)</text>

      {/* DRO tangent on convex (stuck at corner) */}
      <line x1={xOf(0.5)} y1={PAD.t + 5} x2={oneEX} y2={oneEY}
        stroke="#C0392B" strokeWidth="1" strokeDasharray="4,3" opacity="0.6" />
      <text x={xOf(0.55)} y={PAD.t + 16} fontSize="8" fill="#C0392B" fontFamily="Inter,sans-serif" opacity="0.8">DRO tangent → corner</text>

      {/* Concave curve (green - good problems) */}
      <path d={concaveD} stroke="#059669" strokeWidth="2.5" fill="none" />
      <text x={xOf(0.02)} y={yOf(0.58)} fontSize="9.5" fill="#059669" fontFamily="Inter,sans-serif" fontWeight="700">Prophet / Inventory</text>
      <text x={xOf(0.02)} y={yOf(0.58) + 12} fontSize="8.5" fill="#059669" fontFamily="Inter,sans-serif">(concave frontier)</text>

      {/* DRO optimal on concave (interior point) */}
      <circle cx={droX} cy={droY} r="5" fill="#059669" />
      <text x={droX + 7} y={droY + 4} fontSize="9" fill="#059669" fontFamily="Inter,sans-serif" fontWeight="700">DRO optimal</text>
      <text x={droX + 7} y={droY + 16} fontSize="8" fill="#059669" fontFamily="Inter,sans-serif">(interior point)</text>
    </svg>
  )
}

// ── SVG: Candidate Flow (Slide 17) ───────────────────────────────────────────
export const CandidateFlow = () => {
  const W = 500, H = 182
  const F = 'Inter,sans-serif'
  const LM = 58

  // xs[0]=X₁, xs[1]=X₂, xs[2]=X₃, xs[3]=X₄, xs[4]=X_N
  // dots rendered between xs[3] and xs[4]
  const xs    = [LM+30, LM+108, LM+190, LM+268, LM+366]
  // = [88, 166, 248, 326, 424]
  const dotsX = (xs[3] + xs[4]) / 2  // = 375

  const yHead = 78
  const rHead = 12
  const yObs  = 150
  const rObs  = 15

  const gray   = '#9aa4b8'
  const orange = '#d97706'
  const green  = '#16a34a'
  const blue   = '#3b82f6'

  // Zone boundaries
  const exploreRight = (xs[1] + xs[2]) / 2  // between X₂ and X₃ ≈ 207
  const exploitRight = (xs[2] + xs[3]) / 2  // between X₃ and X₄ ≈ 287

  const Person = ({ x, explore, exploit }) => {
    const fill   = exploit ? '#86efac' : explore ? '#c4cfe0' : '#9aaabf'
    const stroke = exploit ? '#16a34a' : explore ? '#a0b0c8' : '#6a7a90'
    return (
      <g>
        <circle cx={x} cy={yHead - 5} r={rHead} fill={fill} stroke={stroke} strokeWidth={0.8} />
        <path d={`M ${x-16},${yHead+24} Q ${x-17},${yHead+3} ${x},${yHead-1} Q ${x+17},${yHead+3} ${x+16},${yHead+24} Z`}
          fill={fill} stroke={stroke} strokeWidth={0.8} />
      </g>
    )
  }

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxHeight: H }} aria-hidden="true">
      <defs>
        <marker id="cf-arr"  markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
          <path d="M0,0 L0,7 L7,3.5 Z" fill={blue} />
        </marker>
        <marker id="cf-garr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L0,6 L6,3 Z" fill={gray} />
        </marker>
      </defs>

      {/* ── Orange explore box (X₁, X₂) ─────────────────────────────── */}
      <rect x={LM} y={22} width={exploreRight - LM} height={H - 30} rx={6}
        fill="#fff8f0" stroke={orange} strokeWidth={1.5} strokeDasharray="5,3" />
      <text x={(LM + exploreRight) / 2} y={16} textAnchor="middle"
        fontSize="9" fill={orange} fontFamily={F} fontWeight="700" letterSpacing="0.08em">EXPLORE</text>

      {/* ── Green exploit box (X₃) ──────────────────────────────────── */}
      <rect x={exploreRight + 2} y={22} width={exploitRight - exploreRight - 4} height={H - 30} rx={6}
        fill="#f0fdf4" stroke={green} strokeWidth={1.5} strokeDasharray="5,3" />
      <text x={(exploreRight + exploitRight) / 2} y={16} textAnchor="middle"
        fontSize="9" fill={green} fontFamily={F} fontWeight="700" letterSpacing="0.08em">EXPLOIT (ACCEPT)</text>

      {/* ── Row labels ───────────────────────────────────────────────── */}
      <text x={LM-6} y={yHead+1}  textAnchor="end" fontSize="9.5" fill="#8090a8" fontFamily={F} fontWeight="600" fontStyle="italic">True</text>
      <text x={LM-6} y={yHead+13} textAnchor="end" fontSize="9.5" fill="#8090a8" fontFamily={F} fontWeight="600" fontStyle="italic">quality</text>
      <text x={LM-6} y={yHead+23} textAnchor="end" fontSize="8"   fill="#aab0c0" fontFamily={F}>(hidden)</text>
      <text x={LM-6} y={yObs+5}   textAnchor="end" fontSize="9.5" fill={orange}  fontFamily={F} fontWeight="600" fontStyle="italic">Obs.</text>

      {/* ── X_i labels ───────────────────────────────────────────────── */}
      {xs.map((x, i) => (
        <text key={i} x={x} y={38} textAnchor="middle" fontSize="12.5" fill="#8090a8" fontFamily={F} fontStyle="italic">
          X<tspan dy="3" fontSize="9">{i === 3 ? '4' : i === 4 ? 'N' : i + 1}</tspan>
        </text>
      ))}

      {/* ── Person icons ─────────────────────────────────────────────── */}
      {xs.map((x, i) => (
        <Person key={i} x={x} explore={i < 2} exploit={i === 2} />
      ))}

      {/* ── Gray arrows between persons (X₁→X₂, X₂→X₃, X₃→X₄) ───── */}
      {[0, 1, 2].map(i => (
        <line key={i}
          x1={xs[i] + rHead + 4} y1={yHead + 8} x2={xs[i+1] - rHead - 4} y2={yHead + 8}
          stroke={gray} strokeWidth={1.3} markerEnd="url(#cf-garr)" />
      ))}
      {/* X₄ → ··· → X_N */}
      <line x1={xs[3] + rHead + 4} y1={yHead + 8} x2={dotsX - 10} y2={yHead + 8}
        stroke={gray} strokeWidth={1.3} />
      <text x={dotsX} y={yHead + 13} textAnchor="middle" fontSize="14" fill={gray} fontFamily={F}>···</text>
      <line x1={dotsX + 10} y1={yHead + 8} x2={xs[4] - rHead - 4} y2={yHead + 8}
        stroke={gray} strokeWidth={1.3} markerEnd="url(#cf-garr)" />

      {/* ── Blue arrows (obs row: Y₁→Y₂, Y₂→Y₃, Y₃→Y₄) ────────────── */}
      {[0, 1, 2].map(i => (
        <line key={i}
          x1={xs[i] + rObs + 2} y1={yObs} x2={xs[i+1] - rObs - 2} y2={yObs}
          stroke={blue} strokeWidth={1.8} markerEnd="url(#cf-arr)" />
      ))}
      {/* Y₄ → ··· → Y_N */}
      <line x1={xs[3] + rObs + 2} y1={yObs} x2={dotsX - 10} y2={yObs}
        stroke={blue} strokeWidth={1.8} />
      <text x={dotsX} y={yObs + 5} textAnchor="middle" fontSize="14" fill={gray} fontFamily={F}>···</text>
      <line x1={dotsX + 10} y1={yObs} x2={xs[4] - rObs - 2} y2={yObs}
        stroke={blue} strokeWidth={1.8} markerEnd="url(#cf-arr)" />

      {/* ── Observation circles ───────────────────────────────────────── */}
      {xs.map((x, i) => {
        const isAccept = i === 2
        const later    = i > 2
        const bg  = isAccept ? '#dcfce7' : later ? '#f4f5f7' : '#fff7ed'
        const str = isAccept ? green      : later ? '#c8cdd8'  : orange
        const sub = i === 3 ? '4' : i === 4 ? 'N' : String(i + 1)
        return (
          <g key={i}>
            <circle cx={x} cy={yObs} r={rObs} fill={bg} stroke={str} strokeWidth={2} />
            {/* Y_i label inside circle */}
            <text x={x} y={yObs + 4} textAnchor="middle" fontSize="12" fill={str} fontFamily={F} fontStyle="italic" fontWeight="600">
              Y<tspan dy="3" fontSize="9">{sub}</tspan>
            </text>
          </g>
        )
      })}
    </svg>
  )
}
