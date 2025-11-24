# Note 3

<BackTop />

## HTML 语义化

`HTML`语义化是一种编写`HTML`文档的方法，它**强调使用恰当的HTML标签来表达页面内容的结构和意义**。这种方法的**核心在于提高网页的可访问性、搜索引擎优化（SEO）和代码的可维护性**。通过使用语义化的标签，开发者能够使网页的结构更加清晰，使得不仅是人类用户，还有搜索引擎和辅助技术（如屏幕阅读器）都能够更好地理解网页内容。

以下是`HTML`语义化的一些关键点：

1. **使用恰当的HTML5标签**：`HTML5`引入了一系列新的语义标签，如`<header>`、`<nav>`、`<section>`、`<article>`、`<aside>`、`<footer>`等，这些标签都是为了更好地描述网页的不同部分而设计的。

2. **内容结构化**：通过使用这些语义标签，开发者可以将页面内容组织成清晰的结构，例如，使用`<article>`标签来包裹独立的内容块，如博客文章或新闻故事，而`<footer>`标签则用于包含作者信息、版权声明等页脚内容。

3. **提高可访问性**：对于视觉受限用户，屏幕阅读器等辅助技术可以通过语义化的标签更好地理解页面内容，并以有意义的方式呈现给用户。例如，`<h1>`到`<h6>`的标题标签可以帮助屏幕阅读器理解页面的层次结构。

4. **搜索引擎优化**：搜索引擎（如`Google`）在索引网页时，会考虑`HTML`标签的语义信息。使用正确的语义标签可以帮助搜索引擎更好地理解页面内容，从而可能提高网页的搜索排名。

5. **代码维护**：语义化的`HTML`代码更加清晰易读，这使得其他开发者（或未来的你）更容易理解和维护代码。例如，如果你看到`<section>`标签，你会知道它代表了一个独立的区段，而不需要查看样式表或`JavaScript`代码。

6. **样式和行为的分离**：语义化`HTML`鼓励将内容（`HTML`）与样式（`CSS`）和行为（`JavaScript`）分离。这样做不仅有助于提高代码的可维护性，还可以使得网页在没有`CSS`或`JavaScript`的情况下仍然保持一定的可读性。

7. **避免过度使用`<div>`和`<span>`**：虽然`<div>`和`<span>`标签在布局和样式应用上非常灵活，但它们本身并不传达任何语义信息。在可能的情况下，应优先使用更具体的语义标签。

总之，**HTML语义化是一种编写网页的方法，它通过使用描述性的标签来提高内容的可理解性，从而使得网页更加友好地与用户、搜索引擎和开发工具互动。**

## src 和 href 的区别和使用场景

`src`（`source`的缩写）和`href`（`hypertext reference`的缩写）是`HTML`中用于不同目的的两个属性。它们的主要区别和使用场景如下：

### `src`（源）

### 用途

<br/>

`src`属性用于**指定嵌入到当前文档中的外部资源的路径**。这些资源可以是图像、视频、音频、脚本文件等。

### 使用场景

- **图像**：`<img>`标签使用`src`属性来指定图像文件的路径。

  ```html
  <img src="path/to/image.jpg" alt="描述文本">
  ```

- **视频**：`<video>`标签使用`src`属性来指定视频文件的路径。

  ```html
  <video src="path/to/video.mp4" controls></video>
  ```

- **音频**：`<audio>`标签使用`src`属性来指定音频文件的路径。

  ```html
  <audio src="path/to/audio.mp3" controls></audio>
  ```

- **脚本**：`<script>`标签使用`src`属性来引入外部JavaScript文件。

  ```html
  <script src="path/to/script.js"></script>
  ```

- **框架**：`<iframe>`、`<embed>`和`<object>`等标签也使用`src`属性来指定嵌入内容的路径。

### `href`（超文本引用）

### 用途

<br/>

`href`属性**用于指定超链接的目标URL**，即**链接指向的另一个文档或资源的位置**。

### 使用场景

- **链接**：`<a>`标签使用`href`属性来定义超链接，点击链接会导航到指定的URL。

  ```html
  <a href="https://www.example.com" target="_blank">访问示例网站</a>
  ```

- **样式表**：`<link>`标签使用`href`属性来链接外部CSS样式表。

  ```html
  <link href="path/to/styles.css" rel="stylesheet">
  ```

- **图标**：`<link>`标签使用`href`属性来定义页面的图标（favicon）。

  ```html
  <link href="path/to/favicon.ico" rel="icon">
  ```

- **资源预加载**：`<link>`标签的`rel`属性可以设置为`preconnect`、`preload`等，使用`href`属性来指定预加载的资源。

### 总结区别

- **加载方式**：`src`属性加载的资源会被嵌入到当前文档中，而`href`属性创建的链接会在新的上下文或窗口中加载资源。
- **导航行为**：使用`href`属性的链接会导致页面跳转，而`src`属性通常用于在当前页面内嵌入内容。
- **应用范围**：`src`属性通常与`<img>`、`<script>`等标签一起使用，而`href`属性通常与`<a>`、`<link>`等标签一起使用。

理解`src`和`href`的区别对于正确地使用HTML标签和创建功能性网页非常重要。

## BFC

`BFC（Block Formatting Context）`是**块级格式化上下文**，是`Web`页面的可视`CSS`渲染的一部分。它**决定了元素如何对其内容进行定位，以及与其他元素的关系和相互作用**。在 `BFC` 中，元素的布局不会影响到 `BFC` 外部的元素。

BFC 的形成条件包括但不限于以下几点：

1. 根元素（HTML 文档的 `<html>` 元素）
2. 浮动元素（`float` 值不为 `none`）
3. 绝对定位元素（`position` 值为 `absolute` 或 `fixed`）
4. `display` 值为 `inline-block`、`table-cells`、`flex`
5. `overflow` 值不为 `visible` 的块元素
6. `perspective` 属性非 `none`
7. `transform` 属性非 `none`

BFC 的特点：

1. **独立的渲染区域**：BFC 内部的布局不会影响到外部元素。在 BFC 中，两个相邻的 Box 的垂直距离由 `margin` 决定。属于同一个 BFC 的两个相邻 Box 的 `margin` 会发生重叠。
2. **计算 BFC 的高度时，会包含浮动元素**：即使浮动元素没有清除（`clear` 属性），BFC 也会考虑到浮动元素的 `height` 和 `width`。
3. **BFC 可以阻止 `margin` 重叠**：当两个相邻的 Box 都属于 BFC 时，它们的 `margin` 不会发生重叠。
4. **BFC 作为容器时，其 `padding` 和 `border` 不会与 float 的子元素重叠**：即使子元素浮动，BFC 的内边距和边框也会包裹住它们。

BFC 的应用场景：

1. **清除内部浮动**：当父元素需要包含浮动的子元素时，可以创建一个 BFC 来避免父元素的高度塌陷。
2. **防止外边距重叠**：通过创建 BFC，可以避免相邻元素的外边距重叠。
3. **创建自适应两栏布局**：通过设置两个相邻元素的宽度，并给其中一个元素创建 BFC，可以实现宽度自适应的两栏布局。
4. **避免元素被覆盖**：当一个元素需要避免被浮动元素覆盖时，可以给该元素创建 BFC。

BFC 是 CSS 布局中的一个重要概念，理解 BFC 的工作原理和特点，对于进行高效的布局设计和解决布局问题非常有帮助。

## 跨域标签

在 `HTML` 中，有几个标签可以加载跨域资源，但它们的跨域行为和处理方式各不相同：

### 1. `<img>` 图片标签

```html
<img src="https://other-domain.com/image.jpg" crossorigin="anonymous">
```

- 默认允许跨域
- 使用 `crossorigin` 属性可控制 `CORS` 行为

### 2. `<script>` 脚本标签

```html
<script src="https://other-domain.com/script.js"></script>
```

- 默认允许跨域加载
- 但受同源策略限制，无法读取跨域脚本的错误信息
- 使用 `crossorigin` 属性可获取更详细的错误信息

### 3. `<link>` 样式表标签

```html
<link rel="stylesheet" href="https://other-domain.com/style.css">
```

- 默认允许跨域加载 `CSS`
- 但通过 `@font-face` 加载字体时可能受 `CORS` 限制

### 4. `<iframe>` 内嵌框架

```html
<iframe src="https://other-domain.com/page.html"></iframe>
```

- 可以加载跨域内容
- 但受同源策略限制，父页面无法访问 `iframe` 内容

### 5. `<audio>`、`<video>` 媒体标签

```html
<audio src="https://other-domain.com/audio.mp3" crossorigin="anonymous"></audio>
<video src="https://other-domain.com/video.mp4" crossorigin="anonymous"></video>
```

- 默认允许跨域加载
- 使用 `crossorigin` 属性控制 `CORS`

### 6. `<object>`、`<embed>` 嵌入对象

```html
<object data="https://other-domain.com/document.pdf"></object>
<embed src="https://other-domain.com/swf.swf">
```

- 可以加载跨域资源

### 跨域属性说明

<br/>

**crossorigin 属性值：**

- `anonymous`：匿名跨域请求，不发送凭据
- `use-credentials`：带凭据的跨域请求
- 不设置：不使用 `CORS`

### 注意事项

- 跨域请求需要服务器设置正确的 `CORS` 头部
- 某些资源（如字体、Canvas 图像数据）有更严格的跨域限制
- 实际使用时要注意浏览器的安全策略限制

这些标签为网页提供了丰富的跨域资源加载能力，但需要合理配置以确保安全和功能正常。
