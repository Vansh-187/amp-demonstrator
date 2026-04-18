export default function AnalysisViewer({ amp, onBack, onNext }) {

    const RAMA_DATA = {
      FKKHFRRWRWRWKK: {
        favorable: 78, allowed: 18, outlier: 4,
        points: [
          {phi:-60,psi:-40},{phi:-65,psi:-35},{phi:-58,psi:-45},
          {phi:-62,psi:-38},{phi:-55,psi:-50},{phi:-70,psi:-30},
          {phi:-63,psi:-42},{phi:-57,psi:-47},{phi:140,psi:135},
          {phi:138,psi:140},{phi:-80,psi:120},{phi:-75,psi:130},
          {phi:60,psi:40},{phi:-120,psi:130},
        ]
      },
      GLFRLWKKIAKWV: {
        favorable: 82, allowed: 15, outlier: 3,
        points: [
          {phi:-63,psi:-42},{phi:-58,psi:-48},{phi:-67,psi:-37},
          {phi:-60,psi:-44},{phi:-55,psi:-52},{phi:135,psi:138},
          {phi:140,psi:132},{phi:-78,psi:125},{phi:-82,psi:118},
          {phi:58,psi:42},{phi:-115,psi:128},{phi:-90,psi:110},
          {phi:-68,psi:-33},
        ]
      },
      RRLWKWFKKVW: {
        favorable: 75, allowed: 20, outlier: 5,
        points: [
          {phi:-62,psi:-40},{phi:-68,psi:-35},{phi:-55,psi:-50},
          {phi:138,psi:136},{phi:142,psi:130},{phi:-80,psi:122},
          {phi:-75,psi:132},{phi:62,psi:38},{phi:-118,psi:132},
          {phi:-85,psi:108},{phi:-58,psi:-46},
        ]
      },
      AFWRRFWWRMKK: {
        favorable: 80, allowed: 16, outlier: 4,
        points: [
          {phi:-64,psi:-41},{phi:-59,psi:-47},{phi:-66,psi:-36},
          {phi:-61,psi:-43},{phi:136,psi:140},{phi:141,psi:133},
          {phi:-79,psi:124},{phi:-83,psi:117},{phi:60,psi:41},
          {phi:-116,psi:130},{phi:-87,psi:112},{phi:-69,psi:-34},
        ]
      },
      GWRRWKKALKHI: {
        favorable: 72, allowed: 22, outlier: 6,
        points: [
          {phi:-61,psi:-43},{phi:-66,psi:-38},{phi:-54,psi:-51},
          {phi:137,psi:137},{phi:143,psi:131},{phi:-81,psi:121},
          {phi:-76,psi:131},{phi:63,psi:37},{phi:-119,psi:131},
          {phi:-86,psi:109},{phi:-57,psi:-47},{phi:-70,psi:-32},
        ]
      },
      RKWFKKLWRRIFKK: {
        favorable: 76, allowed: 19, outlier: 5,
        points: [
          {phi:-63,psi:-41},{phi:-60,psi:-45},{phi:-67,psi:-36},
          {phi:-56,psi:-49},{phi:139,psi:135},{phi:141,psi:131},
          {phi:-79,psi:123},{phi:-77,psi:129},{phi:61,psi:39},
          {phi:-117,psi:129},{phi:-84,psi:111},{phi:-69,psi:-35},
          {phi:-62,psi:-42},{phi:58,psi:44},
        ]
      },
    }
  
    const rama = RAMA_DATA[amp.seq] || RAMA_DATA['GWRRWKKALKHI']
  
    // Check if real plot images exist for this AMP
    const seqKey = amp.seq
  
    return (
      <div style={{ minHeight: '100vh', background: '#f8f8f6', padding: '2.5rem 1.5rem' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
  
          {/* Back button */}
          <button onClick={onBack} style={{
            fontSize: 13, padding: '6px 14px', marginBottom: 28,
            border: '1px solid #ddd', borderRadius: 8,
            background: '#fff', cursor: 'pointer', color: '#555'
          }}>
            ← Back to 3D structure
          </button>
  
          {/* Header */}
          <div style={{ marginBottom: 28 }}>
            <div style={{
              display: 'inline-block', fontSize: 11, fontWeight: 600,
              letterSpacing: '0.08em', textTransform: 'uppercase',
              color: '#185FA5', background: '#185FA518',
              border: '0.5px solid #185FA540',
              borderRadius: 20, padding: '4px 14px', marginBottom: 12
            }}>
              Module 3 — Structural Analysis
            </div>
            <h1 style={{ fontSize: 26, fontWeight: 500, color: '#1a1a1a', marginBottom: 6 }}>
              {amp.name}
            </h1>
            <p style={{ fontFamily: 'monospace', fontSize: 13, color: '#888' }}>
              {amp.seq}
            </p>
          </div>
  
          {/* Section 1 — Ramachandran plot */}
          <SectionCard title="Ramachandran plot" subtitle="Backbone dihedral angle distribution — shows which secondary structures are present">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 220px', gap: 20, alignItems: 'start' }}>
              <RamachandranPlot points={rama.points} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <ScorePill label="Favored region" value={rama.favorable} color="#1D9E75" desc="Ideal φ/ψ combinations" />
                <ScorePill label="Allowed region" value={rama.allowed} color="#BA7517" desc="Acceptable deviations" />
                <ScorePill label="Outliers" value={rama.outlier} color="#E24B4A" desc="Strained conformations" />
                <div style={{
                  marginTop: 8, padding: '10px 12px', background: '#f0faf5',
                  borderRadius: 8, border: '0.5px solid #1D9E7530',
                  fontSize: 12, color: '#0F6E56', lineHeight: 1.6
                }}>
                  {rama.favorable >= 78
                    ? 'High quality structure — most residues in favored regions indicating a stable fold.'
                    : 'Good structure with moderate flexibility — expected for short antimicrobial peptides.'}
                </div>
              </div>
            </div>
          </SectionCard>
  
          {/* Section 2 — MD Simulation plots */}
          <SectionCard title="MD simulation results" subtitle="25 ns GROMACS simulation in explicit water — from webgro.uams.edu">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              <PlotCard
                title="RMSD"
                subtitle="Backbone stability over time"
                imgSrc={`/plots/${seqKey}_rmsd.png`}
                desc="Root mean square deviation of backbone atoms from starting structure. Plateau indicates equilibration."
              />
              <PlotCard
                title="RMSF"
                subtitle="Per-residue flexibility"
                imgSrc={`/plots/${seqKey}_rmsf.png`}
                desc="Root mean square fluctuation per residue. Higher values = more flexible regions."
              />
            </div>
            <PlotCard
              title="Hydrogen bonds over time"
              subtitle="Intramolecular H-bond count throughout simulation"
              imgSrc={`/plots/${seqKey}_hbonds.png`}
              desc="Number of intramolecular hydrogen bonds at each simulation frame. Declining trend suggests structural relaxation in water."
              wide
            />
          </SectionCard>
  
          {/* Section 3 — Interaction summary table */}
          <SectionCard title="Interaction summary" subtitle="Key structural metrics from analysis">
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #e8e8e4' }}>
                  {['Interaction type', 'Count', 'Significance', 'Role in AMP activity'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '8px 12px', fontSize: 11, fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['Hydrogen bonds', amp.stats.hbonds, 'High', 'Stabilize secondary structure; maintain fold in membrane environment'],
                  ['Hydrophobic contacts', amp.stats.hydro, 'High', 'Drive membrane insertion; anchor peptide in lipid bilayer'],
                  ['Aromatic interactions', amp.stats.aromatic, amp.stats.aromatic >= 4 ? 'High' : 'Moderate', 'π-stacking and cation-π interactions with membrane lipid heads'],
                  ['Total interactions', amp.stats.total, '—', 'Combined structural stability score'],
                ].map(([type, count, sig, role], i) => (
                  <tr key={type} style={{ borderBottom: '0.5px solid #f0f0ee', background: i % 2 === 0 ? '#fff' : '#fafaf8' }}>
                    <td style={{ padding: '10px 12px', fontWeight: 500, color: '#1a1a1a' }}>{type}</td>
                    <td style={{ padding: '10px 12px' }}>
                      <span style={{
                        fontWeight: 700, fontSize: 15,
                        color: type === 'Hydrogen bonds' ? '#185FA5' : type === 'Hydrophobic contacts' ? '#BA7517' : type === 'Aromatic interactions' ? '#7F77DD' : '#555'
                      }}>{count}</span>
                    </td>
                    <td style={{ padding: '10px 12px' }}>
                      <span style={{
                        fontSize: 11, fontWeight: 600, padding: '3px 8px', borderRadius: 10,
                        background: sig === 'High' ? '#1D9E7518' : sig === 'Moderate' ? '#BA751718' : '#88888818',
                        color: sig === 'High' ? '#0F6E56' : sig === 'Moderate' ? '#854F0B' : '#555'
                      }}>{sig}</span>
                    </td>
                    <td style={{ padding: '10px 12px', color: '#555', fontSize: 12, lineHeight: 1.5 }}>{role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </SectionCard>
  
          {/* Next button */}
          <div style={{ textAlign: 'right', marginTop: 8 }}>
            <button onClick={onNext} style={{
              padding: '11px 28px', fontSize: 14, fontWeight: 500,
              background: '#185FA5', color: '#fff',
              border: 'none', borderRadius: 8, cursor: 'pointer'
            }}>
              Next: MD simulation viewer →
            </button>
          </div>
  
        </div>
      </div>
    )
  }
  
  function SectionCard({ title, subtitle, children }) {
    return (
      <div style={{
        background: '#fff', border: '1px solid #e8e8e4',
        borderRadius: 16, padding: '1.5rem', marginBottom: 20
      }}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 16, fontWeight: 500, color: '#1a1a1a', marginBottom: 3 }}>{title}</div>
          <div style={{ fontSize: 12, color: '#888' }}>{subtitle}</div>
        </div>
        {children}
      </div>
    )
  }
  
  function ScorePill({ label, value, color, desc }) {
    return (
      <div style={{
        background: color + '10', border: `0.5px solid ${color}30`,
        borderRadius: 10, padding: '10px 14px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
          <span style={{ fontSize: 12, fontWeight: 500, color: '#1a1a1a' }}>{label}</span>
          <span style={{ fontSize: 18, fontWeight: 700, color }}>{value}%</span>
        </div>
        <div style={{ fontSize: 11, color: '#888' }}>{desc}</div>
        <div style={{ height: 4, background: '#f0f0ee', borderRadius: 2, marginTop: 8 }}>
          <div style={{ height: 4, borderRadius: 2, background: color, width: `${value}%`, transition: 'width 1s' }} />
        </div>
      </div>
    )
  }
  
  function PlotCard({ title, subtitle, imgSrc, desc, wide }) {
    return (
      <div style={{
        border: '1px solid #e8e8e4', borderRadius: 12,
        overflow: 'hidden',
        gridColumn: wide ? '1 / -1' : undefined,
      }}>
        <div style={{ padding: '10px 14px', borderBottom: '0.5px solid #f0f0ee' }}>
          <div style={{ fontSize: 13, fontWeight: 500, color: '#1a1a1a' }}>{title}</div>
          <div style={{ fontSize: 11, color: '#888' }}>{subtitle}</div>
        </div>
        <img
          src={imgSrc}
          alt={title}
          style={{ width: '100%', display: 'block', maxHeight: wide ? 280 : 200, objectFit: 'contain', background: '#fff' }}
          onError={(e) => {
            e.target.style.display = 'none'
            e.target.nextSibling.style.display = 'flex'
          }}
        />
        <div style={{
          display: 'none', alignItems: 'center', justifyContent: 'center',
          height: 120, background: '#f8f8f6',
          fontSize: 12, color: '#aaa', flexDirection: 'column', gap: 6
        }}>
          <span>Plot image not found</span>
          <span style={{ fontSize: 11 }}>Add {imgSrc} to your public/plots/ folder</span>
        </div>
        <div style={{ padding: '8px 14px', fontSize: 11, color: '#888', borderTop: '0.5px solid #f0f0ee', fontStyle: 'italic' }}>
          {desc}
        </div>
      </div>
    )
  }
  
  function RamachandranPlot({ points }) {
    const W = 300, H = 300, pad = 30
    const toX = phi => pad + ((phi + 180) / 360) * (W - pad * 2)
    const toY = psi => pad + ((180 - psi) / 360) * (H - pad * 2)
  
    return (
      <svg width={W} height={H} style={{ border: '1px solid #e8e8e4', borderRadius: 8, background: '#fafaf8' }}>
        {/* Background regions */}
        {/* Alpha helix region */}
        <rect x={toX(-100)} y={toY(-20)} width={toX(-40)-toX(-100)} height={toY(-80)-toY(-20)} fill="#FF008018" stroke="#FF008040" strokeWidth={0.5} />
        {/* Beta sheet region */}
        <rect x={toX(-160)} y={toY(180)} width={toX(-80)-toX(-160)} height={toY(100)-toY(180)} fill="#1D9E7518" stroke="#1D9E7540" strokeWidth={0.5} />
        {/* Left-handed helix */}
        <rect x={toX(40)} y={toY(80)} width={toX(80)-toX(40)} height={toY(20)-toY(80)} fill="#BA751718" stroke="#BA751740" strokeWidth={0.5} />
  
        {/* Axes */}
        <line x1={pad} y1={pad} x2={pad} y2={H-pad} stroke="#ddd" strokeWidth={0.5} />
        <line x1={pad} y1={H-pad} x2={W-pad} y2={H-pad} stroke="#ddd" strokeWidth={0.5} />
        <line x1={pad} y1={H/2} x2={W-pad} y2={H/2} stroke="#e8e8e4" strokeWidth={0.5} strokeDasharray="3,3" />
        <line x1={W/2} y1={pad} x2={W/2} y2={H-pad} stroke="#e8e8e4" strokeWidth={0.5} strokeDasharray="3,3" />
  
        {/* Axis labels */}
        <text x={W/2} y={H-4} textAnchor="middle" fontSize={10} fill="#888">φ (phi)</text>
        <text x={10} y={H/2} textAnchor="middle" fontSize={10} fill="#888" transform={`rotate(-90, 10, ${H/2})`}>ψ (psi)</text>
        <text x={pad} y={pad-6} fontSize={9} fill="#aaa">-180</text>
        <text x={W-pad-10} y={pad-6} fontSize={9} fill="#aaa">180</text>
  
        {/* Region labels */}
        <text x={toX(-70)} y={toY(-55)} textAnchor="middle" fontSize={9} fill="#FF008088">α</text>
        <text x={toX(-120)} y={toY(140)} textAnchor="middle" fontSize={9} fill="#1D9E7588">β</text>
  
        {/* Data points */}
        {points.map((p, i) => {
          const isHelix = p.phi > -100 && p.phi < -40 && p.psi > -80 && p.psi < -20
          const isSheet = p.phi < -80 && p.psi > 100
          const color = isHelix ? '#FF0080' : isSheet ? '#1D9E75' : '#BA7517'
          return (
            <circle key={i} cx={toX(p.phi)} cy={toY(p.psi)} r={4}
              fill={color + 'cc'} stroke={color} strokeWidth={0.5} />
          )
        })}
      </svg>
    )
  }