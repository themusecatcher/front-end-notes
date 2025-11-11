# Note 19

<BackTop />

## `Promise` & `async/await`

`Promise` 和 `async/await` 都是用于处理异步操作的方案，它们不是对立的，而是相辅相成的。`async/await` 是基于 `Promise` 的语法糖，让它用起来更像同步代码。

### 核心概念

1. **Promise（承诺）**
  * **是什么**：一个表示异步操作最终完成或失败的对象。它代表一个尚未完成但预计在未来完成的操作的值。
  * **状态**：有三种状态：`pending`（进行中）、`fulfilled`（已成功）、`rejected`（已失败）。状态一旦改变，就不可逆转。
  * **方法**：使用 `.then()` 来处理成功的情况，使用 `.catch()` 来处理失败的情况，使用 `.finally()` 来执行无论成功失败都需要执行的操作。

2. **async / await**
  * **是什么**：`ES2017` 引入的语法，它允许你以编写同步代码的方式来编写异步代码。它**没有取代 Promise**，而是在其之上进行了封装。
  * **`async`**：用于声明一个函数是异步的。这个函数的返回值会自动被包装成一个 `Promise`。
  * **`await`**：只能用在 `async` 函数内部。它用于“等待”一个 `Promise` 完成并返回其结果。在 `await` 表达式之后，代码会暂停执行（但不会阻塞整个线程），直到 `Promise` 被解决（`fulfilled` 或 `rejected`）。

### 代码写法对比

#### 使用 `Promise`（`.then` 链式调用）

```js
function getUser(userId) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id: userId, name: 'John' }), 1000);
  });
}

function getOrders(username) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(['order1', 'order2']), 1000);
  });
}

// 使用 .then 链式调用
getUser(123)
  .then(user => {
    console.log('User:', user);
    return getOrders(user.name); // 返回一个新的 Promise
  })
  .then(orders => {
    console.log('Orders:', orders);
  })
  .catch(error => {
    console.error('Error:', error);
  });
```

**特点**：
* 通过链式调用将多个异步操作连接起来。
* 每个 `.then` 返回一个新的 `Promise`，使得链式调用成为可能。
* 错误通过一个 `.catch` 统一处理。

#### 使用 `async/await`

```js
// 使用 async/await
async function fetchUserAndOrders() {
  try {
    const user = await getUser(123)
    console.log('User:', user)

    const orders = await getOrders(user.name)
    console.log('Orders:', orders)
  } catch (error) {
    console.error('Error:', error)
  }
}

fetchUserAndOrders()
```

**特点**：
* 代码是“纵向”发展的，看起来非常像同步代码，可读性更高。
* `await` 会“暂停”函数的执行，直到 `getUser(123)` 这个 `Promise` 完成，然后将结果赋给 `user` 变量。
* 使用标准的 `try...catch` 块来进行错误处理，这对有其他编程语言背景的开发者更友好。

### 主要区别总结

| 特性 | Promise | async / await |
| :--- | :--- | :--- |
| **代码风格** | 链式调用（`.then`），横向发展，回调风格 | 同步写法，纵向发展，更清晰简洁 |
| **可读性** | 在处理复杂异步流程时，链式调用可能变得冗长和难以阅读（回调地狱的改良版） | **极高**。逻辑流程一目了然，尤其是在有条件的异步操作或循环中 |
| **错误处理** | 使用 `.catch()` 方法，可以链式捕获错误 | 使用标准的 `try...catch` 语句，能捕获同步和异步错误 |
| **调试** | 由于是链式调用，`.then` 块中的错误堆栈可能不直观 | 调试体验更好，因为代码就像同步代码一样，可以逐行执行 |
| **变量作用域** | 每个 `.then` 块都有自己的作用域，需要传递数据 | 整个 `async` 函数是一个作用域，前面 `await` 的结果可以直接在后面使用 |

### 优势和劣势

#### `Promise` 的优势

* 是异步编程的基石，所有现代异步`API`（如 `fetch`）都基于它。
* 可以处理一些 `async/await` 不擅长的场景，例如 `Promise.all`、`Promise.race` 等并行操作。

#### `async/await` 的优势

* **彻底解决了“回调地狱”问题**，代码直观易懂。
* **错误处理机制更强大、统一**（`try/catch`）。
* **调试体验**远胜于 `Promise` 链。

#### `async/await` 的潜在陷阱

1. **`await` 会阻塞，但仅限于当前 `async` 函数内部**。如果多个异步操作没有依赖关系，使用 `await` 会让它们串行执行，降低效率。

  ```js
  // 低效：串行执行，总共需要2秒
  const user = await getUser()
  const orders = await getOrders()

  // 高效：并行执行，总共只需要1秒
  const [user, orders] = await Promise.all([getUser(), getOrders()])
  ```

2. **忘记 `await`**：在需要等待结果的地方忘记写 `await`，会导致得到的是一个 `Promise` 对象而不是实际值，这是常见的错误来源。
3. **错误容易被忽略**：如果不使用 `try...catch` 包裹 `await`，`Promise` 的拒绝（`rejection`）将不会被处理，可能导致难以追踪的 `bug`。

### 结论

<br/>

**`async/await` 是比 `Promise` 更高级的语法，它的出现是为了让开发者更舒服、更高效地编写异步代码。**

它们的关系可以类比为：
* **Promise** 是机器语言（提供基础能力）。
* **async/await** 是高级编程语言（基于基础能力，提供更友好的语法）。

在实际开发中，你应该：
* **优先使用 `async/await`** 来编写主要的异步逻辑，因为它更清晰、更易维护。
* 同时，**必须深入理解 `Promise`**，因为 `async/await` 是基于它的，而且在处理并行异步任务（`Promise.all`）等场景时，仍然需要直接使用 `Promise`。

## [Object.create()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create)

`Object.create()` 静态方法以一个现有对象作为原型，创建一个新对象。

### 语法

```js
Object.create(proto)
Object.create(proto, propertiesObject)
```

### 参数

- `proto`<br/>
  新创建对象的原型对象。
- `propertiesObject` <Tag :bordered="false" color="cyan">可选</Tag><br/>
  如果该参数被指定且不为 `undefined`，则该传入对象可枚举的自有属性将为新创建的对象添加具有对应属性名称的属性描述符。这些属性对应于 `Object.defineProperties()` 的第二个参数。

### 返回值

<br/>

根据指定的原型对象和属性创建的新对象。

### 异常

> TypeError

如果 `proto` 既不是 `null`，也不是 `Object`，则抛出此错误。

### 示例

用 `Object.create()` 实现类式继承
下面的例子演示了如何使用 `Object.create()` 来实现类式继承。这是一个所有版本 `JavaScript` 都支持的单继承。

```js
// Shape——父类
function Shape() {
  this.x = 0
  this.y = 0
}

// 父类方法
Shape.prototype.move = function (x, y) {
  this.x += x
  this.y += y
  console.info("Shape moved.")
}

// Rectangle——子类
function Rectangle() {
  Shape.call(this) // 调用父类构造函数。
}

// 子类继承父类
Rectangle.prototype = Object.create(Shape.prototype, {
  // 如果不将 Rectangle.prototype.constructor 设置为 Rectangle，
  // 它将采用 Shape（父类）的 prototype.constructor。
  // 为避免这种情况，我们将 prototype.constructor 设置为 Rectangle（子类）。
  constructor: {
    value: Rectangle,
    enumerable: false,
    writable: true,
    configurable: true,
  },
})

const rect = new Rectangle()

console.log("rect 是 Rectangle 类的实例吗？", rect instanceof Rectangle) // true
console.log("rect 是 Shape 类的实例吗？", rect instanceof Shape) // true
rect.move(1, 1) // 打印 'Shape moved.'
```

> 需要注意的是，使用 `create()` 也有一些要注意的地方，比如重新添加 `constructor` 属性以确保正确的语义。虽然 `Object.create()` 被认为比使用 `Object.setPrototypeOf()` 修改原型更具有性能优势，但如果没有创建实例并且属性访问还没有被优化，它们之间的差异实际上是可以忽略不计的。在现代代码中，无论如何都应该优先使用类语法。
