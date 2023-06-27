# Note 6

## 水平垂直居中

```css
/* 水平垂直居中方法①：弹性布局，随内容增大高度，并自适应水平垂直居中 */
.flex-hv-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
/* 水平垂直居中方法②：相对定位，随内容增大高度，并自适应水平垂直居中 */
.relative-hv-center {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
```

## 设置 `input` & `textarea` 的 `placeholder`样式

```css
input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
  font-size: 14px; color: #999;
}
input:-moz-placeholder, textarea:-moz-placeholder {
  font-size: 14px; color: #999;
}
input::-moz-placeholder, textarea::-moz-placeholder {
  font-size: 14px; color: #999;
}
input:-ms-input-placeholder, textarea:-ms-input-placeholder {
  font-size: 14px; color: #999;
}
```

## 监听对象中某个属性值的变化

*监听当前路由对象 `$route`*

- 直接监听整个对象变化

```js
watch:{
  $route (to, from) {
    console.log('to:', to)
    console.log('query:', to.query)
  }
}
```

*监听普通对象 `player.name` 值的变化*

- 使用计算属性，监听单一属性变化

```js
computed: {
  name () {
    return this.player.name 
  }        
}
watch: {
  name (to, from) {
    console.log('to:', to)
  }
}
```

- 使用 `handler` 监听单一属性变化

```js
watch: {
  'player.name': {
    handler (to, from) {
      console.log('to:', to)
    }
  }
}
```

- 使用 `deep` 属性，监听整个对象的变化

```js
watch: {
  player: {
    handler (to, from) {
      console.log('to:', to)
    },
    deep: true
  }
}
```

## js判断对象是否为空

```js
const data = {}
if (JSON.stringify(data) === '{}') {
  return true
}
```

## CSS的大于号选择器（`>`）

```html
<h1>
  This is
  <strong>very</strong> <strong>very</strong>
  important.
</h1>
<h1>
  This is
  <em>really <strong>very</strong></em>
  important.
</h1>
```

```css
/*
  即选择h1标签下，第一个子元素是strong标签的
  第二个<h1>第一个子元素是<em>所以<strong>元素不受影响
*/
h1 > strong {
  color: red;
}
```
