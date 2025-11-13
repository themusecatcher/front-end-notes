# Note 6

## Vue Router 中 `hash` 和 `history` 模式的区别

在 `Vue Router` 中，`hash` 模式和 `HTML5` 模式（`history` 模式）是两种不同的路由实现方式，它们在 `URL` 表现、服务器配置和功能特性上有显著区别。

### 1. `Hash` 模式

#### `URL` 格式

```http
http://example.com/#/user/profile
```

#### 特点

- 使用 `URL` 中的 `#` 符号后面的部分作为路由路径
- `#` 后面的内容不会发送到服务器
- 不需要服务器端特殊配置
- 兼容性更好（支持 `IE9+`）

#### 配置方式

```js
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    //...
  ]
})
```

#### 优点

- 部署简单，无需服务器配置
- 兼容性良好
- 不会出现 `404` 问题

#### 缺点

- `URL` 不够美观，有 `#` 符号
- 不利于 `SEO`

#### `Hash` 模式的路由切换原理

<br/>

`Hash` 模式利用了浏览器的一个特性：`URL` 中 `#` 后面的哈希值变化不会触发页面刷新，也不会重新向服务器发送请求

> 核心机制

```javascript
// 1. 监听 hashchange 事件
window.addEventListener('hashchange', () => {
  const hash = window.location.hash.slice(1) // 去掉 # 号
  // 根据 hash 更新视图
})

// 2. 改变 URL 的 hash
window.location.hash = '/user' // URL 变为 http://example.com/#/user
```

> Vue Router 中的具体实现

```js
// HashHistory 类核心方法
class HashHistory {
  constructor(router) {
    this.router = router
    // 确保 URL 以 #/ 开头
    ensureSlash()
    // 监听 hash 变化
    window.addEventListener('hashchange', () => {
      this.transitionTo(getHash())
    })
  }
  
  push(location) {
    // 改变 hash 不会导致页面刷新
    window.location.hash = '#' + location
  }
  
  replace(location) {
    // 使用 replace 不会产生历史记录
    const url = window.location.href.replace(/(#.*)$/, '#' + location)
    window.location.replace(url)
  }
}

function ensureSlash() {
  if (window.location.hash) {
    return
  }
  window.location.hash = '/'
}

function getHash() {
  const href = window.location.href
  const index = href.indexOf('#')
  return index === -1 ? '' : href.slice(index + 1)
}
```

> 路由切换流程

1. **用户点击链接** → 触发 `router-link` 组件
2. **调用 `router.push()`** → 设置 `window.location.hash`
3. **触发 `hashchange` 事件** → `Vue Router` 监听到变化
4. **匹配路由** → 根据 `hash` 找到对应组件
5. **更新视图** → 渲染对应组件

### 2. `HTML5` 模式 (`History` 模式)

#### `URL` 格式

```http
http://example.com/user/profile
```

#### 特点

- 使用 `HTML5 History API`（`pushState`, `replaceState`）
- `URL` 更加简洁美观
- 需要服务器端配合配置
- 需要现代浏览器支持

#### 配置方式

```js
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    //...
  ]
})
```

#### 服务器配置示例

<br/>

**Nginx 配置：**

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

**Apache 配置：**

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

**Node.js Express 配置：**

```js
const express = require('express')
const history = require('connect-history-api-fallback')

const app = express()
app.use(history())
```

#### 优点

- `URL` 简洁美观，没有 `#` 符号
- 更好的 `SEO` 支持
- 更符合传统 `URL` 习惯

#### 缺点

- 需要服务器端配置
- 如果配置不当，刷新页面会出现 `404`
- 兼容性要求较高

#### HTML5 模式的路由切换原理

<br/>

`History` 模式则利用了 `HTML5` 新增的 `History API`（主要是 `pushState` 和 `replaceState` 方法），使得前端可以操作浏览器的历史记录栈，并修改 `URL` 而不引起页面刷新

> 核心机制 - History API

```js
// 1. 添加历史记录并改变 URL
history.pushState(state, title, '/user') // URL 变为 http://example.com/user

// 2. 替换当前历史记录
history.replaceState(state, title, '/user')

// 3. 监听 popstate 事件（点击浏览器的前进/后退按钮时）
window.addEventListener('popstate', (event) => {
  const path = window.location.pathname
  // 根据路径更新视图
})
```

> Vue Router 中的具体实现

```js
// HTML5History 类核心方法
class HTML5History {
  constructor(router) {
    this.router = router
    // 监听浏览器前进后退
    window.addEventListener('popstate', (e) => {
      const current = this.getCurrentLocation()
      this.transitionTo(current)
    })
  }
  
  push(location) {
    // 使用 pushState 改变 URL
    history.pushState({ key: Date.now() }, '', location)
    this.transitionTo(location)
  }
  
  replace(location) {
    // 使用 replaceState 替换当前 URL
    history.replaceState({ key: Date.now() }, '', location)
    this.transitionTo(location)
  }
  
  getCurrentLocation() {
    return window.location.pathname + window.location.search
  }
  
  go(n) {
    window.history.go(n)
  }
}
```

> 路由切换流程

1. **用户点击链接** → 触发 `router-link` 组件
2. **调用 `router.push()`** → 执行 `history.pushState()`
3. **手动触发路由匹配** → `Vue Router` 主动匹配路由
4. **更新视图** → 渲染对应组件
5. **前进/后退处理** → 通过 `popstate` 事件监听

### 3. 主要区别对比

| 特性 | `Hash` 模式 | `HTML5` 模式 |
|------|-----------|------------|
| `URL` 表现形式 | 带 `#` 符号 (如 `http://example.com/#/home`) | 无 `#`，为标准路径 (如 `http://example.com/home`) |
| 服务器配置 | 无需特殊配置  | 必须配置，将所有非静态资源请求重定向到 `index.html` |
| 底层原理 | 基于 `hashchange` 事件 | 基于 `HTML5 History API` (`pushState`, `replaceState`)，监听 `popstate` 事件 |
| 浏览器兼容性 | 兼容性极好 (支持 `IE8+`) | 需要 `IE10+` 等现代浏览器支持 |
| `SEO` 友好性 | 较差，传统搜索引擎可能忽略 `#` 后内容 | 较好，`URL` 更规范，易于搜索引擎理解 |
| 路径包含 | `#` 后面部分 | 整个路径 |

### 4. 两种模式路由切换对比

#### 1. `URL` 改变方式

```javascript
// Hash 模式
window.location.hash = '/user'  // 触发 hashchange

// History 模式
history.pushState({}, '', '/user')  // 不会触发 popstate
```

#### 2. 事件监听机制

```javascript
// Hash 模式 - 自动监听
window.addEventListener('hashchange', callback)

// History 模式 - 需要手动处理
window.addEventListener('popstate', callback)  // 只监听浏览器行为
// pushState/replaceState 需要手动触发路由更新
```

#### 3. 完整实现示例

**`Hash` 模式完整流程：**

```js
class VueRouter {
  constructor(options) {
    this.mode = options.mode || 'hash'
    this.routes = options.routes
    
    if (this.mode === 'hash') {
      this.history = new HashHistory(this)
    } else {
      this.history = new HTML5History(this)
    }
  }
  
  push(location) {
    this.history.push(location)
  }
  
  replace(location) {
    this.history.replace(location)
  }
}
```

**router-link 组件实现：**

```vue
<template>
  <a 
    :href="href" 
    @click.prevent="navigate"
    :class="{ active: isActive }"
  >
    <slot></slot>
  </a>
</template>

<script>
export default {
  props: {
    to: String
  },
  computed: {
    href() {
      const base = this.$router.mode === 'hash' ? '#' : ''
      return base + this.to
    },
    isActive() {
      return this.$route.path === this.to
    }
  },
  methods: {
    navigate() {
      this.$router.push(this.to)
    }
  }
}
</script>
```

#### 路由切换关键区别对比

| 方面 | `Hash` 模式 | History 模式 |
|------|-----------|--------------|
| **URL 改变** | 修改 `window.location.hash` | 调用 `history.pushState()` |
| **事件监听** | `hashchange` 事件 | `popstate` 事件 + 手动触发 |
| **页面刷新** | 不会刷新页面 | 不会刷新页面 |
| **服务器请求** | 只请求 `#` 前部分 | 会请求完整路径（需配置） |
| **前进后退** | 通过 `hashchange` 自动处理 | 通过 `popstate` 自动处理 |
| **编程式导航** | 设置 `location.hash` | 调用 `history.pushState()` |

### 5. 实际使用建议

#### 使用 `Hash` 模式的情况

- 项目不需要考虑 `SEO`
- 服务器配置受限
- 需要支持较老浏览器
- 快速原型开发

#### 使用 `HTML5` 模式的情况

- 需要友好的 `URL` 进行 `SEO`
- 能够控制服务器配置
- 用户使用现代浏览器
- 生产环境部署

### 6. 示例代码

```js
// 路由配置
const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/user/:id', component: User }
]

// Hash 模式
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    //...
  ],
})

// History 模式
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    //...
  ],
})

// 导航守卫两种模式都适用
router.beforeEach((to, from) => { // 全局前置守卫（可选的第三个参数 next）
  // ...
  // 返回 false 以取消导航
  return false
})
router.afterEach((to, from) => { // 全局后置钩子（不会接受 next 函数也不会改变导航本身）
  sendToAnalytics(to.fullPath)
})
```

## 单点登录 `SSO`(Single Sign-On)

### 1. `session` + `cookie` 模式

用户登录时，子系统会将用户引导到认证中心去登录，账号密码验证通过后，建立（已有）一个 `session` 表格，一个键值对，`key` 对应生成的唯一 `sessionID`，`value` 是他对应的身份信息，每个键值对有一个过期时间，到期自动清除，该表格通常存储到 `redis` 数据库，同时将 `sessionID` 下发给用户，用户进行保存，登录完成。
当用户携带 `sessionID` 登录子系统时，子系统会请求认证中心去进行验证，认证中心去查询是否存在对应的键值对，有就返回用户信息给子系统，没有就是未登录或登录已过期

- 优点：有强控制力，比如：某天需要让某个用户或者某一批用户下线，只需要删除这些用户在表格中对应的键值对即可
- 缺点：所有的子系统每次请求都需要发起认证请求，每天需要接送非常大量的请求，需要做服务器集群，扩容，总体成本高，另外如果子系统扩容，认证中心也需要跟着扩容，成本高（大公司无所谓成本只在乎强控制力，中小型公司更在乎成本，牺牲强控制力）

### 2. `token` 模式（分布式的认证模式）

没有服务器键值对表格，首先到认证中心登录，认证中心验证没问题后不会保存任何信息，只会生成一个不可被篡改的 `token`，格式一般来说是 `JWT`（无法被篡改），然后认证中心会将 `token` 发送给用户，用户自行保存，然后当用户访问子系统时，用户携带该 `token`，子系统独立验证该 `token`，（验证方式比如，子系统与认证中心交换一个密钥，通过这个密钥自行去验证用户 `token`）。
此时，如果子系统需要扩容，则认证系统无需扩容，所以会说 `token` 模式是一种分布式的认证模式，即子系统自行认证。认证中心只管颁发，子系统只管认证，认证中心压力小

- 优点：成本低
- 缺点：认证中心对用户的控制力弱，无法让用户立即下线，因为 `token` 还被用户保存着。

### 3. 双 token 模式

`token` 模式未解决这种对用户控制力弱的问题，于是考虑采用折中的双 `token` 模式，用户去认证中心登录认证，认证成功后，认证中心返回两个 `token`，一个过期时间短的请求 `token`（`10min` 或 `20min` 等），一个过期时间长的刷新 `token`，当用户访问子系统时，只需携带过期时间短的 `token`，而子系统只需去验证请求 `token` 即可，当该 `token` 过期后，用户只需携带刷新 `token` 去认证中心换取请求 `token`（即每隔一段时间需要来认证中心认证一次，方便认证中心的控制）
