# Note 4

<BackTop />

## `never` & `void`

### 一、`never` 类型深度解析

<br/>

`never` 表示**永远不可能发生**的值，是 `TypeScript` 类型系统中最底层的类型（bottom type）。

#### 核心特征：

1. **不可达性**：表示代码路径永远无法到达
2. **类型空间的最小集**：不包含任何可能的值
3. **不可赋值性**：除自身外不能赋值给任何类型

#### 使用场景：

```ts
// 1. 抛出错误的函数
function throwError(msg: string): never {
  throw new Error(msg)
}

// 2. 无限循环
function infiniteLoop(): never {
  while(true) {}
}

// 3. 穷尽检查（Exhaustiveness Checking）
type Shape = "circle" | "square"
function handleShape(shape: Shape) {
  switch(shape) {
    case "circle": /*...*/ break
    case "square": /*...*/ break
    default:
      const _exhaustive: never = shape // 确保所有分支被处理
  }
}

// 4. 类型过滤（条件类型）
type NonNullable<T> = T extends null | undefined ? never : T
type T0 = NonNullable<string | null> // string
```

#### 类型系统行为：

```ts
// never 在联合类型中消失
type T1 = never | string  // => string

// never 在交叉类型中占主导
type T2 = never & string  // => never

// 函数返回 never 后代码不可达
function test() {
  throwError("error")
  console.log("这行代码永远不会执行") // 编译器会提示不可达代码
}
```

### 二、`void` 类型深度解析

<br/>

`void` 表示**没有返回值**，用于函数正常执行但无返回值的场景。

#### 核心特征：

1. **表示空值**：函数执行完成但没有返回有效值
2. **兼容 undefined**：可接受 `undefined` 值（严格模式下）
3. **灵活性**：声明为 `void` 的函数可以返回任意值（但调用方会忽略）

#### 使用场景：

```ts
// 1. 无返回值的函数
function logMessage(msg: string): void {
  console.log(msg)
}

// 2. 回调函数忽略返回值
[1, 2, 3].forEach((n): void => console.log(n))

// 3. 返回 undefined
const returnUndefined = (): void => undefined

// 4. React 组件 props
type ButtonProps = {
  onClick: () => void // 不关心返回值
}
```

#### 类型系统行为：

```ts
// void 保留在联合类型中
type T3 = void | string  // => void | string

// void 变量可赋值为 undefined
let v: void = undefined  // 严格模式下允许

// 函数返回声明 vs 实际行为
function example(): void {
  return "hello" // 实际允许，但返回值会被忽略
}
```

### 三、`never` 和 `void` 全面对比

| 特性 | `never` | `void` |
|--|--|--|
| **本质含义** | 不可能存在的值 | 没有返回值 |
| **类型层级** | 底层类型（bottom type）| 普通类型 |
| **函数行为** | 函数永远无法正常完成 | 函数正常完成但无返回值 |
| **可赋值性** | 不能赋值给任何类型（除自身外）| 可赋值给 `void`、`any`、`unknown` |
| **接受的值** | 不能接受任何值 | 可接受 `undefined`（严格模式）|
| **联合类型行为** | `T &#124; never` = `T`（消失）| `T &#124; void` 保留 `void` 类型 |
| **交叉类型行为** | `T & never` = `never` | `T & void` = `T` |
| **变量声明** | `let n: never;`（不能赋值）| `let v: void = undefined;` |
| **函数返回值** | 必须抛出错误或永不返回 | 可返回 `undefined` 或不返回 |
| **类型收窄终点** | 是（表示不可能的分支）| 否 |
| **条件类型过滤** | 是（如 `Exclude`, `NonNullable`）| 否 |
| **典型使用场景** | 错误处理、死循环、穷尽检查、类型过滤 | 无返回值函数、回调忽略返回值、`React props` |

### 四、关键区别详解

#### 1. 函数行为差异

```ts
// void 函数正常结束
const voidFn = (): void => console.log("Done")

// never 函数永不返回
const neverFn = (): never => { throw "Error" }

// 调用差异
voidFn() // 正常执行
neverFn() // 抛出异常，后续代码不执行
```

#### 2. 类型兼容性差异

```ts
// void 可接受 undefined
const v: void = undefined

// never 不能接受任何值
const n: never = undefined // 错误！
const n: never = "test" as never // 仅自身可赋值

// 赋值给其他类型
let s: string = v // 错误！void 不能赋给 string
let s: string = n // 允许！never 可赋给任何类型
```

#### 3. 回调函数中的表现

```ts
// void 回调：允许返回值但忽略
function withVoidCallback(fn: () => void) {}
withVoidCallback(() => 123) // 允许

// never 回调：必须永不返回
function withNeverCallback(fn: () => never) {}
withNeverCallback(() => 123) // 错误！
withNeverCallback(() => { throw "error" }) // 必须抛出错误
```

### 五、高级应用场景

#### `never` 的高级用法：

```ts
// 1. 实现高级类型工具
type Extract<T, U> = T extends U ? T : never
type T4 = Extract<"a" | "b" | 1, string> // "a" | "b"

// 2. 表示不可能的状态
type Result<T> = Success<T> | Error
function process(result: Result<number>) {
  if (result instanceof Error) throw result
  // 此处 result 自动收窄为 Success<number>
}

// 3. 与 infer 结合
type GetReturnType<T> = T extends (...args: any) => infer R ? R : never
```

#### `void` 的特殊行为：

```ts
// void 函数的返回值可被忽略
const numbers = [1, 2, 3]
const results: void[] = numbers.map((n) => {
  console.log(n)
  return n * 2 // 返回值被忽略，因为声明为 void[]
})

// 与 undefined 的区别
type F1 = () => void
type F2 = () => undefined

const f1: F1 = () => true // 允许
const f2: F2 = () => true // 错误！必须返回 undefined
```

### 六、总结与选择指南

| **场景** | **推荐类型** | **原因** |
|--|--|--|
| 函数抛出错误 | `never` | 表示函数无法正常完成 |
| 函数无返回值 | `void` | 表示正常完成但无返回值 |
| 无限循环函数 | `never` | 函数永远不会返回 |
| 类型收窄的默认分支 | `never` | 确保所有可能类型都被处理 |
| 条件类型中过滤类型 | `never` | 从联合类型中移除不需要的类型 |
| `React` 事件处理函数 | `void` | 不关心返回值 |
| 数组方法回调（忽略返回值）| `void` | 明确表示返回值不重要 |
| 表示变量无值（严格模式）| `void` | 只能赋值为 `undefined`，比 `any` 更安全 |

**核心记忆点**：

- `never` 是 **"虚无"**（nothingness），表示不可能存在
- `void` 是 **"空"**（empty），表示存在但无值
- `never` 用于 **无法完成** 的操作
- `void` 用于 **正常完成但无返回** 的操作
- 在类型系统中，`never` 是最底层类型，`void` 是普通类型

正确使用 `never` 和 `void` 可以显著提升代码的类型安全性，帮助编译器捕获更多潜在错误，使类型系统更精确地描述代码行为。
