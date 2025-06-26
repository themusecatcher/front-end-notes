# Note 1

<BackTop />

## `@use` & `@import`

在 `SCSS` 中，`@use` 和 `@import` 都是用于模块化管理的指令。

### 🧩 核心概念对比

| 特性 | `@import` | `@use` |
|--|--|--|
| **设计目标** | 传统的文件包含方式 | 现代模块系统 |
| **作用域** | 全局作用域 | 命名空间作用域 |
| **变量冲突** | 容易发生 | 避免冲突 |
| **成员可见性** | 所有成员全局可见 | 默认私有，可控制可见性 |
| **性能** | 多次导入会重复编译 | 模块只编译一次 |
| **Sass 官方状态** | 逐步弃用 (deprecated) | 推荐使用 |

### 📚 语法对比

#### `@import` 语法

```scss
// 导入文件
@import 'variables';
@import 'mixins';

// 使用导入内容（直接访问）
.element {
  color: $primary-color;
  @include flex-center;
}
```

#### `@use` 语法

```scss
// 导入文件并指定命名空间
@use 'variables' as vars;
@use 'mixins' as mx;

// 通过命名空间访问成员
.element {
  color: vars.$primary-color;
  @include mx.flex-center;
}
```

### 🔍 关键区别详解

#### 1. 作用域管理

- **`@import`**：将所有导入内容放入全局作用域

  ```scss
  // colors.scss
  $primary: blue;
  
  // buttons.scss
  $primary: red; // 覆盖全局的 $primary
  
  // main.scss
  @import 'colors';
  @import 'buttons'; // $primary 被覆盖为 red
  ```
  
- **`@use`**：使用命名空间隔离作用域

  ```scss
  @use 'colors' as c;
  @use 'buttons' as b;
  
  .header {
    background: c.$primary; // blue
  }
  
  .btn {
    background: b.$primary; // red
  }
  ```

#### 2. 成员可见性控制

- **`@import`**：所有成员完全公开
- **`@use`**：支持私有成员（以下划线 `_` 开头）

  ```scss
  // _utils.scss
  $_private-var: 10px; // 私有变量
  $public-var: 20px;   // 公共变量
  
  // main.scss
  @use 'utils';
  
  .box {
    margin: utils.$public-var; // ✅ 允许访问
    padding: utils.$_private-var; // ❌ 报错：私有成员
  }
  ```

#### 3. 配置机制

- **`@use`** 支持模块配置：

  ```scss
  // _theme.scss
  $primary: blue !default; // 可配置的默认值
  
  // main.scss
  @use 'theme' with (
    $primary: red // 覆盖默认值
  );
  ```

#### 4. 成员访问方式

- **`@import`**：直接访问所有成员
- **`@use`**：灵活的访问方式：

  ```scss
  // 默认命名空间（文件名）
  @use 'buttons';
  .btn { background: buttons.$primary; }
  
  // 自定义命名空间
  @use 'buttons' as b;
  .btn { background: b.$primary; }
  
  // 全局导入（慎用）
  @use 'colors' as *;
  .header { background: $primary; } // 直接访问
  ```

#### 5. 性能优化

- **`@import`**：每次导入都会重新编译文件
- **`@use`**：模块只编译一次，多次引用使用缓存

  ```
  文件结构：
  components/
    _button.scss
    _card.scss
  main.scss
  
  // 使用 @use - 只编译一次
  @use 'components/button';
  @use 'components/card';
  ```

### 🚀 `@use` 的高级特性

#### 1. 模块组合

```scss
// _theme.scss
$primary: blue;
$secondary: green;

// _mixins.scss
@mixin box-shadow($color) {
  box-shadow: 0 2px 4px rgba($color, 0.2);
}

// main.scss
@use 'theme';
@use 'mixins' with ($shadow-color: theme.$primary);

.card {
  @include mixins.box-shadow;
}
```

#### 2. 与 `@forward` 配合使用

```scss
// _library.scss
@forward 'theme';
@forward 'mixins';
@forward 'functions';

// main.scss
@use 'library' as lib;

.element {
  color: lib.$primary;
  @include lib.box-shadow;
}
```

#### 3. 元数据访问

```scss
@use 'sass:meta';

// 检查模块是否存在
@if meta.module-variables('theme') {
  @use 'theme';
}
```

### ⚠️ 迁移注意事项

1. **逐步替换**：

  ```scss
  // 旧方式
  @import 'variables';
  @import 'mixins';
  
  // 新方式
  @use 'variables' as vars;
  @use 'mixins' as mx;
  ```

2. **处理全局变量**：

  ```scss
  // 创建全局访问点
  // _globals.scss
  @use 'variables' as *;
  
  // 其他地方
  @use 'globals' as *;
  ```

3. **第三方库兼容**：

  ```scss
  // 对于不支持 @use 的库
  @import '~legacy-library';
  ```

### 📊 何时使用哪种方式

| **场景** | **推荐方式** |
|--|--|
| 新项目开发 | `@use` + `@forward` |
| 旧项目维护 | 逐步迁移到 `@use` |
| 简单项目/单文件 | `@import` (但不推荐) |
| 组件库开发 | `@use` + `@forward` |
| 需要严格作用域隔离 | `@use` |

### 💎 总结

<br/>

`@use` 是 `SCSS` 模块化的未来，解决了 `@import` 的多个痛点：

- ✅ 避免全局命名冲突
- ✅ 提供更好的封装性
- ✅ 支持模块配置
- ✅ 提升编译性能
- ✅ 更清晰的依赖管理

虽然迁移需要一些工作，但 `@use` 提供了更健壮、可维护的样式架构，特别适合大型项目和组件库开发。官方已计划逐步淘汰 `@import`，因此建议新项目直接采用 `@use` 系统。

## `@forward` & `@use`

在 `Sass` 中，`@forward` 和 `@use` 是模块系统（Module System）的核心功能，用于组织和管理样式代码。

- **`@use`**：引入模块并使用其成员（变量、混合、函数等）
- **`@forward`**：转发模块的成员，使它们在当前文件被 `@use` 时可用（类似"中转站"）

### 一、`@forward` 基础用法

```scss
// src/_variables.scss
$primary: #3498db;
$secondary: #e74c3c;

// src/_mixins.scss
@mixin reset-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

// src/_index.scss (入口文件)
@forward 'variables'; // 转发变量
@forward 'mixins';    // 转发混合
```

### 二、`@forward` + `@use` 搭配使用

#### 场景：创建统一入口文件

```scss
// styles.scss (主文件)
@use 'src/index' as *; // 引入入口文件并移除命名空间

body {
  color: $primary;       // 直接使用转发的变量
  @include reset-list;   // 直接使用转发的混合
}
```

### 三、`@forward` 高级控制

#### 1. 选择性转发成员

```scss
// src/_index.scss
@forward 'variables' show $primary; // 只转发 $primary
@forward 'mixins' hide private-mixin; // 排除指定成员
```

#### 2. 添加前缀（避免命名冲突）

```scss
// src/_index.scss
@forward 'variables' as var-*; // 添加前缀 var-
@forward 'mixins' as mix-*;    // 添加前缀 mix-

// 使用方式
@use 'src/index';
body {
  color: index.$var-primary;    // 带前缀访问
  @include index.mix-reset-list; 
}
```

#### 3. 转发时配置默认值

```scss
// src/_theme.scss (原始模块)
$theme-color: blue !default;

// src/_index.scss (入口)
@forward 'theme' with (
  $theme-color: red // 覆盖默认值
);
```

### 四、`@use` 与 `@forward` 关键区别

| 特性 | `@use` | `@forward` |
|--|--|--|
| **成员可见性** | 在当前文件可用 | 仅在文件被 `@use` 时暴露 |
| **命名空间** | 可自定义 (`as <name>`) | 支持前缀/后缀 |
| **配置默认值** | 支持 (`with (...)`) | 支持 (`with (...)`) |
| **成员过滤** | 不支持 | 支持 (`show`/`hide`) |

### 五、最佳实践示例

#### 文件结构

```
styles/
├── utils/
│   ├── _variables.scss
│   ├── _mixins.scss
│   └── _index.scss    # 统一入口
├── components/
│   └── _button.scss
└── main.scss
```

#### 步骤分解

1. **入口文件 (`utils/_index.scss`)**

```scss
// 转发 utils 下的所有工具
@forward 'variables';
@forward 'mixins';
```

2. **组件中使用 (`components/_button.scss`)**

```scss
@use '../utils' as *; // 引入工具集

.button {
  background: $primary;
  @include rounded-corners;
}
```

3. **主文件 (`main.scss`)**

```scss
@use 'utils';     // 工具集
@use 'components/button';

body {
  font-family: utils.$font-stack;
}
```

### 六、注意事项

1. **避免循环转发**：`A` 转发 `B`，`B` 又转发 `A` 会导致错误
2. **作用域隔离**：`@forward` 的文件无法直接使用转发的成员，需配合 `@use`
3. **私有成员**：以下划线 (`_`) 开头的成员不会被转发
4. **加载顺序**：`Sass` 会自动处理依赖顺序，无需手动排序

通过合理使用 `@forward` 和 `@use`，可以构建出清晰、可维护的 `Sass` 模块化架构，特别适合大型项目。

## 私有成员(`_` & `-`)

在 `Sass` 中，以下划线（`_`）开头的成员（变量、混合、函数等）具有特殊含义，它们被称为**私有成员**。以下是关键特性和使用规则：

### 一、核心特性

1. **作用域限制**：
   - 以下划线开头的成员只能在**定义它们的模块内部**使用
   - 外部文件通过 `@use` 或 `@forward` **无法访问**这些成员

2. **命名规则**：

   ```scss
   // 私有成员示例
   $_private-var: #ff0000;  // 私有变量
   @mixin _private-mixin {  // 私有混合
     /* ... */
   }
   @function _private-fn() { // 私有函数
     @return 10px;
   }
   ```

### 二、实际使用示例

```scss
// _module.scss
$public-var: blue;      // 公共变量
$_private-var: red;     // 私有变量

@mixin public-mixin {   // 公共混合
  border: 1px solid $_private-var; // ✅ 内部可访问私有成员
}

@mixin _private-mixin { // 私有混合
  /* ... */
}
```

```scss
// main.scss
@use 'module';

.element {
  color: module.$public-var;    // ✅ 正确访问公共成员
  color: module.$_private-var;  // ❌ 错误！无法访问私有变量
  
  @include module.public-mixin; // ✅ 正确
  @include module._private-mixin; // ❌ 错误！
}
```

### 三、与 `@forward` 的交互

<br/>

当使用 `@forward` 转发模块时：

1. **私有成员不会被转发**
2. **在入口文件中不可访问**
3. **不会出现在转发的命名空间中**

```scss
// _library.scss
$_secret-color: #f00; // 私有变量
$public-color: #00f;  // 公共变量

// _index.scss (入口文件)
@forward 'library';

// main.scss
@use 'index';
.test {
  color: index.$public-color;   // ✅ 正常访问
  color: index.$_secret-color;  // ❌ 编译错误：私有成员不可访问
}
```

### 四、设计目的与最佳实践

1. **封装实现细节**：

   ```scss
   // _grid.scss
   $_grid-columns: 12; // 内部计算使用
   
   @function -column-width($cols) { // 私有函数
     @return percentage($cols / $_grid-columns);
   }
   
   @mixin column($cols) { // 公共API
     width: -column-width($cols);
   }
   ```

2. **避免命名冲突**：

   ```scss
   // _theme.scss
   $_primary: #3498db; // 不会污染全局命名空间
   
   // 公共接口
   @function get-primary() {
     @return $_primary;
   }
   ```

3. **最佳实践**：
   - 所有不需要外部访问的成员都应添加下划线前缀
   - 公共API保持无下划线命名
   - 私有成员应紧跟在相关公共成员之后定义

### 五、特殊注意事项

1. **文件私有 vs 模块私有**：
   - 下划线前缀使成员在**模块级别**私有
   - 即使在同一目录的不同文件中也无法访问

2. **连字符规则**：
   - `Sass` 同时支持 `_` 和 `-` 开头的私有成员

   ```scss
   $-private-alternative: 10px; // 同样被视为私有
   ```

3. **与 `@import` 的区别**：
   - 传统 `@import` 无法实现真正的私有化
   - 模块系统 (`@use`/`@forward`) 是实现私有的前提

### 六、调试技巧

<br/>

当遇到 "Private member" 错误时：

1. 检查成员命名是否意外添加了下划线
2. 确认是否应该通过公共API访问
3. 使用 `@debug` 在模块内部检查私有值：

  ```scss
  // _module.scss
  @debug "Private value: #{$_private-var}"; // 内部调试
  ```

通过合理使用下划线前缀，可以创建更健壮、可维护的 `Sass` 架构，有效隔离公共接口和内部实现。
