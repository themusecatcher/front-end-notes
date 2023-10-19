# Note 13

## [scrollHeight详情](/vue2/note-9.html#浏览器窗口宽高和元素坐标-尺寸)

### 判断元素是否有滚动条

<br/>
出现滚动条便意味着元素空间将大于其内容显示区域，根据这个现象便可以得到判断是否出现滚动条的规则

### 判断竖向滚动条

```js
if (el.scrollHeight > el.clientHeight) {
  // true
}
```

### 判断横向滚动条

```js
if (el.scrollWidth > el.clientWidth) {
  // true
}
```

[Node.parentElement](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/parentElement) 返回当前节点的父元素节点，如果该元素没有父节点，或者父节点不是一个 `DOM 元素`，则返回 `null`。

- 语法 `parentElement = node.parentElement`
  <br/>`parentElement` 是当前节点的父元素。它永远是一个 `DOM 元素` 对象，或者 `null`。

### 实例

<br/>**监听距离当前元素最近的一个可竖向滚动的祖先节点**

```js
const target = getScrollParentElement(backtop.value.parentElement)
target && target.addEventListener('scroll', showScrollTop)

function getScrollParentElement (el: HTMLElement) {
  if (el.scrollHeight > el.clientHeight) {
    return el
  } else if (el.parentElement) {
    return getScrollParentElement(el.parentElement)
  } else {
    return null
  }
}
```

## [scrollTo](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollTo) 滚动到指定位置

Element 的 scrollTo() 方法可以使界面滚动到给定元素的指定坐标位置。

- 语法

  ```js
  scrollTo(x-coord, y-coord)
  scrollTo(options)
  ```

- 参数
  - `x-coord` 是你想要显示在左上角的元素沿水平轴的像素。
  - `y-coord` 是你想要显示在左上角的元素沿垂直轴的像素。

  或者
  - `options` 包含以下参数的对象：
    - `top`
      指定沿 `Y` 轴滚动窗口或元素的像素数。
    - `left`
      指定沿 `X` 轴滚动窗口或元素的像素数。

    - `behavior`
      `smooth` 表示平滑滚动并产生过渡效果、`instant` 表示滚动会直接跳转到目标位置，没有过渡效果。`auto` 或缺省值表示浏览器会自动选择滚动时的过渡效果。

### 示例

```js
element.scrollTo(0, 1000);
// 或者
element.scrollTo({
  top: 100,
  left: 100,
  behavior: 'smooth'
})
```

## `$router` 新页面打开路由

```js
onDetail (id) {
  const routeUrl = this.$router.resolve({
    path: '/show/detail',
    query: { id }
  })
  window.open(routeUrl.href, '_blank')
}
```

## [npm link](https://npm.nodejs.cn/cli/v10/commands/npm-link)

- 没有参数的包文件夹中的 `npm link` 将在全局文件夹 `{prefix}/lib/node_modules/<package>` 中创建一个符号链接，该符号链接链接到执行 `npm link` 命令的包。它还将封装中的任何垃圾箱链接到 {prefix}/bin/{name}。 请注意，npm link 使用全局前缀（参见 npm prefix -g 的值）

- 在某个其他位置，`npm link package-name` 将创建一个从全局安装的 `package-name` 到当前文件夹的 `node_modules/` 的符号链接。

::: tip
注意，`package-name` 取自 `package.json`，而不是目录名称。

包名称可以选择以范围为前缀。 见 scope。 范围必须以 @ 符号开头，后跟斜杠
:::

### 例如：

```bash
cd ~/projects/node-redis    # go into the package directory
npm link                    # creates global link
cd ~/projects/node-bloggy   # go into some other package directory.
npm link redis              # link-install the package
```

现在，对 `~/projects/node-redis` 的任何更改都将反映在 `~/projects/node-bloggy/node_modules/node-redis/` 中。 请注意，**链接应该指向包名称，而不是该包的目录名称**。

你也可以将这两个步骤合二为一。 例如，以更短的方式执行上述用例：

```bash
cd ~/projects/node-bloggy  # go into the dir of your main project
npm link ../node-redis     # link the dir of your dependency
```

第二行相当于做：

```bash
(cd ../node-redis; npm link)
npm link redis
```

即它首先创建一个全局链接，然后将全局安装目标链接到你项目的 `node_modules` 文件夹中。

请注意，**在这种情况下，你指的是目录名称 node-redis，而不是包名称 redis**。

如果你的链接包有范围（参见 scope），你的链接命令必须包含该范围，例如

```bash
npm link @myorg/privatepackage
```

### unlink

```bash
npm uninstall <package-name> -g
```

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
