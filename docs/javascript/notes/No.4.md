# Note 4

<BackTop />

## 监听当前页面是否处于激活状态 [`visibilitychange`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/visibilitychange_event)

- 方法一：监听 `visibilitychange` 事件

> 当其选项卡的内容变得可见或被隐藏时，会在 `document` 上触发 `visibilitychange` 事件。该事件不包括文档的更新的可见性状态，但是你可以从文档的 `visibilityState` 属性中获取该信息。该事件不可取消。

::: tip 注意：
- 出于兼容性原因，请确保使用 `document.addEventListener` 而不是 `window.addEventListener` 来注册回调。`Safari < 14.0` 仅支持前者。
:::

### 语法

```js
addEventListener('visibilitychange', (event) => {})
onvisibilitychange = (event) => {}
```

### 使用说明

<br/>

该事件不包括文档的更新的可见性状态，但是你可以从文档的 `visibilityState` 属性中获取该信息。

**当用户导航到新页面、切换标签页、关闭标签页、最小化或关闭浏览器，或者在移动设备上从浏览器切换到不同的应用程序时，该事件就会触发**，其 `visibilityState` 为 `hidden`。过渡到 `hidden` 是页面能可靠观察到的最后一个事件，因此开发人员应将其视为用户会话的可能结束（例如，用于发送分析数据）。

向 `hidden` 过渡也是页面停止用户界面更新和停止用户不想在后台运行的任何任务的好时机。

### 示例

> 在文档转向隐藏状态时暂停音乐

```js
// 本示例在文档可见时开始播放音乐曲目，在文档不再可见时暂停音乐。
document.addEventListener('visibilitychange', () => {
  console.log('visibilityState', document.visibilityState)
})
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    backgroundMusic.play()
  } else {
    backgroundMusic.pause()
  }
})
```

> 在文档转向隐藏状态时发送会话结束分析报告

```js
// 本示例将 hidden 转换视为用户会话的结束，并使用 Navigator.sendBeacon() API 发送相应的分析结果。
document.onvisibilitychange = () => {
  if (document.visibilityState === 'hidden') {
    navigator.sendBeacon('/log', analyticsData)
  }
}
```

- 方法二：监听 `blur` 和 `focus` 事件

```js
window.onfocus = () => {
  console.log('激活状态')
  this.onStart()
}
window.onblur = () => {
  console.log('未激活状态')
  this.onStop()
}
```

## JS获取代码运行时间

```js
console.time('run time')
var arr = []
for (let i = 0; i < 1000000; i++) {
  arr.push(i)
}
console.timeEnd('run time')
```

## js字符串转数字

- `Number()`

  ```js
  Number('123') // 123
  Number('123.456') // 123.456
  Number('123.56') // 123.56
  ```

- `parseInt()`

  ```js
  parseInt('123') // 123
  parseInt('123.456') // 123
  parseInt('123.56') // 123
  ```

- `parseFloat()`

  ```js
  parseFloat('123') // 123
  parseFloat('123.456') // 123.456
  parseFloat('123.56') // 123.56
  ```

- `+`

  ```js
  +'123' // 123
  +'123.456' // 123.456
  +'123.56' // 123.56

- `*1`

  ```js
  '123'*1 // 123
  '123.456'*1 // 123.456
  '123.56'*1 // 123.56
  ```

- `~~`

  ```js
  ~~'123' // 123
  ~~'123.456' // 123
  ~~'123.56' // 123
  ```

## 浏览器窗口宽高和元素坐标，尺寸

- [`el.getBoundingClientRect()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect) 获取DOM元素的大小及其各边缘相对于浏览器可视窗口的位置（不包括滚动条）：
  
  ```js
  var docEl = document.documentElement // window.document.documentElement
  ```
  
  ```html
  <div id="animate" ref="animate"></div>
  ```

  ```js
  const el = document.getElementById('animate') // 获取DOM元素
  // 或者 const el = this.$refs.animate
  // 元素上边缘距浏览器窗口上边界的距离，可正，可负，可为0
  console.log('distance:', el.getBoundingClientRect().top) // y 
  // 元素下边缘距浏览器窗口上边界的距离，可正，可负，可为0
  console.log('distance:', el.getBoundingClientRect().bottom) 
  // 元素左边缘距浏览器窗口左边界的距离，可正，可负，可为0
  console.log('distance:', el.getBoundingClientRect().left) // x 
  // 元素右边缘距浏览器窗口左边界的距离，可正，可负，可为0
  console.log('distance:', el.getBoundingClientRect().right) 
  // 元素的宽度（包括内边距padding和边框border）
  console.log('distance:', el.getBoundingClientRect().width) 
  // 元素的高度（包括内边距padding和边框border）
  console.log('distance:', el.getBoundingClientRect().height)
  ```

- `innerWidth` 只读的 `Window` 属性，返回以像素为单位的窗口的内部宽度。如果**垂直滚动条存在，则这个属性将包括它的宽度**。
  如果你需要获取除去滚动条和边框的窗口宽度，请使用根元素 `<html>` 的 `clientWidth` 属性。
  `innerWidth` 属性在任何表现类似于窗口的任何窗口或对象（例如框架或选项卡）上都是可用的。

  ```js
  let intViewportWidth = window.innerWidth // 视口宽度
  // document.documentElement.clientWidth
  ```

- `innerHeight` 浏览器窗口的视口（`viewport`）高度（以像素为单位）；如果有**水平滚动条，也包括滚动条高度**。
  任何窗口对象，如 `window`、`frame`、`frameset` 或 `secondary window` 都支持 `innerHeight` 属性。

  ```js
  let intViewportHeight = window.innerHeight // 视口高度
  ```

- `clientWidth` 返回元素的像素宽度（**仅包含内边距padding，不包含边框border、外边距margin和滚动条**）：

  ```js
  document.body.clientWidth
  document.documentElement.clientWidth // 视口宽度(不包括滚动条)
  ```

- `clientHeight` 返回元素的像素高度（**仅包含内边距padding，不包含边框border、外边距margin和滚动条**）：
  
  ```js
  document.body.clientHeight
  document.documentElement.clientHeight // 视口高度(不包括滚动条)
  ```
  
- `scrollWidth` 返回元素的像素宽度（**包含内边距padding，不包含边框border、外边距margin**）：
  
  ```js
  element.scrollWidth // 包括由于溢出滚动，而无法展示在可视窗口的不可见部分
  ```

- `scrollHeight` 返回元素的像素高度（**仅包含内边距padding，不包含边框border、外边距margin**）：
  
  ```js
  element.scrollHeight // 包括由于溢出滚动，而无法展示在可视窗口的不可见部分
  ```

- `scrollLeft` 可读取或设置元素滚动条到元素左边的距离
  
  ```js
  element.scrollLeft // 表示该元素内容水平滚动的像素数
  ```

- `scrollTop` 可读取或设置元素的内容垂直滚动的像素数
  
  ```js
  element.scrollTop // 表示该元素内容垂直滚动的像素数
  ```

  ```html
  <div id="app" ref="app" class="m-card" @scroll="onScroll">
    <div class="u-content"></div>
  </div>
  ```

  ```js
  onScroll () {
    const app = this.$refs.app
    console.log('app.scrollLeft:', app.scrollLeft) // 水平方向滚动像素数
    console.log('app.scrollTop:', app.scrollTop) // 垂直方向滚动像素数
  }
  ```

  ```css
  .m-card { width: 60px; height: 60px; overflow: auto; }
  .u-content { width: 300px; height: 300px; }
  ```

- `offsetWidth` 返回元素的像素宽度（**包含内边距padding和边框border，不包含外边距margin**）
  
  ```js
  document.body.offsetWidth
  // 如果元素被隐藏（例如：元素或者元素的祖先之一的元素的 style.display 被设置为 none），则返回 0。
  ```
  
- `offsetHeight` 返回元素的像素高度（**包含内边距padding和边框border，不包含外边距margin**）

  ```js
  document.body.offsetHeight
  // 如果元素被隐藏（例如：元素或者元素的祖先之一的元素的 style.display 被设置为 none），则返回 0。
  ```

- `offsetLeft` 返回当前元素相对于 `offsetParent` 节点左边界的偏移像素值：
  1. 包含元素向左偏移的像素值，元素的外边距 `margin`
  2. 包含 `offsetParent` 元素的左侧内边距 `padding`、边框 `border` 及滚动条
  3. `el.offsetParent` // 获取el被定位（设置position属性）的最近祖先元素
  4. 若祖先元素中没有设置定位的元素，则祖先元素为`<body>`
- `offsetTop` 返回当前元素相对于 `offsetParent` 节点顶部边界的偏移像素值：
  1. 包含元素顶部偏移的像素值，元素的外边距 `margin`
  2. 包含 `offsetParent` 元素的顶部内边距 `padding`、边框 `border` 及滚动条
  3. `el.offsetParent` // 获取el最近的祖先元素
- `clientX` 事件属性返回当事件被触发时鼠标指针相对于浏览器页面（即当前可视窗口）的水平坐标 **（相对于浏览器可视窗口）不计算水平滚动距离**
- `clientY` 事件属性返回当事件被触发时鼠标指针向对于浏览器页面（即当前可视窗口）的垂直坐标 **（相对于浏览器可视窗口）不计算垂直滚动距离**
- `pageX` 事件属性返回当事件被触发时鼠标指针相对于页面内容的水平坐标（包括滚动条）

  ```js
  // 浏览器横向滚动距离：
  const scrollLeft = window.pageXOffset || window.scrollX || document.documentElement.scrollLeft ||  document.body.scrollLeft
  
  e.pageX = e.clientX + window.pageXOffset //（浏览器横向滚动距离）
  ```

  ::: tip
  所有主流浏览器都支持 `pageXOffset` 和 `pageYOffset`；IE8及更早IE版本不支持该属性，但可以使用: `document.documentElement.scrollLeft` 和 `document.documentElement.scrollTop`
  :::
  
- `pageY` 事件属性返回当事件被触发时鼠标指针相对于页面内容的垂直坐标

  ```js
  // 浏览器垂直滚动距离：
  const scrollTop = window.pageYOffset || window.scrollY || document.documentElement.scrollTop || document.body.scrollTop
  
  e.pageY = e.clientY+ window.pageYOffset //（浏览器垂直滚动距离）
  ```

  ::: tip
  所有主流浏览器都支持 `pageXOffset` 和 `pageYOffset`；IE8及更早IE版本不支持该属性，但可以使用 `document.documentElement.scrollLeft` 和`document.documentElement.scrollTop`
  :::

- `screenX` 事件属性返回事件发生时鼠标指针相对于屏幕的水平坐标 **相对于电脑屏幕**
- `screenY` 事件属性返回事件发生时鼠标指针相对于屏幕的垂直坐标 **相对于电脑屏幕**
- `screen` 对象包含有关客户端显示屏幕的信息
  1. `screen.availHeight`：返回屏幕可用的高度（**不包括窗口任务栏**）
  2. `screen.availWidth`：返回屏幕可用的宽度（**不包括窗口任务栏**）
  3. `screen.colorDepth`：返回目标设备或缓冲器上的调色板的比特深度
  4. `screen.pixelDepth`：返回屏幕的颜色分辨率（**每像素的位数**）
  5. `screen.height`：返回屏幕的总高度
  6. `screen.width`：返回屏幕的总宽度

  ```js
  window.screen === screen // true
  ```

  ![Alt text](image-6.png)

## 组合式函数：自动添加和清除 `DOM` 事件监听器

- 创建组合式函数 `useEventListener.ts`：

```ts
import { onMounted, onUnmounted } from 'vue'

export function useEventListener(target: any, event: string, callback: Function) {
  // 如果你想的话，
  // 也可以用字符串形式的 CSS 选择器来寻找目标 DOM 元素
  onMounted(() => target.addEventListener(event, callback))
  onUnmounted(() => target.removeEventListener(event, callback))
}
```

## 组合式函数：监听目标元素上边缘距离浏览器底部距离触发动画

目标元素上边缘距离视口底部距离超过`80px`，触发浮动显示动画
### 参数

- `target`: 要监听的目标元素引用
- `offset`: 触发动画时的距离
- `targetTop`: 以目标元素的上边缘 `true`或下边缘 `false` 来计算 `offset`

### 创建 `useAnimation.ts` 函数：

```ts
import { ref } from 'vue'
import { useEventListener } from './event'

export function useAnimation (target: any, offset = 80, targetTop = true) {
  const visible = ref(false)
  // 节流
  function throttle (fn: Function, delay = 300): any {
    let valid = true
    return function () {
      if (valid) {
        valid = false // 将函数置为无效
        setTimeout(() => {
          fn()
          valid = true
        }, delay)
      }
      return false // valid为false时，函数不执行
    }
  }
  function scrollEvent () {
    const rect = target.value.getBoundingClientRect()
    let distance
    if (targetTop) { // 元素上边缘距离视口底部的距离
      distance = window.innerHeight - rect.top
    } else { // 元素下边缘距离视口底部的距离
      distance = window.innerHeight - rect.bottom
    }
    if (distance > offset) {
      visible.value = true
    } else {
      visible.value = false
    }
  }
  const throttleScroll = throttle(scrollEvent, 100)
  useEventListener(window, 'scroll', throttleScroll)
  return { visible }
}
```

- 在要使用的组件引入：

```vue
<script setup lang="ts">
import { ref } from 'head'
import { useAnimation } from './useAnimation'

const head = ref()
const { visible } = useAnimation(head)
</script>
<template>
  <h2 ref="head" class="text-animation" :class="{'text-visible': visible}">定睛细看</h2>
</template>
<style lang="less" scoped>
.text-animation {
  pointer-events: none;
  opacity: 0;
  transform: translateY(25px);
  transition: transform 500ms cubic-bezier(0, 0, 0.5, 1), opacity 500ms cubic-bezier(0, 0, 0.5, 1);
}
.text-visible {
  transform: translateY(0);
  opacity: 1;
  pointer-events: auto;
}
</style>
```

## 组合式函数：监听浏览器视口大小 & 判断是否是移动端

- 创建 `useResize.ts` 函数：

```ts
import { ref } from 'vue'
import { useEventListener } from './event'

// 按照惯例，组合式函数名以“use”开头
export function useResize () {
  // 被组合式函数封装和管理的状态
  const isMobile = ref(false)
  
  // 节流
  function throttle (fn: Function, delay = 300): any {
    let valid = true
    return function () {
      if (valid) {
        valid = false // 将函数置为无效
        Timeout(() => {
          fn()
          valid = true
        }, delay)
      }
      return false // valid为false时，函数不执行
    }
  }

  // 组合式函数可以随时更改其状态
  function resizeEvent (event: any) {
    isMobile.value = (window.innerWidth <= 768 || window.innerHeight <= 768)
  }
  const throttleResize = throttle(resizeEvent, 100)

  // 一个组合式函数也可以挂靠在所属组件的生命周期上
  // 来启动和卸载副作用
  // onMounted(() => window.addEventListener('resize', throttleResize))
  // onUnmounted(() => window.removeEventListener('resize', throttleResize))
  useEventListener(window, 'resize', throttleResize)

  // 通过返回值暴露所管理的状态
  return { isMobile }
}
```

- 在要使用的组件中引入使用：

```vue
<script setup lang="ts">
import { useResize } from './useResize'

const { isMobile } = useResize()
</script>

<template>isMobile: {{ isMobile }}</template>
```

## 组合式函数：监听用户滚动方向

通过监听滚动事件 `scroll`，计算滚动前后的位置变化来判断滚动方向

- 创建 `useScrollDirection.ts` 函数：

```ts
import { ref } from 'vue'
import { useEventListener } from './event'
export function useScrollDirection(throttleDelay = 100) {
  // 使用ref定义一个响应式变量，指示当前滚动方向是否向下
  const scrollDown = ref(false)
  // 记录上一次滚动的位置
  let lastScrollY = 0
  // 节流
  function throttle (fn: Function, delay = 300): any {
    let valid = true
    return function () {
      if (valid) {
        valid = false // 将函数置为无效
        setTimeout(() => {
          fn()
          valid = true
        }, delay)
      }
      return false // valid为false时，函数不执行
    }
  }
  // 监听滚动事件的函数
  const scrollEvent = () => {
    // 获取当前的滚动位置
    // 注：在 safari 浏览器中 currentScrollY 会出现负值，可将负值统一处理为 0 来和 google 浏览器行为统一
    const currentScrollY = window.pageYOffset || document.documentElement.scrollTop
    // 比较当前位置和上一次记录的位置，来确定滚动方向
    scrollDown.value = currentScrollY > lastScrollY
    // 更新上次滚动位置
    lastScrollY = currentScrollY
  }
  // 使用节流函数封装scrollEvent，以减少滚动事件的触发频率
  const throttleScroll = throttle(scrollEvent, throttleDelay)
  useEventListener(window, 'scroll', throttleScroll)
  // 返回一个对象，包含我们想要暴露给组件的状态或方法
  return { scrollDown }
}
```

- 在要使用的组件中引入使用：

```vue
<script setup>
import { useScrollDirection } from './useScrollDirection'

const { scrollDown } = useScrollDirection()
</script>

<template>scrollDown: {{ scrollDown }}</template>
```

## 组合式函数：异步数据请求封装

- 创建 `fetch.ts`:

```ts
// fetch.js
import { ref } from 'vue'
import { getAction } from '@/http'

export function useFetch (url: string) {
  const data = ref(null)
  const error = ref(null)

  getAction(url).then((res) => res.json())
    .then((json) => (data.value = json))
    .catch((err) => (error.value = err))

  return { data, error }
}
```

- 在组件中使用 `useFetch.ts`：

```vue
<script setup>
import { useFetch } from './fetch.ts'

const { data, error } = useFetch('...')
</script>
```

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

## 不使用滚动条，模拟滚动行为

> 使用场景：多个标签页可以滚动，同时又不显示滚动条，也不触发浏览器触摸板左右滑动时的快捷方式（例如后退和前进）

**实现方式：（触摸板滑动也会触发）监听滚轮事件，结合 transform: translate(${scrollLeft}px, 0) 模拟滚动效果**

[`Wheel Event` 参考文档](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/wheel_event)

`WheelEvent` 事件属性：
- `WheelEvent.deltaX` <Tag :bordered="false" color="cyan">只读</Tag>：返回一个浮点数（double），表示**水平方向的滚动量**。
- `WheelEvent.deltaY` <Tag :bordered="false" color="cyan">只读</Tag>：返回一个浮点数（double），表示**垂直方向的滚动量**。
- `WheelEvent.deltaZ` <Tag :bordered="false" color="cyan">只读</Tag>：返回一个浮点数（double）表示** z 轴方向的滚动量**。
- `WheelEvent.deltaMode` <Tag :bordered="false" color="cyan">只读</Tag>：返回一个无符号长整型数（unsigned long），表示 **delta\* 值滚动量的单位**。

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
