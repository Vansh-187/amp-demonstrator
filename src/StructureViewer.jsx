import { useEffect, useState } from 'react'

export default function StructureViewer({ amp, onBack, onNext }) {
  const [status, setStatus] = useState('fetching')
  const [error, setError] = useState(null)

  useEffect(() => {
    let viewer = null

    async function loadStructure() {
      try {
        const response = await fetch(`/plots/${amp.seq}.pdb`)
        if (!response.ok) throw new Error('PDB file not found for this sequence')
        const pdbData = await response.text()
        setStatus('rendering')

        setTimeout(() => {
          const $3Dmol = window.$3Dmol
          const el = document.getElementById('mol-viewer')
          if (!$3Dmol || !el) return
          el.style.width = '100%'
          el.style.height = '460px'
          el.innerHTML = ''

          viewer = $3Dmol.createViewer(el, {
            backgroundColor: 'white',
            antialias: true,
          })

          viewer.addModel(pdbData, 'pdb')
          viewer.setStyle({}, {
            cartoon: {
              colorfunc: function(atom) {
                if (atom.ss === 'h') return '#FF0080'
                if (atom.ss === 's') return '#FFD700'
                return '#00BFFF'
              },
              thickness: 0.8,
              opacity: 1,
            }
          })
          viewer.zoomTo()
          viewer.render()
          viewer.spin('y', 0.8)
          setStatus('done')
        }, 500)

      } catch (err) {
        setError('Could not reach ESMFold. Try again in a moment.')
        setStatus('error')
      }
    }

    function initViewer() {
      if (!window.$3Dmol) {
        const script = document.createElement('script')
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/3Dmol/2.1.0/3Dmol-min.js'
        script.onload = loadStructure
        document.head.appendChild(script)
      } else {
        loadStructure()
      }
    }

    const timer = setTimeout(initViewer, 100)
    return () => {
      clearTimeout(timer)
      if (viewer) viewer.spin(false)
    }
  }, [amp.seq])

  return (
    <div style={{ minHeight: '100vh', background: '#f8f8f6', padding: '2.5rem 1.5rem' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>

        {/* Back button */}
        <button
          onClick={onBack}
          style={{
            fontSize: 13, padding: '6px 14px', marginBottom: 28,
            border: '1px solid #ddd', borderRadius: 8,
            background: '#fff', cursor: 'pointer', color: '#555'
          }}
        >
          ← Back to selection
        </button>

        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <div style={{
            display: 'inline-block', fontSize: 11, fontWeight: 600,
            letterSpacing: '0.08em', textTransform: 'uppercase',
            color: '#1D9E75', background: '#1D9E7518',
            border: '0.5px solid #1D9E7540',
            borderRadius: 20, padding: '4px 14px', marginBottom: 12
          }}>
            Module 2 — 3D Folded Structure
          </div>
          <h1 style={{ fontSize: 26, fontWeight: 500, color: '#1a1a1a', marginBottom: 6 }}>
            {amp.name}
          </h1>
          <p style={{ fontFamily: 'monospace', fontSize: 13, color: '#888', marginBottom: 6, wordBreak: 'break-all' }}>
            {amp.seq}
          </p>
          <p style={{ fontSize: 13, color: '#555', fontStyle: 'italic' }}>
            {amp.tagline}
          </p>
        </div>

        {/* Two column layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 300px',
          gap: 20,
          marginBottom: 20,
          alignItems: 'start',
        }}>

          {/* 3D viewer */}
          <div style={{
            background: '#fff',
            border: '1px solid #e8e8e4',
            borderRadius: 16,
            overflow: 'hidden',
          }}>
            {status !== 'done' && (
              <div style={{
                padding: '12px 20px', fontSize: 13,
                background: status === 'error' ? '#fff0f0' : '#f0faf5',
                borderBottom: '1px solid #eee',
                color: status === 'error' ? '#c0392b' : '#1D9E75',
                display: 'flex', alignItems: 'center', gap: 10
              }}>
                {status === 'error' ? (
                  <span>{error}</span>
                ) : (
                  <>
                    <span style={{
                      display: 'inline-block', width: 8, height: 8,
                      borderRadius: '50%', background: '#1D9E75',
                      animation: 'pulse 1s infinite'
                    }} />
                    {status === 'fetching'
                      ? 'Loading PDB structure…'
                      : 'Rendering 3D structure…'}
                  </>
                )}
              </div>
            )}

            <div
              id="mol-viewer"
              style={{
                position: 'relative',
                width: '100%',
                height: '460px',
                display: 'block',
                overflow: 'hidden',
              }}
            />
          </div>

          {/* Right panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

            <div style={{ background: '#fff', border: '1px solid #e8e8e4', borderRadius: 12, padding: '1rem 1.25rem' }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#888', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Color key
              </div>
              {[
                ['α-helix', '#FF0080', 'Coiled ribbon regions'],
                ['β-sheet', '#FFD700', 'Flat arrow strands'],
                ['Loop / coil', '#00BFFF', 'Flexible connectors'],
              ].map(([label, color, desc]) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <div style={{ width: 14, height: 14, borderRadius: 3, background: color, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500, color: '#1a1a1a' }}>{label}</div>
                    <div style={{ fontSize: 11, color: '#888' }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: '#fff', border: '1px solid #e8e8e4', borderRadius: 12, padding: '1rem 1.25rem' }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#888', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Interaction profile
              </div>
              {[
                ['Total interactions', amp.stats.total, '#555'],
                ['H-bonds', amp.stats.hbonds, '#185FA5'],
                ['Hydrophobic', amp.stats.hydro, '#BA7517'],
                ['Aromatic', amp.stats.aromatic, '#7F77DD'],
              ].map(([label, value, color]) => (
                <div key={label} style={{ marginBottom: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 12, color: '#555' }}>{label}</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color }}>{value}</span>
                  </div>
                  <div style={{ height: 4, background: '#f0f0ee', borderRadius: 2 }}>
                    <div style={{
                      height: 4, borderRadius: 2, background: color,
                      width: `${Math.round((value / 90) * 100)}%`,
                    }} />
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: '#fff', border: '1px solid #e8e8e4', borderRadius: 12, padding: '1rem 1.25rem' }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#888', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Controls
              </div>
              {[
                ['Drag', 'Rotate structure'],
                ['Scroll', 'Zoom in / out'],
                ['Right-drag', 'Pan view'],
              ].map(([key, action]) => (
                <div key={key} style={{ display: 'flex', gap: 8, marginBottom: 6, alignItems: 'center' }}>
                  <span style={{ fontSize: 11, fontWeight: 600, background: '#f0f0ee', padding: '2px 8px', borderRadius: 4, color: '#555' }}>
                    {key}
                  </span>
                  <span style={{ fontSize: 12, color: '#888' }}>{action}</span>
                </div>
              ))}
            </div>

          </div>
        </div>

        <p style={{ fontSize: 12, color: '#aaa', textAlign: 'center', marginBottom: 20 }}>
          Structure predicted by ESMFold (Meta AI) · Colors show secondary structure assignment
        </p>

        {/* Next button */}
        <div style={{ textAlign: 'right' }}>
          <button
            onClick={onNext}
            style={{
              padding: '11px 28px', fontSize: 14, fontWeight: 500,
              background: '#1D9E75', color: '#fff',
              border: 'none', borderRadius: 8, cursor: 'pointer'
            }}
          >
            Next: structural analysis →
          </button>
        </div>

      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  )
}