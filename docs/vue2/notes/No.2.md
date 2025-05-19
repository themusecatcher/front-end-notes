# Note 2

<BackTop />

## 过渡效果

```html
<transition name="fade">
  <router-view />
</transition>
```

```css
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
```

## 文本溢出显示省略号

```html
<p class="u-text" :title="title">{{ title }}</p>
```

```css
/* 单行文本溢出，多行文本无效 */
.u-text {
  width: 480px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

```html
<p class="u-text">{{ text }}</p>
```

```css
/* 多行文本溢出 */
.u-text {
  width: 480px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
```

## 计算属性 computed

- 计算属性缓存 vs 方法

在表达式中调用方法可以达到同样的效果：

```html
<p>Reversed message: "{{ reversedMessage() }}"</p>
```

我们可以将同一函数定义为一个方法而不是一个计算属性。两种方式的最终结果确实是完全相同的。然而，不同的是**计算属性是基于它们的响应式依赖进行缓存的**。**只在相关响应式依赖发生改变时它们才会重新求值**。这就意味着**只要 message 还没有发生改变，多次访问 reversedMessage 计算属性会立即返回之前的计算结果，而不必再次执行函数。**

**相比之下，每当触发重新渲染时，调用方法将总会再次执行函数**。

::: tip 提示
我们为什么需要缓存？假设我们有一个性能开销比较大的计算属性 A，它需要遍历一个巨大的数组并做大量的计算。然后我们可能有其他的计算属性依赖于 A。如果没有缓存，我们将不可避免的多次执行 A 的 getter！如果你不希望有缓存，请用方法来替代。
:::

- 计算属性 vs 侦听属性

当你有一些数据需要随着其它数据变动而变动时，你很容易滥用 watch——特别是如果你之前使用过 AngularJS。然而，通常更好的做法是使用计算属性而不是命令式的 watch 回调。

```html
<div id="demo">{{ fullName }}</div>
```

```js
var vm = new Vue({
  el: '#demo',
  data: {
    firstName: 'Foo',
    lastName: 'Bar',
    fullName: 'Foo Bar'
  },
  watch: {
    firstName: function (val) {
      this.fullName = val + ' ' + this.lastName
    },
    lastName: function (val) {
      this.fullName = this.firstName + ' ' + val
    }
  }
})
```

上面代码是命令式且重复的。将它与计算属性的版本进行比较，使用计算属性将会好得多：

```js
var vm = new Vue({
  el: '#demo',
  data: {
    firstName: 'Foo',
    lastName: 'Bar'
  },
  computed: {
    fullName: function () {
      return this.firstName + ' ' + this.lastName
    }
  }
})
```

- 计算属性的 `setter`，计算属性默认只有 `getter`，不过在需要时你也可以提供一个 `setter`：

```js
computed: {
  // 类似于双向绑定v-model
  fullName: {
    // getter 相当于firstName和lastName的改变会更新到fullName上
      get: function () {
        return this.firstName + ' ' + this.lastName
      },
    // setter 相当于把fullName的改变更新到firstName和lastName上
    set: function (newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
```

## `<keep-alive></keep-alive>`

- Props：
  - `include` - 字符串或正则表达式。只有名称（组件的name）匹配的组件会被缓存。
  - `exclude` - 字符串或正则表达式。任何名称（组件的name）匹配的组件都不会被缓存。
  - `max` - 数字。最多可以缓存多少组件实例。
- 用法：
  <br>`<keep-alive>` **包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们**。<br>
  和 `<transition>` 相似，`<keep-alive>` 是一个抽象组件：**它自身不会渲染一个 DOM 元素，也不会出现在组件的父组件链中**。

当组件在 `<keep-alive>` 内被切换，它的 `activated` 和 `deactivated` 这两个生命周期钩子函数将会被对应执行。
在 2.2.0 及其更高版本中，`activated` 和 `deactivated` 将会在 `<keep-alive>` 树内的所有嵌套组件中触发。

**主要用于保留组件状态或避免重新渲染。**

```html
<!-- 基本 -->
<keep-alive>
  <component :is="view"></component>
</keep-alive>

<!-- 多个条件判断的子组件 -->
<keep-alive>
  <comp-a v-if="a > 1"></comp-a>
  <comp-b v-else></comp-b>
</keep-alive>

<!-- 和 `<transition>` 一起使用 -->
<transition>
  <keep-alive>
    <component :is="view"></component>
  </keep-alive>
</transition>
```

::: tip 注意
`<keep-alive>` 是用在其一个直属的子组件被开关的情形。如果你在其中有 v-for 则不会工作。如果有上述的多个条件性的子元素，`<keep-alive>` 要求同时只有一个子元素被渲染。
:::

- `include` and `exclude`（2.1.0 新增）
**include 和 exclude prop 允许组件有条件地缓存。二者都可以用逗号分隔字符串、正则表达式或一个数组来表示：**

```html
<!-- 逗号分隔字符串 -->
<keep-alive include="a,b">
  <component :is="view"></component>
</keep-alive>
<!-- 正则表达式 (使用 `v-bind`) -->
<keep-alive :include="/a|b/">
  <component :is="view"></component>
</keep-alive>
<!-- 数组 (使用 `v-bind`) -->
<keep-alive :include="['a', 'b']">
  <component :is="view"></component>
</keep-alive>
```

匹配首先检查组件自身的 name 选项，如果 name 选项不可用，则匹配它的局部注册名称 (父组件 components 选项的键值)。匿名组件不能被匹配。

- `max`（2.5.0 新增）

最多可以缓存多少组件实例。一旦这个数字达到了，在新实例被创建之前，已缓存组件中最久没有被访问的实例会被销毁掉。

```html
<!-- 不会在函数式组件中正常工作，因为它们没有缓存实例。 -->
<keep-alive :max="10">
  <component :is="view"></component>
</keep-alive>
<keep-alive>
```

## CSS变量

- 在CSS中定义变量：
  1. 定义全局变量：

  ```css
  :root {
    --themeColor: #3A79EE;
  }
  ```
  
  2. 定义某元素下的变量：

  ```css
  .m-main-area {
  `--themeColor: #3A79EE;
  }
  ```

  3. 定义媒体查询下的变量：

  ```css
  @media screen and (min-width: 1000px) {
    :root {
      --themeColor: #3A79EE;
    }
  }
  ```

  使用：

  ```css
  .m-theme {
    background: var(--themeColor);
  }
  ```

- 在 `less` 中定义变量：

  定义：

  ```less
  @themeColor: #3A79EE;
  ```

  使用：

  ```less
  .m-theme {
    // background: var(@themeColor);
    background: @themeColor;
  }
  ```

- 在`sass` 中定义变量：

  定义：

  ```sass
  $themeColor: #3A79EE;
  ```
  
  使用：

  ```sass
  .m-theme {
    background: var($themeColor);
  }
  ```

## `Vue` 中的 `v-for` 循环为什么 `key` 不建议使用 `index`

在 `Vue` 中使用 `v-for` 循环时，**不推荐用 `index` 作为 `key`** 的主要原因与 Vue 的 **虚拟 DOM 的 Diff 算法** 和 **组件状态管理** 机制有关。

### 一、核心问题：`index` 的不稳定性

<br/>

当列表数据动态变化时（如排序、插入或删除元素），`index` **会发生变化**，但 `Vue` 会基于 `key` 来复用已有的 `DOM` 节点。这可能导致：

#### 1. **组件状态错乱**

- **场景**：列表项包含有状态的子组件（如输入框、复选框等）。  
- **问题**：如果 `key` 是 `index`，当列表顺序变化时，`Vue` 会错误地复用旧节点，导致组件状态与数据不匹配。

**示例**：

```vue
<template>
  <div v-for="(item, index) in list" :key="index">
    <input v-model="item.value"> <!-- 输入框的状态与 item 绑定 -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        { id: 1, value: 'A' },
        { id: 2, value: 'B' }
      ]
    }
  },
  mounted() {
    // 反转列表后，输入框的 DOM 被复用，但状态未更新！
    setTimeout(() => {
      this.list.reverse()
    }, 2000)
  }
}
</script>
```

- **结果**：反转列表后，输入框的 `DOM` 节点会被复用，但 `Vue` 认为 `key`（`index`）对应的节点未变化，导致输入框的显示值与实际数据错位。

#### 2. **性能下降**

- **场景**：列表频繁增删或重新排序。  
- **问题**：`index` 变化会导致 `Vue` 强制重新渲染所有后续节点（因为 `key` 不唯一且不稳定），无法高效复用 `DOM`。

#### 3. **动画异常**

- **场景**：列表项带有过渡动画（如 `<transition-group>`）。  
- **问题**：`index` 变化可能导致 `Vue` 无法正确追踪元素位置，动画效果异常。

### 二、为什么推荐用唯一标识符（如 `id`）？

<br/>

使用唯一的 `id` 作为 `key` 能确保：

1. **稳定性**：即使列表顺序变化，`key` 始终与数据项唯一绑定。
2. **正确复用**：`Vue` 能精准识别哪些节点需要更新、移动或删除。
3. **状态一致**：子组件内部状态与数据项严格对应，避免错乱。

**改进后的代码**：

```vue
<template>
  <div v-for="item in list" :key="item.id"> <!-- 用唯一 id 作为 key -->
    <input v-model="item.value">
  </div>
</template>
```

### 三、什么情况下可以用 `index`？

<br/>

如果同时满足以下条件，可以临时使用 `index`：

1. **列表是静态的**（无排序、增删操作）。
2. **列表项无内部状态**（如纯展示文本）。
3. **无过渡动画需求**。

但依然建议优先使用唯一标识符！

### 四、总结

| 场景 | 使用 `index` 的后果 | 使用 `id` 的优势 |
|--|--|--|
| 列表动态排序/增删 | 状态错乱、性能下降 | 精准更新、高效复用 |
| 列表项包含子组件状态 | 子组件状态与数据错位 | 状态与数据严格对应 |
| 过渡动画（`<transition-group>`）| 动画异常 | 动画平滑正确 |

**最佳实践**：始终使用数据项的唯一标识符（如 `id`）作为 `key`，避免使用 `index`。
