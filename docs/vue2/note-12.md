# Note 12

## [HTMLElement.dataset](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/dataset)

`HTMLElement` 接口的只读属性 `dataset` 提供了对元素上自定义数据属性（`data-*`）读/写访问。它暴露了一个字符串映射（`DOMStringMap`），其中包含每个` data-*` 属性条目。

::: tip 备注：
`dataset` 属性本身可以被读取，但是不能直接写入。相反，所有写入都必须是写入 `dataset` 的单个属性，而 `dataset` 又表示这些数据的属性。
:::

## [isNaN()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/isNaN)

`isNaN()` 函数用来确定一个值是否为 `NaN` 。注：isNaN函数内包含一些非常有趣的规则；你也可以使用 `ECMAScript 2015` 中定义的 `Number.isNaN()` 来判断

- 语法: `isNaN(value)`
- 参数: `value` 要被检测的值
- 返回值: 如果给定值为 `NaN` 则返回值为 `true`；否则为 `false`

::: tip 描述
- **isNaN** 函数的必要性
  
  **与 JavaScript 中其他的值不同，NaN不能通过相等操作符（== 和 ===）来判断，因为 NaN == NaN 和 NaN === NaN 都会返回 false**。因此，isNaN 就很有必要了。

- **NaN** 值的产生
  
  当算术运算返回一个未定义的或无法表示的值时，NaN就产生了。但是，NaN并不一定用于表示某些值超出表示范围的情况。**将某些不能强制转换为数值的非数值转换为数值的时候，也会得到NaN**。

  例如，**0 除以 0 会返回 NaN —— 但是其他数除以 0 则不会返回NaN**。

- 令人费解的怪异行为
  
  **如果isNaN函数的参数不是Number类型， isNaN函数会首先尝试将这个参数转换为数值，然后才会对转换后的结果是否是NaN进行判断**。因此，对于能被强制转换为有效的非 NaN 数值来说（**空字符串和布尔值分别会被强制转换为数值 0 和 1**），返回**false**值也许会让人感觉莫名其妙。比如说，空字符串就明显“不是数值（not a number）”。这种怪异行为起源于："不是数值（not a number）"在基于 IEEE-754 数值的浮点计算体制中代表了一种特定的含义。isNaN函数其实等同于回答了这样一个问题：被测试的值在被强制转换成数值时会不会返回 IEEE-754 中所谓的“不是数值（not a number）”。

  **下一个版本的 ECMAScript (ES2015) 包含 Number.isNaN() 函数。通过 Number.isNaN(x) 来检测变量 x 是否是一个 NaN 将会是一种可靠的做法。然而，在缺少 Number.isNaN 函数的情况下，通过表达式(x != x) 来检测变量 x 是否是 NaN` 会更加可靠。**
:::

### 一个 `isNaN` 的 `polyfill` 可以理解为（这个 `polyfill` 利用了 `NaN` 自身永不相等于自身这一特征）:

```js
var isNaN = function (value) {
  var n = Number(value)
  return n !== n
}
```

## [Number.isNaN()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN)

`Number.isNaN()` 方法确定传递的值是否为 `NaN`，并且检查其类型是否为 `Number`。它是原来的全局 `isNaN()` 的**更稳妥的版本**。

- 语法: `Number.isNaN(value)`
- 参数: `value` 要检测是否为 `NaN` 的值
- 返回值: 一个布尔值，表示给定的值是否是 `NaN`

::: tip 描述
**在 JavaScript 中，NaN 最特殊的地方就是，我们不能使用相等运算符（== (en-US) 和 === (en-US)）来判断一个值是否是 NaN，因为 NaN == NaN 和 NaN === NaN 都会返回 false**。因此，必须要有一个判断值是否是 NaN 的方法。

和全局函数 `isNaN()` 相比，`Number.isNaN()` **不会自行将参数转换成数字，只有在参数是值为 NaN 的数字时，才会返回 true**。
:::

### Polyfill

```js
Number.isNaN =
  Number.isNaN ||
  function (value) {
    return typeof value === "number" && isNaN(value)
  }
```

## [Number.isFinite()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/isFinite)

`Number.isFinite()` 方法用来**检测传入的参数是否是一个有穷数**。

- 语法: `Number.isFinite(value)`
- 参数: `value` 要被检测有穷性的值。
- 返回值: 一个 `布尔值` 表示给定的值是否是一个有穷数。

::: tip 描述
和全局的 `isFinite()` 函数相比，这个方法**不会强制将一个非数值的参数转换成数值**，这就意味着，**只有数值类型的值，且是有穷的（finite），才返回 true**。
:::

### Polyfill

```js
if (Number.isFinite === undefined) {
  Number.isFinite = function (value) {
    return typeof value === 'number' && isFinite(value)
  }
}
```

## 检测 `null` 或 `undefined`

### 检测是否为 [`null`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/null)

::: warning 注意
当检测 `null` 或 `undefined` 时，注意相等（`==`）与全等（`===`）两个操作符的区别 (en-US) ，**前者会执行类型转换**

```js{5}
typeof null // "object" (因为一些以前的原因而不是'null')
typeof undefined // "undefined"
null === undefined // false
null == undefined // true
null === null // true 通常使用 value === null 来检测 value 是否为 null
null == null // true
!null //true
isNaN(1 + null) // false
isNaN(1 + undefined) // true
```

:::

### 检测是否为 [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)

- 严格相等(`===`)和 `undefined`

你可以使用 `undefined` 和严格相等或不相等操作符来决定一个变量是否拥有值。在下面的代码中，变量 `x` 是未定义的，`if` 语句的求值结果将是 `true`

```js{2}
var x
if (x === undefined) {
  // 执行这些语句
} else {
  // 这些语句不会被执行
}
```

- `typeof` 操作符和 `undefined`

或者，可以使用`typeof`

```js{2}
var x
if (typeof x === 'undefined') {
  // 执行这些语句
}
```

使用 `typeof` 的原因是**它不会在一个变量没有被声明的时候抛出一个错误**

```js{2,6}
// 这里没有声明 y
if (typeof y === 'undefined') {
  // 没有错误，执行结果为 true
  console.log('y is' + typeof y) // y is undefined
}
if (y === undefined) {
  // ReferenceError: y is not defined
}
```

::: tip
技术方面看来这样的使用方法应该被避免。JavaScript 是一个静态作用域语言，所以，一个变量是否被声明可以通过看它是否在一个封闭的上下文中被声明。唯一的例外是全局作用域，但是全局作用域是被绑定在全局对象上的，所以**要检查一个变量是否在全局上下文中存在可以通过检查全局对象上是否存在这个属性（比如使用in操作符）**
:::

```js{1}
if ('x' in window) {
  // 只有 x 被全局性的定义 才会执行这些语句
}
```

- `Void` 操作符和 `undefined`

`void` 操作符是第三种可以替代的方法

```js{2,6}
var x
if (x === void 0) {
  // 执行这些语句
}
// 没有声明 y
if (y === void 0) {
  // 抛出一个 RenferenceError 错误 (与`typeof`相比)
}
```
