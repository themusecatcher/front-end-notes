# Note 4

## `Babel` 工作流程简介

`Babel` 是一个广泛使用的 `JavaScript` 编译器，它通过以下核心步骤将新的 `ES6+` 语法转换为向后兼容的 `JavaScript` 代码

### 1. **解析（Parsing）**

<br/>

将源代码转换为**抽象语法树（AST）**，以便程序化分析代码结构。

- **工具**：`@babel/parser`（基于 `Acorn`）
- **过程**：
  - **词法分析**：将代码拆解为令牌（`Tokens`），如标识符、运算符等。
  - **语法分析**：根据语法规则将令牌转换为 `AST`，表示代码的层级结构。

```js
// 示例：ES6 箭头函数
const add = (a, b) => a + b
// 被解析为 AST（简化表示）：
{
  type: "VariableDeclaration",
  declarations: [{
    type: "VariableDeclarator",
    id: { type: "Identifier", name: "add" },
    init: {
      type: "ArrowFunctionExpression",
      params: [{...}, {...}],
      body: { type: "BinaryExpression", ... }
    }
  }]
}
```

### 2. **转换（Transforming）**

<br/>

通过遍历和修改 `AST`，将新语法转换为旧语法。

- **工具**：`@babel/traverse` + 插件系统（如 `@babel/plugin-transform-arrow-functions`）
- **关键机制**：
  - **插件**：每个插件处理一种或一类语法特性（如箭头函数、类、解构等）。
  - **预设（Preset）**：如 `@babel/preset-env`，自动根据目标环境选择需要的插件。

**示例转换（箭头函数 → 普通函数）**：

```js
// 转换前（ES6）
const add = (a, b) => a + b

// 转换后（ES5）
var add = function(a, b) { return a + b }
```

### 3. **生成（Code Generation）**

<br/>

将修改后的 `AST` 重新生成为目标代码。

- **工具**：`@babel/generator`
- **过程**：深度优先遍历 `AST`，将每个节点转换为对应的代码字符串。

### 核心细节

#### a. **语法转换（Syntax Transformations）**
- **示例转换场景**：
  - **类（Classes）** → 转换为构造函数和原型方法。
  - **模板字符串** → 转换为字符串拼接（`'Hello ' + name`）。
  - **解构赋值** → 转换为逐个属性赋值。
  - **异步函数（async/await）** → 转换为生成器函数或 `Promise` 链。

#### b. **Polyfill（API 兼容）**

- **问题**：`Babel` 默认不处理新的 `API`（如 `Promise`、`Array.from`）。
- **解决方案**：
  - **`@babel/polyfill`**（已弃用）：通过全局污染注入 `polyfill`。
  - **`core-js` + `regenerator-runtime`**（推荐）：按需引入 `polyfill`。
  - **`useBuiltIns: 'usage'`**（在 `@babel/preset-env` 中配置）：自动按需引入。

```js
// 配置示例（.babelrc）
{
  "presets": [
    ["@babel/preset-env", {
      "useBuiltIns": "usage",
      "corejs": 3
    }]
  ]
}
```

#### c. **目标环境适配**

- **配置**：通过 `.browserslistrc` 或 `package.json` 定义目标浏览器/Node.js 版本。
- **优化**：`Babel` 仅转换目标环境不支持的语法，减少冗余代码。

### 完整流程示例

**输入（ES6+）**：

```js
class Person {
  constructor(name) { this.name = name }
  greet() { return `Hello, ${this.name}!` }
}
```

**转换步骤**：
1. **解析**为 `AST`。
2. **转换**：
   - 将 `class` 转换为构造函数和原型方法。
   - 将模板字符串转换为字符串拼接。
3. **生成**输出（ES5）：

  ```js
  function Person(name) {
    this.name = name
  }
  Person.prototype.greet = function() {
    return "Hello, " + this.name + "!"
  }
  ```

### 工具链总结

| 工具 | 作用 |
|--|--|
| `@babel/parser` | 解析代码生成 `AST` |
| `@babel/traverse` | 遍历并修改 `AST` |
| `@babel/generator` | 将 `AST` 转换回代码 |
| `@babel/preset-env` | 智能选择插件适配目标环境 |
| `core-js` | 提供新的 `API` 的 `Polyfill` |

通过这一流程，`Babel` 确保了 `JavaScript` 代码的跨版本兼容性。

## 微服务

微服务是一种软件架构风格，通过**将应用程序拆分为多个小型、独立的服务来构建复杂系统**。**每个服务专注于单一业务功能，独立开发、部署和扩展，并通过轻量级通信机制交互**。这种架构有助于提升系统的可维护性、扩展性和灵活性。

### **1. 核心概念**

- **服务拆分**：按业务功能划分服务（如用户管理、订单处理），每个服务职责单一。
- **独立部署**：服务可独立部署，无需整体重新发布，提升迭代速度。
- **去中心化**：
  - **技术多样性**：不同服务可采用适合的技术栈（语言、数据库）。
  - **数据自治**：每个服务拥有私有数据库，通过 `API` 共享数据，避免直接访问。

### **2. 核心优势**

- **弹性与容错**：单点故障不影响整体系统，结合断路器（如`Hystrix`）提升可靠性。
- **可扩展性**：按需扩展特定服务（如促销期间扩容订单服务）。
- **敏捷开发**：小团队专注独立服务，并行开发，加快交付速度。
- **技术灵活**：新旧技术共存，逐步替换遗留系统。

### **3. 关键技术组件**

- **通信机制**：
  - **同步**：`RESTful API`、`gRPC`。
  - **异步**：消息队列（`Kafka`、`RabbitMQ`）实现事件驱动架构。
- **服务发现与负载均衡**：
  - 工具：`Consul`、`Eureka`、`Kubernetes Service`。
  - 负载均衡器：`Nginx`、云服务（`AWS ALB`）。
- **API 网关**：
  - 功能：路由、认证（`JWT/OAuth2`）、限流、日志聚合。
  - 工具：`Spring Cloud Gateway`、`Kong`。
- **配置管理**：
  - 集中化配置：`Spring Cloud Config`、`Consul KV`。
- **监控与日志**：
  - 指标收集：`Prometheus` + `Grafana`。
  - 日志聚合：`ELK Stack`（`Elasticsearch`, `Logstash`, `Kibana`）。
  - 分布式追踪：`Zipkin`、`Jaeger`。

### **4. 挑战与解决方案**

- **分布式复杂性**：
  - **事务管理**：`Saga`模式替代传统`ACID`事务，保证最终一致性。
  - **网络延迟**：优化通信协议（如`gRPC`）、缓存策略。
- **运维复杂度**：
  - **容器化**：`Docker`封装服务，`Kubernetes`管理编排。
  - **CI/CD**：自动化流水线（`Jenkins`、`GitLab CI`）实现独立部署。
- **安全**：
  - 服务间认证：`mTLS`（双向`TLS`）。
  - 集中鉴权：`OAuth2` + `API`网关。

### **5. 设计原则**

- **单一职责原则（SRP）**：每个服务仅聚焦一个业务领域。
- **高内聚低耦合**：通过定义良好的接口交互，隐藏内部实现。
- **自动化运维**：基础设施即代码（`IaC`），自动化测试、部署。
- **容错设计**：重试机制、熔断、降级策略（如`Sentinel`）。

### **6. 适用场景**

- **大型复杂系统**：团队规模大，需独立迭代模块。
- **高并发需求**：灵活扩展特定组件应对流量高峰。
- **混合技术栈**：逐步引入新技术，避免全盘重构。

### **7. 常见工具与框架**

- **开发框架**：
  - Java：`Spring Boot` + `Spring Cloud`。
  - Go：`Go Micro`、`Gin`。
  - Node.js：`NestJS`、`Express`。
- **服务网格**：`Istio`（流量管理、安全、可观测性）。
- **容器编排**：`Kubernetes`、`Docker Swarm`。

### **8. 微服务 vs 单体架构**

| **维度** | **微服务** | **单体架构** |
|--|--|--|
| **开发速度** | 独立团队并行开发 | 代码耦合，协作复杂 |
| **可扩展性** | 按需扩展服务实例 | 整体扩展，资源浪费 |
| **技术选型** | 多语言、多数据库 | 统一技术栈 |
| **部署风险** | 独立部署，影响小 | 全量部署，风险高 |
| **运维难度** | 需完善监控、自动化工具 | 简单，但规模大后难维护 |

### **9. 演进路径**

- **单体优先**：初期快速验证，后期逐步拆分。
- **领域驱动设计（DDD）**：通过限界上下文（Bounded Context）识别服务边界。
- **Strangler Pattern**：逐步替换旧系统，而非一次性重构。

### **总结**

<br/>

微服务通过解耦和自治提升系统灵活性与可维护性，但需应对分布式系统的复杂性。成功实施依赖强大的基础设施（如Kubernetes）、成熟的DevOps实践及团队协作模式。适用于中大型项目，小型项目需权衡复杂度与收益。

## [垃圾回收 Garbage Collection](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Memory_management#%E5%9E%83%E5%9C%BE%E5%9B%9E%E6%94%B6)与[内存管理](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Memory_management)

### 一、`JavaScript` 的垃圾回收（GC）

<br/>

`JavaScript` 是一种**自动内存管理**的语言。开发者通常不需要手动分配和释放内存。引擎会自动跟踪内存的分配和使用，并在确定某个对象不再被需要（即“垃圾”）时，自动释放其占用的内存。这个过程就是**垃圾回收**。

### 核心垃圾回收算法

<br/>

现代 `JavaScript` 引擎（如 `V8`, `SpiderMonkey`, `JavaScriptCore`）主要使用以下策略的组合：

1. **标记清除（Mark-and-Sweep）** - **主流算法**
  - **标记阶段：** `GC` 从一组称为 **"根"（Roots）** 的对象开始（通常是全局对象、当前执行栈上的变量和函数作用域中的变量）。它会遍历所有能从“根”访问到的对象，并将它们标记为“可达”（Alive）。
  - **清除阶段：** `GC` 遍历整个堆内存。所有没有被标记为“可达”的对象被认为是“不可达”的垃圾。`GC` 会回收这些对象占用的内存空间。
  - **优点：** 能很好地处理循环引用（两个或多个对象相互引用，但整体上已不可达）。

2. **引用计数（Reference Counting）** - **基本淘汰**
  - 每个对象维护一个引用计数器，记录有多少个其他对象或变量引用着它。
  - 当引用计数变为 `0` 时，对象会被立即回收。
  - **致命缺点：** 无法处理循环引用（`A` 引用 `B`，`B` 引用 `A`，即使它们都已不被外界引用，计数也永远不会为 `0`，导致内存泄露）。现代引擎已不再将其作为主要算法。

    ::: tip 备注
    现代 JavaScript 引擎不再使用引用计数进行垃圾回收。
    :::

3. **分代收集（Generational Collection）**
  - **核心观察：** 绝大多数对象的生命周期都非常短（“朝生夕死”）；存活时间长的对象往往存活时间非常长。
  - **策略：** 将堆内存划分为不同的“代”（通常是两代）：
    - **新生代（Young Generation）：** 存放新创建的对象。`GC` 发生非常频繁（**副垃圾回收器** - `Scavenger`），采用高效的复制算法（将存活对象复制到另一区域，清空原区域）。
    - **老生代（Old Generation）：** 存放经历过多次新生代 `GC` 后仍然存活的对象。`GC` 发生频率较低（**主垃圾回收器**），通常采用标记清除或标记整理（`Mark-Compact`，清除后移动存活对象减少内存碎片）算法。
  - **优点：** 大幅提高 `GC` 效率，减少停顿时间。

4. **增量标记（Incremental Marking）**
  - 将耗时的标记阶段拆分成多个小步骤，穿插在 `JavaScript` 执行过程中进行。
  - **优点：** 避免单次长时间 `GC` 停顿导致应用卡顿（`UI` 冻结、请求延迟）。

5.  **空闲时间收集（Idle-Time Collection）**
  - 引擎尝试在浏览器或 `Node.js` 空闲时执行部分 `GC` 任务。
  - **优点：** 进一步减少对主线程的影响。

#### `GC` 的触发时机

- 分配新对象时，如果新生代空间不足，触发新生代 `GC`。- 老生代空间达到某个阈值时，触发老生代 `GC`。
- 脚本主动调用 `global.gc()`（非标准，主要用于调试，如 `Node.js` 的 `--expose-gc`）。
- 浏览器/Node.js 在空闲时。

### 二、JavaScript 中的内存泄露（Memory Leak）

<br/>

内存泄露是指：程序中**已经分配的内存**，由于**某些原因不再需要**，却**没有被垃圾回收机制正确释放**，导致内存占用持续增长，最终可能耗尽可用内存，引起程序性能下降（卡顿）、崩溃或浏览器标签页崩溃。

#### 常见的内存泄露模式

1.  **意外的全局变量：**
  - 在函数内部忘记使用 `var`, `let`, `const` 声明变量，导致变量被挂载到全局对象（浏览器中是 `window`）。

  ```js
  function leakyFunction() {
    oopsGlobal = 'I am a global variable!' // 没有声明！成了 window.oopsGlobal
    this.anotherGlobal = 'Oops!' // 在非严格模式下，this 指向 window
  }
  leakyFunction()
  // 即使 leakyFunction 执行完毕，oopsGlobal 和 anotherGlobal 依然存在
  ```

  - **修复：** 始终使用 `var`, `let`, `const` 声明变量；使用严格模式 (`'use strict'`)，在函数内未声明的赋值会报错。

2. **被遗忘的定时器（Timers）和回调（Callbacks）：**
  - `setInterval` 会持续执行，直到被 `clearInterval` 清除。如果定时器引用了不再需要的 `DOM` 元素或大对象，这些对象就不会被释放。
  - 事件监听器 (`addEventListener`) 在 `DOM` 元素被移除后，如果监听器没有被移除 (`removeEventListener`)，并且监听器函数引用了该元素或其他大对象，也会造成泄露（尤其是 `SPA` 中路由切换时）。

  ```js
  // 定时器泄露
  const bigData = loadHugeData()
  setInterval(() => {
    const node = document.getElementById('node')
    if (node) {
      // 即使 node 被从 DOM 移除，定时器还在，bigData 和 node 引用还在
      node.innerHTML = JSON.stringify(bigData)
    }
  }, 1000)

  // 事件监听器泄露 (SPA 常见)
  function onButtonClick() {
    // ...
  }
  document.getElementById('myButton').addEventListener('click', onButtonClick)
  // 如果 myButton 被移除出 DOM，并且没有移除事件监听器，onButtonClick 及其作用域链上的变量不会被释放
  ```

  - **修复：** 在不需要定时器时调用 `clearInterval` / `clearTimeout`；在 `DOM` 元素被移除前（或在组件卸载生命周期钩子中 `React`: `useEffect` `cleanup`, `Vue`: `beforeUnmount`）移除事件监听器。使用 `AbortController` 管理事件监听器移除。

3. **闭包（Closures）：**
  - 闭包是函数及其创建时的词法作用域的组合。这是 `JavaScript` 的强大特性。
  - **泄露风险：** 如果闭包持有对一个大对象（如 `DOM` 树、大数组）的引用，即使闭包外部代码已经不再需要这个大对象，只要闭包本身还存活（例如被事件监听器引用、存储在全局变量中），这个大对象就无法被 `GC` 回收。

  ```js
  function outer() {
    const hugeArray = new Array(1000000).fill('*') // 大对象
    return function inner() {
      // inner 闭包引用了 hugeArray
      console.log('Closure holding a reference to hugeArray')
    }
  }
  const leakyClosure = outer() // leakyClosure 引用了 inner，inner 闭包引用了 hugeArray
  // 即使 outer 执行完毕，hugeArray 因为被 leakyClosure 引用的 inner 闭包所引用，无法被回收
  ```

  - **修复：** 注意闭包引用的内容。在闭包不再需要时，解除对其的引用（如将包含闭包的变量设为 `null`）。谨慎在闭包中持有大对象的引用。

4. **分离的 DOM 引用（Detached DOM References）：**
  - 当 `DOM` 元素从文档树中移除（`removeChild`, `innerHTML = ''`），但 `JavaScript` 代码中仍然保留着对该 `DOM` 元素的引用时，就产生了“分离的 `DOM` 树”。
  - 这些分离的 `DOM` 元素及其关联的事件监听器和子元素所占用的内存不会被 `GC` 回收，因为 `JavaScript` 代码仍然持有它们的引用。

  ```js
  // 在表格中缓存单元格引用
  let cache = {
    row: document.getElementById('row'),
    cell: document.getElementById('cell-in-row')
  }

  // 稍后移除整个表格行
  function removeRow() {
    document.body.removeChild(document.getElementById('row'))
    // 此时 row 和 cell 已经从 DOM 树移除，但 cache 对象仍然引用着它们！
    // 它们变成了分离的 DOM 节点，内存泄露。
  }
  ```

  - **修复：** 在移除 `DOM` 元素后，将其对应的 `JavaScript` 变量引用设置为 `null` (`cache.row = null; cache.cell = null`)。避免在全局对象或长生命周期的对象中存储大量 `DOM` 引用。使用 `WeakMap` 或 `WeakSet` 来关联 `DOM` 元素和附加数据（它们对键的引用是弱引用，不影响 `GC`）。

5. **未清理的 Map/Set 引用：**
  - 使用 `Map` 或 `Set` 存储对象时，如果这些对象本身不再需要，但忘记从 `Map` 或 `Set` 中删除它们，这些对象就不会被 `GC` 回收，因为 `Map`/`Set` 持有对它们的强引用。

    ```js
    const objectsMap = new Map()
    function addObject(obj) {
      objectsMap.set(obj.id, obj)
    }
    function removeObject(id) {
      // 仅仅从应用逻辑中移除，但没有从 Map 中删除
      // objectsMap.delete(id) // 缺少这行导致泄露！
    }
    ```

  - **修复：** 在对象不再需要时，及时从 `Map`/`Set` 中删除。如果需要弱引用特性，使用 `WeakMap` 或 `WeakSet`（键必须是对象，且不计入引用计数）。

6.  **控制台日志（Console Logs）：**
  - 在开发过程中，`console.log` 输出到控制台的对象不会被 `GC` 回收，因为浏览器需要保持它们在控制台中可查看（即使代码本身已不再引用它们）。
    ::: tip 备注
    经过验证，只有 `devtools` 打开时，`console` 打印才会引起内存泄漏的，如果不打开控制台，`console` 是不会引起内存变化的。
    :::
  - **影响：** 主要在开发阶段可能导致内存占用偏高。生产环境的控制台日志通常会被移除或压缩，影响较小，但仍建议避免在生产中无节制地 `console.log` 大对象。

    ```javascript
    function processBigData() {
      const hugeData = getHugeData()
      console.log(hugeData) // 在控制台关闭或清理前，hugeData 不会被释放
      // ... 处理 hugeData
    }
    ```

  - **修复：** 开发时注意，尤其是循环中的 `console.log`。生产环境使用构建工具移除 `console.log` 语句。

### 三、如何检测和诊断内存泄露

1. **浏览器开发者工具 (Chrome DevTools) - 核心工具：**
  - **Performance 面板：** 录制一段时间内的内存使用情况（`JS Heap`）。观察 `JS Heap` 或 `Nodes` 等指标是否呈**持续上升趋势**（阶梯式增长），即使在做应该释放内存的操作（如切换路由、关闭模态框）后也不回落。
  - **Memory 面板：**
      - **Heap Snapshot：** 在疑似泄露点前后分别拍快照。比较快照，找出内存增长的部分，分析是哪些对象在增加，并查看它们被谁引用着（`Retainers`）。特别关注 `(detached tree)`。
      - **Allocation instrumentation on timeline：** 实时记录内存分配堆栈。观察哪些函数在持续分配内存，且分配的内存没有被释放。
      - **Allocation sampling：** 采样内存分配情况，开销较小，适合长时间运行。
2. **Node.js 检测工具：**
  - `process.memoryUsage()`： 在代码中定期打印 `heapUsed` 观察趋势。
  - `--inspect` / `--inspect-brk`： 启用调试器，然后使用 `Chrome DevTools` 连接到 `Node.js` 进程进行内存分析（方法与浏览器类似）。
  - **堆内存快照：** `v8.getHeapSnapshot()` 或使用 `heapdump`/`node-memwatch` 等模块生成堆快照文件，导入 `Chrome DevTools` 分析。
  - **性能分析工具：** `--prof` / `--prof-process`， `clinic.js` (包含 `heap-profiler`)。

### 四、预防内存泄露的最佳实践

1. **避免意外全局变量：** 使用严格模式 (`'use strict'`)。
2. **及时清理：**
  - 清除不再需要的定时器 (`clearInterval`, `clearTimeout`)。
  - 移除不再需要的事件监听器 (`removeEventListener`)。在组件卸载/销毁的生命周期钩子中做清理工作。
  - 在移除 `DOM` 元素后，将其 `JavaScript` 引用置为 `null`。
3. **谨慎使用闭包：** 明确闭包引用了哪些变量，避免在长生命周期的闭包中持有对大对象或不再需要的 `DOM` 元素的引用。在闭包不再需要时解除引用。
4. **管理数据结构：**
  - 及时从 `Map`、`Set`、数组、对象属性中删除不再需要的项。
  - 考虑使用 `WeakMap` 和 `WeakSet` 来关联对象和附加数据（当键对象在其他地方没有强引用时，`GC` 可以自动清理）。
5. **分离 DOM 引用：** 避免在全局或长生命周期对象中存储大量 `DOM` 引用。移除 `DOM` 后置空引用。用 `WeakMap` 关联 `DOM` 和元数据。
6. **减少控制台日志：** 避免在生产环境遗留大量 `console.log`，尤其是对大对象。
7. **使用工具监控：** 在开发和测试阶段，定期使用 `Chrome DevTools` 等工具进行内存分析，尤其是在进行可能导致泄露的操作（如路由切换、大量数据加载/卸载）之后。

### 总结

- **垃圾回收 (GC)** 是 `JavaScript` 引擎自动管理内存的核心机制，主要基于**标记清除**和**分代收集**策略，旨在回收不再使用的对象所占用的内存。
- **内存泄露** 发生在应用逻辑上已不再需要的内存，由于代码缺陷（如未清除的引用：全局变量、定时器、事件监听器、闭包、分离的`DOM、Map/Set` 项）而无法被 `GC` 回收，导致内存占用持续增长。
- **检测泄露** 主要依靠 `Chrome DevTools` 的 `Performance` 和 `Memory` 面板（或 `Node.js` 的对应工具），通过观察内存趋势、对比堆快照、记录内存分配时间线来定位泄露源。
- **预防泄露** 的关键在于**良好的编码习惯**：避免意外全局变量、及时清理资源（定时器、事件监听器）、谨慎管理引用（闭包、`DOM` 引用、数据结构）、合理使用弱引用 (`WeakMap`, `WeakSet`)，并利用工具进行主动监控。
