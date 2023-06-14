# Note 3

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

假设当前网页路由：`http://172.16.200.17:8080/agent`

![Alt text](image-4.png)

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
