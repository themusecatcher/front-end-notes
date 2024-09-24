# Note 1

## 非CJK脚本的换行规则 <Tag :bordered="false" color="magenta">长字母和数字</Tag>

*CJK脚本是中国，日本和韩国（"中日韩"）脚本*

- `word-wrap` 已更名为 `overflow-wrap`，属性：允许长的内容可以自动换行。应用于行级元素，用来设置浏览器是否应该在一个本来不能断开的字符串中插入换行符，以防止文本溢出其行向盒。
- `word-break`<Tag :bordered="false" color="cyan">推荐</Tag> 属性：指定非CJK脚本的换行规则。

```css
.content {
  text-align: justify;
  overflow: hidden;
  word-break: break-all; // 对于 non-CJK (CJK 指中文/日文/韩文) 文本，可在任意字符间断行
  overflow-wrap: break-word; // 在长单词或 URL 地址内部进行换行，其中单词会另起一行换行
}
```

## 题目和题干类样式

```html
<div class="m-ques">
  <p class="u-head">题目1：</p>
  <p class="u-info">题干内容，题干内容，题干内容…</p>
</div>
```

- 使用 `calc()`

```less
.m-ques {
  // width: 240px;
  width: 100%;
  font-size: 16px;
  color: #333;
  line-height: 24px;
  min-height: 24px; // 防止多题目，内容为空时样式塌陷
  .u-head {
    width: 48px;
  }
  .u-info {
    margin-top: -24px;
    margin-left: 48px;
    width: calc(100% - 48px);
  }
}
```

- 使用 `display: flex; flex-shrink: 0;` <Tag :bordered="false" color="cyan">推荐</Tag>

*`flex-shrink` 属性指定了 flex 元素的收缩规则。flex 元素仅在默认宽度之和大于容器的时候才会发生收缩，其收缩的大小是依据 `flex-shrink` 的值。*

*如果所有项目的 `flex-shrink` 属性都为1，当空间不足时，都将等比例缩小*

*如果一个项目的 `flex-shrink` 属性为0，其他项目都为1，则空间不足时，前者不缩小。*

```less
.m-ques {
  display: flex;
  font-size: 16px;
  color: #333;
  line-height: 24px;
  .u-head {
    flex-shrink: 0; // 该项目不缩小。默认1. 即空间不足时，项目将缩小
  }
}
```

- 使用 `display: inline-block`

```less
.m-ques {
  width: 600px;
  .u-head {
    display: inline-block;
    width: 20px;
    vertical-align: top;
  }
  .u-info {
    display: inline-block;
    max-width: 580px;
  }
}
```

## 等边三角形

```html
<div class="triangle"></div>
```

```less
.triangle { // 等边三角形
  display: inline-block;
  height: 0;
  width: 0;
  border-bottom: calc(50px * sqrt(3)) solid @themeColor;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
}
```

## CSS函数

`calc()` 函数用于动态计算长度值:

- 运算符前后都需要保留一个空格，例如：`width: calc(100% - 10px);`
- 任何长度值都可以使用 `calc()` 函数进行计算；
- `calc()` 函数支持 "+", "-", "*", "/" 运算；
- `calc()` 函数使用标准的数学运算优先级规则；

## CSS3 filter（滤镜）属性

*filter 属性定义了元素(通常是`<img>`)的可视效果(例如：模糊与饱和度)*

```html
<img src="pineapple.jpg" alt="Pineapple" width="300" height="300"/>
```

语法：

```css
filter: none | blur() | brightness() | contrast() | drop-shadow() | grayscale() | hue-rotate() | invert() | opacity() | saturate() | sepia() | url();
```

- 使用高斯模糊效果：

```css
img {
  -webkit-filter: blur(5px); /* Chrome, Safari, Opera */
  filter: blur(5px);
}
```

- 使图片变亮:

```css
img {
  -webkit-filter: brightness(200%); /* Chrome, Safari, Opera */
  filter: brightness(200%);
}
```

- 调整图像的对比度:

```css
img {
  -webkit-filter: contrast(200%); /* Chrome, Safari, Opera */
  filter: contrast(200%);
}
```

- 设置一个阴影效果:

```css
img {
  -webkit-filter: drop-shadow(8px 8px 10px red); /* Chrome, Safari, Opera */
  filter: drop-shadow(8px 8px 10px red);
}
```

- 将图像转换为灰度图像:

```css
img {
  -webkit-filter: grayscale(50%); /* Chrome, Safari, Opera */
  filter: grayscale(50%);
}
```

- 转化图像的透明程度:

```css
img {
  -webkit-filter: opacity(30%); /* Chrome, Safari, Opera */
  filter: opacity(30%);
}
```

- 转换图像饱和度:

```css
img {
  -webkit-filter: saturate(800%); /* Chrome, Safari, Opera */
  filter: saturate(800%);
}
```

- 使用多个滤镜，每个滤镜使用空格分隔：

*注意: 顺序是非常重要的 (例如使用 grayscale() 后再使用 sepia()将产生一个完整的灰度图片)。*

```css
img {
  -webkit-filter: contrast(200%) brightness(150%);  /* Chrome, Safari, Opera */
  filter: contrast(200%) brightness(150%);
}
```

## CSS `writing-mode` 属性

定义了文本在水平或垂直方向上如何排布

```css
.u-font {
  writing-mode: vertical-rl;
  -webkit-writing-mode: vertical-rl;
  -ms-writing-mode: vertical-rl;
}
```

*语法格式如下：writing-mode: horizontal-tb | vertical-rl | vertical-lr | sideways-rl | sideways-lr*

- `horizontal-tb`：水平方向自上而下的书写方式。即 `left-right-top-bottom`
- `vertical-rl`：垂直方向自右而左的书写方式。即 `top-bottom-right-left`
- `vertical-lr`：垂直方向内内容从上到下，水平方向从左到右
- `sideways-rl`：内容垂直方向从上到下排列
- `sideways-lr`：内容垂直方向从下到上排列

## 文本溢出显示省略号

```html
<p class="u-text" :title="title">{{ title }}</p>
```

```css
/* 单行文本溢出，多行文本无效 */
.u-text {
  width: 480px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

```html
<p class="u-text">{{ text }}</p>
```

```css
/* 多行文本溢出 */
.u-text {
  width: 480px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
```

## CSS变量

- 在CSS中定义变量：
  1. 定义全局变量：

  ```css
  :root {
    --themeColor: #3A79EE;
  }
  ```
  
  2. 定义某元素下的变量：

  ```css
  .m-main-area {
  `--themeColor: #3A79EE;
  }
  ```

  3. 定义媒体查询下的变量：

  ```css
  @media screen and (min-width: 1000px) {
    :root {
      --themeColor: #3A79EE;
    }
  }
  ```

  使用：

  ```css
  .m-theme {
    background: var(--themeColor);
  }
  ```

- 在 `less` 中定义变量：

  定义：

  ```less
  @themeColor: #3A79EE;
  ```

  使用：

  ```less
  .m-theme {
    // background: var(@themeColor);
    background: @themeColor;
  }
  ```

- 在`sass` 中定义变量：

  定义：

  ```sass
  $themeColor: #3A79EE;
  ```
  
  使用：

  ```sass
  .m-theme {
    background: var($themeColor);
  }
  ```
  