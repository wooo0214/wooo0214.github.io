# 08 太空灰与金属质感配色候选

目标：去除当前版本偏蓝、偏机构官网的“政府科技感”，保留深空与科研气质，改用低饱和灰阶、材料反光和少量信号色。

## 设计原则

- 蓝色不再承担大面积背景，只作为极少量状态提示。
- 金属感主要来自相邻灰阶、边缘高光和表面纹理，不使用俗艳的银色渐变。
- 页面最多保留一个主强调色和一个状态色。
- 卡片与背景的明度差保持克制，但正文对比度仍需清晰。
- 不直接使用 NASA 或 ESO 的 Logo、官方标志或受限制品牌元素。

## 方案 A：Lunar Titanium / 月面钛灰（推荐）

感觉：月面设备、钛合金外壳、安静、冷峻、专业，但不像政府网站。

```css
--canvas: #0B0C0E;
--surface-1: #121417;
--surface-2: #1A1D21;
--metal-edge: #343940;
--metal-highlight: #697079;
--text-primary: #ECEAE5;
--text-muted: #979A9E;
--accent: #D4A85A;
--signal: #A7B7A2;
```

使用建议：

- 主背景使用接近黑色的中性石墨灰。
- 卡片边缘使用一条暗钛灰和一条极淡顶部高光。
- 琥珀金只用于当前位置、主线和交互焦点。
- 星点改成暖白与冷灰，不再使用蓝色星点。

优点：最符合“研究豹 + 科研档案”，耐看且容易形成个人辨识度。

## 方案 B：Brushed Aluminium / 拉丝铝

感觉：ESO 望远镜圆顶、精密仪器面板、冷白金属与深灰结构。

```css
--canvas: #111214;
--surface-1: #191B1E;
--surface-2: #23262A;
--metal-edge: #484D52;
--metal-highlight: #8C9298;
--text-primary: #F1F1EE;
--text-muted: #A5A8AA;
--accent: #C9D0D4;
--signal: #D77A45;
```

使用建议：

- 主按钮不填蓝色，使用银灰描边和哑光表面。
- 橙色只作为设备警示灯、活动节点和进度刻度。
- 背景增加非常微弱的水平拉丝纹理，透明度低于 4%。

优点：金属感最明显，像大型观测设备。

风险：银色高光使用过多会像汽车或游戏启动器。

## 方案 C：Carbon Observatory / 碳黑观测站

感觉：消光黑设备、碳纤维、夜间观测控制室，视觉最克制。

```css
--canvas: #070707;
--surface-1: #0F0F10;
--surface-2: #171719;
--metal-edge: #2B2B2E;
--metal-highlight: #56565C;
--text-primary: #F2F0EA;
--text-muted: #88888E;
--accent: #B7FF5A;
--signal: #E4B65D;
```

使用建议：

- 以黑、暖白和不同亮度的灰为主。
- 荧光黄绿色仅用于在线状态、选中技能和一个主要按钮。
- 装饰网格和轨道线降低到几乎不可见。

优点：最不像机构官网，阅读注意力集中，带实验室设备感。

风险：处理不好容易显得过于电竞，因此荧光色必须非常少。

## 方案 D：Meteorite Nickel / 陨铁镍灰

感觉：陨石切面、镍铁合金、略带暖褐的深空材料，最具叙事性。

```css
--canvas: #0D0C0B;
--surface-1: #161412;
--surface-2: #211E1A;
--metal-edge: #403B35;
--metal-highlight: #746B61;
--text-primary: #EEE9DF;
--text-muted: #9F978C;
--accent: #C9835B;
--signal: #B9B59B;
```

使用建议：

- 使用暖石墨背景与暗铜色交互状态。
- 卡片顶部可以出现极淡的不规则材料反光。
- 当前 H I 节点使用低饱和铜橙，不使用青蓝光晕。

优点：最独特、最有人格，适合“研究豹”而不是标准科研机构。

风险：与传统太空蓝距离最大，需要用星图、坐标和观测文案维持天文语境。

## 建议选择

第一推荐：**方案 A 月面钛灰**。它兼顾深空、金属、科研可信度和个人感，适合长时间阅读。

第二推荐：**方案 D 陨铁镍灰**。如果希望网站更有“研究豹个人宇宙”的独特气质，可以选它。

## 金属表面实现方式

建议只使用 CSS 表达，不需要下载金属纹理图片：

```css
.metal-surface {
  background:
    linear-gradient(180deg, rgba(255,255,255,.035), transparent 28%),
    linear-gradient(135deg, var(--surface-2), var(--surface-1));
  border: 1px solid var(--metal-edge);
  box-shadow:
    inset 0 1px rgba(255,255,255,.035),
    0 24px 70px rgba(0,0,0,.28);
}
```

避免：高亮银色大渐变、镜面反射、粗重斜纹、蓝紫霓虹包边。

## 参考依据

- NASA Brand Guidelines：黑、灰、银均是其标志体系认可的背景类型，同时官方标志不得被第三方当作自身品牌使用。
  https://www.nasa.gov/nasa-brand-center/brand-guidelines/
- NASA Graphics Standards Manual：历史视觉系统使用 NASA warm gray，可参考其低饱和中性色思路。
  https://www.nasa.gov/wp-content/uploads/2015/01/nasa_graphics_manual_nhb_1430-2_jan_1976.pdf
- ESO VLT dome：金属支架、镜面设备和深灰结构形成真实观测设施的材料语言。
  https://eso.org/public/images/vlt_atudorica003/
- ESO ELT dome：钢结构与混凝土圆顶适合参考大尺度工业灰阶和空间层次。
  https://www.eso.org/public/finland/images/elt-hudepohl-aug2023-inside-dome/

