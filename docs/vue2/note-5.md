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
