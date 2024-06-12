# Note 6

## 上传文件

[`FileReader` 参考文档](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader)

> `FileReader` 对象允许 Web 应用程序异步读取存储在用户计算机上的文件（或原始数据缓冲区）的内容，使用 `File` 或 `Blob` 对象指定要读取的文件或数据。

### `FileReader` 方法

方法 | 说明
-- | --
`readAsArrayBuffer()` | 开始读取指定的 Blob中的内容，一旦完成，result 属性中保存的将是被读取文件的 ArrayBuffer 数据对象。
`readAsBinaryString()` | 开始读取指定的Blob中的内容。一旦完成，result属性中将包含所读取文件的原始二进制数据。
`readAsDataURL()` | 开始读取指定的Blob中的内容。一旦完成，result属性中将包含一个data: URL 格式的 Base64 字符串以表示所读取文件的内容。
`readAsText()` | 开始读取指定的Blob中的内容。一旦完成，result属性中将包含一个字符串以表示所读取的文件内容。

> `Blob` 对象表示一个不可变、原始数据的类文件对象。它的数据可以按文本或二进制的格式进行读取，也可以转换成 ReadableStream 来用于数据操作。

[`Blob` 参考文档](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob)

- `Blob.slice()` 用于创建一个包含源 Blob的指定字节范围内的数据的新 Blob 对象

  语法：`var blob = instanceOfBlob.slice([start [, end [, contentType]]]};`
  
  参数：
  - `start` <Tag :bordered="false" color="cyan">可选</Tag>
    代表 Blob 里的下标，表示第一个会被会被拷贝进新的 `Blob` 的字节的起始位置。如果你传入的是一个负数，那么这个偏移量将会从数据的末尾从后到前开始计算。举例来说，-10 将会是 `Blob` 的倒数第十个字节。它的默认值是 0，如果你传入的 start 的长度大于源 `Blob` 的长度，那么返回的将会是一个长度为 0 并且不包含任何数据的一个 `Blob` 对象。
  - `end` <Tag :bordered="false" color="cyan">可选</Tag>
    代表的是 `Blob` 的一个下标，这个下标 -1 的对应的字节将会是被拷贝进新的`Blob` 的最后一个字节。如果你传入了一个负数，那么这个偏移量将会从数据的末尾从后到前开始计算。举例来说， -10 将会是 `Blob` 的倒数第十个字节。它的默认值就是它的原始长度 (size).
  - `contentType` <Tag :bordered="false" color="cyan">可选</Tag>
    给新的 `Blob` 赋予一个新的文档类型。这将会把它的 type 属性设为被传入的值。它的默认值是一个空的字符串。
  返回值：一个新的 `Blob` 对象，它包含了原始 `Blob` 对象的某一个段的数据。

[`File` 参考文档](https://developer.mozilla.org/zh-CN/docs/Web/API/File)

- `File`文件（File）接口提供有关文件的信息，并允许网页中的 JavaScript 访问其内容。
  
  File 接口没有定义任何方法，但是它从 `Blob` 接口继承了以下方法：
  `Blob.slice([start[, end[, contentType]]])`
  
  返回一个新的 `Blob` 对象，它包含有源 `Blob` 对象中指定范围内的数据。

1. 以 `base64` 字符串上传（`FileReader`获取文件的 `base64` 字符串）

[`accept` 文件类型文档](https://www.w3school.com.cn/media/media_mimeref.asp)

```html
<input
  ref="upload"
  type="file"
  accept="image/*,application/pdf"
  @change="uploadFile($event.target.files)"
  style="display: none;" />
<!-- 普通点击上传 -->
<div @click="$refs.upload.click()" class="u-upload">选择文件</div>
```

```less
.u-upload {
  line-height: 32px;
  width: 100px;
  height: 32px;
  border-radius: 3px;
  color: #333;
  background: #DDDDDD;
  cursor: pointer;
  border: 1px solid #CCCCCC;
  &:hover {
    opacity: 0.8;
  }
}
```

```html
<!-- 拖动文件上传 -->
<div v-show="!preImg" @click="$refs.upload.click()" ref="dragUpload" class="m-upload">
  <img src="@/assets/images/add-upload.svg" class="u-upload" />
  <div class="assist"></div>
</div>
```

```less
.m-upload {
  position: relative;
  display: inline-block;
  width: 98px;
  height: 98px;
  background: #FFFFFF;
  border: 1px dashed #D1D1D1;
  text-align: center;
  cursor: pointer;
  .u-upload { // 垂直居中
    width: 20px;
    height: 20px;
    display: inline-block;
    vertical-align: middle;
  }
  .assist { // 垂直居中辅助元素
    height: 100%;
    width: 0;
    display: inline-block;
    vertical-align: middle;
  }
}
```

```js
mounted () {
  // 将ref为dragUpload的元素变成drop区域
  this.$refs.dragUpload.addEventListener('dragenter', this.dragenter, false)
  this.$refs.dragUpload.addEventListener('dragover', this.dragover, false)
  this.$refs.dragUpload.addEventListener('drop', this.drop, false)
}
dragenter (e) {
  e.stopPropagation()
  e.preventDefault()
  this.$once('hook:beforeDestroy', function () {
    removeEventListener('dragenter', this.dragenter)
  })
}
dragover (e) {
  e.stopPropagation()
  e.preventDefault()
  this.$once('hook:beforeDestroy', function () {
    removeEventListener('dragover', this.dragover)
  })
}
drop (e) { // 拖拽上传方法
  e.stopPropagation()
  e.preventDefault()
  const files = e.dataTransfer.files
  this.uploadFile(files)
  this.$once('hook:beforeDestroy', function () {
    removeEventListener('drop', this.drop)
  })
}
uploadFile (files) { // 统一上传文件方法
  console.log('开始上传 upload-event files:', files)
  if (files.length) {
    var reader = new FileReader()
    // reader.readAsBinaryString(files[0])
    reader.readAsDataURL(files[0]) // 以base64方式读取文件内容
    reader.onloadstart = function (e) { // 当读取操作开始时触发
      const fileSize = e.total
      if (fileSize > 1024 * 500) { // 大于500KB时取消上传
        reader.abort()
      } else {
        console.log('开始读取 onloadstart:', e)
      }
    }
    reader.onabort = function (e) { // 当读取操作被中断时触发
      console.log('读取中止 onabort:', e)
    }
    reader.onerror = function (e) { // 当读取操作发生错误时触发
      console.log('读取错误 onerror:', e)
    }
    reader.onprogress = function (e) { // 在读取Blob时触发，读取上传进度，50ms左右调用一次
      console.log('读取中 onprogress:', e)
      console.log('已读取:', Math.ceil(e.loaded / e.total * 100) + '%')
    }
    const that = this
    reader.onload = function (e) { // 当读取操作成功完成时调用
      console.log('读取成功 onload:', e)
      // 该文件的base64数据，前端可直接用来展示图片
      // that.preImg = e.target.result
      // 若使用<img id="img">标签展示图片，可直接赋值src属性
      // document.getElementById('img').src = e.target.result
      // 调用上传接口，上传base64格式的文件数据
      const fileType = files[0].type.slice(files[0].type.indexOf('/') + 1)
      var formData = {
        uploadFile: e.target.result,
        fileFormat: fileType
      }
      console.log('提交数据:', formData)
      upload(formData).then(res => {
        console.log('upload-res:', res)
        if (res.message.code === 0) {
          that.fileUrl = res.data.url
        }
      }).finally(() => {
        // input的change事件默认保存上一次input的value值，同一value值(根据文件路径判断)在上传时不重新加载
        that.$refs.upload.value = ''
      })
    }
    reader.onloadend = function (e) { // 当读取操作结束时触发（要么成功，要么失败）触发
      console.log('读取结束 onloadend:', e)
    }
  }
}
```

2. 以二进制文件流上传（**使用FormData()，模拟form表单提交**）

[`FormData` 参考文档](https://developer.mozilla.org/zh-CN/docs/Web/API/FormData)

`FormData` 接口提供了一种表示表单数据的键值对 `key/value` 的构造方式，并且可以轻松的将数据通过 `XMLHttpRequest.send()` 方法发送出去，本接口和此方法都相当简单直接。如果送出时的编码类型被设为 `"multipart/form-data"`，它会使用和表单一样的格式。
实现了 `FormData` 接口的对象可以直接在 `for...of` 结构中使用，而不需要调用 `entries()` : `for (var p of myFormData)` 的作用和 `for (var p of myFormData.entries())` 是相同的。

### `FormData` 方法

方法 | 说明
-- | --
`FormData.append()` | 向 `FormData` 中添加新的属性值，`FormData` 对应的属性值存在也不会覆盖原值，而是新增一个值，如果属性不存在则新增一项属性值。
`FormData.delete()` | 从 `FormData` 对象里面删除一个键值对。
`FormData.entries()` | 返回一个包含所有键值对的 `iterator` 对象。
`FormData.get()` | 返回在 `FormData` 对象中与给定键关联的第一个值。
`FormData.getAll()` | 返回一个包含 `FormData` 对象中与给定键关联的所有值的数组。
`FormData.has()` | 返回一个布尔值表明 `FormData` 对象是否包含某些键。
`FormData.keys()` | 返回一个包含所有键的 `iterator` 对象。
`FormData.set()` | 给 `FormData` 设置属性值，如果 `FormData` 对应的属性值存在则覆盖原值，否则新增一项属性值。
`FormData.values()` | 返回一个包含所有值的 `iterator` 对象。

```js
uploadFile (files) {
  console.log('开始上传 upload-event files:', files)
  if (files.length) {
    const file = files[0]
    if (file.size > 50 * 1024) { // 校验文件大小
      this.content = '文件大小不能超过500KB'
      this.showTip = true
    } else {
      const fileType = file.type.slice(file.type.indexOf('/') + 1)
      var formData = new FormData()
      formData.set('uploadFile', file)
      formData.set('fileFormat', fileType)
      // 调用接口上传文件
      upload(formData).then(res => {
        console.log('upload-res:', res)
        if (res.message.code === 0) {
          this.fileUrl = res.data.url
        }
      }).finally(() => {
        this.$refs.upload.value = ''
      })
    }
  }
}
```

## `Image()` 对象

[`Image()` 参考文档](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLImageElement/Image)

> `Image()` 函数将会创建一个新的HTMLImageElement实例。<br>它的功能等价于：document.createElement('img')

- 语法：`Image(width, height)`
- 参数：

  `width`：图片的宽度 (即 `width` 属性)

  `height`：图片的高度 (即 `height` 属性)

  示例：

  ```js
  var myImage = new Image(100, 200)
  myImage.src = 'picture.jpg'
  document.body.appendChild(myImage)
  ```

## [`MutationObserver`](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver)监听DOM变化

> MutationObserver 接口提供了监视对 DOM 树所做更改的能力。它被设计为旧的 Mutation Events 功能的替代品，该功能是 DOM3 Events 规范的一部分

### 构造函数

-`MutationObserver()`：创建并返回一个新的 `MutationObserver` 它会**在指定的 DOM 发生变化时被调用**

### 方法

- [`disconnect()`](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver/disconnect): 阻止 MutationObserver 实例继续接收的通知，直到再次调用其 `observe()` 方法，该观察者对象包含的回调函数都不会再被调用。
- [`observe()`](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver/observe): 配置 `MutationObserver` 在 `DOM` 更改匹配给定选项时，通过其回调函数开始接收通知。
  - 语法：

    ```js
    var observer = new MutationObserver(callback);
    ```

  - 参数：

    - `target`: `DOM` 树中的一个要观察变化的 `DOM Node` (可能是一个 `Element`)，或者是被观察的子节点树的根节点。
    - `options`: 此对象的配置项描述了 `DOM` 的哪些变化应该报告给 `MutationObserver` 的 `callback`。当调用 `observe()` 时，`childList`、`attributes` 和 `characterData` 中，**必须有一个参数为 true**。否则会抛出 `TypeError` 异常。
    `options` 的属性如下：
      - `subtree` <Tag :bordered="false" color="cyan">可选</Tag>

        当为 `true` 时，将会监听以 `target` 为根节点的整个子树。包括子树中所有节点的属性，而不仅仅是针对 `target`。默认值为 `false`。

      - `childList` <Tag :bordered="false" color="cyan">可选</Tag>

        当为 `true` 时，监听 `target` 节点中发生的节点的新增与删除（同时，如果 `subtree` 为 `true`，会针对整个子树生效）。默认值为 `false`。

      - `attributes` <Tag :bordered="false" color="cyan">可选</Tag>

        当为 `true` 时观察所有监听的节点属性值的变化。默认值为 `true`，当声明了 `attributeFilter` 或 `attributeOldValue`，默认值则为 `false`。

      - `attributeFilter` <Tag :bordered="false" color="cyan">可选</Tag>

        一个用于声明哪些属性名会被监听的数组。如果不声明该属性，所有属性的变化都将触发通知。

      - `attributeOldValue` <Tag :bordered="false" color="cyan">可选</Tag>

        当为 `true` 时，记录上一次被监听的节点的属性变化；可查阅监听属性值了解关于观察属性变化和属性值记录的详情。默认值为 `false`。

      - `characterData` <Tag :bordered="false" color="cyan">可选</Tag>

        当为 `true` 时，监听声明的 `target` 节点上所有字符的变化。默认值为 `true`，如果声明了 `characterDataOldValue`，默认值则为 `false`

      - `characterDataOldValue` <Tag :bordered="false" color="cyan">可选</Tag>

        当为 `true` 时，记录前一个被监听的节点中发生的文本变化。默认值为 `false`

  - 返回值

    `undefined`。

- [`takeRecords()`](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver/takeRecords): 从 `MutationObserver` 的通知队列中删除所有待处理的通知，并将它们返回到 `MutationRecord` 对象的新 `Array` 中。

### 示例

```vue
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
const textarea = ref()
const observer = ref()
onMounted(() => {
  // 观察器的配置（需要观察什么变动）
  const config = { attributes: true, childList: false, subtree: false }
  // 创建一个观察器实例并传入回调函数
  observer.value = new MutationObserver(callback)
  // 以上述配置开始观察目标节点
  observer.value.observe(textarea.value, config)
})
onUnmounted(() => {
  // 之后，可停止观察
  observer.value.disconnect()
})
/*
  例如：使用 MutationObserver 监听 textarea resize 时的高度属性变化
  参考文档：https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver
*/
// 当观察到变动时执行的回调函数
const callback = function (mutationsList: any, observer: any) {
  console.log('mutation', textarea.value.scrollHeight)
  // Use traditional 'for loops' for IE 11
  // for(let mutation of mutationsList) {
  //   if (mutation.type === 'childList') {
  //     console.log('A child node has been added or removed.')
  //   }
  //   if (mutation.type === 'attributes') {
  //     console.log('The ' + mutation.attributeName + ' attribute was modified.')
  //     console.log(mutation.target.style.height)
  //   }
  // }
}
</script>
<template>
  <textarea ref="textarea" />
</template>
```

## [`IntersectionObserver`](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver)监听元素交叉状态变化

`IntersectionObserver` 接口（从属于 `Intersection Observer` API）提供了一种**异步观察目标元素与其祖先元素或顶级文档视口（viewport）交叉状态**的方法。其**祖先元素**或**视口**被称为**根（root）**。

当一个 `IntersectionObserver` 对象被创建时，其被配置为监听根中一段给定比例的可见区域。一旦 `IntersectionObserver` 被创建，则无法更改其配置，所以**一个给定的观察者对象只能用来监听可见区域的特定变化值**；然而，你**可以在同一个观察者对象中配置监听多个目标元素**。

### 构造函数

`IntersectionObserver()`: 创建一个新的 `IntersectionObserver` 对象，当其监听到目标元素的可见部分（的比例）超过了一个或多个阈值（`threshold`）时，会执行指定的回调函数。
如果指定 `rootMargin` 则会检查其是否符合语法规定，检查阈值以确保全部在 `0.0` 到 `1.0` 之间，并且阈值列表会按升序排列。如果阈值列表为空，则默认为一个 `[0.0]` 的数组。

- 语法

  ```js
  var observer = new IntersectionObserver(callback[, options])
  ```

- 参数
  - `callback`: 当元素可见比例超过指定阈值后，会调用一个回调函数，此回调函数接受两个参数：
    - `entries`: 一个 `IntersectionObserverEntry` 对象的数组，每个被触发的阈值，都或多或少与指定阈值有偏差。
    - `observer`: 被调用的 `IntersectionObserver` 实例。
  - `options` <Tag :bordered="false" color="cyan">可选</Tag>: 一个可以用来配置 `observer` 实例的对象。如果 `options` 未指定，`observer` 实例默认使用文档视口作为 `root`，并且没有 `margin`，阈值为 `0%`（意味着即使一像素的改变都会触发回调函数）。你可以指定以下配置：
    - `root`: 监听元素的祖先元素 `Element` 对象，其边界盒将被视作视口。目标在根的可见区域的任何不可见部分都会被视为不可见。
    - `rootMargin`: 一个在计算交叉值时添加至根的边界盒 (bounding_box) 中的一组偏移量，类型为字符串 (string) ，可以有效的缩小或扩大根的判定范围从而满足计算需要。语法大致和 `CSS` 中的 `margin` 属性等同; 可以参考 `intersection root` 和 `root margin` 来深入了解 `margin` 的工作原理及其语法。默认值是"`0px 0px 0px 0px`"。
    - `threshold`: 规定了一个监听目标与边界盒交叉区域的比例值，可以是一个具体的数值或是一组 `0.0` 到 `1.0` 之间的数组。若指定值为 `0.0`，则意味着监听元素即使与根有 `1` 像素交叉，此元素也会被视为可见。若指定值为 `1.0`，则意味着整个元素都在可见范围内时才算可见。可以参考阈值来深入了解阈值是如何使用的。阈值的默认值为 `0.0`。
- 返回值
  一个可以使用规定阈值监听目标元素可见部分与 `root` 交叉状况的新的 `IntersectionObserver` 实例。调用自身的 `observe()` 方法开始使用规定的阈值监听指定目标。

### 实例属性

- `IntersectionObserver.root` <Tag :bordered="false" color="cyan">只读</Tag>
  测试交叉时，用作边界盒的元素或文档。如果构造函数未传入 `root` 或其值为 `null`，则**默认使用顶级文档的视口**。

- `IntersectionObserver.rootMargin` <Tag :bordered="false" color="cyan">只读</Tag>
  计算交叉时添加到根边界盒的矩形偏移量，可以有效的缩小或扩大根的判定范围从而满足计算需要。此属性返回的值可能与调用构造函数时指定的值不同，因此可能需要更改该值，以匹配内部要求。所有的偏移量均可用像素（**px**）或百分比（**%**）来表达，默认值为“`0px 0px 0px 0px`”。

- `IntersectionObserver.thresholds` <Tag :bordered="false" color="cyan">只读</Tag>
  一个包含阈值的列表，按升序排列，列表中的每个阈值都是监听对象的交叉区域与边界区域的比率。**当监听对象的任何阈值被越过时，都会生成一个通知**（`Notification`）。如果构造器未传入值，则默认值为 `0`。

### 实例方法

- `IntersectionObserver.disconnect()`: 使 `IntersectionObserver` 对象停止监听目标。
- `IntersectionObserver.observe()`: 使 `IntersectionObserver` 开始监听一个目标元素。
- `IntersectionObserver.takeRecords()`: 返回所有观察目标的 `IntersectionObserverEntry` 对象数组。
- `IntersectionObserver.unobserve()`: 使 `IntersectionObserver` 停止监听特定目标元素。

### 示例

```js
const intersectionObserver = new IntersectionObserver((entries) => {
  // 如果 intersectionRatio 为 0，则目标在视野外，
  // 我们不需要做任何事情。
  if (entries[0].intersectionRatio <= 0) return

  loadItems(10)
  console.log("Loaded new items")
})
// 开始监听
intersectionObserver.observe(document.querySelector(".scrollerFooter"))
```

```ts
if ('IntersectionObserver' in window) {
  console.log('window:', window.IntersectionObserver)
  const observer = new IntersectionObserver(entries => {
    console.log('entries:', entries)
    entries.forEach(entry => {
      console.log('entryRatio:', entry.intersectionRatio)
      if (entry.intersectionRatio > 0) { // 如果元素可见
        loadImage()
      }
    })
  }, { threshold: [0, 1] }) // 第二个参数threshold默认为[0]，即交叉比例（intersectionRatio）达到0时触发回调函数，[0, 1]表示，当目标元素达到0%，100%可见时，触发回调函数
  // 监听多个元素
  const nodes = document.querySelectorAll('#about') // NodeList数组
  console.log('nodes:', nodes)
  nodes.forEach(node => {
    observer.observe(node)
    console.log('node:', node)
  })
  // 监听单个元素
  const map = document.getElementById('#map') // 获取元素，等价于this.$refs.map
  observer.observe(map) // 监听map对应的元素
}
```
