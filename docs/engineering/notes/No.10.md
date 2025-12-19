# Note 10

## 样式隔离（CSS-in-JS & CSS Modules & Scoped CSS & Shadow DOM (Web Components)）

### 1. CSS-in-JS

#### 概念

<br/>

将 `CSS` 样式直接写在 `JavaScript/TypeScript` 代码中，通过运行时或构建时生成唯一的类名来实现样式隔离。

#### 核心实现

```js
// 示例：使用 styled-components
import styled from 'styled-components'

const Button = styled.button`
  background: ${props => props.primary ? 'blue' : 'gray'};
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
`;

// 使用
<Button primary>Click me</Button>
```

#### 特点

- **动态样式**：可以根据组件状态/属性动态生成样式
- **JS完全控制**：样式逻辑可以用 `JavaScript` 表达
- **运行时生成**：大多数方案在运行时生成样式并插入到 `DOM`
- **框架绑定**：通常与 `React` 等框架深度集成

#### 主流库

- **styled-components**
- **Emotion**
- **JSS**

### 2. CSS Modules

#### 概念

<br/>

在构建时（如`Webpack`）将 `CSS` 类名编译为唯一哈希值，实现局部作用域。

#### 实现方式

```css
/* Button.module.css */
.button {
  background: blue;
  color: white;
  padding: 10px 20px;
}
```

```js
// Button.jsx
import styles from './Button.module.css'

function Button() {
  return <button className={styles.button}>Click me</button>
}

// 编译后的HTML类似：
// <button class="Button_button__1a2b3">Click me</button>
```

#### 特点

- **构建时处理**：在打包阶段转换类名
- **真正的局部作用域**：类名经过哈希处理，不会冲突
- **支持预处理器**：可以使用 `Sass/Less` 等
- **简单直观**：编写方式接近传统 `CSS`

### 3. Scoped CSS

#### 概念

<br/>

通过为组件添加唯一的属性选择器，限制样式的作用范围。

#### Vue中的实现

```vue
<template>
  <div class="container">
    <button class="button">Click me</button>
  </div>
</template>

<style scoped>
/* 只会作用于当前组件 */
.container {
  padding: 20px;
}

.button {
  background: blue;
  color: white;
}

/* 编译后类似：
.container[data-v-f3f3eg9] { ... }
.button[data-v-f3f3eg9] { ... }
*/
</style>
```

#### 特点

- **框架集成**：主要在 `Vue` 中使用
- **选择器限制**：通过属性选择器实现作用域
- **子组件限制**：默认不影响子组件内部（除根元素外）

### 4. Shadow DOM（Web Components）

#### 概念

<br/>

浏览器原生支持的 `DOM` 和样式封装技术，创建完全隔离的 `DOM` 子树。

#### 实现

```js
class MyComponent extends HTMLElement {
  constructor() {
    super()
    
    // 创建Shadow DOM
    const shadow = this.attachShadow({ mode: 'open' })
    
    // 添加样式和内容
    shadow.innerHTML = `
      <style>
        /* 这些样式完全隔离，不影响外部 */
        button {
          background: blue;
          color: white;
          padding: 10px 20px;
        }
        /* 外部样式无法影响这里 */
      </style>
      
      <button>Click me</button>
    `
  }
}

customElements.define('my-component', MyComponent)
```

#### 特点

- **完全隔离**：`DOM` 和样式都完全独立
- **原生支持**：浏览器原生特性，无需构建工具
- **真正的封装**：外部无法访问内部 `DOM` 结构
- **事件重定向**：事件需要特别处理才能冒泡到外部

### 对比分析

| 特性 | `CSS-in-JS` | `CSS Modules` | `Scoped CSS` | `Shadow DOM` |
|------|-----------|-------------|------------|------------|
| **作用域** | 运行时生成唯一类名 | 构建时生成唯一类名 | 属性选择器限制 | 完全隔离的 `DOM` 树 |
| **样式封装** | ✓ | ✓ | ✓ | ✓✓（最强） |
| **DOM封装** | ✗ | ✗ | ✗ | ✓ |
| **动态样式** | ✓✓ | 有限 | 有限 | ✓ |
| **构建依赖** | 需要 | 需要 | 需要 | 不需要 |
| **性能** | 运行时开销 | 构建时处理 | 构建时处理 | 原生性能好 |
| **学习曲线** | 中 | 低 | 低 | 中高 |
| **框架绑定** | 通常与 `React` 绑定 | 框架无关 | 主要在 `Vue` | 框架无关 |
| **SSR支持** | 部分库支持 | ✓ | ✓ | 原生支持 |
| **样式继承** | 支持 | 支持 | 有限 | 默认隔离，需手动开放 |

### 使用场景建议

#### 选择`CSS-in-JS`当：

- 项目重度使用 `React`
- 需要高度动态的样式（主题切换、动画等）
- 希望样式与组件逻辑紧密结合
- 不介意一定的运行时开销

#### 选择`CSS Modules`当：

- 希望接近传统 `CSS` 开发体验
- 项目对性能要求较高（减少运行时开销）
- 需要与多种框架配合使用
- 团队更熟悉 `CSS` 预处理器

#### 选择`Scoped CSS`当：

- 使用 `Vue.js` 框架
- 需要简单直接的样式隔离
- 希望保持单文件组件结构

#### 选择`Shadow DOM`当：

- 开发可复用的`Web Components`
- 需要最强的样式和 `DOM` 隔离
- 构建跨框架的组件库
- 不希望依赖构建工具

### 混合使用案例

<br/>

实际项目中经常混合使用多种技术：

```js
// 示例：在Web Components中使用CSS-in-JS
class MyComponent extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })
    
    // 使用CSS-in-JS库生成样式
    const styles = css`
      button {
        background: ${this.getAttribute('color') || 'blue'};
        color: white;
      }
    `
    
    shadow.innerHTML = `
      <style>${styles}</style>
      <button><slot></slot></button>
    `
  }
}
```

### 总结

<br/>

每种技术都有其适用场景，选择时需要考虑：

1. **项目需求**：是否需要完全的 `DOM` 隔离？样式的动态程度如何？
2. **技术栈**：使用的框架对哪种方案支持更好？
3. **团队熟悉度**：团队成员对哪种技术更熟悉？
4. **性能要求**：是否可以接受运行时开销？

## [Element.attachShadow()](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/attachShadow)

`Element.attachShadow()` 方法给指定的元素挂载一个 `Shadow DOM`，并且返回对 `ShadowRoot` 的引用。

### 可以被挂载的 `shadow DOM` 元素

<br/>

要注意的是，不是每一种类型的元素都可以附加到 `shadow root`（影子根）下面。出于安全考虑，一些元素不能使用 `shadow DOM`（例如`<a>`），以及许多其他的元素。下面是一个可以挂载 `shadow root` 的元素列表：

- 任何带有有效的名称且可独立存在的（`autonomous`）自定义元素
- `<article>`
- `<aside>`
- `<blockquote>`
- `<body>`
- `<div>`
- `<footer>`
- `<h1>`
- `<h2>`
- `<h3>`
- `<h4>`
- `<h5>`
- `<h6>`
- `<header>`
- `<main>`
- `<nav>`
- `<p>`
- `<section>`
- `<span>`

### 语法

```js
attachShadow(options)
```

### 参数

`options`: 一个包括下列字段的对象：
  - `mode`<br/>
    指定 `Shadow DOM` 树封装模式的字符串，可以是以下值：
    - `open`: `shadow root` 元素可以从 `js` 外部访问根节点，例如使用 `Element.shadowRoot`:

    ```js
    element.attachShadow({ mode: "open" })
    element.shadowRoot // 返回一个 ShadowRoot 对象
    ```

    - `closed`: 拒绝从 `js` 外部访问关闭的 `shadow root` 节点

    ```js
    element.attachShadow({ mode: "closed" })
    element.shadowRoot // 返回 null
    ```

  - `delegatesFocus` <Tag :bordered="false" color="cyan">可选</Tag><br/>
    一个布尔值，当设置为 `true` 时，指定减轻自定义元素的聚焦性能问题行为。当 `shadow DOM` 中不可聚焦的部分被点击时，让第一个可聚焦的部分成为焦点，并且 `shadow host`（影子主机）将提供所有可用的 `:focus` 样式。

### 返回值

<br/>

返回一个 `ShadowRoot` 对象或者 `null`。
