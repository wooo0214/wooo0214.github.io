import { useMemo, useState } from 'react'
import { ArrowRight, Award, BookOpen, Check, ChevronRight, CircleDot, Compass, Library, LockKeyhole, Map, Orbit, PenLine, Radio, Route, Sparkles, Target, TrendingUp, UserRound, Zap } from 'lucide-react'
import { mapEdges, mapNodes, milestones, quests, site, skillBranches, stages, type Quest } from './data/site'
import hydrogenSpinFlip from '../pic/Hydrogen-SpinFlip.svg.webp'

type View = 'home' | 'map' | 'skills' | 'quests' | 'achievements' | 'knowledge' | 'character' | 'devlog'
const nav: { id: View; label: string; icon: React.ReactNode }[] = [
  { id: 'map', label: 'RESEARCH MAP', icon: <Map size={12} /> },
  { id: 'skills', label: 'SKILL TREE', icon: <Zap size={12} /> },
  { id: 'quests', label: 'QUEST LOG', icon: <BookOpen size={12} /> },
  { id: 'achievements', label: 'ACHIEVEMENTS', icon: <Award size={12} /> },
  { id: 'knowledge', label: 'KNOWLEDGE BASE', icon: <Library size={12} /> },
  { id: 'character', label: 'CHARACTER STATUS', icon: <UserRound size={13} /> },
  { id: 'devlog', label: 'DEV LOG', icon: <PenLine size={12} /> },
]

function Shell({ view, setView, children }: { view: View; setView: (v: View) => void; children: React.ReactNode }) {
  return <main>
    <nav className="topbar appbar" aria-label="主导航">
      <button className="brand brand-button" onClick={() => setView('home')}>xiii<span>·</span></button>
      <div className="nav-links app-nav">{nav.map(item => <button className={view === item.id ? 'selected' : ''} key={item.id} onClick={() => setView(item.id)}>{item.icon}{item.label}</button>)}</div>
      <div className="signal"><span /> SIGNAL ONLINE</div>
    </nav>
    {children}
    <footer><div><strong>xiii</strong><span>研究豹的射电科研档案</span></div><p>OBSERVING · LEARNING · ITERATING</p></footer>
  </main>
}

function PageHead({ code, title, subtitle }: { code: string; title: string; subtitle: string }) {
  return <header className="page-head"><p className="eyebrow">{code} / RESEARCH NAVIGATION SYSTEM</p><h1>{title}</h1><p>{subtitle}</p></header>
}

function Home({ go }: { go: (v: View) => void }) {
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
    <section className="section quick-nav"><button onClick={() => go('map')}><Map /><span>RESEARCH MAP<small>防止迷路的世界地图</small></span><ArrowRight /></button><button onClick={() => go('skills')}><Zap /><span>SKILL TREE<small>查看当前可升级技能</small></span><ArrowRight /></button><button onClick={() => go('character')}><TrendingUp /><span>CHARACTER STATUS<small>查看长期成长反馈</small></span><ArrowRight /></button></section>
  </>
}

function WorldMap() {
  const [selected, setSelected] = useState(mapNodes.find(n => n.status === 'current')!)
  const nodeById = useMemo(() => Object.fromEntries(mapNodes.map(n => [n.id, n])), [])
  return <section className="workspace section"><PageHead code="01" title="Research Map" subtitle="把开放世界拆成可探索区域；当前位置始终可见，远期方向保持存在但不会干扰当前主线。" />
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

function CharacterStatus() {
  return <section className="workspace section"><PageHead code="06" title="Character Status" subtitle="角色面板集中呈现等级、经验、职业、当前状态与长期成长轨迹。把科研反馈周期从几年缩短到每周。" />
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
        <section className="status-list main-status"><p className="label">MAIN QUEST</p><label><span className="status-box" />Find first science problem</label><small>{site.mainQuest}</small></section>
        <section className="status-list"><p className="label">ACTIVE QUESTS</p><label><span className="status-box" />Read 5 H I review papers</label><label><span className="status-box" />Learn FITS cube operations</label><label><span className="status-box" />Reproduce one paper figure</label></section>
        <section className="status-list"><p className="label">UNLOCKED SKILLS</p><label className="checked"><span className="status-box"><Check size={12} /></span>Python</label><label className="checked"><span className="status-box"><Check size={12} /></span>Linux</label><label className="checked"><span className="status-box"><Check size={12} /></span>Git</label><label><span className="status-box" />Pulsar Timing</label><label><span className="status-box" />H I Kinematics</label></section>
      </div>
    </div>
    <div className="character-section-title"><span>LONG-TERM PROGRESSION</span><p>角色状态之外的长期成长轨迹</p></div>
    <div className="progress-layout"><div className="timeline"><p className="label">LONG-TERM TRAJECTORY</p>{milestones.map((m, i) => <div className={`milestone ${m.state}`} key={m.title}><span>{m.state === 'complete' ? <Check /> : i + 1}</span><div><small>{m.date}</small><h3>{m.title}</h3><p>{m.note}</p></div></div>)}</div><aside className="evidence-panel"><p className="label">GROWTH FEEDBACK LOOP</p><h2>行动必须留下证据。</h2><ol><li><BookOpen />完成一次学习或分析</li><li><Sparkles />留下图、代码、笔记或汇报</li><li><Zap />更新技能等级与任务状态</li><li><Orbit />复盘下一条最短路径</li></ol><div className="weekly-box"><small>THIS WEEK</small><strong>完成第一个带坐标与单位的 Moment 0 图</strong><span>奖励：+80 EXP</span></div></aside></div>
  </section>
}

function Achievements() {
  const achievements = [
    { code: 'A-001', title: '进入射电宇宙', note: '加入脉冲星与中性氢射电课题组', date: '2026.07', unlocked: true },
    { code: 'A-002', title: '建立第一张科研地图', note: '完成世界地图、技能树与任务系统框架', date: '2026.07', unlocked: true },
    { code: 'A-003', title: '完成研一课程学习', note: '完成模式识别、辐射过程、恒星、星系、观测、光谱、射电与宇宙学等 12 门研究生课程。', date: '研一', unlocked: true },
    { code: 'A-004', title: 'First Cube', note: '独立读取并检查一个公开 H I 数据立方', date: 'LOCKED', unlocked: false },
    { code: 'A-005', title: 'Figure Reproducer', note: '复现一张论文关键图并解释差异', date: 'LOCKED', unlocked: false },
    { code: 'A-006', title: 'Question Found', note: '形成第一个可执行的 H I 科学问题', date: 'LOCKED', unlocked: false },
    { code: 'A-007', title: 'First Author', note: '完成第一篇一作论文', date: 'BOSS', unlocked: false },
  ]
  return <section className="workspace section"><PageHead code="04" title="Achievements" subtitle="只记录有真实证据的里程碑。成就不是装饰，而是提醒自己已经走过哪些路。" /><div className="achievement-grid">{achievements.map((a, i) => <article className={`achievement-card ${a.unlocked ? 'unlocked' : 'locked'}`} key={a.code}><div className="achievement-medal">{a.unlocked ? <Award /> : <LockKeyhole />}</div><span>{a.code} · {a.date}</span><h2>{a.title}</h2><p>{a.note}</p><small>{a.unlocked ? `UNLOCKED · +${100 + i * 40} EXP` : 'PREREQUISITE NOT MET'}</small></article>)}</div></section>
}

function KnowledgeBase() {
  const entries = [
    { code: 'HI-001', title: 'H I 21 cm 基础', category: 'PHYSICS', note: '自旋翻转、柱密度、光深与亮温。', progress: '3 NOTES' },
    { code: 'DATA-001', title: 'FITS & WCS', category: 'DATA', note: 'Header、坐标轴、单位与速度定义。', progress: '5 NOTES' },
    { code: 'CUBE-001', title: 'Spectral Cube', category: 'METHOD', note: '噪声、通道图、谱线、Moment 与 PV 图。', progress: 'IN PROGRESS' },
    { code: 'OBS-001', title: 'Radio Observation', category: 'OBSERVATION', note: '波束、灵敏度、系统温度、标定与 RFI。', progress: '4 NOTES' },
    { code: 'GAL-001', title: 'H I Galaxy Science', category: 'SCIENCE', note: '气体质量、标度关系、环境与气体循环。', progress: '2 NOTES' },
    { code: 'PAPER-001', title: 'Paper Reading', category: 'LITERATURE', note: '核心文献、综述、经典结果与复现记录。', progress: '7 PAPERS' },
    { code: 'COURSE-01', title: '模式识别与机器学习', category: 'COURSEWORK', note: '模式分类、特征提取与机器学习基础方法。', progress: 'COMPLETED' },
    { code: 'COURSE-02', title: '天体物理中的辐射过程', category: 'COURSEWORK', note: '辐射机制、辐射转移及其天体物理应用。', progress: 'COMPLETED' },
    { code: 'COURSE-03', title: '恒星物理基础', category: 'COURSEWORK', note: '恒星结构、演化与基本物理过程。', progress: 'COMPLETED' },
    { code: 'COURSE-04', title: '星系天文学', category: 'COURSEWORK', note: '星系结构、性质、形成与演化基础。', progress: 'COMPLETED' },
    { code: 'COURSE-05', title: '实测天文基础', category: 'COURSEWORK', note: '天文测量、误差分析与观测方法基础。', progress: 'COMPLETED' },
    { code: 'COURSE-06', title: '多波段天文观测与数据处理', category: 'COURSEWORK', note: '跨波段观测技术及数据处理流程。', progress: 'COMPLETED' },
    { code: 'COURSE-07', title: '星际介质天文学', category: 'COURSEWORK', note: '星际气体、尘埃及其物理与化学过程。', progress: 'COMPLETED' },
    { code: 'COURSE-08', title: '星系动力学', category: 'COURSEWORK', note: '星系中的轨道、势场与动力学演化。', progress: 'COMPLETED' },
    { code: 'COURSE-09', title: '天体光谱学', category: 'COURSEWORK', note: '光谱形成、谱线诊断与物理参数测量。', progress: 'COMPLETED' },
    { code: 'COURSE-10', title: '射电天文导论', category: 'COURSEWORK', note: '射电辐射、望远镜、观测与数据基础。', progress: 'COMPLETED' },
    { code: 'COURSE-11', title: '观测宇宙学', category: 'COURSEWORK', note: '宇宙学观测证据、距离测量与结构演化。', progress: 'COMPLETED' },
    { code: 'COURSE-12', title: '银河系前沿', category: 'COURSEWORK', note: '银河系结构、成员与当前前沿问题。', progress: 'COMPLETED' },
  ]
  return <section className="workspace section"><PageHead code="05" title="Knowledge Base" subtitle="把零散笔记、课程基础与科研方法组织成可以导航、连接到技能和任务的科研百科。" /><div className="knowledge-layout"><aside className="knowledge-index"><p className="label">KNOWLEDGE INDEX</p>{['ALL ENTRIES','COURSEWORK','PHYSICS','DATA','METHOD','OBSERVATION','SCIENCE','LITERATURE'].map((x,i) => <button className={i === 0 ? 'active' : ''} key={x}>{x}<span>{i === 0 ? entries.length : x === 'COURSEWORK' ? 12 : '·'}</span></button>)}</aside><div className="knowledge-grid">{entries.map(entry => <article className={`knowledge-card ${entry.category === 'COURSEWORK' ? 'course-card' : ''}`} key={entry.code}><div><span>{entry.code}</span><em>{entry.category}</em></div><Library size={22} /><h2>{entry.title}</h2><p>{entry.note}</p><small>{entry.progress}</small></article>)}</div></div></section>
}

function DevLog() {
  const logs = [
    { version: 'v0.4', date: '2026-07-12', title: '重构网站信息架构', items: ['建立八个一级页面', 'Progression 合并到 Character Status', '新增成就、知识库与开发日志'] },
    { version: 'v0.3', date: '2026-07-12', title: '科研 RPG 核心框架', items: ['加入 Research Map', '加入 Skill Tree 与 Quest Log', '加入长期成长反馈'] },
    { version: 'v0.2', date: '2026-07-12', title: '确定月面钛灰视觉', items: ['对比四套太空金属配色', '选择 Lunar Titanium', '加入 H I 自旋翻转原理图'] },
    { version: 'v0.1', date: '2026-07-12', title: 'hello astro', items: ['建立 xiii 首页', '确定研究豹身份', '搭建本地开发环境'] },
  ]
  return <section className="workspace section"><PageHead code="07" title="Dev Log" subtitle="记录这个科研操作系统为什么改变、改变了什么，以及下一个版本准备解决什么问题。" /><div className="devlog-list">{logs.map((log, i) => <article className="devlog-entry" key={log.version}><div className="devlog-version"><strong>{log.version}</strong><span>{log.date}</span></div><div><p className="label">{i === 0 ? 'CURRENT BUILD' : 'ARCHIVED BUILD'}</p><h2>{log.title}</h2><ul>{log.items.map(item => <li key={item}>{item}</li>)}</ul></div></article>)}</div></section>
}

function App() {
  const [view, setView] = useState<View>('home')
  return <Shell view={view} setView={setView}>
    {view === 'home' && <Home go={setView} />}
    {view === 'map' && <WorldMap />}
    {view === 'skills' && <SkillTree />}
    {view === 'quests' && <QuestLog />}
    {view === 'achievements' && <Achievements />}
    {view === 'knowledge' && <KnowledgeBase />}
    {view === 'character' && <CharacterStatus />}
    {view === 'devlog' && <DevLog />}
  </Shell>
}

export default App
