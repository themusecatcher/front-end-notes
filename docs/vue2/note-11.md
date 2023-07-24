# Note 11

## 使用变量生成动态正则表达式

1. 使用 `RegExp` 构造函数生成（常用）

  ```js
  const key = this.queryParams.keyword
  const keyReg = new RegExp(key, 'g')
  ```

2. 使用 `eval` 动态执行代码

  ```js
  const key = '你好'
  var keyReg = eval('/^' + key + '$/g')
  console.log(keyReg) // /^你好$/g
  ```

  ```html
  <p v-html="title"></p>
  ```

  ```js
  // 实际用例：在搜索结果中标识指定关键字
  item.title = '<p>' + item.title.replace(reg, `<span class="blue">${key}</span>`) + '</p>'
  ```

## `:root` 伪类

`:root` 这个 CSS 伪类匹配文档树的根元素。对于 HTML 来说，`:root` 表示 `<html>` 元素，除了优先级更高之外，与 `html` 选择器相同。
在声明全局 CSS 变量时 `:root` 会很有用：

```css
:root {
  --main-color: hotpink;
  --pane-padding: 5px 12px;
}
```

使用变量：

```css
.test {
  color: var(--main-color);
}
```

## 固定宽度内，实现不同字数人名左右对齐排列

```html
<p class="u-name">王二</p>
<p class="u-name">王小二</p>
```

```less
.u-name {
  width: 84px;
  height: 40px;
  font-size: 28px;
  font-weight: 400;
  color: #333333;
  line-height: 40px;
  text-align: justify;
  &::after {
    content: '';
    display: inline-block;
    width: 100%;
  }
}
```

## Vue创建全局函数或变量

1. 在 `index.js` 中创建 `getAction` 函数，并全局使用

```js
export function getAction (url, parameter) {
  return request({
    url: url,
    method: 'get',
    params: parameter
  })
}
```

2. 创建 `globalUse.js`：

```js
import { getAction } from './index'

// 方式一挂载到Vue.prototype：
import Vue from 'vue'
Vue.getAction = getAction // 使用时需先引入Vue，然后调用：Vue.getAction
Vue.prototype.$getAction = getAction // 使用：this.$getAction

// 方式二使用全局混入Vue.mixin：
Vue.mixin({ data () { return { getAction } } }) // 全局混入到data中，使用：this.getAction
// Vue.mixin({ methods: { getAction } }) // 全局混入到methods中，使用：this.getAction
```

3. 在 `main.js` 中引入：

```js
import Vue from 'vue'
import App from './App.vue'
import './utils/globalUse'
new Vue({
  render: h => h(App)
}).$mount('#app')
```

## 不使用滚动条，模拟滚动行为

> 使用场景：多个标签页可以滚动，同时又不显示滚动条，也不触发浏览器触摸板左右滑动时的快捷方式（例如后退和前进）

**实现方式：（触摸板滑动也会触发）监听滚轮事件，结合 transform: translate(${scrollLeft}px, 0) 模拟滚动效果**

[`Wheel Event` 参考文档](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/wheel_event)

`WheelEvent` 事件属性：
- `WheelEvent.deltaX` 只读：返回一个浮点数（double），表示**水平方向的滚动量**。
- `WheelEvent.deltaY` 只读：返回一个浮点数（double），表示**垂直方向的滚动量**。
- `WheelEvent.deltaZ` 只读：返回一个浮点数（double）表示** z 轴方向的滚动量**。
- `WheelEvent.deltaMode` 只读：返回一个无符号长整型数（unsigned long），表示 **delta\* 值滚动量的单位**。

```html
<div @wheel.prevent="showWheel ? onWheel($event) : e => false"></div>
```

```js
function onWheel (e: WheelEvent) {
  // e.preventDefault() // 禁止浏览器捕获触摸板滑动事件
  const scrollX = e.deltaX * 1 // 滚轮的横向滚动量
  if (scrollLeft.value + scrollX > scrollMax.value) {
    scrollLeft.value = scrollMax.value
  } else if (scrollLeft.value + scrollX < 0) {
    scrollLeft.value = 0
  } else {
    scrollLeft.value += scrollX
  }
}
```

## 如何动态设置伪元素 `&:before` 和 `&:after` 样式

> 使用css变量：var(--border-width)

```html
<div
  class="m-divider"
  :style="`--border-width: ${borderWidth}px;`">
</div>
```

```less
.m-divider {
  display: flex;
  align-items: center;
  margin: 16px 0;
  width: 100%;
  min-width: 100%;
  &:before, &:after {
    position: relative;
    width: 50%;
    border-top-width: var(--border-width);
    border-top-style: solid;
    border-top-color: rgba(5, 5, 5, 0.06);
    transform: translateY(50%);
    content: '';
  }
}
```

## flex布局介绍

- 父级元素设置为 `flex` 布局后，子元素的 `float`、`clear`、`vertical-align` 属性都会失效
- 父级元素设置为 `flex` 布局后，所有的子元素都变成了行内块 `inline-block` 元素

[`flex` 布局](https://www.runoob.com/w3cnote/flex-grammar.html)

> flex 属性用于设置或检索弹性盒模型对象的子元素如何分配空间。<br>flex 属性是 flex-grow、flex-shrink 和 flex-basis 属性的简写属性。<br>**`flex: 1;` 让所有弹性盒模型对象的子元素都有相同的长度，且忽略它们内部的内容**

语法：`flex: flex-grow flex-shrink flex-basis|auto|initial|inherit;`

属性值 | 描述
-- | --
`flex-grow` | 一个数字，规定**项目将相对于其他灵活的项目进行扩展的量**。
`flex-shrink` | 一个数字，规定**项目将相对于其他灵活的项目进行收缩的量**。
`flex-basis` | 项目的长度。合法值："`auto`"、"`inherit`" 或一个后跟 "`%`"、"`px`"、"`em`" 或任何其他长度单位的数字。
`auto` | 与 `1 1 auto` 相同。
`none` | 与 `0 0 auto` 相同。
`initial` | 设置该属性为它的默认值，即为 `0 1 auto`。请参阅 initial。
`inherit` | 从父元素继承该属性。请参阅 inherit。

## 只设置单边阴影 `box-shadow`

语法：`box-shadow: h-shadow v-shadow blur spread color inset;`
值 | 说明
-- | --
h-shadow | 必需的。**水平阴影的位置**。允许负值
v-shadow | 必需的。**垂直阴影的位置**。允许负值
blur | 可选。**模糊距离**
spread | 可选。**阴影的大小**
color | 可选。**阴影的颜色**。在CSS颜色值寻找颜色值的完整列表
inset | 可选。从外层的阴影（开始时）改变阴影内侧阴影

- 只设置**底部**阴影：

  ```css
  box-shadow: 0 5px 5px 0 rgba(0,0,0,0.08);
  ```

- 只设置**顶部**阴影：
  
  ```css
  box-shadow: 0 -5px 5px 0 rgba(0,0,0,0.08);
  ```

- 只设置**左部**阴影：
  
  ```css
  box-shadow: -5px 0 5px 0 rgba(0,0,0,0.08);
  ```

- 只设置**右部**阴影：

  ```css
  box-shadow: 5px 0 5px 0 rgba(0,0,0,0.08);
  ```

## JS表单页监听浏览器返回按键

> 拦截并提示用户，点击确定执行返回，点击取消阻止返回

https://juejin.cn/post/7149236595944587277
https://juejin.cn/post/6844904183121117192
https://developer.mozilla.org/zh-CN/docs/Web/API/Window/popstate_event

::: tip
目前多页面还没有能直接阻止浏览器回退的 API，所以我们可以 hack 一下，利用 pushState 和 popstate 实现效果。

原理：**进入页面时，手动 pushState 一次，此时浏览器记录条目会自动生成一个记录，history 的 length 加 1。接着，监听 popstate 事件，被触发时，出弹窗给用户确认，点取消，则需要再次 pushState 一次以恢复成没有点击前的状态，点确定，则可以手动调用 history.back 即可实现效果**
:::

```js
history.pushState(null, null, window.location.href + '#') // 不会触发 popstate 事件
// 挂载方法
window.addEventListener('popstate', this.popstateFn, true)

popstateFn (event) {
  var confrimFn = confirm('确定需要返回上一级页面')
  console.log('回退', confrimFn)
  if (confrimFn) {
    // 确定，取消监听方法，并返回
    window.removeEventListener('popstate', this.popstateFn, true)
    history.back()
    // setTimeout(() => {
    //   window.addEventListener('popstate', this.popstateFn, true)
    // }, 0)
  } else { // 取消，回退时再向历史记录插入一条，以便阻止下一次点击回退
    history.pushState(null, null, window.location.href + '#')
  }
}
```

## Vue表单页监听浏览器回退

> 拦截并提示用户，点击确定执行返回，点击取消阻止返回

```js
// 这个离开守卫通常用来禁止用户在还未保存修改前突然离开。该导航可以通过 next(false) 来取消。
beforeRouteLeave (to, from, next) {
  const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
  if (answer) {
    next()
  } else {
    next(false)
  }
}
```

## `fetch` 方法

[`fetch()` 参考文档](https://developer.mozilla.org/zh-CN/docs/Web/API/fetch)

> 全局的 fetch() 方法用于发起获取资源的请求。它返回一个 promise，这个 promise 会在请求响应后被 resolve，并传回 Response 对象。

```js
// 本网站首页标签即使用 fetch() 获取远程 github 项目的版本号
function fetchVersion () {
  return fetch('https://api.github.com/repos/themusecatcher/front-end-notes/contents/package.json?ref=master', {
    headers: {
      // See https://docs.github.com/en/rest/overview/media-types
      Accept: 'application/vnd.github.v3.raw',
      // See https://docs.github.com/en/rest/guides/getting-started-with-the-rest-api#authentication
      // Authorization: 'token ${GITHUB_TOKEN}',
    }
  }).then(res => res.json())
    .then(json => json.version ?? '')
    .then(version => {
      if (!version) return
      const tagLineParagragh = document.querySelector('div.VPHero.has-image.VPHomeHero > div > div.main > p.tagline')
      const docsVersionSpan = document.createElement('samp')
      docsVersionSpan.classList.add('version-tag')
      docsVersionSpan.innerText = version
      tagLineParagragh?.appendChild(docsVersionSpan)
    })
}
```

## `MutationObserver` 监听DOM变化

[MutationObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver)

> MutationObserver 接口提供了监视对 DOM 树所做更改的能力。它被设计为旧的 Mutation Events 功能的替代品，该功能是 DOM3 Events 规范的一部分

构造函数：
- `MutationObserver()`：创建并返回一个新的 `MutationObserver` 它会**在指定的 DOM 发生变化时被调用**

方法：
- `disconnect()`
  阻止 MutationObserver 实例继续接收的通知，直到再次调用其 observe() 方法，该观察者对象包含的回调函数都不会再被调用。
- `observe()`
  配置 MutationObserver 在 DOM 更改匹配给定选项时，通过其回调函数开始接收通知。
- `takeRecords()`
  从 MutationObserver 的通知队列中删除所有待处理的通知，并将它们返回到 MutationRecord 对象的新 Array 中。

```vue
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
const textarea = ref()
const observer = ref()
onMounted(() => {
  // 观察器的配置（需要观察什么变动）
  const config = { attributes: true, childList: false, subtree: false }
  // 创建一个观察器实例并传入回调函数
  observer.value = new MutationObserver(callback)
  // 以上述配置开始观察目标节点
  observer.value.observe(textarea.value, config)
})
onUnmounted(() => {
  // 之后，可停止观察
  observer.value.disconnect()
})
/*
  例如：使用 MutationObserver 监听 textarea resize 时的高度属性变化
  参考文档：https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver
*/
// 当观察到变动时执行的回调函数
const callback = function (mutationsList: any, observer: any) {
  console.log('mutation', textarea.value.scrollHeight)
  // Use traditional 'for loops' for IE 11
  // for(let mutation of mutationsList) {
  //   if (mutation.type === 'childList') {
  //     console.log('A child node has been added or removed.')
  //   }
  //   if (mutation.type === 'attributes') {
  //     console.log('The ' + mutation.attributeName + ' attribute was modified.')
  //     console.log(mutation.target.style.height)
  //   }
  // }
}
</script>
<template>
  <textarea ref="textarea" />
</template>
```
