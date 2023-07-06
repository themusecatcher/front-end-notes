# Note 10

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
  - `start` <Badge type="tip" text="可选" />
    代表 Blob 里的下标，表示第一个会被会被拷贝进新的 `Blob` 的字节的起始位置。如果你传入的是一个负数，那么这个偏移量将会从数据的末尾从后到前开始计算。举例来说，-10 将会是 `Blob` 的倒数第十个字节。它的默认值是 0，如果你传入的 start 的长度大于源 `Blob` 的长度，那么返回的将会是一个长度为 0 并且不包含任何数据的一个 `Blob` 对象。
  - `end` <Badge type="tip" text="可选" />
    代表的是 `Blob` 的一个下标，这个下标 -1 的对应的字节将会是被拷贝进新的`Blob` 的最后一个字节。如果你传入了一个负数，那么这个偏移量将会从数据的末尾从后到前开始计算。举例来说， -10 将会是 `Blob` 的倒数第十个字节。它的默认值就是它的原始长度 (size).
  - `contentType` <Badge type="tip" text="可选" />
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

## CSS `object-fit` 属性

[`object-fit` 参考文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/object-position)

> `object-fit` 属性指定元素的内容应该如何去适应指定容器的高度与宽度。<br>`object-fit` 一般用于 `img` 和 `video` 标签，一般可以对这些元素进行保留原始比例的剪切、缩放或者直接进行拉伸等。

您可以通过使用 `object-position` 属性来切换被替换元素的内容对象在元素框内的对齐方式。

值 | 描述
-- | --
`fill` | 默认，**不保证保持原有的比例，内容拉伸填充整个内容容器**。
`contain` | **保持原有尺寸比例。内容被缩放**。
`cover` | **保持原有尺寸比例。但部分内容可能被剪切**。
`none` | **保留原有元素内容的长度和宽度**，也就是说内容不会被重置。
`scale-down` | **保持原有尺寸比例**。内容的尺寸与 `none` 或 `contain` 中的一个相同，取决于它们两个之间谁得到的对象尺寸会更小一些。

> `object-position`：属性一般与 `object-fit` 一起使用，用来设置元素的位置。<br>`object-position`： 一般用于 `img` 和 `video` 标签。

值 | 描述
-- | --
`position` | 指定 `image` 或 `video` 在容器中的位置。**第一个值为 x 坐标位置的值，第二个值为 y 坐标位置的值**。

表示的方式有：

```less
object-position: 50% 50%; // 即水平垂直居中
object-position: right top;
object-position: left bottom; // center center
object-position: 250px 125px;
```

## 引入并使用特定字体

```html
<p class="u-font">字体</p>
```

```css
.u-head {
  font-family: SourceHanSerifCN;
  font-size: 28px;
  font-weight: 600;
  color: #333333;
  line-height: 40px;
}
@font-face {
  font-family: SourceHanSerifCN;
  src: url(~@/assets/fonts/SourceHanSerifCN-SemiBold.otf);
}
```

::: tip
浏览器支持：
**Internet Explorer 9，Firefox，Opera，Chrome, 和 Safari 支持 @font-face 规则.**

但是, Internet Explorer 9 只支持 .eot 类型的字体, Firefox, Chrome, Safari, 和 Opera 支持 .ttf 与.otf 两种类型字体.
注意： Internet Explorer 8 及更早IE版本不支持 @font-face 规则.
:::

## `box-sizing` 属性

CSS3 `box-sizing` 属性可以设置 `width` 和 `height` 属性中是否包含了 `padding`(内边距) 和 `border`(边框)。

语法：`box-sizing: content-box|border-box|inherit`

值 | 说明
-- | --
`content-box` | 这是 CSS2.1 指定的宽度和高度的行为。指定元素的宽度和高度（最小/最大属性）适用于 `box` 的宽度和高度。元素的填充和边框布局和绘制指定宽度和高度除外
`border-box` | 指定宽度和高度（最小/最大属性）确定元素边框。也就是说，对元素指定宽度和高度包括了 `padding` 和 `border` 。通过从已设定的宽度和高度分别减去边框和内边距才能得到内容的宽度和高度。
`inherit` | 指定 `box-sizing` 属性的值，应该从父元素继承

::: tip
不使用 CSS3 `box-sizing` 属性

默认情况下，元素的宽度与高度计算方式如下：

- **元素实际宽度 = width(宽) + padding(内边距) + border(边框)**
- **元素实际高度 = height(高) + padding(内边距) + border(边框)**
:::

## Vue登录后，无操作半小时后自动清除登录状态

> 在项目的页面入口文件 `App.vue` 文件中监听用户最后一次操作鼠标、键盘或滚动事件

```js
import storage from 'store'
computed: {
  token () {
    return storage.get('TOKEN')
  },
  uid () {
    return storage.get('UID')
  },
  userInfo () {
    return storage.get('USER_INFO')
  }
},
mounted () { // 使用防抖debounce，对于短时间内连续触发的事件（上面的滚动事件），防抖就是让某个时间期限（如上面的1000毫秒）内，事件处理函数只执行一次
  document.onmousemove = this.debounce(this.resetStatus, 3000)
  document.onkeydown = this.debounce(this.resetStatus, 3000)
  document.onscroll = this.debounce(this.resetStatus, 3000)
},
methods: {
  debounce (fn, delay) {
    let timer = null
    return function () {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(fn, delay)
    }
  },
  resetStatus () {
    if (this.token) {
      storage.set('TOKEN', this.token, new Date().getTime() + 30 * 60 * 1000)
      storage.set('UID', this.uid, new Date().getTime() + 30 * 60 * 1000)
      storage.set('USER_INFO', this.userInfo, new Date().getTime() + 30 * 60 * 1000)
    }
  }
}
```
