# Note 18

<BackTop />

## [事件循环](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Execution_model)（EventLoop）

### JavaScript 事件循环：宏任务与微任务详解

<br/>

`JavaScript` 是单线程语言，通过**事件循环（Event Loop）**处理异步任务。事件循环的核心是**协调同步任务、宏任务（Macro Task）和微任务（Micro Task）的执行顺序**。

### 一、事件循环的基本流程

1. **执行同步代码**：所有同步任务按顺序执行，形成调用栈（Call Stack）。
2. **处理异步任务**：
   - **宏任务**：如 `setTimeout`、`setInterval`、`I/O` 操作等，会被推入宏任务队列。
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
| `DOM` 事件回调 | `click`, `scroll` | 浏览器 |
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
