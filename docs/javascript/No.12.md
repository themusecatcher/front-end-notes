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

## 键盘按键事件[keydown](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/keydown_event) & [keyup](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/keyup_event)

### Element：keydown 事件

<br/>

`keydown` 事件触发于键盘按键按下的时候。
与 `keypress` 事件不同的是，所有按键均会触发 `keydown` 事件，无论这些按键是否会产生字符值。

键盘事件只能由 `<inputs>`, `<textarea>` 以及任何具有 `contentEditable` 或 `tabindex="-1"`属性的组件触发。

- 这个例子展示了当你在`<input>`元素中按下一个按键时， `KeyboardEvent.code` 的取值

```html
<input placeholder="Click here, then press down a key." size="40" />
<p id="log"></p>
```

```js
const input = document.querySelector('input')
const log = document.getElementById('log')

input.addEventListener('keydown', logKey)

function logKey(e) {
  log.textContent += ` ${e.code}`
}
```

### Element: keyup 事件

<br/>

`keyup` 事件在按键被松开时触发。

- 在这个例子中，每当你在 `<input>` 元素里松开一个键，将会打印 `KeyboardEvent.code` 的值。

```html
<input placeholder="Click here, then press and release a key." size="40" />
<p id="log"></p>
```

```js
const input = document.querySelector('input')
const log = document.getElementById('log')

input.addEventListener('keyup', logKey)

function logKey(e) {
  log.textContent += ` ${e.code}`
}
```

## [Window: resize事件](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/resize_event)

`resize` 事件在文档视图（窗口）调整大小时触发。

这个事件不可取消，不会冒泡。

在一些早期的浏览器中，可以在任何 `HTML` 元素上注册 `resize` 事件处理器。现在仍然可以设置 `onresize` 属性或使用 `addEventListener()` 在任何元素上设置一个处理器。然而，`resize` 事件只在 `window` 对象（即由 `document.defaultView` 返回）上触发。只有在 `window` 对象上注册的处理器才能接收 `resize` 事件。

虽然现在 `resize` 事件只针对窗口触发，但你可以使用 [`ResizeObserver API`](https://developer.mozilla.org/zh-CN/docs/Web/API/ResizeObserver) 获得其他元素的尺寸调整通知。

如果对你的应用程序来说，调整大小事件被触发了太多次，请参阅[优化 `window.onresize`](https://bencentra.com/code/2015/02/27/optimizing-window-resize.html) 来控制事件触发的时间。

### 语法

在像 `addEventListener()` 这样的方法中使用事件名称，或者设置事件处理器属性。

```js
addEventListener('resize', (event: Event) => {})
// 等价于 window.addEventListener('resize', reportWindowSize)

onresize = (event: Event) => {}
```

## [ResizeObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/ResizeObserver) 监听元素尺寸调整

`ResizeObserver` 接口监视 `Element` 内容盒或边框盒或者 `SVGElement` 边界尺寸的变化。

::: tip 提示
内容盒是盒模型放置内容的部分，这意味着**边框盒减去内边距和边框的宽度就是内容盒**。**边框盒包含内容、内边距和边框**。有关进一步阐述，参见盒模型。
:::

`ResizeObserver` 避免了通过回调函数调整大小时，通常创建的无限回调循环和循环依赖项。它只能通过在后续的帧中处理 `DOM` 中更深层次的元素来做到这一点。如果它的实现遵循规范，则应在绘制前和布局后调用 `resize` 事件。

### 构造函数 `ResizeObserver()`

`ResizeObserver` 构造函数创建一个新的 `ResizeObserver` 对象，它可以用于监听 `Element` 内容盒或边框盒或者 `SVGElement` 边界尺寸的大小。

- 语法

  ```js
  new ResizeObserver(callback)
  ```

- 参数
  - `callback`: 每当观测的元素调整大小时，调用该函数。该函数接收两个参数：
    - `entries`: 一个 `ResizeObserverEntry` 对象数组，可以**用于获取每个元素改变后的新尺寸**。
    - `observer`: 对 `ResizeObserver` 自身的引用，因此**需要它的时候，你要从回调函数的内部访问**。例如，**这可用于在达到特定的情况时，自动取消对观察者的监听**，但如果你不需要它，可以省略它。
  
  ```js
  function callback(entries, observer) {
    for (const entry of entries) {
      // Do something to each entry
      // and possibly something to the observer itself
    }
  }
  ```

- 示例

  ```js
  const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      if (entry.contentBoxSize) {
        if (entry.contentBoxSize[0]) {
          h1Elem.style.fontSize = `${Math.max(
            1.5,
            entry.contentBoxSize[0].inlineSize / 200,
          )}rem`
          pElem.style.fontSize = `${Math.max(
            1,
            entry.contentBoxSize[0].inlineSize / 600,
          )}rem`
        } else {
          // legacy path
          h1Elem.style.fontSize = `${Math.max(
            1.5,
            entry.contentBoxSize.inlineSize / 200,
          )}rem`
          pElem.style.fontSize = `${Math.max(
            1,
            entry.contentBoxSize.inlineSize / 600,
          )}rem`
        }
      } else {
        h1Elem.style.fontSize = `${Math.max(
          1.5,
          entry.contentRect.width / 200,
        )}rem`
        pElem.style.fontSize = `${Math.max(1, entry.contentRect.width / 600)}rem`
      }
    }
    console.log('Size changed')
  })
  resizeObserver.observe(divElem)
  ```

### 方法

- `ResizeObserver.disconnect()`: 取消特定观察者目标上所有对 `Element` 的监听。

- `ResizeObserver.observe()`: 开始对指定 `Element` 的监听。

- `ResizeObserver.unobserve()`: 结束对指定 `Element` 的监听。

### 示例

我们使用 `resize observer` 去更改头和段落的 `font-size`，随着 `slider` 的值被改变，也引起了包含的 `<div>` 的宽度改变。这展示了你可以响应元素大小的变化，即使它们与视口无关。

我们也提供了一个 `checkbox` 来关闭和打开 `observer`。如果它是关闭的，文本将不会随着 `<div>` 的宽度改变而改变。

```js
const h1Elem = document.querySelector("h1")
const pElem = document.querySelector("p")
const divElem = document.querySelector("body > div")
const slider = document.querySelector('input[type="range"]')
const checkbox = document.querySelector('input[type="checkbox"]')

divElem.style.width = "600px"

slider.addEventListener("input", () => {
  divElem.style.width = `${slider.value}px`
})

const resizeObserver = new ResizeObserver((entries) => {
  for (const entry of entries) {
    if (entry.contentBoxSize) {
      // Firefox implements `contentBoxSize` as a single content rect, rather than an array
      const contentBoxSize = Array.isArray(entry.contentBoxSize)
        ? entry.contentBoxSize[0]
        : entry.contentBoxSize

      h1Elem.style.fontSize = `${Math.max(
        1.5,
        contentBoxSize.inlineSize / 200,
      )}rem`
      pElem.style.fontSize = `${Math.max(
        1,
        contentBoxSize.inlineSize / 600,
      )}rem`
    } else {
      h1Elem.style.fontSize = `${Math.max(
        1.5,
        entry.contentRect.width / 200,
      )}rem`
      pElem.style.fontSize = `${Math.max(1, entry.contentRect.width / 600)}rem`
    }
  }

  console.log("Size changed")
})

resizeObserver.observe(divElem)

checkbox.addEventListener("change", () => {
  if (checkbox.checked) {
    resizeObserver.observe(divElem)
  } else {
    resizeObserver.unobserve(divElem)
  }
})
```

## [Window.matchMedia()](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/matchMedia) 媒体查询

`Window` 的 `matchMedia()` 方法返回一个新的 `MediaQueryList` 对象，表示指定的媒体查询字符串解析后的结果。返回的 `MediaQueryList` 可被用于判定 `Document` 是否匹配媒体查询，或者监控一个 `document` 来判定它匹配了或者停止匹配了此媒体查询。

### 语法

```js
const mqList = window.matchMedia(mediaQueryString)
```

### 参数

- `mediaQueryString`：一个被用于媒体查询解析的字符串。

### 返回值

- 一个用来媒体查询的新的 `MediaQueryList` 对象

### 使用说明

要执行一次瞬时检查以查看文档是否与媒体查询匹配，请查看 `matches` 属性的值，当 `document` 满足媒体查询条件的时候将会返回`true`。

如果你需要始终了解 `document` 是否与媒体查询匹配，则可以查看将要传递给对象的 `change` 事件。`Window.devicePixelRatio`上的文章中有一个很好的例子。

### [MediaQueryList: change event](https://developer.mozilla.org/zh-CN/docs/Web/API/MediaQueryList/change_event)

当媒体查询的支持状况改变时，`MediaQueryList` 接口的 `change` 事件触发。

- 语法:

  在像 `addEventListener()` 这样的方法中使用该事件的名字，或者设置一个事件处理函数属性。

  ```js
  const mediaQueryList = window.matchMedia(mediaQuery)
  // 处理媒体查询状态改变的事件
  const updateChange = (e: MediaQueryListEvent) => {
    console.log('matches', e.matches)
    console.log('media', e.media)
  }
  mediaQueryList.addEventListener('change', updateChange)
  ```

- 事件属性:

  - `MediaQueryListEvent` 接口的属性继承自它的父接口 `Event`.
  - `MediaQueryListEvent.matches` 只读：一个布尔值，如果 `document` 当前匹配媒体查询列表，该值为 `true`，反之为 `false`。
  - `MediaQueryListEvent.media` 只读：一个字符串，代表着一个序列化后的媒体查询。
