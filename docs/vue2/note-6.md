# Note 6

## 垂直居中

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
