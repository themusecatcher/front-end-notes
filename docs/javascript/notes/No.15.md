# Note 15

<BackTop />

## 在 `for` 循环中使用 `setTimeout` 延迟输出时，回调函数对循环变量的引用涉及闭包

### **1. 闭包的核心定义**

<br/>

闭包（Closure）是指**函数能够访问并记住其词法作用域外的变量**，即使该函数在其词法作用域外执行。闭包的形成需要满足两个条件：
1. 函数内部嵌套定义另一个函数。
2. 内部函数引用了外部函数的变量。

### **2. `for` 循环中的变量作用域问题**

#### **使用 `var` 声明变量**

```js
for (var i = 0; i < 5; i++) {
  setTimeout(function() {
    console.log(i) // 1000ms 后一次性输出 5 次 5
  }, 1000)
}
```

- **现象**：所有回调函数输出 `5`，而非预期的 `0, 1, 2, 3, 4`。
- **原因**：
  - `var` 没有块级作用域，变量 `i` 的作用域是**整个函数**（或全局）。
  - 回调函数通过闭包捕获的是**同一个变量 `i`**，而循环结束后 `i` 的值已变为 `5`。

#### **使用 `let` 声明变量**

```js
for (let i = 0; i < 5; i++) {
  setTimeout(function() {
    console.log(i) // 1000ms 后一次性输出 0, 1, 2, 3, 4
  }, 1000)
}
```

- **现象**：正确输出 `0` 到 `4`。
- **原因**：
  - `let` 具有块级作用域，每次循环会创建一个**新的 `i` 实例**。
  - 每个回调函数通过闭包捕获的是**各自块级作用域中的 `i`**。

### **3. 闭包的形成分析**

#### **关键点**

- **闭包的存在**：无论使用 `var` 还是 `let`，回调函数都通过闭包引用了外部变量 `i`。
- **差异的本质**：
  - 使用 `var` 时，所有回调函数共享同一个变量 `i`。
  - 使用 `let` 时，每次循环生成独立的块级作用域，每个回调函数绑定不同的 `i`。

#### **闭包的作用**

- 即使 `for` 循环已结束，回调函数仍能访问变量 `i`（通过闭包保留对其引用）。
- 闭包使得变量不会被垃圾回收，直到回调函数执行完毕。

### **4. 解决方案对比**

#### **方案 1：使用 IIFE（立即调用函数表达式）**

```js
for (var i = 0; i < 5; i++) {
  (function(j) {
    setTimeout(function() {
      console.log(j) // 1000ms 后一次性输出 0, 1, 2, 3, 4
    }, 1000)
  })(i)
}
```

- **原理**：通过 `IIFE` 创建新的函数作用域，每次循环将当前 `i` 的值作为参数 `j` 传入，回调函数闭包捕获的是独立的 `j`。

#### **方案 2：利用 `setTimeout` 的第三个参数**

```js
for (var i = 0; i < 5; i++) {
  setTimeout(function(j) {
    console.log(j) // 1000ms 后一次性输出 0, 1, 2, 3, 4
  }, 1000, i)
}
```

- **原理**：`setTimeout` 的**第三个参数会作为回调函数的参数传入**，避免直接依赖闭包中的 `i`。

#### **方案 3：使用 `let` 声明变量（推荐）**

```js
for (let i = 0; i < 5; i++) {
  setTimeout(function() {
    console.log(i) // 1000ms 后一次性输出 0, 1, 2, 3, 4
  }, 1000)
}
```

- **原理**：`let` 的块级作用域自动为每次循环创建独立的 `i`，闭包直接绑定当前作用域的 `i`。

### **5. 总结**

- **闭包的存在**：在 `for` 循环中使用 `setTimeout` 时，回调函数对变量的引用确实形成闭包。
- **作用域差异**：`var` 和 `let` 的作用域规则决定了闭包捕获变量的方式：
  - `var` 导致所有回调共享同一变量。
  - `let` 为每次循环创建独立变量。
- **解决方案**：优先使用 `let` 声明变量，或通过 `IIFE`、参数传递隔离变量作用域。

理解闭包和作用域是解决此类异步问题的关键，也是 `JavaScript` 开发中的核心概念。

## [`<script>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/script) 标签的 `async` `defer` 属性

在 `HTML` 中，`<script>` 标签的 `async` 和 `defer` 属性用于控制脚本的加载和执行行为，优化页面性能和渲染流程。以下是它们的核心区别和应用场景：

### **1. 默认行为（无 `async` 和 `defer`）**

```html
<script src="script.js"></script>
```

- **行为**：
  - **阻塞 HTML 解析**：遇到 `<script>` 标签时，浏览器会**暂停解析 HTML**。
  - **同步加载和执行**：立即下载脚本，执行完成后才继续解析后续内容。
- **缺点**：若脚本较大或网络延迟高，会显著拖慢页面渲染。

### **2. `async` 属性（异步加载）**

```html
<script async src="script.js"></script>
```

- **行为**：
  - **异步加载**：脚本**并行下载**（不阻塞 `HTML` 解析）。
  - **立即执行**：脚本**下载完成后立即执行**，此时会**暂停 `HTML` 解析**。
  - **执行顺序不保证**：多个 `async` 脚本的执行顺序与它们在文档中的顺序无关，取决于下载完成的先后。
- **适用场景**：
  - 独立的第三方脚本（如广告、分析工具）。
  - 脚本之间无依赖关系，且无需等待 `DOM` 就绪。

### **3. `defer` 属性（延迟执行）**

```html
<script defer src="script.js"></script>
```

- **行为**：
  - **异步加载**：脚本**并行下载**（不阻塞 `HTML` 解析）。
  - **延迟执行**：脚本**等到 HTML 解析完成（DOM 就绪）后，按文档顺序依次执行**（在 [`DOMContentLoaded`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/DOMContentLoaded_event) 事件前触发）。
  - **执行顺序保证**：多个 `defer` 脚本严格按文档中的顺序执行。
- **适用场景**：
  - 依赖 `DOM` 的脚本（需等待 `HTML` 解析完成）。
  - 多个脚本有执行顺序依赖（如库文件在前，业务逻辑在后）。

### **对比总结**

| **特性** | **默认行为** | `async` | `defer` |
|--|--|--|--|
| **加载方式** | 同步阻塞 | 异步（不阻塞 `HTML` 解析）| 异步（不阻塞 `HTML` 解析）|
| **执行时机** | 立即执行（阻塞解析）| 下载完成后立即执行（阻塞解析）| `HTML` 解析完成后按顺序执行 |
| **执行顺序** | 按文档顺序 | **不保证顺序** | **严格按文档顺序** |
| **适用场景** | 无特殊需求 | 独立脚本（如统计、广告）| 依赖 `DOM` 或有顺序要求的脚本 |

### **示意图**

- 默认行为：`HTML` 解析 → 遇到 `script` → 阻塞 → 下载并执行 → 恢复解析
- `async`：`HTML` 解析 → 异步下载脚本 → 下载完成 → 阻塞并执行 → 恢复解析
- `defer`：`HTML` 解析 → 异步下载脚本 → `HTML` 解析完成 → 按顺序执行脚本

### **注意事项**

1. **内联脚本无效**：
   - `async` 和 `defer` 仅对**外部脚本**（有 `src` 属性）生效，内联脚本（直接写代码）会被忽略。

2. **模块化脚本（`type="module"`）**：
   - 默认行为类似 `defer`，但可通过 `async` 覆盖（如 `<script type="module" async>`）。

3. **兼容性**：
   - `async` 和 `defer` 在现代浏览器中广泛支持（IE9+ 支持 `defer`，IE10+ 支持 `async`）。

### **实战建议**

- **关键渲染路径脚本**：使用 `async` 或 `defer` 避免阻塞首屏渲染。
- **依赖 DOM 的脚本**：优先用 `defer`，确保 `DOM` 就绪后再执行。
- **无依赖的独立脚本**：用 `async` 尽早执行（如性能监控代码）。
- **避免混用 `async` 和 `defer`**：可能导致不可预测的行为（部分浏览器以 `async` 优先）。

## `js` 继承

在 `JavaScript` 中，继承主要通过 **原型链机制** 实现，以下是常见的几种继承方式及其实现方法：

### **1. 原型链继承（Prototype Chain Inheritance）**

<br/>

**原理**：通过将子类的原型指向父类的实例实现继承。

```js
function Parent() {
  this.name = 'Parent'
}
Parent.prototype.sayName = function() { 
  console.log(this.name)
}

function Child() {}
Child.prototype = new Parent() // 继承

const child = new Child()
child.sayName() // 'Parent'
```

**缺点**：

- 所有子类实例 **共享引用类型属性**（如数组、对象）。
- 无法向父类构造函数传参。

### **2. 构造函数继承（Constructor Inheritance）**

<br/>

**原理**：在子类构造函数中调用父类构造函数（通过 `call` 或 `apply`）。

```js
function Parent(name) {
  this.name = name
  this.colors = ['red', 'blue']
}

function Child(name) {
  Parent.call(this, name) // 继承属性
}

const child1 = new Child('Child1')
child1.colors.push('green')
console.log(child1.colors) // ['red', 'blue', 'green']

const child2 = new Child('Child2')
console.log(child2.colors) // ['red', 'blue']
```

**优点**：

- 解决引用类型共享问题。
- 可向父类传参。

**缺点**：

- **无法继承父类原型上的方法**（子类实例无法访问 `Parent.prototype` 的方法）。

### **3. 组合继承（Combination Inheritance）**

<br/>

**原理**：结合原型链继承和构造函数继承。

```js
function Parent(name) {
  this.name = name
}
Parent.prototype.sayName = function() {
  console.log(this.name)
}

function Child(name) {
  Parent.call(this, name) // 继承属性（第二次调用 Parent）
}
Child.prototype = new Parent() // 继承方法（第一次调用 Parent）
Child.prototype.constructor = Child // 修复构造函数指向

const child = new Child('Child')
child.sayName() // 'Child'
```

**优点**：

- 既能继承属性，又能继承原型方法。
- 可传参，引用类型不共享。

**缺点**：

- **父类构造函数被调用两次**（性能浪费）。

### **4. 原型式继承（Prototypal Inheritance）**

<br/>

**原理**：基于现有对象创建新对象（类似 `Object.create()`）。  

```js
const parent = {
  name: 'Parent',
  sayName() {
    console.log(this.name)
  }
}

const child = Object.create(parent)
child.name = 'Child'
child.sayName() // 'Child'
```

**特点**：

- 适合不需要构造函数的简单对象继承。
- 引用类型属性仍会被共享。

### **5. 寄生式继承（Parasitic Inheritance）**

<br/>

**原理**：在原型式继承基础上增强对象。

```js
function createChild(parent) {
  const clone = Object.create(parent)
  clone.sayHi = function() {
    console.log('Hi')
  }
  return clone
}

const parent = { name: 'Parent' }
const child = createChild(parent)
child.sayHi() // 'Hi'
```

**缺点**：

- 方法无法复用（类似构造函数模式）。

### **6. 寄生组合式继承（Parasitic Combination Inheritance）**

<br/>

**原理**：优化组合继承，避免两次调用父类构造函数（最佳实践）。

```js
function inheritPrototype(Child, Parent) {
  const prototype = Object.create(Parent.prototype) // 创建父类原型的副本
  prototype.constructor = Child // 修复构造函数
  Child.prototype = prototype // 赋值给子类原型
}

function Parent(name) {
  this.name = name
}
Parent.prototype.sayName = function() {
  console.log(this.name)
}

function Child(name) {
  Parent.call(this, name) // 继承属性
}

inheritPrototype(Child, Parent) // 继承方法

const child = new Child('Child')
child.sayName() // 'Child'
```

**优点**：

- 只调用一次父类构造函数。
- 避免不必要的原型属性。
- 保持原型链完整。

### **7. ES6 Class 继承（Syntax Sugar）**

<br/>

**原理**：使用 `class` 和 `extends` 关键字（底层基于寄生组合式继承）。

```js
class Parent {
  constructor(name) {
    this.name = name
  }
  sayName() {
    console.log(this.name)
  }
}

class Child extends Parent {
  constructor(name) {
    super(name) // 调用父类构造函数
  }
}

const child = new Child('Child')
child.sayName() // 'Child'
```

**特点**：

- 语法简洁，推荐使用。
- 支持 `super` 访问父类方法。

### **总结对比**

| **继承方式** | **优点** | **缺点** | **适用场景** |
|--|--|--|--|
| 原型链继承 | 简单 | 引用类型共享，无法传参 | 简单原型链场景 |
| 构造函数继承 | 可传参，解决引用类型共享 | 无法继承原型方法 | 需要隔离实例属性的场景 |
| 组合继承 | 结合两者优点 | 父类构造函数调用两次 | 传统继承需求 |
| 原型式继承 | 简单对象继承 | 引用类型共享 | 无构造函数的对象继承 |
| 寄生式继承 | 增强对象 | 方法无法复用 | 需要扩展对象的场景 |
| **寄生组合式继承** | 高效，最佳实践 | 实现稍复杂 | 大多数复杂继承场景 |
| **ES6 Class 继承** | 语法简洁，易维护 | 需支持 `ES6` | 现代 `JavaScript` 项目 |

### **最佳实践推荐**

1. **现代项目**：优先使用 **ES6 Class 继承**（简洁且底层优化完善）。
2. **兼容性要求**：使用 **寄生组合式继承**（兼容 `ES5` 且高效）。
3. **简单对象扩展**：使用 `Object.create()` 实现原型式继承。

理解 `JavaScript` 的原型链机制是掌握继承的核心，`ES6` 的 `class` 语法虽然简化了代码，但本质上仍是基于原型的继承。
