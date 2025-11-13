# Note 4

<BackTop />

## `axios` & `fetch`

在 `JavaScript` 中，`axios` 和 `fetch` 都是用于发送 `HTTP` 请求的工具。

### 一、基本概念

#### 1. **`axios`**

- **类型**：第三方库（需安装）。
- **环境支持**：浏览器和 `Node.js` 均可使用
  
  在服务端它使用原生 `node.js` `http` 模块, 而在客户端 (浏览端) 则使用 `XMLHttpRequest`。
- **核心特性**：
  - 基于 `Promise` 的 `API`。
  - 自动转换 `JSON` 数据。
  - 拦截请求和响应。
  - 支持请求取消和超时设置。
  - 内置 `XSRF`（跨站请求伪造）防护。

#### 2. **`fetch`**

- **类型**：浏览器原生 `API`。
- **环境支持**：现代浏览器原生支持，`Node.js` 需使用 `node-fetch` 等第三方库。
- **核心特性**：
  - 基于 `Promise` 的 `API`。
  - 更轻量，无额外依赖。
  - 需要手动处理 `JSON` 转换和错误状态。

### 二、基本用法对比

#### 1. **发起 GET 请求**

- **`axios`**：

  ```js
  axios.get('https://api.example.com/data')
    .then(response => console.log(response.data))
    .catch(error => console.error('Error:', error))
  ```

  - 直接通过 `response.data` 获取解析后的数据。

- **`fetch`**：

  ```js
  fetch('https://api.example.com/data')
    .then(response => {
      if (!response.ok) throw new Error('HTTP error')
      return response.json() // 手动解析 JSON
    })
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error))
  ```

  - 需要手动调用 `response.json()` 解析数据。
  - 需检查 `response.ok` 处理 `HTTP` 错误状态（如 404、500）。

#### 2. **发起 POST 请求**

- **`axios`**：

  ```js
  axios.post('https://api.example.com/data', { key: 'value' }, {
    headers: { 'Content-Type': 'application/json' }
  })
  ```

  - 自动将请求体序列化为 `JSON`。

- **`fetch`**：

  ```js
  fetch('https://api.example.com/data', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ key: 'value' }) // 需手动序列化
  })
  ```

  - 需手动调用 `JSON.stringify()` 序列化请求体。

### 三、功能特性对比

| **特性** | **`axios`** | **`fetch`** |
|--|--|--|
| **JSON 转换** | 自动转换请求体和响应数据 | 需手动调用 `response.json()` |
| **错误处理** | 自动拒绝非 `2xx` 状态码的响应 | 需检查 `response.ok` 或状态码 |
| **超时设置** | 直接通过 `timeout` 配置项设置 | 需结合 `AbortController` 和 `setTimeout` |
| **取消请求** | 支持 `CancelToken`（旧）或 `AbortController`（新） | 需使用 `AbortController` |
| **拦截器** | 提供请求/响应拦截器 | 需自行封装中间件逻辑 |
| **浏览器兼容性** | 兼容 `IE11` 及现代浏览器 | 不兼容 `IE`，需 `polyfill` |
| **上传/下载进度监控** | 支持 `onUploadProgress` 等事件 | 原生不支持，需手动实现 |
| **CSRF/XSRF 防护** | 自动读取 `XSRF-TOKEN` `Cookie` | 需手动设置请求头 |

### 四、详细差异说明

#### 1. **错误处理**

- **`axios`**：
  - 任何 `HTTP` 状态码非 `2xx` 的响应都会触发 `catch`。
  - 示例：

    ```js
    axios.get('/invalid-url')
      .catch(error => {
        if (error.response) {
          console.log('HTTP Error:', error.response.status) // 如 404
        } else {
          console.log('Network Error') // 如断网
        }
      })
    ```

- **`fetch`**：
  - 仅网络错误（如无法连接到服务器）会触发 `catch`。
  - `HTTP` 错误（如 `404、500`）需手动处理：

    ```js
    fetch('/invalid-url')
      .then(response => {
        if (!response.ok) throw new Error('HTTP Error')
        return response.json()
      })
      .catch(error => console.error(error)) // 捕获网络或手动抛出的错误
    ```

#### 2. **请求取消**

- **`axios`**（使用 `AbortController`）：

  ```js
  const controller = new AbortController()
  axios.get('/url', { signal: controller.signal })
    .catch(error => {
      if (axios.isCancel(error)) {
        console.log('Request canceled')
      }
    })
  controller.abort() // 取消请求
  ```

- **`fetch`**：

  ```js
  const controller = new AbortController()
  fetch('/url', { signal: controller.signal })
    .catch(error => {
      if (error.name === 'AbortError') {
        console.log('Request canceled')
      }
    })
  controller.abort() // 取消请求
  ```

#### 3. **拦截器（`axios` 独有）**

- 全局拦截请求和响应：

  ```js
  // 请求拦截器
  axios.interceptors.request.use(config => {
    config.headers.Authorization = 'Bearer token'
    return config
  })

  // 响应拦截器
  axios.interceptors.response.use(
    response => response.data, // 直接返回数据
    error => Promise.reject(error)
  )
  ```

### 五、适用场景

- **选择 `axios`**：
  - 需要兼容旧浏览器（如 `IE11`）。
  - 需要开箱即用的功能（自动 `JSON` 转换、拦截器、进度监控）。
  - 希望简化错误处理逻辑。

- **选择 `fetch`**：
  - 项目要求轻量，避免引入第三方库。
  - 仅需简单请求，且运行在现代浏览器或 `Node.js`（通过 `node-fetch`）。
  - 需要更底层的控制（如自定义请求处理逻辑）。

### 六、总结

| **维度** | **`axios`** | **`fetch`** |
|--|--|--|
| **易用性** | 高（封装完善，功能丰富） | 低（需手动处理细节）|
| **功能性** | 强（拦截器、取消、进度监控等）| 基础（需自行扩展）|
| **兼容性** | 广泛（支持旧浏览器）| 依赖现代环境 |
| **适用场景** | 复杂项目、需要快速开发 | 轻量级应用、追求原生实现 |

根据项目需求选择工具：追求便捷和功能完善选 `axios`，追求轻量和控制权选 `fetch`。

## nginx 使用 gzip 压缩

当 `Nginx` 开启了 `gzip` 压缩，并且目录中同时存在源文件（如 `example.js`）和对应的预压缩文件（如 `example.js.gz`），`Nginx` 具体返回哪个文件，取决于使用的**压缩模块**和**相关配置**。

> Brotli (br) 压缩在 Nginx 中遵循与 gzip 几乎相同的逻辑，既有动态压缩也有静态压缩两种方式<br/>注：Brotli 通常不是 Nginx 默认包含的，需要额外安装

### 两种不同的压缩方式的对比

| 特性维度 | 动态压缩 (`ngx_http_gzip_module`) | 静态压缩 (`ngx_http_gzip_static_module`) |
| :--- | :--- | :--- |
| **工作模式** | 实时压缩：收到请求时，`Nginx`**现场**将源文件压缩后返回 | 预压缩：直接返回已预先压缩好的 `.gz` 文件 |
| **CPU消耗** | **较高**（每次请求都可能需要压缩） | **极低**（直接读取现成文件） |
| **响应速度** | 较慢（需要压缩时间） | **非常快**（省去压缩时间） |
| **模块名** | `ngx_http_gzip_module` | `ngx_http_gzip_static_module` |
| **模块默认** | 通常内置 | 默认未构建，需单独启用 |
| **启用指令** | `gzip on;` | `gzip_static on;` |

### 启用动态压缩

<br/>

动态压缩模块通常是内置的，您只需在 `Nginx` 配置文件中（通常在 `http`、`server` 或 `location` 块中）开启即可：

```nginx
gzip on; # 启用动态Gzip压缩
gzip_types text/plain text/css application/json; # 指定要压缩的文件类型
```

其他常见的配置指令还包括 `gzip_comp_level`（设置压缩级别）和 `gzip_min_length`（设置启用压缩的最小文件长度）。

### 启用静态压缩

<br/>

要使用静态压缩功能，您需要确保 `Nginx` 在编译时包含了 `--with-http_gzip_static_module` 参数。
启用方式如下：

```nginx
gzip_static on; # 启用静态Gzip压缩
```

此指令可以放在 `http`、`server` 或 `location` 配置块中，通常用于处理静态资源（如`CSS`、`JS`文件）的 `location` 块。

### 优先级与处理逻辑

<br/>

当同时配置了 `gzip on;` 和 `gzip_static on;` 时，**Nginx会优先使用静态压缩**。
它的处理逻辑是这样的：
1. 当收到请求时，`Nginx` 会先检查目录中是否存在对应请求文件的 `.gz` 结尾的预压缩文件。
2. 如果存在 `.gz` 文件，则直接将其内容返回给客户端，**不会再对源文件进行实时压缩**。
3. 如果不存在 `.gz` 文件，并且配置了 `gzip on;`，`Nginx` 则会查看客户端是否支持 `gzip` 压缩，若支持，就会对源文件进行动态压缩后返回。

### 实践建议与提醒

1. **优先使用静态压缩**：对于不经常变化的静态资源（如`CSS`、`JS`、`HTML`文件），**非常推荐使用预压缩**。这**能显著降低服务器`CPU`负载，并加快响应速度**。您可以使用构建工具（如`Webpack`）或在服务器上使用 `gzip` 命令提前生成 `.gz` 文件。
2. **注意预压缩文件的更新**：确保当源文件更新时，对应的 `.gz` 文件也同步更新。建议将生成 `.gz` 文件的步骤集成到您的部署流程中。
3. **并非所有文件都需压缩**：对于已经是压缩格式的图片（如`JPEG`、`PNG`）、视频等文件，再次进行`Gzip`压缩效果不大，有时文件大小反而会增加，因此可以根据情况排除它们。

总而言之，`Nginx`究竟直接返回压缩文件还是实时压缩，取决于您的配置。优先使用 `gzip_static` 直接返回预压缩文件是提升性能的最佳实践。
