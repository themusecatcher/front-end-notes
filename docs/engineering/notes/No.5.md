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
