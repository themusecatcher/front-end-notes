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
const target = ref<HTMLElement | null>(null)
const scrollParent = ref<HTMLElement | null>(null)
onMounted(() => {
  observeScroll()
})
onBeforeUnmount(() => {
  cleanup()
})
function cleanup() {
  scrollParent.value && scrollParent.value.removeEventListener('scroll', scrollEvent)
  scrollParent.value = null
}
function scrollEvent (e: Event) {
  console.log('scrollTop', e.target.scrollTop)
  console.log('scrollLeft', e.target.scrollLeft)
}
function observeScroll() { // 监听可滚动父元素的滚动事件
  cleanup()
  scrollParent.value = getScrollParent(target.value?.parentElement ?? null)
  scrollParent.value && scrollParent.value.addEventListener('scroll', scrollEvent)
}
function getScrollParent(el: HTMLElement | null): HTMLElement | null {
  const isScrollable = (el: HTMLElement): boolean => {
    const style = window.getComputedStyle(el)
    if (
      (el.scrollHeight > el.clientHeight || el.scrollWidth > el.clientWidth) &&
      (style.overflow === 'scroll' || style.overflow === 'auto')
    ) {
      return true
    }
    return false
  }
  if (el) {
    return isScrollable(el) ? el : getScrollParent(el.parentElement ?? null)
  }
  return null
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
