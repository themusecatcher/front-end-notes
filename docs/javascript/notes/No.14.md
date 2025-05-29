# Note 14

<BackTop />

## [`arguments` 对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/arguments) 和 [剩余参数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/rest_parameters) `...args`

### `arguments` 是一个对应于传递给函数的参数的类数组对象。

::: tip 备注
如果你编写兼容 `ES6` 的代码，那么优先推荐使用 剩余参数 (`...args`) 语法
:::

`arguments` 对象是**所有（非箭头）函数中**都可用的局部变量。你可以使用 `arguments` 对象在函数中引用函数的参数。此对象包含传递给函数的每个参数，第一个参数在索引 `0` 处。例如，如果一个函数传递了三个参数，你可以以如下方式引用他们：

```js
arguments[0]
arguments[1]
arguments[2]
```

通过索引赋值，参数也可以被设置：

```js
arguments[1] = 'new value'
```

`arguments` 对象不是一个 `Array`。它类似于 `Array`，但除了 `length` 属性和索引元素之外没有任何 `Array` 属性。例如，它没有 `pop` 方法。但是它可以被转换为一个真正的 `Array`：

```js
// 将 arguments 对象转换为真正的 Array
var args = Array.prototype.slice.call(arguments)
// 或
var args = [].slice.call(arguments);

// ES2015
const args = Array.from(arguments)
// 或
const args = [...arguments] // 扩展运算符
```

### 剩余参数 `...args`

<br/>

剩余参数语法允许我们将一个不定数量的参数表示为一个数组。

- 语法

  ```js
  function(a, b, ...args) {
    // ...
  }
  ```

  如果函数的最后一个命名参数以 `...` 为前缀，则它将成为一个由剩余参数组成的真数组，其中从 `0`（包括）到 `theArgs.length`（排除）的元素由传递给函数的实际参数提供。

  在上面的例子中，`args` 将收集该函数的第三个参数（因为第一个参数被映射到 `a`，而第二个参数映射到 `b`）和所有后续参数。

### 剩余参数 `...args` 和 `arguments` 对象的区别

- 剩余参数只包含那些没有对应形参的实参，而 `arguments` 对象包含了传给函数的所有实参。
- `arguments` 对象不是一个真正的数组，而剩余参数是真正的 `Array` 实例，也就是说你能够在它上面直接使用所有的数组方法，比如 `sort`，`map`，`forEach` 或 `pop`。
- `arguments` 对象还有一些附加的属性（如 `callee` 属性）。

## 闭包（Closure）

闭包（Closure）是 `JavaScript` 中的一个核心概念，它指的是 **函数与其词法作用域（lexical environment）的组合**，使得函数能够访问并记住其定义时所处的上下文中的变量，即使该函数在其原始作用域之外被调用。

### 闭包的定义

<br/>

闭包由以下要素构成：

1. **函数嵌套**：一个函数（内部函数）定义在另一个函数（外部函数）内部。
2. **变量引用**：内部函数引用了外部函数作用域中的变量。
3. **外部函数执行完毕**：外部函数已经完成执行并退出，但其作用域中的变量仍被内部函数保留引用。
4. **持续访问能力**：内部函数在外部函数之外被调用时，仍然可以访问外部函数的变量。

### 示例代码

```js
function outer() {
  let count = 0 // 外部函数的变量
  function inner() {
    count++ // 内部函数引用外部变量
    console.log(count)
  }
  return inner // 返回内部函数，形成闭包
}

const increment = outer() // outer 执行完毕，但 count 被闭包保留
increment() // 输出 1
increment() // 输出 2
```

### 闭包的关键特性

1. **词法作用域的保留**  
  闭包保存的是函数定义时的词法环境，而非变量当前的值。即使外部变量后续被修改，闭包仍能访问其最新的值。

2. **变量的持久化**  
  外部函数的变量不会被垃圾回收机制销毁，因为内部函数仍持有对它们的引用。

3. **封装与私有性**  
  闭包可以创建私有变量，避免全局污染：

  ```js
  function createCounter() {
    let count = 0 // 私有变量
    return {
      increment: () => count++,
      getCount: () => count
    }
  }
  const counter = createCounter()
  counter.increment()
  console.log(counter.getCount()) // 1
  ```

### 闭包的应用场景

| 场景 | 说明 |
|--|--|
| **模块化开发** | 通过闭包封装私有变量和公共接口（如 `IIFE` 模块模式）。|
| **函数工厂** | 生成带有预设参数的函数（如事件处理器、配置函数）。|
| **异步编程** | 在回调函数中保留外部变量（如 `setTimeout`、`Promise`）。|
| **延迟执行** | 保存变量状态，供后续操作使用（如防抖、节流函数）。|
| **缓存机制** | 缓存计算结果，避免重复计算（如记忆化函数）。|

### 注意事项

1. **内存泄漏风险**  
  过度使用闭包可能导致变量无法释放，需及时解除不必要的引用（如手动置空变量）。

2. **性能影响**  
  闭包会增加作用域链的长度，变量查找时间可能略微增加，但现代引擎优化良好，通常影响可忽略。

### 闭包的底层原理

- **作用域链（Scope Chain）**：函数在创建时生成作用域链，保存了对父级作用域的引用。
- **执行上下文（Execution Context）**：函数执行时，通过作用域链查找变量。
- **垃圾回收机制**：未被引用的变量会被回收，但闭包中的变量因被引用而保留。

### 总结

<br/>

闭包的核心是 **函数与词法环境的绑定**，它使得函数能够跨越作用域访问数据。理解闭包的关键在于：

- **词法作用域的持久性**：闭包保存的是定义时的作用域，而非执行时的环境。
- **内存管理**：合理使用闭包，避免无意义的变量引用。

闭包是 `JavaScript` 实现高阶函数、模块化等特性的基础，深入掌握其原理能显著提升代码设计能力。

## this 的指向问题

| 调用方式 | 示例 | 函数中的 `this` 指向 |
|--|--|--|
| 通过 `new` 调用 | `new Method()` | `new` 出来的实例，即新对象 |
| 直接调用 | `method()` | 全局对象（浏览器里是 `window`，`node` 里是 `global`） |
| 通过对象调用 | `obj.method()` | 前面的对象 |
| 通过 `apply`、`call`、`bind` 调用 | `method.call(context)` | 第一个参数，即 `context` |

因此，函数中的 `this` 指向取决于函数是如何调用的；即创建执行上下文时（执行时创建的），就确定了此次函数调用，它的 `this` 指向
如果 `this` 不在函数里面时，当在浏览器环境中指向全局对象 `window`，在 `node` 环境中指向空对象  `{}`。

### 箭头函数中的 this

<br/>

箭头函数没有 `this` ➡️ 基于闭包获取 `this` ➡️ 闭包基于词法作用域 ➡️ 词法作用域是编译时确定的，因此不需要等运行时确定

闭包属于词法作用域，而词法作用域是在编译时态确定的，所以箭头函数的 `this` 在编译时态就确定了，因此箭头函数的 `this` 取决于定义的位置而不是运行的位置，因为它是基于闭包的，而闭包是基于词法作用域的。

```js
// 手写 myBind
// 第一种 形参只有 context 的情况
Function.prototype.myBind = function (context) {
  const fn = this
  let args = [...arguments] // arguments：对应于传递给函数的参数的类数组对象
  args = args.slice(1) // 截取除第一个参数 context 外的其余参数
  return function () {
    return fn.call(context, ...args)
  }
}
// 第二种 形参有 context 和剩余参数的情况
Function.prototype.myBind = function (context, ...args) {
  const fn = this
  return function () {
    return fn.call(context, ...args)
  }
}
```

在 `JavaScript` 中，`this` 的指向取决于函数的调用方式，不同类型函数的行为有所不同。以下是构造函数、普通函数和箭头函数中 `this` 指向的详细解析：

### **一、普通函数中的 `this`**

1. **默认绑定**  
  - **非严格模式**：`this` 指向全局对象（浏览器中为 `window`，Node.js 中为 `global`）。  

    ```js
    function showThis() {
      console.log(this) // window（非严格模式）
    }
    showThis()
    ```

  - **严格模式**：`this` 为 `undefined`。

    ```js
    "use strict"
    function showThis() {
      console.log(this) // undefined
    }
    showThis()
    ```

2. **隐式绑定**  
  - **对象方法调用**：`this` 指向调用该方法的对象。

    ```js
    const obj = {
      name: 'obj',
      log() {
        console.log(this.name) // "obj"
      }
    }
    obj.log()
    ```

3. **显式绑定**  
  - 通过 `call()`、`apply()` 或 `bind()` 强制指定 `this`。

    ```js
    function greet() {
      console.log(`Hello, ${this.name}`)
    }
    const user = { name: "Alice" }
    greet.call(user) // Hello, Alice
    ```

### **二、构造函数中的 `this`**

- **`new` 调用构造函数**：`this` 指向新创建的实例对象。  

  ```js
  function Person(name) {
    this.name = name
    console.log(this) // Person { name: 'Alice' }
  }
  const person = new Person("Alice")
  ```

- **返回值影响**：  
  - 若构造函数返回非对象值，则 `this` 仍指向实例。  
  - 若返回对象，则该对象替代 `this` 成为实例。  

    ```js
    function Person() {
      this.name = 'Alice'
      return { name: 'Bob' } // 覆盖 this
    }
    const person = new Person()
    console.log(person.name) // "Bob"
    ```

### **三、箭头函数中的 `this`**
1. **词法绑定**  
   - **继承外层作用域的 `this`**：箭头函数的 `this` 在定义时确定，不可更改。

    ```js
    const obj = {
      name: 'obj',
      log: () => {
        console.log(this.name) // window.name（非严格模式）
      }
    }
    obj.log()
    ```

2. **无法通过 `call()`/`apply()`/`bind()` 修改**

   ```js
   const arrow = () => console.log(this)
   arrow.call({ name: "Alice" }) // this 仍为外层 this
   ```

3. **适用场景**  
  - **回调函数**：避免 `this` 丢失。

    ```js
    button.addEventListener("click", () => {
      console.log(this) // 外层 this（如组件实例）
    })
    ```

  - **类方法绑定**：自动绑定实例。

    ```js
    class Counter {
      count = 0
      increment = () => {
        this.count++ // this 始终指向实例
      }
    }
    ```

### **四、对比总结**
| **函数类型** | **`this` 指向** | **能否修改 `this`** | **适用场景** |
|--|--|--|--|
| **普通函数** | 由调用方式决定（动态绑定）| ✅ `call`/`apply`/`bind` | 对象方法、通用函数 |
| **构造函数** | 新创建的实例（`new` 调用时）| ❌（除非返回对象）| 创建对象实例 |
| **箭头函数** | 定义时的外层作用域 `this`（静态）| ❌ | 回调、需要固定 `this` 的场景 |

### **五、常见问题示例**

1. **回调函数中的 `this` 丢失**  

  ```js
  const obj = {
    data: 'Hello',
    init() {
      // 错误：普通函数导致 this 丢失
      setTimeout(function() {
        console.log(this.data) // undefined
      }, 100)

      // 正确：箭头函数保留外层 this
      setTimeout(() => {
        console.log(this.data) // "Hello"
      }, 100)
    }
  }
  obj.init()
  ```

2. **类方法中的 `this` 绑定**

  ```js
  class Timer {
    constructor() {
      this.seconds = 0
      // 正确：箭头函数自动绑定实例
      setInterval(() => {
        this.seconds++
      }, 1000)
    }
  }
  ```

### **总结**

- **普通函数**：`this` 动态变化，依赖调用方式。
- **构造函数**：`this` 指向实例，需通过 `new` 调用。
- **箭头函数**：`this` 静态继承，适合需要固定上下文的场景。

合理选择函数类型，可避免 `this` 指向错误，提升代码可维护性。
