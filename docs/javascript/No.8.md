# Note 8

## [scrollHeight详情](/javascript/No.4.html#浏览器窗口宽高和元素坐标-尺寸)

### 判断元素是否有滚动条

<br/>
出现滚动条便意味着元素空间将大于其内容显示区域，根据这个现象便可以得到判断是否出现滚动条的规则

### 判断竖向滚动条

```js
if (el.scrollHeight > el.clientHeight) {
  // true
}
```

### 判断横向滚动条

```js
if (el.scrollWidth > el.clientWidth) {
  // true
}
```

[Node.parentElement](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/parentElement) 返回当前节点的父元素节点，如果该元素没有父节点，或者父节点不是一个 `DOM 元素`，则返回 `null`。

- 语法 `parentElement = node.parentElement`
  <br/>`parentElement` 是当前节点的父元素。它永远是一个 `DOM 元素` 对象，或者 `null`。

### 实例

<br/>**监听距离当前元素最近的一个可竖向滚动的祖先节点**

```js
const target = getScrollParentElement(backtop.value.parentElement)
target && target.addEventListener('scroll', showScrollTop)

function getScrollParentElement (el: HTMLElement) {
  if (el.scrollHeight > el.clientHeight) {
    return el
  } else if (el.parentElement) {
    return getScrollParentElement(el.parentElement)
  } else {
    return null
  }
}
```

## [scrollTo](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollTo) 滚动到指定位置

Element 的 scrollTo() 方法可以使界面滚动到给定元素的指定坐标位置。

- 语法

  ```js
  scrollTo(x-coord, y-coord)
  scrollTo(options)
  ```

- 参数
  - `x-coord` 是你想要显示在左上角的元素沿水平轴的像素。
  - `y-coord` 是你想要显示在左上角的元素沿垂直轴的像素。

  或者
  - `options` 包含以下参数的对象：
    - `top`
      指定沿 `Y` 轴滚动窗口或元素的像素数。
    - `left`
      指定沿 `X` 轴滚动窗口或元素的像素数。

    - `behavior`
      `smooth` 表示平滑滚动并产生过渡效果、`instant` 表示滚动会直接跳转到目标位置，没有过渡效果。`auto` 或缺省值表示浏览器会自动选择滚动时的过渡效果。

### 示例

```js
element.scrollTo(0, 1000);
// 或者
element.scrollTo({
  top: 100,
  left: 100,
  behavior: 'smooth'
})
```
