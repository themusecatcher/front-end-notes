# Note 7

## `scoped` & `:deep()` & `:slotted` & `:global()` & 动态 `CSS（v-bind）` & `CSS module`

vue中的 `scoped` 通过在 `DOM` 结构以及 `CSS` 样式上加唯一不重复的标记 `:data-v-hash` 的方式，以保证唯一（而这个工作是由过`PostCSS`转译实现的），达到样式私有化模块化的目的。

### `scoped` 三条渲染规则

- 给 `HTML` 的 `DOM` 节点加一个不重复 `data` 属性(形如：`data-v-123`)来表示他的唯一性
- 在每句 `CSS` 选择器的末尾（编译后生成的 `CSS` 语句）加一个当前组件的 `data` 属性选择器（如[`data-v-123`]）来私有化样式
- 如果组件内部包含有其他组件，只会给其他组件的最外层标签加上当前组件的 `data` 属性

### `:deep()` 改变 `CSS` 解析时私有属性的位置

常用于修改组件库样式

```vue
<template>
  <a-button type="primary">Primary Button</a-button>
</template>
<style lang="less" scoped>
.ant-btn {
  // span { // 样式不生效
  //   color: cyan;
  // }
  :deep(span) { // 样式生效
    color: cyan;
    /*
      此时css解析为:
      .ant-btn[data-v-f9e8f20e] span {
        color: cyan;
      }
    */
  }
}
</style>
```

### `:slotted()` 在子组件定义样式插槽内容样式

默认情况下，作用域样式不会影响到 `<slot></slot>` 渲染出来的内容，因为它们被认为是父组件所持有并传递进来的。

```vue
<template>
  <div>
    <slot>插槽</slot>
  </div>
</template>
<style lang="less" scoped>
:slotted(.red) {
  color: red;
}
</style>
```

### `:global()` 全局选择器，定义全局样式，不用单开一个没有 `scoped` 的 `style`

```css
<style scoped>
:global(p) {
  color: red;
}
</style>
/* 等效于 */
<style>
p {
  color: red;
}
</style>
```

### 动态 `CSS（v-bind）`

```vue
<script setup lang="ts">
const redColor = ref('red')
const color = ref({
  green: 'green'
})
</script>
<style lang="less" scoped>
.box {
  color: v-bind(redColor);
  background: v-bind('color.green'); // 对象要加 ''
}
</style>
```

### `CSS moudle` 一般用于TSX和渲染函数

- `<style module>` 标签会被编译为 `CSS Modules` 并且将生成的 `CSS` 类作为 `$style` 对象的键暴露给组件

```vue
<template>
  <p :class="$style.red">文字</p>
</template>
<style module>
.red {
  color: red;
  font-size: 20px;
}
</style>
```

- 自定义注入名称（多个可以用数组）

```vue
<script lang="ts" setup>
import { useCssModule } from 'vue'
const css = useCssModule('style')
</script>
<template>
  <p :class="[style.box, style.back]">文字</p>
</template>
<style module="style">
.box {
  color: red;
  font-size: 20px;
}
.back {
  background: green;
}
</style>
```
