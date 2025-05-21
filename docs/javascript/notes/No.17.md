# Note 17

<BackTop />

## 为什么 `js` 中 `0.1 + 0.2 !== 0.3`？

在 `JavaScript` 中，`0.1 + 0.2 !== 0.3` 的根本原因是计算机使用 **二进制浮点数表示法**（遵循 IEEE 754 标准）导致的精度丢失问题。以下是详细的解释：

### 一、浮点数的二进制表示

计算机用二进制存储数字，而许多十进制小数无法精确转换为二进制。例如：

- **0.1（十进制）** 转换为二进制是 `0.00011001100110011...`（无限循环）。
- **0.2（十进制）** 转换为二进制是 `0.0011001100110011...`（无限循环）。

这些无限循环的二进制小数在存储时会被 **截断** 或 **舍入**，导致精度丢失。

### 二、IEEE 754 双精度浮点数

`JavaScript` 使用 **64位双精度浮点数**（Double-precision floating-point）存储数值，其结构为：

- **1位符号位**：表示正负。
- **11位指数位**：决定数值的范围。
- **52位尾数位**：存储有效数字（二进制小数部分）。

由于尾数位有限（52位），当十进制小数转换为二进制后长度超过 `52` 位时，会 **舍入到最近的近似值**，从而引发精度误差。

### 三、0.1 + 0.2 的计算过程

1. **存储近似值**：
   - `0.1` 的二进制近似值在计算机中存储为 `0.10000000000000000555...`。
   - `0.2` 的二进制近似值存储为 `0.20000000000000001110...`。
2. **加法运算**：
   - 二进制加法后的结果约为 `0.30000000000000004440...`。
3. **十进制转换**：
   - 最终的十进制结果近似为 `0.30000000000000004`，因此 `0.1 + 0.2 !== 0.3`。

### 四、验证与解决方案

#### 1. 验证精度问题

```js
console.log(0.1 + 0.2) // 0.30000000000000004
console.log(0.1 + 0.2 === 0.3) // false
```

#### 2. 解决方案

- **方法一：容忍微小误差**
  使用一个极小的误差范围（如 `Number.EPSILON`）比较结果：

  ```js
  function isEqual(a, b) {
    return Math.abs(a - b) < Number.EPSILON
  }
  console.log(isEqual(0.1 + 0.2, 0.3)) // true
  ```

- **方法二：转为整数运算**
  将小数转换为整数计算后再还原：

  ```js
  const result = (0.1 * 10 + 0.2 * 10) / 10 // 0.3
  console.log(result === 0.3) // true
  ```

- **方法三：使用 `toFixed`（需谨慎）**
  截断小数位数（注意 `toFixed` 可能四舍五入）：

  ```js
  const sum = (0.1 + 0.2).toFixed(1) // "0.3"
  console.log(parseFloat(sum) === 0.3) // true
  ```

- **方法四：使用高精度库**  
  如 `decimal.js` 或 `big.js` 处理精确计算：

  ```js
  import { Decimal } from "decimal.js"
  const sum = new Decimal(0.1).add(0.2).toNumber()
  console.log(sum === 0.3) // true
  ```

### 五、这不是 JavaScript 的“缺陷”！

- **所有遵循 IEEE 754 的语言都有此问题**（如 Python、Java、C++）。
- **这是二进制浮点数的固有特性**，与语言无关。
- **整数计算不会出现此问题**（例如 `0.5 + 0.5 === 1`，因为 `0.5` 是二进制有限小数）。

### 总结

`0.1 + 0.2 !== 0.3` 的原因是：

1. 十进制小数转换为二进制时丢失精度。
2. 浮点数的存储和计算基于近似值。
3. 误差在运算过程中被放大。

理解这一机制后，可以通过数学方法或第三方库规避精度问题。

## 定义类的私有属性

在 `JavaScript` 中，定义类的私有属性可以通过以下几种方式实现：

### 1. **使用 `#` 语法（ES2022+ 官方私有字段）**

<br/>

**实现方式**：
在类中通过 `#` 前缀声明属性，该属性仅在类的内部可访问。 

```js
class MyClass {
  #privateProp = 'secret' // 私有属性
  getPrivate() {
    return this.#privateProp // 内部可访问
  }
}

const instance = new MyClass()
console.log(instance.getPrivate()) // 'secret'
console.log(instance.#privateProp) // 语法错误：外部无法访问
```

**特点**：

- 语言原生支持，严格意义上的私有属性。  
- 外部访问会直接报错（语法错误）。  
- 子类也无法访问父类的私有属性。  
- 需要较新的运行环境支持（如 Node.js 12+、现代浏览器）。

---

### 2. **闭包 + 特权方法**

<br/>

**实现方式**：

在构造函数中通过局部变量保存私有属性，并通过闭包暴露访问方法。

```js
class MyClass {
  constructor() {
    let privateProp = 'secret' // 局部变量
    this.getPrivate = () => privateProp // 特权方法
  }
}

const instance = new MyClass()
console.log(instance.getPrivate()) // 'secret'
console.log(instance.privateProp) // undefined（无法直接访问）
```

**特点**：

- 兼容性好（支持所有 ES6 环境）。  
- 每个实例会创建独立的方法，可能占用更多内存。  
- 私有属性通过闭包隐藏，外部无法直接访问。

### 3. **WeakMap 存储私有属性**

<br/>

**实现方式**：

使用 `WeakMap` 以实例为键存储私有属性，避免内存泄漏。

```js
const _privateProps = new WeakMap()

class MyClass {
  constructor() {
    _privateProps.set(this, { privateProp: 'secret' })
  }

  getPrivate() {
    return _privateProps.get(this).privateProp
  }
}

const instance = new MyClass()
console.log(instance.getPrivate()) // 'secret'
console.log(instance.privateProp) // undefined
```

**特点**：

- 私有属性完全隐藏，外部无法通过实例或反射获取。  
- 需要维护额外的 `WeakMap`，代码稍显繁琐。  
- 适合需要多个私有属性的场景（可存储为对象）。

### 4. **Symbol 作为属性键**

<br/>

**实现方式**：

用 `Symbol` 作为属性名，外部无法直接获取 `Symbol` 引用。  

```js
// 在模块或闭包中定义 Symbol（确保外部无法访问）
const _privateProp = Symbol('privateProp')

class MyClass {
  constructor() {
    this[_privateProp] = 'secret'
  }

  getPrivate() {
    return this[_privateProp]
  }
}

const instance = new MyClass()
console.log(instance.getPrivate()) // 'secret'
console.log(instance[_privateProp]) // 需要 _privateProp 才能访问
```

**说明**

- `Symbol` 的唯一性：每个 `Symbol('name')` 都是唯一的，只要不将 `_name` 暴露给外部，外部无法直接通过属性名访问。
- 模块化封装：如果将上述代码放在模块中，且不导出 `_name`，则外部无法获取该 `Symbol`。
- 反射方法的局限：通过 `Object.getOwnPropertySymbols(person)` 可以获取对象的所有 `Symbol` 属性，但需要主动遍历才能找到对应属性，增加了访问成本。

**特点**：

- 外部需持有 `Symbol` 才能访问，否则无法直接读取。  
- 通过 `Object.getOwnPropertySymbols()` 仍可获取属性键，并非严格私有。  
- 适合模块内私有（不导出 `Symbol` 时）。

### 5. **命名约定（如 `_` 前缀）**

<br/>

**实现方式**：

通过代码规范（如 `_privateProp`）约定私有属性，但不强制限制访问。

```js
class MyClass {
  constructor() {
    this._privateProp = 'secret'
  }

  getPrivate() {
    return this._privateProp
  }
}

const instance = new MyClass()
console.log(instance.getPrivate()) // 'secret'
console.log(instance._privateProp) // 'secret'（外部仍可访问）
```

**特点**：

- 仅通过命名约定提示开发者“不要直接访问”。
- 无强制保护，属性实际是公开的。
- 兼容性最好，但依赖团队规范。

### **总结对比**

| 方法 | 严格私有性 | 内存效率 | 兼容性 | 代码简洁性 |
|--|--|--|--|--|
| `#` 语法 | ✅ | ✅ | 需现代环境 | ✅ |
| 闭包 + 特权方法 | ✅ | ❌ | 所有 ES6+ | ❌ |
| WeakMap | ✅ | ✅ | 所有 ES6+ | ❌ |
| Symbol | ❌ | ✅ | 所有 ES6+ | ✅ |
| 命名约定 | ❌ | ✅ | 所有环境 | ✅ |

**推荐选择**：

- **现代项目**：优先使用 `#` 语法（ES2022+）。  
- **兼容旧环境**：选择 **WeakMap** 或 **闭包**。  
- 避免依赖 **Symbol** 或 **命名约定** 实现严格私有。
