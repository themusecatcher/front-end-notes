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

虚拟滚动的本质是通过 **按需渲染** 和 **`DOM` 复用** 优化性能，核心在于**动态计算可视区域范围并精准更新内容**。实现时需权衡固定行高与动态行高的复杂度，并结合实际场景选择合适的优化策略。

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

## `reactive()` 的局限性

`reactive()` API 有一些局限性：

1. **有限的值类型**：它只能用于对象类型 (对象、数组和如 `Map`、`Set` 这样的[集合类型](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects#keyed_collections))。它不能持有如 `string`、`number` 或 `boolean` 这样的[原始类型](https://developer.mozilla.org/en-US/docs/Glossary/Primitive)。

2. **不能替换整个对象**：由于 `Vue` 的响应式跟踪是通过属性访问实现的，因此我们必须始终保持对响应式对象的相同引用。这意味着我们不能轻易地“替换”响应式对象，因为这样的话与第一个引用的响应性连接将丢失：

   ```js
   let state = reactive({ count: 0 })

   // 上面的 ({ count: 0 }) 引用将不再被追踪
   // (响应性连接已丢失！)
   state = reactive({ count: 1 })
   ```

3. **对解构操作不友好**：当我们将响应式对象的原始类型属性解构为本地变量时，或者将该属性传递给函数时，我们将丢失响应性连接：

   ```js
   const state = reactive({ count: 0 })

   // 当解构时，count 已经与 state.count 断开连接
   let { count } = state
   // 不会影响原始的 state
   count++

   // 该函数接收到的是一个普通的数字
   // 并且无法追踪 state.count 的变化
   // 我们必须传入整个对象以保持响应性
   callSomeFunction(state.count)
   ```

由于这些限制，我们建议使用 `ref()` 作为声明响应式状态的主要 API。
