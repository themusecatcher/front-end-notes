# Note 1

## 数组去重

```js
var values = [1, 1, 2, 3, 3, 4]
var mySet = new Set(values)
values = [...mySet]
console.log(values) // [1, 2, 3, 4]
```

## 非CJK脚本的换行规则 <Badge type="tip" text="长字母和数字" />

*CJK脚本是中国，日本和韩国（"中日韩"）脚本*

- word-wrap属性：允许长的内容可以自动换行。
- word-break属性：指定非CJK脚本的换行规则。

```css
.content {
  text-align: justify;
  overflow: hidden;
  word-break: break-all; // 允许在单词内换行（建议）
  word-wrap: break-word; // 在长单词或 URL 地址内部进行换行，其中单词会另起一行换行
}
```

## $nextTick()

- 在下次 DOM 更新循环结束之后执行延迟回调。**在修改数据之后立即使用这个方法，获取更新后的 DOM**。
- 将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。它跟全局方法 Vue.nextTick 一样，不同的是回调的 this 自动绑定到调用它的实例上。

```js
// 修改数据
this.message = 'changed'
// DOM 还没有更新
this.$nextTick(() => {
  // DOM 现在更新了
  // `this` 绑定到当前实例
  this.doSomethingElse()
})
```

### 异步更新队列

- Vue 在更新 DOM 时是异步执行的。只要侦听到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据变更。如果同一个 watcher 被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作是非常重要的。然后，在下一个的事件循环“tick”中，Vue 刷新队列并执行实际 (已去重的) 工作。Vue 在内部对异步队列尝试使用原生的 Promise.then、MutationObserver 和 setImmediate，如果执行环境不支持，则会采用 setTimeout(fn, 0) 代替。
- 例如，当你设置 vm.someData = 'new value'，该组件不会立即重新渲染。当刷新队列时，组件会在下一个事件循环“tick”中更新。多数情况我们不需要关心这个过程，但是如果你想基于更新后的 DOM 状态来做点什么，这就可能会有些棘手。虽然 Vue.js 通常鼓励开发人员使用“数据驱动”的方式思考，避免直接接触 DOM，但是有时我们必须要这么做。为了在数据变化之后等待 Vue 完成更新 DOM，可以在数据变化之后立即使用 Vue.nextTick(callback)。这样回调函数将在 DOM 更新完成后被调用。
- 因为 $nextTick() 返回一个 Promise 对象，所以你可以使用新的 ES2017 async/await 语法完成相同的事情：

```js
updateMessage: async function () {
  this.message = '已更新'
  console.log(this.$el.textContent) // => '未更新'
  await this.$nextTick()
  console.log(this.$el.textContent) // => '已更新'
}
```

## 监听滚动条变化

```vue
mounted () {
  // 防抖
  function throttle (fn, delay = 300) {
    var valid = true
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
  function showTop () {
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop
    console.log('滚动条位置：' + scrollTop)
  }
  window.onscroll = throttle(showTop, 300)
}
```

## `v-html` 使用

- `v-html`：更新元素的 innerHTML
- `v-text`：更新元素的内部文本

### 使用 `v-html` 并限制内容图片最大宽度

```html
<div class="content" v-html="content"></div>
```

1. 去掉 `scoped`

```less
<style lang="less">
.content {
  width: 600px;
  img {
    max-width: 100%;
  }
}
</style>
```

2. 使用 `>>>`

```less
<style scoped>
.u-content >>> img { max-width: 100%; } // 如果图片宽度超出600px，则会将其缩放到600px，宽度也会等比例进行缩小
</style>
```

3. 字符串全局替换 replace <Badge type="tip" text="推荐" />

```js
// 全局替换 <img 为 <img class="u-img"
this.content = this.content.replace(/\<img/gi,'<img class="u-img"')
// 或者 全局替换 <img 为 <img style="max-width:100%;"
this.content = this.content.replace(/<img/gi, '<img style="max-width:100%;"')
```

```less
.u-img {
  max-width: 100%;
}
```

4. `deep` 样式穿透 <Badge type="tip" text="较简单" />

```less
<style lang="less" scoped>
.content {
  /deep/ img {
    max-width: 100%;
  }
}
</style>
```

### 使用 `v-html` 对关键字进行标注

```js
// 关键字标蓝
const reg = new RegExp(this.keyword, 'g')
for (const data of this.resultData) {
  data.name = data.name.replace(reg, `<span class="blue">${key}</span>`)
  console.log('data:', data)
}
```

## 题目和题干类样式

```html
<div class="m-ques">
  <p class="u-head">题目1：</p>
  <p class="u-info">题干内容，题干内容，题干内容…</p>
</div>
```

- 使用 `calc()`

```less
.m-ques {
  // width: 240px;
  width: 100%;
  font-size: 16px;
  color: #333;
  line-height: 24px;
  min-height: 24px; // 防止多题目，内容为空时样式塌陷
  .u-head {
    width: 48px;
  }
  .u-info {
    margin-top: -24px;
    margin-left: 48px;
    width: calc(100% - 48px);
  }
}
```

- 使用 `display: flex; flex-shrink: 0;` <Badge type="tip" text="推荐" />

*flex-shrink 属性指定了 flex 元素的收缩规则。flex 元素仅在默认宽度之和大于容器的时候才会发生收缩，其收缩的大小是依据 flex-shrink 的值。*

*如果所有项目的 flex-shrink 属性都为1，当空间不足时，都将等比例缩小*

*如果一个项目的 flex-shrink 属性为0，其他项目都为1，则空间不足时，前者不缩小。*

```less
.m-ques {
  display: flex;
  font-size: 16px;
  color: #333;
  line-height: 24px;
  .u-head {
    flex-shrink: 0; // 该项目不缩小。默认1. 即空间不足时，项目将缩小
  }
}
```

- 使用 `display: inline-block`

```less
.m-ques {
  width: 600px;
  .u-head {
    display: inline-block;
    width: 20px;
    vertical-align: top;
  }
  .u-info {
    display: inline-block;
    max-width: 580px;
  }
}
```

## 复制文本到剪切板

```html
<p id="text">待复制文本</p>
<a @click="onCopy">{{ copyText }}</a>
```

```js
var copyText = 'copy'
onCopy () {
  const text = document.getElementById('text')
  navigator.clipboard.writeText(text.innerText || '').then(() => {
    /* clipboard successfully set */
    copyTxt = 'Copied'
  }, (err) => {
    /* clipboard write failed */
    copyTxt = err
  })
}
```

## 父组件调用子组件的属性或方法

```html
<div class="parent">
  <child ref="child"></child>
</div>
```

```js
this.$refs.child[attribute] // 即可调用子组件所有属性和方法
```

## 等边三角形

```html
<div class="triangle"></div>
```

```less
.triangle { // 等边三角形
  display: inline-block;
  height: 0;
  width: 0;
  border-bottom: calc(50px * sqrt(3)) solid @themeColor;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
}
```

## `<video>` 标签相关事件

```js
mounted () {
  const video = document.getElementById('veo')
  video.addEventListener('pause', () => { // 播放暂停时触发，视频播放完时也会触发
    this.vplay = true
    var current = Math.floor(video.currentTime) // 播放暂停时获取已播放时长并向下取整
    console.log('播放暂停时的已播放时长:', current)
  })
  video.addEventListener('playing', () => { // 开始播放时触发，包括暂停重新播放，快进到某个时间点开始播放
    this.vplay = false
    var current = Math.floor(video.currentTime) // 开始播放时获取已播放时长并向下取整
    console.log('开始播放时的已播放时长:', current)
  })
  video.addEventListener('timeupdate', () => { // 播放时触发，即与视频播放同步触发，播放时大约1s内触发4次
    var current = Math.floor(video.currentTime) // 播放时获取已播放时长并向下取整
    console.log('播放时的已播放时长:', current)
  })
  video.addEventListener('ended', () => { // 播放完成时触发
    var current = Math.floor(video.currentTime) // 播放完成时获取已播放时长并向下取整
    console.log('播放完成时的已播放时长:', current)
  })
  console.log('视频时长:', video.duration)
  // 设置视频的播放开始时间点，单位 s
  video.currentTime = 10
  video.play() // 播放
  video.pause() // 暂停
}
```

## 字母和ASCII码转换

- ASCII码转字符

```js
String.fromCharCode(65) // 'A'
String.fromCharCode(97) // 'a'
```

- 字符转ASCII码

```js
var str1 = 'A'
str1.charCodeAt() // 65
var str2 = 'a'
str2.charCodeAt() // 97
```

- ASCII表

![Alt text](image.png)

## CSS函数

calc() 函数用于动态计算长度值:

- 运算符前后都需要保留一个空格，例如：width: calc(100% - 10px)；
- 任何长度值都可以使用calc()函数进行计算；
- calc()函数支持 "+", "-", "*", "/" 运算；
- calc()函数使用标准的数学运算优先级规则；

## 将指定元素滚动到浏览器窗口的可视区域

*scrollIntoView()可以在所有HTML元素上调用，通过滚动浏览器窗口或某个容器元素，调用元素就可以出现在视口中。*

- 传入true参数或者不传入参数：窗口滚动之后会让调用元素的顶部与视口顶部尽可能平齐。
- 传入false作为参数：调用元素会尽可能全部出现在视口中，（可能的话，调用元素的底部会与视口底部平齐。）不过顶部不一定平齐。

### 场景1：将 id 为 content 的元素，滚动到可视窗口

```html
<a @click="onScroll"></a>
```

```js
onScroll () {
  const el = document.getElementById('content')
  el.scrollIntoView()
}
```

### 场景2：滚动到指定锚点

```html
<!-- (必须用id选择器) -->
<a href="#content"></a>
```

### 场景3：进入页面后，将指定元素显示在视口中

```html
<div id="content"></div>
```

```js
mounted () {
  this.goTop()
},
methods: {
  goTop () {
    const el = document.getElementById('content')
    el.scrollIntoView()
  }
}
```
