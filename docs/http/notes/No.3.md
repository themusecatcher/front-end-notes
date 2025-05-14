# Note 3

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

参考：[浏览器的同源策略](https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy)

它能帮助阻隔恶意文档，减少可能被攻击的媒介。例如，它可以防止互联网上的恶意网站在浏览器中运行 `JS` 脚本，从第三方网络邮件服务（用户已登录）或公司内网（因没有公共 `IP` 地址而受到保护，不会被攻击者直接访问）读取数据，并将这些数据转发给攻击者。

- 源的定义

如果两个 `URL` 的协议、端口（如果有指定的话）和主机都相同的话，则这两个 `URL` 是同源的。这个方案也被称为“协议/主机/端口元组”，或者直接是“元组”。（“元组”是指一组项目构成的整体，具有双重/三重/四重/五重等通用形式。）

### 一、浏览器的跨域限制本质：同源策略（Same-Origin Policy）

#### 1. **为什么需要跨域限制？**

  - **安全防护**：防止恶意网站通过脚本窃取用户敏感数据（如 Cookie、LocalStorage）。
  - **隔离风险**：避免跨站脚本攻击（XSS）、跨站请求伪造（`CSRF`）等安全漏洞。

#### 2. **同源策略的判定规则**

  - **同源条件**：协议（HTTP/HTTPS）、域名（主域+子域）、端口 **三者完全相同**。
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
    - 跨域网站无法读取其他源的 `Cookie`、`LocalStorage`
  - **脚本限制**：  
    - 跨域脚本加载（如 `<script>` 标签）允许，但无法直接访问其内容

### 二、本地开发时不存在跨域问题的原因

#### 1. **开发服务器代理（主流方案）**

  - **实现方式**：通过 `webpack-dev-server`、`Vite` 等工具的代理配置，将 `API` 请求转发到后端服务器。
  - **技术原理**：
  
    ```js
    // vite.config.js
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

  - **效果**：浏览器认为请求发往 `localhost:5173/api` → 实际被代理到 `backend-server:3000`，实现同源。

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

### 三、生产环境跨域解决方案

| **方案** | **适用场景** | **实现方式** |
|--|--|--|
| **CORS** | 可控的跨域 `API` 访问| 后端设置 `Access-Control-Allow-Origin` 等响应头 |
| **反向代理** | 隐藏后端地址，统一入口 | `Nginx/Apache` 配置代理规则，将 `/api` 转发到实际服务 |
| **JSONP** | 老旧浏览器兼容 | 通过 `<script>` 标签加载跨域数据（仅限 `GET` 请求）|
| **WebSocket** | 实时双向通信 | 协议本身不受同源策略限制（但服务器需支持 WS） |

### 四、关键差异对比：开发 vs 生产

| **维度** | **开发环境** | **生产环境** |
|--|--|--|
| **跨域解决方案** | 代理服务器或宽松 `CORS` | 严格 `CORS` 配置或反向代理 |
| **安全性要求** | 低（本地信任环境）| 高（需防御恶意攻击）|
| **典型配置** | `Webpack Dev Server Proxy` | `Nginx` 反向代理 + 精细 `CORS`|

### 五、总结

- **浏览器跨域限制**是保护用户数据安全的核心机制，通过同源策略实现。  
- **本地开发无跨域问题**是通过代理工具或后端 `CORS` 配置实现的 **技术性绕过**，并非浏览器解除限制。  
- **生产环境必须严格处理跨域**，避免使用 `*` 通配符，应指定可信域名并配合反向代理提升安全性。
