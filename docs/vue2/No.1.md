# Note 1

## `$nextTick()`

- 在下次 DOM 更新循环结束之后执行延迟回调。**在修改数据之后立即使用这个方法，获取更新后的 DOM**。
- 将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。它跟全局方法 `Vue.nextTick` 一样，不同的是回调的 this 自动绑定到调用它的实例上。

::: tip 提示
Vue 实现响应式并不是数据发生变化之后 DOM 立即变化，而是按一定的策略进行 DOM 的更新
简单来说，Vue 在修改数据后，视图不会立刻更新，而是等同一事件循环中的所有数据变化完成之后，再统一进行视图更新。
Vue 中 data 的数据变化是同步的，更新完就能拿到；但是 dom `的更新是异步的，需要用nextTick` 去即时获取

因为 Vue 是异步执行 DOM 更新的，想立即操作更新后的 DOM 就需要使用 `$nextTick`
:::

```js
// 修改数据
this.message = 'changed'
// DOM 还没有更新
this.$nextTick(() => {
  // DOM 现在更新了
  // `this` 绑定到当前实例
  this.doSomethingElse()
})

mounted () {
  this.$nextTick(() => {
    // Code that will run only after the
    // entire view has been rendered
  })
}
```

::: tip 用途
在 `created` 和 `mounted` 阶段，如果需要操作渲染后的视图，也要使用 `nextTick` 方法。<br>
官方文档说明：<br>
**注意 mounted 不会承诺所有的子组件也都一起被挂载。如果你希望等到整个视图都渲染完毕，可以用 vm.$nextTick 替换掉 mounted**
:::

### 异步更新队列

- Vue 在更新 DOM 时是异步执行的。只要侦听到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据变更。如果同一个 watcher 被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作是非常重要的。然后，在下一个的事件循环“tick”中，Vue 刷新队列并执行实际 (已去重的) 工作。Vue 在内部对异步队列尝试使用原生的 `Promise.then``、MutationObserver` 和 `setImmediate，如果执行环境不支持，则会采用` setTimeout(fn, 0) 代替。
- 例如，当你设置 vm.someData = 'new value'，该组件不会立即重新渲染。当刷新队列时，组件会在下一个事件循环“tick”中更新。多数情况我们不需要关心这个过程，但是如果你想基于更新后的 DOM 状态来做点什么，这就可能会有些棘手。虽然 Vue.js 通常鼓励开发人员使用“数据驱动”的方式思考，避免直接接触 DOM，但是有时我们必须要这么做。为了在数据变化之后等待 Vue 完成更新 DOM，可以在数据变化之后立即使用 `Vue.nextTick(callback)`。这样回调函数将在 DOM 更新完成后被调用。
- 因为 `$nextTick()` 返回一个 Promise 对象，所以你可以使用新的 ES2017 `async/await` 语法完成相同的事情：

```js
updateMessage: async function () {
  this.message = '已更新'
  console.log(this.$el.textContent) // => '未更新'
  await this.$nextTick()
  console.log(this.$el.textContent) // => '已更新'
}
```

## `v-html` 使用

- `v-html`：更新元素的 `innerHTML`
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

3. 字符串全局替换 `replace` <Badge type="tip" text="推荐" />

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

## 父组件调用子组件的属性或方法

```html
<div class="parent">
  <child ref="child"></child>
</div>
```

```js
this.$refs.child[attribute] // 即可调用子组件所有属性和方法
```

## 定义全局 CSS 变量

*`vue.config.js`*

```js
css: {
  loaderOptions: {
    less: {
      modifyVars: {
        // less vars，customize ant design theme，可以带单引号也可以不带
        themeColor: '#1677FF', // 定义全局变量，所有文件均可直接使用
      },
      // 等价于
      // globalVars: {
      // 可以带单引号也可以不带
      //  themeColor: '#D93844'
      // },
      // DO NOT REMOVE THIS LINE
      javascriptEnabled: true
    }
  }
}
```

## 全局注册组件

*在 `main.js` 中进行全局注册*

```js
import Page from '@/components/Button'
Vue.component('Button', Button) // 全局注册 Button 组件
```

## `ref` & `$refs`

ref用来给元素或子组件注册引用信息。

- 如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素
- 如果用在子组件上，引用就指向组件实例

```vue
<ComponentName ref="child" />
```

### 父组件引用子组件的属性和方法：

```js
this.$refs.child.属性
this.$refs.child.方法
```

### 子组件调用父组件的属性和方法：

```js
this.$parent.属性
this.$parent.方法
```

## CSS `writing-mode` 属性

定义了文本在水平或垂直方向上如何排布

```css
.u-font {
  writing-mode: vertical-rl;
  -webkit-writing-mode: vertical-rl;
  -ms-writing-mode: vertical-rl;
}
```

*语法格式如下：writing-mode: horizontal-tb | vertical-rl | vertical-lr | sideways-rl | sideways-lr*

- `horizontal-tb`：水平方向自上而下的书写方式。即 `left-right-top-bottom`
- `vertical-rl`：垂直方向自右而左的书写方式。即 `top-bottom-right-left`
- `vertical-lr`：垂直方向内内容从上到下，水平方向从左到右
- `sideways-rl`：内容垂直方向从上到下排列
- `sideways-lr`：内容垂直方向从下到上排列

## 网站整体灰度转换

*在项目入口文件App.vue中进行设置：*

- 当 `filter` 不为 `none` 的时候，如果该元素或者其子元素具有 `absolute` 或 `fixed` 属性，那么它会为其创建一个新的包含块/容器，会造成该 `absolute` 或 `fixed` 元素的定位发生变化（就是改变了 `absolute` 或 `fixed` 元素的定位父元素，变成新创建的元素）。
- 例如：当在 `body` 标签中使用了 `filter` 属性后 `body { filter: grayscale(100%);`， `filter` 就会生成一个新的包含块，其位置大小和 body 一样，然后 `fixed` 元素就会根据这个包含块进行定位，导致定位出现问题。
- 如果 `filter` 设置在根元素上 `html { filter: grayscale(100%);`，**它是不会为 absolute 或 fixed 子元素创建新的包含块的**，因此我们可以通过将 `filter` **设置在根元素（html）上来避免定位问题**。

```js
created () {
  this.getMournDate()
},
methods: {
  getGrayDate () {
    // 调用接口获取后台设置的追悼日期范围（起始日~截止日）
    this.mournDate = {
      start: 1669824000000, // 2022-12-01
      end: 1670601600000 // 2022-12-10
    }
    this.checkGray(this.mournDate)
  },
  checkGray (mournDate) {
    var now = new Date().getTime()
    if (mournDate.start <= now && now <= mournDate.end) {
      // 追悼日只有设置在html元素上才不会影响fixed和absolute定位
      this.setGray()
      setTimeout(() => { // 自动取消黑白
        this.cancelGray()
      }, mournDate.end - now)
    } else {
      this.cancelGray()
      if (now < mournDate.start) { // 自动变为黑白
        setTimeout(() => {
          this.setGray()
        }, mournDate.start - now)
      }
    }
  },
  setGray () {
    document.documentElement.style.filter = 'grayscale(100%)'
  },
  cancelGray () {
    document.documentElement.style.filter = 'none'
  }
}
```

## `$route` & `$router`

假设当前路由：`http://localhost:8080/checkDetail`

- this.$route：是当前路由对象，是一个局部的对象，里面包含`name`、`path`、`query`和`params`等属性，如下图：

![Alt text](image-2.png)

- this.$router：是全局路由对象，可以在任意页面实现路由跳转，任何页面都可以调用其 `push()`, `back()`、`replace()`, `go()` 等方法

```html
<router-link :to="{path:'/listingService', query: {tab: 1}}" target="_blank">路由跳转</router-link>
<!-- <router-link> 等同于调用 router.push() -->
```

```js
// 字符串
this.$router.push('/result')
// 对象
this.$router.push({ path: '/result' })
// 命名的路由
this.$router.push({ name: 'Result', params: { tag: 1 } })
// 带查询参数即：/result?tag=1
this.$router.push({ path: '/result', query: { tag: 1 } })
// 在新页面打开路由
let route = this.$router.resolve({
  path: '/list',
  query: { id:96 }
})
window.open(route.href, '_blank')
```

![Alt text](image-3.png)

## window.location对象

`Location` 接口表示其链接到的对象的位置（`URL`）。所做的修改反映在与之相关的对象上。 `Document` 和 `Window` 接口都有这样一个链接的 `Location`，分别通过 `Document.location` 和 `Window.location` 访问。

属性 | 描述
-- | --
`location.href` | 包含整个 `URL` 的一个 [`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)
`location.protocol` | 包含 `URL` 对应协议的一个 `DOMString`，最后有一个":"
`location.host` | 包含了域名的一个 `DOMString`，可能在该串最后带有一个":"并跟上 `URL` 的端口号
`location.hostname` | 包含 `URL` 域名的一个 `DOMString`
`location.port` | 包含端口号的一个 `DOMString`
`location.pathname` | 包含 `URL` 中路径部分的一个 `DOMString`，开头有一个 /
`location.search` | 包含 `URL` 参数的一个 `DOMString`，开头有一个“?”
`location.hash` | 包含块标识符的 `DOMString`，开头有一个 #
`location.username` | 包含 `URL` 中域名前的用户名的一个 `DOMString`
`location.password` | 包含 `URL` 域名前的密码的一个 `DOMString`
`location.origin`<Badge type="tip" text="只读" /> | 包含页面来源的域名的标准形式 `DOMString`

假设当前网页路由：`http://172.16.200.17:8080/agent`

![Alt text](image-4.png)
