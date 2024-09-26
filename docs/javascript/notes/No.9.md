# Note 9

<BackTop />

## [Element.append()](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/append)

DOMString 即字符串
`Element.append` 方法在 `Element` 的最后一个子节点之后插入一组 `Node` 对象或 [`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String) 对象。被插入的 `DOMString` 对象等价为 `Text` 节点。
与 `Node.appendChild()` 的差异：

- `Element.append()` 允许追加 `DOMString` 对象，而 `Node.appendChild()` 只接受 `Node` 对象。
- `Element.append()` 没有返回值，而 `Node.appendChild()` 返回追加的 `Node` 对象。
- `Element.append()` 可以追加多个节点和字符串，而 `Node.appendChild()` 只能追加一个节点。

### 语法

```js
[Throws, Unscopable]
void Element.append((Node or DOMString)...nodes)
```

### 参数

- `nodes`：一组要插入的 Node 或 DOMString 对象。

### 示例

- 插入一个元素节点

```js
var parent = document.createElement("div")
var p = document.createElement("p")
parent.append(p)

console.log(parent.childNodes) // NodeList [ <p> ]
```

- 插入文本

```js
var parent = document.createElement("div")
parent.append("Some text")

console.log(parent.textContent) // "Some text"
```

- 插入一个节点，同时插入一些文本

```js
var parent = document.createElement("div")
var p = document.createElement("p")
parent.append("Some text", p)

console.log(parent.childNodes) // NodeList [ #text "Some text", <p> ]
```

## [CanvasRenderingContext2D.measureText()](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/measureText)

`CanvasRenderingContext2D.measureText()` 方法返回一个关于被测量文本 `TextMetrics` 对象包含的信息（例如它的宽度）。

### 语法

```js
ctx.measureText(text)
```

### 参数

- `text`：需要测量的 `String` 。

### 返回值

`TextMetrics` 对象。

### 示例

给出 `<canvas>` 元素

```html
<canvas id="canvas"></canvas>
```

```js
var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d")

var text = ctx.measureText("foo") // TextMetrics object
text.width // 16;
```

## [TextMetrics](https://developer.mozilla.org/zh-CN/docs/Web/API/TextMetrics)

在 `canvas` `中，TextMetrics` 接口表示文本的尺寸，通过 `CanvasRenderingContext2D.measureText()` 方法创建。

### 属性

- `TextMetrics.width` <Tag :bordered="false" color="cyan">只读</Tag>

  `double` 类型，**使用 CSS 像素计算的内联字符串的宽度**。基于当前上下文字体考虑。

- `TextMetrics.actualBoundingBoxLeft` <Tag :bordered="false" color="cyan">只读</Tag>

  `double` 类型，平行于基线，从CanvasRenderingContext2D.textAlign 属性确定的对齐点到文本矩形边界左侧的距离，使用 CSS 像素计算；正值表示文本矩形边界左侧在该对齐点的左侧。

- `TextMetrics.actualBoundingBoxRight` <Tag :bordered="false" color="cyan">只读</Tag>

  `double` 类型，平行于基线，从CanvasRenderingContext2D.textAlign 属性确定的对齐点到文本矩形边界右侧的距离，使用 CSS 像素计算。

- `TextMetrics.fontBoundingBoxAscent` <Tag :bordered="false" color="cyan">只读</Tag>

  `double` 类型，从CanvasRenderingContext2D.textBaseline 属性标明的水平线到渲染文本的所有字体的矩形最高边界顶部的距离，使用 CSS 像素计算。

- `TextMetrics.fontBoundingBoxDescent` <Tag :bordered="false" color="cyan">只读</Tag>

  `double` 类型，从CanvasRenderingContext2D.textBaseline 属性标明的水平线到渲染文本的所有字体的矩形边界最底部的距离，使用 CSS 像素计算。

- `TextMetrics.actualBoundingBoxAscent` <Tag :bordered="false" color="cyan">只读</Tag>

  `double` 类型，从CanvasRenderingContext2D.textBaseline 属性标明的水平线到渲染文本的矩形边界顶部的距离，使用 CSS 像素计算。

- `TextMetrics.actualBoundingBoxDescent` <Tag :bordered="false" color="cyan">只读</Tag>

  `double` 类型，从CanvasRenderingContext2D.textBaseline 属性标明的水平线到渲染文本的矩形边界底部的距离，使用 CSS 像素计算。

- `TextMetrics.emHeightAscent` <Tag :bordered="false" color="cyan">只读</Tag>

  `double` 类型，从CanvasRenderingContext2D.textBaseline 属性标明的水平线到线框中 em 方块顶部的距离，使用 CSS 像素计算。

- `TextMetrics.emHeightDescent` <Tag :bordered="false" color="cyan">只读</Tag>

  `double` 类型，从CanvasRenderingContext2D.textBaseline 属性标明的水平线到线框中 em 方块底部的距离，使用 CSS 像素计算。

- `TextMetrics.hangingBaseline` <Tag :bordered="false" color="cyan">只读</Tag>

  `double` 类型，从CanvasRenderingContext2D.textBaseline 属性标明的水平线到线框的 hanging 基线的距离，使用 CSS 像素计算。

- `TextMetrics.alphabeticBaseline` <Tag :bordered="false" color="cyan">只读</Tag>

  `double` 类型，从CanvasRenderingContext2D.textBaseline 属性标明的水平线到线框的 alphabetic 基线的距离，使用 CSS 像素计算。

- `TextMetrics.ideographicBaseline` <Tag :bordered="false" color="cyan">只读</Tag>

  `double` 类型，从 CanvasRenderingContext2D.textBaseline 属性标明的水平线到线框的 ideographic 基线的距离，使用 CSS 像素计算。

### 示例

- 测试文本宽度

当测量一段文本的水平宽度时，由于字母倾斜/斜体导致字符的宽度可能超出其预定的宽度，因此 actualBoundingBoxLeft 和 actualBoundingBoxRight 的总和可能会比内联盒子的宽度（width）更大。

因此，计算 `actualBoundingBoxLeft` 和 `actualBoundingBoxRight` 的总和是一种更准确地获取文本绝对宽度的方法：

```js
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
const text = "Abcdefghijklmnop"
ctx.font = "italic 50px serif"
const textMetrics = ctx.measureText(text)
console.log(textMetrics.width)
// 459.8833312988281
const actualWidth = textMetrics.actualBoundingBoxRight + textMetrics.actualBoundingBoxLeft
console.log(actualWidth)
// 462.8833333333333
```

## [CanvasRenderingContext2D.fillText()](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/fillText)

`CanvasRenderingContext2D` 对象的方法 `fillText()` 是 `Canvas 2D API` 的一部分，它在指定的坐标上绘制文本字符串，并使用当前的 `fillStyle` 对其进行填充。存在一个可选参数，其指定了渲染文本的最大宽度，用户代理将通过压缩文本或使用较小的字体大小来实现。

此方法会直接绘制到画布上，而不会修改当前路径，因此任何后续的 `fill()` 或 `stroke()` 调用都不会对其产生影响。

文本根据 `font`、`textAlign`、`textBaseline` 和 `direction` 属性所定义的字体和文本布局来渲染。

### 语法

```js
fillText(text, x, y)
fillText(text, x, y, maxWidth)
```

### 参数

- `text`：要作为渲染上下文的文本字符串。使用当前的 `font`、`textAlign`、`textBaseline` 和 `direction` 设置值对文本进行渲染。

- `x`：开始绘制文本的点的 `X` 轴坐标，单位为像素。

- `y`：开始绘制文本的基线的 `Y` 轴坐标，单位为像素。

- `maxWidth` <Tag :bordered="false" color="cyan">可选</Tag> 文本渲染后的最大像素宽度。如果未指定，则文本宽度没有限制。但是，如果提供了该值，用户代理将调整字距，选择水平方向更紧凑的字体（如果有这种字体或可以在不降低质量的情况下生成这种字体），或缩小字体大小，以便在指定宽度内容纳文本。

### 返回值

无（undefined）

### 示例

绘制填充文本，这段代码使用 fillText() 方法绘制了“Hello World”字符串。

这段代码获取 `<canvas>` 的引用，然后获取其 2D 图形上下文的引用。
有了这些，我们将 `font` 设置为 `50` 像素高的“衬线体”（用户默认的衬线字体），然后调用 `fillText()` 从坐标 `(50, 90)` 开始绘制文本“Hello world”。

首先，我们需要一个画布来绘图。这段代码将创建一个宽 400 像素，宽 150 像素的背景。

```html
<canvas id="canvas" width="400" height="150"></canvas>
```

```js
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

ctx.font = "50px serif"
ctx.fillText("Hello world", 50, 90)
```

## [CanvasRenderingContext2D.translate()](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/translate)

Canvas 2D API 的 `CanvasRenderingContext2D.translate()` 方法对当前网格添加平移变换的方法。

### 语法

```js
void ctx.translate(x, y)
```

translate() 方法，将 canvas 按原始 x 点的水平方向、原始的 y 点垂直方向进行平移变换
![Alt text](image-7.png)

### 参数

- `x`：水平方向的移动距离。
- `y`：垂直方向的移动距离。

### 示例

移动形状
这是一段使用 translate 方法的简单的代码片段。

```html
<canvas id="canvas"></canvas>
```

```js
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

// Moved square
ctx.translate(110, 30)
ctx.fillStyle = "red"
ctx.fillRect(0, 0, 80, 80)

// Reset current transformation matrix to the identity matrix
ctx.setTransform(1, 0, 0, 1, 0, 0)

// Unmoved square
ctx.fillStyle = "gray"
ctx.fillRect(0, 0, 80, 80)
```

移动后的正方形是红色的，未移动的正方形是灰色的。
![Alt text](image-8.png)

## [CanvasRenderingContext2D.drawImage()](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/drawImage)

Canvas 2D API 中的 `CanvasRenderingContext2D.drawImage()` 方法提供了多种在画布（Canvas）上绘制图像的方式。

### 语法

```js
drawImage(image, dx, dy)
drawImage(image, dx, dy, dWidth, dHeight)
drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
```

![Alt text](image-9.png)

### 参数

- `image`：绘制到上下文的元素。允许任何的画布图像源，例如：`HTMLImageElement`、`SVGImageElement` (en-US)、`HTMLVideoElement`、`HTMLCanvasElement`、`ImageBitmap`、`OffscreenCanvas` 或 `VideoFrame` (en-US)。

- `sx`<Tag :bordered="false" color="cyan">可选</Tag>：需要绘制到目标上下文中的，`image` 的矩形（裁剪）选择框的左上角 `X` 轴坐标。可以使用 `3` 参数或 `5` 参数语法来省略这个参数。

- `sy`<Tag :bordered="false" color="cyan">可选</Tag>：需要绘制到目标上下文中的，`image` 的矩形（裁剪）选择框的左上角 `Y` 轴坐标。可以使用 `3` 参数或 `5` 参数语法来省略这个参数。

- `sWidth`<Tag :bordered="false" color="cyan">可选</Tag>：需要绘制到目标上下文中的，`image` 的矩形（裁剪）选择框的宽度。如果不说明，整个矩形（裁剪）从坐标的 `sx` 和 `sy` 开始，到 `image` 的右下角结束。可以使用 `3` 参数或 `5` 参数语法来省略这个参数。使用负值将翻转这个图像。

- `sHeight`<Tag :bordered="false" color="cyan">可选</Tag>：需要绘制到目标上下文中的，`image` 的矩形（裁剪）选择框的高度。使用负值将翻转这个图像。

- `dx`<Tag :bordered="false" color="cyan">可选</Tag>：`image` 的左上角在目标画布上 `X` 轴坐标。

- `dy`<Tag :bordered="false" color="cyan">可选</Tag>：`image` 的左上角在目标画布上 `Y` 轴坐标。

- `dWidth`<Tag :bordered="false" color="cyan">可选</Tag>：`image` 在目标画布上绘制的宽度。允许对绘制的 `image` 进行缩放。如果不说明，在绘制时 `image` 宽度不会缩放。注意，这个参数不包含在 `3` 参数语法中。

- `dHeight`<Tag :bordered="false" color="cyan">可选</Tag>：`image` 在目标画布上绘制的高度。允许对绘制的 `image` 进行缩放。如果不说明，在绘制时 `image` 高度不会缩放。注意，这个参数不包含在 `3` 参数语法中。

### 返回值

无（undefined）

### 示例

在画布上绘制图像。此示例在画布中使用 `drawImage()` 方法绘制一张图像。

```html
<canvas id="canvas"></canvas>
<div style="display:none;">
  <img id="source" src="rhino.jpg" width="300" height="227" />
</div>
```

原图像从坐标 `(33,71)` 处截取一个宽度为 `104` 高度为 `124` 的图像。并将其绘制到画布的 `(21, 20)` 坐标处，并将其缩放为宽 `87`、高 `104` 的图像。

```js
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
const image = document.getElementById("source")

image.addEventListener("load", (e) => {
  ctx.drawImage(image, 33, 71, 104, 124, 21, 20, 87, 104)
})
```

## [HTMLCanvasElement.getContext()](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCanvasElement/getContext)

`HTMLCanvasElement.getContext()` 方法返回 `canvas` 的上下文，如果上下文没有定义则返回 `null` .

在同一个 canvas 上以相同的 contextType 多次调用此方法只会返回同一个上下文。

### 语法

```js
var ctx = canvas.getContext(contextType)
var ctx = canvas.getContext(contextType, contextAttributes)
```

### 参数

- 上下文类型（`contextType`）
  是一个指示使用何种上下文的 `DOMString` 。可能的值是：
  - `"2d"`, 建立一个 `CanvasRenderingContext2D` 二维渲染上下文。
  - `"webgl"` (或"experimental-webgl") 这将创建一个 WebGLRenderingContext 三维渲染上下文对象。只在实现WebGL 版本 1(OpenGL ES 2.0) 的浏览器上可用。
  - `"webgl2"` (或 "experimental-webgl2") 这将创建一个 WebGL2RenderingContext 三维渲染上下文对象。只在实现 WebGL 版本 2 (OpenGL ES 3.0) 的浏览器上可用。实验性
  "bitmaprenderer" 这将创建一个只提供将 canvas 内容替换为指定ImageBitmap功能的ImageBitmapRenderingContext 。

### 示例

定义 `<canvas>` 元素：

```html
<canvas id="canvas" width="300" height="300"></canvas>
```

通过如下代码可以获取 `canvas2d` 上下文：

```js
var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d")
console.log(ctx) // CanvasRenderingContext2D { ... }
```
