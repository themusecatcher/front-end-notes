# Note 1

## `<a>` 标签使用

- 取消默认行为

```html
<!-- 什么也不执行，去掉a标签的默认行为，跟href="javascript:void(0)"一样，void 是JavaScript 的一个运算符，void(0)就是什么也不做 -->
<a href="javascript:;"></a>
```

- 在有滚动的页面定位到页面最顶端

```html
<a href="#"></a>
```

- 定位到页面中 `id="anchor"` 的锚点

```html
<a href="#anchor"></a>
```

- 刷新当前页面

```html
<a href=""></a>
```

- 跳转到首页

```html
<a href="/"></a>
```

## `document.documentElement`

`Document.documentElement` 是一个会返回文档对象（`document`）的根元素的只读属性（如 HTML 文档的 `<html>` 元素）

::: tip
对于任何非空 HTML 文档，调用 `document.documentElement` 总是会返回一个`<html>` 元素，且它一定是该文档的根元素。借助这个只读属性，能方便地获取到任意文档的根元素。

HTML 文档通常包含一个子节点 `<html>`，但在它前面可能还有个 DOCTYPE 声明。XML 文档通常包含多个子节点：根元素，DOCTYPE 声明，和 processing instructions。

所以，应当使用 `document.documentElement` 来获取根元素，而不是 `document.firstChild`。
:::

## `<input type="password" />` 密码显示和隐藏

```html
<input :type="visible ? 'text' : 'password'" />
```

## 只能输入正整数，且数字不能以0开头

<input type="text" class="u-input" placeholder="请输入" oninput="value=value.replace(/^(0+)|[^\d]+/g,'')" />

```html
<input type="text" placeholder="请输入" oninput="value=value.replace(/^(0+)|[^\d]+/g,'')" />
```

## 只能输入数字和字母，并且小写字母自动转大写

<input type="text" class="u-input" placeholder="请输入" oninput="value=value.toUpperCase().replace(/[\W]/g,'')" />

<style>
.u-input {
  width: 120px;
  border: 1px solid var(--vp-c-text-1);
  border-radius: 5px;
  padding: 0 8px;
}
</style>

```html
<input type="text" placeholder="请输入" oninput="value=value.toUpperCase().replace(/[\W]/g,'')" />
```
