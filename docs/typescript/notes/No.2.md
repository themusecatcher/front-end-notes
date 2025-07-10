# Note 2

<BackTop />

## `unknown` & `any`

在 `TypeScript` 中，`unknown` 和 `any` 都表示“不确定类型”，但它们在类型安全和使用场景上有显著区别。

### **1. 类型安全**

- **`any`**：  
  完全绕过 `TypeScript` 的类型检查。  
  - 可以赋值给任意类型的变量。
  - 可以调用任意方法或访问任意属性（即使不存在）。
  - **完全不受约束**，可能导致运行时错误。

  ```ts
  let value: any = "hello"
  value.foo.bar()      // 编译通过，但运行时可能报错
  value = 42           // 允许重新赋值为数字
  const num: number = value // 允许赋值给其他类型
  ```

- **`unknown`**：  
  安全版的 `any`，强制开发者显式检查类型。  
  - **不能直接操作**（除非通过类型断言或类型收窄）。
  - 不能赋值给其他类型（`any` 和 `unknown` 除外）。
  - 必须明确类型后才能使用。

  ```ts
  let value: unknown = "hello"
  value.foo.bar()      // 编译报错：未知类型，无法操作
  value = 42           // 允许重新赋值，但类型仍是 unknown

  // 必须通过类型收窄（Type Narrowing）
  if (typeof value === "string") {
    console.log(value.toUpperCase()) // 安全操作
  }
  ```

### **2. 设计目的**

- **`any`**：  
  用于兼容旧代码（如迁移 `JS` 到 `TS` 的过渡期），或完全不确定类型的场景。  
  **代价是牺牲类型安全。**

- **`unknown`**：  
  用于表示“类型未知但需要安全操作”的值（如动态内容、第三方 `API` 响应）。  
  **强制开发者验证类型，避免意外错误。**

### **3. 赋值规则**

| 操作 | `any` | `unknown` |
|--|--|--|
| 接受任意类型的赋值 | ✅ | ✅ |
| 赋值给 `any` | ✅ | ✅ |
| 赋值给 `unknown` | ✅ | ✅ |
| 赋值给其他具体类型（如 `string`） | ✅ | ❌（需类型断言或收窄）|

### **4. 使用场景**

- **用 `any`**：
  - 快速修复旧代码的类型问题（临时方案）。
  - 与动态类型库（如 `eval` 或 `JSON.parse`）交互时，若无法确定类型。

- **用 `unknown`**：  
  - 处理外部输入（如用户输入、API 响应）时，强制类型检查。
  - 替代 `any` 以提高安全性，同时保持灵活性。

### **代码示例对比**

```ts
// 使用 any（危险）
function riskyFunction(data: any) {
  data.sayHello(); // 编译通过，但运行时可能报错
}

// 使用 unknown（安全）
function safeFunction(data: unknown) {
  if (typeof data === "object" && data !== null && "sayHello" in data) {
    (data as { sayHello: () => void }).sayHello(); // 显式类型断言
  }
}
```

### **总结**

| 特性 | `any` | `unknown` |
|--|--|--|
| 类型检查 | ❌ 关闭检查 | ✅ 强制检查 |
| 安全性 | 低（可能导致运行时错误）| 高（需显式类型操作）|
| 适用场景 | 快速修复、放弃类型检查 | 安全处理未知类型 |

**最佳实践**：优先使用 `unknown`，仅在必要时用 `any`，并逐步替换遗留代码中的 `any`。

## `extends` 关键字

`TypeScript` 中的 `extends` 是一个**多用途关键字**，其行为取决于上下文场景。

### 一、基础用法：接口/类的继承

<br/>

`extends` 用于**继承(来自)另一个类型或类**，表示子类型必须满足父类型的约束。

#### 1. 接口继承

```ts
interface Animal {
  name: string
  age: number
}

// Dog 必须包含 Animal 的所有属性 + 自己的新属性
interface Dog extends Animal {
  breed: string
}

const myDog: Dog = {
  name: "Buddy",
  age: 3,
  breed: "Golden Retriever" // ✅ 必须包含所有父接口属性
}
```

#### 2. 类继承

```ts
class Animal {
  constructor(public name: string) {}
}

class Dog extends Animal {
  constructor(name: string, public breed: string) {
    super(name) // 必须调用父类构造函数
  }
}

const dog = new Dog("Buddy", "Golden")
```

### 二、泛型约束（Generic Constraints）

<br/>

在泛型中使用 `extends` 可以**限制类型参数的范围**。

#### 示例：确保泛型参数符合特定结构

```ts
// T 必须是至少包含 length 属性的类型
function logLength<T extends { length: number }>(arg: T): void {
  console.log(arg.length)
}

logLength("hello")    // ✅ string 有 length
logLength([1, 2, 3]) // ✅ 数组有 length
logLength(123)       // ❌ number 没有 length
```

#### 结合 `keyof` 约束对象键

```ts
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key]
}

const user = { name: "Alice", age: 30 }
getProperty(user, "name") // ✅
getProperty(user, "id")   // ❌ "id" 不是 user 的键
```

### 三、条件类型（Conditional Types）

<br/>

`extends` 用于**类型条件判断**，语法为 `T extends U ? X : Y`。

#### 1. 基础条件类型

```ts
type IsString<T> = T extends string ? true : false

type A = IsString<"hello"> // true
type B = IsString<123>     // false
```

#### 2. 联合类型的分配律（Distributive Conditional Types）

<br/>

当 `T` 是联合类型时，条件类型会**按成员分配计算**：

```ts
type ToArray<T> = T extends any ? T[] : never

type Result = ToArray<string | number>
// 等价于 string[] | number[]
```

#### 3. 过滤特定类型

```ts
type FilterStrings<T> = T extends string ? T : never

type C = FilterStrings<"a" | 1 | "b"> // "a" | "b"
```

### 四、高级类型操作

#### 1. 递归条件类型

```ts
// 递归展开嵌套数组
type Flatten<T> = T extends any[] ? Flatten<T[number]> : T

type Nested = number[][]
type Flat = Flatten<Nested> // number
```

#### 2. 类型兼容性判断

```ts
type IsSubtype<T, U> = T extends U ? true : false

type D = IsSubtype<"hello", string>  // true
type E = IsSubtype<number, unknown> // true
```

### 五、`extends` 在条件类型中的特殊行为

#### 1. `never` 的特殊处理

```ts
type TestNever<T> = T extends string ? true : false
type F = TestNever<never> // never（因为 never 是空联合类型）
```

#### 2. 禁用分配律

<br/>

用方括号包裹 `T` 可禁用分配律：

```ts
type ToArray<T> = [T] extends [any] ? T[] : never

type G = ToArray<string | number> // (string | number)[]
```

### 六、总结

<br/>

`extends` 在 `TypeScript` 中的核心作用：

| **场景** | **作用** | **示例** |
|--|--|--|
| 接口/类继承 | 强制子类型包含父类型的所有成员 | `interface A extends B { ... }` |
| 泛型约束 | 限制泛型参数的范围 | `<T extends { length: number }>` |
| 条件类型 | 根据类型关系选择分支 | `T extends U ? X : Y` |
| 类型分配律 | 联合类型按成员分配计算 | `T extends any ? ...` |

### 注意事项：

1. **联合类型分配律**：条件类型中 `T extends U` 的 `T` 是联合类型时会自动展开。
2. **类型兼容性**：`A extends B` 表示 `A` 可赋值给 `B`，而非严格继承。
3. **递归深度**：过度递归可能导致类型检查性能问题。

## 条件类型（Conditional Types）

`TypeScript` 的条件类型（**Conditional Types**）是一种强大的类型操作工具，它允许你根据类型关系动态选择类型结果（类似 `JavaScript` 的三元表达式）。

### 核心语法

```ts
T extends U ? X : Y
```

### 核心概念

1. **`extends` 关键字**  
   检查类型 `T` 是否可赋值给类型 `U`（即 `T` 是 `U` 的子类型）。
2. **结果选择**  
   - 若 `T extends U` 成立，返回类型 `X`
   - 否则返回类型 `Y`

### 基础用法示例

```ts
// 判断 T 是否为 string 类型
type IsString<T> = T extends string ? true : false

type A = IsString<"hello"> // true
type B = IsString<number>  // false
```

### 关键特性解析

#### 1. 分布式条件类型（Distributive Conditional Types）

<br/>

当 `T` 是联合类型时，条件类型会**自动分发**到每个成员：

```ts
type ToArray<T> = T extends any ? T[] : never

// 分发过程：(string | number) → string[] | number[]
type Result = ToArray<string | number> // string[] | number[]
```

#### 2. 阻止分发

<br/>

用 `[]` 包裹类型可禁用分发：

```ts
type NoDistribute<T> = [T] extends [any] ? T[] : never

// 不分发：(string | number)[]
type Result = NoDistribute<string | number> // (string | number)[]
```

#### 3. `infer` 关键字（类型推断）

<br/>

在 `extends` 中动态**推断中间类型**：

```ts
// 获取函数返回值类型
type ReturnType<T> = T extends (...args: any) => infer R ? R : never

type Fn = () => number
type T = ReturnType<Fn> // number
```

### 实用场景示例

#### 1. 类型过滤

```ts
// 从 T 中过滤掉 U 类型的成员
type Exclude<T, U> = T extends U ? never : T

type T = Exclude<"a" | "b" | "c", "a"> // "b" | "c"
```

#### 2. 提取函数参数

```ts
type Parameters<T> = T extends (...args: infer P) => any ? P : never

type Fn = (a: string, b: number) => void
type Params = Parameters<Fn> // [a: string, b: number]
```

#### 3. 递归类型处理

```ts
// 递归展开 Promise 的最终类型
type UnwrapPromise<T> = T extends Promise<infer U> 
  ? UnwrapPromise<U> 
  : T

type T = UnwrapPromise<Promise<Promise<string>>> // string
```

### 进阶技巧

#### 结合映射类型

```ts
// 将对象属性转为可选（跳过函数属性）
type OptionalProps<T> = {
  [K in keyof T]: T[K] extends Function ? T[K] : T[K] | undefined
}

type Obj = { id: number; log: () => void }
type OptionalObj = OptionalProps<Obj>
// { id: number | undefined; log: () => void }
```

#### 类型互斥约束

```ts
// 确保 T 和 U 不能同时存在
type Without<T, U> = T extends U ? never : T
type XOR<T, U> = Without<T | U, T & U>

type A = { a: string }
type B = { b: number }
type C = XOR<A, B> // A | B，但不能同时有 a 和 b
```

### 常见内置条件类型

<br/>

`TypeScript` 内置了基于条件类型的工具类型：

- `Exclude<T, U>`：从 `T` 中移除 `U` 的子类型
- `Extract<T, U>`：从 `T` 中提取 `U` 的子类型
- `NonNullable<T>`：排除 `null` 和 `undefined`
- `ReturnType<T>`：获取函数返回值类型
- `Parameters<T>`：获取函数参数类型

### 注意事项

1. **分发条件仅在裸类型参数（`T`）时触发**，包裹后（如 `[T]`）会禁用分发。
2. 条件类型常用于**类型推导**和**复杂类型约束**，过度使用可能降低可读性。
3. 结合 `infer` 可实现类型模式匹配，是高级类型编程的核心。

通过灵活组合条件类型、`infer` 和映射类型，你可以构建出高度动态且类型安全的 `TypeScript` 类型系统。
