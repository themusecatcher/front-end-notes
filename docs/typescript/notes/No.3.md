# Note 3

<BackTop />

## `Extract<T, U>` & `Exclude<T, U>`

在 `TypeScript` 中，`Extract<T, U>` 和 `Exclude<T, U>` 是两个内置的实用工具类型（Utility Types），用于对联合类型进行过滤操作。它们的核心区别在于：**`Exclude` 是排除符合条件（可赋值给 `U`）的类型成员，而 `Extract` 是提取符合条件（可赋值给 `U`）的类型成员**。

### 1. **`Extract<T, U>`**

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

### 2. **`Exclude<T, U>`**

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

### 总结

- **`Exclude<T, U>`**：通过条件类型排除 `T` 中可赋值给 `U` 的成员。
- **`Extract<T, U>`**：通过条件类型提取 `T` 中可赋值给 `U` 的成员。
- **底层机制**：依赖分布式条件类型和 `never` 的自动清理特性。

这两个工具类型是 `TypeScript` 类型操作的基础，常用于处理复杂的联合类型过滤和类型转换场景。

## `InstanceType` & `typeof`

在 `TypeScript` 中，`InstanceType` 和 `typeof` 是两个与类型操作相关的概念，但用途完全不同。

### 1. `typeof`（类型查询操作符）

- **作用**：获取变量、属性或函数表达式的类型（在类型上下文中使用）。
- **关键点**：
  - 用于**类型上下文**（如 `type`、`interface` 后）
  - 返回变量或值的静态类型
  - 对类使用时，返回的是**构造函数类型**（含静态成员）

```ts
class Person {
  static species = "Human"
  name: string
  constructor(name: string) {
    this.name = name
  }
}

// 获取 Person 类的构造函数类型（包含静态成员）
type PersonConstructor = typeof Person 
// 等价于：new (name: string) => Person + 静态属性

// 使用示例
const PCtor: PersonConstructor = Person
console.log(PCtor.species) // "Human"
```

### 2. `InstanceType<T>`（内置工具类型）

- **作用**：提取构造函数类型 `T` 的**实例类型**。
- **关键点**：
  - 接受一个**构造函数类型**作为泛型参数
  - 返回该构造函数创建的实例类型
  - 通常与 `typeof` 配合使用（因为类名直接使用表示实例类型）

```ts
class Person {
  name: string
  constructor(name: string) {
    this.name = name
  }
}

// 获取 Person 类的实例类型
type PersonInstance = InstanceType<typeof Person> 
// 等价于 Person 类（不含静态成员）

// 使用示例
const person: PersonInstance = new Person("Alice")
console.log(person.name) // "Alice"
```

### 对比总结

| 特性 | `typeof` | `InstanceType<T>` |
|--|--|--|
| **用途** | 获取值的类型 | 提取构造函数对应的实例类型 |
| **操作对象** | 变量/值/类（返回构造函数类型）| 构造函数类型（需泛型参数）|
| **与类配合** | `typeof Class` → 构造函数类型 | `InstanceType<typeof Class>` → 实例类型 |
| **是否内置工具类型**| 否（是TS原生操作符）| 是（内置工具类型）|

### 经典组合用法

```ts
// 定义通用工厂函数
function create<T extends new (...args: any[]) => any>(
  ctor: T,
  ...args: ConstructorParameters<T>
): InstanceType<T> {
  return new ctor(...args)
}

// 使用工厂
class Dog {
  constructor(public name: string) {}
}
const dog = create(Dog, "Buddy") // dog 类型自动推断为 Dog
```

> **重要提示**：直接使用类名（如 `Person`）在类型位置表示实例类型，相当于 `InstanceType<typeof Person>`。

### 总结

- `typeof`：在类型上下文中获取 值 的类型（常用于**获取类构造函数类型**）。
- `InstanceType`：从 **构造函数类型中提取其返回的实例类型**。

## `in` & `keyof`


`in` 和 `keyof` 是 `TypeScript` 中处理对象类型和映射类型的关键操作符，它们通常一起使用但有不同的作用：

### `keyof` 操作符（索引类型查询）

<br/>

`keyof` 用于**获取对象类型的所有键组成的联合类型**。

#### 基本用法

```ts
type User = {
  id: number
  name: string
  email: string
}

type UserKeys = keyof User // "id" | "name" | "email"
```

#### 常见应用场景

1. **安全访问对象属性**

```ts
function getValue<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key]
}

const user = { id: 1, name: "Alice" }
const name = getValue(user, "name") // ✅ 正确
const age = getValue(user, "age")   // ❌ 错误: "age" 不是 user 的键
```

2. **创建类型安全的配置对象**

```ts
type ConfigOptions = {
  theme: "light" | "dark"
  notifications: boolean
  fontSize: number
}

function setConfig<K extends keyof ConfigOptions>(
  key: K,
  value: ConfigOptions[K]
) {
  // 实现...
}

setConfig("theme", "dark")      // ✅ 正确
setConfig("theme", "blue")      // ❌ 错误: "blue" 不是有效值
setConfig("fontSize", "large")  // ❌ 错误: 值类型不匹配
```

3. **提取特定类型的键**

```ts
// 提取值为字符串类型的键
type StringKeys<T> = {
  [K in keyof T]: T[K] extends string ? K : never
}[keyof T]

type UserStringKeys = StringKeys<User> // "name" | "email"
```

### `in` 操作符（映射类型）

<br/>

`in` 用于**在映射类型中遍历联合类型**，通常与 `keyof` 一起使用。

#### 基本用法

```ts
type Readonly<T> = {
  readonly [P in keyof T]: T[P]
}

type ReadonlyUser = Readonly<User>
/* 等同于：
{
  readonly id: number
  readonly name: string
  readonly email: string
}
*/
```

#### 常见应用场景

<br/>

1. **创建对象转换工具**

```ts
// 所有属性可选
type Optional<T> = { [P in keyof T]?: T[P] }

// 所有属性可为 null
type Nullable<T> = { [P in keyof T]: T[P] | null }

// 提取子集
type Subset<T, K extends keyof T> = { [P in K]: T[P] }
```

2. **类型转换**

```ts
// 将对象类型转换为函数类型
type EventHandlers<T> = {
  [K in keyof T as `on${Capitalize<string & K>}`]: (arg: T[K]) => void
}

type UserEvents = EventHandlers<User>
/* 等同于：
{
  onId: (arg: number) => void
  onName: (arg: string) => void
  onEmail: (arg: string) => void
}
*/
```

3. **过滤属性**

```ts
// 过滤掉函数类型的属性
type DataProperties<T> = {
  [K in keyof T]: T[K] extends Function ? never : K
}[keyof T]

type UserData = Pick<User, DataProperties<User>> // 等同于 User
```

### `keyof` 和 `in` 组合使用

#### 1. 创建高级映射类型

```ts
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

type UserGetters = Getters<User>;
/* 等同于：
{
  getId: () => number;
  getName: () => string;
  getEmail: () => string;
}
*/
```

#### 2. 类型安全的状态管理

```ts
type State = {
  loading: boolean
  data: string | null
  error: Error | null
}

type ActionTypes = {
  [K in keyof State]: { type: K; payload: State[K] }
}[keyof State]

/* 等同于：
| { type: "loading"; payload: boolean }
| { type: "data"; payload: string | null }
| { type: "error"; payload: Error | null }
*/
```

#### 3. 动态表单生成

```ts
type FormField<T> = {
  [K in keyof T]: {
    label: string
    value: T[K]
    onChange: (value: T[K]) => void
  }
}

type UserForm = FormField<User>
/* 等同于：
{
  id: { label: string; value: number; onChange: (value: number) => void }
  name: { label: string; value: string; onChange: (value: string) => void }
  email: { label: string; value: string; onChange: (value: string) => void }
}
*/
```

### 高级用法和技巧

#### 1. 条件映射

```ts
// 仅映射数字类型的键
type NumberProperties<T> = {
  [K in keyof T]: T[K] extends number ? K : never
}[keyof T]

type UserNumberKeys = NumberProperties<User> // "id"
```

#### 2. 添加/修改键名

```ts
// 添加前缀
type WithPrefix<T, P extends string> = {
  [K in keyof T as `${P}${Capitalize<string & K>}`]: T[K]
}

type PrefixedUser = WithPrefix<User, "user">
/* 等同于：
{
  userId: number
  userName: string
  userEmail: string
}
*/
```

#### 3. 递归映射

```ts
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object 
    ? DeepReadonly<T[K]> 
    : T[K]
}

type NestedData = {
  id: number
  info: {
    name: string
    meta: {
      created: Date
    }
  }
}

type ReadonlyNested = DeepReadonly<NestedData>
/* 等同于：
{
  readonly id: number
  readonly info: {
    readonly name: string
    readonly meta: {
      readonly created: Date
    }
  }
}
*/
```

### 实际应用对比

| 特性 | `keyof` | `in` |
|------|---------|------|
| **用途** | 获取对象键的联合类型 | 遍历联合类型创建映射类型 |
| **操作对象** | 类型 | 联合类型 |
| **返回值** | 联合类型 | 映射类型 |
| **典型用法** | 约束泛型参数 | 创建类型转换工具 |
| **常见搭配** | `extends`、索引访问 | `as`、条件类型 |
| **应用场景** | 安全属性访问、类型提取 | 类型转换、属性过滤 |

### 总结

1. **`keyof`**：
   - 用于获取对象类型的所有键名组成的联合类型
   - 核心应用：类型安全地访问对象属性、约束泛型参数
   - 语法：`keyof T`

2. **`in`**：
   - 用于在映射类型中遍历联合类型的每个成员
   - 核心应用：创建新的映射类型、转换现有类型
   - 语法：`[K in Keys]`

3. **组合使用**：
   - `[K in keyof T]` 是 `TypeScript` 中最常见的映射模式
   - 可以实现复杂的类型转换和类型操作
   - 结合 `as` 子句可以重映射键名

```ts
// 终极实用工具：创建类型安全的属性访问器
type Accessors<T> = {
  get: () => T
  set: (value: T) => void
}

type PropertyAccessors<T> = {
  [K in keyof T]: Accessors<T[K]>
} & {
  get: () => T
  set: (value: T) => void
}

function createProxy<T>(obj: T): PropertyAccessors<T> {
  // 实现代理逻辑...
  return {} as any
}

const user = { id: 1, name: "Alice" }
const proxy = createProxy(user)

proxy.id.get()    // number
proxy.name.set("Bob") // ✅ 正确
proxy.name.set(123)   // ❌ 错误：应为 string
```

掌握 `keyof` 和 `in` 是成为 `TypeScript` 高级用户的关键，它们提供了强大的工具来创建灵活且类型安全的代码结构。
