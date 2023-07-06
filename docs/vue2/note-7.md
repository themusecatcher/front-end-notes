# Note 7

## 监听当前页面是否处于激活状态

- 方法一：监听 `visibilitychange` 事件

[`visibilitychange` 参考文档](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/visibilitychange_event)

> 当其选项卡的内容变得可见或被隐藏时，会在文档上触发 `visibilitychange` (能见度更改) 事件。<br>该事件不包括文档的更新的可见性状态，但是您可以从文档的 `visibilityState` 属性中获取该信息。

::: tip 注意：
- 当 `visibleStateState` 属性的值转换为 `hidden` `时，Safari` 不会按预期触发 `visibilitychange`；因此，在这种情况下，您还需要包含代码以侦听 `pagehide` 事件。（**经测试目前最新版已无该问题**）
- 出于兼容性原因，请确保使用 `document.addEventListener` 而不是 `window.addEventListener` 来注册回调。Safari <14.0 仅支持前者。
:::

`Document.onvisibilitychange` 是一个事件处理方法，它将在该对象的 `visibilitychange` 事件被触发时调用。

```js
// 本示例在文档可见时开始播放音乐曲目，在文档不再可见时暂停音乐。
document.addEventListener('visibilitychange', function () {
  console.log('visibilityState', document.visibilityState)
})
document.addEventListener('visibilitychange', function () {
  if (document.visibilityState === 'visible') {
    backgroundMusic.play()
  } else {
    backgroundMusic.pause()
  }
})
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

## `mixins` 混入

[mixin](https://v2.cn.vuejs.org/v2/guide/mixins.html)

混入 (mixin) 提供了一种非常灵活的方式，来分发 Vue 组件中的可复用功能。一个混入对象可以包含任意组件选项。
当组件使用混入对象时，所有混入对象的选项将被“混合”进入该组件本身的选项。

```js
// 定义一个混入对象
var myMixin = {
  created: function () {
    this.hello()
  },
  methods: {
    hello: function () {
      console.log('hello from mixin!')
    }
  }
}
```

```js
// 定义一个使用混入对象的组件
var Component = Vue.extend({
  mixins: [myMixin]
})

var component = new Component() // => "hello from mixin!"
```

## vue组件中引入外部JS和CSS

- 引入外部JS文件资源

  在 `public/index.html` 入口文件中全局引入：

  ```html
  <body>
    …
    <script type='text/javascript' src='https://www.***.com/min.js'></script>
  </body>
  ```

- 引入外部CSS文件资源

  **1. 使用 `@import` 在 `app.vue` 中全局引入外部css资源：**

    ```css
    <style scoped>
    @import 'https://www.***.com/min.css';
    </style>
    ```

  **2. 使用 `@import` 在单个vue组件中局部引入外部css资源：**

    ```css
    <style scoped>
    @import 'https://www.***.com/min.css';
    </style>
    ```

  **3. 使用 `<link />` 标签在 `public/index.html` 入口文件中的 `<head></head>` 中全局引入：**

  ```html
  <link rel="stylesheet" type="text/css" href="https://www.***.com/min.css" />
  ```

  **4. 使用 `<link />` 标签在单个vue组件中引入：**

  ```js
  created () {
    const links = [
      { rel: 'stylesheet', href: 'https://www.***.com/min.css' }
    ]
    for (const item of links) {
      const link = document.createElement('link')
      link.rel = item.rel
      link.href = item.href
      document.head.appendChild(link)
    }
  }
  ```

  **5. 使用 `<link />` 标签在单个vue组件中局部引入外部css资源：**

  ```html
  <template>
    <div class="iframe">
      <link href="https://www.***.com/min.css" rel="stylesheet" type="text/css"/>
    </div>
  </template>
  ```

- 在单个组件中引入本地样式文件例如：demo.less

  **1. 在 `<script></script>` 标签中使用相对路径直接引入：**

  ```js
  import './demo.less'
  // 不能直接引入外部网络样式文件，但可以在demo.less中引入：@import 'https//www.***.com/demo.css'
  ```

  **2. 在 `<style></style>` 中使用相对路径引入：**

  ```css
  @import './demo.less'
  ```

## 背景图等比放大或缩小

```html
<div class="m-panel">
```

```css
.m-panel {
  width: 1200px;
  height: 540px;
  background-color: rgba(0, 0, 0, 0.44);
  background-image: url('background-image.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover; /* 或 contain */
  border-radius: 6px;
}
```

## 元素垂直自适应均分排列 `flex-direction: column;`

```html
<div class="m-tab">
  <p class="u-tab"></p>
  <p class="u-tab"></p>
  <p class="u-tab"></p>
  <p class="u-tab"></p>
  <p class="u-tab"></p>
</div>
```

```less
.m-tab {
  width: 240px;
  height: 600px; // 只设置总高度，子元素在垂直方向上均分排列
  display: flex;
  flex-direction: column;
  .u-tab {
    background: rgba(81, 84, 87, 0.79);
    transition: background 0.3s;
    flex: 1; // 让所有弹性盒模型对象的子元素都有相同的长度，且忽略它们内部的内容
    text-align: center;
    cursor: pointer;
  }
}
```

## CSS垂直居中

```html
<div class="m-parent">
  <div class="u-child"></div>
</div>
```

- 使用 `vertical-align` 设置行内元素（`inline-block` 或 `inline`）在垂直方向居中

```less
.m-parent { // 外层父元素
  width: 500px;
  height: 400px;
  background: #1890FF;
  &:before { // 利用伪元素，设置一个高度100%的参考 或者after也一样
    content: '';
    display: inline-block;
    vertical-align: middle;
    height: 100%;
  }
  .u-child { // 目标垂直居中的子元素
    width: 50px;
    height: 40px;
    background: #FBBF00;
    display: inline-block;
    vertical-align: middle;
  }
}
```

- 使用 `calc()` 计算属性配合 `position: relative;` 和 `top` 属性，垂直居中

```css
.m-parent {
  width: 500px;
  height: 400px;
  background: #1890FF;
}
.u-child {
  width: 50px;
  height: 40px;
  background: #FBBF00;
  position: relative;
  top: calc(50% - 20px);
}
```

- 使用 `position: relative;` 和 `transform` 属性，垂直居中

```css
.m-parent {
  width: 500px;
  height: 400px;
  background: #1890FF;
}
.u-child {
  width: 50px;
  height: 40px;
  background: #FBBF00;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
```

- 使用 `display: flex;` 设置水平垂直居中

```css
.m-parent {
  width: 500px;
  height: 400px;
  background: #1890FF;
  display: flex;
  align-items: center;
  justify-content: center;
}
.u-child {
  width: 50px;
  height: 40px;
  background: #FBBF00;
}
```

- 使用 `position: absolute; margin: auto;` 设置水平垂直居中

```css
.m-parent {
  width: 500px;
  height: 400px;
  background: #1890FF;
  position: relative;
}
.u-child {
  width: 50px;
  height: 40px;
  background: #FBBF00;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: 0 auto; /* 水平居中 */
  margin: auto 0; /* 垂直居中 */
  margin: auto; /* 水平垂直居中 */
}
```

## 表格样式

![Alt text](image-12.png)

```html
<div class="m-table-wrap">
  <table class="m-table" cellspacing="0">
    <tr class="m-title">
      <th width="338">企业简称</th>
      <th width="130">企业代码</th>
      <th width="130">转让方向</th>
      <th width="130">意向报价(元/股)</th>
      <th width="130">委托数量(股)</th>
    </tr>
    <template v-if="tableData.length">
      <tr v-for="(item, index) in tableData" :key="index">
        <td>
          <div class="m-ellipsis">
            <router-link :to="{path: '/listingService/EnterpriseDetail', query: { fundCode: item.companyCode, tab: 1 }}" :title="item.companyName">{{ item.companyName || '--' }}</router-link>
          </div>
        </td>
        <td>
          <router-link :to="{path: '/listingService/EnterpriseDetail', query: { fundCode: item.companyCode, tab: 1 }}">{{ item.showCode || '--' }}</router-link>
        </td>
        <td>{{ item.transDirection === '1' ? '买入':'卖出' }}</td>
        <td>{{ item.intentionPrice | moneyFormat }}</td>
        <td>{{ item.entrustShare | moneyFormat }}</td>
      </tr>
    </template>
    <template v-else>
      <tr>
        <td colspan="5">
          <div class="m-loading" v-if="loading">
            <img class="u-loading" src="@/assets/images/loading.gif"/>
          </div>
          <div class="m-nodata-box ta-center" v-if="!tableData.length&&!loading">
            <img src="@/assets/images/noneData.png" alt="暂无数据"/>
            <p class="c9 f18 mt10">暂无数据</p>
          </div>
        </td>
      </tr>
    </template>
  </table>
</div>
```

```less
.m-table-wrap {
  width: 1058px;
  background: #FFFFFF;
  border-radius: 4px;
  padding: 0 20px 16px;
}
.m-table {
  .m-title {
    height: 58px;
    background: #F2F4F8;
    font-size: 16px;
    font-weight: 500;
    color: #333333;
  }
  tr th {
    &:first-child {
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }
    &:last-child {
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }
  }
  tr {
    th, td {
      padding-left: 20px;
      padding-right: 20px;
      text-align: left;
    }
    td {
      height: 22px;
      font-size: 14px;
      padding-top: 14px;
      padding-bottom: 14px;
      white-space: nowrap; // 列表所有数据不换行
    }
  }
  .m-ellipsis {
    width: 338px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #333;
    &:hover {
      color: @linkColor;
    }
  }
}
```
