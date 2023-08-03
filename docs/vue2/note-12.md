# Note 12

## [HTMLElement.dataset](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/dataset)

`HTMLElement` 接口的只读属性 `dataset` 提供了对元素上自定义数据属性（`data-*`）读/写访问。它暴露了一个字符串映射（`DOMStringMap`），其中包含每个` data-*` 属性条目。

::: tip 备注：
`dataset` 属性本身可以被读取，但是不能直接写入。相反，所有写入都必须是写入 `dataset` 的单个属性，而 `dataset` 又表示这些数据的属性。
:::
