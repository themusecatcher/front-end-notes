# Note 16

<BackTop />

## `for...in` 和 `for...of`

### **核心区别对比表**

| **特性** | `for...in` | `for...of` |
|--|--|--|
| **遍历目标** | **对象**的可枚举属性（包括原型链）| **可迭代对象**的元素（数组、字符串等）|
| **返回值** | 属性名（字符串）| 元素值 |
| **适用范围** | 普通对象、数组（不推荐）| 数组、字符串、`Map`、`Set` 等实现了 `Symbol.iterator` 的对象 |
| **原型链属性** | ✅ 遍历可枚举的原型链属性 | ❌ 不遍历原型链 |
| **性能** | 较慢（需检查原型链）| 更快 |

### **一、`for...in` 的特点**

#### 1. **遍历对象属性**

```js
const obj = { a: 1, b: 2 }
for (const key in obj) {
  console.log(key) // 输出 "a", "b"
}
```

#### 2. **遍历数组（不推荐）**

```js
const arr = [10, 20]
for (const index in arr) {
  console.log(index) // 输出 "0", "1"（字符串类型！）
}
```

#### 3. **包含原型链属性**

```js
Object.prototype.customProp = "来自原型链"
const obj = { a: 1 }

for (const key in obj) {
  console.log(key) // 输出 "a", "customProp"
}
```

### **二、`for...of` 的特点**

#### 1. **遍历数组元素**

```js
const arr = [10, 20]
for (const value of arr) {
  console.log(value) // 输出 10, 20
}
```

#### 2. **遍历字符串字符**

```js
const str = "Hi"
for (const char of str) {
  console.log(char) // 输出 "H", "i"
}
```

#### 3. **遍历其他可迭代对象**

```js
const map = new Map([["a", 1], ["b", 2]]);
for (const [key, value] of map) {
  console.log(key, value) // 输出 "a 1", "b 2"
}
```

#### 4. **对象默认不可迭代**

```js
const obj = { a: 1, b: 2 }
for (const val of obj) { // ❌ 报错：obj is not iterable
  console.log(val)
}
```

### **三、关键注意事项**

#### 1. **数组遍历的正确选择**

```js
// 错误用法（遍历索引）
const arr = [10, 20]
for (const index in arr) {
  console.log(arr[index]) // 可行但低效
}

// 正确用法（直接遍历值）
for (const value of arr) {
  console.log(value) // ✅ 推荐
}
```

#### 2. **跳过原型链属性**

```js
const obj = { a: 1 }
Object.prototype.b = 2

// 只遍历自身属性
for (const key in obj) {
  if (obj.hasOwnProperty(key)) { // ✅ 过滤原型属性
    console.log(key) // 仅输出 "a"
  }
}
```

#### 3. **让对象支持 `for...of`**

```js
// 实现迭代器协议
const obj = {
  data: [1, 2, 3],
  [Symbol.iterator]() {
    let index = 0
    return {
      next: () => {
        return index < this.data.length 
          ? { value: this.data[index++], done: false }
          : { done: true }
      }
    }
  }
}

for (const num of obj) {
  console.log(num) // 输出 1, 2, 3
}
```

### **四、总结**

- **用 `for...in`**：  
  遍历对象的可枚举属性（包括原型链），适合调试或处理动态属性。
- **用 `for...of`**：  
  遍历可迭代对象的元素值，适合数组、字符串等结构化数据。

## JS 回调地狱（Callback Hell）

`JavaScript` 中的 **回调地狱（Callback Hell）** 是由于多个异步操作嵌套回调函数导致的代码结构混乱、难以维护的问题。其典型特征是代码呈现“金字塔”形状，嵌套层级过深，导致可读性和可维护性变差。

### **1. 回调地狱的示例**

```js
// 多层嵌套的回调函数，形成回调地狱
getData(function(a) {
  getMoreData(a, function(b) {
    getMoreData(b, function(c) {
      getMoreData(c, function(d) {
        console.log("最终结果:", d)
      })
    })
  })
})
```

### **2. 回调地狱的根本原因**

- **嵌套过深**：多个异步操作依赖前一个操作的结果，必须层层嵌套。
- **错误处理困难**：每个回调需单独处理错误，代码重复且分散。
- **代码不可读**：横向扩展时代码结构混乱，难以追踪执行流程。

### **3. 解决方案**

#### **(1) 使用 Promise**

<br/>

`Promise` 通过链式调用（`.then()`）取代嵌套回调，使代码扁平化：

```js
function getData() {
  return new Promise((resolve) => {
    // 模拟异步操作
    setTimeout(() => resolve("数据A"), 1000)
  })
}

getData()
  .then(a => getMoreData(a))
  .then(b => getMoreData(b))
  .then(c => getMoreData(c))
  .then(d => console.log("最终结果:", d))
  .catch(error => console.error("错误:", error))
```

- **优点**：链式结构清晰，统一错误处理（`.catch()`）。
- **注意**：需确保每个函数返回 Promise。

#### **(2) 使用 Async/Await**

<br/>

`async/await` 以同步写法处理异步操作，彻底消除回调：

```js
async function fetchData() {
  try {
    const a = await getData()
    const b = await getMoreData(a)
    const c = await getMoreData(b)
    const d = await getMoreData(c)
    console.log("最终结果:", d)
  } catch (error) {
    console.error("错误:", error)
  }
}

fetchData()
```

- **优点**：代码结构类似同步代码，可读性极佳，错误处理集中（`try/catch`）。
- **要求**：需在 `async` 函数中使用 `await`。

#### **(3) 拆分命名函数**

<br/>

将嵌套的回调拆分为独立的命名函数，减少嵌套深度：

```js
function handleA(a) {
  getMoreData(a, handleB)
}

function handleB(b) {
  getMoreData(b, handleC)
}

function handleC(c) {
  getMoreData(c, handleD)
}

function handleD(d) {
  console.log("最终结果:", d)
}

getData(handleA)
```

- **优点**：简单直接，适合小规模代码。
- **缺点**：仍需手动串联流程，无法解决错误处理分散的问题。

#### **(4) 使用事件监听或观察者模式**

<br/>

通过事件驱动（如 `Node.js` 的 `EventEmitter`）解耦异步操作：

```js
const EventEmitter = require('events')
const emitter = new EventEmitter()

emitter
  .on("dataA", a => getMoreData(a, b => emitter.emit("dataB", b)))
  .on("dataB", b => getMoreData(b, c => emitter.emit("dataC", c)))
  .on("dataC", c => getMoreData(c, d => console.log("结果:", d)))

getData(a => emitter.emit("dataA", a))
```

- **适用场景**：松散耦合的异步操作，如 GUI 事件或复杂状态机。

#### **(5) 使用工具库**

<br/>

利用第三方库（如 `Async.js`）简化流程控制：

```js
const async = require('async')

async.waterfall([
  callback => getData(callback),
  (a, callback) => getMoreData(a, callback),
  (b, callback) => getMoreData(b, callback),
  (c, callback) => getMoreData(c, callback)
], (error, d) => {
  if (error) console.error(error)
  else console.log("结果:", d)
})
```

- **优点**：提供多种流程控制方法（如串行、并行）。

### **4. 总结**

- **优先使用 `async/await`**：现代 JavaScript 的首选方案，代码简洁易维护。
- **Promise 作为基础**：理解 Promise 是使用 `async/await` 的前提。
- **其他场景灵活选择**：如事件驱动、工具库等，根据项目需求决定。

通过合理选择异步编程模式，可以彻底避免回调地狱，提升代码质量和开发效率。

## [`in`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/in) 操作符

如果指定的属性在指定的对象或其原型链中，则 `in` 运算符返回 `true`。

### 语法

```js
prop in object
```

### 参数

- `prop`：一个字符串类型或者 `symbol` 类型的属性名或者数组索引（非 `symbol` 类型将**会强制转为字符串**）。
- `objectName`：检查它（或其原型链）是否包含具有指定名称的属性的对象。

### 返回值

如果指定的属性存在于给定的对象中，则返回 `true`；否则返回 `false`。

### 示例

```js
// 数组
var trees = new Array("redwood", "bay", "cedar", "oak", "maple")
0 in trees // 返回 true
3 in trees // 返回 true
6 in trees // 返回 false
"bay" in trees // 返回 false (必须使用索引号，而不是数组元素的值)

"length" in trees // 返回 true (length 是一个数组属性)

Symbol.iterator in trees // 返回 true (数组可迭代，只在 ES2015+ 上有效)

// 内置对象
"PI" in Math // 返回 true

// 自定义对象
var mycar = { make: "Honda", model: "Accord", year: 1998 }
"make" in mycar // 返回 true
"model" in mycar // 返回 true
```

`in`右操作数必须是一个对象值。例如，你可以指定使用`String`构造函数创建的字符串，但不能指定字符串文字。

```js
var color1 = new String("green")
"length" in color1 // 返回 true
var color2 = "coral"
"length" in color2 // 报错 (color2 不是对象)
```

#### 对被删除或值为 `undefined` 的属性使用 `in`

<br/>

如果你使用 `delete` 运算符删除了一个属性，则 `in` 运算符对所删除属性返回 `false`。

```js
var mycar = { make: "Honda", model: "Accord", year: 1998 }
delete mycar.make
"make" in mycar // 返回 false

var trees = new Array("redwood", "bay", "cedar", "oak", "maple")
delete trees[3]
3 in trees // 返回 false
```

如果你只是将一个属性的值赋值为 `undefined`，而没有删除它，则 `in` 运算仍然会返回 `true`。

```js
var mycar = { make: "Honda", model: "Accord", year: 1998 }
mycar.make = undefined
"make" in mycar // 返回 true

var trees = new Array("redwood", "bay", "cedar", "oak", "maple")
trees[3] = undefined
3 in trees // 返回 true
```

#### 继承属性

如果一个属性是从原型链上继承来的，`in` 运算符也会返回 `true`。

```js
"toString" in {} // 返回 true
```

#### 检查对象的自有属性

```js
const person = { name: "Alice", age: 25 }
console.log("name" in person) // true, 因为 'name' 是 person 的自有属性
console.log("toString" in person) // true, 因为 toString 是 Object 的方法
```

#### 检查原型链中的属性

```js
function Person(name) {
  this.name = name
}
Person.prototype.greet = function() {
  return `Hello, my name is ${this.name}`
}

const alice = new Person("Alice")
console.log("greet" in alice) // true, 因为 greet 在 alice 的原型上
```

#### 使用 Symbol 作为键

```js
const uniqueKey = Symbol("key")
const obj = { [uniqueKey]: "value" }
console.log(uniqueKey in obj); // true
```

#### 与 hasOwnProperty 的区别

<br/>

`in` 会检查原型链上的属性，而 `hasOwnProperty` 仅检查对象自身属性：

```js
const obj = {}
console.log("toString" in obj) // true
console.log(obj.hasOwnProperty("toString")) // false
```

### 应用场景

1. 安全检测 `DOM` 属性

```js
const element = document.getElementById("myElement")
if ("hidden" in element) {
  element.hidden = true // 安全操作
}
```

2. 动态检查对象属性

```js
const config = { apiUrl: "https://api.example.com", timeout: 5000 }
if ("apiUrl" in config) {
  fetch(config.apiUrl)
}
```

### 总结

- `JavaScript` 的 `in`：核心是检查对象属性（包括继承属性），而非元素值。
- 适用场景：动态属性检查、避免访问未定义属性时的错误。
- 替代方案：
  - 检查值是否存在：`Array.includes()`、`Set.has()`、`Map.has()`。
  - 检查自身属性：`Object.hasOwnProperty()` 或 `Object.hasOwn()`。
