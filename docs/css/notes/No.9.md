# Note 9

<BackTop />

## `BEM` 命名规范

`CSS` 的 **BEM（Block Element Modifier）** 命名规范是一种广泛使用的 `CSS` 类名命名方法论，旨在解决大型项目中样式冲突、可维护性和可读性问题。其核心思想是通过命名约定，明确代码结构和语义关系。

### **1. BEM 的核心概念**

#### **(1) Block（块）**

- **定义**：独立的、可复用的组件或模块（如按钮、导航栏、卡片）。
- **命名规则**：使用单一单词或短横线连接的单词（如 `.menu`, `.search-form`）。
- **特点**：
  - 块是独立的，不依赖其他元素。
  - 块可以嵌套在其他块中，但保持样式独立性。

**示例**：

```css
.header { /* 块：顶部导航栏 */ }
```

#### **(2) Element（元素）**

- **定义**：块的组成部分，不能脱离块独立存在（如菜单项、输入框）。
- **命名规则**：块名 + 双下划线 `__` + 元素名（如 `.menu__item`, `.search-form__input`）。
- **特点**：
  - 元素必须属于某个块。
  - 元素可以嵌套多层，但不推荐过度嵌套。

**示例**：

```css
.header__logo { /* 元素：导航栏内的 Logo */ }
.header__nav { /* 元素：导航栏内的导航菜单 */ }
```

#### **(3) Modifier（修饰符）**

- **定义**：表示块或元素的状态、外观变化（如禁用、高亮、大小调整）。
- **命名规则**：块或元素名 + 双连字符 `--` + 修饰符（如 `.button--disabled`, `.menu__item--active`）。
- **特点**：
  - 修饰符不能单独使用，必须与块或元素结合。
  - 可通过类名叠加或单独类名实现。

**示例**：

```css
.header--fixed { /* 修饰符：固定定位的导航栏 */ }
.header__nav-item--active { /* 修饰符：当前选中的导航项 */ }
```

### **2. BEM 的完整命名格式**

```css
.block__element--modifier
```

- **示例**：

```html
<!-- 搜索表单块 -->
<form class="search-form">
  <!-- 输入框元素 + 禁用修饰符 -->
  <input class="search-form__input search-form__input--disabled">
  <!-- 按钮元素 + 主样式修饰符 -->
  <button class="search-form__button search-form__button--primary"></button>
</form>
```

### **3. BEM 的优势**

| 特性 | 说明 |
|--|--|
| **清晰的代码结构** | 通过命名直接体现 `HTML` 结构和组件关系，减少阅读代码时的猜测。|
| **避免样式冲突** | 唯一性类名（如 `.block__element`）减少全局作用域污染。|
| **便于协作和维护** | 命名规则统一，新成员快速理解代码逻辑。|
| **可复用性** | 块和修饰符独立，方便跨项目复用。|

### **4. BEM 的常见问题与解决**

#### **(1) 类名过长**

- **问题**：深层嵌套可能导致类名冗长（如 `.block__elem1__elem2`）。
- **解决**：
  - 避免过度嵌套，保持结构扁平化。
  - 使用 `Sass/Less` 预处理器简化书写：

    ```scss
    .search-form {
      &__input { /* 编译为 .search-form__input */ }
      &__button { /* 编译为 .search-form__button */ }
    }
    ```

#### **(2) 修饰符的复用**

- **问题**：相同修饰符应用于不同块时，样式可能重复。
- **解决**：
  - 将通用修饰符抽离为工具类（如 `.--disabled`, `.--active`）。
  - 结合 `CSS` 变量或混合（Mixin）减少重复代码。

### **5. BEM 与其他方法论对比**

| 方法论 | 核心思想 | 适用场景 |
|--|--|--|
| **BEM** | 通过块、元素、修饰符明确结构 | 大型项目，组件化开发 |
| **SMACSS** | 分层分类（Base、Layout、Module等）| 复杂应用，强调分层架构 |
| **OOCSS** | 分离容器与内容，抽象可复用对象 | 需要高度复用的样式设计 |

### **6. 最佳实践**

1. **保持简洁**
   - 避免超过 3 层嵌套（如 `.block__elem1__elem2__elem3`）。
   - 优先使用修饰符而非派生选择器（如 `.block--modifier` 而非 `.block .modifier`）。

2. **语义化命名**
   - 类名应描述功能而非外观（如 `.button--warning` 而非 `.button--yellow`）。

3. **结合预处理器**

   - 使用 `Sass/Less` 嵌套语法简化 `BEM` 书写：

     ```scss
     .card {
       &__header { ... }
       &__body { ... }
       &--highlighted { ... }
     }
     ```

4. **统一团队规范**  
   - 约定修饰符命名规则（如状态用 `.--active`，尺寸用 `.--large`）。

### **示例：一个完整的 `BEM` 组件**

```html
<!-- 块：用户卡片 -->
<div class="user-card user-card--featured">
  <!-- 元素：头像 -->
  <img class="user-card__avatar" src="avatar.jpg">
  <!-- 元素：用户名 + 修饰符 -->
  <h2 class="user-card__name user-card__name--bold">Alice</h2>
  <!-- 元素：操作按钮 -->
  <button class="user-card__button user-card__button--primary">Follow</button>
</div>
```

```css
.user-card { /* 块 */ }
.user-card--featured { /* 修饰符：突出显示 */ }

.user-card__avatar { /* 元素：头像 */ }
.user-card__name { /* 元素：用户名 */ }
.user-card__name--bold { /* 修饰符：加粗 */ }

.user-card__button { /* 元素：按钮 */ }
.user-card__button--primary { /* 修饰符：主按钮样式 */ }
```

### **总结**

`BEM` 通过严格的命名规则，将 `CSS` 类名与 `HTML` 结构、组件状态解耦，显著提升代码可维护性和团队协作效率。尽管类名可能较长，但其带来的结构清晰性和可预测性，使其成为中大型项目的首选 `CSS` 命名规范。

## 左右两侧固定宽度、中间自适应的布局实现

可以通过以下几种方法实现左右两侧固定宽度、中间自适应的布局：

### 方法 1：Flexbox 布局（推荐）

```html
<div class="container">
  <div class="left">左侧固定宽度</div>
  <div class="center">中间自适应</div>
  <div class="right">右侧固定宽度</div>
</div>
```

```css
.container {
  display: flex;
  min-height: 100vh; /* 容器高度占满屏幕 */
}

.left, .right {
  flex: 0 0 200px; /* 不放大、不缩小，固定宽度 200px */
  background: #eee;
}

.center {
  flex: 1; /* 占据剩余空间 */
  background: #ddd;
}
```

### 方法 2：CSS Grid 布局（更现代）

```html
<div class="container">
  <div class="left">左侧固定宽度</div>
  <div class="center">中间自适应</div>
  <div class="right">右侧固定宽度</div>
</div>
```

```css
.container {
  display: grid;
  grid-template-columns: 200px 1fr 200px; /* 左右固定，中间自适应 */
  min-height: 100vh;
}

.left, .right {
  background: #eee;
}

.center {
  background: #ddd;
}
```

### 方法 3：传统浮动布局（兼容旧浏览器）

```html
<div class="container">
  <div class="left">左侧固定宽度</div>
  <div class="right">右侧固定宽度</div>
  <div class="center">中间自适应</div>
</div>
```

```css
.left {
  float: left;
  width: 200px;
  background: #eee;
}

.right {
  float: right;
  width: 200px;
  background: #eee;
}

.center {
  margin-left: 200px; /* 左侧宽度 */
  margin-right: 200px; /* 右侧宽度 */
  background: #ddd;
}

/* 清除浮动 */
.container::after {
  content: "";
  display: table;
  clear: both;
}
```

### 关键点总结

1. **Flexbox**：通过 `flex: 1` 让中间自适应，代码简洁且控制灵活。
2. **CSS Grid**：通过 `grid-template-columns` 直接定义三列布局，语义明确。
3. **浮动布局**：需要手动处理外边距和清除浮动，适合兼容旧项目。

根据项目需求（如浏览器兼容性、代码简洁性）选择最合适的方法。现代项目推荐优先使用 **Flexbox** 或 **Grid**。

## `transform` 与合成层

在 `CSS` 中，**不是所有使用 `transform` 的元素都会被自动提升到合成层**。浏览器对合成层的创建有一套复杂的优化规则，`transform` 只是可能触发提升的条件之一，但并非绝对条件。

### 一、`transform` 触发合成层的条件

<br/>

元素被提升到合成层需要满足以下 **至少一个条件**：

1. **使用 3D 变换**

   ```css
   transform: translate3d(0, 0, 0);  /* 最常用技巧 */
   transform: translateZ(0);         /* 强制开启 GPU 加速 */
   transform: perspective(500px);    /* 3D 透视 */
   ```

   > ✅ 这类 3D 变换会强制创建独立的合成层。

2. **包含动画或过渡**

   ```css
   .element {
     transform: translateX(0);
     transition: transform 0.3s; /* 有过渡动画 */
   }
   .element:hover {
     transform: translateX(50px);
   }
   ```

   > ✅ 当元素有正在运行的 `transform` 动画时会被提升。

3. **与其他合成层重叠**

   如果一个普通元素与 **已有合成层** 重叠，浏览器可能将其提升以避免重绘：

   ```css
   .layer {
     transform: translateZ(0); /* 已有合成层 */
   }
   .overlap {
     transform: scale(1.1); /* 与此层重叠时可能被提升 */
   }
   ```

### 二、不会触发合成层的 `transform` 场景

1. **静态 2D 变换**

   ```css
   .static {
     transform: translate(10px, 10px); /* 无动画的 2D 位移 */
   }
   ```
  
   > ❌ 无过渡/动画的简单 2D 变换通常 **不会创建合成层**。

2. **未实际生效的变换**

   ```css
   .hidden {
     transform: scale(0); /* 元素实际不显示 */
   }
   ```

   > ❌ 对布局无影响的变换可能被浏览器忽略。

### 三、强制提升到合成层的方法

<br/>

若需确保元素被提升，可显式提示浏览器：

```css
.element {
  transform: translateZ(0);     /* 经典 hack */
  will-change: transform;       /* 现代标准方法 */
  backface-visibility: hidden;  /* 间接触发 3D 层 */
}
```

> 💡 `will-change` 是官方推荐方式，提前告知浏览器元素将变化。

### 四、浏览器开发者工具验证

<br/>

在 **Chrome DevTools** 中检查是否被提升：

1. 打开 `Rendering` 面板 → 勾选 `Layer borders`
   - **合成层会显示为橙色边框**
2. 在 `Layers` 面板查看分层情况：
   - 提升成功的元素会出现在独立图层中

### 五、合成层创建规则总结

| **场景** | 是否创建合成层 | 原因 |
|--|--|--|
| `transform: translate3d()` | ✅ 是 | `3D` 变换强制提升 |
| `transform: scale()` + 动画 | ✅ 是 | 动画进行中提升 |
| `will-change: transform` | ✅ 是 | 显式声明未来变化 |
| 静态 `transform: rotate(30deg)`  | ❌ 否 | 无动画的 `2D` 变换 |
| `transform: none` | ❌ 否 | 未使用变换 |

### 关键结论

1. **`transform` 不保证创建合成层**，需要配合 **3D/动画/重叠**等条件
2. **优先使用 `will-change` 或 `translate3d` 主动提升**
3. 过度创建合成层会导致内存增加（层爆炸问题），应仅在需要高性能动画时使用
