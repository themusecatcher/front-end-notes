# Note 5

## `console` 对象

[console MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/console)

- `console.log()`
  对象占位符：`%o` 或 `%O`
  - 当打印普通的 `object` 对象时没有区别
  - 当打印 `DOM` 对象时

    ```html
    <div ref="slider"></div>
    ```

    - `%o`

    ```js
    console.log('%o', this.$refs.slider)
    ```

    ![Alt text](image-10.png)

    - `%O`

    ```js
    console.log('%O', this.$refs.slider)
    ```

    ![Alt text](image-11.png)

## js中 `href` 属性中变量连接符需要使用 `&amp;`

```js
href = '/user/login?type=0&amp;tab=-1'
this.$router.push('/register?type=0&tab=-1')
```

## CSS网格排列布局

- [`display: grid;`](https://www.runoob.com/cssref/css-pr-grid.html)

```html
<div class="m-area">
  <div class="m-card" v-for="(data, index) in cardData" :key="index"></div>
</div>
```

```less
.m-area {
  width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 360px 360px 360px; // 列宽度，3列各360px宽
  grid-template-rows: 400px; // 行高度
  grid-gap: 60px; // 行间距 列间距
  .m-card {
    width: 360px;
    height: 400px;
  }
}
```

- `display: inline-table;`

```less
.m-area {
  width: 1200px;
  margin: 0 auto;
  .m-card:not(:nth-child(3n)) { // 除去第3个及3的倍数的child，其余右边距均为60
    margin-right: 60px;
  }
  .m-card {
    display: inline-table;
    width: 360px;
    height: 400px;
  }
}
```

## `<input type="password" />` 密码显示和隐藏

```html
<input :type="visible ? 'text' : 'password'" />
```

## `display` & `float`

样式 | 说明
-- | --
`display: inline;` | <ol><li>使元素变成行内元素，拥有行内元素的特性，即**可以与其他行内元素共享一行，不会独占一行**.</li><li>不能更改元素的 `height`，`width` 的值，大小由内容撑开. </li><li>可以使用 `padding`，`margin` 的 `left` 和 `right` 产生边距效果，但是 `top` 和 `bottom` 就不行.</li></ol>
`display: block;` | <ol><li>使元素变成块级元素，**独占一行**，在不设置自己的宽度的情况下，块级元素会默认填满父级元素的宽度.</li><li>能够改变元素的 `height`，`width` 的值.</li><li>可以设置 `padding`，`margin` 的各个属性值，`top`，`left`，`bottom`，`right` 都能够产生边距效果.</li></ol>
`display: inline-block;` | <ol><li>结合了 `inline` 与 `block` 的一些特点，结合了上述 `inline` 的第1个特点和 `block` 的第2，3个特点.</li><li>用通俗的话讲，就是**不独占一行的块级元素**。</li></ol>
`display: inline-block;` 和 `float` | <ol><li>不同之处：**设置 `display：inline-block;` 的元素不会脱离文本流**，而 **`float` 会使得元素脱离文本流，且还有父元素高度坍塌的效果**</li><li>相同之处：能在某程度上达到一样的效果</li></ol>

## `justify-content` & `align-content` 属性

```html
<div class="m-area">
  <div style="background-color:coral;"></div>
  <div style="background-color:lightblue;"></div>
  <div style="background-color:khaki;"></div>
</div>
```

```css
.m-area {
  display: flex;
  justify-content: space-around;
}
.m-area {
  display: flex;
  flex-flow: row wrap;
  align-content: space-around;
}
```

- `justify-content` 用于设置或检索弹性盒子元素在主轴（水平）方向上的对齐方式。

属性值 | 说明
-- | --
`flex-start` | 默认值。项目位于容器的开头。
`flex-end` | 项目位于容器的结尾。
`center` | 项目位于容器的中心。
`space-between` | 项目位于各行之间留有空白的容器内。
`space-around` | 项目位于各行之前、之间、之后都留有空白的容器内。
`initial` | 设置该属性为它的默认值。
`inherit` | 从父元素继承该属性。

```css
/* Positional alignment */
justify-content: center;     /* 居中排列 */
justify-content: start;      /* Pack items from the start */
justify-content: end;        /* Pack items from the end */
justify-content: flex-start; /* 从行首起始位置开始排列 */
justify-content: flex-end;   /* 从行尾位置开始排列 */
justify-content: left;       /* Pack items from the left */
justify-content: right;      /* Pack items from the right */

/* Baseline alignment */
justify-content: baseline;
justify-content: first baseline;
justify-content: last baseline;

/* Distributed alignment */
justify-content: space-between;  /* 均匀排列每个元素
                                   首个元素放置于起点，末尾元素放置于终点 */
justify-content: space-around;  /* 均匀排列每个元素
                                   每个元素周围分配相同的空间 */
justify-content: space-evenly;  /* 均匀排列每个元素
                                   每个元素之间的间隔相等 */
justify-content: stretch;       /* 均匀排列每个元素
                                   'auto'-sized 的元素会被拉伸以适应容器的大小 */

/* Overflow alignment */
justify-content: safe center;
justify-content: unsafe center;

/* Global values */
justify-content: inherit;
justify-content: initial;
justify-content: unset;
```

- `align-content` 用于设置在弹性容器内的各项没有占用交叉轴上所有可用的空间时对齐容器内的各项（垂直）。

属性值 | 说明
-- | --
`stretch` | 默认值。元素被拉伸以适应容器。<br>各行将会伸展以占用剩余的空间。如果剩余的空间是负数，该值等效于'flex-start'。在其它情况下，剩余空间被所有行平分，以扩大它们的侧轴尺寸。
`center` | 元素位于容器的中心。<br>各行向弹性盒容器的中间位置堆叠。各行两两紧靠住同时在弹性盒容器中居中对齐，保持弹性盒容器的侧轴起始内容边界和第一行之间的距离与该容器的侧轴结束内容边界与第最后一行之间的距离相等。（如果剩下的空间是负数，则各行会向两个方向溢出的相等距离。）
`flex-start` | 元素位于容器的开头。<br>各行向弹性盒容器的起始位置堆叠。弹性盒容器中第一行的侧轴起始边界紧靠住该弹性盒容器的侧轴起始边界，之后的每一行都紧靠住前面一行。
`flex-end` | 元素位于容器的结尾。<br>各行向弹性盒容器的结束位置堆叠。弹性盒容器中最后一行的侧轴起结束界紧靠住该弹性盒容器的侧轴结束边界，之后的每一行都紧靠住前面一行。
`space-between` | 元素位于各行之间留有空白的容器内。<br>各行在弹性盒容器中平均分布。如果剩余的空间是负数或弹性盒容器中只有一行，该值等效于'flex-start'。在其它情况下，第一行的侧轴起始边界紧靠住弹性盒容器的侧轴起始内容边界，最后一行的侧轴结束边界紧靠住弹性盒容器的侧轴结束内容边界，剩余的行则按一定方式在弹性盒窗口中排列，以保持两两之间的空间相等。
`space-around` | 元素位于各行之前、之间、之后都留有空白的容器内。<br>各行在弹性盒容器中平均分布，两端保留子元素与子元素之间间距大小的一半。如果剩余的空间是负数或弹性盒容器中只有一行，该值等效于'center'。在其它情况下，各行会按一定方式在弹性盒容器中排列，以保持两两之间的空间相等，同时第一行前面及最后一行后面的空间是其他空间的一半。
`initial` | 设置该属性为它的默认值。
`inherit` | 从父元素继承该属性。

```css
/* 基本位置对齐 */
/*align-content 不采用左右值 */
align-content: center;     /* 将项目放置在中点 */
align-content: start;      /* 最先放置项目 */
align-content: end;        /* 最后放置项目 */
align-content: flex-start; /* 从起始点开始放置 flex 元素 */
align-content: flex-end;   /* 从终止点开始放置 flex 元素 */

/* 默认对齐 */
align-content: normal;

/*基线对齐*/
align-content: baseline;
align-content: first baseline;
align-content: last baseline;

/* 分布式对齐 */
align-content: space-between; /* 均匀分布项目
                                 第一项与起始点齐平，
                                 最后一项与终止点齐平 */
align-content: space-around;  /* 均匀分布项目
                                 项目在两端有一半大小的空间*/
align-content: space-evenly;  /* 均匀分布项目
                                 项目周围有相等的空间 */
align-content: stretch;       /* 均匀分布项目
                                 拉伸‘自动’ - 大小的项目以充满容器 */

/* 溢出对齐 */
align-content: safe center;
align-content: unsafe center;

/* 全局属性 */
align-content: inherit; /* 继承 */
align-content: initial;  /* 初始值 */
align-content: unset; /* 未设置 */
```

## 垂直居中 `vertical-align: middle;`

**相对于最高的兄弟元素进行垂直对齐**

`vertical-align` 属性设置元素的垂直对齐方式。需要 `display: inline/inline-block;`

该属性定义行内元素的基线相对于该元素所在行的基线的垂直对齐。允许指定负长度值和百分比值。这会使元素降低而不是升高。在表单元格中，这个属性会设置单元格框中的单元格内容的对齐方式。

::: tip 提示
在使用 `vertical-align：middle;` 的时候需要一个兄弟元素做参照物，让它垂直于兄弟元素的中心点。
`vertical-align` 对齐的方法是寻找兄弟元素中最高的元素作为参考。
因此需要一个 `width: 0;` 的兄弟参考元素，如下例中的 `<div class="assist">`
:::

```html
<div class="m-list">
  <div class="u-item"></div>
  <div class="assist"></div>
</div>
```

```less
.m-list {
  height: 80px;
}
.u-item { // 即使内容行数不固定也一样可以垂直居中
  width: 100px;
  display: inline-block;
  vertical-align: middle;
}
.assist {
  height: 100%;
  width: 0;
  display: inline-block;
  vertical-align: middle;
}
```

属性值 | 描述
-- | --
`baseline` | 默认。元素放置在父元素的基线上。
`sub` | 垂直对齐文本的下标。
`super` | 垂直对齐文本的上标
`top` | 把元素的顶端与行中最高元素的顶端对齐
`text-top` | 把元素的顶端与父元素字体的顶端对齐
`middle` | 把此元素放置在父元素的中部。
`bottom` | 把元素的顶端与行中最低的元素的顶端对齐。
`text-bottom` | 把元素的底端与父元素字体的底端对齐。
`length` | 将元素升高或降低指定的高度，可以是负数。
`%` | 使用 "line-height" 属性的百分比值来排列此元素。允许使用负值。
`inherit` | 规定应该从父元素继承 vertical-align 属性的值。

## js判断对象是否包含某个属性key

- `in` 关键字，会返回 `true` 和 `false`

```js
if (key in Obj) { 
  // 包含
} else {
  // 不包含
}
```

- `hasOwnProperty()`方法，会返回 `true` 和 `false`

```js
if (Object.prototype.hasOwnProperty.call(Obj, key)) {
  // 包含
} else {
  // 不包含
}
```

- 使用 `undefined`

```js
if (Obj[key] !== undefined) {
  // 包含
} else {
  // 不包含
}
```

## js正则检验是否全是汉字或字母

```js
// 校验是否全是汉字
const nameReg = /^[\u4E00-\u9FA5]+$/

// 校验是否全是汉字或字母
const nameReg = /^[\u0391-\uFFE5A-Za-z]+$/

const originName = '斯蒂芬·库里'
const name = originName.replace(/·/g, '') // 去除姓名中所有的点（·）
if (!this.nameReg.test(name)) { // 校验是否全部是汉字
  this.errTxt = `姓名只能包含汉字和点（·）`
} else {
  this.errTxt = ''
}

// 区分中英文字符进行字符长度的计算，一个中文字符，算2个长度
this.formatContent('asdsad;;;阿萨德？？？')
formatContent (value) {
  // value = value.replace(/[\u4e00-\u9fa5]/g, '') // 过滤所有汉字
  const str = value.replace(/[^x00-\xff]/g, '') // 过滤所有汉字和中文字符
  const len = str.length // 英文字符的长度
  console.log('value:', value, value.length * 2 - len)
}
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

## 路由中传递对象或数组参数

- 传递对象参数：

```js
const player = {
  name: 'curry',
  age: 30
}

// 或只使用JSON.stringify()转化为字符串即可
this.$router.push({ path: '/user/login', query: { player: encodeURIComponent(JSON.stringify(player)) } })
```

- 接收对象参数：

```js
const player = JSON.parse(decodeURIComponent(this.$route.query.player))
```

## js控制 `<input>` 输入指定格式数值

```html
<input
  type="text"
  class="u-input"
  v-model="inputValue"
  @input="formatNum($event.target.value)"
  placeholder="请输入" />
```

*只能输入数字和小数点后两位，且不能是0开头*

```js
formatNum (value) {
  value = value.replace(/[^\d.]/g, '') // 清除“数字”和“.”以外的字符
  value = value.replace(/\.{2,}/g, '.') // 只保留第一个. 清除多余的
  value = value.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
  value = value.replace(/^(-)*(\d+)\.(\d\d).*$/, '$1$2.$3') // 只能输入两个小数
  if (value.indexOf('.') < 0 && value !== '') { // 如果没有小数点，数字不能以0开头
    value = value.replace(/\b(0+)/gi, '') // 删除字符串头部所有的 0
  }
}
```

*输入整数位不能超过9位，小数位不能超过4位，只能输入数字和小数点后两位，且不能是0开头*

```js
formatNum (value) {
  value = value.replace(/[^\d.]/g, '') // 清除“数字”和“.”以外的字符
  value = value.replace(/\.{2,}/g, '.') // 只保留第一个. 清除多余的
  value = value.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
  value = value.replace(/^(-)*(\d+)\.(\d\d\d\d).*$/, '$1$2.$3') // 只最多输入4位小数
  if (value.indexOf('.') === -1 && value !== '0') { // 没有小数点，数字不能以0开头
    value = value.replace(/\b(0+)/gi, '')
  }
  if (value.indexOf('.') !== -1 && value.substr(0, value.indexOf('.')) !== '0') { // 有小数点，整数部分不能是以0开头的整数，但可以单独一个0
    value = value.replace(/\b(0+)/gi, '')
  }
  if (value.indexOf('.') !== -1) { // 有小数时，整数不超过9位，小数不超过4位
    if (value.substr(0, value.indexOf('.')).length > 9) { // 整数超过9位
      value = value.substr(0, 9) + value.substr(value.indexOf('.'))
    }
    if (value.substr(value.indexOf('.') + 1).length > 4) { // 小数超过4位
      value = value.substr(0, value.indexOf('.')) + value.substr(value.indexOf('.'), 5)
    }
  }
  if (value.indexOf('.') === -1 && value.length > 9) { // 没有小数时，整数不超过9位
    value = value.slice(0, 9)
  }
  this.inputValue = value
}
```
