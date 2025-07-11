# Note 2

<BackTop />

## 使用 `sass` 实现主题切换

```scss
@use 'sass:map';

$themes: (
  'light': (
    textColor: '#333',
    bgColor: '#fff'
  ),
  'dark': (
    textColor: '#fff',
    bgColor: '#333'
  ),
  'gray': (
    textColor: '#666',
    bgColor: '#eee'
  )
);

$curTheme: '';

@mixin useTheme {
  @each $key, $value in $themes {
    $curTheme: $key !global;
    html[data-theme='#{$key}'] & {
      @content;
    }
  }
}

@function getVar($key) {
  $themeMap: map.get($themes, $curTheme);
  @return map.get($themeMap, $key);
}
.container {
  font-size: 12px;
  @include useTheme {
    color: getVar('textColor');
    background-color: getVar('bgColor');
  }
}
```

生成的 `CSS` 如下：

```css
.container {
  font-size: 12px;
}
html[data-theme=light] .container {
  color: "#333";
  background-color: "#fff";
}
html[data-theme=dark] .container {
  color: "#fff";
  background-color: "#333";
}
html[data-theme=gray] .container {
  color: "#666";
  background-color: "#eee";
}
```
