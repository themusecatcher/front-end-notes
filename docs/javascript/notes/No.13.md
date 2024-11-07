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
