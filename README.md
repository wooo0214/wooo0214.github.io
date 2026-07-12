# Radio Research RPG

把个人的射电天文学学习与科研过程，设计成一张可以持续更新的 RPG 世界地图。

当前阶段：**Phase 0 品牌冻结 + 可运行首页骨架**。网站名称为 `xiii`，公开身份是“研究豹（一只在做科研的海豹）”，视觉语言参考 NASA 与 ESO 的深空科研档案感，首页文案为 `hello astro`。

## 本地预览

在 VS Code 中打开本文件夹后，安装依赖并启动本地预览：

```bash
npm install
npm run dev
```

首页内容集中在 `src/data/site.ts`，多数日常文字更新可以从这里开始。

## 项目目标

- 公开展示自己的科研方向、成长路线和当前进度。
- 用世界地图、技能树、任务日志和成就系统降低科研中的迷茫感。
- 内容可在 VS Code 中直接编辑，提交到 GitHub 后自动更新网站。
- 后续可以被其他研究生 fork，替换数据后变成自己的科研 RPG。

## 建议的第一版

第一版只做一个静态网站，使用：

- Vite + React + TypeScript
- Tailwind CSS（或普通 CSS，二选一）
- React Flow：技能树和地图节点
- Lucide：统一图标
- GitHub Pages + GitHub Actions：自动发布
- JSON/TypeScript 数据文件：保存任务、技能与成就

不建议第一版加入账号、数据库、在线编辑器或复杂 3D 地图。先让“访客能看懂、自己能更新、手机能浏览”成立。

## 文档入口

1. [产品与范围](docs/01-product-brief.md)
2. [信息架构与页面](docs/02-information-architecture.md)
3. [视觉与交互规范](docs/03-ui-direction.md)
4. [内容数据设计](docs/04-content-model.md)
5. [开发与发布路线](docs/05-roadmap-and-deployment.md)
6. [UI 参考清单](docs/06-ui-references.md)
7. [可编辑流程图](docs/07-editable-maps.md)
8. [太空灰与金属配色候选](docs/08-metallic-palettes.md)

## 推荐目录（进入开发阶段后）

```text
mysite/
├── docs/                  # 设计文档
├── public/                # favicon、社交分享图等
├── src/
│   ├── components/        # 卡片、进度条、节点等
│   ├── data/              # 经常编辑的科研内容
│   ├── pages/             # 首页、地图、技能树等
│   ├── styles/            # 色彩、字体、动效
│   └── App.tsx
├── .github/workflows/     # GitHub Pages 自动发布
└── README.md
```

## 项目原则

1. **主线优先**：主页第一眼必须回答“我在哪里、正在做什么、下一步是什么”。
2. **公开信息安全**：不放未发表数据、合作者隐私、服务器地址、密钥或内部材料。
3. **游戏感服务于可读性**：可以有氛围，不做难以阅读的全屏特效。
4. **进度不等于自我评价**：等级只表示技能熟练度，不表示个人价值。
5. **先内容，后特效**：每个新增组件都必须帮助理解科研路径。
