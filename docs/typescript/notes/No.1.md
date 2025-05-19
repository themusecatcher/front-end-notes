# Note 1

<BackTop />

## `interface` & `type`

在 `TypeScript` 中，`interface` 和 `type` 都可以用来定义类型，但它们在设计目的和使用场景上有一些关键区别。

### 1. **声明合并（Declaration Merging）**

- **`interface`**：支持声明合并。
  如果多次定义同名接口，`TypeScript` 会自动合并它们的属性。  
  例如：

  ```ts
  interface User { name: string; }
  interface User { age: number; }
  // 合并为：{ name: string; age: number; }
  ```

- **`type`**：不允许重复定义同名类型别名，否则会报错。

  ```ts
  type User = { name: string } // ✅
  type User = { age: number }  // ❌ 错误：重复标识符
  ```

### 2. **适用范围**

- **`interface`**：
  专门用于定义**对象类型**（如对象、函数、类等），不能直接描述非对象类型（如联合类型、原始类型等）。

- **`type`**：
  可以定义**任意类型**，包括对象、联合类型（`|`）、交叉类型（`&`）、元组、条件类型、映射类型等。
  例如：

  ```ts
  type StringOrNumber = string | number  // 联合类型
  type Point = [number, number]          // 元组
  type OptionalUser = Partial<User>      // 映射类型
  ```

### 3. **扩展方式**

- **`interface`**：

  使用 `extends` 关键字扩展其他接口。

  ```ts
  interface Animal { name: string; }
  interface Dog extends Animal { bark(): void; }
  ```

- **`type`**：
  使用交叉类型（`&`）扩展其他类型。

  ```ts
  type Animal = { name: string }
  type Dog = Animal & { bark(): void }
  ```

### 4. **实现（Implements）**

- **类**可以通过 `implements` 关键字实现 `interface` 或 `type` 定义的对象类型：

  ```ts
  interface IUser { name: string }
  type TUser = { name: string }

  class User implements IUser, TUser { 
    name: string
  }
  ```

- **注意**：如果 `type` 定义的并非对象类型（如联合类型 `string | number`），则类无法实现它。

### 5. **错误提示**

- 使用 `interface` 时，错误提示会显示接口名称（如 `User`）。  
- 使用 `type` 时，错误提示可能直接展开类型结构（尤其在复杂类型中）。

### 6. **性能差异（工具类型推断）**

- 在复杂类型操作（如条件类型、映射类型）中，`interface` 可能不如 `type` 灵活。例如：

  ```ts
  type Keys = "name" | "age"
  type User = { [K in Keys]: string } // 映射类型只能用 type 定义
  ```

### 总结：何时用哪个？

- **优先用 `interface`**：  
  需要声明合并（如扩展第三方库类型），或明确表示对象的结构（尤其是类实例的契约）。

- **用 `type`**：  
  需要定义联合类型、交叉类型、元组、条件类型等复杂类型，或需要直接引用某个类型别名。

**示例对比**：

| 特性 | `interface` | `type` |
|--|--|--|
| 声明合并 | ✅ | ❌ |
| 扩展方式 | `extends` | `&`（交叉类型）|
| 非对象类型（如联合类型）| ❌ | ✅ |
| 工具类型（如 `Partial`）| ✅（但通常与 `type` 结合使用）| ✅ |
| 类实现（`implements`）| ✅ | ✅（仅限对象类型的 `type`）|

## `Partial<Type>` & `Required<Type>`

`TypeScript` 中的 `Partial<Type>` 和 `Required<Type>` 是两种常用的 **工具类型（Utility Types）**，用于对现有类型进行属性可选性或必选性的转换。它们通过调整对象属性的修饰符（`?`）来实现灵活的类型操作。

### **1. `Partial<Type>`**

#### **功能**

<br/>

将类型 `Type` 的所有属性变为 **可选**（即添加 `?` 修饰符），生成一个新类型。

#### **语法**

```ts
type PartialType = Partial<Type>
```

#### **示例**

```ts
interface User {
  id: number
  name: string
  age: number
}

type PartialUser = Partial<User>

/* 
等价于：
type PartialUser = {
  id?: number
  name?: string
  age?: number
}
*/
```

#### **实现原理**

<br/>

`Partial` 的内部定义（`TypeScript` 源码）：

```ts
type Partial<T> = {
  [P in keyof T]?: T[P]
}
```

- **`keyof T`**：获取类型 `T` 的所有属性名（如 `"name" | "age" | "email"`）。
- **`[P in keyof T]`**：遍历 `T` 的每个属性。
- **`?: T[P]`**：将每个属性的类型标记为可选（`?` 符号）。

本质上，它是通过映射类型（Mapped Type）实现的属性遍历和修饰符修改。

#### **应用场景**

- **部分更新对象**：允许仅传递需要修改的属性（如 `API` 的 `PATCH` 请求参数）。
- **初始化对象**：逐步构建对象时，避免必须初始化所有属性。
- **函数参数**：接受部分属性的对象作为输入。

#### **示例代码**

```ts
function updateUser(id: number, fields: Partial<User>) {
  // 仅更新传入的字段
  fetch(`/users/${id}`, { method: "PATCH", body: JSON.stringify(fields) });
}

// 调用时只需传递需要更新的字段
updateUser(1, { name: "Alice" }) // 合法
updateUser(2, { age: 30 })       // 合法
```

### **2. `Required<Type>`**

#### **功能**

<br/>

将类型 `Type` 的所有属性变为 **必选**（即移除 `?` 修饰符），生成一个新类型。

#### **语法**

```ts
type RequiredType = Required<Type>
```

#### **示例**

```ts
interface Config {
  apiUrl?: string
  timeout?: number
  retry?: boolean
}

type RequiredConfig = Required<Config>

/* 
等价于：
type RequiredConfig = {
  apiUrl: string
  timeout: number
  retry: boolean
}
*/
```

#### **实现原理**

<br/>

`Required<Type>` 的源码定义如下：

```ts
type Required<T> = {
  [P in keyof T]-?: T[P]
}
```

- **`keyof T`**：获取类型 `T` 的所有属性名组成的联合类型。
- **`[P in keyof T]`**：通过映射类型（Mapped Types）遍历 `T` 的每个属性 `P`。
- **`-?`**：移除属性 `P` 的可选修饰符 `?`，使其变为必选属性。
- **`T[P]`**：保留属性 `P` 的原始类型。

#### **应用场景**

- **强制完整性**：确保对象必须包含所有属性（如配置文件的完整校验）。
- **数据转换**：将可选属性转换为必选属性，避免运行时缺失关键数据。

#### **示例代码**

```ts
function validateConfig(config: Required<Config>) {
  if (!config.apiUrl) throw new Error("apiUrl 必须提供")
  // 确保所有属性已存在
}

// 调用时必须传入完整配置
validateConfig({ apiUrl: "https://api.example.com", timeout: 5000, retry: true }) // 合法
validateConfig({ timeout: 5000 }) // 报错：缺少 apiUrl 和 retry
```

### **3. 对比 `Partial` 和 `Required`**

| **特性** | **`Partial<Type>`** | **`Required<Type>`** |
|--|--|--|
| **目标** | 所有属性变为可选 | 所有属性变为必选 |
| **修饰符** | 添加 `?` | 移除 `?` |
| **适用场景** | 部分更新、可选参数 | 强制完整性、严格校验 |

### **4. 进阶用法**

#### **(1) 结合其他工具类型**

<br/>

与其他工具类型（如 `Pick`、`Omit`）结合使用，实现更精准的类型操作：

```ts
interface Product {
  id: number
  name: string
  price?: number
  description?: string
}

// 选择部分属性并设为必选
type ProductDetails = Required<Pick<Product, "name" | "description">>
/* 
等价于：
type ProductDetails = {
  name: string
  description: string
}
*/
```

#### **(2) 递归处理嵌套对象**

<br/>

默认情况下，`Partial` 和 `Required` 是浅层操作。若需递归处理嵌套对象，需自定义工具类型：

```ts
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

interface Order {
  id: number
  items: { productId: number; quantity: number }[]
}

type PartialOrder = DeepPartial<Order>
/* 
允许：
const draftOrder: PartialOrder = {
  items: [{ productId: 1 }] // quantity 可选
}
*/

type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P]
}
```

#### **(3) 联合类型的处理**

<br/>

当 `Type` 是联合类型时，`Partial` 和 `Required` 会分别作用于每个成员：

```ts
type A = { a: number } | { b: string }
type PartialA = Partial<A> // { a?: number } | { b?: string }
type RequiredA = Required<A> // { a: number } | { b: string }
```

### **5. 注意事项**

1. **浅层转换**

  `Partial` 和 `Required` 不会递归处理嵌套对象属性。若需深度转换，需自行实现（如 `DeepPartial` & `DeepRequired`）。

2. **索引签名与特殊类型**

  如果 `Type` 包含索引签名或联合类型，转换结果可能需特别验证：

  ```ts
  interface WithIndex {
    [key: string]: number
    id: number
  }
  
  type PartialWithIndex = Partial<WithIndex>
  // 索引签名属性也会变为可选，但需保持类型一致性
  ```

3. **与 `readonly` 的兼容性**

  `Partial` 和 `Required` 不会影响 `readonly` 修饰符。若需同时修改可选性和只读性，需结合 `Readonly` 或可变工具类型。

### **6. 总结**

- **`Partial<Type>`**：将类型所有属性变为可选，适合部分更新或可选参数场景。
- **`Required<Type>`**：将类型所有属性变为必选，适合强制数据完整性的场景。
- **灵活组合**：结合其他工具类型（如 `Pick`、`Omit`、`Readonly`），可以构建出复杂且类型安全的类型系统。

这两个工具类型是 `TypeScript` 类型编程的基石，合理使用可显著提升代码的可维护性和健壮性。

## `Readonly<Type>`

`TypeScript` 的 `Readonly<Type>` 是一个实用工具类型，用于将类型的所有属性设置为**只读**（readonly）。

### **1. 基础用法**

```ts
interface User {
  name: string
  age: number
}

const user: Readonly<User> = { name: "Alice", age: 30 }

user.name = "Bob" // 🚨 编译错误: 无法修改只读属性
```

- 所有属性变为不可修改。
- 编译时立即捕获对属性的修改操作。

### **2. 实现原理**

<br/>

它的底层实现是一个**映射类型**：

```ts
type Readonly<T> = {
  readonly [P in keyof T]: T[P]
}
```

- 遍历 `T` 的所有属性，为每个属性添加 `readonly` 修饰符。

### **3. 关键特性**

- **浅层只读**：仅作用于当前层属性，嵌套对象不会自动变为只读。

  ```ts
  interface Nested {
    data: { value: number }
  }

  const obj: Readonly<Nested> = { data: { value: 1 } }
  obj.data.value = 2 // ✅ 允许修改嵌套属性
  ```

- **深层只读**

  ```ts
  type DeepReadonly<T> = {
    readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P]
  }
  ```

- **强制覆盖**：无论原属性是否已为只读，最终结果均为只读。

### **4. 对比 `as const`**

| 特性 | `Readonly<Type>` | `as const` |
|--|--|--|
| **作用对象** | 类型 | 值 |
| **嵌套属性** | 浅层只读 | 深层只读 |
| **字面量类型推断** | 保留原有类型 | 收窄为具体字面量类型 |

```ts
// Readonly<Type>
const user: Readonly<User> = { name: "Alice", age: 30 } // name 类型仍是 string

// as const
const user = { name: "Alice" } as const // name 类型为 "Alice"
```

### **5. 深度只读方案**

<br/>

如需递归设置所有嵌套属性为只读，需自定义类型：

```ts
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P]
}

interface Nested {
  data: { value: number }
}

const obj: DeepReadonly<Nested> = { data: { value: 1 } }
obj.data.value = 2 // 🚨 编译错误
```

### **6. 典型应用场景**

- **函数参数保护**：防止函数内部意外修改传入对象。

  ```ts
  function logUser(user: Readonly<User>) {
    user.name = "Hacked" // 🚨 编译时报错
  }
  ```

- **不可变状态**：在 `Redux` 或状态管理中定义不可变状态。

### **总结**

- `Readonly<Type>` 是 `TypeScript` 实现编译时属性不可变的轻量级工具。
- 浅层只读特性需注意，深度只读需自定义实现。
- 与 `as const` 结合使用，可同时实现类型收窄和不可变性。

## `Pick<T, K>` 和 `Omit<T, K>`

`TypeScript` 中的 `Pick<T, K>` 和 `Omit<T, K>` 是 **泛型工具类型（Utility Types）**，用于对现有类型进行裁剪和转换。它们通过组合或排除类型的属性来实现灵活的类型操作，是 `TypeScript` 类型编程中常用的工具。

### **1. `Pick<T, K>`**

#### **功能**

<br/>

从类型 `T` 中选取 **指定的属性集合 `K`**，生成新的类型。

#### **语法**

```ts
type NewType = Pick<T, K>
```

- `T`：原始类型。
- `K`：需要保留的属性名的联合类型（`keyof T` 的子集）。

#### **示例**

```ts
interface User {
  id: number
  name: string
  age: number
  email: string
}

// 选取 User 中的 "name" 和 "email" 属性
type UserBasicInfo = Pick<User, "name" | "email">

/* 
等价于：
type UserBasicInfo = {
  name: string;
  email: string;
};
*/
```

#### **应用场景**

- 需要从复杂类型中提取部分属性。
- 定义组件 `Props` 或 `API` 请求参数时，复用已有类型的一部分属性。

### **2. `Omit<T, K>`**

#### **功能**

从类型 `T` 中 **排除指定的属性集合 `K`**，生成新的类型。

#### **语法**

```ts
type NewType = Omit<T, K>
```

- `T`：原始类型。
- `K`：需要排除的属性名的联合类型（`keyof T` 的子集）。

#### **示例**

```ts
interface User {
  id: number
  name: string
  age: number
  email: string
}

// 排除 User 中的 "id" 和 "age" 属性
type UserWithoutSensitiveInfo = Omit<User, "id" | "age">

/* 
等价于：
type UserWithoutSensitiveInfo = {
  name: string;
  email: string;
};
*/
```

#### **应用场景**

- 需要排除某些敏感或不必要的属性。
- 在类型继承或组合时，避免属性冲突。

### **3. 两者的对比**

| **特性** | **`Pick<T, K>`** | **`Omit<T, K>`** |
|--|--|--|
| **目标** | 保留 `K` 中的属性 | 排除 `K` 中的属性 |
| **参数 `K`** | `K` 是需保留的属性的联合类型 | `K` 是需排除的属性的联合类型 |
| **互补关系** | `Pick<T, K>` ≈ `Omit<T, Exclude<keyof T, K>>` | 反之亦然 |

### **4. 进阶用法**

#### **(1) 动态选择属性**

<br/>

结合联合类型或条件类型动态操作属性：

```ts
// 动态排除所有函数类型的属性
type NonFunctionProps<T> = Omit<T, {
  [K in keyof T]: T[K] extends Function ? K : never
}[keyof T]>

interface Example {
  name: string
  age: number
  log: () => void
}

type DataProps = NonFunctionProps<Example> // { name: string; age: number }
```

#### **(2) 与 `keyof` 和 `in` 配合**

<br/>

在类型编程中结合 `keyof` 和映射类型：

```ts
// 将所有属性变为可选并排除 "id"
type PartialWithoutId<T> = Partial<Omit<T, "id">> & { id?: never }

interface Product {
  id: string
  name: string
  price: number
}

type EditableProduct = PartialWithoutId<Product>
// 等价于 { name?: string; price?: number; id?: never }
```

#### **(3) 嵌套类型裁剪**

<br/>

对嵌套对象类型进行属性操作：

```ts
interface Order {
  id: string
  items: Array<{ productId: string; quantity: number }>
  createdAt: Date
}

// 排除嵌套对象中的 "productId"
type SanitizedOrder = Omit<Order, "items"> & {
  items: Array<Omit<Order["items"][0], "productId">>
}
```

### **5. 注意事项**

1. **属性存在性检查**

  `K` 中的属性必须是 `T` 的键，否则会报错：

  ```ts
  type InvalidPick = Pick<User, "gender"> // 错误："gender" 不在 User 中
  ```

2. **联合类型操作**

  如果 `T` 是联合类型，`Pick` 和 `Omit` 会作用于联合类型的每个成员：

  ```ts
  type A = { a: number; b: string } | { a: boolean; c: number }
  type B = Pick<A, "a"> // { a: number } | { a: boolean }
  ```

3. **与 `Exclude` 和 `Extract` 的关系**

  - `Pick` 基于属性名选择，`Extract` 基于类型选择。
  - `Omit` 基于属性名排除，`Exclude` 基于类型排除。

### **6. 总结**

- **`Pick<T, K>`**：精准保留需要的属性，适合从大类型中提取子集。
- **`Omit<T, K>`**：快速排除不需要的属性，适合清理或简化类型。
- **结合其他工具类型**（如 `Partial`、`Required`、`Record`）可以实现更复杂的类型操作。

这两个工具类型是 `TypeScript` 类型编程的基础，灵活使用可以显著提升代码的可维护性和类型安全性。

## `Record<K, T>` (`Record<Keys, Type>`)

`TypeScript` 的 `Record<K, T>` 是一个强大的工具类型，用于**构造键值映射关系明确的对象类型**。

### **1. 基础用法**

```ts
type UserRoles = "admin" | "user" | "guest"

// 定义所有角色对应的权限等级
type RolePermissions = Record<UserRoles, number>
// 等效于：
// type RolePermissions = {
//   admin: number
//   user: number
//   guest: number
// }

const permissions: RolePermissions = {
  admin: 10,
  user: 2,
  guest: 0
}
```

- **`K`** 表示对象的键类型（需为 `string | number | symbol` 的子类型）。
- **`T`** 表示对象的值类型。

### **2. 实现原理**

<br/>

底层通过**映射类型**实现：

```ts
type Record<K extends keyof any, T> = {
  [P in K]: T
}
```

- 遍历 `K` 的每个成员作为键，统一值为 `T` 类型。
- `K extends keyof any` 约束键类型必须为合法的对象键类型（`string | number | symbol`）。

::: tip 备注
`keyof any` 表示 所有合法的对象键类型的联合类型。在 `TypeScript` 中，对象键的类型只能是 `string`、`number` 或 `symbol`，因此：

```ts
type KeyTypes = keyof any
// 等价于 type KeyTypes = string | number | symbol
```

:::

### **3. 关键特性**

#### **特性 1：强制完整键集合**

<br/>

若 `K` 是联合类型，对象必须包含所有键：

```ts
type Keys = "a" | "b"
const obj: Record<Keys, number> = { a: 1, b: 2 } // ✅
const objMissing: Record<Keys, number> = { a: 1 } // 🚨 缺少属性 b
```

#### **特性 2：动态键名约束**

<br/>

与索引签名 `{ [key: string]: T }` 不同，`Record` 更严格：

```ts
// 索引签名允许任意字符串键
type LooseObj = { [key: string]: number }
const loose: LooseObj = { anyKey: 1 } // ✅

// Record 可约束键范围
type StrictKeys = "id" | "name"
type StrictObj = Record<StrictKeys, string>
const strict: StrictObj = { id: "1", name: "Alice" } // ✅
const invalid: StrictObj = { other: "..." } // 🚨 键不在 StrictKeys 中
```

#### **特性 3：与枚举结合**

<br/>

常用于枚举值到具体数据的映射：

```ts
enum Status {
  Loading,
  Success,
  Error
}

type StatusMessages = Record<Status, string>
const messages: StatusMessages = {
  [Status.Loading]: "加载中...",
  [Status.Success]: "成功!",
  [Status.Error]: "出错了!"
}
```

### **4. 典型应用场景**

#### **场景 1：类型安全的键值存储**

```ts
// 定义配置对象，确保每个环境都有对应配置
type Env = "dev" | "prod"
type EnvConfig = Record<Env, { apiUrl: string }>

const config: EnvConfig = {
  dev: { apiUrl: "http://localhost:3000" },
  prod: { apiUrl: "https://api.example.com" }
}
```

#### **场景 2：联合类型到值的映射**

```ts
type EventType = "click" | "hover" | "scroll"
type EventHandlers = Record<EventType, () => void>

const handlers: EventHandlers = {
  click: () => console.log("Clicked!"),
  hover: () => console.log("Hovered!"),
  scroll: () => console.log("Scrolled!")
}
```

#### **场景 3：动态生成对象类型**

```ts
// 根据数组生成键名
const categories = ["books", "movies"] as const
type Category = typeof categories[number] // "books" | "movies"

type CategoryData = Record<Category, { count: number }>
const data: CategoryData = {
  books: { count: 100 },
  movies: { count: 50 }
}
```

### **5. 对比索引签名**

| 特性 | `Record<K, T>` | 索引签名 `{ [key: string]: T }` |
|--|--|--|
| **键的确定性** | 明确已知的键集合 (`K`) | 任意符合键类型的键 |
| **类型检查严格性** | 必须包含所有 `K` 的键 | 允许不预定义的键 |
| **使用场景** | 固定键集合的严格映射 | 开放式键结构的松散映射 |

### **6. 进阶技巧**

#### **技巧 1：与 `Partial` 结合**

<br/>

实现**部分键可选**的映射：

```ts
type PartialRecord<K extends keyof any, T> = Partial<Record<K, T>>

type ThemeColors = "primary" | "secondary"
const colors: PartialRecord<ThemeColors, string> = {
  primary: "#007bff" // secondary 可选
}
```

#### **技巧 2：递归嵌套结构**

<br/>

定义嵌套的映射关系：

```ts
type NestedRecord<K extends keyof any, T> = Record<K, T | NestedRecord<K, T>>

const tree: NestedRecord<string, number> = {
  value: 1,
  children: {
    value: 2,
    children: { value: 3 }
  }
}
```

### **总结**

- `Record<K, T>` 是构建**键类型明确**且**值类型统一**的对象类型的首选工具。
- 强制完整性检查的特性，使其在需要严格约束键集合的场景中非常有用。
- 与枚举、联合类型结合使用时，能极大提升代码的类型安全性和可维护性。

