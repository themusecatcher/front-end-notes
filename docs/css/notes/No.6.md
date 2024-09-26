# Note 6

<BackTop />

## CSS `object-fit` 属性

[`object-fit` 参考文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/object-position)

> `object-fit` 属性指定元素的内容应该如何去适应指定容器的高度与宽度。<br>`object-fit` 一般用于 `img` 和 `video` 标签，一般可以对这些元素进行保留原始比例的剪切、缩放或者直接进行拉伸等。

您可以通过使用 `object-position` 属性来切换被替换元素的内容对象在元素框内的对齐方式。

值 | 描述
-- | --
`fill` | 默认，**不保证保持原有的比例，内容拉伸填充整个内容容器**。
`contain` | **保持原有尺寸比例。内容被缩放**。
`cover` | **保持原有尺寸比例。但部分内容可能被剪切**。
`none` | **保留原有元素内容的长度和宽度**，也就是说内容不会被重置。
`scale-down` | **保持原有尺寸比例**。内容的尺寸与 `none` 或 `contain` 中的一个相同，取决于它们两个之间谁得到的对象尺寸会更小一些。

> `object-position`：属性一般与 `object-fit` 一起使用，用来设置元素的位置。<br>`object-position`： 一般用于 `img` 和 `video` 标签。

值 | 描述
-- | --
`position` | 指定 `image` 或 `video` 在容器中的位置。**第一个值为 x 坐标位置的值，第二个值为 y 坐标位置的值**。

表示的方式有：

```less
object-position: 50% 50%; // 即水平垂直居中
object-position: right top;
object-position: left bottom; // center center
object-position: 250px 125px;
```

## 引入并使用特定字体

```html
<p class="u-font">字体</p>
```

```css
.u-head {
  font-family: SourceHanSerifCN;
  font-size: 28px;
  font-weight: 600;
  color: #333333;
  line-height: 40px;
}
@font-face {
  font-family: SourceHanSerifCN;
  src: url(~@/assets/fonts/SourceHanSerifCN-SemiBold.otf);
}
```

::: tip
浏览器支持：
**Internet Explorer 9，Firefox，Opera，Chrome, 和 Safari 支持 @font-face 规则.**

但是, Internet Explorer 9 只支持 .eot 类型的字体, Firefox, Chrome, Safari, 和 Opera 支持 .ttf 与.otf 两种类型字体.
注意： Internet Explorer 8 及更早IE版本不支持 @font-face 规则.
:::

## `box-sizing` 属性

CSS3 `box-sizing` 属性可以设置 `width` 和 `height` 属性中是否包含了 `padding`(内边距) 和 `border`(边框)。

语法：`box-sizing: content-box|border-box|inherit`

值 | 说明
-- | --
`content-box` | 这是 CSS2.1 指定的宽度和高度的行为。指定元素的宽度和高度（最小/最大属性）适用于 `box` 的宽度和高度。元素的填充和边框布局和绘制指定宽度和高度除外
`border-box` | 指定宽度和高度（最小/最大属性）确定元素边框。也就是说，对元素指定宽度和高度包括了 `padding` 和 `border` 。通过从已设定的宽度和高度分别减去边框和内边距才能得到内容的宽度和高度。
`inherit` | 指定 `box-sizing` 属性的值，应该从父元素继承

::: tip
不使用 CSS3 `box-sizing` 属性

默认情况下，元素的宽度与高度计算方式如下：

- **元素实际宽度 = width(宽) + padding(内边距) + border(边框)**
- **元素实际高度 = height(高) + padding(内边距) + border(边框)**
:::

## `:root` 伪类

`:root` 这个 CSS 伪类匹配文档树的根元素。对于 HTML 来说，`:root` 表示 `<html>` 元素，除了优先级更高之外，与 `html` 选择器相同。
在声明全局 CSS 变量时 `:root` 会很有用：

```css
:root {
  --main-color: hotpink;
  --pane-padding: 5px 12px;
}
```

使用变量：

```css
.test {
  color: var(--main-color);
}
```

## 固定宽度内，实现不同字数人名左右对齐排列

<p class="u-name">王二</p>
<p class="u-name">王小二</p>

<style lang="less">
.u-name {
  width: 120px;
  height: 40px;
  font-size: 28px;
  font-weight: 400;
  color: #333333;
  line-height: 40px;
  text-align: justify;
  &::after {
    content: '';
    display: inline-block;
    width: 100%;
  }
}
</style>

```html
<p class="u-name">王二</p>
<p class="u-name">王小二</p>
```

```less
.u-name {
  width: 120px;
  height: 40px;
  font-size: 28px;
  font-weight: 400;
  color: #333333;
  line-height: 40px;
  text-align: justify;
  &::after {
    content: '';
    display: inline-block;
    width: 100%;
  }
}
```

## 如何动态设置伪元素 `&:before` 和 `&:after` 样式

> 使用css变量：var(--border-width)

```html
<div
  class="m-divider"
  :style="`--border-width: ${borderWidth}px;`">
</div>
```

```less
.m-divider {
  display: flex;
  align-items: center;
  margin: 16px 0;
  width: 100%;
  min-width: 100%;
  &:before, &:after {
    position: relative;
    width: 50%;
    border-top-width: var(--border-width);
    border-top-style: solid;
    border-top-color: rgba(5, 5, 5, 0.06);
    transform: translateY(50%);
    content: '';
  }
}
```

## flex布局介绍

- 父级元素设置为 `flex` 布局后，子元素的 `float`、`clear`、`vertical-align` 属性都会失效
- 父级元素设置为 `flex` 布局后，所有的子元素都变成了行内块 `inline-block` 元素

[MDN flex 布局基本概念](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_flexible_box_layout/Basic_concepts_of_flexbox)

[`flex` 布局](https://www.runoob.com/w3cnote/flex-grammar.html)

> flex 属性用于设置或检索弹性盒模型对象的子元素如何分配空间。<br>flex 属性是 flex-grow、flex-shrink 和 flex-basis 属性的简写属性。<br>**`flex: 1;` 让所有弹性盒模型对象的子元素都有相同的长度，且忽略它们内部的内容**

[flex 简写属性](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex)

语法：`flex: flex-grow flex-shrink flex-basis|auto|initial|inherit;`

默认: `0 1 auto`

属性值 | 描述
-- | --
[`flex-grow`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-grow) | 一个数字，默认 `0`，规定**项目将相对于其他灵活的项目进行扩展的量**。
[`flex-shrink`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-shrink) | 一个数字，默认 `1`，规定**项目将相对于其他灵活的项目进行收缩的量**。`flex-shrink: 0`: 表示该项目不缩小
[`flex-basis`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-basis) | 项目的长度，默认 `auto`，合法值："`auto`"、"`inherit`" 或一个后跟 "`%`"、"`px`"、"`em`" 或任何其他长度单位的数字。
`auto` | 与 `1 1 auto` 相同。
`none` | 与 `0 0 auto` 相同。
`initial` | 设置该属性为它的默认值，即为 `0 1 auto`。请参阅 initial。
`inherit` | 从父元素继承该属性。请参阅 inherit。

## 网格间距 [`gap`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/gap)

CSS `gap` 简写属性用于**设置行与列之间的间隙**（网格间距）。

规范的早期版本将该属性命名为 `grid-gap`，且为了保持与旧网站的兼容性，浏览器仍然会接受 `grid-gap` 作为 `gap` 的别名。

### 语法

```css
/* 一个 <length> 值 */
gap: 20px;
gap: 1em;
gap: 3vmin;
gap: 0.5cm;

/* 一个 <percentage> 值 */
gap: 16%;
gap: 100%;

/* 两个 <length> 值 */
gap: 20px 10px;
gap: 1em 0.5em;
gap: 3vmin 2vmax;
gap: 0.5cm 2mm;

/* 一个或两个 <percentage> 值 */
gap: 16% 100%;
gap: 21px 82%;

/* calc() 值 */
gap: calc(10% + 20px);
gap: calc(20px + 10%) calc(10% - 5px);

/* 全局值 */
gap: inherit;
gap: initial;
gap: revert;
gap: revert-layer;
gap: unset;
```

该属性用来表示 `<'row-gap'>` 和可选的 `<'column-gap'>` 的值。如果缺失 `<'column-gap'>`，则其会被设置成跟 `<'row-gap'>` 一样的值。

`<'row-gap'>` 和 `<'column-gap'>` 都可以用 `<length>` 或者 `<percentage>` 来指定。

### 值

- `<length>`: 网格线之间的间隙宽度。
- `<percentage>`: 网格线之间的间隙宽度，为相对于当前元素尺寸的百分比。

### 示例

#### 弹性布局

```html
<div id="flexbox">
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
</div>
```

```css
#flexbox {
  display: flex;
  flex-wrap: wrap; // 超出后换行，默认 nowrap 不换行
  width: 300px;
  gap: 20px 5px; // [行间距, 列间距]: 20px 5px
}
#flexbox > div {
  border: 1px solid green;
  background-color: lime;
  flex: 1 1 auto;
  width: 100px;
  height: 50px;
}
```

#### 网格布局

```html
<div id="grid">
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
</div>
```

```css
#grid {
  display: grid;
  height: 200px;
  grid-template: repeat(3, 1fr) / repeat(3, 1fr);
  gap: 20px 5px; // [行间距, 列间距]: 20px 5px
}
#grid > div {
  border: 1px solid green;
  background-color: lime;
}
```

## 只设置单边阴影 `box-shadow`

语法：`box-shadow: h-shadow v-shadow blur spread color inset;`
值 | 说明
-- | --
h-shadow | 必需的。**水平阴影的位置**。允许负值
v-shadow | 必需的。**垂直阴影的位置**。允许负值
blur | 可选。**模糊距离**
spread | 可选。**阴影的大小**
color | 可选。**阴影的颜色**。在CSS颜色值寻找颜色值的完整列表
inset | 可选。从外层的阴影（开始时）改变阴影内侧阴影

- 只设置**底部**阴影：

  ```css
  box-shadow: 0 5px 5px 0 rgba(0,0,0,0.08);
  ```

- 只设置**顶部**阴影：
  
  ```css
  box-shadow: 0 -5px 5px 0 rgba(0,0,0,0.08);
  ```

- 只设置**左部**阴影：
  
  ```css
  box-shadow: -5px 0 5px 0 rgba(0,0,0,0.08);
  ```

- 只设置**右部**阴影：

  ```css
  box-shadow: 5px 0 5px 0 rgba(0,0,0,0.08);
  ```

## `vw` 单位相关问题<Tag :bordered="false" color="cyan">慎用</Tag>

::: danger
在windows系统中，页面有垂直滚动时，垂直滚动条会占用部分视口宽度，使用 `100vw` 时，由于 `100vw > 100%`，导致页面会出现横向滚动条
:::

## 线性渐变[linear-gradient()](https://developer.mozilla.org/zh-CN/docs/Web/CSS/gradient/linear-gradient)

`CSS` `linear-gradient()` 函数用于**创建一个表示两种或多种颜色线性渐变的图片**。其结果属于`<gradient>`数据类型，是一种特别的`<image>`数据类型。

```css
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

```css
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

## 径向渐变[radial-gradient()](https://developer.mozilla.org/zh-CN/docs/Web/CSS/gradient/radial-gradient)

`radial-gradient()` `CSS` 函数创建一个图像，该图像由从原点辐射的两种或多种颜色之间的渐进过渡组成。它的形状可以是圆形或椭圆形。函数的结果是 `<gradient>` 数据类型的对象。这是一种特别的 `<image>`。

### 语法

```css
/* 在容器中心的渐变，从红色开始，变成蓝色，最后变成绿色 */
radial-gradient(circle at center, red 0, blue, green 100%)
```

径向渐变通过指定渐变的中心（0% 椭圆所在的位置）和结束形状（100% 椭圆）的大小和形状来指定。

### 值

- `<position>`
 ` <position>` 与 `background-position` 或者 `transform-origin` 类似。如果没有指定，**默认为中心点**。

- `<ending-shape>`
  **渐变结束时的形状**。圆形（渐变的形状是一个半径不变的正圆）或椭圆形（轴对称椭圆）。默认值为椭圆。

- `<size>`
  **确定渐变结束形状的大小**。如果省略，则**默认为最远角**。它可以显式给出，也可以通过关键字给出。出于关键字定义的目的，将梯度框边缘视为在两个方向上无限延伸，而不是有限线段。

- `<linear-color-stop>`
色值结束点（`color stop`）的 `<color>` 值，后跟一个或两个可选的停止位置（沿渐变轴的 `<percentage>` 或 `<length>`）。`0% `的百分比，或者 `0` 的长度，代表渐变的中心；值 `100%` 表示结束形状与虚拟渐变射线的交点。两者之间的百分比值线性定位在梯度射线上。包括两个停止位置相当于在两个位置声明了两个颜色相同的色值结束点。

- `<color-hint>`
`color-hint` 是一个插值提示，定义了相邻色标之间的渐变如何进行。长度定义了两种颜色之间的哪个点渐变颜色应该到达颜色过渡的中点。如果省略，颜色过渡的中点是两个色值结束点之间的中点。

### 示例

- 简单的渐变

  ```css
  .radial-gradient {
    <!-- 颜色值后的百分比表示指定颜色的标准中心线位置 -->
    background-image: radial-gradient(cyan 0%, transparent 20%, salmon 40%);
  }
  ```

- 非居中渐变

  ```css
  .radial-gradient {
    background-image: radial-gradient(
      farthest-corner at 40px 40px,
      #f35 0%,
      #43e 100%
    )
  }

### [CSS渐变](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_images/Using_CSS_gradients)