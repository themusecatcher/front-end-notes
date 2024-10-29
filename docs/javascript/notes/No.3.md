# Note 3

<BackTop />

## js判断对象是否包含某个属性key

- `in` 关键字，会返回 `true` 和 `false`

```js
if (key in Obj) { 
  // 包含
} else {
  // 不包含
}
```

- `hasOwnProperty()`方法，会返回 `true` 和 `false`

```js
if (Object.prototype.hasOwnProperty.call(Obj, key)) {
  // 包含
} else {
  // 不包含
}
```

- 使用 `undefined`

```js
if (Obj[key] !== undefined) {
  // 包含
} else {
  // 不包含
}
```

## js正则检验是否全是汉字或字母

```js
// 校验是否全是汉字
const nameReg = /^[\u4E00-\u9FA5]+$/

// 校验是否全是汉字或字母
const nameReg = /^[\u0391-\uFFE5A-Za-z]+$/

const originName = '斯蒂芬·库里'
const name = originName.replace(/·/g, '') // 去除姓名中所有的点（·）
if (!this.nameReg.test(name)) { // 校验是否全部是汉字
  this.errTxt = `姓名只能包含汉字和点（·）`
} else {
  this.errTxt = ''
}

// 区分中英文字符进行字符长度的计算，一个中文字符，算2个长度
this.formatContent('asdsad;;;阿萨德？？？')
formatContent (value) {
  // value = value.replace(/[\u4e00-\u9fa5]/g, '') // 过滤所有汉字
  const str = value.replace(/[^x00-\xff]/g, '') // 过滤所有汉字和中文字符
  const len = str.length // 英文字符的长度
  console.log('value:', value, value.length * 2 - len)
}
```

## js控制 `<input>` 输入指定格式数值

```html
<input
  type="text"
  class="u-input"
  v-model="inputValue"
  @input="formatNum($event.target.value)"
  placeholder="请输入" />
```

*只能输入数字和小数点后两位，且不能是0开头*

```js
formatNum (value) {
  value = value.replace(/[^\d.]/g, '') // 清除“数字”和“.”以外的字符
  value = value.replace(/\.{2,}/g, '.') // 只保留第一个. 清除多余的
  value = value.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
  value = value.replace(/^(-)*(\d+)\.(\d\d).*$/, '$1$2.$3') // 只能输入两个小数
  if (value.indexOf('.') < 0 && value !== '') { // 如果没有小数点，数字不能以0开头
    value = value.replace(/\b(0+)/gi, '') // 删除字符串头部所有的 0
  }
}
```

*输入整数位不能超过9位，小数位不能超过4位，只能输入数字和小数点后两位，且不能是0开头*

```js
formatNum (value) {
  value = value.replace(/[^\d.]/g, '') // 清除“数字”和“.”以外的字符
  value = value.replace(/\.{2,}/g, '.') // 只保留第一个. 清除多余的
  value = value.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
  value = value.replace(/^(-)*(\d+)\.(\d\d\d\d).*$/, '$1$2.$3') // 只最多输入4位小数
  if (value.indexOf('.') === -1 && value !== '0') { // 没有小数点，数字不能以0开头
    value = value.replace(/\b(0+)/gi, '')
  }
  if (value.indexOf('.') !== -1 && value.substr(0, value.indexOf('.')) !== '0') { // 有小数点，整数部分不能是以0开头的整数，但可以单独一个0
    value = value.replace(/\b(0+)/gi, '')
  }
  if (value.indexOf('.') !== -1) { // 有小数时，整数不超过9位，小数不超过4位
    if (value.substr(0, value.indexOf('.')).length > 9) { // 整数超过9位
      value = value.substr(0, 9) + value.substr(value.indexOf('.'))
    }
    if (value.substr(value.indexOf('.') + 1).length > 4) { // 小数超过4位
      value = value.substr(0, value.indexOf('.')) + value.substr(value.indexOf('.'), 5)
    }
  }
  if (value.indexOf('.') === -1 && value.length > 9) { // 没有小数时，整数不超过9位
    value = value.slice(0, 9)
  }
  this.inputValue = value
}
```

## `js` 判断对象是否为空

```js
const data = {}
if (JSON.stringify(data) === '{}') {
  return true
}
```

## `CSS` 的大于号选择器 `>`

**`>` 选择所有父级是 `<h1>` 元素的 `<strong>` 元素**

<h1>
  This is
  <strong>very </strong>
  <strong>very </strong>
  <strong>very </strong>
  important.
</h1>
<h1>
  This is
  <em>really <strong>very </strong></em>
  important.
</h1>

<style module>
h1 > strong {
  color: red;
}
</style>

```html
<h1>
  This is
  <strong>very </strong>
  <strong>very </strong>
  <strong>very </strong>
  important.
</h1>
<h1>
  This is
  <em>really <strong>very </strong></em>
  important.
</h1>
```

```css
/*
  即选择h1标签下，第一个子元素是strong标签的
  第二个<h1>第一个子元素是<em>所以<strong>元素不受影响
  选择所有父级是 <h1> 元素的 <strong> 元素
*/
h1 > strong {
  color: red;
}
```

## `Date` 对象常用操作

- [`setHours()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/setHours) 用于设置指定的时间的小时字段
- 返回值：设置后的日期的毫秒表示
- 参数：
  - `hour`: 必需。表示小时的数值，介于 0（午夜） ~ 23（晚上11点） 之间，以本地时间计（下同）。
  - `min`: 可选。表示分钟的数值，介于 0 ~ 59 之间。在 EMCAScript 标准化之前，不支持该参数。
  - `sec`: 可选。表示秒的数值，介于 0 ~ 59 之间。在 EMCAScript 标准化之前，不支持该参数。
  - `millisec`: 可选。表示毫秒的数值，介于 0 ~ 999之间。在 EMCAScript 标准化之前，不支持该参数。

```js
// 获取当前天的起始时间戳和结束时间戳
var startTimestamp = new Date().setHours(0, 0, 0, 0)
var endTimestamp = new Date().setHours(23, 59, 59, 999)

// 获取指定日期的起始时间戳和结束时间戳
const dateFormat = '2023-10-10' // 字符串日期格式
var startTimestamp = new Date(dateFormat).setHours(0, 0, 0, 0)
var endTimestamp = new Date(dateFormat).setHours(23, 59, 59, 999)

const dateTimestamp = 1696904408000 // 时间戳格式
var startTimestamp = new Date(dateTimestamp).setHours(0, 0, 0, 0)
var endTimestamp = new Date(dateTimestamp).setHours(23, 59, 59, 999)
```

- `getFullYear()` 方法根据本地时间返回指定日期的年份
- [`setFullYear()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/setFullYear) 方法根据本地时间为一个日期对象设置年份
  - 语法：`dateObj.setFullYear(yearValue[, monthValue[, dayValue]])`
  - 参数：<br/>
    `yearValue`：指定年份的整数值，例如 `2000`<br/>
    `monthValue`：一个 `0` 到 `11` 之间的整数值，表示`从一月到十二月`。<br/>
    `dayValue`：一个 `1` 到 `31` 之间的整数值，表示月份中的第几天。<br/>
    如果你指定了 `dayValue` 参数，就必须同时指定 `monthValue`。

  ```js
  // 当前年份
  const year = new Date().getFullYear() // 2023
  console.log('year', year)

  // 100年后的此刻
  const OneHundredYearsLater = new Date(new Date().setFullYear(new Date().getFullYear() + 100))
  console.log('OneHundredYearsLater', OneHundredYearsLater)
  ```

## `js` 在字符串中添加换行符

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

## [`getComputedStyle()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/getComputedStyle)

`Window.getComputedStyle()`方法返回一个对象，该对象在应用活动样式表并解析这些值可能包含的任何基本计算后报告元素的所有CSS属性的值。 私有的CSS属性值可以通过对象提供的API或通过简单地使用CSS属性名称进行索引来访问。

### 语法

```js
let style = window.getComputedStyle(element, [pseudoElt])
```

- `element`：用于获取计算样式的 `Element`。
- `pseudoElt`<Tag :bordered="false" color="cyan">可选</Tag>：指定一个要匹配的伪元素的字符串。必须对普通元素省略（或`null`）。

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
