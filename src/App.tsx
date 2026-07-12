import { useMemo, useState } from 'react'
import { ArrowRight, BookOpen, Check, ChevronRight, CircleDot, Compass, LockKeyhole, Map, Orbit, Radio, Route, Sparkles, Target, TrendingUp, Zap } from 'lucide-react'
import { mapEdges, mapNodes, milestones, quests, site, skillBranches, stages, type Quest } from './data/site'
import hydrogenSpinFlip from '../pic/Hydrogen-SpinFlip.svg.webp'

type View = 'overview' | 'map' | 'quests' | 'skills' | 'progression'
const nav: { id: View; label: string }[] = [
  { id: 'overview', label: 'OVERVIEW' }, { id: 'map', label: 'WORLD MAP' },
  { id: 'quests', label: 'QUEST LOG' }, { id: 'skills', label: 'SKILL TREE' },
  { id: 'progression', label: 'PROGRESSION' },
]

function Shell({ view, setView, children }: { view: View; setView: (v: View) => void; children: React.ReactNode }) {
  return <main>
    <nav className="topbar appbar" aria-label="主导航">
      <button className="brand brand-button" onClick={() => setView('overview')}>xiii<span>·</span></button>
      <div className="nav-links app-nav">{nav.map(item => <button className={view === item.id ? 'selected' : ''} key={item.id} onClick={() => setView(item.id)}>{item.label}</button>)}</div>
      <div className="signal"><span /> SIGNAL ONLINE</div>
    </nav>
    {children}
    <footer><div><strong>xiii</strong><span>研究豹的射电科研档案</span></div><p>OBSERVING · LEARNING · ITERATING</p></footer>
  </main>
}

function PageHead({ code, title, subtitle }: { code: string; title: string; subtitle: string }) {
  return <header className="page-head"><p className="eyebrow">{code} / RESEARCH NAVIGATION SYSTEM</p><h1>{title}</h1><p>{subtitle}</p></header>
}

function Overview({ go }: { go: (v: View) => void }) {
  const next = quests.find(q => q.kind === 'MAIN')!
  return <>
    <section className="hero dashboard-hero">
      <div className="hero-copy"><p className="eyebrow">XI–III / CURRENT SAVE</p><h1>{site.greeting}<span className="dot">.</span></h1><p className="intro">我是<span>{site.identity}</span>，{site.identityEn}。<br />正在射电宇宙里寻找问题、信号与答案。</p></div>
      <div className="status-deck">
        <div className="you-are-here"><div className="pulse-ring"><CircleDot size={25} /></div><p className="label">YOU ARE HERE / 当前所在位置</p><h2>{site.location}</h2><span>射电基础 → 数据语言 → H I 分析</span><button onClick={() => go('map')}>在地图中定位 <ArrowRight size={15} /></button></div>
        <div className="mini-character"><span>SUBJECT XIII</span><strong>LV. 0{site.level}</strong><small>{site.exp} / {site.nextLevelExp} EXP</small></div>
      </div>
    </section>
    <section className="ticker"><span>{site.status}</span><span>YOU ARE HERE · H I DATA</span><span>NEXT · MOMENT 0</span><span>1420.405 MHz</span></section>
    <section className="section science-signal">
      <figure className="spin-flip-figure">
        <div className="spin-flip-image"><img src={hydrogenSpinFlip} alt="中性氢原子质子与电子发生自旋翻转并发射 21 厘米谱线光子的示意图" /></div>
        <figcaption>
          <p className="label">SIGNAL ORIGIN / 21 CM H I LINE</p>
          <span className="frequency">1420.405<span>MHz</span></span>
          <h2>Hydrogen spin-flip transition</h2>
          <p>当中性氢基态中电子与质子的自旋方向由平行变为反平行时，会释放对应波长约 21 cm 的光子。这条谱线是我们描绘星系中性氢气体的基础信号。</p>
          <div className="signal-facts"><span>λ ≈ 21.1 cm</span><span>NEUTRAL HYDROGEN</span><span>RADIO LINE</span></div>
          <p className="image-credit">图片来源：<a href="https://en.wikipedia.org/wiki/Hydrogen_line" target="_blank" rel="noreferrer">Wikipedia</a></p>
        </figcaption>
      </figure>
    </section>
    <section className="section overview-grid">
      <article className="next-quest-panel"><div className="panel-kicker"><Target size={17} /><span>NEXT QUEST / 下一步任务</span></div><p className="quest-code">{next.code} · MAIN QUEST</p><h2>{next.nextAction}</h2><p>{next.purpose}</p><button onClick={() => go('quests')}>打开任务攻略 <ChevronRight size={16} /></button></article>
      <article className="route-panel"><div className="panel-kicker"><Route size={17} /><span>MISSION ROUTE</span></div>{stages.map((s, i) => <div className={`route-row ${s.state}`} key={s.name}><span>{s.state === 'complete' ? <Check size={14} /> : String(i + 1).padStart(2,'0')}</span><div><strong>{s.name}</strong><small>{s.note}</small></div></div>)}</article>
    </section>
    <section className="section quick-nav"><button onClick={() => go('map')}><Map /><span>WORLD MAP<small>防止迷路的世界地图</small></span><ArrowRight /></button><button onClick={() => go('skills')}><Zap /><span>SKILL TREE<small>查看当前可升级技能</small></span><ArrowRight /></button><button onClick={() => go('progression')}><TrendingUp /><span>PROGRESSION<small>查看长期成长反馈</small></span><ArrowRight /></button></section>
  </>
}

function WorldMap() {
  const [selected, setSelected] = useState(mapNodes.find(n => n.status === 'current')!)
  const nodeById = useMemo(() => Object.fromEntries(mapNodes.map(n => [n.id, n])), [])
  return <section className="workspace section"><PageHead code="01" title="World Map" subtitle="把开放世界拆成可探索区域；当前位置始终可见，远期方向保持存在但不会干扰当前主线。" />
    <div className="world-layout"><div className="world-board">
      <div className="map-legend"><span><i className="mastered" />MASTERED</span><span><i className="current" />YOU ARE HERE</span><span><i className="available" />AVAILABLE</span><span><i className="locked" />LOCKED</span></div>
      <svg className="edge-layer" viewBox="0 0 100 100" preserveAspectRatio="none">{mapEdges.map(([a,b]) => <line key={a+b} x1={nodeById[a].x} y1={nodeById[a].y} x2={nodeById[b].x} y2={nodeById[b].y} />)}</svg>
      {mapNodes.map(node => <button key={node.id} onClick={() => setSelected(node)} style={{ left: `${node.x}%`, top: `${node.y}%` }} className={`research-node ${node.status} ${selected.id === node.id ? 'selected' : ''}`}><span>{node.status === 'locked' ? <LockKeyhole size={13} /> : node.status === 'current' ? <CircleDot size={14} /> : <Radio size={13} />}</span><strong>{node.label}</strong><small>{node.zone}</small></button>)}
    </div><aside className="detail-panel"><p className="label">SELECTED REGION</p><div className={`status-chip ${selected.status}`}>{selected.status}</div><h2>{selected.label}</h2><p>{selected.detail}</p>{selected.status === 'current' && <div className="here-callout"><CircleDot size={18} /><div><strong>YOU ARE HERE</strong><span>当前主线正在此区域推进</span></div></div>}<h3>区域行动</h3><ul><li>查看相关技能与前置条件</li><li>绑定一个可交付的任务</li><li>完成证据后更新探索状态</li></ul></aside></div>
  </section>
}

function QuestLog() {
  const [selectedCode, setSelectedCode] = useState('MQ-01')
  const [filter, setFilter] = useState<'ALL' | Quest['kind']>('ALL')
  const selected = quests.find(q => q.code === selectedCode)!
  const visible = quests.filter(q => filter === 'ALL' || q.kind === filter)
  return <section className="workspace section"><PageHead code="02" title="Quest Log" subtitle="每个任务都必须回答：为什么做、做到什么算完成、留下什么交付物，以及今天的下一步。" />
    <div className="filter-row">{(['ALL','MAIN','ACTIVE','SIDE'] as const).map(f => <button className={filter === f ? 'active' : ''} onClick={() => setFilter(f)} key={f}>{f}</button>)}</div>
    <div className="quest-layout"><div className="quest-list">{visible.map(q => <button className={`quest-list-item ${selectedCode === q.code ? 'selected' : ''}`} onClick={() => setSelectedCode(q.code)} key={q.code}><div><span>{q.code}</span><em>{q.kind}</em></div><h3>{q.title}</h3><div className="progress-track"><i style={{ width: `${q.progress}%` }} /></div><small>{q.progress}% · {q.status}</small></button>)}</div>
      <article className="quest-detail"><div className="quest-detail-head"><span>{selected.code} · {selected.kind} QUEST</span><strong>{selected.progress}%</strong></div><h2>{selected.title}</h2><p className="quest-purpose">{selected.purpose}</p><div className="next-action"><Compass size={20} /><div><small>NEXT ACTION / 下一步</small><strong>{selected.nextAction}</strong></div></div><h3>完成条件</h3><ul className="check-list">{selected.doneWhen.map(item => <li key={item}><span /><p>{item}</p></li>)}</ul><div className="quest-meta"><div><small>DELIVERABLE</small><strong>{selected.deliverable}</strong></div><div><small>REWARD</small><strong>{selected.reward}</strong></div></div></article>
    </div>
  </section>
}

function SkillTree() {
  return <section className="workspace section"><PageHead code="03" title="Skill Tree" subtitle="等级不是自我评价，而是可验证的熟练度。当前可升级技能用琥珀色标记，锁定技能显示前置要求。" />
    <div className="skill-toolbar"><span><i className="current" /> CURRENT UPGRADE</span><span><i className="mastered" /> UNLOCKED</span><span><i className="locked" /> PREREQUISITE NEEDED</span></div>
    <div className="skill-tree">{skillBranches.map((branch, bi) => <section className="skill-branch" key={branch.name}><header><span>0{bi + 1}</span><h2>{branch.name}</h2></header><div className="skill-chain">{branch.skills.map((skill, i) => <div className={`skill-node ${skill.status}`} key={skill.name}>{i > 0 && <i className="skill-connector" />}<div className="skill-orb">{skill.status === 'locked' ? <LockKeyhole size={18} /> : <Zap size={18} />}</div><div><small>LV.{skill.level} / 5</small><h3>{skill.name}</h3><p>{skill.proof}</p></div></div>)}</div></section>)}</div>
  </section>
}

function Progression() {
  const completed = quests.filter(q => q.status === 'complete').length
  return <section className="workspace section"><PageHead code="04" title="Progression" subtitle="把反馈周期从几年缩短到每周：记录证据、技能升级、完成交付物和关键里程碑。" />
    <div className="progress-summary"><article><span>LEVEL</span><strong>0{site.level}</strong><small>RADIO EXPLORER</small></article><article className="exp-card"><span>TOTAL EXPERIENCE</span><strong>{site.exp} <i>/ {site.nextLevelExp} EXP</i></strong><div className="progress-track"><i style={{ width: `${site.exp/site.nextLevelExp*100}%` }} /></div></article><article><span>QUESTS COMPLETE</span><strong>{String(completed).padStart(2,'0')}</strong><small>FRAMEWORK STARTED</small></article></div>
    <div className="progress-layout"><div className="timeline"><p className="label">LONG-TERM TRAJECTORY</p>{milestones.map((m, i) => <div className={`milestone ${m.state}`} key={m.title}><span>{m.state === 'complete' ? <Check /> : i + 1}</span><div><small>{m.date}</small><h3>{m.title}</h3><p>{m.note}</p></div></div>)}</div><aside className="evidence-panel"><p className="label">GROWTH FEEDBACK LOOP</p><h2>行动必须留下证据。</h2><ol><li><BookOpen />完成一次学习或分析</li><li><Sparkles />留下图、代码、笔记或汇报</li><li><Zap />更新技能等级与任务状态</li><li><Orbit />复盘下一条最短路径</li></ol><div className="weekly-box"><small>THIS WEEK</small><strong>完成第一个带坐标与单位的 Moment 0 图</strong><span>奖励：+80 EXP</span></div></aside></div>
  </section>
}

function App() {
  const [view, setView] = useState<View>('overview')
  return <Shell view={view} setView={setView}>{view === 'overview' && <Overview go={setView} />}{view === 'map' && <WorldMap />}{view === 'quests' && <QuestLog />}{view === 'skills' && <SkillTree />}{view === 'progression' && <Progression />}</Shell>
}

export default App
