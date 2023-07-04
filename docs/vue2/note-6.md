# Note 6

## 水平垂直居中

```css
/* 水平垂直居中方法①：弹性布局，随内容增大高度，并自适应水平垂直居中 */
.flex-hv-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
/* 水平垂直居中方法②：相对定位，随内容增大高度，并自适应水平垂直居中 */
.relative-hv-center {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
```

## 设置 `input` & `textarea` 的 `placeholder`样式

```css
input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
  font-size: 14px; color: #999;
}
input:-moz-placeholder, textarea:-moz-placeholder {
  font-size: 14px; color: #999;
}
input::-moz-placeholder, textarea::-moz-placeholder {
  font-size: 14px; color: #999;
}
input:-ms-input-placeholder, textarea:-ms-input-placeholder {
  font-size: 14px; color: #999;
}
```

## 监听对象中某个属性值的变化

*监听当前路由对象 `$route`*

- 直接监听整个对象变化

```js
watch:{
  $route (to, from) {
    console.log('to:', to)
    console.log('query:', to.query)
  }
}
```

*监听普通对象 `player.name` 值的变化*

- 使用计算属性，监听单一属性变化

```js
computed: {
  name () {
    return this.player.name 
  }        
}
watch: {
  name (to, from) {
    console.log('to:', to)
  }
}
```

- 使用 `handler` 监听单一属性变化

```js
watch: {
  'player.name': {
    handler (to, from) {
      console.log('to:', to)
    }
  }
}
```

- 使用 `deep` 属性，监听整个对象的变化

```js
watch: {
  player: {
    handler (to, from) {
      console.log('to:', to)
    },
    deep: true
  }
}
```

## js判断对象是否为空

```js
const data = {}
if (JSON.stringify(data) === '{}') {
  return true
}
```

## CSS的大于号选择器（`>`）

```html
<h1>
  This is
  <strong>very</strong> <strong>very</strong>
  important.
</h1>
<h1>
  This is
  <em>really <strong>very</strong></em>
  important.
</h1>
```

```css
/*
  即选择h1标签下，第一个子元素是strong标签的
  第二个<h1>第一个子元素是<em>所以<strong>元素不受影响
*/
h1 > strong {
  color: red;
}
```

## js的 `Date` 对象获取当前天的起始和结束时间戳

- `setHours()` 用于设置指定的时间的小时字段
- 返回值：设置后的日期的毫秒表示
- 参数：
  - `hour`: 必需。表示小时的数值，介于 0（午夜） ~ 23（晚上11点） 之间，以本地时间计（下同）。
  - `min`: 可选。表示分钟的数值，介于 0 ~ 59 之间。在 EMCAScript 标准化之前，不支持该参数。
  - `sec`: 可选。表示秒的数值，介于 0 ~ 59 之间。在 EMCAScript 标准化之前，不支持该参数。
  - `millisec`: 可选。表示毫秒的数值，介于 0 ~ 999之间。在 EMCAScript 标准化之前，不支持该参数。

```js
var startTimestamp = new Date().setHours(0, 0, 0, 0)
var endTimestamp = new Date().setHours(23, 59, 59, 999)
```

## js在字符串中添加换行符

```html
<div class="str">{{ str }}</div>
```

```css
const str = 'hello \n world'
.str {
  white-space: pre; // 或者 pre-wrap;  pre-line;
}
```

- `white-space` [参考文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/white-space)，设置如何处理元素中的空白。

属性值 | 描述
-- | --
`normal` | 默认。连续的空白符会被合并，换行符会被当作空白符来处理。换行在填充「行框盒子 (line boxes)」时是必要。
`nowrap` | 和 normal 一样，连续的空白符会被合并。但文本内的换行无效。
`pre` | 连续的空白符会被保留。在遇到换行符或者 `<br>` 元素时才会换行。
`pre-wrap` | 连续的空白符会被保留。在遇到换行符或者 `<br> `元素，或者需要为了填充「行框盒子 (line boxes)」时才会换行。
`pre-line` | 连续的空白符会被合并。在遇到换行符或者 `<br>` 元素，或者需要为了填充「行框盒子 (line boxes)」时会换行。
`break-spaces` | 与 `pre-wrap` 的行为相同，除了：<ul><li>任何保留的空白序列总是占用空间，包括在行尾。</li><li>每个保留的空格字符后都存在换行机会，包括空格字符之间。</li><li>这样保留的空间占用空间而不会挂起，从而影响盒子的固有尺寸（最小内容大小和最大内容大小）。</li></ul>
inherit | 规定应该从父元素继承 white-space 属性的值。

- 各种 `white-space` 值的行为：

属性值 | 换行符 | 空格和制表符 | 文字换行 | 行尾空格
-- | -- | -- | -- | --
`normal` | 合并 | 合并 | 换行 | 删除
`nowrap` | 合并 | 合并 | 不换行 |删除
`pre` | 保留 | 保留 | 不换行 | 保留
`pre-wrap` | 保留 | 保留 | 换行 | 挂起
`pre-line` | 保留 | 合并 | 换行 | 删除
`break-spaces` | 保留 | 保留 | 换行 | 换行

## 登陆成功后回跳到原页面

```js
loginSuccess () {
  if (this.$route.query.to) { // 存在回跳页面时
    const to = decodeURIComponent(this.$route.query.to)
    window.location.href = window.origin + to
  } else { // 不存在时，跳转到默认页面
    window.location.href = window.origin + '/index'
  }
}
```

## `getComputedStyle()`

[参考文档](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/getComputedStyle)

`Window.getComputedStyle()`方法返回一个对象，该对象在应用活动样式表并解析这些值可能包含的任何基本计算后报告元素的所有CSS属性的值。 私有的CSS属性值可以通过对象提供的API或通过简单地使用CSS属性名称进行索引来访问。

### 语法

```js
let style = window.getComputedStyle(element, [pseudoElt])
```

- `element`：用于获取计算样式的 `Element`。
- `pseudoElt`<Badge type="tip" text="可选" />：指定一个要匹配的伪元素的字符串。必须对普通元素省略（或`null`）。

::: tip 提示
返回的 `style` 是一个实时的 `CSSStyleDeclaration` 对象，**当元素的样式更改时，它会自动更新本身**
:::

### 示例

```js
let elem1 = document.getElementById('elemId')
let style = window.getComputedStyle(elem1, null)

// 它等价于
// document.defaultView.getComputedStyle(elem1, null)
```

### 描述

<br>返回的对象与从元素的 `style` 属性返回的对象具有相同的类型; 然而，两个对象具有不同的目的。从 `getComputedStyle` 返回的对象是只读的，可以用于检查元素的样式（包括由一个 `<style>` 元素或一个外部样式表设置的那些样式）。`elt.style` 对象应用于在特定元素上设置样式。

### defaultView

<br>在许多在线的演示代码中，`getComputedStyle` 是通过 `document.defaultView` 对象来调用的。大部分情况下，这是不需要的，因为可以直接通过window对象调用。但有一种情况，你必需要使用 `defaultView`,  那是在firefox3.6上访问子框架内的样式 。

### 注意：

- 返回的 [CSSStyleDeclaration](https://developer.mozilla.org/zh-CN/docs/Web/API/CSSStyleDeclaration) 对象将包含所有受支持的CSS属性长名称的活动值。示例名称是 `border-bottom-width`，`border-width` 和 `border` 是示例速记属性名称。仅使用像 `font-size` 这样的名字来查询值是最安全的。 查询诸如font等简写名称不适用于大多数浏览器。
- **CSS规范也允许使用驼峰命名，比如 `fontSize` 或 `paddingTop`。**
- CSS属性值可以使用 `getPropertyValue(propName)` API或直接索引到对象，如`cs['z-index']` 或 `cs.zIndex`。

### 示例

```html
<div class="m-fold-wrap" id="fold">…</div>
```

```js
var fold = document.getElementById('fold')
var foldStyle = window.getComputedStyle(fold, null)
console.log('foldStyle:', foldStyle)
console.log('foldStyle.height:', foldStyle.height)
console.log('foldStyle.getPropertyValue():', foldStyle.getPropertyValue('height'))
```

## 多行文本的展开和收起

实例： https://codepen.io/xboxyan/pen/LYWpWzK?editors=1100
超过一行时，省略号显示，文本末尾有展开按钮
点击展开，显示全部文本，同时文本末尾有收起按钮

```html
<div class="m-fold-wrap">
  <span :class="['m-content', !origin && fold ? 'fold':'unfold', {'origin': origin }]" ref="fold">
    《麦田里的守望者》是美国作家杰罗姆·大卫·塞林格创作的唯一一部长篇小说，首次出版于1951年。塞林格将故事的起止局限于16岁的中学生霍尔顿·考尔菲德从离开学校到纽约游荡的三天时间内，并借鉴了意识流天马行空的写作方法，充分探索了一个十几岁少年的内心世界。愤怒与焦虑是此书的两大主题，主人公的经历和思想在青少年中引起强烈共鸣，受到读者，特别是广大中学生的热烈欢迎。
  </span>
  <a href="javascript:;" class="u-btn" @click="fold=!fold" v-if="showMore">{{ fold ? '展开':'收起' }}</a>
</div>
```

```js
showMore: false,
fold: false,
origin: true,
mounted () {
  this.$nextTick(() => {
    var fold = this.$refs.fold
    var foldStyle = window.getComputedStyle(fold, null)
    var height = foldStyle.height.replace('px', '')
    var lineHeight = foldStyle.lineHeight.replace('px', '')
    if (Number(height) / Number(lineHeight) > 1) { // 计算文本是否超过一行
      this.showMore = true
      this.fold = true
      this.origin = false
    }
  })
}
```

```less
.m-fold-wrap {
  margin: 50px auto;
  width: 1080px;
  padding: 60px;
  background: #FFF;
  border: 1px solid #333;
  .m-content {
    line-height: 28px;
    font-size: 20px;
    color: #333;
    max-width: 1040px;
  }
  .fold { // 收起时的样式
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
  }
  .unfold { // 展开时的样式
    display: inline;
  }
  .origin { // 初始样式，方便获取文本高度height
    display: inline-block;
  }
  .u-btn {
    vertical-align: top;
    color: #1890FF;
    font-size: 20px;
  }
}
```

## JS中的 `&&` 和 `||`

- 逻辑或 `||` ：`var res = exp1 || exp2`

  exp1 | exp2 | res取值
  -- | -- | --
  1 | 0 | 表达式1结果值
  1 | 1 | 表达式1结果值
  0 | 1 | 表达式2结果值
  0 | 0 | 表达式2结果值

- 逻辑与 `&&`： `var res = exp1 && exp2`

  exp1 | exp2 | res取值
  -- | -- | --
  1 | 0 | 表达式2结果值
  1 | 1 | 表达式2结果值
  0 | 1 | 表达式1结果值
  0 | 0 | 表达式1结果值

## 使用 `DOMMatrix` 获取元素的 `translateX` 值

[DOMMatrix](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMMatrix)
<div ref="slider"></div>

- 方法一：借助 `style.transform`

  ```js
  var sliderTransform = this.$refs.slider.style.transform
  var offsetLeft = Math.abs(sliderTransform.slice(sliderTransform.indexOf('(') + 1, sliderTransform.lastIndexOf('p')))
  ```

- 方法二：借助 `getComputedStyle()`

  ```js
  var sliderTransform = window.getComputedStyle(this.$refs.slider).transform
  var matrix = new DOMMatrix(sliderTransform)
  var offsetLeft = Math.abs(matrix.m41) // 取绝对值，或者使用matrix.e
  ```

## 获取 `absolute` 定位元素的 `left` 偏移值

```html
<div ref="slider" class="m-slider"></div>
```

```js
const offsetLeft = this.$refs.slider.offsetLeft // 获取元素的当前偏移位置
console.log('offset:', offset) // Number: -200
```

```css
.m-slider {
  /* absolute 或 fixed */
  position: relative;
  left: -200px;
}
```
