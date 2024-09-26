# Note 11

<BackTop />

## [WeakSet()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WeakSet) & [WeakMap()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)

`WeakSet` 结构与 `Set` 类似，也是不重复的值的集合，具备:

- `WeakSet.prototype.add(value)` ：向 `WeakSet` 实例添加一个新成员。
- `WeakSet.prototype.delete(value)` ：清除 `WeakSet` 实例的指定成员。
- `WeakSet.prototype.has(value)` ：返回一个布尔值，表示某个值是否在 `WeakSet` 实例之中。

`WeakSet` 与 `Set` 有两个区别（也没有`size`和`forEach`属性）：

- `WeakSet` 的**成员只能是对象和 Symbol 值**，而**不能是其他类型的值**
- `WeakSet` 中的**对象都是弱引用**，即**垃圾回收机制不考虑 WeakSet 对该对象的引用**，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 `WeakSet` 之中。

由于 `WeakSet` 内部有多少个成员，取决于垃圾回收机制有没有运行，运行前后很可能成员个数是不一样的，而垃圾回收机制何时运行是不可预测的，因此，**ES6规定 WeakSet 和 WeakMap 不可遍历**。

### WeakSet()应用场景

<br/>

一个很典型的应用场景： **储存 DOM 节点，而不用担心这些节点从文档移除时，会引发内存泄漏**

```js
// 需要一个数组来保存着被禁止掉的 DOM 元素:
const disabledElements = new Set()
const loginButton = document.querySelector('button')
// 通过加入对应集合，给这个节点打上“禁用”标签
disabledElements.add(loginButton)
// 查询元素在不在 disabledElements 中,就可以知道它是不是被禁用了,但是假如 元素从 DOM 树中被删除了,它的引用却仍然保存在 Set 中，它的键依然引用着,因此垃圾回收程序也不能回收它，这就很容易造成内存泄漏。
```

使用 `WeakSet` 对象就很好的解决了这个问题:

```js
const disabledElements = new WeakSet()
const loginButton = document.querySelector('#login')
// 通过加入对应集合，给这个节点打上“禁用”标签 
disabledElements.add(loginButton)
// 这样只要 WeakSet 中任何元素从 DOM 树中被删除，垃圾回收程序就可以忽略其存在，而立即释放其内存。
```

`WeakMap` **弱引用的只是键名，而不是键值**。键值依然是正常引用。

`WeakMap`与`Map`有两个区别（也没有`size`、`forEach`和`clear`属性）：

- `WeakMap`**只接受对象和 Symbol 值作为键名**（`null`除外，`null`是对象但不能作为键名），不接受其他类型的值作为键名
  
  ```js
  const map = new WeakMap()
  map.set(1, 2) // 报错
  map.set(null, 2) // 报错
  map.set(Symbol(), 2) // 不报错
  ```

- `WeakMap`的键名所指向的对象，不计入垃圾回收机制。
  
**只要所引用的对象的其他引用都被清除，垃圾回收机制就会释放该对象所占用的内存**。也就是说，一旦不再需要，`WeakMap` 里面的键名对象和所对应的键值对会自动消失，不用手动删除引用。

`WeakMap`的设计目的在于，有时我们想在某个对象上面存放一些数据，但是这会形成对于这个对象的引用。

```js
const e1 = document.getElementById('foo')
const e2 = document.getElementById('bar')
const arr = [
  [e1, 'foo 元素'],
  [e2, 'bar 元素']
]
// 一旦不再需要两个对象 e1 和 e2，我们就必须手动删除这个引用，否则垃圾回收机制就不会释放el占用的内存.
// 不需要 e1 和 e2 的时候，必须手动删除引用，一旦忘记删除，就会造成内存泄露
arr = null

// 使用weakMap解决该问题
// 以下代码棕 DOM 节点对象除了 WeakMap 的弱引用外，其他位置对该对象的引用一旦消除，该对象占用的内存就会被垃圾回收机制释放。
// WeakMap 保存的这个键值对，也会自动消失。
const wm = new WeakMap()
const el = document.getElementById('foo')
map.set(el, 'foo元素') // 这样当el被移除时，就会自动释放占用的内存
wm.get(el) // 'foo元素'
```

总之，**WeakMap的专用场合就是，它的键所对应的对象，可能会在将来消失**。`WeakMap`结构有助于防止内存泄漏。
<br/>
一个典型应用场景是，在网页的 `DOM` 元素上添加数据，就可以使用`WeakMap`结构。当该 `DOM` 元素被清除，其所对应的`WeakMap`记录就会自动被移除。

## [WebSocket](https://developer.mozilla.org/zh-CN/docs/Web/API/WebSocket)

`WebSocket` 对象提供了用于创建和管理 `WebSocket` 连接，以及可以通过该连接发送和接收数据的 API。

`WebSockets` 是一种先进的技术。它**可以在用户的浏览器和服务器之间打开交互式通信会话**。使用此 API，你可以向服务器发送消息并接收事件驱动的响应，而无需通过轮询服务器的方式以获得响应。

使用 `WebSocket()` 构造函数来构造一个 `WebSocket`。

- 构造函数: `WebSocket(url[, protocols])` 返回一个 `WebSocket` 对象。
- 语法：

  ```js
  var aWebSocket = new WebSocket(url [, protocols])
  ```

- 参数：
  - `url`
    要连接的 `URL`；这应该是 `WebSocket` 服务器将响应的 `URL`。
  - `protocols` <Tag :bordered="false" color="cyan">可选</Tag>
    一个`协议字符串`或者一个`包含协议字符串的数组`。这些字符串用于指定子协议，这样单个服务器可以实现多个 WebSocket 子协议（例如，你可能希望一台服务器能够根据指定的协议（protocol）处理不同类型的交互）。如果不指定协议字符串，则假定为空字符串。

### 属性

- `WebSocket.binaryType`: 使用二进制的数据类型连接。
- `WebSocket.bufferedAmount` <Tag :bordered="false" color="cyan">只读</Tag>: 未发送至服务器的字节数。
- `WebSocket.extensions` <Tag :bordered="false" color="cyan">只读</Tag>: 服务器选择的扩展。
- `WebSocket.onclose`: 用于指定连接关闭后的回调函数。
- `WebSocket.onerror`: 用于指定连接失败后的回调函数。
- `WebSocket.onmessage`: 用于指定当从服务器接受到信息时的回调函数。
- `WebSocket.onopen`: 用于指定连接成功后的回调函数。
- `WebSocket.protocol` <Tag :bordered="false" color="cyan">只读</Tag>: 服务器选择的下属协议。
- `WebSocket.readyState` <Tag :bordered="false" color="cyan">只读</Tag>: 当前的链接状态。
- `WebSocket.url` 只读: WebSocket 的绝对路径。

### 方法

- `WebSocket.close([code[, reason]])`: 关闭当前链接。
- `WebSocket.send(data)`: 对要传输的数据进行排队。

### 事件

使用 `addEventListener()` 或将一个事件监听器赋值给本接口的 `oneventname` 属性，来监听下面的事件。

- `close`：当一个 `WebSocket` 连接被关闭时触发。 也可以通过 `onclose` 属性来设置。
- `error`：当一个 `WebSocket` 连接因错误而关闭时触发，例如无法发送数据时。 也可以通过 `onerror` 属性来设置。
- `message`：当通过 `WebSocket` 收到数据时触发。 也可以通过 `onmessage` 属性来设置。
- `open`：当一个 `WebSocket` 连接成功时触发。 也可以通过 `onopen` 属性来设置。

### 示例

```js
// Create WebSocket connection.
const socket = new WebSocket('ws://localhost:8080')

// Connection opened
socket.addEventListener('open', function (event) {
  socket.send('Hello Server!')
})

// Listen for messages
socket.addEventListener('message', function (event) {
  console.log('Message from server ', event.data)
})
```

## [ES6模块与CommonJS模块的差异](https://es6.ruanyifeng.com/#docs/module-loader#ES6-%E6%A8%A1%E5%9D%97%E4%B8%8E-CommonJS-%E6%A8%A1%E5%9D%97%E7%9A%84%E5%B7%AE%E5%BC%82)

- `CommonJS` 模块输出的是一个**值的拷贝**，`ES6` 模块输出的是**值的引用**。
  - `CommonJS` 模块输出的是值的拷贝，也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。
  - `ES6` 模块的运行机制与 `CommonJS` 不一样。**JS 引擎对脚本静态分析的时候，遇到模块加载命令import，就会生成一个只读引用**。等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。换句话说，`ES6` 的import有点像 Unix 系统的“符号连接”，**原始值变了，import加载的值也会跟着变**。因此，`ES6` 模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块。
- `CommonJS` 模块是**运行时**加载，`ES6` 模块是**编译时**输出接口。
  - `CommonJS` 加载的是一个对象（即`module.exports`属性），该对象只有在脚本运行完才会生成。而 `ES6` 模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成。
- `CommonJS` 模块的`require()`是**同步加载**模块，`ES6` 模块的`import`命令是**异步加载**，有一个独立的模块依赖的解析阶段。

### Node.js 的模块加载方法

<br/>

`JavaScript` 现在有两种模块。一种是 `ES6` 模块，简称 **ESM**；另一种是 `CommonJS` 模块，简称 **CJS**。

`CommonJS` 模块是 `Node.js` 专用的，与 `ES6` 模块不兼容。语法上面，两者最明显的差异是，`CommonJS` 模块使用`require()`和`module.exports`，`ES6` 模块使用`import`和`export`。

<br/>

它们采用不同的加载方案。从 Node.js v13.2 版本开始，Node.js 已经默认打开了 ES6 模块支持。

<br/>

`Node.js` 要求 `ES6` 模块采用`.mjs`后缀文件名。也就是说，只要脚本文件里面使用`import`或者`export`命令，那么就必须采用`.mjs`后缀名。`Node.js` 遇到`.mjs`文件，就认为它是 `ES6` 模块，**默认启用严格模式**，不必在每个模块文件顶部指定`"use strict"`。

**如果不希望将后缀名改成.mjs，可以在项目的`package.json`文件中，指定`type`字段为`module`。**

```json
"type": "module" // 一旦设置了以后，该项目的 JS 脚本，就被解释成 ES6 模块。
```


如果这时还要使用 `CommonJS` 模块，那么需要将 `CommonJS` 脚本的后缀名都改成`.cjs`。如果没有`type`字段，或者`type`字段为`commonjs`，则`.js`脚本会被解释成 `CommonJS` 模块。

<br/>

**总结为一句话**：`.mjs`文件总是以 `ES6` 模块加载，`.cjs`文件总是以 `CommonJS` 模块加载，`.js`文件的加载取决于`package.json`里面`type`字段的设置。

::: tip 注意
- ES6 模块与 CommonJS 模块尽量不要混用。require命令不能加载.mjs文件，会报错，只有import命令才可以加载.mjs文件。反过来，.mjs文件里面也不能使用require命令，必须使用import。
- 如果 package.json 不包含 "type": "module"，Vite 会生成不同的文件后缀名以兼容 Node.js。.js 会变为 .mjs 而 .cjs 会变为 .js 。（即会生成 .mjs 和 .js 的两个文件）
- 如果 package.json 包含 "type": "module"，（则会生成 .cjs 和 .js 的两个文件）
:::

## [eval()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/eval)函数

`eval()` 函数会将传入的字符串当做 `JavaScript` 代码进行执行。

- 语法：eval(string)

- 参数：string
  一个表示 `JavaScript` 表达式、语句或一系列语句的字符串。表达式可以包含变量与已存在对象的属性。

- 返回值：
  返回字符串中代码的返回值。如果返回值为空，则返回 `undefined`。

### 示例

```js
console.log(eval('2 + 2'))
// Expected output: 4

console.log(eval(new String('2 + 2')))
// Expected output: 2 + 2

console.log(eval('2 + 2') === eval('4'))
// Expected output: true

console.log(eval('2 + 2') === eval(new String('2 + 2')))
// Expected output: false
```

### 永远不要使用 eval！

`eval()` 是一个危险的函数，它**使用与调用者相同的权限执行代码**。如果你用 `eval()` 运行的字符串代码被恶意方（不怀好意的人）修改，你最终可能会在你的网页/扩展程序的权限下，在用户计算机上运行恶意代码。更重要的是，第三方代码可以看到某一个 `eval()` 被调用时的作用域，这也有可能导致一些不同方式的攻击。相似的 `Function` 就不容易被攻击。

> eval() 通常比其他替代方法更慢，因为它必须调用 JS 解释器，而许多其他结构则可被现代 JS 引擎进行优化。

此外，现代 `JavaScript` 解释器将 `JavaScript` 转换为机器代码。这意味着任何变量命名的概念都会被删除。因此，任意一个 `eval` 的使用都会强制浏览器进行冗长的变量名称查找，以确定变量在机器代码中的位置并设置其值。另外，新内容将会通过 `eval()` 引进给变量，比如更改该变量的类型，因此会强制浏览器重新执行所有已经生成的机器代码以进行补偿。但是（谢天谢地）存在一个非常好的 `eval` 替代方法：只需使用 window.Function。
这有个例子方便你了解如何将eval()的使用转变为Function()。

## [window.open()](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/open) 微信扫码弹窗

`Window` 接口的 `open()` 方法，是用**指定的名称将指定的资源加载到新的或已存在的浏览上下文（标签、窗口或 iframe）中**。

### 语法

```js
open()
open(url)
open(url, target)
open(url, target, windowFeatures)
```

### 参数

- `url` <Tag :bordered="false" color="cyan">可选</Tag>
  - 一个字符串，表示**要加载的资源的 `URL` 或路径**。如果指定**空字符串（""）或省略此参数，则会在目标浏览上下文中打开一个空白页**。
- `target` <Tag :bordered="false" color="cyan">可选</Tag>
  - 一个不含空格的字符串，用于**指定加载资源的浏览上下文的名称**。如果该名称无法识别现有的上下文，则会创建一个新的上下文，并赋予指定的名称。还可以使用特殊的 `target` 关键字：`_self`、`_blank`、`_parent` 和 `_top`。
  该名称可用作 `<a>` 或 `<form>` 元素的 `target` 属性。
- `windowFeatures` <Tag :bordered="false" color="cyan">可选</Tag>
  - 一个字符串，包含以逗号分隔的窗口特性列表，形式为 `name=value`，布尔特性则仅为 `name`。这些特性包括窗口的默认大小和位置、是否打开最小弹出窗口等选项。
  <br/>支持以下选项：
    - `popup`: 如果启用此特性，则要求使用最小弹出窗口。弹出窗口中包含的用户界面功能将由浏览器自动决定，**一般只包括地址栏**。

      如果未启用 `popup`，也没有声明窗口特性，则新的浏览上下文将是一个标签页。

      ::: tip 备注：
      在 `windowFeatures` 参数中指定除 `noopener` 或 `noreferrer` 以外的任何特性，也会产生请求弹出窗口的效果。
      :::

      要启用该特性，可以不指定 `popup` 值，或将其设置为 `yes`, `1` 或 `true`。

      例如：`popup=yes`、`popup=1`、`popup=true` 和 `popup` 的结果完全相同。

    - `width` 或 `innerWidth`: 指定**内容区域（包括滚动条）的宽度**。最小要求值为 `100`。

    - `height` 或 `innerHeight`: 指定**内容区域（包括滚动条）的高度**。最小要求值为 `100`。

    - `left` 或 `screenX`: 指定**从用户操作系统定义的工作区左侧到新窗口生成位置的距离**（以像素为单位）。

    - `top` 或 `screenY`: 指定**从用户操作系统定义的工作区顶部到新窗口生成位置的距离**（以像素为单位）。

    - `noopener`: 如果设置了此特性，**新窗口将无法通过 Window.opener 访问原窗口，并返回 null**。

      使用 `noopener` 时，在决定是否打开新的浏览上下文时，除 `_top`、`_self` 和 `_parent` 以外的非空目标名称会像 `_blank` 一样处理。

    - `noreferrer`: 如果设置了此特性，浏览器将省略 `Referer` 标头，并将 `noopener` 设为 `true`。更多信息请参阅 rel="noreferrer" (en-US) 

  ::: tip 备注
  `windowFeatures` 中要求的位置（`top`、`left`）和尺寸（`width`、`height`）值，如果其中任何一个值不允许在用户操作系统应用程序的工作区内呈现整个浏览器弹出窗口，则将被更正。换句话说，新弹出窗口的任何部分最初都不能置于屏幕之外。
  :::

### 返回值

一个 `WindowProxy` (en-US) 对象。只要符合同源策略安全要求，返回的引用就可用于访问新窗口的属性和方法。

### 示例

打开一个新标签页

```js
window.open('https://www.mozilla.org/', 'mozillaTab')
```

可以控制新弹出窗口的大小和位置：

```js
const windowFeatures = 'left=100,top=100,width=320,height=320'
const handle = window.open(
  'https://www.mozilla.org/',
  'mozillaWindow',
  windowFeatures
)
if (!handle) {
  // 不允许打开此窗口
  // 可能被内置弹窗阻止程序阻止了
  // …
}
```

## [window.moveTo](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/moveTo)

将当前窗口移动到指定的坐标位置。

### 语法

```js
window.moveTo(x, y)
```

### 参数

- `x`: 是要移动到的位置横坐标
- `y`: 是要移动到的位置纵坐标

### 示例

```js
function origin() {
  // 把窗口移动到左上角
  window.moveTo(0, 0)
}
```

::: tip 附注
从 Firefox 7 开始，如果符合下列情况，则**普通网页中的 JavaScript 无法通过调用该函数来移动浏览器窗口**：
1. 当前**窗口或标签页不是由window.open方法创建的**
2. 当前**标签页所在的窗口包含有多个标签页**
:::

## [window.resizeTo](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/resizeTo)

动态调整窗口的大小。

### 语法

```js
window.resizeTo(aWidth, aHeight)
```

### 参数

- `aWidth`: 是一个整数，表示新的 `outerWidth`（单位：像素）（包括滚动条、窗口边框等）。
- `aHeight`: 是一个整数，表示新的 `outerHeight`（单位：像素）（包括滚动条、标题栏、窗口边框等）。

### 示例

```js
// 将窗口设置为整个屏幕的 1/4 大小（面积）
function quarter() {
  window.resizeTo(window.screen.availWidth / 2, window.screen.availHeight / 2);
}
```

::: tip 备注
从 Firefox 7 开始，**不能改变浏览器窗口的大小了，要依据下面的规则**：
1. 不能设置那些**不是通过 window.open 创建的窗口或 Tab 的大小**。
2. **当一个窗口里面含有一个以上的 Tab 时，无法设置窗口的大小**。
:::

## [Window: scrollTo()](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/scrollTo)

`Window.scrollTo()` 会滚动到文档中的一组特定坐标。

### 语法

```js
scrollTo(x-coord, y-coord)
scrollTo(options)
```

### 参数

- `x-coord` 是你希望显示在左上角的文档水平轴像素。
- `y-coord` 是你希望显示在左上角的文档垂直轴像素。
- `options` 是一个包含三个属性的对象：
  1. `top` 指定沿 `Y` 轴滚动窗口或元素的像素数量。
  2. `left` 指定沿 `X` 轴滚动窗口或元素的像素数量。
  3. `behavior` 确定滚动是即时完成还是以平滑动画进行。该选项是一个字符串，必须取以下值之一：
    - `smooth`：滚动应该平滑地进行动画展示
    - `instant`：滚动应在一次跳转中即时完成
    - `auto`：滚动行为由 `scroll-behavior` 的计算值来决定

### 例子

```js
window.scrollTo( 0, 1000 )

// 设置滚动行为改为平滑的滚动
window.scrollTo({
    top: 1000,
    behavior: 'smooth'
})
```

## [Element.scrollTo()](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollTo)

`Element` 的 `scrollTo()` 方法可以使界面滚动到给定元素的指定坐标位置。

### 语法

```js
scrollTo(x-coord, y-coord)
scrollTo(options)
```

### 参数

- `x-coord`: 是你想要显示在左上角的元素沿水平轴的像素。
- `y-coord`: 是你想要显示在左上角的元素沿垂直轴的像素。
- `options`: 是一个包含三个属性的对象：
  1. `top`: 指定沿 `Y` 轴滚动窗口或元素的像素数。
  2. `left`: 指定沿 `X` 轴滚动窗口或元素的像素数。
  3. `behavior`: `smooth` 表示平滑滚动并产生过渡效果、`instant` 表示滚动会直接跳转到目标位置，没有过渡效果。`auto` 或缺省值表示浏览器会自动选择滚动时的过渡效果。

### 示例

```js
element.scrollTo(0, 1000)
```

使用 `options`:

```js
element.scrollTo({
  top: 100,
  left: 100,
  behavior: 'smooth'
})
```

## [Element.scrollBy()](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollBy)

`scrollBy()` 方法是使得元素滚动一段特定距离的 `Element` 接口。

### 语法

```js
element.scrollBy(x-coord, y-coord)
element.scrollBy(options)
```

### 参数

- `x-coord` 是元素要在横轴上滚动的距离。
- `y-coord` 是元素要在纵轴上滚动的距离。

*or*

- `options` 是一个 `ScrollToOptions` 字典。

### 例子

```js
// 让元素滚动
element.scrollBy(300, 300)
```

使用 `options`:

```js
element.scrollBy({
  top: 100,
  left: 100,
  behavior: 'smooth'
})
```
