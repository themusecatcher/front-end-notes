# Note 20

<BackTop />

## [storage 事件](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/storage_event)

当存储区域（`localStorage` 或 `sessionStorage`）被修改时，将触发 `storage` 事件。查看 [Web Storage API](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Storage_API) 来获取更多信息。

### 常规信息

- 接口: `StorageEvent`
- 是否冒泡: `No`
- 目标: `DefaultView` (`<window>`)
- 默认行为: 无

### 属性

| Property | Type | Description |
| :--- | :--- | :--- |
| `target` <Tag :bordered="false" color="cyan">只读</Tag> | `EventTarget` | 事件目标 (`DOM` 树中的最大目标) |
| `type` <Tag :bordered="false" color="cyan">只读</Tag> | `DOMString` | 事件的类型 |
| `bubbles` <Tag :bordered="false" color="cyan">只读</Tag> | `Boolean` | 事件通常是否会出现冒泡 |
| `cancelable` <Tag :bordered="false" color="cyan">只读</Tag> | `Boolean` | 事件是否可取消 |
| `key` <Tag :bordered="false" color="cyan">只读</Tag> | `DOMString (string)` | 键更改时 |
| `oldValue` <Tag :bordered="false" color="cyan">只读</Tag> | `DOMString (string)` | 正在更改键的旧值 |
| `newValue` <Tag :bordered="false" color="cyan">只读</Tag> | `DOMString (string)` | 正在更改键的新值 |
| `url` <Tag :bordered="false" color="cyan">只读</Tag> | `DOMString (string)` | 键更改的文档的地址 |
| `storageArea` <Tag :bordered="false" color="cyan">只读</Tag> | `Storage` | 受影响的存储对象 |