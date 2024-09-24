# Note 5

## 向DOM树中添加元素（标签）

- [`Node.cloneNode`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/cloneNode)

  `Node.cloneNode()` 方法**返回调用该方法的节点的一个副本**。

### 语法：`var dupNode = node.cloneNode(deep)`

- `node`：将要被克隆的节点
- `dupNode`：克隆生成的副本节点
- `deep`<Tag :bordered="false" color="cyan">可选</Tag>：是否采用深度克隆，如果为 `true`，则**该节点的所有后代节点也都会被克隆**，如果为 `false`，则**只克隆该节点本身**。

  ::: tip 备注：
  **在 DOM4 规范中 (实现于 Gecko 13.0)**，`deep` 是一个可选参数。如果省略的话，参数的默认值为 `true`，也就是说**默认是深度克隆**。如果想**使用浅克隆**，你需要将该参数设置为 `false`。

  **在最新的规范里**，该方法的行为已经改变了，其**默认值变成了 false**。虽然该参数仍旧是可选的，但是你**必须要为该方法设置 deep 参数**，无论是为了向前还是向后兼容考虑。假如开发者没设置参数的话，`Gecko 28.0` 版本的控制台会发出警告。从 `Gecko 29.0` 开始**该方法默认为浅复制而不是深度复制**。
  :::

  ::: tip 附注
  克隆一个元素节点会拷贝它所有的属性以及属性值，当然也就包括了属性上绑定的事件 (比如`onclick="alert(1)"`)，但不会拷贝那些使用`addEventListener()`方法或者`node.onclick = fn`这种用 `JavaScript` **动态绑定的事件**。

  在使用`Node.appendChild()`或其他类似的方法将拷贝的节点添加到文档中之前，那个拷贝节点并不属于当前文档树的一部分，也就是说，它没有父节点。

  如果 `deep` 参数设为 `false`，则**不克隆它的任何子节点**。该**节点所包含的所有文本也不会被克隆**，因为**文本本身也是一个或多个的Text节点**。

  如果 `deep` 参数设为 `true`，则会复制整棵 `DOM` 子树 (包括那些**可能存在的Text子节点**)。对于空结点 (例如 `<img>` 和 `<input>` 元素), 则 `deep` 参数无论设为 `true` 还是设为 `false`，都没有关系，但是仍然需要为它指定一个值。
  :::

- [`Node.appendChild`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/appendChild)

  `Node.appendChild()` 方法将一个节点附加到指定父节点的子节点列表的末尾处。如果将被插入的节点已经存在于当前文档的文档树中，那么 `appendChild()` 只会将它从原先的位置移动到新的位置（不需要事先移除要移动的节点）。

  这意味着，一个节点不可能同时出现在文档的不同位置。所以，如果某个节点已经拥有父节点，在被传递给此方法后，它首先会被移除，再被插入到新的位置。若要保留已在文档中的节点，可以先使用 [`Node.cloneNode()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/cloneNode) 方法来为它创建一个副本，再将副本附加到目标父节点下。请注意，用 `cloneNode` 制作的副本不会自动保持同步。
  如果给定的子节点是 `DocumentFragment`，那么 `DocumentFragment` 的全部内容将转移到指定父节点的子节点列表中。

  - 语法：`element.appendChild(aChild)` // achild：要追加给父节点（通常为一个元素）的节点。
  - 返回值：返回追加后的子节点（`aChild`），除非 `aChild` 是一个文档片段（DocumentFragment），这种情况下将返回空文档片段（`DocumentFragment`）。
  
  示例：

  ```js
  // 创建一个新的段落元素 <p>，然后添加到 <body> 的最尾部
  var p = document.createElement('p')
  document.body.appendChild(p)
  ```

- [`Node.removeChild`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/removeChild)

  `Node.removeChild()` 方法从 `DOM` 中删除一个子节点。返回删除的节点。

  ### 语法

  ```js
  let oldChild = node.removeChild(child)
  // or
  element.removeChild(child)
  ```

  - `child` 是要移除的那个子节点。
  - `node` 是 child 的父节点。
  - `oldChild` 保存对删除的子节点的引用。`oldChild === child`.

- [`Element.remove()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/remove)

  `Element.remove()` 方法，把对象从它所属的 `DOM` 树中删除。

  ### 语法

  ```js
  node.remove()
  ```

  ### 示例

  ```html
  <div id="div-01">Here is div-01</div>
  <div id="div-02">Here is div-02</div>
  <div id="div-03">Here is div-03</div>
  ```

  ```js
  var el = document.getElementById("div-02")
  el.remove() // id 为 'div-02' 的 div 被删掉了
  ```

- [`element.innerHTML`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/innerHTML)（**常用于替换内容**）

  `Element.innerHTML` 属性设置或获取 `HTML` 语法表示的元素的后代

  ::: tip
  备注： 如果一个 `<div>`, `<span>`, 或 `<noembed>` 节点有一个文本子节点，该节点包含字符 (&), (\<), 或 (>), innerHTML 将这些字符分别返回为 &amp;, &lt; 和 &gt;。使用Node.textContent 可获取一个这些文本节点内容的正确副本。
  :::

- [`element.insertAdjacentHTML`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/insertAdjacentHTML)

  `insertAdjacentHTML()` 方法将指定的文本解析为 `Element` 元素，并将结果节点插入到 `DOM` 树中的指定位置。它不会重新解析它正在使用的元素，因此它不会破坏元素内的现有元素。这避免了额外的序列化步骤，使其比直接使用 `innerHTML` 操作更快。

  - 语法：`element.insertAdjacentHTML(position, text);`
  - `position`

    一个 DOMString，表示插入内容相对于元素的位置，并且必须是以下字符串之一：
    - `beforebegin`：元素自身的前面。
    - `afterbegin`：插入元素内部的第一个子节点之前。
    - `beforeend`：插入元素内部的最后一个子节点之后。
    - `afterend`：元素自身的后面。
  - `text`
  
    是要被解析为 HTML 或 XML 元素，并插入到 DOM 树中的 DOMString。

### 位置名称的可视化：

  ```html
  <!-- beforebegin -->
  <p>
    <!-- afterbegin -->
    foo
    <!-- beforeend -->
  </p>
  <!-- afterend -->
  ```

  示例：

  ```js
  // 原为 <div id="one">one</div>
  var d1 = document.getElementById('one');
  d1.insertAdjacentHTML('afterend', '<div id="two">two</div>')
  // 此时，新结构变成：
  // <div id="one">one</div><div id="two">two</div>
  ```

  ::: warning
  安全问题
  使用 `insertAdjacentHTML` 插入用户输入的 `HTML` 内容的时候，需要转义之后才能使用。
  如果只是为了插入文本内容（而不是 `HTML` 节点），不建议使用这个方法，建议使用 `node.textContent` 或者 `node.insertAdjacentText()`。因为这样不需要经过 `HTML` 解释器的转换，性能会好一点。
  :::

- [`Element.insertAdjacentText()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/insertAdjacentText)

  `insertAdjacentText()` 方法将一个给定的文本节点插入在相对于被调用的元素给定的位置。
  句法：element.insertAdjacentText(position, element);

- [`Element.insertAdjacentElement()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/insertAdjacentElement)

  `insertAdjacentElement()` 方法将一个给定的元素节点插入到相对于被调用的元素的给定的一个位置。
  语法：`element.insertAdjacentElement(position, element);`
  参数：
  - `position`

    DOMString 表示相对于该元素的位置；必须是以下字符串之一：
    - `beforebegin`: 在该元素本身的前面。
    - `afterbegin`:只在该元素当中，在该元素第一个子孩子前面。
    - `beforeend`:只在该元素当中，在该元素最后一个子孩子后面。
    - `afterend`: 在该元素本身的后面。

  - `element`
  要插入到树中的元素。
  - 返回值：插入的元素，插入失败则返回 null.
  
  位置名称的可视化展示：

  ```html
  <!-- beforebegin -->
  <p>
  <!-- afterbegin -->
  foo
  <!-- beforeend -->
  </p>
  <!-- afterend -->
  ```

  示例：

  ```js
  beforeBtn.addEventListener('click', function () {
    var tempDiv = document.createElement('div')
    tempDiv.style.backgroundColor = randomColor()
    activeElem.insertAdjacentElement('beforebegin', tempDiv)
    setListener(tempDiv)
  })
  afterBtn.addEventListener('click', function () {
    var tempDiv = document.createElement('div')
    tempDiv.style.backgroundColor = randomColor()
    activeElem.insertAdjacentElement('afterend', tempDiv)
    setListener(tempDiv)
  })
  ```

## [element.innerHTML](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/innerHTML)

`Element.innerHTML` 属性设置或获取 `HTML` 语法表示的元素的后代

如果要向一个元素中插入一段 `HTML`，而不是替换它的内容，那么请使用 `insertAdjacentHTML()` 方法。

- 语法

  ```js
  const content = element.innerHTML
  element.innerHTML = htmlString
  ```

- 值

  `DOMString` 包含元素后代的 `HTML` 序列（可作为 `v-html` 的值）。设置元素的 `innerHTML` 将**会删除所有该元素的后代并以上面给出的 htmlString 替代**。

### 例子

获取一个元素的 `innerHTML` 属性的值

```js
// HTML:
/*
<div id="div">
  <p>Content</p>
  <p>Further Elaborated</p>
</div>
*/
const div = document.getElementById('div')
console.log(div.innerHTML) // '<p>Content</p><p>Further Elaborated</p>'
```

### 替换元素的内容

设置 `innerHTML` 的值可以让你轻松地将当前元素的内容替换为新的内容。
举个例子来说，你可以通过文档 `body` 属性删除 `body` 的全部内容。

```js
document.body.innerHTML = ''
```

下面这个例子，首先获取文档当前的 `HTML` 标记并替换 "`<`" 字符为 `HTML` 实体 "`&lt;`"，从本质上来看，它是将 `HTML` 转换成原始文本，将其包裹在 `<pre>` 元素中。然后 `innerHTML` 的值被替换成新的字符串。最后，**文档的内容被替换为页面显示源码**。

```js
document.documentElement.innerHTML =
  '<pre>' + document.documentElement.innerHTML.replace(/</g, '&lt;') + '</pre>'
```

::: tip 其他
当给 `innerHTML` 设置一个值的时候到底发生了什么？用户代理按照以下步骤：

- 给定的值被解析为 `HTML` 或者 `XML`（取决于文档类型），结果就是 `DocumentFragment` 对象代表元素新设置的 `DOM` 节点。
- 如果元素内容被替换成 `<template>` 元素，`<template>` 元素的 `content` 属性会被替换为步骤 `1` 中创建的新的 `DocumentFragment`
- 对于其他所有元素，元素的内容都被替换为新的 `DocumentFragment` 节点
:::

::: warning
HTML 5 中指定不执行由 innerHTML 插入的 `<script>` 标签。
然而，有很多不依赖 `<script>` 标签去执行 `JavaScript` 的方式。
所以当你使用 `innerHTML` 去设置你无法控制的字符串时，这仍然是一个安全问题。
<br/>例如：<br/>
基于这个原因，**当插入纯文本时，建议不要使用 innerHTML 。取而代之的是使用 [Node.textContent](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/textContent)** ，它**不会把给定的内容解析为 `HTML`，它仅仅是将原始文本插入给定的位置**。
:::

## [element.outerHTML](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/outerHTML)

`element` `DOM` 接口的 `outerHTML` 属性获**取描述元素（包括其后代）的序列化 HTML 片段**。它**也可以设置为用从给定字符串解析的节点替换元素**。

要仅获取元素内容的 `HTML` 表示形式或替换元素的内容，请使用 `innerHTML` 属性

- 语法:

  ```js
  let content = element.outerHTML
  ```

- 返回时，**内容包含描述元素及其后代的序列化 HTML 片段**

  ```js
  element.outerHTML = content
  ```

  将元素替换为通过使用元素的父作为片段解析算法的上下文节点解析字符串内容生成的节点

### 例子

获取一个元素的 `outerHTML` 属性的值

```js
// HTML:
/*
<div id="div">
  <p>Content</p>
  <p>Further Elaborated</p>
</div>
*/
const div = document.getElementById('div')
console.log(div.outerHTML) // '<div id="d"><p>Content</p><p>Further Elaborated</p></div>'
```

## JS表单页监听浏览器返回按键

> 拦截并提示用户，点击确定执行返回，点击取消阻止返回

https://juejin.cn/post/7149236595944587277
https://juejin.cn/post/6844904183121117192
https://developer.mozilla.org/zh-CN/docs/Web/API/Window/popstate_event

::: tip
目前多页面还没有能直接阻止浏览器回退的 API，所以我们可以 hack 一下，利用 pushState 和 popstate 实现效果。

原理：**进入页面时，手动 pushState 一次，此时浏览器记录条目会自动生成一个记录，history 的 length 加 1。接着，监听 popstate 事件，被触发时，出弹窗给用户确认，点取消，则需要再次 pushState 一次以恢复成没有点击前的状态，点确定，则可以手动调用 history.back 即可实现效果**
:::

```js
history.pushState(null, null, window.location.href + '#') // 不会触发 popstate 事件
// 挂载方法
window.addEventListener('popstate', this.popstateFn, true)

popstateFn (event) {
  var confrimFn = confirm('确定需要返回上一级页面')
  console.log('回退', confrimFn)
  if (confrimFn) {
    // 确定，取消监听方法，并返回
    window.removeEventListener('popstate', this.popstateFn, true)
    history.back()
    // setTimeout(() => {
    //   window.addEventListener('popstate', this.popstateFn, true)
    // }, 0)
  } else { // 取消，回退时再向历史记录插入一条，以便阻止下一次点击回退
    history.pushState(null, null, window.location.href + '#')
  }
}
```

## `fetch` 方法

[`fetch()` 参考文档](https://developer.mozilla.org/zh-CN/docs/Web/API/fetch)

> 全局的 fetch() 方法用于发起获取资源的请求。它返回一个 promise，这个 promise 会在请求响应后被 resolve，并传回 Response 对象。

```js
// 本网站首页标签即使用 fetch() 获取远程 github 项目的版本号
function fetchVersion () {
  return fetch('https://api.github.com/repos/themusecatcher/front-end-notes/contents/package.json?ref=master', {
    headers: {
      // See https://docs.github.com/en/rest/overview/media-types
      Accept: 'application/vnd.github.v3.raw',
      // See https://docs.github.com/en/rest/guides/getting-started-with-the-rest-api#authentication
      // Authorization: 'token ${GITHUB_TOKEN}',
    }
  }).then(res => res.json())
    .then(json => json.version ?? '')
    .then(version => {
      if (!version) return
      const tagLineParagragh = document.querySelector('div.VPHero.has-image.VPHomeHero > div > div.main > p.tagline')
      const docsVersionSpan = document.createElement('samp')
      docsVersionSpan.classList.add('version-tag')
      docsVersionSpan.innerText = version
      tagLineParagragh?.appendChild(docsVersionSpan)
    })
}
```
