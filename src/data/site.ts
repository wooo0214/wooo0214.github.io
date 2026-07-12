export const site = {
  name: 'Wooo', greeting: 'hello astro', identity: '研究豹', identityEn: 'a seal doing research',
  role: 'Radio Astronomy Graduate Student', subclass: 'H I Galaxy Explorer', focus: 'H I & Radio Astronomy',
  location: 'H I 数据语言', level: 4, exp: 1320, nextLevelExp: 2000,
  mainQuest: '找到第一个可执行、可验证、数据可获得的 H I 科学问题',
  status: 'PHASE 1 · EXPLORATION ACTIVE',
}

export type Quest = {
  code: string; title: string; kind: 'MAIN' | 'ACTIVE' | 'SIDE'; status: 'active' | 'planned' | 'complete';
  purpose: string; doneWhen: string[]; deliverable: string; nextAction: string; progress: number; reward: string;
}

export const quests: Quest[] = [
  {
    code: 'MQ-01', title: '定位第一个 H I 科学问题', kind: 'MAIN', status: 'active', progress: 24,
    purpose: '把宽泛的中性氢兴趣收敛成一个数据可得、方法可行、结果可验证的问题。',
    doneWhen: ['完成问题卡：对象、变量、机制、对照组', '确认一套可获取的数据', '完成一次导师可讨论的 10 分钟提案'],
    deliverable: '一页科学问题画布 + 初步数据清单', nextAction: '精读 1 篇 H I 综述并提取 3 个可验证问题', reward: '+600 EXP · 解锁独立项目副本',
  },
  {
    code: 'Q-01', title: '建立 H I 核心文献地图', kind: 'ACTIVE', status: 'active', progress: 35,
    purpose: '建立领域结构感，知道主要问题、经典关系、常见数据与方法分别位于哪里。',
    doneWhen: ['收录 15–20 篇核心文献', '每篇标记问题、数据、方法和结论', '画出文献之间的主题连接'],
    deliverable: '可检索的 H I 文献地图', nextAction: '整理下一篇综述的 5 条主结论', reward: '+180 EXP · 文献导航 Lv2',
  },
  {
    code: 'Q-02', title: '跑通公开 H I 数据立方', kind: 'ACTIVE', status: 'active', progress: 52,
    purpose: '从“知道概念”升级到能独立读取、检查并产生基础 H I 数据产品。',
    doneWhen: ['读取 FITS cube 与 header', '检查噪声、波束、速度轴和异常通道', '生成 spectrum、moment 0/1 与 PV 图'],
    deliverable: '一个可重复运行的分析案例', nextAction: '生成第一个带单位和坐标的 moment 0 图', reward: '+250 EXP · Cube Analysis Lv2',
  },
  {
    code: 'Q-03', title: '复现一张关键论文图', kind: 'ACTIVE', status: 'active', progress: 18,
    purpose: '通过复现理解论文中的样本选择、变量定义、误差和隐藏假设。',
    doneWhen: ['锁定目标图和公开数据', '写出图中每个变量的定义', '解释与原图差异的来源'],
    deliverable: '复现图 + 差异说明 + 可运行代码', nextAction: '选择一篇数据公开且图表定义清楚的论文', reward: '+220 EXP · Reproduction Lv1',
  },
  {
    code: 'SQ-01', title: '射电单位速查卡', kind: 'SIDE', status: 'planned', progress: 0,
    purpose: '降低 Jy、beam、brightness temperature 与通量换算的摩擦。',
    doneWhen: ['整理常用定义', '加入 3 个手算例题'], deliverable: '一页速查卡', nextAction: '建立单位表格', reward: '+60 EXP',
  },
]

export const stages = [
  { name: '射电基础', state: 'complete', note: '基本概念与语言' },
  { name: '数据语言', state: 'current', note: 'FITS · WCS · Cube' },
  { name: 'H I 分析', state: 'next', note: 'Moment · PV · Mass' },
  { name: '科学问题', state: 'locked', note: '假设与验证设计' },
  { name: '独立项目', state: 'locked', note: '完整分析闭环' },
  { name: '第一篇论文', state: 'locked', note: '写作 · 投稿 · 修回' },
]

export const mapNodes = [
  { id: 'foundation', label: '科研基础', zone: '基础工具', x: 8, y: 48, status: 'mastered', detail: 'Python、Linux、Git、LaTeX 与可复现记录。' },
  { id: 'radio', label: '射电基础', zone: '射电入口', x: 28, y: 48, status: 'mastered', detail: 'Jansky、波束、系统温度、灵敏度与辐射传输。' },
  { id: 'instrument', label: '仪器与观测', zone: '观测设施', x: 46, y: 22, status: 'available', detail: '单天线、干涉阵、标定、RFI 与 FAST 观测模式。' },
  { id: 'hi', label: 'H I 数据语言', zone: '当前区域', x: 48, y: 56, status: 'current', detail: '21 cm 物理、FITS cube、速度轴、噪声与基础数据产品。' },
  { id: 'hi-science', label: 'H I 星系科学', zone: '主线区域', x: 70, y: 48, status: 'available', detail: 'H I 质量、标度关系、运动学、环境效应与气体循环。' },
  { id: 'pulsar', label: '脉冲星', zone: '候选区域', x: 48, y: 82, status: 'discovered', detail: '搜索、去色散、折叠、计时与 PTA。' },
  { id: 'transient', label: '瞬变天体', zone: '远期区域', x: 69, y: 82, status: 'locked', detail: 'FRB、射电脉冲、定位与宿主环境。' },
  { id: 'cosmo', label: '21 cm 宇宙学', zone: '远期区域', x: 88, y: 27, status: 'locked', detail: '宇宙黎明、再电离与强度映射。' },
]

export const mapEdges = [
  ['foundation','radio'], ['radio','instrument'], ['radio','hi'], ['instrument','hi-science'],
  ['hi','hi-science'], ['hi','pulsar'], ['pulsar','transient'], ['hi-science','cosmo'],
]

export const skillBranches = [
  {
    name: 'FOUNDATION / 基础工具', skills: [
      { name: 'Python', level: 3, status: 'mastered', proof: '可独立修改分析代码' },
      { name: 'Linux', level: 2, status: 'mastered', proof: 'SSH 与基础命令行' },
      { name: 'Git', level: 2, status: 'available', proof: '项目版本管理' },
      { name: '科研记录', level: 2, status: 'available', proof: 'Markdown / Obsidian' },
    ],
  },
  {
    name: 'DATA / 数据语言', skills: [
      { name: 'FITS & Header', level: 2, status: 'current', proof: '读取并解释 header' },
      { name: 'WCS & Units', level: 1, status: 'current', proof: '坐标和单位转换' },
      { name: 'Data Cube', level: 1, status: 'current', proof: '切片、谱线与噪声' },
      { name: 'Quality Control', level: 0, status: 'locked', proof: '等待 Data Cube Lv2' },
    ],
  },
  {
    name: 'H I SCIENCE / 中性氢', skills: [
      { name: '21 cm Physics', level: 1, status: 'available', proof: '跃迁与柱密度' },
      { name: 'Moment Maps', level: 0, status: 'current', proof: '当前升级目标' },
      { name: 'H I Mass', level: 0, status: 'locked', proof: '需要 Moment Maps Lv1' },
      { name: 'H I Kinematics', level: 0, status: 'locked', proof: '需要 Cube Analysis Lv2' },
    ],
  },
  {
    name: 'RESEARCH / 独立科研', skills: [
      { name: '文献导航', level: 1, status: 'current', proof: '核心文献地图进行中' },
      { name: '图表复现', level: 0, status: 'current', proof: 'Q-03 进行中' },
      { name: '问题设计', level: 0, status: 'locked', proof: '完成文献地图后解锁' },
      { name: '论文叙事', level: 0, status: 'locked', proof: '独立项目后解锁' },
    ],
  },
]

export const milestones = [
  { date: '2026.07', title: '进入射电地图', note: '方向转向 H I 与射电天文学', state: 'complete' },
  { date: 'NOW', title: '建立数据语言', note: 'FITS、WCS、Cube 与基础图像产品', state: 'current' },
  { date: 'NEXT', title: '完成可复现案例', note: '跑通一个公开数据集的分析闭环', state: 'next' },
  { date: 'LATER', title: '确定科学问题', note: '形成一页问题画布并通过讨论', state: 'locked' },
  { date: 'BOSS', title: '第一篇一作论文', note: '研究、写作、投稿与修回', state: 'locked' },
]
