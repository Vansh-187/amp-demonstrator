import { useState } from 'react'

const AMPS = [
  {
    id: 'AMP-01',
    seq: 'FKKHFRRWRWRWKK',
    name: 'The Heavy Hitter',
    tagline: 'Most stable. Most tested. Most trusted.',
    hint: 'This peptide has survived every structural stress test we threw at it. Richest in aromatic residues — the kind of molecule that locks into a membrane and does not let go.',
    badge: '1st — Most stable',
    badgeColor: '#1D9E75',
    stats: { total: 83, hbonds: 14, hydro: 21, aromatic: 6 },
  },
  {
    id: 'AMP-02',
    seq: 'GLFRLWKKIAKWV',
    name: 'The Balanced Blade',
    tagline: 'More hydrogen bonds than any other candidate.',
    hint: 'Forms the most hydrogen bonds in our entire library — meaning it grips bacterial surfaces with precision rather than brute force. A well-rounded profile built for reliable activity.',
    badge: '2nd — Most H-bonds',
    badgeColor: '#185FA5',
    stats: { total: 72, hbonds: 15, hydro: 14, aromatic: 3 },
  },
  {
    id: 'AMP-03',
    seq: 'RRLWKWFKKVW',
    name: 'The Membrane Wrecker',
    tagline: 'Highest hydrophobic character among the top three.',
    hint: 'Compact sequence, maximum hydrophobic punch. This peptide buries itself deep into lipid bilayers and refuses to come back out. Short, brutal, effective.',
    badge: '3rd — Most hydrophobic',
    badgeColor: '#BA7517',
    stats: { total: 63, hbonds: 11, hydro: 18, aromatic: 3 },
  },
  {
    id: 'AMP-04',
    seq: 'AFWRRFWWRMKK',
    name: 'The Aromatic Cluster',
    tagline: 'Dense aromatic core with focused interactions.',
    hint: 'Three tryptophans and two phenylalanines packed into one short peptide. Aromatics stack against membrane lipids like puzzle pieces — this one is built for insertion depth.',
    badge: '4th — Aromatic-dense',
    badgeColor: '#7F77DD',
    stats: { total: 60, hbonds: 10, hydro: 9, aromatic: 3 },
  },
  {
    id: 'AMP-05',
    seq: 'GWRRWKKALKHI',
    name: 'The Pure Charger',
    tagline: 'Zero aromatic stacking — all electrostatic force.',
    hint: 'Unique among our candidates: no aromatic stacking at all. Every interaction here is driven purely by electrostatic charge. A fascinating outlier — and a window into a completely different mechanism.',
    badge: '5th — Charge-driven',
    badgeColor: '#D85A30',
    stats: { total: 60, hbonds: 12, hydro: 11, aromatic: 0 },
  },
  {
    id: 'AMP-06',
    seq: 'RKWFKKLWRRIFKK',
    name: 'The Wild Card',
    hidden: true,
    tagline: 'Designed in-silico. Never seen in nature.',
    hint: 'A computationally generated candidate combining the best motifs from our top performers — cationic lysines flanking a hydrophobic tryptophan core. Untested in the lab, but the numbers look promising.',
    badge: '6th — In-silico design',
    badgeColor: '#D4537E',
    stats: { total: 58, hbonds: 11, hydro: 16, aromatic: 4 },
  },
]

const AA_COLORS = {
  K:'#3B8BD4', R:'#3B8BD4', H:'#185FA5',
  D:'#E24B4A', E:'#E24B4A',
  S:'#1D9E75', T:'#1D9E75', N:'#0F6E56', Q:'#0F6E56',
  G:'#888780', A:'#B4B2A9', V:'#5F5E5A', L:'#444441', I:'#444441',
  P:'#7F77DD', F:'#BA7517', W:'#854F0B', M:'#633806',
  C:'#EF9F27', Y:'#639922'
}

function SeqChips({ seq }) {
  return (
    <div style={{ fontFamily: 'monospace', lineHeight: 2, wordBreak: 'break-all', marginBottom: 14 }}>
      {seq.split('').map((aa, i) => (
        <span key={i} style={{
          display: 'inline-block',
          width: 20, height: 20, lineHeight: '20px',
          textAlign: 'center', borderRadius: 4,
          fontSize: 11, fontWeight: 600, margin: 1,
          background: (AA_COLORS[aa] || '#888') + '25',
          color: AA_COLORS[aa] || '#888',
          border: `0.5px solid ${AA_COLORS[aa] || '#888'}55`,
        }}>
          {aa}
        </span>
      ))}
    </div>
  )
}

function StatPill({ label, value, color }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      background: color + '15', border: `0.5px solid ${color}40`,
      borderRadius: 8, padding: '6px 12px', minWidth: 54,
    }}>
      <span style={{ fontSize: 16, fontWeight: 600, color: color }}>{value}</span>
      <span style={{ fontSize: 10, color: '#888', marginTop: 1 }}>{label}</span>
    </div>
  )
}

export default function AMPSelector({ onSelect }) {
  const [selected, setSelected] = useState(null)
  const [hovered, setHovered] = useState(null)

  return (
    <div style={{ minHeight: '100vh', background: '#f8f8f6', padding: '2.5rem 1.5rem' }}>
      <div style={{ maxWidth: 960, margin: 'auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{
            display: 'inline-block', fontSize: 11, fontWeight: 600,
            letterSpacing: '0.08em', textTransform: 'uppercase',
            color: '#1D9E75', background: '#1D9E7518', border: '0.5px solid #1D9E7540',
            borderRadius: 20, padding: '4px 14px', marginBottom: 14
          }}>
            iGEM AMP Project — Mtb Inhibition
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 500, color: '#1a1a1a', marginBottom: 8 }}>
            Choose your antimicrobial peptide
          </h1>
          <p style={{ fontSize: 14, color: '#666', maxWidth: 520, margin: 'auto', lineHeight: 1.6 }}>
            These are our top 5 candidates from structural analysis. Each has a distinct personality — pick the one you want to explore.
          </p>
        </div>

        {/* Cards grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 16, marginBottom: 24
        }}>
          {AMPS.filter(a => !a.hidden).map((amp, i) => {
            const isSelected = selected === i
            const isHovered = hovered === i
            return (
              <div
                key={amp.id}
                onClick={() => setSelected(i)}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  background: isSelected ? '#fff' : '#fff',
                  border: isSelected
                    ? `2px solid ${amp.badgeColor}`
                    : isHovered
                    ? `1px solid ${amp.badgeColor}88`
                    : '1px solid #e8e8e4',
                  borderRadius: 14,
                  padding: '1.25rem',
                  cursor: 'pointer',
                  transition: 'border-color .15s, transform .1s, box-shadow .15s',
                  transform: isHovered && !isSelected ? 'translateY(-2px)' : 'none',
                  boxShadow: isSelected
                    ? `0 0 0 4px ${amp.badgeColor}18`
                    : isHovered ? '0 4px 16px rgba(0,0,0,0.07)' : 'none',
                  position: 'relative',
                }}
              >
                {/* Selected checkmark */}
                {isSelected && (
                  <div style={{
                    position: 'absolute', top: 12, right: 12,
                    width: 22, height: 22, borderRadius: '50%',
                    background: amp.badgeColor,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 12, color: '#fff', fontWeight: 700
                  }}>✓</div>
                )}

                {/* Badge */}
                <div style={{
                  display: 'inline-block', fontSize: 10, fontWeight: 600,
                  color: amp.badgeColor,
                  background: amp.badgeColor + '18',
                  border: `0.5px solid ${amp.badgeColor}40`,
                  borderRadius: 20, padding: '3px 10px', marginBottom: 10
                }}>
                  {amp.badge}
                </div>

                {/* Name + tagline */}
                <div style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: 15, fontWeight: 600, color: '#1a1a1a', marginBottom: 3 }}>
                    {amp.name}
                  </div>
                  <div style={{ fontSize: 12, color: amp.badgeColor, fontWeight: 500 }}>
                    {amp.tagline}
                  </div>
                </div>

                {/* Sequence chips */}
                <SeqChips seq={amp.seq} />

                {/* Hint text */}
                <p style={{
                  fontSize: 12, color: '#555', lineHeight: 1.6,
                  marginBottom: 14, minHeight: 56
                }}>
                  {amp.hint}
                </p>

                {/* Stats row */}
                <div style={{ display: 'flex', gap: 8, flexWrap: 'nowrap', marginBottom: 14 }}>
                  <StatPill label="Total" value={amp.stats.total} color="#888" />
                  <StatPill label="H-bonds" value={amp.stats.hbonds} color="#185FA5" />
                  <StatPill label="Hydro" value={amp.stats.hydro} color="#BA7517" />
                  <StatPill label="Aromatic" value={amp.stats.aromatic} color="#7F77DD" />
                </div>

                {/* Select button */}
                <button style={{
                  width: '100%', padding: '9px 0', fontSize: 13, fontWeight: 500,
                  border: `1px solid ${amp.badgeColor}`,
                  borderRadius: 8,
                  background: isSelected ? amp.badgeColor : 'transparent',
                  color: isSelected ? '#fff' : amp.badgeColor,
                  cursor: 'pointer', transition: 'all .15s'
                }}>
                  {isSelected ? '✓ Selected' : 'Select this AMP'}
                </button>
              </div>
            )
          })}
        </div>

        {/* Bottom action bar */}
        {selected !== null && (
          <div style={{
            background: '#fff',
            border: `1px solid ${AMPS[selected].badgeColor}60`,
            borderRadius: 12, padding: '1rem 1.5rem',
            display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', flexWrap: 'wrap', gap: 12,
            boxShadow: `0 0 0 4px ${AMPS[selected].badgeColor}12`
          }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500, color: '#1a1a1a' }}>
                {AMPS[selected].name} selected
              </div>
              <div style={{ fontSize: 12, color: '#888', fontFamily: 'monospace', marginTop: 2 }}>
                {AMPS[selected].seq}
              </div>
            </div>
            <button
              onClick={() => onSelect(AMPS[selected])}
              style={{
                padding: '10px 28px', fontSize: 14, fontWeight: 500,
                background: AMPS[selected].badgeColor,
                color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer'
              }}
            >
              Explore 3D structure →
            </button>
          </div>
        )}

      </div>
    </div>
  )
}