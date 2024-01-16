# Note 8

## CSS3定位

`positon`属性指定了元素的定位类型（静态的，相对的，绝对的或固定的）,默认值：`static`

JavaScript语法：`object.style.position="absolute"`

值 | 描述
:-- | :--
static | **默认值。没有定位**，元素**出现在正常的流中**（忽略 `top`, `bottom`, `left`, `right` 或者 `z-index` 声明）。
absolute | 生成**绝对定位**的元素，**相对于 `static` 定位以外的第一个父元素进行定位**。<br/>绝对定位的元素的位置**相对于最近的已定位父元素，如果元素没有已定位的父元素，那么它的位置相对于`<html>`**<br/>元素的位置通过 `left`, `top`, `right` 以及 `bottom` 属性进行规定。能很准确的将元素移动到想要的位置。<br/>**使元素的位置与文档流无关，因此不占据空间**。
fixed | 生成**固定定位**的元素，**相对于浏览器窗口进行定位**。<br/>元素的位置通过 `left`, `top`, `right` 以及 `bottom` 属性进行规定。<br/>**`Fixed`定位使元素的位置与文档流无关，因此不占据空间**。
relative | 生成**相对定位**的元素，**相对于元素默认的位置进行定位（相对其正常位置）**。<br/>因此，`left:20` 会向元素的 `LEFT` 位置添加 `20` 像素。同样通过`top`、`bottom`、`left`以及`bottom`来明确元素的位置。<br/>**移动相对定位元素，但它原本所占的空间不会改变**。
sticky | 粘性定位，**该定位基于用户滚动的位置**。<br/>它的行为就像 `position:relative;` 而当页面滚动超出目标区域时，它的表现就像 `position:fixed;`，它会固定在目标位置。<br/>粘性定位的元素**依赖于用户的滚动**，在 `position:relative` 与 `position:fixed` 定位之间切换。<br/>它的行为就像 `position:relative;` 而**当页面滚动超出目标区域时，它的表现就像** `position:fixed;`，它**会固定在目标位置**。<br/>元素定位表现为**在跨越特定阈值前为相对定位，之后为固定定位**。<br/>这个**特定阈值指的是** `top`, `right`, `bottom` 或 `left` 之一，换言之，指定 `top`, `right`, `bottom` 或 `left` 四个阈值其中之一，**才可使粘性定位生效**。否则其行为与相对定位相同。
inherit | 规定应该**从父元素继承 `position` 属性的值**。
initial | 设置该属性为默认值，详情查看 `CSS initial` 关键字。