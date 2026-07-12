# 04 内容数据设计

## 原则

页面不直接写死科研内容。任务、技能、地图和成就分别保存在 `src/data/` 中，更新内容时无需修改组件。

## 建议文件

```text
src/data/
├── profile.ts
├── map.ts
├── skills.ts
├── quests.ts
├── achievements.ts
└── changelog.ts
```

## 技能数据示例

```ts
export type Skill = {
  id: string;
  name: string;
  category: 'foundation' | 'radio' | 'hi' | 'pulsar' | 'writing';
  level: 0 | 1 | 2 | 3 | 4 | 5;
  status: 'locked' | 'available' | 'active' | 'mastered';
  prerequisites: string[];
  evidence: { label: string; url?: string }[];
  nextLevelRequirement: string;
  visibility: 'public' | 'summary' | 'private';
};
```

## 任务数据示例

```ts
export type Quest = {
  id: string;
  title: string;
  kind: 'main' | 'active' | 'side';
  status: 'planned' | 'active' | 'blocked' | 'completed';
  purpose: string;
  doneWhen: string[];
  deliverable: string;
  prerequisites: string[];
  estimatedSessions?: number;
  completedAt?: string;
  evidenceUrl?: string;
  visibility: 'public' | 'summary' | 'private';
};
```

## 地图节点示例

```ts
export type ResearchNode = {
  id: string;
  label: string;
  area: 'foundation' | 'instrument' | 'hi' | 'pulsar' | 'transient' | 'continuum' | 'cosmology21cm';
  summary: string;
  status: 'undiscovered' | 'discovered' | 'exploring' | 'mastered';
  prerequisites: string[];
  relatedSkills: string[];
  relatedQuests: string[];
  x: number;
  y: number;
};
```

## 数据维护规则

- 所有 ID 使用稳定的英文短名，不随标题变化。
- 日期使用 `YYYY-MM-DD`。
- 只有存在可描述的成果或证据时才标记 `mastered`。
- 公开构建前过滤 `visibility: private`。
- 不把百分比当作科学能力的精确测量；优先使用阶段和完成条件。

## 第一批真实内容

### 当前主线

`找到第一个可执行、可验证、数据可获得的 H I 科学问题。`

### 三个 Active Quests

1. 建立 15–20 篇 H I 核心文献的结构化阅读清单。
2. 完成一个公开 H I 数据立方的读取、质控、moment map 与谱线提取。
3. 复现一篇论文中的一张关键图，并记录差异来源。

### 首页阶段轨道

`射电基础 → 数据语言 → H I 分析 → 科学问题 → 独立项目 → 第一篇论文`

