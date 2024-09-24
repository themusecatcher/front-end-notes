# Note 13

## [Element: contextmenu event](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/contextmenu_event) 禁止网页响应用户点击鼠标右键

`contextmenu` 事件会在用户尝试打开上下文菜单时被触发。该事件通常在鼠标点击右键或者按下键盘上的菜单键时被触发，如果使用菜单键，该上下文菜单会被展示 到所聚焦元素的左下角，但是如果该元素是一棵 `DOM` 树的话，上下文菜单便会展示在当前这一行的左下角。

任何没有被禁用的鼠标右击事件 (通过调用事件的 `preventDefault()` 方法) 将会使得 contextmenu 事件在目标元素上被触发。

```js
// 禁用整个页面对于 contextmenu 事件的响应
document.addEventListener('contextmenu', (event) => {
  event.preventDefault()
})
```
