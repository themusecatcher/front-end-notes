# Note 5

## `Sass` & `Vue Props` & `CSS 变量(var)`

### 1. `Sass` 编译时态

<br/>

**定义**：`Sass` 的编译时态指的是 `Sass` 代码在项目构建阶段被转换成标准 `CSS` 的过程。

**特点**：

- **静态处理**：所有 `Sass` 变量、函数和 `mixin` 在编译时就被解析和计算
- **不可变性**：一旦编译完成，输出的 `CSS` 是静态不变的
- **无运行时访问**：无法访问浏览器环境或 `JavaScript` 运行时数据
- **时间点**：发生在代码打包阶段（`webpack`/`vite` 构建时）

```scss
// 编译时处理示例
$primary: #3498db;

.button {
  // 编译时计算，输出固定值
  background: darken($primary, 20%); 
}
```

**编译结果**：

```css
.button {
  background: #1d6fa5; /* 固定值，无法在运行时改变 */
}
```

### 2. `Vue Props` 运行时态

<br/>

**定义**：`Vue Props` 的运行时态指的是组件属性在浏览器环境中被解析、响应式更新和执行的过程。

**特点**：

- **动态性**：值可以在组件生命周期中变化
- **响应式**：`Vue` 的响应式系统自动追踪依赖和更新
- **时间点**：发生在浏览器执行阶段
- **上下文感知**：可以访问组件实例、`DOM` 和其他运行时环境

```vue
<script setup>
// 运行时处理
const props = defineProps({
  color: String
})
</script>

<template>
  <!-- 运行时绑定 -->
  <div :style="{ color: props.color }">动态内容</div>
</template>
```

### 3. CSS 变量运行时态

<br/>

**定义**：`CSS 变量`（自定义属性）在浏览器渲染阶段被解析和应用的过程。

**特点**：

- **动态更新**：可以通过 `JavaScript` 实时修改
- **级联作用域**：遵循 `CSS` 级联规则，可继承
- **浏览器处理**：由浏览器渲染引擎在布局和绘制阶段计算
- **时间点**：发生在页面渲染和重绘期间

```css
:root {
  --main-color: #3498db; /* 可被 JavaScript 覆盖 */
}

.element {
  color: var(--main-color); /* 运行时计算 */
}
```

```javascript
// 运行时修改
document.documentElement.style.setProperty('--main-color', '#e74c3c');
```

### 三态对比分析

| 特性 | `Sass` 编译时态 | `Vue Props` 运行时态 | `CSS` 变量运行时态 |
|--|--|--|--|
| **发生阶段** | 构建时 (`webpack`/`vite`) | 浏览器执行时 | 浏览器渲染时 |
| **数据处理** | 静态计算 | 响应式更新 | 动态计算 |
| **可变性** | 编译后不可变 | 可动态变化 | 可实时更新 |
| **环境访问** | 仅构建环境 | 完整浏览器环境 | 浏览器渲染引擎 |
| **性能影响** | 影响构建速度 | 影响运行时性能 | 影响渲染性能 |
| **典型使用** | 主题生成、样式复用 | 组件数据传递 | 动态主题切换 |
| **与JS交互** | 无直接交互 | 直接访问和修改 | 通过`JS API`修改 |
| **值确定性** | 编译时确定 | 运行时确定 | 渲染时确定 |

### 生命周期图示

```
构建阶段: 
[Sass 源码] → (Sass 编译器) → [静态 CSS] → 打包到 bundle

加载阶段:
[HTML] → [JS Bundle] → (Vue 初始化)

运行时阶段:
1. Vue 创建组件实例
2. Props 解析和响应式绑定
3. 组件渲染到 DOM
4. 浏览器解析 CSS
5. CSS 变量计算和应用
6. 用户交互触发更新
```

### 实际开发中的协同工作

<br/>

**场景**：在 `Vue` 组件中基于 `props` 值动态设置饼图厚度

```vue
<template>
  <div 
    class="pie-chart" 
    :style="{
      '--thickness': `${thickness}px`,
      '--primary-color': primaryColor
    }"
  >
    <!-- 图表内容 -->
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  thickness: { type: Number, default: 10 },
  primaryColor: { type: String, default: '#3498db' }
});
</script>

<style lang="scss" scoped>
.pie-chart {
  // Sass 编译时处理 - 静态部分
  position: relative;
  border-radius: 50%;
  
  // 使用 CSS 变量 - 运行时计算
  width: calc(100px + var(--thickness));
  height: calc(100px + var(--thickness));
  
  // 尝试使用 Sass 函数（会失败，因为颜色值是运行时变量）
  // background: darken(var(--primary-color), 10%); // ❌ 编译错误
  
  // 正确解决方案：使用 CSS 原生函数
  background: color-mix(in srgb, var(--primary-color) 90%, black);
  
  &::before {
    content: '';
    position: absolute;
    // 使用 CSS 变量创建伪 3D 效果
    box-shadow: 0 5px 15px color-mix(in srgb, var(--primary-color) 70%, transparent);
  }
}
</style>
```

### 关键问题解决：运行时值传递给 `Sass`

<br/>

由于 `Sass` 的编译时特性，**无法直接将运行时值传入 `Sass` 函数**。解决方案：

1. **CSS 原生函数替代**：

   ```css
   /* 使用 color-mix 代替 Sass 的 darken() */
   background: color-mix(in srgb, var(--primary-color) 70%, black);
   ```

2. **JS 预处理**：

   ```vue
   <script setup>
   const darkenedColor = computed(() => {
     return darkenColor(props.primaryColor, 0.2)
   })
   
   function darkenColor(hex, amount) {
     // JS 颜色处理实现
     return adjustHexColor(hex, -amount * 255)
   }
   </script>
   
   <template>
     <div :style="{ '--dark-color': darkenedColor }"></div>
   </template>
   ```

3. **CSS 相对颜色语法**（现代浏览器）：

   ```css
   .element {
     background: hsl(from var(--primary-color) h s calc(l - 20%));
   }
   ```

### 最佳实践总结

1. **分层处理原则**：
   - 静态样式 → `Sass` 处理
   - 动态基础值 → `CSS` 变量
   - 复杂逻辑 → `JavaScript` 计算

2. **性能优化**：
   - 避免在 `CSS` 中使用复杂计算
   - 使用 `CSS` 变量而非直接修改内联样式
   - 对频繁变化的属性使用 `will-change`

3. **兼容性处理**：

   ```scss
   .element {
     // 渐进增强
     background: #e74c3c; /* 回退值 */
     background: color-mix(in srgb, var(--primary) 80%, black);
   }
   ```

理解这三种状态的区别和协作方式，能够帮助开发者构建更高效、更动态的 `Vue` 应用，同时充分利用 `Sass` 的强大功能和 `CSS` 变量的灵活性。

## `husky` & `lint-staged`

`Husky` 和 `Lint-Staged` 是前端开发中用于自动化代码质量控制的工具组合，主要通过 `Git` 钩子（`Git Hooks`）机制实现提交前的代码检查和格式化。

### ⚙️ **1. Husky：Git 钩子管理工具**

- **本质**：`Husky` 是一个 `Node.js` 包，用于简化 `Git Hooks` 的管理和使用。
- **作用**：  
  `Husky` 允许开发者在 `Git` 操作的各个阶段（如提交<`commit`>、推送<`push`>）触发自定义脚本。常用钩子包括：
  - `pre-commit`：在 `git commit` 命令执行前，但在用户输入提交信息后触发。常用于运行测试或代码检查。
  - `commit-msg`：在用户输入提交信息后触发，用于校验提交信息的格式。（例如结合 `Commitlint` 规范提交信息）。
  - `pre-push`: 在 `git push` 命令执行前触发，常用于运行更全面的测试。
  - （还有其他很多钩子，如 `pre-rebase`, `post-merge`, `post-checkout` 等）
- **工作原理**：  
  安装后，`Husky` 会在项目的 `.git/hooks` 目录中注入钩子脚本。当开发者执行 `Git` 操作（如 `git commit`）时，自动触发预设任务（如执行 `ESLint` 或单元测试）。

### 📁 **2. Lint-Staged：针对暂存区文件的校验工具**

- **本质**：`Lint-Staged` 也是一个 `Node.js` 包。
- **作用**：  
  仅对 **Git 暂存区（Staged Files）** 中的文件运行指定命令（如 `ESLint`、`Prettier`）。避免全量检查整个项目，大幅提升效率。
- **典型场景**：  
  提交前自动修复代码风格（`Prettier`）、检测语法错误（`ESLint`），并将修复后的文件重新加入暂存区。

### 🔗 **3. 协作流程：`Husky` + `Lint-Staged`**

<br/>

两者结合可实现 **提交前的自动化流水线**，构建了一个强大的、自动化的代码质量门禁系统：

#### 流程详解

1. 开发者修改代码，并使用 `git add` 将想要提交的文件放入暂存区 (`Staging Area`)。
2. 开发者执行 `git commit`。
3. `Git` 触发 `pre-commit` 钩子。
4. `Husky` 检测到配置好的 `pre-commit` 钩子（通常是一个指向 `lint-staged` 命令的脚本）。
5. `Husky` 执行 `lint-staged` 命令。
6. `Lint-Staged` 开始工作：
  - 获取当前 `Git` 暂存区中的所有文件。
  - 根据配置文件（通常是 `package.json` 中的 `lint-staged` 字段或 `.lintstagedrc` 文件），针对匹配的文件执行配置好的命令序列（例如 `eslint --fix`, `prettier --write`）。
  - 如果这些命令成功执行（例如，`ESLint` 成功修复了所有可自动修复的问题，或者没有发现问题）：
    - 格式化/修复后的文件会被修改。
    - 命令序列通常包含 `git add`，将这些修复后的改动重新添加回暂存区。
    - `Lint-Staged` 以成功状态（`0`）退出。

  - 如果命令执行失败（例如，`ESLint` 发现了无法自动修复的错误）：
    - `Lint-Staged` 会输出错误信息，指出哪个文件哪行代码有问题。
    - `Lint-Staged` 以失败状态（`非0`）退出。
7. `Husky` 接收到 `Lint-Staged` 的退出状态：
  - 如果为 `0` (成功)：`Husky` 允许 `git commit` 流程继续进行，最终创建提交。提交中包含了原始修改 以及 `Lint-Staged` 自动修复后的结果。
  - 如果为 `非0` (失败)：`Husky` 终止 `git commit` 流程，提交被阻止。开发者需要根据错误提示修复代码，然后再次 `git add` 并重试 `git commit`。

### ⚡ **4. 配置示例（package.json）**

```json
{
  "scripts": {
    "prepare": "husky",  // 初始化 Husky 钩子
    "lint-staged": "lint-staged" // 触发 Lint-Staged
  },
  "lint-staged": {
    "*.{js,ts,vue}": [
      "eslint --fix",    // 自动修复 ESLint 错误
      "prettier --write", // 格式化代码
      "git add"          // 重新加入暂存区
    ]
  },
  "devDependencies": {
    "husky": "^9.0.0",
    "lint-staged": "^13.0.0"
  }
}
```

**注**：需通过命令 `npx husky add .husky/pre-commit "npm run lint-staged"` 绑定钩子。

### ✅ **5. 核心优势**

- **提升代码质量**：强制在提交前修复错误和统一风格，避免低级错误进入仓库。
- **减少等待时间**：仅检查改动文件，比全量扫描快 `10` 倍以上。
- **团队协作标准化**：统一规范，降低 `Code Review` 成本。
- **无缝整合生态**：支持 `ESLint`、`Prettier`、`Stylelint` 等主流工具。

### 🛠️ **6. 扩展应用**

- **提交信息规范**：结合 `commit-msg` 钩子 + `Commitlint`，强制提交信息符合约定式格式（如 `feat: add login`）。
- **单元测试**：对改动文件运行 `Jest` 测试（配置 `lint-staged` 执行 `jest --findRelatedTests`）。

### 💎 **总结**

- `Husky`： 是 `Git Hooks` 的管家。它让你能轻松定义在 `Git` 操作（尤其是提交）的哪个阶段触发什么任务，并将这些配置纳入版本控制，实现团队共享。

- `Lint-Staged`： 是暂存区文件的精准质检员。它只对你 `git add` 过、准备提交的文件运行代码检查和格式化命令，速度快且只关注相关改动。

- 组合使用： `Husky` 在 `pre-commit` 钩子中调用 `Lint-Staged`，是构建现代前端（及其他语言）项目自动化、高效、强制性代码质量保障流程的基石。它们显著提升了代码一致性、减少了低级错误、加速了 `Code Review` 过程，并使开发者能更专注于逻辑编写而非格式问题。
