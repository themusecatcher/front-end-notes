# Note 11

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
  - `protocols` <Badge type="tip" text="可选" />
    一个`协议字符串`或者一个`包含协议字符串的数组`。这些字符串用于指定子协议，这样单个服务器可以实现多个 WebSocket 子协议（例如，你可能希望一台服务器能够根据指定的协议（protocol）处理不同类型的交互）。如果不指定协议字符串，则假定为空字符串。

### 属性

- `WebSocket.binaryType`: 使用二进制的数据类型连接。
- `WebSocket.bufferedAmount` <Badge type="tip" text="只读" />: 未发送至服务器的字节数。
- `WebSocket.extensions` <Badge type="tip" text="只读" />: 服务器选择的扩展。
- `WebSocket.onclose`: 用于指定连接关闭后的回调函数。
- `WebSocket.onerror`: 用于指定连接失败后的回调函数。
- `WebSocket.onmessage`: 用于指定当从服务器接受到信息时的回调函数。
- `WebSocket.onopen`: 用于指定连接成功后的回调函数。
- `WebSocket.protocol` <Badge type="tip" text="只读" />: 服务器选择的下属协议。
- `WebSocket.readyState` <Badge type="tip" text="只读" />: 当前的链接状态。
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
