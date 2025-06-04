# Note 18

<BackTop />

## [事件循环](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Execution_model)（EventLoop）

### JavaScript 事件循环：宏任务与微任务详解

::: tip 备注
- 单线程是异步产生的原因
- 事件循环是异步的实现方式
:::
<br/>

`JavaScript` 是单线程语言，通过**事件循环（Event Loop）**处理异步任务。事件循环的核心是**协调同步任务、宏任务（Macro Task）和微任务（Micro Task）的执行顺序**。

### 一、事件循环的基本流程

1. **执行同步代码**：所有同步任务按顺序执行，形成调用栈（Call Stack）。
2. **处理异步任务**：
   - **宏任务**：如 `setTimeout`、`setInterval`、`click/scroll` 交互回调、`I/O` 操作等，会被推入宏任务队列。
   - **微任务**：如 `Promise.then`、`MutationObserver` 等，会被推入微任务队列。
3. **调用栈清空后**：
   - **优先执行所有微任务**：清空微任务队列中的任务。
   - **执行一个宏任务**：从宏任务队列中取出一个任务执行。
   - **重复循环**：重复上述步骤，直到所有任务完成。

### 二、宏任务（Macro Task）

#### 1. 定义

- **宏任务**代表较大的、离散的工作单元，由宿主环境`（浏览器/Node.js）`触发。
- 每次事件循环**只执行一个宏任务**，执行完毕后会清空微任务队列。

#### 2. 常见宏任务

| **类型** | **示例** | **环境** |
|--|--|--|
| 定时器回调 | `setTimeout`, `setInterval` | 浏览器、Node.js |
| `I/O` 操作回调 | 文件读写、网络请求 | `Node.js` |
| `XHR` 回调（通过事件回调触发） | 网络请求 | 浏览器 |
| `DOM` 事件回调（交互事件） | `click`, `scroll` | 浏览器 |
| `setImmediate` | `setImmediate(() => {})` | `Node.js` |
| `requestAnimationFrame` | 动画帧回调 | 浏览器 |

#### 3. 示例

```js
console.log("同步任务 1")

setTimeout(() => {
  console.log("宏任务 1")
}, 0)

setTimeout(() => {
  console.log("宏任务 2")
}, 0)

console.log("同步任务 2")

// 输出顺序：
// 同步任务 1 → 同步任务 2 → 宏任务 1 → 宏任务 2
```

### 三、微任务（Micro Task）

#### 1. 定义

- **微任务**是更小、更紧急的任务，通常与当前执行的代码直接关联。
- **每次宏任务执行完毕后**，会立即清空微任务队列中的所有任务。

#### 2. 常见微任务

| **类型** | **示例** | **环境** |
|--|--|--|
| `Promise` 回调 | `Promise.then`/`catch`/`finally` | `浏览器、Node.js` |
| `async/await` | `async` 函数中的 `await` 后面的代码会被放入微任务队列 | `浏览器、Node.js` |
| `Fetch API` 的回调（通过 `Promise` 触发） | `fetch("https://api.example.com/data").then(() => {   console.log("Fetch 回调（微任务）") })` | 浏览器 |
| `process.nextTick` | `process.nextTick(() => {})` | `Node.js` |
| `MutationObserver` | `DOM` 变更观察回调 | 浏览器 |

:::tip 备注
`async/await` 是 `Promise` 的语法糖，两者的行为在微任务层面完全一致

```js
// 等价写法 1：async/await
async function foo() {
  await somePromise
  console.log("A")
}

// 等价写法 2：Promise.then
function foo() {
  return somePromise.then(() => {
    console.log("A")
  })
}
```

### 当执行 `await` 时：

- 如果 `await` 后的表达式是一个 `Promise`，`JavaScript` 引擎会暂停当前 `async` 函数的执行，将 `await` 之后的代码包装成一个微任务，放入微任务队列。
- 如果 `await` 后的值不是 `Promise`，引擎会将其隐式转换为 `Promise.resolve(value)`，再触发微任务。

### 示例

```js
async function example() {
  console.log(1)
  await Promise.resolve() // 将后续代码包装为微任务
  console.log(2)
}

example()
Promise.resolve().then(() => console.log(3))
console.log(4)

// 输出顺序：1 → 4 → 2 → 3
```

:::

#### 3. 示例

```js
console.log("同步任务 1")

Promise.resolve().then(() => {
  console.log("微任务 1")
})

setTimeout(() => {
  console.log("宏任务 1")
}, 0)

Promise.resolve().then(() => {
  console.log("微任务 2")
})

console.log("同步任务 2")

// 输出顺序：
// 同步任务 1 → 同步任务 2 → 微任务 1 → 微任务 2 → 宏任务 1
```

### 四、执行顺序规则

1. **同步任务优先**：所有同步代码先执行。
2. **微任务优先于宏任务**：每执行完一个宏任务后，立即清空所有微任务。
3. **嵌套任务的优先级**：
   - 如果在微任务中创建新的微任务，新微任务会**立即加入队列末尾并执行**。
   - 如果在宏任务中创建新的宏任务，新宏任务会**推入队列等待下一轮循环**。

#### 复杂示例

```js
console.log("同步任务")

setTimeout(() => {
  console.log("宏任务 1")
  Promise.resolve().then(() => {
    console.log("宏任务 1 中的微任务")
  })
}, 0)

Promise.resolve().then(() => {
  console.log("微任务 1")
  setTimeout(() => {
    console.log("微任务 1 中的宏任务")
  }, 0)
})

Promise.resolve().then(() => {
  console.log("微任务 2")
})

// 输出顺序：
// 同步任务 → 微任务 1 → 微任务 2 → 宏任务 1 → 宏任务 1 中的微任务 → 微任务 1 中的宏任务
```

### 五、浏览器与 Node.js 的差异

| **特性** | **浏览器** | **Node.js** |
|--|--|--|
| **微任务优先级** | `Promise.then` 优先于 `MutationObserver` | `process.nextTick` 优先于 `Promise.then` |
| **宏任务分类** | 简化的事件循环模型 | 分为多个阶段（如 `timers`、`poll`、`check` 等） |
| `setImmediate` | 不支持 | 支持，与 `setTimeout(fn, 0)` 类似但优先级不同 |

### 六、关键总结

1. **事件循环流程**：同步任务 → 微任务 → 宏任务 → UI渲染（浏览器）。
2. **微任务优先级更高**：确保与当前逻辑紧密相关的任务优先完成。
3. **避免阻塞**：长时间运行的微任务会阻塞渲染和后续任务，需谨慎使用。

通过理解宏任务和微任务的执行机制，可以更好地优化代码性能，避免异步陷阱。

## [requestAnimationFrame](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame)

`window.requestAnimationFrame()` 方法会告诉浏览器你**希望执行一个动画**。它**要求浏览器在下一次重绘之前，调用用户提供的回调函数**。

对回调函数的调用频率通常与显示器的刷新率相匹配。虽然 `75hz`、`120hz` 和 `144hz` 也被广泛使用，但是最常见的刷新率还是 `60hz`（每秒 `60` 个周期/帧）。**为了提高性能和电池寿命**，大多数浏览器都会暂停在后台选项卡或者隐藏的 `<iframe>` 中运行的 `requestAnimationFrame()`。

::: tip 备注
若你想在浏览器下次重绘之前继续更新下一帧动画，那么回调函数自身必须再次调用 `requestAnimationFrame()`。`requestAnimationFrame()` 是一次性的。
:::

::: warning 警告
请确保总是使用第一个参数（或其他一些获取当前时间的方法）来计算动画在一帧中的进度，否则动画在高刷新率的屏幕中会运行得更快。有关方法请参考下面的示例。
:::

### 语法

```js
requestAnimationFrame(callback)
```

### 参数

- `callback`
  - 该函数会在下一次重绘更新你的动画时被调用到。这个回调函数只会传递一个参数：一个 [`DOMHighResTimeStamp`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMHighResTimeStamp) 参数，用于表示上一帧渲染的结束时间（基于 `time origin` 的毫秒数）
  - 时间戳是一个以毫秒为单位的十进制数字，最小精度为 `1` 毫秒。对于 `Window` 对象（而非 `workers`）来说，它等同于 [`document.timeline.currentTime`](https://developer.mozilla.org/en-US/docs/Web/API/AnimationTimeline/currentTime)。此时间戳在同一代理上（所有同源的 `window`，更重要的是同源的 `iframe`）运行的所有窗口之间共享——它允许在多个 `requestAnimationFrame` 回调函数中执行同步动画。此时间戳值也近似于在回调函数开始时调用 `performance.now()`，但它们永远都不会是相同的值。
  - 当 `requestAnimationFrame()` 队列中的多个回调开始在同一帧中触发时，它们都会收到相同的时间戳，即便在计算前一个回调函数工作量时这一帧的时间已经过去。

### 返回值

<br/>

请求 `ID` 是一个 `long` 类型整数值，是在回调列表里的唯一标识符。这是一个非零值，但你不能对该值做任何其他假设。你可以将此值传递给` window.cancelAnimationFrame()` 函数以取消该刷新回调请求。

### 示例

<br/>

在这个例子中，一个元素的动画时间是 `2` 秒（`2000` 毫秒）。该元素以 `0.1px/ms` 的速度向右移动，所以它的相对位置（以 `CSS` 像素为单位）可以通过动画开始后所经过的时间（以毫秒为单位）的函数来计算，即 `0.1 * elapsed`。该元素的最终位置是在其初始位置的右边 `200px（0.1 * 2000）`。

```js
const element = document.getElementById("some-element-you-want-to-animate")
let start, previousTimeStamp
let done = false

function step(timestamp) {
  if (start === undefined) {
    start = timestamp
  }
  const elapsed = timestamp - start

  if (previousTimeStamp !== timestamp) {
    // 这里使用 Math.min() 确保元素在恰好位于 200px 时停止运动
    const count = Math.min(0.1 * elapsed, 200)
    element.style.transform = `translateX(${count}px)`
    if (count === 200) done = true
  }

  if (elapsed < 2000) {
    // 2 秒之后停止动画
    previousTimeStamp = timestamp
    if (!done) {
      window.requestAnimationFrame(step)
    }
  }
}

window.requestAnimationFrame(step)
```

以下三个示例说明了设置时间零点的不同方法，时间零点是**计算每帧中动画进度的起点**。如果你想同步到外部时钟，例如 [`BaseAudioContext.currentTime`](https://developer.mozilla.org/zh-CN/docs/Web/API/BaseAudioContext/currentTime)，可用的最高精度是单帧的持续时间（`16.67ms @60hz`）。回调函数的时间戳参数表示**上一帧的结束**，因此最快将在下一帧中呈现新计算的值。

<br/>

此示例会等待第一个回调函数执行时设置 `zero`。如果你的动画在开始时跳转到新值，则必须采用这种结构。如果你无需与任意外部同步（例如音频），则建议使用此方法，因为某些浏览器在首次调用 `requestAnimationFrame()` 和首次调用回调函数之间会有多帧延迟。

```js
let zero;
requestAnimationFrame(firstFrame)
function firstFrame(timeStamp) {
  zero = timeStamp
  animate(timeStamp)
}
function animate(timeStamp) {
  const value = (timeStamp - zero) / duration
  if (value < 1) {
    element.style.opacity = value
    requestAnimationFrame((t) => animate(t))
  } else element.style.opacity = 1
}
```

此示例在第一次调用 `requestAnimationFrame` 前使用 [`document.timeline.currentTime`](https://developer.mozilla.org/en-US/docs/Web/API/AnimationTimeline/currentTime) 设置了一个零值。`document.timeline.currentTime` 与 `timeStamp` 参数对齐，因此零值等价于第 `0` 帧的时间戳。

```js
const zero = document.timeline.currentTime
requestAnimationFrame(animate)
function animate(timeStamp) {
  const value = (timeStamp - zero) / duration // animation-timing-function: linear
  if (value < 1) {
    element.style.opacity = value
    requestAnimationFrame((t) => animate(t))
  } else element.style.opacity = 1
}
```

此示例使用 [`performance.now()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Performance/now) 而不是回调的时间戳值去设置动画。你可以使用它来实现稍高的同步精度，尽管附加精确度是易变的且增长不大。备注：此示例不能让你可靠地同步动画回调函数。

```js
const zero = performance.now()
requestAnimationFrame(animate)
function animate() {
  const value = (performance.now() - zero) / duration
  if (value < 1) {
    element.style.opacity = value
    requestAnimationFrame((t) => animate(t))
  } else element.style.opacity = 1
}
```

## [requestIdleCallback](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestIdleCallback)

`window.requestIdleCallback()` 方法插入一个函数，这个**函数将在浏览器空闲时期被调用**。这使开发者能够在主事件循环上执行后台和低优先级工作，而不会影响延迟关键事件，如动画和输入响应。函数一般会按先进先调用的顺序执行，然而，如果回调函数指定了执行超时时间 `timeout`，则有可能为了在超时前执行函数而打乱执行顺序。

你可以在空闲回调函数中调用 `requestIdleCallback()`，以便在下一次通过事件循环之前调度另一个回调。

:::tip 备注
强烈建议为必要的工作设置 timeout 选项，否则在回调触发之前可能已经过去了多秒。
:::

### 语法

```js
requestIdleCallback(callback)
requestIdleCallback(callback, options)
```

### 参数

- `callback`

  一个在事件循环空闲时即将被调用的函数的引用。函数会接收到一个名为 `IdleDeadline` 的参数，这个参数可以获取当前空闲时间以及回调是否在超时时间前已经执行的状态。

- `options` <Tag :bordered="false" color="cyan">可选</Tag>
  包括可选的配置参数。具有如下属性：
  - `timeout`：如果指定了 `timeout`，并且有一个正值，而回调在 `timeout` 毫秒过后还没有被调用，那么回调任务将放入事件循环中排队，即使这样做有可能对性能产生负面影响。

### 返回值

<br/>

一个 `ID`，可以把它传入 `Window.cancelIdleCallback()` 方法来结束回调。
