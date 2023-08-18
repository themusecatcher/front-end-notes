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

## [Element.classList](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/classList)

`Element.classList` 是一个只读属性，返回一个元素 `class` 属性的动态 `DOMTokenList` 集合。这可以用于操作 `class` 集合。

相比将 `element.className` 作为`以空格分隔的字符串`来使用，`classList` 是一种更方便的访问元素的类列表的方法。

### 值

一个 [`DOMTokenList`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMTokenList)，表示元素的 `class` 属性的集合。如果 `class` 属性没有设置或者为空，它将返回一个空的 `DOMTokenList`，即 `length` 属性等于 `0` 的 `DOMTokenList`。

尽管 `classList` 属性自身是只读的，但是你可以使用 `add()`、`remove()`、`replace()` 和 `toggle()` 方法修改其关联的 `DOMTokenList`。

### 示例

```js{2,5,8,9,12,15,18,20,23,24,27-29,32}
const div = document.createElement('div')
div.className = 'foo'

// 初始状态：<div class='foo'></div>
console.log(div.outerHTML)

// 使用 classList API 移除、添加类值
div.classList.remove('foo')
div.classList.add('anotherclass')

// <div class='anotherclass'></div>
console.log(div.outerHTML)

// 如果 visible 类值已存在，则移除它，否则添加它
div.classList.toggle('visible')

// add/remove visible, depending on test conditional, i less than 10
div.classList.toggle('visible', i < 10)

console.log(div.classList.contains('foo'))

// 添加或移除多个类值
div.classList.add('foo', 'bar', 'baz')
div.classList.remove('foo', 'bar', 'baz')

// 使用展开语法添加或移除多个类值
const cls = ['foo', 'bar']
div.classList.add(...cls)
div.classList.remove(...cls)

// 将类值 'foo' 替换成 'bar'
div.classList.replace('foo', 'bar')
```

## [document.images](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/images)

`Document` 接口的只读属性 `images` 返回当前文档中所有 `image` 元素的集合。

- 语法: `var imageCollection = document.images`
- 值:
  一个 `HTMLCollection`，提供了包含在该文档中的所有 `images` 元素实时的列表。**集合中的每条代表了一个单 image 元素的 HTMLImageElement**

::: tip 备注
你可以在返回的结果中使用 JavaScript 数组符号 ('**[]**'，译注)，或者 **item()** 方法去获取集合中的每个元素。下面方法是等价的：

```js{1,3}
firstImage = imageCollection.item(0)
// 等价于
firstImage = imageCollection[0]

```

:::

### 示例

该例是一次通过遍历图片列表找到名称为"`banner.gif`"的图片。

```js
var ilist = document.images;
for (var i = 0; i < ilist.length; i++) {
  if (ilist[i].src == 'banner.gif') {
    // 发现了 banner 图片
  }
}
```

## [Intl](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl)

`Intl` 对象是 `ECMAScript` 国际化 `API` 的一个命名空间，它**提供了精确的字符串对比、数字格式化，和日期时间格式化**。`Collator`，`NumberFormat` 和 `DateTimeFormat` 对象的构造函数是 `Intl` 对象的属性。本页文档内容包括了这些属性，以及国际化使用的构造器和其他语言的方法等常见的功能。

### 属性

- [`Intl.Collator`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator)
`collators` 的构造函数，用于启用对语言敏感的字符串比较的对象。

- [`Intl.DateTimeFormat`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat)
用于启用语言敏感的日期和时间格式的对象的构造函数。

- [`Intl.ListFormat`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl/ListFormat)
Constructor for objects that enable language-sensitive list formatting.

- [`Intl.NumberFormat`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat)
用于启用语言敏感数字格式的对象的构造函数。

  ```vue
  <p>{{ new Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency: 'CNY',
    currencyDisplay: 'symbol',
    maximumFractionDigits: 2,
    roundingIncrement: 5
  }).format(123456789.173456) }}</p>
  ```

  ```vue
  <p>{{ new Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency: 'CNY',
    currencyDisplay: 'symbol',
    maximumFractionDigits: 2,
    roundingIncrement: 5
  }).format(123456789.123456) }}</p>
  ```

- [`Intl.PluralRules`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules)
用于启用多种敏感格式和多种语言语言规则的对象的构造函数。

- [`Intl.RelativeTimeFormat`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat)
Constructor for objects that enable language-sensitive relative time formatting.

## [linear-gradient()](https://developer.mozilla.org/zh-CN/docs/Web/CSS/gradient/linear-gradient)

`CSS` `linear-gradient()` 函数用于**创建一个表示两种或多种颜色线性渐变的图片**。其结果属于`<gradient>`数据类型，是一种特别的`<image>`数据类型。

```
/* 渐变轴为45度，从蓝色渐变到红色 */
linear-gradient(45deg, blue, red);

/* 从右下到左上、从蓝色渐变到红色 */
linear-gradient(to left top, blue, red);

/* 从下到上，从蓝色开始渐变、到高度 40% 位置是绿色渐变开始、最后以红色结束 */
linear-gradient(0deg, blue, green 40%, red);
```

### 线形渐变的构成

<br/>

线性渐变由一个轴 (梯度线) 定义，其上的每个点具有两种或多种的颜色，且轴上的每个点都具有独立的颜色。为了构建出平滑的渐变，`linear-gradient()` 函数构建一系列垂直于渐变线的着色线，每一条着色线的颜色则取决于与之垂直相交的渐变线上的色点

<br/>

默认情况下，从一个颜色的终止点平滑的过渡到另一个颜色的终止点，颜色之间的中点是两个颜色转换的中点。你可以将中点移动到这两个颜色之间的任意位置，方法是在两个颜色之间添加未标记的 %，以指示颜色的中转位置。下面的示例是从起始点到 10% 的位置标记红色，从 90% 到结束标记蓝色。在 10% 到 90% 之间，颜色从红色过渡到蓝色，然而过渡的中点是在 30% 的标记上，而不是在没有 30% 中转点的情况下会默认为 50%。

```
linear-gradient(red 10%, 30%, blue 90%);
```

### 语法

- `<side-or-corner>`
  **描述渐变线的起始点位置**。它包含 to 和两个关键词：第一个**指出水平位置** `left` or `right`，第二个**指出垂直位置** `top` or `bottom`。关键词的**先后顺序无影响，且都是可选的**。 `to top`, `to bottom`, `to left` 和 `to right` 这些值会被转换成角度 `0 度`、`180 度`、`270 度`和 `90 度`。其余值会被转换为一个以向顶部中央方向为起点顺时针旋转的角度。渐变线的结束点与其起点中心对称。

- `<angle>`
  用角度值指定渐变的方向（或角度）。**向上是 0 度。角度顺时针增加**。

- `<linear-color-stop>`
  由一个`<color>`值组成，并且跟随着一个可选的终点位置（可以是一个百分比值或者是沿着渐变轴的`<length>`）。`CSS` 渐变的颜色渲染采取了与 `SVG` 相同的规则。

- `<color-hint>`
  颜色中转点是一个插值提示，它**定义了在相邻颜色之间渐变如何进行**。长度**定义了在两种颜色之间的哪个点停止渐变颜色应该达到颜色过渡的中点**。如果省略，颜色转换的中点是两个颜色停止之间的中点。

### 示例

- `45 度`渐变

  ```html
  <div style="width: 200px; height: 200px;"></div>
  ```

  ```css
  div {
    background: linear-gradient(45deg, red, blue);
  }
  ```

- 从 `60%` 的梯度线开始的渐变

  ```html
  <div style="width: 200px; height: 200px;"></div>
  ```

  ```css
  div {
    background: linear-gradient(135deg, red, red 60%, blue);
  }
  ```

- 具有多个颜色停止的渐变

  ```html
  <div>A rainbow made from a gradient</div>
  ```

  ```css
  div {
    background: linear-gradient(
      to right,
      red,
      orange,
      yellow,
      green,
      blue,
      indigo,
      violet
    )
  }
  ```
