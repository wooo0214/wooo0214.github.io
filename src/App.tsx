import { ArrowUpRight, BookOpen, CheckCircle2, Map, Orbit, Radio, Sparkles } from 'lucide-react'
import { activeQuests, site, stages } from './data/site'

function App() {
  return (
    <main>
      <nav className="topbar" aria-label="主导航">
        <a className="brand" href="#top" aria-label="xiii 首页">xiii<span>·</span></a>
        <div className="nav-links">
          <a href="#mission">MISSION</a>
          <a href="#quests">QUESTS</a>
          <a href="#map">MAP</a>
        </div>
        <div className="signal"><span /> SIGNAL ONLINE</div>
      </nav>

      <section className="hero" id="top">
        <div className="orbit orbit-one" />
        <div className="orbit orbit-two" />
        <div className="hero-copy">
          <p className="eyebrow">XI–III / RADIO RESEARCH ARCHIVE</p>
          <h1>{site.greeting}<span className="dot">.</span></h1>
          <p className="intro">
            我是<span>{site.identity}</span>，{site.identityEn}。<br />
            正在射电宇宙里寻找问题、信号与答案。
          </p>
          <a className="primary-action" href="#mission">
            ENTER RESEARCH MAP <ArrowUpRight size={17} />
          </a>
        </div>

        <div className="seal-console" aria-label="研究豹角色状态">
          <div className="console-head">
            <span>SUBJECT XIII</span><span>ACTIVE</span>
          </div>
          <div className="seal-mark" aria-hidden="true">
            <span className="seal-face">•ᴥ•</span>
            <div className="scanline" />
          </div>
          <div className="console-data">
            <div><small>CLASS</small><strong>{site.identity}</strong></div>
            <div><small>FIELD</small><strong>H I / RADIO</strong></div>
            <div><small>LEVEL</small><strong>0{site.level}</strong></div>
          </div>
        </div>
      </section>

      <section className="ticker" aria-label="科研状态">
        <span>{site.status}</span><span>RA 13:21:04</span><span>DEC +21° 06′</span><span>1420.405 MHz</span>
      </section>

      <section className="mission section" id="mission">
        <header className="section-header">
          <div><span>01</span><p>CURRENT MISSION</p></div>
          <Orbit size={24} />
        </header>
        <div className="mission-grid">
          <article className="mission-card">
            <p className="label">MAIN QUEST / 当前主线</p>
            <h2>{site.mainQuest}</h2>
            <div className="location"><Radio size={16} /> CURRENT LOCATION · {site.location}</div>
          </article>
          <div className="stage-panel">
            <p className="label">MISSION TRAJECTORY</p>
            <ol>
              {stages.map((stage, index) => (
                <li className={index < 2 ? 'complete' : index === 2 ? 'active' : ''} key={stage}>
                  <span>{index < 2 ? <CheckCircle2 size={15} /> : String(index + 1).padStart(2, '0')}</span>
                  <p>{stage}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="section" id="quests">
        <header className="section-header">
          <div><span>02</span><p>ACTIVE QUESTS</p></div>
          <BookOpen size={22} />
        </header>
        <div className="quest-grid">
          {activeQuests.map((quest, index) => (
            <article className="quest-card" key={quest.code}>
              <div className="quest-top"><span>{quest.code}</span><span>0{index + 1}</span></div>
              <h3>{quest.title}</h3>
              <p>{quest.meta}</p>
              <div className="quest-line"><span style={{ width: `${28 + index * 17}%` }} /></div>
            </article>
          ))}
        </div>
      </section>

      <section className="map-preview section" id="map">
        <header className="section-header">
          <div><span>03</span><p>RESEARCH UNIVERSE</p></div>
          <Map size={22} />
        </header>
        <div className="map-canvas">
          <div className="map-copy">
            <p className="label">MAP PREVIEW / PHASE 0</p>
            <h2>从射电基础，航向中性氢宇宙。</h2>
            <p>完整研究地图、技能树与任务系统将在下一阶段接入。</p>
          </div>
          <div className="nodes" aria-hidden="true">
            <span className="node n1">射电基础</span>
            <span className="node n2 active"><Sparkles size={14} /> H I</span>
            <span className="node n3">脉冲星</span>
            <span className="node n4">21 cm</span>
            <i className="link l1" /><i className="link l2" /><i className="link l3" />
          </div>
        </div>
      </section>

      <footer>
        <div><strong>xiii</strong><span>研究豹的射电科研档案</span></div>
        <p>OBSERVING · LEARNING · ITERATING</p>
      </footer>
    </main>
  )
}

export default App
