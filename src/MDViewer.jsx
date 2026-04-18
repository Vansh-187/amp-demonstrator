const MD_DATA = {
    FKKHFRRWRWRWKK: {
      rmsdFinal: 0.31, rmsdPlateau: '~15 ns',
      rmsf: [0.18,0.14,0.12,0.15,0.13,0.11,0.16,0.14,0.19,0.22,0.17,0.13,0.20,0.16],
      hbondAvg: 7, hbondStart: 8, stability: 'High',
      conclusion: 'Peptide reaches stable conformation by 15 ns. Low RMSF across central residues confirms a rigid hydrophobic core — ideal for membrane insertion.'
    },
    GLFRLWKKIAKWV: {
      rmsdFinal: 0.22, rmsdPlateau: '~10 ns',
      rmsf: [0.30,0.28,0.24,0.23,0.22,0.22,0.24,0.26,0.32,0.33,0.28,0.25,0.44],
      hbondAvg: 6, hbondStart: 7, stability: 'High',
      conclusion: 'Very stable backbone with fast equilibration at 10 ns. Terminal residues show higher flexibility which may aid initial membrane contact.'
    },
    RRLWKWFKKVW: {
      rmsdFinal: 0.28, rmsdPlateau: '~12 ns',
      rmsf: [0.22,0.19,0.16,0.14,0.15,0.18,0.20,0.17,0.19,0.23,0.21],
      hbondAvg: 5, hbondStart: 7, stability: 'Moderate',
      conclusion: 'Moderate stability with declining H-bonds suggesting structural adaptation in water. Hydrophobic core remains intact throughout simulation.'
    },
    AFWRRFWWRMKK: {
      rmsdFinal: 0.25, rmsdPlateau: '~13 ns',
      rmsf: [0.20,0.17,0.15,0.13,0.14,0.16,0.18,0.15,0.17,0.21,0.19,0.14],
      hbondAvg: 5, hbondStart: 6, stability: 'Moderate',
      conclusion: 'Dense aromatic core provides structural rigidity. Slight RMSD increase after 10 ns reflects aromatic ring reorientation rather than global unfolding.'
    },
    GWRRWKKALKHI: {
      rmsdFinal: 0.33, rmsdPlateau: '~18 ns',
      rmsf: [0.30,0.28,0.24,0.22,0.23,0.25,0.27,0.29,0.32,0.35,0.40,0.44],
      hbondAvg: 4, hbondStart: 8, stability: 'Moderate',
      conclusion: 'Purely charge-driven peptide shows expected H-bond loss in water as electrostatic interactions compete with solvent. C-terminal shows high flexibility.'
    },
    RKWFKKLWRRIFKK: {
      rmsdFinal: 0.29, rmsdPlateau: '~14 ns',
      rmsf: [0.19,0.16,0.14,0.13,0.15,0.17,0.19,0.16,0.18,0.22,0.20,0.15,0.21,0.17],
      hbondAvg: 6, hbondStart: 7, stability: 'High',
      conclusion: 'In-silico designed peptide shows promising stability profile. Equilibration by 14 ns with stable H-bond count suggests the designed sequence folds as intended.'
    },
  }
  
  export default function MDViewer({ amp, onBack }) {
    const data = MD_DATA[amp.seq] || MD_DATA['GWRRWKKALKHI']
    const stabilityColor = data.stability === 'High' ? '#1D9E75' : '#BA7517'
  
    return (
      <div style={{ minHeight: '100vh', background: '#f8f8f6', padding: '2.5rem 1.5rem' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
  
          {/* Back button */}
          <button onClick={onBack} style={{
            fontSize: 13, padding: '6px 14px', marginBottom: 28,
            border: '1px solid #ddd', borderRadius: 8,
            background: '#fff', cursor: 'pointer', color: '#555'
          }}>
            ← Back to analysis
          </button>
  
          {/* Header */}
          <div style={{ marginBottom: 28 }}>
            <div style={{
              display: 'inline-block', fontSize: 11, fontWeight: 600,
              letterSpacing: '0.08em', textTransform: 'uppercase',
              color: '#7F77DD', background: '#7F77DD18',
              border: '0.5px solid #7F77DD40',
              borderRadius: 20, padding: '4px 14px', marginBottom: 12
            }}>
              Module 4 — MD Simulation in Water
            </div>
            <h1 style={{ fontSize: 26, fontWeight: 500, color: '#1a1a1a', marginBottom: 6 }}>
              {amp.name}
            </h1>
            <p style={{ fontFamily: 'monospace', fontSize: 13, color: '#888' }}>
              {amp.seq}
            </p>
          </div>
  
          {/* Main layout */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 20, marginBottom: 20, alignItems: 'start' }}>
  
            {/* Video box */}
            <div style={{ background: '#fff', border: '1px solid #e8e8e4', borderRadius: 16, overflow: 'hidden' }}>
              <div style={{ padding: '12px 16px', borderBottom: '0.5px solid #f0f0ee' }}>
                <span style={{ fontSize: 13, fontWeight: 500, color: '#1a1a1a' }}>AMP in explicit water</span>
                <span style={{ fontSize: 11, color: '#888', marginLeft: 8 }}>25 ns GROMACS trajectory</span>
              </div>
  
              <video
                autoPlay
                loop
                muted
                controls
                style={{ width: '100%', display: 'block', background: '#000' }}
              >
                <source src={`/plots/${amp.seq}_simulation.mp4`} type="video/mp4" />
              </video>
            </div>
  
            {/* Right stats panel */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
  
              {/* Stability badge */}
              <div style={{
                background: '#fff', border: `1px solid ${stabilityColor}40`,
                borderRadius: 12, padding: '1rem 1.25rem',
                boxShadow: `0 0 0 3px ${stabilityColor}10`
              }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
                  Overall stability
                </div>
                <div style={{ fontSize: 22, fontWeight: 700, color: stabilityColor, marginBottom: 4 }}>
                  {data.stability}
                </div>
                <div style={{ fontSize: 12, color: '#888' }}>
                  Plateau reached at {data.rmsdPlateau}
                </div>
              </div>
  
              {/* Key metrics */}
              <div style={{ background: '#fff', border: '1px solid #e8e8e4', borderRadius: 12, padding: '1rem 1.25rem' }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>
                  Key metrics
                </div>
                {[
                  ['Final RMSD', `${data.rmsdFinal} nm`, '#185FA5'],
                  ['Avg H-bonds', `${data.hbondAvg} / frame`, '#1D9E75'],
                  ['Initial H-bonds', `${data.hbondStart} / frame`, '#BA7517'],
                  ['H-bond change', `${data.hbondStart > data.hbondAvg ? '↓' : '→'} ${Math.abs(data.hbondStart - data.hbondAvg)} lost to solvent`, '#E24B4A'],
                ].map(([label, value, color]) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, paddingBottom: 10, borderBottom: '0.5px solid #f5f5f3' }}>
                    <span style={{ fontSize: 12, color: '#555' }}>{label}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color }}>{value}</span>
                  </div>
                ))}
              </div>
  
              {/* Legend */}
              <div style={{ background: '#fff', border: '1px solid #e8e8e4', borderRadius: 12, padding: '1rem 1.25rem' }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>
                  Color scheme
                </div>
                {[
                  ['#FF0080', 'α-helix regions'],
                  ['#FFD700', 'β-sheet regions'],
                  ['#00BFFF', 'Loop / coil regions'],
                ].map(([color, label]) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 7 }}>
                    <div style={{ width: 12, height: 12, borderRadius: '50%', background: color, flexShrink: 0 }} />
                    <span style={{ fontSize: 12, color: '#555' }}>{label}</span>
                  </div>
                ))}
              </div>
  
            </div>
          </div>
  
          {/* RMSF bar chart */}
          <div style={{ background: '#fff', border: '1px solid #e8e8e4', borderRadius: 16, padding: '1.5rem', marginBottom: 20 }}>
            <div style={{ fontSize: 16, fontWeight: 500, color: '#1a1a1a', marginBottom: 4 }}>Per-residue flexibility (RMSF)</div>
            <div style={{ fontSize: 12, color: '#888', marginBottom: 16 }}>Higher bars = more flexible residues during simulation</div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 120 }}>
              {data.rmsf.map((val, i) => {
                const aa = amp.seq[i] || '?'
                const maxVal = Math.max(...data.rmsf)
                const h = Math.round((val / maxVal) * 90)
                const isHigh = val > 0.3
                return (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                    <div style={{ fontSize: 9, color: '#aaa' }}>{val.toFixed(2)}</div>
                    <div style={{
                      width: '100%', height: h,
                      background: isHigh ? '#E24B4A' : '#7F77DD',
                      borderRadius: '3px 3px 0 0',
                      opacity: 0.8,
                    }} />
                    <div style={{ fontSize: 9, fontFamily: 'monospace', color: '#888' }}>{aa}</div>
                  </div>
                )
              })}
            </div>
            <div style={{ display: 'flex', gap: 16, marginTop: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 10, height: 10, background: '#7F77DD', borderRadius: 2 }} />
                <span style={{ fontSize: 11, color: '#888' }}>Normal flexibility</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 10, height: 10, background: '#E24B4A', borderRadius: 2 }} />
                <span style={{ fontSize: 11, color: '#888' }}>High flexibility (&gt;0.30 nm)</span>
              </div>
            </div>
          </div>
  
          {/* Conclusion */}
          <div style={{
            background: '#fff', border: '1px solid #7F77DD40',
            borderRadius: 16, padding: '1.5rem',
            boxShadow: '0 0 0 3px #7F77DD10'
          }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#7F77DD', marginBottom: 8 }}>
              Simulation conclusion
            </div>
            <p style={{ fontSize: 14, color: '#444', lineHeight: 1.7, margin: 0 }}>
              {data.conclusion}
            </p>
          </div>
  
        </div>
      </div>
    )
  }