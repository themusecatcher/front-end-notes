# Note 3

<BackTop />

## [Keep-Alive](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Reference/Headers/Keep-Alive)

`HTTP Keep-Alive` 响应标头和请求标头**允许消息发送者提示连接的状态，还可以用来设置超时时长和最大请求数**。

::: tip 备注
要使得 `Keep-Alive` 有效，消息必须包含 `Connection: keep-alive` 标头。
:::

`HTTP/1.0` 默认在每次请求/响应交互后关闭连接，因此 `HTTP/1.0` 中的持久连接必须经过明确协商。一些客户端和服务器可能希望与以前的持久连接方式兼容，可以使用 `Connection: keep-alive` 请求标头来实现这一点。连接的其他参数可通过 `Keep-Alive` 标头请求。

::: warning 警告
`HTTP/2` 和 `HTTP/3` 禁止使用特定于连接的标头字段，如 `Connection` 和 `Keep-Alive`。`Chrome` 浏览器和 `Firefox` 浏览器在 `HTTP/2` 响应中忽略了它们，但 `Safari` 浏览器符合 `HTTP/2` 规范要求，不会加载任何包含它们的响应。
:::

### 语法

```http
Keep-Alive: <parameters>
```

### 指令

`<parameters>`: 一系列用逗号隔开的参数，每一个参数由一个标识符和一个值构成，并使用等号（'='）隔开。下述标识符是可用的：
  - `timeout`：指定了主机允许空闲连接保持打开状态的时长（以秒为单位的整数）。当主机没有接收或发送数据时，就认为连接是空闲的。主机可以保持连接超过 `timeout` 秒，但应该确保至少保持连接 `timeout` 秒。
  - `max`：在此连接关闭之前，可以发送的请求的最大值。在非管道连接中，除了 `0` 以外，这个值是被忽略的，因为需要在紧跟着的响应中发送新一次的请求。`HTTP` 管道连接则可以用它来限制管道的使用。

### 示例

<br/>

包含 `Keep-Alive` 标头的响应示例：

```http
HTTP/1.1 200 OK
Connection: Keep-Alive
Content-Encoding: gzip
Content-Type: text/html; charset=utf-8
Date: Thu, 11 Aug 2016 15:23:13 GMT
Keep-Alive: timeout=5, max=200
Last-Modified: Mon, 25 Jul 2016 04:32:39 GMT
Server: Apache

(body)
```

## 浏览器的跨域

浏览器存在跨域限制的核心原因是 **安全策略**，而本地开发时不存在跨域问题是因为开发者通常会通过特定技术手段绕过限制。

### 跨域限制的本质

<br/>

参考：[浏览器的同源策略](https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy)

它能帮助阻隔恶意文档，减少可能被攻击的媒介。例如，它可以防止互联网上的恶意网站在浏览器中运行 `JS` 脚本，从第三方网络邮件服务（用户已登录）或公司内网（因没有公共 `IP` 地址而受到保护，不会被攻击者直接访问）读取数据，并将这些数据转发给攻击者。

跨域并不是请求发不出去，请求能发出去，服务端能收到请求并正常返回结果，只是结果被浏览器拦截了。

- 源的定义

如果两个 `URL` 的协议、端口（如果有指定的话）和主机都相同的话，则这两个 `URL` 是同源的。这个方案也被称为“协议/主机/端口元组”，或者直接是“元组”。（“元组”是指一组项目构成的整体，具有双重/三重/四重/五重等通用形式。）

### 一、浏览器的跨域限制本质：同源策略（Same-Origin Policy）

#### 1. **为什么需要跨域限制？**

- **安全防护**：防止恶意网站通过脚本窃取用户敏感数据（如 `Cookie`、`LocalStorage`、`SessionStorage`）。
- **隔离风险**：避免跨站脚本攻击（`XSS`）、跨站请求伪造（`CSRF`）等安全漏洞。

#### 2. **同源策略的判定规则**

- **同源条件**：协议（`HTTP/HTTPS`）、域名（主域+子域）、端口 **三者完全相同**。
- **示例**：
  | URL | 与 `http://example.com/page` 是否同源 |
  |--|--|
  | `http://example.com/page2` | ✅ 同源（仅路径不同）|
  | `https://example.com/page` | ❌ 协议不同（HTTP vs HTTPS）|
  | `http://sub.example.com/page` | ❌ 域名不同（主域 vs 子域）|
  | `http://example.com:8080/page` | ❌ 端口不同（80 vs 8080）|

#### 3. **受同源策略限制的操作**

- **数据访问**：  
  - 无法通过 `XMLHttpRequest` 或 `fetch` 跨域请求  
  - 无法读取跨域 `iframe` 的 `DOM（如` `document.getElementById`）
- **存储隔离**：  
  - 跨域网站无法读取其他源的 `Cookie`、`LocalStorage`、`SessionStorage`、`IndexedDB` 等存储性内容。
- **脚本限制**：  
  - 跨域脚本加载（如 `<script>` 标签）允许，但无法直接访问其内容

### 二、绕过跨域限制的方法

#### 1. `JSONP`和`AJAX`

<br/>

`Jsonp`(`JSON with Padding`) 是 `json` 的一种"使用模式"，可以让网页从别的域名（网站）那获取资料，即跨域读取数据。

为什么我们从不同的域（网站）访问数据需要一个特殊的技术(`JSONP`)呢？这是因为同源策略。
同源策略，它是由 `Netscape` 提出的一个著名的安全策略，现在所有支持 `JavaScript` 的浏览器都会使用这个策略。
`JSONP` 和 `AJAX` 相同，都是客户端向服务器端发送请求，从服务器端获取数据的方式。但 `AJAX` 属于同源策略，`JSONP` 属于非同源策略（跨域请求）。

相同点：
- 使用的目的一致，都是客户端向服务端请求数据，将数据拿回客户端进行处理。
  
不同点：
- `ajax` 请求是一种官方推出的请求方式，通过 `xhr` 对象去实现，`jsonp` 是 `json` 的一种"使用模式"，民间发明，script 标签实现的请求，需要和后端约定。
- `ajax` 是一个异步请求，`jsonp` 是一个同步请求
- `ajax` 存在同源检查，`jsonp` 不存在同源检查，后端无需做解决跨域的响应头。
- `ajax` 支持各种请求的方式，而 `jsonp` 只支持 `get` 请求
- `ajax` 的使用更加简便，而 `jsonp` 的使用较为麻烦。

> `JSONP` 核心原理

  1. 利用 `<script>` 标签的跨域能力<br/>
    浏览器允许加载不同域的脚本（如 `CDN` 上的 `JS` 库），`JSONP` 借此特性实现跨域请求。

  2. 约定一个回调函数名<br/>
    客户端在请求时通过 `URL` 参数（如 `?callback=handleData`）告诉服务器：“请把数据包裹在这个函数里返回”。

  3. 服务器动态生成 `JS` 代码<br/>
    服务器返回的响应不是纯 `JSON`，而是一段可执行的 `JS` 代码，例如：

  ```js
  handleData({"user": "Alice", "age": 30})
  ```

  4. 客户端自动执行回调函数<br/>
   浏览器加载完脚本后，自动调用预先定义好的回调函数（如 `handleData`）,实现数据传递。

> `JSONP` 使用示例：

  ```js
  // 1. 定义回调函数
  function handleResponse(data) {
    console.log("Received data:", data)
  }

  // 2. 动态插入 <script> 标签
  const script = document.createElement('script')
  script.src = 'https://api.example.com/data?callback=handleResponse'
  document.body.appendChild(script)
  ```

#### 2. 跨域资源共享（`CORS`，`Cross-Origin Resource Sharing`）

<br/>

它由一系列传输的 `HTTP` 头组成，这些 `HTTP` 头决定浏览器是否阻止前端 `JavaScript` 代码获取跨域请求的响应。

同源安全策略默认阻止“跨域”获取资源。但是 `CORS` 给了 `web` 服务器这样的权限，即服务器可以选择，允许跨域请求访问到它们的资源。

`CORS` 需要浏览器和后端同时支持。`IE8` 和 `9` 需要通过 `XDomainRequest` 来实现。
浏览器会自动进行 `CORS` 通信，实现 `CORS` 通信的关键是后端。只要后端实现了 `CORS`，就实现了跨域。
服务端设置 `Access-Control-Allow-Origin` 就可以开启 `CORS`。 该属性表示哪些域名可以访问资源，如果设置通配符则表示所有网站都可以访问资源。

> `CORS` 需要浏览器和后端同时支持

#### 3. `Websocket`

<br/>

`Websocket` 是`HTML5`的一个持久化的协议，它实现了浏览器与服务器的全双工通信，同时也是跨域的一种解决方案。`WebSocket` 和 `HTTP` 都是应用层协议，都基于 `TCP` 协议。但是 `WebSocket` 是一种双向通信协议，在建立连接之后，`WebSocket` 的 `server` 与 `client` 都能主动向对方发送或接收数据。同时，`WebSocket` 在建立连接时需要借助 `HTTP` 协议，连接建立好了之后 `client` 与 `server` 之间的双向通信就与 `HTTP` 无关了。

> `WebSocket` 与 `Http` 的区别

`WebSocket` 协议本质上是一个基于 `TCP` 的协议。
为了建立一个 `WebSocket` 连接，客户端浏览器首先要向服务器发起一个 `HTTP` 请求，这个请求和通常的 `HTTP` 请求不同，包含了一些附加头信息，其中附加头信息`"Upgrade: WebSocket"`表明这是一个申请协议升级的 `HTTP` 请求，服务器端解析这些附加的头信息然后产生应答信息返回给客户端，客户端和服务器端的 `WebSocket` 连接就建立起来了，双方就可以通过这个连接通道自由的传递信息，并且这个连接会持续存在直到客户端或者服务器端的某一方主动的关闭连接。

相同点:
- 都是一样基于 `TCP` 协议，都是可靠性传输协议。
- 都是应用层协议。

不同点:
- `WebSocket` 是双向通信协议，模拟 `Socket` 协议，可以双向发送或接收信息。`HTTP` 是单向的。
- `WebSocket` 是需要浏览器和服务器握手进行建立连接的。而 `http` 是浏览器发起向服务器的连接，服务器预先并不知道这个连接。
联系
- `WebSocket` 在建立握手时，数据是通过 `HTTP` 传输的。但是建立之后，在真正传输时是不需要 `HTTP` 协议的。 

> `WebSocket`跨域原理

`WebSocket` 本身不存在跨域问题，所以我们可以利用 `webSocket` 来进行非同源之间的通信。

<br/>

`Websocket` 实现跨域通信的原理：
利用 `webSocket` 的API，可以直接 `new` 一个 `socket` 实例，然后通过 `open` 方法内 `send` 要传输到后台的值，也可以利用 `message` 方法接收后台传来的数据。
后台是通过 `new WebSocket.Server({port:3000})` 实例，利用 `message` 接收数据，利用 `send` 向客户端发送数据。

<br/>

如何保证 `websocket` 的通信会话是唯一的：建立 `WebSocket` 链接的 `url` 上加上时间戳。

#### 4. `Node` 中间件代理(两次跨域)

<br/>

实现原理：同源策略是浏览器需要遵循的标准，而如果是服务器向服务器请求就无需遵循同源策略。

代理服务器，需要做以下几个步骤：
- 接受客户端请求
- 将请求 转发给服务器
- 拿到服务器 响应 数据
- 将 响应 转发给客户端

#### 5. `nginx` 反向代理

<br/>

实现原理类似于 `Node` 中间件代理，需要你搭建一个中转 `nginx` 服务器，用于转发请求。

使用 `nginx` 反向代理实现跨域，是最简单的跨域方式。只需要修改 `nginx` 的配置即可解决跨域问题，支持所有浏览器，支持 `session`，不需要修改任何代码，并且不会影响服务器性能。

`CORS` 支持所有类型的 `HTTP` 请求，是跨域 `HTTP` 请求的根本解决方案
`JSONP` 只支持 `GET` 请求，`JSONP` 的优势在于支持老式浏览器，以及可以向不支持 `CORS` 的网站请求数据。
不管是 `Node` 中间件代理还是 `nginx` 反向代理，主要是通过同源策略对服务器不加限制。

**日常工作中，用得比较多的跨域方案是 `CORS` 和 `nginx` 反向代理**

#### 6. `HTML` 标签实现跨域

- `<img src=XXX>`
- `<video src=>`
- `<audio src=>`
- `<link href=XXX>`
- `<script src=XXX>`
- `<iframe src=XXX>`

> 浏览器有同源策略，但是为何 `cdn` 请求资源的时候不会产生跨域问题？

一些 `CDN` 资源不受同源策略限制，是因为同源策略主要是浏览器的一种安全机制，用于限制不同源的文档或脚本之间的交互操作，但对于某些特定类型的资源访问，浏览器会有会有一些例外情况。
在 `HTML` 中，`<script>` `<link href="...">` `<iframe>` `<img>` `<video>` `<audio>`  等标签的 `src/href` 属性所指向的资源（如 `JavaScript` 文件、图片、`CSS` 文件等）是可以跨域访问的。
例如：可以在自己的网站中通过 `<script src="https://cdn.example.com/vue.min.js"></script>` 加载来自 `CDN` 的 `Vue.js` 库

### 三、本地开发时不存在跨域问题的原因

#### 1. **开发服务器代理（主流方案）**

  > vue2 + webpack 解决方案
  - `webpack-dev-server` 代理配置， 在 `vue.config.js` 中配置代理
  - **实现方式**：通过 `webpack-dev-server`、`Vite` 等工具的代理配置，将 `API` 请求转发到后端服务器。
  - **技术原理**：
  
    ```js
    // vue.config.js
    export default {
      server: {
        proxy: {
          '/api': {
            target: 'http://backend-server:3000', // 实际后端地址
            changeOrigin: true, // 修改请求头 Origin 为目标地址
            rewrite: (path) => path.replace(/^\/api/, '')
          }
        }
      }
    }
    ```

  - **工作原理**：
    1. 浏览器请求 `http://localhost:3000/api/users`
    2. `webpack-dev-server` 拦截该请求
    3. 转发到 `http://backend-server:3000/users`
    4. 将响应返回给浏览器

  - **效果**：浏览器认为请求发往 `localhost:3000/api/users` → 实际被代理到 `backend-server:3000/users`，实现同源。

  > Vue3 + Vite 的解决方案

  - `Vite` 开发服务器代理，在 `vite.config.js` 中配置：

  ```js
  export default defineConfig({
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:8080',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    }
  })
  ```

  > 代理机制的核心优势：

    1. 请求同源：浏览器始终向本地开发服务器发送请求
    2. 服务器间无跨域：开发服务器与后端服务器通信不受同源策略限制
    3. 透明转发：对前端代码完全透明，无需特殊处理

#### 2. **后端启用 CORS（开发环境专用）**

  - **实现方式**：后端服务器设置响应头 `Access-Control-Allow-Origin: *`。
  - **示例代码**（Node.js Express）：
    ```js
    app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*') // 允许所有源
      res.header('Access-Control-Allow-Headers', 'Content-Type')
      next()
    })
    ```

#### 3. **浏览器安全策略绕过（不推荐）**

  - **禁用安全策略**：启动 `Chrome` 时添加参数 `--disable-web-security`。
  - **风险**：仅限本地测试，会完全暴露跨站攻击风险。

### 四、生产环境跨域解决方案

| **方案** | **适用场景** | **实现方式** |
|--|--|--|
| **CORS** | 可控的跨域 `API` 访问| 后端设置 `Access-Control-Allow-Origin` 等响应头 |
| **反向代理** | 隐藏后端地址，统一入口 | `Nginx/Apache` 配置代理规则，将 `/api` 转发到实际服务 |
| **JSONP** | 老旧浏览器兼容 | 通过 `<script>` 标签加载跨域数据（仅限 `GET` 请求）|
| **WebSocket** | 实时双向通信 | 协议本身不受同源策略限制（但服务器需支持 WS） |

### 五、关键差异对比：开发 vs 生产

| **维度** | **开发环境** | **生产环境** |
|--|--|--|
| **跨域解决方案** | 代理服务器或宽松 `CORS` | 严格 `CORS` 配置或反向代理 |
| **安全性要求** | 低（本地信任环境）| 高（需防御恶意攻击）|
| **典型配置** | `Webpack Dev Server Proxy` | `Nginx` 反向代理 + 精细 `CORS`|

### 六、总结

- **浏览器跨域限制**是保护用户数据安全的核心机制，通过同源策略实现。  
- **本地开发无跨域问题**是通过代理工具或后端 `CORS` 配置实现的 **技术性绕过**，并非浏览器解除限制。  
- **生产环境必须严格处理跨域**，避免使用 `*` 通配符，应指定可信域名并配合反向代理提升安全性。

## `<img>` 标签实现日志上报日志

通过 `<img>` 标签实现日志上报，确实是前端一种经典且实用的技术方案，它能巧妙解决跨域问题，并且对页面性能影响较小。下面我来为你详细讲解其原理、具体实现、注意事项以及一些优化建议。

`<img>` 标签实现日志上报，主要利用了以下特性：

- **跨域能力**：浏览器允许 `<img>` 标签加载跨域图片资源，不像 `XMLHttpRequest` 或 `Fetch API` 默认会受到同源策略限制。这意味着你可以将日志发送到与当前网站不同源的服务器。
- **无需等待响应**：日志上报的核心目的是 **将数据发送到服务器**，通常 **不需要处理服务器的响应**。使用 `<img>` 标签的 `src` 属性发起一个 `GET` 请求，服务器返回一个极小的图片（例如 `1x1` 像素的透明 `GIF`）或直接返回 `204 No Content` 状态码即可。这种方式不会像 `Ajax` 那样需要等待响应，也不会因为等待响应而阻塞页面其他进程。

### 🔧 具体实现步骤与代码示例

1. **构造请求 URL**：将需要上报的日志数据作为查询参数拼接在目标 `URL` 之后。
2. **创建 Image 对象**：使用 `new Image()` 创建一个 `Image` 对象。
3. **设置 src 属性**：将拼接好的 `URL` 赋值给 `Image` 对象的 `src` 属性。浏览器此时就会向这个 `URL` 发起 `GET` 请求，从而将数据"携带"过去。

基础的代码示例：

```js
function logToServer(logData) {
  const reportUrl = 'https://your-log-server.com/collect.gif' // 日志接收接口
  const params = new URLSearchParams(logData).toString() // 将日志对象转换为查询字符串
  const img = new Image()
  img.src = `${reportUrl}?${params}`
}

// 使用示例
logToServer({
  event: 'page_view',
  page: '/home',
  user_id: '12345'
})
```

在实际应用中，你可能会需要更健壮一些的代码，例如处理图片加载情况（尽管对日志上报而言通常不重要）并避免潜在的内存占用：

```js
function logToServer(logData) {
  const reportUrl = 'https://your-log-server.com/collect.gif'
  const params = new URLSearchParams(logData).toString()
  const img = new Image()
  
  // 可选的清理回调
  img.onload = img.onerror = function() {
    img.onload = img.onerror = null // 清除事件处理函数，帮助垃圾回收
  }
  
  img.src = `${reportUrl}?${params}`
}
```

### 关键注意事项

1. **URL 长度限制**：不同的浏览器对 `URL` 有最大长度限制。如果上报的日志数据量非常大，通过查询参数传递可能会被截断。因此，这种方式**适合上报数据量较小**的场景。
2. **请求方式限制**：`<img>` 标签只发起 **GET** 请求。如果数据敏感，不建议用此法，因为参数会明文出现在 `URL` 和服务器日志中。
3. **数据格式与编码**：确保参数值都经过了正确的 **URL 编码**，可以使用 `encodeURIComponent` 来处理，避免特殊字符（如 `&`, `=`）导致解析错误。
4. **避免缓存**：为防止浏览器缓存导致日志上报请求未实际发出，可以为 `URL` 添加一个**无意义的随机参数**（例如时间戳或随机数）。

  ```js
  img.src = `${reportUrl}?${params}&_t=${Date.now()}`;
  ```

5. **服务器端处理**：服务器接收到这个请求后，通常只需返回一个 **1x1 像素的透明 GIF 图片**，或返回一个 **HTTP 204 (No Content)** 无内容状态码，表示成功处理且无需返回内容。

### 💡 优化与替代方案

- **采样率**：在高流量场景下，为了避免产生过多的日志，可以引入**采样率**机制，只上报部分日志。

  ```js
  function needReport(sampling = 1) {
    return Math.random() <= sampling
  }
  if (needReport(0.1)) { // 10%的采样率
    logToServer(logData)
  }
  ```

- **现代替代方案：`sendBeacon`**：对于页面卸载前（例如用户关闭标签页）的上报，`<img>` 方式可能无法保证成功发送。此时，更推荐的现代方案是使用 [**`navigator.sendBeacon()`**](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/sendBeacon) 方法。它能异步发送少量数据，并且浏览器会保证在页面卸载前将请求发出。

  ```js
  // 检查浏览器是否支持
  if (navigator.sendBeacon) {
    const data = new Blob([JSON.stringify(logData)], { type: 'application/json' })
    navigator.sendBeacon(reportUrl, data)
  } else {
    // 降级方案，使用 img 上报
    logToServer(logData)
  }
  ```

请注意，`sendBeacon` 主要适用于页面卸载时的场景，并且会受到跨域限制（需要配置 `CORS`）。

### 方案对比

<br/>

为了帮助你更好地选择，这里有一个简单的对比表格：

| 特性 | `<img>` 标签 | `navigator.sendBeacon` |
| :--- | :--- | :--- |
| **跨域支持** | ✅ 天然支持 | ⚠️ 受`CORS`限制 |
| **请求类型** | `GET` | `POST` |
| **数据量** | 受`URL`长度限制 | 可更大（`Blob`, `FormData`） |
| **可靠性** | 一般 | **高**（尤其在页面卸载时） |
| **兼容性** | 所有浏览器 | 现代浏览器（`IE` 不兼容） |

总而言之，`<img>` 标签实现日志上报是一个**兼容性好、实现简单、能有效解决跨域问题**的方案，尤其适合数据量不大的常规场景。如果在页面卸载时有关键日志需要保证送达，或者数据量较大，则建议优先考虑 `navigator.sendBeacon` 或做好兼容降级。

## **301、302、304、401**、**404** 状态码

### **一、3xx 状态码（重定向类）**

#### **1. 301 Moved Permanently（永久重定向）**

- **用途**：
  表示请求的资源已**永久移动**到新的 `URL`。客户端（如浏览器）应更新书签或链接，后续请求直接访问新地址。
- **特点**：  
  - 搜索引擎会将权重转移到新 `URL`。  
  - 浏览器缓存此重定向，减少后续请求。  
- **示例场景**：  
  网站更换域名（如 `http://old.com` → `https://new.com`）。

#### **2. 302 Found（临时重定向）**

- **用途**：  
  表示资源**临时移动**到另一个 `URL`，客户端应继续使用原 `URL` 发起请求。  
- **特点**：  
  - 搜索引擎不会更新索引，仍保留原 `URL` 的权重。  
  - 浏览器每次请求需先访问原地址，再跳转。  
- **示例场景**：  
  网站临时维护时跳转到备用页面。

#### **3. 304 Not Modified（未修改）**

- **用途**：  
  客户端发送**条件请求**（如 `If-Modified-Since` 或 `If-None-Match`）时，若资源未更新，服务器返回此状态码，告知客户端可复用本地缓存。  
- **特点**：  
  - 减少重复传输，节省带宽。  
  - 需配合缓存策略（如 `ETag`、`Last-Modified`）使用。  
- **示例场景**：  
  浏览器重复请求静态资源（如图片、`CSS` 文件），服务器确认未修改后返回 `304`。

### **二、4xx 状态码（客户端错误类）**

#### **1. 401 Unauthorized（未授权）**

- **用途**：  
  请求需要用户认证，但未提供有效凭据（如用户名、密码、Token）。  
- **响应头**：  
  通常包含 `WWW-Authenticate`，指明认证方式（如 `Basic`、`Bearer`）。  
- **示例场景**：  
  - 访问需要登录的 `API` 端点但未携带 `Token`。  
  - 输入错误的用户名或密码。

#### **2. 404 Not Found（未找到）**

- **用途**：
  服务器找不到请求的资源，且无进一步说明。
- **常见原因**：
  - URL 拼写错误。
  - 资源被删除或移动（未设置重定向）。
  - 服务器路由配置错误。
- **示例场景**：
  访问不存在的页面（如 `https://example.com/non-existent-page`）。

### **三、对比表格**

| 状态码 | 类别 | 含义 | 典型场景 | 客户端行为 |
|--|--|--|--|--|
| 301 | 重定向 | 永久移动 | 域名更换、`URL` 重构 | 更新书签，缓存新地址 |
| 302 | 重定向 | 临时移动 | `A/B` 测试、临时维护 | 保持原 `URL`，每次重定向 |
| 304 | 缓存 | 资源未修改 | 重复请求静态资源 | 使用本地缓存 |
| 401 | 客户端错误| 未提供有效认证 | 访问需登录的页面或 `API` | 弹出认证对话框或重定向 |
| 404 | 客户端错误| 资源不存在 | `URL` 错误、资源被删除 | 显示错误页面，终止请求 |

### **四、注意事项**

1. **301 vs 302**：  
   - 永久性重定向优先用 **301**（SEO 友好），临时性用 **302**。  
   - 错误使用可能导致搜索引擎索引混乱。

2. **304 与缓存策略**：  
   - 需合理设置 `Cache-Control`、`ETag` 等响应头。  
   - 避免缓存动态内容（如用户个性化数据）。

3. **401 vs 403**：  
   - **401** 表示需要认证，**403 Forbidden** 表示认证成功但无权访问。  
   - 例如：普通用户尝试访问管理员页面 → 返回 `403`。

4. **404 优化**：  
   - 自定义友好错误页面（如显示搜索框或导航）。  
   - 监控 `404` 日志，修复死链或设置重定向（如 `301` 到新页面）。

### **五、总结**

- **3xx**：控制重定向和缓存，优化用户体验和性能。  
- **4xx**：反映客户端错误，需检查请求合法性或认证状态。  
- 合理使用状态码能提升网站可维护性、`SEO` 效果和安全性。
