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

## `.sass` & `.scss`

它们的主要区别在于**书写风格**。
- **SCSS**（Sassy CSS）：是 `Sass` 的**新语法**，写法与原生 `CSS` **几乎完全一样**，使用花括号 `{}` 和分号 `;`。
- **Sass**（缩进语法）：是 `Sass` 的**原始语法**，使用**缩进**和换行来代替花括号和分号，更加简洁。

### 详细对比

#### 1. SCSS (`.scss` 后缀)

`SCSS` 是 `CSS` 的超集，这意味着**任何合法的 `CSS` 代码也同样是合法的 `SCSS` 代码**。如果你直接把一个 `CSS` 文件的后缀改为 `.scss`，它可以直接被编译。

**特点：**
*   使用花括号 `{}` 来包裹代码块。
*   使用分号 `;` 来分隔语句。
*   写法与 `CSS`、`Less` 等非常相似，学习成本低，易于上手。

**示例：**

```scss
// style.scss
$primary-color: #3498db;

.container {
  padding: 20px;

  .title {
    color: $primary-color;
    font-size: 24px;

    &:hover {
      text-decoration: underline;
    }
  }
}
```

#### 2. Sass (`.sass` 后缀)

`Sass` 的缩进语法更偏向于 `Ruby`、`Python` 等语言的简洁风格。它通过严格的缩进来规定代码的层级结构。

**特点：**
*   **没有**花括号 `{}`。
*   **没有**分号 `;`。
*   使用**缩进**（通常是 `2` 个空格）来嵌套规则。
*   更加简洁，代码量更少。

**示例：**（实现与上面 `SCSS` 代码完全一样的功能）

```sass
// style.sass
$primary-color: #3498db

.container
  padding: 20px

  .title
    color: $primary-color
    font-size: 24px

    &:hover
      text-decoration: underline
```

### 核心区别总结表

| 特性 | SCSS (`.scss`) | Sass (`.sass`) |
| :--- | :--- | :--- |
| **语法风格** | 类似 `CSS`，使用 `{}` 和 `;` | 简洁，使用**缩进** |
| **文件后缀** | `.scss` | `.sass` |
| **学习成本** | 低，尤其对 `CSS` 开发者 | 稍高，需要适应新规则 |
| **兼容性** | **极高**，完全兼容 `CSS` 语法 | 不直接兼容 `CSS` |
| **社区流行度** | **主流**，绝大多数项目和框架使用 | 相对较少 |
| **可读性** | 对熟悉 `CSS` 的开发者更友好 | 代码更紧凑，部分人认为更优雅 |

### 应该如何选择？

**对于绝大多数开发者和项目，强烈推荐使用 `SCSS`。**

**理由如下：**

1. **平滑过渡**：如果你已经会 `CSS`，那么你几乎已经会写 `SCSS` 了，只需要学习变量、嵌套、混合等特性即可。
2. **无缝迁移**：你可以轻松地将现有的 `CSS` 代码粘贴到 `SCSS` 文件中，然后逐步用 `Sass` 的特性进行重构。
3. **社区标准**：目前主流的 `UI` 框架（如 Bootstrap）、构建工具和社区教程，默认使用的都是 `SCSS` 语法。这使得协作和查找资源更加方便。
4. **容错性更高**：缩进语法虽然简洁，但如果缩进不一致，很容易导致编译错误。`SCSS` 的括号结构在视觉上更清晰，不容易出错。

### 结论

- **SCSS** 是 **Sass 3** 之后引入的**主流和推荐语法**。它功能强大且易于接受。
- 原始的 **Sass** 缩进语法更像是一种“方言”，如果你特别喜欢这种简洁的风格，或者你在维护一个老项目，否则没有必要特意去使用它。
