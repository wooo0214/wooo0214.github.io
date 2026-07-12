# 03 视觉与交互规范

## 已确认方向：NASA × ESO 深空科研终端 × 克制的 RPG

整体像“射电望远镜控制台与星图”，而不是厚重的中世纪游戏。游戏感来自节点、解锁、等级、任务和反馈；科研可信度来自清晰排版、数据感和克制动效。

借鉴 NASA 的任务编号、工程信息层级和公共科学传播感，以及 ESO 的深空影像、观测档案与现代天文视觉。两者只作为风格参考，不直接复制标志、官方版式或受限制素材。

## 视觉关键词

- deep space
- radio signal
- star chart
- scientific instrument
- restrained RPG
- readable dashboard

## 当前采用配色：Meteorite Nickel / 陨铁镍灰

```text
Canvas         #0D0C0B  暖黑背景
Surface 1      #161412  镍铁暗面
Surface 2      #211E1A  陨铁卡片
Metal Edge     #403B35  暖灰边缘
Metal Highlight#746B61  材料反光
Text Primary   #EEE9DF  米白文字
Text Muted     #9F978C  暖灰文字
Signal Copper  #C9835B  活动、在线及当前位置
Signal Neutral #B9B59B  完成状态
```

对比度必须先保证正文阅读，再追求氛围。正文不要使用低对比度灰色或发光字体。

## 字体

- 标题：Space Grotesk 或 Oxanium，提供科技感。
- 正文：Inter 或 Noto Sans SC，保证中英文混排。
- 数字/标签：JetBrains Mono，仅用于等级、坐标、状态与代码感信息。

不要用等宽字体承载长段正文。

## 核心组件

- `CharacterCard`：身份、职业、等级、EXP 和当前区域。
- `MainQuestCard`：唯一高强调卡片。
- `ProgressRail`：阶段进度，不伪造精确百分比。
- `MapNode`：区域、状态、依赖、当前定位。
- `SkillNode`：等级、前置条件与证据。
- `QuestCard`：完成条件、投入和交付物。
- `AchievementBadge`：图标、日期与证据链接。
- `DetailDrawer`：地图或技能节点详情。
- `FilterBar`：分类、状态和搜索。

## 节点状态语言

| 状态 | 外观 | 含义 |
|---|---|---|
| locked | 空心、低对比、锁图标 | 前置条件未满足 |
| available | 清晰边框、小脉冲点 | 现在可以学习 |
| active | 青色外圈、当前位置标签 | 当前正在推进 |
| mastered | 实心、对勾、完成日期 | 有证据支持的掌握 |

## 动效原则

- 页面切换 150–220 ms。
- 当前节点可以有低频信号脉冲，但不能持续闪烁。
- 完成任务时出现一次简短反馈，随后静止。
- 支持 `prefers-reduced-motion`，关闭非必要动画。
- 星点背景应是装饰层，不影响滚动性能与文字可读性。

## 响应式策略

- 1440px：地图与详情侧栏并列。
- 768–1200px：侧栏变抽屉。
- 小于 768px：卡片单列，技能树支持平移与缩放，底部导航固定。
- 所有点击目标至少 44 × 44 px。

## 首页低保真草图

```text
┌──── Nav ────┬────────────────────────────────────────────┐
│ Character   │ RADIO RESEARCH RPG                         │
│ Map         │                                            │
│ Skills      │ ┌ Character ─────┐ ┌ Current Location ──┐ │
│ Quests      │ │ Lv.04 / Class  │ │ H I New Frontier   │ │
│ Awards      │ │ EXP / profile  │ │ [View on Map]      │ │
│ Log         │ └────────────────┘ └─────────────────────┘ │
│             │                                            │
│             │ ┌ MAIN QUEST ────────────────────────────┐ │
│             │ │ Find the first executable H I problem │ │
│             │ │ Foundation → Data → Question → Paper  │ │
│             │ └────────────────────────────────────────┘ │
│             │                                            │
│             │ Active quests      Recently unlocked      │
└─────────────┴────────────────────────────────────────────┘
```
