import { useState, useEffect, useCallback, useRef } from 'react'
import { SLIDES } from './slides.jsx'

export default function App() {
  const [idx, setIdx] = useState(0)
  const [frag, setFrag] = useState(0)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const scalerRef = useRef(null)
  const activeItemRef = useRef(null)

  const totalSlides = SLIDES.length
  const safeIdx = Math.min(Math.max(idx, 0), totalSlides - 1)
  const CurrentSlide = SLIDES[safeIdx]
  const totalFrags = CurrentSlide?.frags ?? 0

  // Responsive scaling
  const updateScale = useCallback(() => {
    const el = scalerRef.current
    if (!el) return
    const scaleX = window.innerWidth / 1100
    const scaleY = window.innerHeight / 700
    const scale = Math.min(scaleX, scaleY)
    el.style.transform = `scale(${scale})`
    el.style.left = `${(window.innerWidth - 1100 * scale) / 2}px`
    el.style.top = `${(window.innerHeight - 700 * scale) / 2}px`
  }, [])

  useEffect(() => {
    updateScale()
    window.addEventListener('resize', updateScale)
    return () => window.removeEventListener('resize', updateScale)
  }, [updateScale])

  const goNext = useCallback(() => {
    if (frag < totalFrags) {
      setFrag(f => f + 1)
    } else if (idx < totalSlides - 1) {
      setIdx(i => i + 1)
      setFrag(0)
    }
  }, [frag, totalFrags, idx, totalSlides])

  const goPrev = useCallback(() => {
    if (frag > 0) {
      setFrag(f => f - 1)
    } else if (idx > 0) {
      const prev = SLIDES[idx - 1]
      setIdx(i => i - 1)
      setFrag(prev.frags ?? 0)
    }
  }, [frag, idx])

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'g' || e.key === 'G') {
        setSidebarOpen(s => !s)
      } else if (['ArrowRight', 'ArrowDown', ' ', 'PageDown', 'Enter'].includes(e.key)) {
        e.preventDefault(); goNext()
      } else if (['ArrowLeft', 'ArrowUp', 'PageUp', 'Backspace'].includes(e.key)) {
        e.preventDefault(); goPrev()
      } else if (e.key === 'Escape') {
        setSidebarOpen(false)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [goNext, goPrev])

  // Scroll active item into view when sidebar opens or slide changes
  useEffect(() => {
    if (sidebarOpen && activeItemRef.current) {
      activeItemRef.current.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
    }
  }, [sidebarOpen, safeIdx])

  const jumpTo = (i) => {
    setIdx(i)
    setFrag(0)
  }

  return (
    <div className="pres-shell" onClick={sidebarOpen ? () => setSidebarOpen(false) : goNext}>
      <div
        ref={scalerRef}
        className="slide-scaler"
        style={{ position: 'absolute' }}
      >
        <CurrentSlide frag={frag} />

        {/* Slide counter — inside the 1100×700 canvas, scales with the slide */}
        <div style={{
          position: 'absolute', bottom: 5, right: 4,
          pointerEvents: 'none', zIndex: 50,
        }}>
          <div style={{
            background: 'rgba(30,58,95,0.7)',
            backdropFilter: 'blur(6px)',
            borderRadius: 5,
            padding: '2px 6px',
            fontSize: 10,
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
            color: 'rgba(255,255,255,0.85)',
            letterSpacing: '0.04em',
            border: '1px solid rgba(255,255,255,0.1)',
          }}>
            {String(safeIdx + 1).padStart(2, '0')}
            <span style={{ color: 'rgba(255,255,255,0.35)', fontWeight: 400, margin: '0 2px' }}>/</span>
            {totalSlides}
          </div>
        </div>
      </div>

      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${((idx) / (totalSlides - 1)) * 100}%` }} />
      </div>

      {/* Toggle button — bottom-right corner */}
      <button
        onClick={e => { e.stopPropagation(); setSidebarOpen(s => !s) }}
        title="Toggle slide navigator (G)"
        style={{
          position: 'fixed', top: 14, right: 14, zIndex: 200,
          background: sidebarOpen ? 'rgba(224,90,78,0.9)' : 'rgba(30,58,95,0.75)',
          border: 'none', borderRadius: 6, color: 'white',
          padding: '5px 10px', fontSize: 12, fontWeight: 700,
          cursor: 'pointer', letterSpacing: '0.04em',
          backdropFilter: 'blur(6px)',
          transition: 'background 0.15s',
        }}
      >
        {sidebarOpen ? '✕ close' : '⊞ slides'}
      </button>

      {/* Slide navigator sidebar */}
      {sidebarOpen && (
        <div
          onClick={e => e.stopPropagation()}
          style={{
            position: 'fixed', right: 0, top: 0, bottom: 0,
            width: 210,
            background: 'rgba(12, 22, 44, 0.96)',
            backdropFilter: 'blur(12px)',
            overflowY: 'auto',
            zIndex: 100,
            borderLeft: '1px solid rgba(255,255,255,0.08)',
            display: 'flex', flexDirection: 'column',
          }}
        >
          {/* Header */}
          <div style={{
            padding: '12px 14px 10px',
            fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.35)',
            textTransform: 'uppercase', letterSpacing: '0.1em',
            borderBottom: '1px solid rgba(255,255,255,0.07)',
            flexShrink: 0,
          }}>
            Navigator &nbsp;·&nbsp; G to toggle
          </div>

          {/* Slide list */}
          <div style={{ overflowY: 'auto', flex: 1, padding: '6px 0' }}>
            {SLIDES.map((Slide, i) => {
              const isActive = i === safeIdx
              const label = Slide.label || `Slide ${i + 1}`
              const isDivider = label.startsWith('◆')
              return (
                <div
                  key={i}
                  ref={isActive ? activeItemRef : null}
                  onClick={() => jumpTo(i)}
                  style={{
                    padding: isDivider ? '10px 14px 6px' : '5px 14px 5px 0',
                    display: 'flex', alignItems: 'center', gap: 8,
                    cursor: 'pointer',
                    background: isActive ? 'rgba(224,90,78,0.15)' : 'transparent',
                    borderLeft: isActive ? '3px solid #e05a4e' : '3px solid transparent',
                    transition: 'background 0.1s',
                    marginTop: isDivider ? 4 : 0,
                  }}
                  onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
                  onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent' }}
                >
                  {/* Slide number */}
                  <span style={{
                    fontSize: 10, color: isActive ? '#e05a4e' : 'rgba(255,255,255,0.25)',
                    width: 22, textAlign: 'right', flexShrink: 0, paddingLeft: 6,
                    fontWeight: isActive ? 700 : 400,
                  }}>
                    {i + 1}
                  </span>
                  {/* Label */}
                  <span style={{
                    fontSize: isDivider ? 9.5 : 11,
                    color: isDivider
                      ? 'rgba(180,200,255,0.55)'
                      : isActive ? 'white' : 'rgba(255,255,255,0.55)',
                    fontWeight: isDivider ? 700 : isActive ? 600 : 400,
                    letterSpacing: isDivider ? '0.06em' : 0,
                    textTransform: isDivider ? 'uppercase' : 'none',
                    lineHeight: 1.3,
                  }}>
                    {isDivider ? label.replace('◆ ', '') : label}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
