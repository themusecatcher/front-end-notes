# Note 13

<BackTop />

## [Element: contextmenu event](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/contextmenu_event) 禁止网页响应用户点击鼠标右键

`contextmenu` 事件会在用户尝试打开上下文菜单时被触发。该事件通常在鼠标点击右键或者按下键盘上的菜单键时被触发，如果使用菜单键，该上下文菜单会被展示 到所聚焦元素的左下角，但是如果该元素是一棵 `DOM` 树的话，上下文菜单便会展示在当前这一行的左下角。

任何没有被禁用的鼠标右击事件 (通过调用事件的 `preventDefault()` 方法) 将会使得 contextmenu 事件在目标元素上被触发。

```js
// 禁用整个页面对于 contextmenu 事件的响应
document.addEventListener('contextmenu', (event) => {
  event.preventDefault()
})
```

## 获取目标元素最近的可滚动父元素并监听其滚动事件

```vue
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
const targetRef = ref<HTMLElement | null>(null)
const scrollTarget = ref<HTMLElement | null>(null)
onMounted(() => {
  observeScroll()
})
onBeforeUnmount(() => {
  cleanup()
  targetRef.value?.remove()
})
function cleanup() {
  scrollTarget.value && scrollTarget.value.removeEventListener('scroll', scrollEvent)
  scrollTarget.value = null
  mutationObserver.stop()
}
function scrollEvent (e: Event) {
  console.log('scrollTop', e.target.scrollTop)
  console.log('scrollLeft', e.target.scrollLeft)
}
// 监听可滚动父元素的滚动事件
function observeScroll() {
  cleanup()
  scrollTarget.value = getScrollParent(targetRef.value)
  scrollTarget.value && scrollTarget.value.addEventListener('scroll', scrollEvent)
}
function getParentElement(el: HTMLElement): HTMLElement | null {
  // Document
  if (el === document.documentElement) return null
  return el.parentElement
}
function getScrollParent(el: HTMLElement | null): HTMLElement | null {
  if (el === null) return null
  const parentElement = getParentElement(el)
  if (parentElement === null) return null
  // Document
  if (parentElement === document.documentElement) return document.documentElement
  const isScrollable = (el: HTMLElement): boolean => {
    const { overflow, overflowX, overflowY } = getComputedStyle(el)
    return /(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)
  }
  // Element
  if (isScrollable(parentElement)) return parentElement
  return getScrollParent(parentElement)
}
</script>
```

## [overflow](https://developer.mozilla.org/zh-CN/docs/Web/CSS/overflow) 属性

`overflow` 是 `CSS` 的简写属性，其设置了元素溢出时所需的行为——即当元素的内容太大而无法适应它的区块格式化上下文时。

### 构成的属性

这个属性是以下 CSS 属性的简写：

- [overflow-x](https://developer.mozilla.org/zh-CN/docs/Web/CSS/overflow-x)
- [overflow-y](https://developer.mozilla.org/zh-CN/docs/Web/CSS/overflow-y)

### 默认值

`visibile` // 等价于 `overflow-y: visible` 和 `overflow-x: visible`

### 示例

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'
const testRef = ref()
onMounted(() => {
  const style = window.getComputedStyle(testRef.value)
  console.log('style', style)
  console.log('overflow', style.overflow) // scroll auto
  console.log('overflowX', style.overflowX) // scroll
  console.log('overflowY', style.overflowY) // auto
})
</script>
<template>
  <div class="test" ref="testRef"></div>
</template>
<style lang="less" scoped>
.test {
  overflow-x: scroll; // 其中一个为 scroll，则另一个默认为 auto
}
</style>
```

## [Document：scroll 事件](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/scroll_event) 和 [Element：滚轮事件 wheel](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/wheel_event)

### `scroll` 事件

<br/>

当文档视图滚动后，`scroll` 事件就会触发。要检测滚动何时结束，请参阅 `Document：scrollend` 事件。关于元素滚动，请参见 `Element：scroll` 事件。

- 语法

  ```ts
  target.addEventListener('scroll', (event: Event) => {})
  onscroll = (event: Event) => {}
  ```

### `wheel` 事件

<br/>

滚轮（`wheel`）事件会在滚动鼠标滚轮或操作其他类似输入设备时触发。滚轮事件取代了已被弃用的非标准 `mousewheel` 事件。

::: tip 备注
不要将滚轮事件与 `scroll` 事件混淆。滚轮事件的默认行为是取决于实现的，所以不一定会触发 `scroll` 事件。
即便如此，滚轮事件的 `delta*` 值也不一定能反映文档内容的实际滚动方向。因此，请不要依赖滚轮事件的 `delta*` 
值来获得滚动方向。请通过检测目标的 `scroll` 事件的 `scrollLeft` 和 `scrollTop` 这两个值代替。
:::

- 语法

  ```ts
  addEventListener('wheel', (event: WheelEvent) => {})
  onwheel = (event) => {}
  ```

- 事件属性

  - `WheelEvent.deltaX` <Tag :bordered="false" color="cyan">只读</Tag>
    返回一个浮点数（`double`），表示水平方向的滚动量。

  - `WheelEvent.deltaY` <Tag :bordered="false" color="cyan">只读</Tag>
    返回一个浮点数（`double`），表示垂直方向的滚动量。

  - `WheelEvent.deltaZ` <Tag :bordered="false" color="cyan">只读</Tag>
    返回一个浮点数（`double`）表示 z 轴方向的滚动量。

  - `WheelEvent.deltaMode` <Tag :bordered="false" color="cyan">只读</Tag>
    返回一个无符号长整型数（`unsigned long`），表示 `delta*` 值滚动量的单位。允许的值为：

    常量 | 值 | 描述
    :--- | :--- | :---
    WheelEvent.DOM_DELTA_PIXEL | 0x00 | `delta*` 值以像素为单位
    WheelEvent.DOM_DELTA_LINE | 0x01 | `delta*` 值以行为单位。每次鼠标单击都会滚动一行内容，其中行高计算的方法取决于浏览器
    WheelEvent.DOM_DELTA_PAGE | 0x02 | `delta*` 值以页为单位。每次鼠标单击都会滚动一页内容

## [Object.is()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/is)

`Object.is()` 静态方法确定两个值是否为相同值。

- 语法

  ```ts
  Object.is(value1, value2)
  ```

- 参数

  - `value1`：要比较的第一个值。

  - `value2`：要比较的第二个值。

- 返回值

  一个布尔值，指示两个参数是否为相同的值。

- 描述

  `Object.is()` 确定两个值是否为相同值。如果以下其中一项成立，则两个值相同：

  - 都是 `undefined`
  - 都是 `null`
  - 都是 `true` 或者都是 `false`
  - 都是长度相同、字符相同、顺序相同的字符串
  - 都是相同的对象（意味着两个值都引用了内存中的同一对象）
  - 都是 `BigInt` 且具有相同的数值
  - 都是 `symbol` 且引用相同的 `symbol` 值
  - 都是数字且
    - 都是 `+0`
    - 都是 `-0`
    - 都是 `NaN`
    - 都有相同的值，非零且都不是 `NaN`
      
`Object.is()` 与 `==` 运算符并不等价。`==` 运算符在测试相等性之前，会对两个操作数进行类型转换（如果它们不是相同的类型），这可能会导致一些非预期的行为，例如 `"" == false` 的结果是 `true`，但是 `Object.is()` 不会对其操作数进行类型转换。
<br/>
<br/>
`Object.is()` 也不等价于 `===` 运算符。`Object.is()` 和 `===` 之间的**唯一区别在于它们处理带符号的 `0` 和 `NaN` 值的时候**。`===` 运算符（和 `==` 运算符）将数值 `-0` 和 `+0` 视为相等，但是会将 `NaN` 视为彼此不相等。

### 示例

```ts
// 案例 1：评估结果和使用 === 相同
Object.is(25, 25) // true
Object.is('foo', 'foo') // true
Object.is('foo', 'bar') // false
Object.is(null, null) // true
Object.is(undefined, undefined) // true
Object.is(window, window) // true
Object.is([], []) // false
const foo = { a: 1 }
const bar = { a: 1 }
const sameFoo = foo
Object.is(foo, foo) // true
Object.is(foo, bar) // false
Object.is(foo, sameFoo) // true

// 案例 2: 带符号的 0
Object.is(0, -0) // false 与 ===/== 不同
Object.is(+0, -0) // false 与 ===/== 不同
Object.is(-0, -0) // true

// 案例 3: NaN
Object.is(NaN, 0 / 0) // true 与 ===/== 不同
Object.is(NaN, Number.NaN) // true 与 ===/== 不同
```
