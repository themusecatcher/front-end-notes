# Note 3

## 如何清理源码里面没有被应用的代码，主要是 JS、TS、CSS 代码

### 针对 `JS`、`TS` 代码

1. 使用 `ESlint`

- [ESlint](https://eslint.nodejs.cn/)（在源码中进行检测并提示）、[Terser](https://terser.org/)（打包后自动完成一些裁剪）：读取源码文件 -> 生成抽象语法树（`AST`） -> 分析 -> ...<br/>都只能针对 `JS` 文件不支持 `CSS` 且只能是单模块（单文件），例如一个模块导出，但另一个模块未使用，这种情况无法处理。

比如：在 `.eslintrc` 配置文件中 `rules` 配置 `no-unused-vars` 规则，在编辑器中会提示未使用的变量和函数。

```js
{
  rules: {
    'no-unused-vars': 'warn'
  }
}
```

2. 使用 `TypeScript` 编译器选项

- 对于 `TypeScript` 项目，可以在 `tsconfig.json` 文件中启用 `"noUnusedLocals": true` 和 `"noUnusedParameters"` 选项，以识别未使用的本地变量和函数参数。

```json
{
  "compilerOptions": {
    "noUnusedLocals": true,
    "noUnusedParameters": true,
  }
}
```

3. 利用 `Webpack` 或 `Rollup` 的 `Tree Shaking` 功能

- 打包构建工具（如 `Webpack`、`Rollup`）的树摇优化（`Tree Shaking`）功能：<br/>
  读取源码文件 -> 分析模块依赖关系 -> 生成新的 `AST` 并进行优化 -> 生成新的代码 -> ...<br/>也只能支持 `JS` 或 `TS`（编译后也是 `JS`）不支持 `CSS`，且必须是 `ESM` 的模块化标准（不支持 `CommonJS`），支持多模块（多文件），例如一个模块导出，但另一个模块未使用，这种情况也可以处理。<br/>
  不支持动态导入，比如：`require()（虽然是同步加载，但可以动态调用，如条件语句）` 或 `ESM` 的 `import()` 方式。因为它是静态分析，即只能在编译时态进行静态分析。

### 针对 `CSS` 代码

1. 使用 [PurgeCSS](https://purgecss.com/)

- `PurgeCSS` 会对整个工程代码进行分析，去除未使用的选择器。非常适合清除未应用的 `CSS` 代码。
- 使用 `PurgeCSS` 时，配置文件路径、忽略的文件或选择器等，它会分析这些文件来确定哪些 `CSS` 选择器是被使用的。

```js
new PurgeCSSPlugin({
  paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
})
```

## `CommonJS` 和 `ESM` 模块系统

### **一、核心差异总览**

| 特性 | CommonJS | ESM (ES Modules) |
|--|--|--|
| **设计目标** | 服务端模块化（`Node.js` 原生支持）| 浏览器与跨平台模块化（`ES6` 标准）|
| **加载方式** | 动态加载（运行时解析）| 静态加载（编译时解析）|
| **模块导入/导出语法** | `require()` / `module.exports` | `import` / `export` |
| **执行时机** | 同步阻塞加载（运行时执行） | 异步非阻塞加载（浏览器中，运行时执行）|
| **作用域** | 模块内局部作用域 | 模块级词法作用域 |
| **循环依赖处理** | 支持但需谨慎处理 | 支持更安全的静态分析 |
| **Tree Shaking** | 不支持（动态特性导致难以静态分析）| 天然支持（利于打包工具优化代码体积）|
| **浏览器兼容性** | 需构建工具转换（如 `Webpack/Babel`）| 现代浏览器原生支持 |
| **Node.js 支持** | 原生支持 | `.mjs` 扩展名或 `"type": "module"`|

### **二、关键差异详解**

#### 1. **加载机制**

- **CommonJS**
  虽然 `require()` 是同步的，但它仍具备动态加载能力：
  - **动态加载**：
    - 条件加载：

      ```js
      if (process.env.NODE_ENV === 'development') {
        const debugTool = require('./debugTool') // 动态决定是否加载模块
        debugTool.log('Debug mode')
      }
      ```

    - 动态路径：

      ```js
      // 动态路径加载
      const moduleName = someCondition ? 'moduleA' : 'moduleB'
      const module = require(`./${moduleName}.js`) // 路径动态生成，在代码执行时解析依赖。
      ```

  - **同步执行**：模块加载会阻塞后续代码运行，适用于服务端文件系统。

    ```js
    // require() 阻塞后续代码执行，直到模块加载完成
    const fs = require('fs') // 同步加载，后续代码需等待
    console.log('Loaded fs')
    ```

- **ESM**  
  - **静态加载**：依赖关系在代码解析阶段确定，路径必须是静态字符串。

    ```js
    // 静态导入（不允许变量路径）
    import moduleA from './moduleA.js'
    ```

  - **异步加载**：浏览器中可通过 `<script type="module">` 异步加载，不阻塞页面渲染。
  
    ```js
    // import() 返回 Promise，支持非阻塞异步加载
    import('fs').then(fs => {
      console.log('Loaded fs')
    })
    console.log('Loading fs...') // 先执行
    ```

#### 2. **模块作用域与绑定**

- **CommonJS**  
  - **值拷贝导出**：导出的是模块的**值拷贝**，后续修改不影响原始模块。

    ```js
    // counter.js
    let count = 0
    module.exports = { count, increment: () => count++ }

    // main.js
    const { count, increment } = require('./counter.js')
    increment()
    console.log(count) // 输出 0（值未同步更新）
    ```

- **ESM**  
  - **实时绑定导出**：导出的是模块的**引用绑定**，修改会同步到所有导入方。

    ```js
    // counter.mjs
    export let count = 0
    export function increment() { count++ }

    // main.mjs
    import { count, increment } from './counter.mjs'
    increment()
    console.log(count) // 输出 1
    ```

#### 3. **循环依赖处理**

- **CommonJS**  
  - 允许循环依赖，但可能导致未完全初始化的模块被访问。

    ```js
    // a.js
    const b = require('./b.js')
    console.log('a: b.value =', b.value)
    module.exports = { value: 'a' }

    // b.js
    const a = require('./a.js')
    console.log('b: a.value =', a.value) // 输出 undefined（a 未完成初始化）
    module.exports = { value: 'b' }
    ```

- **ESM**  
  - 静态分析确保循环依赖安全，模块会先完成初始化再执行代码。

    ```js
    // a.mjs
    import { value } from './b.mjs'
    console.log('a:', value) // 输出 'b'
    export const value = 'a'

    // b.mjs
    import { value } from './a.mjs'
    console.log('b:', value) // 输出 'a'
    export const value = 'b'
    ```

#### 4. **性能与优化**

- **CommonJS**  
  - **启动速度慢**：运行时解析依赖，无法预优化。
  - **内存占用高**：模块多次加载时缓存副本。

- **ESM**  
  - **编译时优化**：静态分析支持 `Tree Shaking`，减少打包体积。
  - **高效缓存**：浏览器通过 `URL` 缓存模块，避免重复加载。

#### 5. **互操作性**

- **Node.js 中混合使用**  
  - **ESM 导入 CommonJS**：可直接使用 `import` 导入 `CommonJS` 模块。

    ```js
    // ESM 中导入 CommonJS
    import cjsModule from './commonjs-module.js'
    ```

  - **CommonJS 导入 ESM**：需使用动态 `import()`（异步）。

    ```js
    // CommonJS 中导入 ESM
    async function loadESM() {
      const esmModule = await import('./esm-module.mjs')
    }
    ```

### **三、使用场景推荐**
| **场景** | **推荐模块系统** | **理由** |
|--|--|--|
| `Node.js` 服务端开发 | `CommonJS` | 原生支持，生态成熟 |
| 浏览器端现代应用 | `ESM` | 原生支持，`Tree Shaking` 优化 |
| 跨平台库开发 | `ESM + CommonJS` 双导出 | 兼容新旧环境 |
| 代码分割与按需加载 | `ESM` 动态导入 (`import()`) | 异步加载提升性能 |
| 旧项目维护 | `CommonJS` | 避免大规模重构成本 |

### **四、迁移与兼容性策略**

1. **Node.js 项目迁移**  
   - 将文件扩展名改为 `.mjs` 或设置 `package.json` 中 `"type": "module"`。
   - 替换 `require()` 为 `import`，`module.exports` 为 `export`。

2. **浏览器兼容处理**  
   - 使用构建工具（如 `Webpack`、`Rollup`）将 `ESM` 转换为兼容旧浏览器的代码。

3. **双模式支持库**  

   ```js
   // package.json
   {
     "exports": {
       "import": "./esm/index.js",   // ESM 入口
       "require": "./cjs/index.js"  // CommonJS 入口
     }
   }
   ```

### **五、未来趋势**

- **ESM 主导**：浏览器原生支持和现代工具链推动 `ESM` 成为主流。
- **Node.js 过渡**：`Node.js` 逐步增强 `ESM` 支持，但 `CommonJS` 仍长期存在。
- **工具链统一**：`Vite`、`Snowpack` 等工具默认采用 `ESM`，提升开发体验。

### **总结**

- **CommonJS**：适用于**服务端**和**传统构建工具链**，以动态加载和同步执行为特点，但缺乏静态优化能力。
- **ESM**：面向**现代浏览器**和**跨平台开发**，通过静态分析和实时绑定实现高效、安全的模块化，适合追求性能与优化的项目。

根据项目需求选择模块系统：**新项目优先使用 ESM**，**旧系统逐步迁移**，**工具库提供双模式支持**以兼容不同环境。

## 通过 `import` 多次引入同一模块，最终打包结果中只会引用一次

在 `ESM（ECMAScript Modules）` 模块系统中，如果通过 `import` 多次引入同一个依赖，**最终的打包结果中通常只会引用一次该依赖**。这是由模块系统的单例特性和现代打包工具的静态分析优化共同决定的。

### **1. ESM 的单例特性**

<br/>

`ESM` 规范强制要求模块是 **单例（Singleton）** 的，即：

- **模块只会执行一次**：无论从多少文件导入同一模块，该模块的代码只会初始化并执行一次。
- **共享同一实例**：所有 `import` 语句最终都指向同一个模块实例，变量、状态、副作用代码（如全局修改）均共享。

例如：

```js
// moduleA.js
console.log('Module A loaded') // 只会执行一次
export const value = 42
```

```js
// file1.js
import { value } from './moduleA.js'
console.log(value) // 42
```

```js
// file2.js
import { value } from './moduleA.js'
console.log(value) // 42
```

> 无论从多少文件导入 `moduleA`，其代码只会执行一次，`value` 也只会初始化一次。

### **2. 打包工具的静态分析优化**

<br/>

现代打包工具（如 `Webpack`、`Rollup`、`Vite` 等）会对模块进行 **静态分析** 和 **依赖关系树扁平化（Tree Shaking & Hoisting）**：

- **代码合并**：所有对同一模块的 `import` 会被合并为一次引用。
- **消除重复代码**：如果模块被多次引入，打包工具会确保模块代码在最终产物中仅保留一份。

### 示例如下

```js
// moduleA.js
export const a = 1
export const b = 2
```

```js
// 入口文件 index.js
import { a } from './moduleA.js'
import { b } from './moduleA.js'
```

#### 打包后结果（伪代码）

```js
// 编译后的模块A代码（仅保留一份）
const __moduleA_exports = { a: 1, b: 2 }

// 入口文件逻辑
console.log(__moduleA_exports.a)
console.log(__moduleA_exports.b)
```

### **3. 特殊情况**

- 动态导入（Dynamic Import）

  如果通过 `import()` 动态导入同一模块多次，浏览器会缓存模块，代码仍只会执行一次：

  ```js
  // 动态导入会返回同一个 Promise
  import('./moduleA.js').then((module) => { /* ... */ })
  import('./moduleA.js').then((module) => { /* ... */ })
  ```

- 副作用（Side Effects）

  如果模块包含立即执行的副作用代码（如修改全局状态），这些代码也只会执行一次：

  ```js
  // moduleWithSideEffect.js
  window.globalConfig = { env: 'prod' } // 副作用代码
  export const data = fetch('/api/data')
  ```

### **4. 验证工具行为**

<br/>

可以通过以下方式验证打包结果：

1. **查看打包产物**：使用 `Webpack` 的 `stats` 分析或 `Rollup` 的代码输出，观察模块是否重复。
2. **性能工具检测**：在浏览器中通过 `Network` 面板确认模块是否多次加载（SPA 中通常不会）。

### **底层原理**

- **模块缓存机制**：  
  浏览器和打包工具内部会维护一个模块缓存（如 `Module Map`），首次加载模块后，后续导入直接读取缓存。
- **静态分析优化**：  
  打包工具通过分析代码的导入导出关系，将同一模块的多次引用映射到同一份代码，避免重复打包。

### **总结**

| 场景 | 结果 | 原因 |
|--|--|--|
| 静态 `import` 多次引入同一模块 | 代码保留一份，单例引用 | `ESM` 规范 + 打包工具优化 |
| 动态 `import()` 多次加载模块 | 代码保留一份，单例引用 | 浏览器模块缓存机制 |
| 模块包含副作用代码 | **副作用代码仅执行一次** | 单例特性保证 |

**最佳实践**：无需担心多次 `import` 同一模块的性能问题，打包工具会优化冗余代码。但需避免无意义的重复导入以保持代码可读性。

## ESM & CommonJS & AMD & UMD

### 核心概念：为什么需要模块化？

<br/>

在早期，没有模块系统，代码通常写在一个或多个全局文件里，导致**全局变量污染**、**依赖关系不明确**、**难以维护**等问题。模块化就是为了解决这些问题而诞生的，它允许我们将代码拆分成独立的小模块，每个模块有独立的作用域，并能明确地导入和导出功能。

### 1. ESM（ECMAScript Modules）

* **全称**：`ECMAScript Modules`
* **简介**：这是 **JavaScript 语言的官方标准**，在现代浏览器和 `Node.js` 中得到了原生支持。
* **语法**：
    * **导出**：使用 `export` 或 `export default` 关键字。
    * **导入**：使用 `import` 关键字。
* **特点**：
    * **静态**：模块的依赖关系在代码执行前（编译时）就确定了，这使得**摇树优化（Tree-shaking）** 成为可能，打包工具可以移除未使用的代码。
    * **异步**：在浏览器环境中，`ESM` 默认是异步加载的，不会阻塞 `HTML` 解析。
    * **严格模式**：`ESM` 模块默认在严格模式下运行。
    * **顶级作用域**：每个模块都有自己的顶级作用域，而非全局作用域。
    * **引用传递**：导入的是值的**只读引用**，而不是值的拷贝。
* **使用场景**：
    * 现代前端框架（`React`, `Vue`, `Angular`）项目的标配。
    * 所有支持原生 `ESM` 的现代浏览器环境。
    * `Node.js`（从 `v12` 开始稳定支持，通常在 `package.json` 中设置 `"type": "module"`）。

**示例**：

```js
// math.mjs (或 .js 在 package.json 设置了 "type": "module" 时)
export const add = (a, b) => a + b
export default function multiply(a, b) { return a * b }

// app.mjs
import multiply, { add } from './math.mjs' // 引入默认导出和命名导出
console.log(add(2, 3)) // 5
console.log(multiply(2, 3)) // 6
```

### 2. CommonJS

* **简介**：主要为 **服务器端**（`Node.js`）设计的一种模块规范。`Node.js` 默认的模块系统就是 `CommonJS`。
* **语法**：
    * **导出**：使用 `module.exports` 或 `exports` 对象。
    * **导入**：使用 `require()` 函数。
* **特点**：
    * **动态**：`require()` 可以在代码的任何地方（包括条件语句中）调用，依赖关系是在**运行时**确定的。
    * **同步加载**：由于服务器端文件在本地磁盘，加载速度极快，所以采用同步方式。但这不适合浏览器，因为网络请求是异步的。
    * **值拷贝**：`require()` 得到的是导出对象的**一份拷贝**（对于基本数据类型是值拷贝，对于对象是浅拷贝）。
* **使用场景**：
    * **Node.js 生态系统**的绝大多数包。
    * 使用构建工具（如 `Webpack`、`Parcel`）打包的后端或前端项目。

**示例**：

```js
// math.js
const add = (a, b) => a + b
module.exports = { add } // 或者 exports.add = add

// app.js
const math = require('./math.js') // 引入整个模块
console.log(math.add(2, 3)) // 5

// 动态条件导入
if (condition) {
  const dynamicModule = require('./dynamic');
}
```

### 3. AMD（Asynchronous Module Definition）

* **全称**：`Asynchronous Module Definition`
* **简介**：专门为**浏览器环境**设计，因为浏览器需要异步加载脚本，而 `CommonJS` 的同步加载会阻塞页面。
* **语法**：其最流行的实现是 **RequireJS**。
    * **定义模块**：`define(id?, dependencies?, factory)`
    * **加载模块**：`require(dependencies, factory)`
* **特点**：
    * **异步加载**：不会阻塞浏览器渲染，依赖的模块加载完毕后，回调函数才会执行。
    * **显式声明依赖**：依赖在模块定义时就明确列出。
* **使用场景**：
    * 在现代前端构建工具流行之前，被广泛用于老式的前端项目。
    * 现在已逐渐被 `ESM` 取代，但在一些遗留系统中仍能看到。

**示例** (使用 `RequireJS`)：

```js
// 定义一个依赖 jQuery 的模块
define(['jquery'], function($) {
  // 使用 $
  function createButton() {
    $('body').append('<button>Click me</button>')
  }
  // 导出功能
  return { createButton }
})

// 加载并使用模块
require(['myModule'], function(myModule) {
  myModule.createButton()
})
```

### 4. UMD（Universal Module Definition）

* **全称**：`Universal Module Definition`
* **简介**：**不是一个独立的模块规范，而是一种兼容模式**。它旨在让一个模块文件能够在多种环境中工作（如 `CommonJS`、`AMD` 和全局变量）。
* **原理**：通过一系列条件判断，检测当前环境支持哪种模块系统，然后使用相应的语法导出模块。
* **使用场景**：
    * 开发希望**同时兼容浏览器和 `Node.js`** 的库（例如 `React`、`Lodash` 等）。当你查看这些库的源码时，通常会找到一个 `UMD` 格式的打包文件（如 `react.umd.js`）。

**示例** (一个典型的 `UMD` 包裹模式)：

```js
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD 环境 (如 RequireJS)
    define(['jquery'], factory)
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS 环境 (如 Node.js)
    module.exports = factory(require('jquery'))
  } else {
    // 浏览器全局变量
    root.myLibrary = factory(root.jQuery)
  }
}(this, function ($) {
  // 模块的真正逻辑
  function myFunction() {
    console.log($)
  }
  // 导出模块
  return { myFunction }
}))
```

### 总结对比表格

| 特性 | `ESM`（官方标准） | `CommonJS`（`Node.js`） | `AMD`（`RequireJS`） | `UMD`（兼容方案） |
| :--- | :--- | :--- | :--- | :--- |
| **加载方式** | 异步（浏览器） | 同步 | 异步 | 根据环境而定 |
| **语法** | `import/export` | `require/module.exports` | `define/require` | 条件判断包裹 |
| **环境** | 现代浏览器、`Node.js` | **主要 `Node.js`** | **主要浏览器** | 所有环境 |
| **确定依赖时机** | **静态（编译时）** | 动态（运行时） | 静态（定义时） | 根据环境而定 |
| **关键优势** | 官方标准、静态分析、`Tree-shaking` | 简单、`Node.js` 生态成熟 | 异步加载、不阻塞浏览器 | 跨环境通用 |
| **现状** | **未来和现在的标准** | **`Node.js` 后端主流** | **逐渐淘汰** | **库开发的常用输出格式** |

### 现代开发中的选择

1. **新项目**：**无条件选择 ESM**。它是语言标准，也是未来。
2. **开发 npm 库**：使用 `ESM` 编写源码，然后通过构建工具（如 `Rollup`、`Webpack`）打包生成 **UMD** 和 **CommonJS** 等多种格式，通过 `package.json` 的 `main`（`CommonJS`）、`module`（`ESM`）等字段指定不同入口，以最大化兼容性。
3. **维护老项目**：可能会遇到 `AMD` 或 `CommonJS`，理解它们有助于维护和迁移。
