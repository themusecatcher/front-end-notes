# Note 9

## 如何让div具有 `focus` 和 `blur` 事件

[tabindex](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes/tabindex)

`tabindex` 全局属性 指示其元素是否可以聚焦，以及它是否/在何处参与顺序键盘导航（通常使用Tab键，因此得名）。
div设置样式时，可正常使用 `:hover` 设置悬浮样式，但无法使用 `:focus` 设置聚焦样式
`<div>` 本身没有 `@blur` 和 `@focus` 事件，可以通过添加 `tabindex` 属性：

```html
<div tabindex="-1"></div>
```

::: tip
可以使用在任何元素上，不管元素默认是否支持聚焦
:::

`tabindex` 接受一个整数作为值，具有不同的结果，具体取决于整数的值：

- **tabindex = 负值（通常是tabindex = "-1"）**

  表示元素是可聚焦的，但是不能通过键盘导航来访问到该元素，用 JS （例如：@focus）做页面小组件内部键盘导航的时候非常有用。
- **tabindex="0"**

  表示元素是可聚焦的，并且可以通过键盘导航来聚焦到该元素，它的相对顺序是当前处于的 DOM 结构来决定的。（访问的顺序是按照元素在文档中的顺序来focus，即使采用浮动改变了页面中显示的顺序，依然是按照html文档中的顺序来定位。）
- **tabindex = 正值**

  - 表示元素是可聚焦的，并且可以通过键盘导航来访问到该元素；它的相对顺序按照 `tabindex` 的数值递增而滞后获焦。如果多个元素拥有相同的 `tabindex`，它们的相对顺序按照他们在当前 DOM 中的先后顺序决定。
  - 优先级大于 `tabindex=0`，在 `tabindex>=1` 时，数字越小，优先级越低。

`tabindex` 的聚焦顺序：

- 在可聚焦元素中，正整数数值越大，顺序越往后，正整数数值的节点顺序比0值的节点靠前。
- 在可聚焦元素中，相同 `tabindex` 数值的节点，根据 DOM节点的先后顺序决定聚焦顺序。

::: tip
如果我们在 `<div>` 上设置了 `tabindex` 属性，它的子元素内容不能使用箭头键来滚动，
除非我们在内容上也设置 `tabindex`。[查看这篇 fiddle 来理解 tabindex 的滚动影响](https://jsfiddle.net/jainakshay/0b2q4Lgv/)
:::

> 元素 element 分为 `focusable` 和 `非focusable`，使用 `tabindex` 可以改变元素相关的行为

在HTML中有6个元素默认支持聚焦：

1. 带 `href` 属性的 `<a>` 标签
2. 带 `href` 属性的 `<link>` 标签
3. `<button></button>` 标签
4. `<input />` 标签 (排除带有 `type="hidden"` 属性的)
5. `<select></select>` 标签
6. `<textarea></textarea>` 标签

以上的元素默认都可以使用 Tab 键，以及 JS focus() 方法聚焦
例如：

```js
document.querySelector('a').focus()
```

如何设置div元素的focus样式？ 使用 CSS伪类 [`:focus-within`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:focus-within)

`:focus-within` 是一个CSS 伪类 ，表示一个元素获得焦点 或 该元素的后代元素获得焦点。换句话说，元素自身或者它的某个后代匹配 :focus 伪类。

```css
/* 当 <div> 的某个后代获得焦点时，匹配 <div> */
div:focus-within {
  background: cyan;
}
```

## HTML5 新属性

[`HTML5` 新属性参考文档](https://www.runoob.com/tags/ref-standardattributes.html)

HTML 属性能够赋予元素含义和语境。

下面的全局属性可用于任何 HTML5 元素。
属性 | 描述
-- | --
`accesskey` | 设置访问元素的键盘快捷键。
`class` | 规定元素的类名（classname）
`contenteditable` <Badge type="tip" text="New" /> | 规定是否可编辑元素的内容。
`contextmenu` <Badge type="tip" text="New" /> | 指定一个元素的上下文菜单。当用户右击该元素，出现上下文菜单
`data-*` <Badge type="tip" text="New" /> | 用于存储页面的自定义数据
`dir` | 设置元素中内容的文本方向。
`draggable` <Badge type="tip" text="New" /> | 指定某个元素是否可以拖动
`dropzone` <Badge type="tip" text="New" /> | 指定是否将数据复制，移动，或链接，或删除
`hidden` <Badge type="tip" text="New" /> | hidden 属性规定对元素进行隐藏。
`id` | 规定元素的唯一 id
`lang` | 设置元素中内容的语言代码。
`spellcheck` <Badge type="tip" text="New" /> | 检测元素是否拼写错误
`style` | 规定元素的行内样式（inline style）
`tabindex` | 设置元素的 Tab 键控制次序。
`title` | 规定元素的额外信息（可在工具提示中显示）
`translate` <Badge type="tip" text="New" /> | 指定是否一个元素的值在页面载入时是否需要翻译

## [HTMLElement.dataset](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/dataset)

`HTMLElement` 接口的只读属性 `dataset` 提供了对元素上自定义数据属性（`data-*`）读/写访问。它暴露了一个字符串映射（`DOMStringMap`），其中包含每个` data-*` 属性条目。

::: tip 备注：
`dataset` 属性本身可以被读取，但是不能直接写入。相反，所有写入都必须是写入 `dataset` 的单个属性，而 `dataset` 又表示这些数据的属性。
:::

## [Canvas](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API)
