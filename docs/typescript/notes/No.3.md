# Note 3

<BackTop />

## `Extract<T, U>` & `Exclude<T, U>`

在 `TypeScript` 中，`Extract<T, U>` 和 `Exclude<T, U>` 是两个内置的实用工具类型（Utility Types），用于对联合类型进行过滤操作。它们的核心区别在于：**`Exclude` 是排除符合条件（可赋值给 `U`）的类型成员，而 `Extract` 是提取符合条件（可赋值给 `U`）的类型成员**。

### 1. **`Exclude<T, U>`**

#### 作用

<br/>

从类型 `T` 中排除所有可以赋值给 `U` 的类型成员，生成一个新的联合类型。

#### 源码

```ts
type Exclude<T, U> = T extends U ? never : T;
```

#### 解释

- **条件类型**：`T extends U ? never : T` 是一个条件类型，它会对联合类型 `T` 的每个成员逐一进行判断。
- **分布式条件类型**：如果 `T` 是一个联合类型（如 `A | B | C`），则条件类型会对每个成员单独执行：
  - 如果某个成员可以赋值给 `U`，则返回 `never`（表示排除该成员）。
  - 否则保留该成员。
- **`never` 的作用**：`never` 是 `TypeScript` 的底层类型，表示“不可能存在的值”。在联合类型中，`never` 会被自动忽略。

#### 示例

```ts
type T = "a" | "b" | "c" | 1 | 2
type Result = Exclude<T, string> // 等价于 1 | 2
```

- 分析过程：
  - `"a"` 是 `string` → 排除 → `never`
  - `"b"` 是 `string` → 排除 → `never`
  - `"c"` 是 `string` → 排除 → `never`
  - `1` 不是 `string` → 保留 → `1`
  - `2` 不是 `string` → 保留 → `2`
- 最终结果：`1 | 2`

### 2. **`Extract<T, U>`**

#### 作用

<br/>

从类型 `T` 中提取所有可以赋值给 `U` 的类型成员，生成一个新的联合类型。

#### 源码

```ts
type Extract<T, U> = T extends U ? T : never
```

#### 解释

- **条件类型**：`T extends U ? T : never` 同样是一个条件类型。
- **分布式条件类型**：如果 `T` 是联合类型，对每个成员单独判断：
  - 如果某个成员可以赋值给 `U`，则保留该成员。
  - 否则返回 `never`（排除）。

#### 示例

```ts
type T = "a" | "b" | "c" | 1 | 2
type Result = Extract<T, string> // 等价于 "a" | "b" | "c"
```

- 分析过程：
  - `"a"` 是 `string` → 保留 → `"a"`
  - `"b"` 是 `string` → 保留 → `"b"`
  - `"c"` 是 `string` → 保留 → `"c"`
  - `1` 不是 `string` → 排除 → `never`
  - `2` 不是 `string` → 排除 → `never`
- 最终结果：`"a" | "b" | "c"`

### 关键区别

| 特性 | `Exclude<T, U>` | `Extract<T, U>` |
|--|--|--|
| **目的** | 排除 `T` 中可以赋值给 `U` 的成员 | 提取 `T` 中可以赋值给 `U` 的成员 |
| **条件结果** | `T extends U ? never : T` | `T extends U ? T : never` |
| **典型场景** | 过滤掉不需要的类型（如排除字符串）| 筛选出需要的类型（如提取字符串）|

### 源码设计细节

#### 1. **分布式条件类型**

<br/>

当 `T` 是联合类型时，条件类型会触发分布式行为，即对每个成员单独判断：

```ts
type A = Exclude<"a" | 1, string> // 1
// 等价于：
// ("a" extends string ? never : "a") | (1 extends string ? never : 1)
// → never | 1 → 1
```

#### 2. `never` 的自动清理

<br/>

在联合类型中，`never` 会被自动移除：

```ts
type B = "a" | never | 1 // 等价于 "a" | 1
```

### 实际应用场景

#### 场景 1：过滤类型

```ts
// 排除 null/undefined
type NonNullable<T> = Exclude<T, null | undefined>

// 提取函数类型
type FunctionKeys<T> = Extract<keyof T, (...args: any[]) => any>
```

#### 场景 2：联合类型操作

```ts
type UserRole = "admin" | "editor" | "guest"
type AdminRole = Extract<UserRole, "admin"> // "admin"
type NonAdminRole = Exclude<UserRole, "admin"> // "editor" | "guest"
```

#### 场景 3：类型安全的过滤

```ts
interface ApiResponse {
  data: string
  error: Error | null
  code: number
}

// 提取所有非 null 的属性类型
type NonNullProps<T> = {
  [K in keyof T]: Extract<T[K], Exclude<T[K], null>>
}

type SafeApiResponse = NonNullProps<ApiResponse>
// 等价于：
// { data: string; error: Exclude<Error | null, null>; code: number }
// → { data: string; error: Error; code: number }
```

### 总结

- **`Exclude<T, U>`**：通过条件类型排除 `T` 中可赋值给 `U` 的成员。
- **`Extract<T, U>`**：通过条件类型提取 `T` 中可赋值给 `U` 的成员。
- **底层机制**：依赖分布式条件类型和 `never` 的自动清理特性。

这两个工具类型是 `TypeScript` 类型操作的基础，常用于处理复杂的联合类型过滤和类型转换场景。
