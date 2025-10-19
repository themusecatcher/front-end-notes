# Note 1

<BackTop />

## [cookie](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Cookies) & [localStorage](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/localStorage) & [sessionStorage](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/sessionStorage)

前端开发时，在网页刷新的时候，所有数据都会被清空，这时候就要用到本地存储的技术，前端本地存储的方式有三种，分别是`cookie`，`localstorage`和`sessionStorage`

### 三者的异同

1. 生命周期：
    - `cookie`：可设置失效时间，没有设置的话，默认是关闭浏览器后失效
    - `localStorage`：除非被手动清除，否则将会永久保存。
    - `sessionStorage`： 仅在当前网页会话下有效，关闭页面或浏览器后就会被清除。
2. 存放数据大小：
    - `cookie`：4KB左右
    - `localStorage`和`sessionStorage`：可以保存5MB的信息。
3. http请求：
    - `cookie`：每次都会携带在HTTP头中，如果使用cookie保存过多数据会带来性能问题
    - `localStorage`和`sessionStorage`：仅在客户端（即浏览器）中保存，不参与和服务器的通信
4. 易用性：
    - `cookie`：需要程序员自己封装，源生的Cookie接口不友好
    - `localStorage`和`sessionStorage`：源生接口可以接受，亦可再次封装来对Object和Array有更好的支持
5. 应用场景：
    - 从安全性来说，因为每次http请求都会携带cookie信息，这样无形中浪费了带宽，所以cookie应该尽可能少的使用，另外cookie还需要指定作用域，不可以跨域调用，限制比较多。但是用来识别用户登录来说，cookie还是比storage更好用的。其他情况下，可以使用storage，就用storage。
    - storage在存储数据的大小上面秒杀了cookie，现在基本上很少使用cookie了，因为更大总是更好的。
    - **localStorage和sessionStorage唯一的差别一个是永久保存在浏览器里面，一个是关闭网页就清除了信息**。localStorage可以用来跨页面传递参数，sessionStorage用来保存一些临时的数据，防止用户刷新页面之后丢失了一些参数。

## HTTP Cookie

`HTTP Cookie`（也叫 Web Cookie 或浏览器 Cookie）是服务器发送到用户浏览器并保存在本地的一小块数据。浏览器会存储 cookie 并在下次向同一服务器再发起请求时携带并发送到服务器上。通常，它用于告知服务端两个请求是否来自同一浏览器——如保持用户的登录状态。Cookie 使基于无状态的 HTTP 协议记录稳定的状态信息成为了可能。

### Cookie 主要用于以下三个方面：

- 会话状态管理
  如用户登录状态、购物车、游戏分数或其他需要记录的信息
- 个性化设置
  如用户自定义设置、主题和其他设置
- 浏览器行为跟踪
  如跟踪分析用户行为等

`Cookie` 曾一度用于客户端数据的存储，因当时并没有其他合适的存储办法而作为唯一的存储手段，但现在推荐使用现代存储 API。由于服务器指定 `Cookie` 后，浏览器的每次请求都会携带 `Cookie` 数据，会带来额外的性能开销（尤其是在移动环境下）。新的浏览器 API 已经允许开发者直接将数据存储到本地，如使用 Web storage API（`localStorage` 和 `sessionStorage`）或 `IndexedDB` 。

### 定义 Cookie 的生命周期

Cookie 的生命周期可以通过两种方式定义：
- 会话期 `Cookie` 会在当前的会话结束之后删除。浏览器定义了“当前会话”结束的时间，一些浏览器重启时会使用会话恢复。这可能导致会话 cookie 无限延长。
- 持久性 `Cookie` 在过期时间（`Expires`）指定的日期或有效期（`Max-Age`）指定的一段时间后被删除。

### JavaScript 通过 Document.cookie 访问 Cookie

通过 `Document.cookie` 属性可创建新的 `Cookie`。如果未设置 `HttpOnly` 标记，你也可以从 `JavaScript` 访问现有的 `Cookie`。

**JavaScript 可以通过跨站脚本攻击（XSS）的方式来窃取 Cookie.**

```js
document.cookie = 'yummy_cookie=choco'
document.cookie = 'tasty_cookie=strawberry'
console.log(document.cookie)
// logs 'yummy_cookie=choco; tasty_cookie=strawberry'
```

### Request Headers：

![alt text](image.png)

## [Window.localStorage](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/localStorage)

只读的 `localStorage` 属性允许你访问一个Document 源（origin）的对象 Storage；存储的数据将保存在浏览器会话中。localStorage 类似 sessionStorage，但其区别在于：**存储在 localStorage 的数据可以长期保留**；而当页面会话结束——也就是说，**当页面被关闭时，存储在 sessionStorage 的数据会被清除**。

应注意，无论数据存储在 `localStorage` 还是 `sessionStorage` ，它们都特定于页面的协议。

另外，`localStorage` 中的键值对总是以字符串的形式存储。 (需要注意，和 `js` 对象相比，**键值对总是以字符串的形式存储意味着数值类型会自动转化为字符串类型**).

### 语法

```js
myStorage = localStorage
```

### 示例

下面的代码片段访问了当前域名下的本地 `Storage` 对象，并通过 `Storage.setItem()` 增加了一个数据项目。

```js
localStorage.setItem('myCat', 'Tom')
```

该语法用于读取 `localStorage` 项，如下：

```js
let cat = localStorage.getItem('myCat')
```

该语法用于移除 `localStorage` 项，如下：

```js
localStorage.removeItem('myCat')
```

该语法用于移除所有的 `localStorage` 项，如下：

```js
// 移除所有
localStorage.clear()
```

## [Window.sessionStorage](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/sessionStorage)

`sessionStorage` 属性允许你访问一个，对应当前源的 `session Storage` 对象。它与 `localStorage` 相似，不同之处在于 **`localStorage` 里面存储的数据没有过期时间设置，而存储在 `sessionStorage` 里面的数据在页面会话结束时会被清除**。

- 页面会话在浏览器打开期间一直保持，并且重新加载或恢复页面仍会保持原来的页面会话。
- **在新标签或窗口打开一个页面时会复制顶级浏览会话的上下文作为新会话的上下文，这点和 session cookie 的运行方式不同**。
- 打开多个相同的 URL 的 Tabs 页面，会创建各自的 `sessionStorage`。
- 关闭对应浏览器标签或窗口，会清除对应的 `sessionStorage`。

### 语法

```js
// 保存数据到 sessionStorage
sessionStorage.setItem('key', 'value')

// 从 sessionStorage 获取数据
let data = sessionStorage.getItem('key')

// 从 sessionStorage 删除保存的数据
sessionStorage.removeItem('key')

// 从 sessionStorage 删除所有保存的数据
sessionStorage.clear()
```

### 示例

下面的代码访问当前域名的 `session Storage` 对象，并使用 `Storage.setItem()` 访问往里面添加一个数据条目。

```js
sessionStorage.setItem('myCat', 'Tom')
下面的示例会自动保存一个文本输入框的内容，如果浏览器因偶然因素被刷新了，文本输入框里面的内容会被恢复，因此写入的内容不会丢失。
```

```js
// 获取文本输入框
let field = document.getElementById('field')

// 检测是否存在 autosave 键值
// (这个会在页面偶然被刷新的情况下存在)
if (sessionStorage.getItem('autosave')) {
  // 恢复文本输入框的内容
  field.value = sessionStorage.getItem('autosave')
}

// 监听文本输入框的 change 事件
field.addEventListener('change', function () {
  // 保存结果到 sessionStorage 对象中
  sessionStorage.setItem('autosave', field.value)
})
```

## [IndexedDB](https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API)

`IndexedDB` 是一种底层 API，**用于在客户端存储大量的结构化数据（也包括文件/二进制大型对象（blobs））**。该 API **使用索引实现对数据的高性能搜索**。虽然 `Web Storage` **在存储较少量的数据很有用，但对于存储更大量的结构化数据来说力不从心**。而 `IndexedDB` 提供了这种场景的解决方案。本页面 MDN IndexedDB 的主要引导页 - 这里，我们提供了完整的 API 参考和使用指南，浏览器支持细节，以及关键概念的一些解释的链接。

### 关键概念和用法

<br/>

`IndexedDB` 是一个事务型数据库系统，类似于基于 `SQL` 的 `RDBMS`。然而，不像 `RDBMS` 使用固定列表，`IndexedDB` 是一个基于 `JavaScript` 的面向对象数据库。`IndexedDB` 允许你**存储和检索用键索引的对象**；**可以存储结构化克隆算法支持的任何对象**。你只需要指定数据库模式，打开与数据库的连接，然后检索和更新一系列事务。

## DOMContentLoaded & Load & Finish

![alt text](1.png)

- `DOMContentLoaded`：`DOM` 树构建完成。即 `HTML` 页面由上向下解析 `HTML` 结构到末尾封闭标签`</html>`

  ```js
  window.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded:', new Date())
  })
  ```

- `Load`：页面加载完毕。 DOM树构建完成后，继续加载 `html/css` 中的图片等外部资源，加载完成后视为页面加载完毕。
  `window.onload()` 方法用于在网页加载完毕后立刻执行的操作，即当 HTML 文档加载完毕后，立刻执行某个方法。通常用于 `<body>` 元素，在页面完全载入后(包括图片、css文件等等)执行脚本代码。

  ```js
  window.onload = () => { // 对于首页底部某些元素比如地图，大量图片等情况，可以在load之后进行渲染
    console.log('load:', new Date())
    this.showMap = true
  }
  window.addEventListener('load', () => {
    console.log('load:', new Date())
  })
  ```

  **DOMContentLoaded 会比 Load 时间小，两者时间差大致等于外部资源加载的时间。**

- `Finish`： 是页面上所有 `http` 请求发送到响应完成的时间，**HTTP1.0/1.1 协议限定，单个域名的请求并发量是 6 个，即 Finish 是所有请求（不只是XHR请求，还包括doc，img，js，css等资源的请求）在并发量为6的限制下完成的时间**。

`Finish` 的时间比 `Load` 大，意味着页面有相当部分的请求量，`Finish` 的时间比 `Load` 小，意味着页面请求量很少，如果页面是只有一个 html文档请求的静态页面，**Finish时间基本就等于HTML文档请求的时间**。

页面发送请求和页面解析文档结构，分属两个不同的线程，所以 Finish 时间与DOMContentLoaded 和 Load 并无直接关系。

## [HTTP缓存](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Caching)

**HTTP 缓存会存储与请求关联的响应，并将存储的响应复用于后续请求**。
可复用性有几个优点。首先，由于不需要将请求传递到源服务器，因此客户端和缓存越近，响应速度就越快。最典型的例子是浏览器本身为浏览器请求存储缓存。
此外，当响应可复用时，源服务器不需要处理请求——因为它不需要解析和路由请求、根据 cookie 恢复会话、查询数据库以获取结果或渲染模板引擎。这减少了服务器上的负载。
缓存的正确操作对系统的稳定运行至关重要。

### 强制缓存

- 方案一：
  - `Expires`：响应头，代表**该资源的过期时间，服务器告诉浏览器**
    GMT格式的标椎时间，如：Wed, 16 Mar 2022 08:46:11 GMT
    在这个时间前缓存有效，但如果本地时间被修改，会导致缓存失效。
    将 `Expires` 设置为 `-1`，意思是**立即超时，即每次加载资源都会请求 URL**，通过 `Last Modification` 和 `ETag` 来由服务器来判断是否更新。这样就保证了服务器与浏览器资源文件同步。
- 方案二：
  - `Cache-Control`：请求/响应头，缓存控制手段，精确控制缓存策略
    控制相对时间，单位为秒，例如：`max-age=10`，表示**10秒以内，使用缓存到浏览器的资源**
    若有`Cache-control`，则以 `Cache-control` 为准，忽略 `Expires`
  `Cache-Control`：其他可设置的值：
    - `public`：响应**可以被任何对象（包括：发送请求的客户端，代理服务器等）缓存**，即使是通常不可缓存的内容
    - `private`：响应**只能被单个用户缓存，不能作为共享缓存（即代理服务器不能缓存它。）**，私有缓存可以缓存响应内容，比如：对应用户的本地浏览器
    - `no-cache`：**浏览器不做缓存检查**。在发布缓存副本之前，强制要求缓存把请求提交给原始服务器进行验证 (协商缓存验证)。
    - `no-stroe`：**不使用任何缓存**。缓存不应存储有关客户端请求或服务器响应的任何内容
    - `max-age=<seconds>`：设置**缓存存储的最大周期，超过这个时间缓存被认为过期（单位秒）**。与Expires相反，**时间是相对于请求的时间**。
    - `s-maxage=<seconds>`：**缓存服务器对资源缓存的最大时间**。**覆盖max-age或者Expires头，但是仅适用于共享缓存 (比如各个代理)**，私有缓存会忽略它。
    - `must-revalidate`：**可以缓存，一旦资源过期（比如已经超过max-age）**，在成功向原始服务器验证之前，缓存不能用该资源响应后续请求。
    - `proxy-revalidate`：与 `must-revalidate` 作用相同，但它**仅适用于共享缓存（例如代理），并被私有缓存忽略**。要求缓存服务器针对缓存资源向服务器进行确认。

### 协商缓存（强缓存过期之后会使用协商缓存，协商缓存需要客户端向服务端发送请求，资源未过期则服务端返回304否则返回新的资源）

- 方案一：
  - `If-Modified-Since`：请求头，资源最近修改时间，由浏览器告诉服务器。
  即上次请求时，服务器给浏览器的Last-Modified。If-Modified-Since会把Last-Modified 的值发送给服务器，询问服务器在该日期后资源是否有更新，有更新的话就会将新的资源发送回来。
  - `Last-Modified`：响应头，资源最近修改时间，由服务器告诉浏览器
  GMT格式
- 方案二：
  - `Etag`：响应头，资源标识，**由服务器告诉浏览器**
    **对比文件内容，即资源内容变了，Etag才变；资源不变，Etag不变**，类似于资源内容的唯一标识。
  - `If-None-Match`：请求头，缓存资源标识，**由浏览器告诉服务器**
    即上次请求时，服务器给浏览器的Etag，如果If-None-Match和资源的Etag一致，服务器返回304（继续使用本地缓存）。
    If-None-Match 会将当前 ETag 发送给服务器，询问该资源 ETag 是否变动，有变动的话就将新的资源发送回来。并且 ETag 优先级比 Last-Modified 高。
    若有If-None-Match，则忽略If-Modified-Since，除非服务器不支持 If-None-Match。

### better方案

<br/>

一般都是输入网址，访问一个html文件，html文件引入js、css和图片等资源。
方案：**禁止html文件缓存，每次访问html都去请求服务器，这样每次浏览器都能拿到最新的html资源。当js内容更新时，修改html引入的js文件的版本号**。

例如：

```html
<script src="https://test.com/a.js?version=0.0.1"></script>
```

- 首次访问html，下载0.0.1版本的js文件
- 再次访问html，js文件的版本还是0.0.1，则使用本地缓存
- 再次访问时，js文件版本变为0.0.2，则下载版本0.0.2的js文件
- 如此循环往复
除了以版本号来区分，也可以用MD5hash值来区分

### 应用实例

<br/>

在实际的网站开发中，线上环境通常会有出现 CSS、JS 更新，若服务器端已更新，而浏览器还是在使用缓存而不同步，将出现页面展示或 JS 异常等问题，为了保证浏览器能及时同步资源，我们可以这样做：

- 将 `Expires` 设置为 `-1，`意思是**立即超时**，即每次加载资源都会请求 URL，通过 `Last Modification` 和 `ETag` 来由服务器来判断是否更新。这样就保证了服务器与浏览器资源文件同步。
- 上面的方法虽然同步了，但是也使所有资源文件每次都将访问服务器，而建立连接，本来就会有时间损耗。

### 改进如下

<br/>

将 `Expires` 设为一年或者更长 ，则浏览器不会主动请求 URL。但在 URL 后面加上类似时间戳的参数
例如：`https://www.test.com?time=1676257395166`，后面跟的参数其实是没有实际意义的，但是，**每次在我们需要客户端同步对应文件时，仅需要修改对应文件 URL 的 time 参数即可，浏览器发现 URL 为新 URL，将即刻更新**。

百度、淘宝等对 JS、CSS 缓存处理用的基本都是上面的策略，这样做的好处是：

- **浏览器默认任何时候都仅使用缓存，加快了加载。而当文件需要更新时，通过修改参数又能让浏览器及时更新**。

### 核心原理：URL 作为缓存键

<br/>

浏览器缓存的核心机制是：**将完整的 URL 作为缓存的键(key)**。

- `https://www.test.com/app.js` 和 `https://www.test.com/app.js?time=123456`
- 在浏览器看来，这是**两个完全不同的资源**

### 具体实现流程

#### 1. 长期缓存设置

```http
# 服务器响应头
Cache-Control: max-age=31536000  # 一年
Expires: Mon, 01 Jan 2024 00:00:00 GMT
```

#### 2. 文件更新机制

**情况A：文件内容不变，只想强制更新**

```html
<!-- 旧版本 -->
<script src="https://www.test.com/app.js?v=1.0.0"></script>

<!-- 新版本 - 只改变参数 -->
<script src="https://www.test.com/app.js?v=1.0.1"></script>
```

**情况B：基于内容生成哈希（更优方案）**

```html
<!-- 文件内容：function hello() { return "hello"; } -->
<script src="https://www.test.com/app.a1b2c3d4.js"></script>

<!-- 文件更新后：function hello() { return "hello world"; } -->
<script src="https://www.test.com/app.e5f6g7h8.js"></script>
```

### 现代前端构建工具的实践

#### Webpack 示例

```javascript
// webpack.config.js
module.exports = {
  output: {
    filename: '[name].[hash].js', // 根据内容生成哈希
    chunkFilename: '[name].[hash].js'
  },
};
```

#### 构建结果

```
dist/
├── app.3a4b5c6d.js    # 内容改变，哈希就变
├── vendor.7e8f9a0b.js
└── index.html
```

### 服务器配置

#### Nginx 配置

```nginx
location ~* \.(js|css|png|jpg|jpeg|gif|ico)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

#### 关键点：`immutable` 标记

```http
Cache-Control: public, max-age=31536000, immutable
```

告诉浏览器：在缓存有效期内，这个资源**永远不会改变**，无需验证。

### 更新传播流程

1. **开发阶段**：文件修改 → 构建工具生成新的哈希文件名
2. **部署阶段**：上传新文件，更新 `HTML` 中的引用
3. **用户访问**：
   - 首次访问或缓存过期：下载所有新资源
   - 已有缓存：继续使用旧版本，直到访问更新后的 `HTML`

### 优势分析

#### 性能优势

- **缓存命中率极高**：未变更的资源永远从缓存读取
- **减少网络请求**：无需 `304` 验证，直接使用缓存
- **并行下载**：浏览器可以同时下载多个永久缓存资源

#### 更新优势

- **精确更新**：只有实际变更的文件需要重新下载
- **零延迟切换**：`HTML` 更新后立即生效
- **版本控制**：通过 `URL` 参数天然支持多版本共存

### 实际应用场景

#### 单页应用(SPA)

```html
<!-- 版本 1.2.3 -->
<script src="/static/js/runtime~main.a1b2c3.js"></script>
<script src="/static/js/main.d4e5f6.js"></script>

<!-- 版本 1.2.4 - 只有 main 文件更新 -->
<script src="/static/js/runtime~main.a1b2c3.js"></script> <!-- 缓存命中 -->
<script src="/static/js/main.g7h8i9.js"></script> <!-- 重新下载 -->
```

#### 第三方库 CDN

```html
<!-- jQuery 固定版本 -->
<script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js"></script>
```

### 注意事项

1. **HTML 文件不能长期缓存**
   ```nginx
   location / {
       index index.html;
       try_files $uri $uri/ =404;
       # HTML 不设置长期缓存或缓存时间很短
       expires 1h;
   }
   ```

2. **确保旧版本清理**
   - 定期清理服务器上的旧哈希文件
   - 使用 CI/CD 自动化清理

3. **回滚策略**
   - 保留最近几个版本的文件
   - 快速回滚时只需回退 HTML 引用

### 总结

这种策略的精妙之处在于：

- **利用 URL 作为缓存键**，通过改变 `URL` 来"欺骗"浏览器下载新内容
- **将缓存控制从 HTTP 头转移到文件名/URL**，实现更精确的控制
- **完美平衡了缓存效率与更新及时性**

这就是为什么现代大型网站（百度、淘宝、Google 等）都能在保持极快加载速度的同时，确保用户总能获得最新版本的原因。
