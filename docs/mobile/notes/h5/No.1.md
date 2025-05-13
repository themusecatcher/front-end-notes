# `H5`

<BackTop />

## 移动端布局

### 1. **流式布局（百分比布局）**

#### **原理**  

通过百分比单位（`%`）设置元素宽度，使其相对于父容器自适应缩放，适合简单的一维布局。

#### **实现步骤**

1. 外层容器设为 `width: 100%`，撑满屏幕宽度。  
2. 子元素使用百分比宽度，配合 `float` 或 `inline-block` 实现多列排列。  

#### **代码示例**

```css
.container {
  width: 100%;
  overflow: hidden; /* 清除浮动 */
}
.box {
  width: 25%;   /* 四列布局，每列占25% */
  float: left;
  padding: 10px;
  box-sizing: border-box; /* 避免padding影响宽度 */
}
```

#### **优缺点**

- **优点**：简单快速，适合等分布局。  
- **缺点**：  
  - 高度无法自适应，可能导致内容溢出。  
  - 复杂布局难以实现（如垂直居中）。  

#### **适用场景**

- 简单的多列展示（如商品列表）。  
- 需快速适配不同屏幕的基础布局。

### 2. **Flex 弹性布局**

#### **原理**

基于 `CSS3` `display: flex` 实现弹性容器，通过主轴和交叉轴控制子元素排列和空间分配。

#### **核心属性**

- **容器属性**：
  - `flex-direction`：主轴方向（row/column）。  
  - `justify-content`：主轴对齐方式（space-between/center）。  
  - `align-items`：交叉轴对齐方式（stretch/center）。  
- **子项属性**：
  - `flex: 1`：子项按比例分配剩余空间。  

#### **代码示例**

```css
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100vh; /* 垂直居中需容器有高度 */
}
.item {
  flex: 1; /* 等分剩余空间 */
  margin: 0 10px;
}
```

#### **优缺点**

- **优点**：
  - 轻松实现垂直居中、等分空间、自适应排列。  
  - 代码简洁，维护方便。  
- **缺点**：  
  - 旧版本浏览器（如 IE 10 以下）不支持。  

#### **适用场景**

- 导航栏、卡片布局、表单对齐等需要灵活排列的场景。

### 3. **Rem/Em 相对单位布局**

#### **原理**

- **Rem**：相对于根元素（`<html>`）的字体大小。
- **Em**：相对于父元素的字体大小。

通过动态调整根字体大小，实现整体布局等比缩放。

#### **实现步骤**

1. **动态设置根字体大小**：

```js
// 设计稿宽度为 750px，1rem = 100px（方便计算）
document.documentElement.style.fontSize = (window.innerWidth / 7.5) + 'px'
// 监听窗口变化重新计算
window.addEventListener('resize', () => {
  document.documentElement.style.fontSize = (window.innerWidth / 7.5) + 'px'
})
```

2. **CSS 中使用 Rem**：

```css
.box {
  width: 3.75rem; /* 750px 设计稿中 375px → 3.75rem */
  font-size: 0.24rem; /* 24px → 0.24rem */
}
```

3. **工具自动化**（推荐）：

使用 `PostCSS` 插件 `postcss-pxtorem` 自动将 `px` 转换为 `rem`。

```ts
// vite.config.ts
import type { ConfigEnv, UserConfig } from 'vite'
import pxtorem from 'postcss-pxtorem'

export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
  console.log(command, mode)
  return {
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            themeColor: '#1677ff'
          },
          javascriptEnabled: true,
        }
      },
      postcss: {
        plugins: [
          pxtorem({
            rootValue: 75, // 类型：Number | Function；根元素字体大小，默认 16，一般设置为设计稿尺寸 viewWidth 的 1/10（750 => 75 / 375 => 37.5）
            unitPrecision: 5, // 类型：Number；rem 单位允许的小数位数，默认 5
            propList: ['*'], // 类型：Array，需要将 px 单位转换为 rem 单位的属性列表，默认 ['font', 'font-size', 'line-height', 'letter-spacing']
            selectorBlackList: [] // 类型：Array，需要忽略的选择器列表，不会转换 px 单位，默认 []
            replace: true, // 类型：Boolean，默认 true
            exclude: (file: any) => { // 类型：String | Regexp | Function，要忽略并保持 px 单位的文件路径，默认 /node_modules/i
              if (file.includes('h5'))) {
                // 将所有包含 h5 目录中的文件 px 单位转换为 rem 单位
                return false
              }
              return true
            }
          })
        ]
      }
    }
  }
})
```

#### **优缺点**

- **优点**：

  - 精确等比缩放，适配不同分辨率。  
  - 兼容性好（支持到 IE9）。  
- **缺点**：

  - 需动态计算根字体大小（可能引起页面抖动）。  

#### **适用场景**

- 需要严格按设计稿等比缩放的复杂页面。

### 4. **视口单位布局（vw/vh）**

#### **原理**

- **vw**：视口宽度的 `1%`（`1vw = 屏幕宽度的 1/100`）。  
- **vh**：视口高度的 `1%`。  
直接基于视口尺寸进行布局，无需 `JavaScript` 动态计算。

#### **代码示例**

```css
.container {
  width: 100vw; /* 占满屏幕宽度 */
  height: 50vh; /* 占屏幕高度的50% */
}
.title {
  font-size: 4vw; /* 字体大小随屏幕宽度变化 */
}
```

#### **优化技巧**

- 结合 `calc()` 和 `rem` 避免极端尺寸：

```css
.box {
  width: calc(100vw / 7.5); /* 750px 设计稿的 100px */
}
```

#### **优缺点**

- **优点**：
  - 无 `JS` 依赖，纯 `CSS` 实现。  
  - 天然适配屏幕尺寸。  
- **缺点**：
  - 极端屏幕（如超大或超小）需额外控制。  
  - 不支持 `IE9` 及以下。  

#### **适用场景**

- 快速实现与屏幕尺寸强相关的布局（如全屏轮播图）。

### 5. **响应式布局（媒体查询）**

#### **原理**

通过 `@media` 查询针对不同屏幕尺寸应用不同的 `CSS` 规则。

#### **代码示例**

```css
/* 默认样式（移动端） */
.container { padding: 10px; }

/* 平板（768px 以上） */
@media (min-width: 768px) {
  .container { padding: 20px; }
}

/* PC（1024px 以上） */
@media (min-width: 1024px) {
  .container { max-width: 1200px; margin: 0 auto; }
}
```

#### **优缺点**

- **优点**：精准控制不同设备样式。  
- **缺点**：代码量较大，维护成本高。  

#### **适用场景**

- 多端适配（同一套代码适配 PC、平板、手机）。

### 6. **CSS Grid 网格布局**

#### **原理**

通过二维网格系统（`display: grid`）实现复杂布局，支持行和列的灵活控制。

#### **代码示例**

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 三等分列 */
  gap: 10px; /* 列间距 */
}
.item {
  grid-column: span 2; /* 跨两列 */
}
```

#### **优缺点**

- **优点**：强大的二维布局能力，代码简洁。  
- **缺点**：兼容性较差（不支持 IE11 及以下）。  

#### **适用场景**

- 复杂布局（如瀑布流、仪表盘）。

### 7. **移动端适配 Meta 标签**

#### **关键设置**

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
```

- **width=device-width**：视口宽度等于设备宽度。  
- **initial-scale=1.0**：初始缩放比例为 `1:1`。  
- **user-scalable=no**：禁止用户手动缩放（可选）。

### 8. **1px 边框问题解决方案**

#### **问题原因**

`Retina` 屏幕下，`1px` 逻辑像素可能渲染为 `2px` 物理像素。

#### **解决方案**

- **伪元素 + transform 缩放**：

```css
.border-1px {
  position: relative;
}
.border-1px::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1px;
  background: #000;
  transform: scaleY(0.5); /* Y轴缩放50% */
  transform-origin: 0 0;
}
```

### **综合方案推荐**

1. **基础布局**：优先使用 **Flex** + **Grid**。  
2. **适配单位**：结合 **Rem**（动态根字体） + **vw/vh**（视口单位）。  
3. **响应式增强**：通过 **媒体查询** 处理极端分辨率。  
4. **工具链**：  
   - 使用 `postcss-pxtorem` 自动转换 `px` 为 `rem`。  
   - 引入 `normalize.css` 或 `reset.css` 统一默认样式。  

#### **完整配置示例**

```ts
// vite.config.ts
import type { ConfigEnv, UserConfig } from 'vite'
import pxtorem from 'postcss-pxtorem'

export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
  return {
    css: {
      postcss: {
        plugins: [
          pxtorem({
            rootValue: 75, // 类型：Number | Function；根元素字体大小，默认 16，一般设置为设计稿尺寸 viewWidth 的 1/10（750 => 75 / 375 => 37.5）
            unitPrecision: 5, // 类型：Number；rem 单位允许的小数位数，默认 5
            propList: ['*'], // 类型：Array，需要将 px 单位转换为 rem 单位的属性列表，默认 ['font', 'font-size', 'line-height', 'letter-spacing']
            selectorBlackList: [] // 类型：Array，需要忽略的选择器列表，不会转换 px 单位，默认 []
            replace: true, // 类型：Boolean，默认 true
            exclude: (file: any) => { // 类型：String | Regexp | Function，要忽略并保持 px 单位的文件路径，默认 /node_modules/i
              if (file.includes('h5'))) {
                // 将所有包含 h5 目录中的文件 px 单位转换为 rem 单位
                return false
              }
              return true
            }
          })
        ]
      }
    }
  }
})
```

### **对比总结**

| 方案 | 核心优势 | 核心缺点 | 适用场景 |
|--|--|--|--|
| `Flex` | 灵活的一维布局 | 二维布局需结合 Grid | 导航、表单对齐 |
| `Rem` | 精确等比缩放 | 需动态计算根字体 | 复杂设计稿适配 |
| `vw/vh` | 无 `JS` 依赖 | 极端尺寸需额外控制 | 全屏布局 |
| 媒体查询 | 精准多端适配 | 代码冗余 | `PC` + 移动端响应式|
| `Grid`| 强大的二维布局能力| 旧浏览器兼容性差 | 仪表盘、复杂网格|

### **选择建议**

- **简单页面**：`Flex` + 百分比布局。
- **复杂设计稿**：`Rem` + 动态计算根字体 + `PostCSS` 插件。
- **全屏应用**：`vw/vh` + `Flex/Grid`。
- **多端响应式**：媒体查询 + `Flex`。

根据项目需求灵活组合方案，兼顾开发效率和用户体验。
