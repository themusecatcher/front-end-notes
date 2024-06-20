# Note 12

## [String()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String) & [toString()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/toString) 比较

在JavaScript中，`toString()`和`String()`都可以用来将其他类型的值转换为字符串。尽管两者都能达到相似的目的，但它们在用法和场景上有所不同。了解这些差异可以帮助你更好地决定在特定情况下使用哪个方法。

### toString()

1. **方法调用**: `toString()`是一个对象的方法，这意味着你可以调用任何对象的`toString()`方法来获取其字符串表示形式。如果对象没有定义`toString()`方法，或者该方法没有返回字符串，那么会调用对象的`Object.prototype.toString()`方法，这将返回一个表示对象类型和身份的字符串。
2. **隐式/显式转换**: `toString()`通常用于显式转换，即你明确地想要将一个值转换为字符串。这种转换在`toString()`方法被调用时发生。
3. **数值转换**: 对于数值来说，`toString()`可以指定进制（如二进制、八进制、十六进制等），这使得它在数值转换时更加灵活。
4. **对象转换**: 当用于对象时，`toString()`会尝试调用对象的`toString`方法，这可能导致更复杂的输出，不仅仅是对象的字符串表示。

### String()

1. **构造函数调用**: `String()`是一个构造函数，当你使用它时，你是在创建一个新的字符串对象。这意味着你可以用`new`关键字来调用`String()`，尽管在很多情况下，省略`new`也不会报错，因为JavaScript会尝试调用`String`作为函数。
2. **隐式转换**: `String()`通常用于隐式类型转换，即在需要字符串的上下文中自动调用。例如，当你尝试将一个数值与一个字符串连接时，JavaScript会自动将数值转换为字符串，这背后就是`String()`在起作用。
3. **简化性**: `String()`通常更简单直接，它总是返回一个字符串，而不管传入的是什么类型的值。

### 哪个更好？

<br/>

选择`toString()`还是`String()`取决于你的具体需求：

- 如果你需要进行显式的类型转换，并且想要更多的控制（例如，指定数值的进制），那么`toString()`是更好的选择。
- 如果你只是需要将一个值转换为字符串，并且不需要额外的控制，那么`String()`可能更方便和直接。

在大多数日常编程场景中，`String()`由于其简单性和直观性，可能会更常用。然而，了解`toString()`的存在和用法对于处理更复杂的情况是非常有用的。

## [String.prototype.padStart()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/padStart) & [String.prototype.padEnd()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/padEnd)

### padStart()

`padStart()` 方法用另一个字符串填充当前字符串（如果需要会重复填充），直到达到给定的长度。填充是从当前字符串的开头开始的。

- 语法：

  ```js
  padStart(targetLength)
  padStart(targetLength, padString)
  ```

- 参数
  - `targetLength`:
    当前 `str` 填充后的长度。如果该值小于或等于 `str.length`，则会直接返回当前 `str`。
  - `padString` <Tag :bordered="false" color="cyan">可选</Tag>
    用于填充当前 `str` 的字符串。如果 `padString` 太长，无法适应 `targetLength`，则会从末尾被截断。默认值为 `Unicode“空格”`字符（U+0020）。

- 返回值

  在开头填充 `padString` 直到达到给定的 `targetLength` 所形成的 `String`。

### 示例

```js
'abc'.padStart(10) // '       abc'
"abc".padStart(10, 'foo') // 'foofoofabc'
'abc'.padStart(6, '123465') // '123abc'
'abc'.padStart(8, '0') // '00000abc'
'abc'.padStart(1) // 'abc'
```

### padEnd()

`padEnd()` 方法会将当前字符串从末尾开始填充给定的字符串（如果需要会重复填充），直到达到给定的长度。填充是从当前字符串的末尾开始的。

- 语法：

  ```js
  padEnd(targetLength)
  padEnd(targetLength, padString)
  ```

- 参数
  - `targetLength`:
    当前 `str` 填充后的长度。如果该值小于或等于 `str.length`，则会直接返回当前 `str`。
  - `padString` <Tag :bordered="false" color="cyan">可选</Tag>
    用于填充当前 `str` 的字符串。如果 `padString` 太长，无法适应 `targetLength`，则会被截断：对于从左到右的语言，左侧的部分将会被保留；对于从右到左的语言，右侧的部分将会被保留。默认值为`“ ”` (U+0020)。

- 返回值

  在当前 `str` 末尾填充 `padString` 直到达到给定的 `targetLength` 所形成的 `String`。

### 示例

```js
'abc'.padEnd(10) // 'abc       '
'abc'.padEnd(10, 'foo') // 'abcfoofoof'
'abc'.padEnd(6, '123456') // 'abc123'
'abc'.padEnd(1) // 'abc'

```

## [String.prototype.replace()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replace#%E6%8C%87%E5%AE%9A%E5%87%BD%E6%95%B0%E4%BD%9C%E4%B8%BA%E6%9B%BF%E6%8D%A2%E9%A1%B9)

`replace()` 方法返回一个新字符串，其中一个、多个或所有匹配的 `pattern` 被替换为 `replacement`。`pattern` 可以是字符串或 `RegExp`，`replacement` 可以是字符串或一个在每次匹配时调用的函数。如果 `pattern` 是字符串，则只会替换第一个匹配项。**原始的字符串不会改变**。

### 语法

```js
replace(pattern, replacement)
```

### 参数

- `pattern`: 可以是字符串或者一个带有 Symbol.replace 方法的对象，典型的例子就是正则表达式。任何没有 Symbol.replace 方法的值都会被强制转换为字符串。

- `replacement`: 可以是字符串或函数。
  - 如果是字符串，它将替换由 `pattern` 匹配的子字符串。支持一些特殊的替换模式，请参阅下面的指定字符串作为替换项部分。
  - **如果是函数，将为每个匹配调用该函数，并将其返回值用作替换文本**。下面的指定函数作为替换项部分描述了提供给此函数的参数。

### 返回值

一个新的字符串，其中一个、多个或所有的匹配项都被指定的替换项替换。

### 描述

**该方法并不改变调用它的字符串本身**，而是返回一个新的字符串。

字符串模式只会被替换一次。要执行全局搜索和替换，请使用带有 `g` 标志的正则表达式或使用 `replaceAll()`。

如果 `pattern` 是一个带有 `Symbol.replace` 方法的对象（包括 `RegExp` 对象），则该方法将被调用，传入目标字符串和 `replacement` 作为参数。它的返回值成为 `replace()` 的返回值。在这种情况下，`replace()` 的行为完全由 `@@replace` 方法定义——例如，下面的说明中提到的任何"捕获组"都实际上是由 `RegExp.prototype[@@replace]` 提供的功能。

如果 pattern 是一个空字符串，则替换项将被插入到字符串的开头。

```js
'xxx'.replace('', '_') // '_xxx'

function replacement (match: string) {
  console.log('match', match)
  /*
    match YYYY
    match MM
    match HH
    match mm
    match ss
    match SSS
  */
}
'YYYY-MM HH:mm:ss:SSS'.replace(/(YYYY|YY|M{1,2}|D{1,2}|H{1,2}|m{1,2}|s{1,2}|SSS)/g, replacement)
```
