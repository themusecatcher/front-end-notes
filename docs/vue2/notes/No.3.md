# Note 3

<BackTop />

## 父组件监听子组件生命周期

1. `hook` 监听
    - 在父组件 `Parent.vue` 中

    ```html
    <Child @hook:mounted="onMounted" />
    ```

    ```js
    onMounted () {
      console.log('父组件监听到子组件触发mounted！！！')
    }
    ```

    - 在子组件 `Child.vue` 中

    ```js
      mounted () {
        console.log('子组件Child触发mounted！！！')
      }
    ```

2. `$emit` 触发：
    - 在父组件 `Parent.vue` 中

    ```html
    <Child @childMounted="onMounted" />
    ```

    ```js
    onMounted () {
      console.log('父组件监听到子组件触发mounted！！！')
    }
    ```

    - 在子组件 `Child.vue` 中

    ```js
    mounted () {
      console.log('子组件Child触发mounted！！！')
      this.$emit('childMounted')
    }
    ```

## `Vue.use(plugin)`

- 参数：{Object | Function} plugin
- 用法：安装 `Vue.js` 插件。如果**插件是一个对象，必须提供 install 方法**。如果**插件是一个函数，它会被作为 install 方法**。`install` 方法调用时，会将 `Vue` 作为参数传入。

::: tip 提示
该方法需要在调用 `new Vue()` 之前被调用。
**当 install 方法被同一个插件多次调用，插件将只会被安装一次**。
:::

## 路由中传递对象或数组参数

- 传递对象参数：

```js
const player = {
  name: 'curry',
  age: 30
}

// 或只使用JSON.stringify()转化为字符串即可
this.$router.push({ path: '/user/login', query: { player: encodeURIComponent(JSON.stringify(player)) } })
```

- 接收对象参数：

```js
const player = JSON.parse(decodeURIComponent(this.$route.query.player))
```

## 监听对象中某个属性值的变化

*监听当前路由对象 `$route`*

- 直接监听整个对象变化

```js
watch:{
  $route (to, from) {
    console.log('to:', to)
    console.log('query:', to.query)
  }
}
```

*监听普通对象 `player.name` 值的变化*

- 使用计算属性，监听单一属性变化

```js
computed: {
  name () {
    return this.player.name 
  }        
}
watch: {
  name (to, from) {
    console.log('to:', to)
  }
}
```

- 使用 `handler` 监听单一属性变化

```js
watch: {
  'player.name': {
    handler (to, from) {
      console.log('to:', to)
    }
  }
}
```

- 使用 `deep` 属性，监听整个对象的变化

```js
watch: {
  player: {
    handler (to, from) {
      console.log('to:', to)
    },
    deep: true
  }
}
```

- 同时监听多个变量的变化

```js
computed: {
  props () {
    return [this.content, this.gap, this.color, this.fontSize, this.fullscreen]
  }
},
watch: {
  props: {
    handler () {
      this.renderWatermark()
    },
    deep: true
  }
}
```

## `mixins` 混入

[mixin](https://v2.cn.vuejs.org/v2/guide/mixins.html)

混入 (mixin) 提供了一种非常灵活的方式，来分发 `Vue` 组件中的可复用功能。一个混入对象可以包含任意组件选项。
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

## `Vue` 组件中引入外部 `JS` 和 `CSS`

[参考文档](https://zhuanlan.zhihu.com/p/379504188)

- 引入外部 `JS` 文件资源

  在 `public/index.html` 入口文件中全局引入：

  ```html
  <body>
    …
    <script type="text/javascript" src="https://www.***.com/min.js"></script>
  </body>
  ```

- 引入外部 `CSS` 文件资源

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

## 路由切换时滚动到页面顶部

- `scrollTo()`

  把内容滚动到指定的坐标

  语法：`scrollTo(xpos, ypos)`
  
  参数：

  - `xpos`：必需。要在窗口文档显示区左上角显示的文档的 `x` 坐标。
  - `ypos`：必需。要在窗口文档显示区左上角显示的文档的 `y` 坐标。

  ```js
  router.afterEach(() => {
    // 路由切换时滚动到页面顶部
    window.scrollTo(0, 0)
  })
  ```

- `scrollBehavior()`

  [参考文档](https://router.vuejs.org/zh/guide/advanced/scroll-behavior.html)

  ```js
  const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
    scrollBehavior () {
      return { x: 0, y: 0 }
    }
  })
  ```

## vue监听动画开始和动画结束事件

```html
<span class="u-dot" @animationstart="startCallback" @animationend="endCallback"></span>
```

```js
startCallback () {
  console.log('动画开始')
},
endCallback () {
  console.log('动画结束')
}
```

```less
.u-dot-item {
  width: 10px;
  height: 10px;
  animation: spinMove 2s ease-in-out;
  -webkit-animation: spinMove 2s ease-in-out;
}
@keyframes spinMove {
  to {
    transform: rotate(360deg);
  } // from: 0%  to: 100%
}
```
