# Note 13

## [scrollHeight详情](/vue2/note-9.html#浏览器窗口宽高和元素坐标-尺寸)

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
