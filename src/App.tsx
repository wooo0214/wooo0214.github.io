import { useEffect, useMemo, useState } from 'react'
import { ArrowRight, Award, BookOpen, Check, ChevronRight, CircleDot, Compass, Library, LockKeyhole, Map, Orbit, PenLine, Radio, Route, Sparkles, Target, TrendingUp, UserRound, Zap } from 'lucide-react'
import { mapEdges, mapNodes, milestones, quests, site, skillBranches, stages, type Quest } from './data/site'
import ClickSpark from './ClickSpark'
import Shuffle from './Shuffle'
import hydrogenSpinFlip from '../pic/Hydrogen-SpinFlip.svg.webp'

type View = 'home' | 'map' | 'skills' | 'quests' | 'achievements' | 'knowledge' | 'character' | 'devlog'
const nav: { id: View; label: string; icon: React.ReactNode }[] = [
  { id: 'map', label: 'RESEARCH MAP', icon: <Map size={19} /> },
  { id: 'skills', label: 'SKILL TREE', icon: <Zap size={19} /> },
  { id: 'quests', label: 'QUEST LOG', icon: <BookOpen size={19} /> },
  { id: 'achievements', label: 'ACHIEVEMENTS', icon: <Award size={19} /> },
  { id: 'knowledge', label: 'KNOWLEDGE BASE', icon: <Library size={19} /> },
  { id: 'character', label: 'CHARACTER STATUS', icon: <UserRound size={20} /> },
  { id: 'devlog', label: 'DEV LOG', icon: <PenLine size={19} /> },
]

const hobbyGifs = [
  { label: 'HIKING', src: '/hobbies/hiking.gif' },
  { label: 'CYCLING', src: '/hobbies/cycling.gif' },
  { label: 'BASEBALL / SOFTBALL', src: '/hobbies/basoball.gif' },
]

function EntryOverlay({ onEnter }: { onEnter: () => void }) {
  const [exiting, setExiting] = useState(false)
  const enter = () => {
    if (exiting) return
    setExiting(true)
    window.setTimeout(onEnter, 850)
  }

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        enter()
      }
    }
    const handleWheel = (event: WheelEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.deltaY < 0) enter()
    }
    const handleViewport = () => {
      if ((window.visualViewport?.scale ?? 1) > 1.08) enter()
    }
    window.addEventListener('keydown', handleKey)
    window.addEventListener('wheel', handleWheel, { passive: true })
    window.visualViewport?.addEventListener('resize', handleViewport)
    return () => {
      window.removeEventListener('keydown', handleKey)
      window.removeEventListener('wheel', handleWheel)
      window.visualViewport?.removeEventListener('resize', handleViewport)
    }
  })

  return <div className={`entry-overlay ${exiting ? 'is-exiting' : ''}`} aria-hidden={exiting}>
    <div className="entry-stars" aria-hidden="true">{Array.from({ length: 18 }, (_, index) => <i key={index} style={{ '--i': index } as React.CSSProperties} />)}</div>
    <button className="entry-dust" onClick={enter} aria-label="Enter the research observatory">
      <span className="entry-dust-core" />
      <span className="entry-dust-halo" />
    </button>
    <div className="entry-copy"><strong>XIII</strong><span>RESEARCH OBSERVATORY</span><small>CLICK THE DUST TO ENTER · OR ZOOM IN</small></div>
  </div>
}

function CatchBall({ children }: { children: React.ReactNode }) {
  const [ballSide, setBallSide] = useState<'left' | 'right'>('left')
  const [flight, setFlight] = useState<'left-to-right' | 'right-to-left' | null>(null)

  const throwFrom = (side: 'left' | 'right') => {
    if (flight || ballSide !== side) return
    const nextFlight = side === 'left' ? 'left-to-right' : 'right-to-left'
    const nextSide = side === 'left' ? 'right' : 'left'
    setFlight(nextFlight)
    window.setTimeout(() => {
      setBallSide(nextSide)
      setFlight(null)
    }, 620)
  }

  return <div className={`catch-ball ${flight ?? ''}`} aria-label="Baseball catch toy">
    <button className={`catch-glove left ${ballSide === 'left' && !flight ? 'has-ball' : ''}`} onClick={() => throwFrom('left')} aria-label="Throw from left glove">🧤</button>
    <div className="catch-hobbies">{children}</div>
    <span className={`catch-ball-emoji ${ballSide} ${flight ? 'flying' : ''}`} aria-hidden="true">🥎</span>
    <button className={`catch-glove right ${ballSide === 'right' && !flight ? 'has-ball' : ''}`} onClick={() => throwFrom('right')} aria-label="Throw from right glove">🧤</button>
  </div>
}

function Shell({ view, setView, children }: { view: View; setView: (v: View) => void; children: React.ReactNode }) {
  return <main>
    <nav className="topbar appbar" aria-label="Main navigation">
      <button className="brand brand-button" onClick={() => setView('home')}>xiii<span>·</span></button>
      <div className="nav-links app-nav">{nav.map(item => <button className={view === item.id ? 'selected' : ''} key={item.id} onClick={() => setView(item.id)} aria-label={item.label} title={item.label}>{item.icon}<span className="sr-only">{item.label}</span></button>)}</div>
      <div className="signal"><span /> SIGNAL ONLINE</div>
    </nav>
    {children}
    <footer>
      <div className="footer-id"><strong>xiii</strong><span>Research Seal's Radio Astronomy Archive</span></div>
      <div className="footer-hobbies"><CatchBall>{hobbyGifs.map(item => <img key={item.label} src={item.src} alt={`${item.label} GIF`} loading="lazy" />)}</CatchBall></div>
      <p>OBSERVING · LEARNING · ITERATING</p>
    </footer>
  </main>
}

function PageHead({ code, title, subtitle }: { code: string; title: string; subtitle: string }) {
  return <header className="page-head"><p className="eyebrow">{code} / RESEARCH NAVIGATION SYSTEM</p><Shuffle text={title} tag="h1" shuffleTimes={9} duration={560} /><p>{subtitle}</p></header>
}

function createWhiteNoise(seed: number) {
  return Array.from({ length: 180 }, () => {
    seed = (1664525 * seed + 1013904223) >>> 0
    return (seed / 4294967296) * 2 - 1
  })
}

function ThermalNoiseModule() {
  const [temperature, setTemperature] = useState(72)
  const [noise, setNoise] = useState(() => createWhiteNoise(0x13a57))
  useEffect(() => {
    let tick = 0
    const timer = window.setInterval(() => {
      tick += 1
      setNoise(createWhiteNoise((0x13a57 + tick * 0x9e3779b9) >>> 0))
    }, 1000)
    return () => window.clearInterval(timer)
  }, [])
  const palette = ['#67001f', '#b2182b', '#ef8a62', '#f7f7f7', '#67a9cf', '#2166ac', '#053061']
  const color = useMemo(() => {
    const position = (temperature / 150) * (palette.length - 1)
    const index = Math.min(Math.floor(position), palette.length - 2)
    const amount = position - index
    const channel = (hex: string, offset: number) => parseInt(hex.slice(offset, offset + 2), 16)
    const from = palette[index]
    const to = palette[index + 1]
    const rgb = [1, 3, 5].map(offset => Math.round(channel(from, offset) + (channel(to, offset) - channel(from, offset)) * amount))
    return `rgb(${rgb.join(', ')})`
  }, [temperature])
  const points = useMemo(() => {
    const amplitude = 20 + (temperature / 150) * 68
    return noise.map((value, index) => `${(index / (noise.length - 1)) * 600},${110 - value * amplitude}`).join(' ')
  }, [noise, temperature])
  return <section className="thermal-noise-module section" style={{ '--thermal-accent': color } as React.CSSProperties}>
    <div className="thermal-noise-copy">
      <p className="label">INTERACTIVE MODEL / WHITE NOISE</p>
      <h2>Thermal noise field</h2>
      <p>Drag the temperature to scale a white-noise signal that refreshes every second. The curve is an illustrative random-noise model, not an instrument measurement.</p>
      <div className="thermal-readout"><span>NOISE AMPLITUDE</span><strong>{Math.round((temperature / 150) * 100)}%</strong></div>
    </div>
    <div className="thermal-wave-panel">
      <svg className="thermal-wave" viewBox="0 0 600 220" role="img" aria-label={`White noise waveform at ${temperature} kelvin`}>
        <path className="thermal-grid-line" d="M0 55H600 M0 110H600 M0 165H600" />
        <polyline points={points} fill="none" stroke="var(--thermal-accent)" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" />
      </svg>
      <div className="thermal-axis"><span>LOW AMPLITUDE</span><span>RANDOM WHITE-NOISE SAMPLES</span><span>HIGH AMPLITUDE</span></div>
    </div>
    <div className="thermal-control">
      <div className="thermal-control-head"><span className="label">TEMPERATURE</span><output aria-live="polite">{temperature} K</output></div>
      <input aria-label="Temperature in kelvin" type="range" min="0" max="150" step="1" value={temperature} onChange={event => setTemperature(Number(event.target.value))} />
      <div className="thermal-scale"><span>0 K</span><span>75 K</span><span>150 K</span></div>
      <div className="thermal-color-key"><i /> <span>RED → BLUE-WHITE</span></div>
    </div>
  </section>
}

function Home({ go }: { go: (v: View) => void }) {
  const next = quests.find(q => q.kind === 'MAIN')!
  return <>
    <ThermalNoiseModule />
    <section className="hero dashboard-hero">
      <div className="hero-copy"><p className="eyebrow">XI–III / CURRENT SAVE</p><h1>{site.greeting}<span className="dot">.</span></h1><p className="intro">I am the <span>{site.identity}</span>, {site.identityEn}.<br />Searching the radio universe for questions, signals, and answers.</p></div>
      <div className="status-deck">
        <div className="you-are-here"><div className="pulse-ring"><CircleDot size={25} /></div><p className="label">YOU ARE HERE / CURRENT LOCATION</p><h2>{site.location}</h2><span>Research Setup → FAST Data Processing → Science Analysis</span><button onClick={() => go('map')}>Locate on Research Map <ArrowRight size={15} /></button></div>
        <div className="mini-character"><span>SUBJECT XIII</span><strong>LV. 0{site.level}</strong><small>{site.exp} / {site.nextLevelExp} EXP</small></div>
      </div>
    </section>
    <section className="ticker"><span>{site.status}</span><span>YOU ARE HERE · FAST DATA</span><span>NEXT · SCIENCE ANALYSIS</span><span>1420.405 MHz</span></section>
    <section className="section science-signal">
      <figure className="spin-flip-figure">
        <div className="spin-flip-image"><img src={hydrogenSpinFlip} alt="Diagram of the neutral hydrogen proton-electron spin-flip transition emitting a 21 cm photon" /></div>
        <figcaption>
          <p className="label">SIGNAL ORIGIN / 21 CM H I LINE</p>
          <span className="frequency">1420.405<span>MHz</span></span>
          <h2>Hydrogen spin-flip transition</h2>
          <p>A spin flip in neutral hydrogen emits a 21 cm photon—the key tracer for mapping galactic H I gas.</p>
          <div className="signal-facts"><span>λ ≈ 21.1 cm</span><span>NEUTRAL HYDROGEN</span><span>RADIO LINE</span></div>
          <p className="image-credit">Image source: <a href="https://en.wikipedia.org/wiki/Hydrogen_line" target="_blank" rel="noreferrer">Wikipedia</a></p>
        </figcaption>
      </figure>
    </section>
    <section className="section overview-grid">
      <article className="next-quest-panel"><div className="panel-kicker"><Target size={17} /><span>NEXT ACTION</span></div><p className="quest-code">{next.code} · MAIN QUEST</p><h2>{next.nextAction}</h2><button onClick={() => go('quests')}>Open Quest <ChevronRight size={16} /></button></article>
      <article className="route-panel"><div className="panel-kicker"><Route size={17} /><span>MISSION ROUTE</span></div>{stages.map((s, i) => <div className={`route-row ${s.state}`} key={s.name}><span>{s.state === 'complete' ? <Check size={14} /> : String(i + 1).padStart(2,'0')}</span><div><strong>{s.name}</strong><small>{s.note}</small></div></div>)}</article>
    </section>
    <section className="section quick-nav"><button onClick={() => go('map')}><Map /><span>RESEARCH MAP<small>See the main path</small></span><ArrowRight /></button><button onClick={() => go('skills')}><Zap /><span>SKILL TREE<small>Choose an upgrade</small></span><ArrowRight /></button><button onClick={() => go('character')}><TrendingUp /><span>CHARACTER STATUS<small>Review progress</small></span><ArrowRight /></button></section>
  </>
}

function WorldMap() {
  const [selected, setSelected] = useState(mapNodes.find(n => n.status === 'current')!)
  const nodeById = useMemo(() => Object.fromEntries(mapNodes.map(n => [n.id, n])), [])
  return <section className="workspace section"><PageHead code="01" title="Research Map" subtitle="See where you are—and where the main quest leads next." />
    <div className="world-layout"><div className="world-board">
      <div className="map-legend"><span><i className="mastered" />MASTERED</span><span><i className="current" />YOU ARE HERE</span><span><i className="available" />AVAILABLE</span><span><i className="locked" />LOCKED</span></div>
      <svg className="edge-layer" viewBox="0 0 100 100" preserveAspectRatio="none">{mapEdges.map(([a,b]) => <line key={a+b} x1={nodeById[a].x} y1={nodeById[a].y} x2={nodeById[b].x} y2={nodeById[b].y} />)}</svg>
      {mapNodes.map(node => <button key={node.id} onClick={() => setSelected(node)} style={{ left: `${node.x}%`, top: `${node.y}%` }} className={`research-node ${node.status} ${selected.id === node.id ? 'selected' : ''}`}><span>{node.status === 'locked' ? <LockKeyhole size={13} /> : node.status === 'current' ? <CircleDot size={14} /> : <Radio size={13} />}</span><strong>{node.label}</strong><small>{node.zone}</small></button>)}
    </div><aside className="detail-panel"><p className="label">SELECTED REGION</p><div className={`status-chip ${selected.status}`}>{selected.status}</div><h2>{selected.label}</h2><p>{selected.detail}</p>{selected.status === 'current' && <div className="here-callout"><CircleDot size={18} /><div><strong>YOU ARE HERE</strong><span>Main quest active</span></div></div>}<h3>REGION ACTIONS</h3><ul><li>Review skills and prerequisites</li><li>Set one concrete deliverable</li><li>Update status with evidence</li></ul></aside></div>
  </section>
}

function QuestLog() {
  const [selectedCode, setSelectedCode] = useState('MQ-01')
  const [filter, setFilter] = useState<'ALL' | Quest['kind']>('ALL')
  const selected = quests.find(q => q.code === selectedCode)!
  const visible = quests.filter(q => filter === 'ALL' || q.kind === filter)
  return <section className="workspace section"><PageHead code="03" title="Quest Log" subtitle="Track the goal, completion criteria, deliverable, and next action." />
    <div className="filter-row">{(['ALL','MAIN','ACTIVE','SIDE'] as const).map(f => <button className={filter === f ? 'active' : ''} onClick={() => setFilter(f)} key={f}>{f}</button>)}</div>
    <div className="quest-layout"><div className="quest-list">{visible.map(q => <button className={`quest-list-item ${selectedCode === q.code ? 'selected' : ''}`} onClick={() => setSelectedCode(q.code)} key={q.code}><div><span>{q.code}</span><em>{q.kind}</em></div><h3>{q.title}</h3><div className="progress-track"><i style={{ width: `${q.progress}%` }} /></div><small>{q.progress}% · {q.status}</small></button>)}</div>
      <article className="quest-detail"><div className="quest-detail-head"><span>{selected.code} · {selected.kind} QUEST</span><strong>{selected.progress}%</strong></div><h2>{selected.title}</h2><p className="quest-purpose">{selected.purpose}</p><div className="next-action"><Compass size={20} /><div><small>NEXT ACTION</small><strong>{selected.nextAction}</strong></div></div><h3>COMPLETION CRITERIA</h3><ul className="check-list">{selected.doneWhen.map(item => <li key={item}><span /><p>{item}</p></li>)}</ul><div className="quest-meta"><div><small>DELIVERABLE</small><strong>{selected.deliverable}</strong></div><div><small>REWARD</small><strong>{selected.reward}</strong></div></div></article>
    </div>
  </section>
}

function SkillTree() {
  const [selectedSkillId, setSelectedSkillId] = useState<string | null>(null)
  const branchXs = [14, 38, 62, 86]
  const skillYs = [34, 50, 66, 82]
  const visualSkills = skillBranches.flatMap((branch, branchIndex) =>
    branch.skills.map((skill, skillIndex) => ({
      ...skill,
      id: `${branchIndex}-${skillIndex}`,
      branch: branch.name,
      branchIndex,
      skillIndex,
      x: branchXs[branchIndex],
      y: skillYs[skillIndex],
    }))
  )
  const selectedSkill = visualSkills.find(skill => skill.id === selectedSkillId)
  const inspectorSide = selectedSkill && selectedSkill.branchIndex >= 2 ? 'left' : 'right'
  const inspectorStyle = selectedSkill ? {
    '--inspector-left': `${selectedSkill.x + (inspectorSide === 'left' ? -8 : 8)}%`,
    '--inspector-top': `${selectedSkill.y}%`,
  } as React.CSSProperties : undefined

  return <section className="workspace section"><PageHead code="02" title="Skill Tree" subtitle="Levels reflect demonstrated skill. Amber marks current upgrades." />
    <div className="skill-visual-board" onClick={() => setSelectedSkillId(null)} role="presentation">
      <svg className="skill-visual-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {branchXs.map((x, index) => <line key={`root-${x}`} x1="50" y1="16" x2={x} y2={skillYs[0]} className={index === 1 || index === 2 ? 'hot' : ''} />)}
        {branchXs.map((x, branchIndex) => skillYs.slice(1).map((y, i) => <line key={`${branchIndex}-${i}`} x1={x} y1={skillYs[i]} x2={x} y2={y} className={branchIndex === 1 || branchIndex === 2 ? 'hot' : ''} />))}
      </svg>
      <div className="skill-core-node"><span className="seal-icon">•ᴥ•</span><strong>Research Seal</strong><small>LV.{site.level}</small></div>
      {skillBranches.map((branch, index) => <span key={branch.name} className="skill-branch-label" style={{ left: `${branchXs[index]}%` }}>{branch.name.split('/')[0]}</span>)}
      {visualSkills.map(skill => <button
        key={skill.id}
        className={`skill-visual-node ${skill.status} ${selectedSkillId === skill.id ? 'selected' : ''}`}
        style={{ left: `${skill.x}%`, top: `${skill.y}%` }}
        onClick={(event) => { event.stopPropagation(); setSelectedSkillId(skill.id) }}
        aria-pressed={selectedSkillId === skill.id}
      >
        <span>{skill.status === 'locked' ? <LockKeyhole size={16} /> : <Zap size={16} />}</span>
        <strong>{skill.name}</strong>
        <small>LV.{skill.level}</small>
      </button>)}
      <aside className={`skill-inspector ${selectedSkill ? 'open' : ''} ${inspectorSide === 'left' ? 'side-left' : 'side-right'}`} style={inspectorStyle} onClick={(event) => event.stopPropagation()} aria-hidden={!selectedSkill}>
        {selectedSkill && <>
          <p className="label">SKILL POINT DETAIL</p>
          <div className={`status-chip ${selectedSkill.status}`}>{selectedSkill.status}</div>
          <h3>{selectedSkill.name}</h3>
          <p>{selectedSkill.proof}</p>
          <dl>
            <div><dt>Branch</dt><dd>{selectedSkill.branch}</dd></div>
            <div><dt>Level</dt><dd>{selectedSkill.level} / 5</dd></div>
            <div><dt>State</dt><dd>{selectedSkill.status}</dd></div>
          </dl>
        </>}
      </aside>
    </div>
    <div className="skill-toolbar"><span><i className="current" /> CURRENT UPGRADE</span><span><i className="mastered" /> UNLOCKED</span><span><i className="locked" /> PREREQUISITE NEEDED</span></div>
    <div className="skill-tree">{skillBranches.map((branch, bi) => <section className="skill-branch" key={branch.name}><header><span>0{bi + 1}</span><h2>{branch.name}</h2></header><div className="skill-chain">{branch.skills.map((skill, i) => <div className={`skill-node ${skill.status}`} key={skill.name}>{i > 0 && <i className="skill-connector" />}<div className="skill-orb">{skill.status === 'locked' ? <LockKeyhole size={18} /> : <Zap size={18} />}</div><div><small>LV.{skill.level} / 5</small><h3>{skill.name}</h3><p>{skill.proof}</p></div></div>)}</div></section>)}</div>
  </section>
}

function CharacterStatus() {
  return <section className="workspace section"><PageHead code="06" title="Character Status" subtitle="Your level, experience, current state, and trajectory." />
    <div className="character-sheet">
      <header className="character-identity">
        <div className="character-avatar"><span>•ᴥ•</span><small>SUBJECT XIII</small></div>
        <dl>
          <div><dt>Name</dt><dd>{site.name}</dd></div>
          <div><dt>Class</dt><dd>{site.role}</dd></div>
          <div><dt>Subclass</dt><dd>{site.subclass}</dd></div>
          <div><dt>Level</dt><dd>{site.level}</dd></div>
          <div className="character-exp"><dt>EXP</dt><dd>{site.exp} / {site.nextLevelExp}</dd><div className="progress-track"><i style={{ width: `${site.exp/site.nextLevelExp*100}%` }} /></div></div>
        </dl>
      </header>
      <div className="character-lists">
        <section className="status-list main-status"><p className="label">MAIN QUEST</p><label><span className="status-box" />Enter FAST scientific analysis</label><small>{site.mainQuest}</small></section>
        <section className="status-list"><p className="label">ACTIVE QUESTS</p><label className="checked"><span className="status-box"><Check size={12} /></span>Complete the FAST processing checkpoint</label><label><span className="status-box" />Prepare the first scientific analysis</label><label><span className="status-box" />Maintain a reproducible workspace</label><label><span className="status-box" />Keep unfinished results private</label></section>
        <section className="status-list"><p className="label">UNLOCKED SKILLS</p><label className="checked"><span className="status-box"><Check size={12} /></span>Python</label><label className="checked"><span className="status-box"><Check size={12} /></span>Linux / Command Line</label><label className="checked"><span className="status-box"><Check size={12} /></span>Version Control</label><label className="checked"><span className="status-box"><Check size={12} /></span>FAST Data Structure</label><label className="checked"><span className="status-box"><Check size={12} /></span>Data Processing</label><label className="checked"><span className="status-box"><Check size={12} /></span>Quality Control</label><label><span className="status-box" />Validated Results</label><label><span className="status-box" />Scientific Interpretation</label></section>
      </div>
    </div>
    <div className="character-section-title"><span>LONG-TERM PROGRESSION</span><p>Beyond the current level</p></div>
    <div className="progress-layout"><div className="timeline"><p className="label">LONG-TERM TRAJECTORY</p>{milestones.map((m, i) => <div className={`milestone ${m.state}`} key={m.title}><span>{m.state === 'complete' ? <Check /> : i + 1}</span><div><small>{m.date}</small><h3>{m.title}</h3><p>{m.note}</p></div></div>)}</div><aside className="evidence-panel"><p className="label">GROWTH FEEDBACK LOOP</p><h2>Every action should leave evidence.</h2><ol><li><BookOpen />Complete one learning or analysis session</li><li><Sparkles />Leave a figure, code, note, or presentation</li><li><Zap />Update the skill level and quest status</li><li><Orbit />Review the next shortest path</li></ol><div className="weekly-box"><small>THIS WEEK</small><strong>Create the first Moment 0 map with coordinates and units</strong><span>Reward: +80 EXP</span></div></aside></div>
  </section>
}

function Achievements() {
  const achievements = [
    { code: 'A-001', title: 'Entered the Radio Universe', note: 'Joined a research group working on pulsars and neutral hydrogen.', date: '2026.07', unlocked: true },
    { code: 'A-002', title: 'Built the First Research Map', note: 'Completed the framework for the world map, skill tree, and quest system.', date: '2026.07', unlocked: true },
    { code: 'A-003', title: 'Completed First-Year Coursework', note: 'Completed 12 graduate courses spanning machine learning, radiation, stars, galaxies, observation, spectroscopy, radio astronomy, and cosmology.', date: 'YEAR 1', unlocked: true },
    { code: 'A-004', title: 'FAST Data Processing Started', note: 'Began processing FAST data and maintaining a private research record.', date: '2026.07', unlocked: true },
    { code: 'A-005', title: 'Data Quality Review', note: 'Established a habit of checking supplied data and recording anomalies before interpretation.', date: '2026.08', unlocked: true },
    { code: 'A-006', title: 'Reproducible Research Record', note: 'Organized notes, scripts, diagnostics, and derived products for ongoing work.', date: '2026.08', unlocked: true },
    { code: 'A-007', title: 'Private Processing Checkpoint', note: 'Recorded a verified FAST data-processing checkpoint without publishing unfinished results.', date: '2026.08', unlocked: true },
    { code: 'A-008', title: 'Research Workspace Ready', note: 'Prepared a structured workspace for continued FAST data processing.', date: '2026.07', unlocked: true },
    { code: 'A-009', title: 'Cross-Device Lab Restored', note: 'Restored a portable research environment after a system rebuild.', date: '2026.07', unlocked: true },
    { code: 'A-010', title: 'FAST Dataset Review', note: 'Completed a review pass over the current FAST dataset.', date: '2026.08', unlocked: true },
    { code: 'A-011', title: 'Diagnostic Figure', note: 'Prepared an inspectable figure for a FAST data-processing checkpoint.', date: '2026.08', unlocked: true },
    { code: 'A-012', title: 'FAST Processing Checkpoint', note: 'Completed an initial FAST data-processing checkpoint and prepared to enter scientific analysis.', date: '2026.09', unlocked: true },
    { code: 'A-013', title: 'Approved Result', note: 'Publish an approved scientific result after private processing and review.', date: 'LOCKED', unlocked: false },
    { code: 'A-014', title: 'Validated Analysis', note: 'Complete a validated FAST data analysis.', date: 'LOCKED', unlocked: false },
    { code: 'A-015', title: 'Research Question', note: 'Define a public, approved scientific question.', date: 'LOCKED', unlocked: false },
    { code: 'A-016', title: 'First Author', note: 'Complete the first first-author paper.', date: 'BOSS', unlocked: false },
  ]
  return <section className="workspace section"><PageHead code="04" title="Achievements" subtitle="Evidence-backed milestones from the research journey." /><div className="achievement-grid">{achievements.map((a, i) => <article className={`achievement-card ${a.unlocked ? 'unlocked' : 'locked'}`} key={a.code}><div className="achievement-medal">{a.unlocked ? <Award /> : <LockKeyhole />}</div><span>{a.code} · {a.date}</span><h2>{a.title}</h2><p>{a.note}</p><small>{a.unlocked ? `UNLOCKED · +${100 + i * 40} EXP` : 'PREREQUISITE NOT MET'}</small></article>)}</div></section>
}

function KnowledgeBase() {
  const entries = [
    { code: 'HI-001', title: 'H I 21 cm Foundations', category: 'PHYSICS', note: 'Spin-flip transition, column density, optical depth, and brightness temperature.', progress: '3 NOTES' },
    { code: 'DATA-001', title: 'FITS & WCS', category: 'DATA', note: 'Headers, coordinate axes, units, and velocity definitions.', progress: '5 NOTES' },
    { code: 'CUBE-001', title: 'Spectral Cube', category: 'METHOD', note: 'Noise, channel maps, spectra, moment maps, and PV diagrams.', progress: 'IN PROGRESS' },
    { code: 'OBS-001', title: 'Radio Observation', category: 'OBSERVATION', note: 'Beam, sensitivity, system temperature, calibration, and RFI.', progress: '4 NOTES' },
    { code: 'GAL-001', title: 'H I Galaxy Science', category: 'SCIENCE', note: 'Gas mass, scaling relations, environment, and gas cycling.', progress: '2 NOTES' },
    { code: 'PAPER-001', title: 'Paper Reading', category: 'LITERATURE', note: 'Core papers, reviews, classic results, and reproduction records.', progress: '7 PAPERS' },
    { code: 'FIELD-001', title: 'FAST Data Notes', category: 'LITERATURE', note: 'Public background reading connected to ongoing FAST data processing.', progress: 'IN PROGRESS' },
    { code: 'PHYS-002', title: 'FAST Observation Basics', category: 'PHYSICS', note: 'General concepts used to understand FAST data and radio observations.', progress: 'IN PROGRESS' },
    { code: 'HPC-001', title: 'Research Workspace', category: 'METHOD', note: 'Organization of notes, scripts, diagnostics, and derived products.', progress: 'IN PROGRESS' },
    { code: 'CAL-001', title: 'FAST Data Processing', category: 'METHOD', note: 'Current private work on processing FAST data.', progress: 'IN PROGRESS' },
    { code: 'CAL-002', title: 'Data Quality Review', category: 'METHOD', note: 'General checks used to review data quality before interpretation.', progress: 'IN PROGRESS' },
    { code: 'CAL-003', title: 'Research Record', category: 'DATA', note: 'Dates, checkpoints, assumptions, and diagnostic outputs kept for private review.', progress: 'IN PROGRESS' },
    { code: 'TRACK-001', title: 'FAST Tracking Dataset', category: 'DATA', note: 'Ongoing processing of a FAST tracking dataset.', progress: 'IN PROGRESS' },
    { code: 'FAST-002', title: 'FAST Processing Checkpoint', category: 'METHOD', note: 'Initial processing checkpoint complete; the next stage is scientific analysis.', progress: 'CURRENT' },
    { code: 'COURSE-01', title: 'Pattern Recognition & Machine Learning', category: 'COURSEWORK', note: 'Pattern classification, feature extraction, and foundational machine-learning methods.', progress: 'COMPLETED' },
    { code: 'COURSE-02', title: 'Radiative Processes in Astrophysics', category: 'COURSEWORK', note: 'Radiation mechanisms, radiative transfer, and astrophysical applications.', progress: 'COMPLETED' },
    { code: 'COURSE-03', title: 'Foundations of Stellar Physics', category: 'COURSEWORK', note: 'Stellar structure, evolution, and fundamental physical processes.', progress: 'COMPLETED' },
    { code: 'COURSE-04', title: 'Galactic Astronomy', category: 'COURSEWORK', note: 'Galaxy structure, properties, formation, and evolution.', progress: 'COMPLETED' },
    { code: 'COURSE-05', title: 'Fundamentals of Practical Astronomy', category: 'COURSEWORK', note: 'Astronomical measurement, uncertainty analysis, and observing methods.', progress: 'COMPLETED' },
    { code: 'COURSE-06', title: 'Multi-wavelength Observation & Data Processing', category: 'COURSEWORK', note: 'Observing techniques and data workflows across the electromagnetic spectrum.', progress: 'COMPLETED' },
    { code: 'COURSE-07', title: 'Interstellar Medium Astronomy', category: 'COURSEWORK', note: 'Interstellar gas, dust, and their physical and chemical processes.', progress: 'COMPLETED' },
    { code: 'COURSE-08', title: 'Galactic Dynamics', category: 'COURSEWORK', note: 'Orbits, gravitational potentials, and dynamical evolution in galaxies.', progress: 'COMPLETED' },
    { code: 'COURSE-09', title: 'Astronomical Spectroscopy', category: 'COURSEWORK', note: 'Spectrum formation, line diagnostics, and physical parameter measurements.', progress: 'COMPLETED' },
    { code: 'COURSE-10', title: 'Introduction to Radio Astronomy', category: 'COURSEWORK', note: 'Radio emission, telescopes, observing, and data fundamentals.', progress: 'COMPLETED' },
    { code: 'COURSE-11', title: 'Observational Cosmology', category: 'COURSEWORK', note: 'Cosmological evidence, distance measurements, and structure evolution.', progress: 'COMPLETED' },
    { code: 'COURSE-12', title: 'Frontiers of the Milky Way', category: 'COURSEWORK', note: 'Milky Way structure, components, and current frontier questions.', progress: 'COMPLETED' },
  ]
  return <section className="workspace section"><PageHead code="05" title="Knowledge Base" subtitle="Notes, coursework, and methods—linked to skills and quests." /><div className="knowledge-layout"><aside className="knowledge-index"><p className="label">KNOWLEDGE INDEX</p>{['ALL ENTRIES','COURSEWORK','PHYSICS','DATA','METHOD','OBSERVATION','SCIENCE','LITERATURE'].map((x,i) => <button className={i === 0 ? 'active' : ''} key={x}>{x}<span>{i === 0 ? entries.length : x === 'COURSEWORK' ? 12 : '·'}</span></button>)}</aside><div className="knowledge-grid">{entries.map(entry => <article className={`knowledge-card ${entry.category === 'COURSEWORK' ? 'course-card' : ''}`} key={entry.code}><div><span>{entry.code}</span><em>{entry.category}</em></div><Library size={22} /><h2>{entry.title}</h2><p>{entry.note}</p><small>{entry.progress}</small></article>)}</div></div></section>
}

function DevLog() {
  const logs = [
    { version: 'v0.7', date: '2026-09-07', title: 'FAST Processing Checkpoint', items: ['Completed an initial FAST data-processing checkpoint', 'Prepared the project to move into scientific analysis', 'Kept unfinished scientific results private'] },
    { version: 'v0.6', date: '2026-08-16', title: 'FAST Data Processing Update', items: ['Updated the public status to FAST data processing', 'Removed unpublished methods, internal workflow details, and specific dataset identifiers', 'Kept unfinished scientific results private'] },
    { version: 'v0.5', date: '2026-07-27', title: 'Research Progress Update', items: ['Updated the public status to ongoing FAST data processing', 'Generalized research notes and dataset descriptions for public viewing', 'Kept internal infrastructure and unpublished details private'] },
    { version: 'v0.4', date: '2026-07-12', title: 'Rebuilt the Site Architecture', items: ['Created eight primary views', 'Merged Progression into Character Status', 'Added Achievements, Knowledge Base, and Dev Log'] },
    { version: 'v0.3', date: '2026-07-12', title: 'Research RPG Core Framework', items: ['Added Research Map', 'Added Skill Tree and Quest Log', 'Added long-term progression feedback'] },
    { version: 'v0.2', date: '2026-07-12', title: 'Selected Lunar Titanium', items: ['Compared four space-metal palettes', 'Selected Lunar Titanium', 'Added the H I spin-flip diagram'] },
    { version: 'v0.1', date: '2026-07-12', title: 'hello astro', items: ['Built the xiii home page', 'Defined the Research Seal identity', 'Set up the local development environment'] },
  ]
  return <section className="workspace section"><PageHead code="07" title="Dev Log" subtitle="What changed, why, and what comes next." /><div className="devlog-list">{logs.map((log, i) => <article className="devlog-entry" key={log.version}><div className="devlog-version"><strong>{log.version}</strong><span>{log.date}</span></div><div><p className="label">{i === 0 ? 'CURRENT BUILD' : 'ARCHIVED BUILD'}</p><h2>{log.title}</h2><ul>{log.items.map(item => <li key={item}>{item}</li>)}</ul></div></article>)}</div></section>
}

function App() {
  const [view, setView] = useState<View>('home')
  const [showEntry, setShowEntry] = useState(true)
  return <ClickSpark sparkColor="#D4A85A" sparkSize={13} sparkRadius={28} sparkCount={9} duration={520} extraScale={1.12}>
    <Shell view={view} setView={setView}>
      {view === 'home' && <Home go={setView} />}
      {view === 'map' && <WorldMap />}
      {view === 'skills' && <SkillTree />}
      {view === 'quests' && <QuestLog />}
      {view === 'achievements' && <Achievements />}
      {view === 'knowledge' && <KnowledgeBase />}
      {view === 'character' && <CharacterStatus />}
      {view === 'devlog' && <DevLog />}
    </Shell>
    {showEntry && <EntryOverlay onEnter={() => setShowEntry(false)} />}
  </ClickSpark>
}

export default App
