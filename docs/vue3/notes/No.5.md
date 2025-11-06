# Note 4

<BackTop />

## `Vue3` [通用优化](https://cn.vuejs.org/guide/best-practices/performance.html#general-optimizations)

> 以下技巧能同时改善页面加载和更新性能。

### 大型虚拟列表 {#virtualize-large-lists}

<br/>

所有的前端应用中最常见的性能问题就是渲染大型列表。无论一个框架性能有多好，渲染成千上万个列表项**都会**变得很慢，因为浏览器需要处理大量的 `DOM` 节点。

但是，我们并不需要立刻渲染出全部的列表。在大多数场景中，用户的屏幕尺寸只会展示这个巨大列表中的一小部分。我们可以通过**列表虚拟化**来提升性能，这项技术使我们只需要渲染用户视口中能看到的部分。

要实现列表虚拟化并不简单，幸运的是，你可以直接使用现有的社区库：

- [vue-virtual-scroller](https://github.com/Akryum/vue-virtual-scroller)
- [vue-virtual-scroll-grid](https://github.com/rocwang/vue-virtual-scroll-grid)
- [vueuc/VVirtualList](https://github.com/07akioni/vueuc)

虚拟滚动的本质是通过 按需渲染 和 `DOM` 复用 优化性能，核心在于**动态计算可视区域范围并精准更新内容**。实现时需权衡固定行高与动态行高的复杂度，并结合实际场景选择合适的优化策略。

表格虚拟滚动（Virtual Scrolling）是一种优化大量数据渲染性能的技术，其核心思想是 **仅渲染可视区域内的内容，而非完整渲染所有数据**。

以下是其实现原理和关键步骤：

- 可视区域渲染：只渲染用户当前可见的行（或列），动态替换不可见区域的内容。
- `DOM` 复用：通过占位元素或动态更新 `DOM` 节点内容，保持有限的 `DOM` 数量。
- 滚动模拟：通过占位元素或计算偏移量，模拟完整数据集的滚动条行为。

### 减少大型不可变数据的响应性开销

<br/>

`Vue` 的响应性系统默认是深度的。虽然这让状态管理变得更直观，但在数据量巨大时，深度响应性也会导致不小的性能负担，因为每个属性访问都将触发代理的依赖追踪。好在这种性能负担通常只有在处理超大型数组或层级很深的对象时，例如一次渲染需要访问 `100,000+` 个属性时，才会变得比较明显。因此，它只会影响少数特定的场景。

`Vue` 确实也为此提供了一种解决方案，通过使用 [`shallowRef()`](https://cn.vuejs.org/api/reactivity-advanced.html#shallowref) 和 [`shallowReactive()`](https://cn.vuejs.org/api/reactivity-advanced.html#shallowreactive) 来绕开深度响应。浅层式 `API` 创建的状态只在其顶层是响应式的，对所有深层的对象不会做任何处理。这使得对深层级属性的访问变得更快，但代价是，我们现在必须将所有深层级对象视为不可变的，并且只能通过替换整个根状态来触发更新：

```js
const shallowArray = shallowRef([
  /* 巨大的列表，里面包含深层的对象 */
])

// 这不会触发更新...
shallowArray.value.push(newObject)
// 这才会触发更新
shallowArray.value = [...shallowArray.value, newObject]

// 这不会触发更新...
shallowArray.value[0].foo = 1
// 这才会触发更新
shallowArray.value = [
  {
    ...shallowArray.value[0],
    foo: 1
  },
  ...shallowArray.value.slice(1)
]
```
