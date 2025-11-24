# Note 2

<BackTop />

## v-if vs. v-show​

- `v-if` 是“真实的”按条件渲染，因为它确保了在切换时，条件区块内的事件监听器和子组件都会被销毁与重建。

- `v-if` 也是惰性的：如果在初次渲染时条件值为 `false`，则不会做任何事。**条件区块只有当条件首次变为 `true` 时才被渲染。**

- 相比之下，`v-show` 简单许多，**元素无论初始条件如何，始终会被渲染，只有 `CSS display` 属性会被切换**。

总的来说，**`v-if` 有更高的切换开销，而 `v-show` 有更高的初始渲染开销**。因此，**如果需要频繁切换，则使用 `v-show` 较好*；*如果在运行时绑定条件很少改变，则 `v-if` 会更合适**。

## `v-for` 与 `v-if​`

当它们同时存在于一个节点上时，`v-if` 比 `v-for` 的优先级更高。这意味着 `v-if` 的条件将无法访问到 `v-for` 作用域内定义的变量别名：

```vue
<!--
 这会抛出一个错误，因为属性 todo 此时
 没有在该实例上定义
-->
<li v-for="todo in todos" v-if="!todo.isComplete">
  {{ todo.name }}
</li>
```

在外先包装一层 `<template>` 再在其上使用 `v-for` 可以解决这个问题 (这也更加明显易读)：

```vue
<template v-for="todo in todos">
  <li v-if="!todo.isComplete">
    {{ todo.name }}
  </li>
</template>
```

:::tip 注意
同时使用 `v-if` 和 `v-for` 是不推荐的，因为这样二者的优先级不明显。

两种常见的情况可能导致这种用法：
- 过滤列表中的项目 (例如，v-for="user in users" v-if="user.isActive")。在这种情况下，可以用一个新的计算属性来替换 `users`，该属性返回过滤后的列表 (例如 activeUsers)。
- 避免渲染应该隐藏的列表 (例如 v-for="user in users" v-if="shouldShowUsers")。在这种情况下，将 `v-if` 移至容器元素 (如 ul、ol)。
:::

## Vue2 & Vue3 响应式原理

`Vue.js` 是一个流行的前端框架，它**通过 MVVM 模式实现了数据和视图的双向绑定**。在 `Vue` 中，响应式系统是框架的核心，它允许视图与数据保持同步。`Vue2` 和 `Vue3` 在响应式系统上有一些关键的区别，**主要体现在它们实现响应式原理的方式上**。

### [Vue 2 的响应式原理](https://v2.cn.vuejs.org/v2/guide/reactivity.html)

> Vue 2 使用基于 ES5 的 `Object.defineProperty` 来实现响应式系统，这个方法只是众多基本方法之一，在拦截上功能很局限，只能拦截对已有属性的读写。这个方法把传入 `data` 选项的 `JavaScript` 对象所有 `property` 转为 `getter` 和 `setter`，从而让 `Vue` 能够追踪依赖，在 `property` 被访问和修改时通知变更。

1. **基于 `Object.defineProperty`**：`Vue 2` 在初始化时会递归遍历数据对象的所有属性，并对每个属性使用 `Object.defineProperty` 来添加 `getter` 和 `setter` 拦截器。当属性被访问（`getter` 被调用）或修改（`setter` 被调用）时，`Vue` 可以知道并作出相应的处理。
2. **数组的响应式处理**：由于 `Object.defineProperty` 不能检测到**数组索引**和**长度**的变化，`Vue 2` 通过重写数组原型的方法（如 `push`、`pop`、`splice` 等）来实现数组的响应式。
3. **属性添加和删除的局限**：`Vue 2` 的响应式系统**无法检测到对象属性的添加或删除**。为了解决这个问题，`Vue` 提供了全局方法 `Vue.set` 来确保新属性也是响应式的。
4. **深度监听**：`Vue 2` 需要递归地对每个嵌套对象进行 `Object.defineProperty` 处理，这可能会对性能产生影响。
5. **兼容性问题**： 由于 `Object.defineProperty` 是 ES5 的特性，因此支持 `IE9+`

- [`Object.defineProperty()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)（algorithm/Object.property.js）
  该方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。
  - 语法：`Object.defineProperty(obj, prop, descriptor)`
  - 参数：
    - `obj`：要定义属性的对象。
    - `prop`：要定义或修改的属性的名称或 `Symbol`。
    - `descriptor`：要定义或修改的属性描述符。
  - 返回值：被传递给函数的对象。

```js
let player = {
  name: 'Curry',
  age: 34,
  career: {
    sports: 'basketball'
  }
}
function defineProperty (obj, key, val) {
  //如果某对象的属性也是一个对象，递归进入该对象，进行监听
  if (typeof val === 'object') {
    Observer(val)
  }
  Object.defineProperty(obj, key, {
    get () {
      console.log(`访问了${key}属性`)
      return val
    },
    set (newVal) {
      if (typeof newVal === 'object') {
        Observer(key)
      }
      console.log(`${key}属性被修改为${newVal}了`)
      val = newVal
    }
  })
}
// 实现一个遍历函数Observer
function Observer (obj) {
  if (typeof obj !== 'object' || obj === null) {
    return
  }
  Object.keys(obj).forEach(key => {
    defineProperty(obj, key, obj[key])
  })
}
Observer(player)
// get
console.log(player.career.sports) // basketball
console.log(player.career.exercise) // undefined
// set
player.career.sports = 'golf' // 已有属性
console.log(player.career.sports) // golf
player.num = 30 // 新增属性无法监听
console.log(player.num) // 无法触发监听
console.log(player)
player.career.height = 190 // 添加新属性
console.log(player.career.height) // 190
```

### [Vue 3 的响应式原理](https://cn.vuejs.org/guide/extras/reactivity-in-depth.html)

> Vue 3 引入了基于 ES6 的 `Proxy` 作为实现响应式系统的主要方式。`Proxy` 可以拦截和重定义对象的基本方法（所有的基本操作方法），基于 Proxy 实现响应式，代理整个对象。

1. **基于 `Proxy` 和 `Reflect`**：`Vue 3` 使用 `Proxy` 来创建一个响应式对象，可以拦截和重定义对象的基本方法（所有的基本操作方法）。`Proxy` 可以拦截对象的几乎所有操作，包括属性的读取、设置、删除等，而 `Reflect` API 提供了与操作对象属性相关的操作，如 `Reflect.get` 和 `Reflect.set`。

2. **原生支持数组**：与 `Vue2` 不同，`Vue3` 不需要重写数组原型，因为 `Proxy` 可以原生地拦截数组的各种操作。

3. **属性添加和删除的支持**：`Proxy` **可以检测到对象属性的添加和删除**，这意味着 `Vue3` 可以在不使用 `Vue.set` 的情况下，自动使新属性变为响应式。

4. **性能优化**：`Vue3` 的响应式系统在性能上进行了优化，包括批量处理依赖项和缓存，减少了不必要的依赖收集和更新。

5. **兼容性问题**：由于 `Proxy` 是 `ES6` 的特性，`Vue3` 不能在不支持 `Proxy` 的环境中运行（如 `IE11` 之前的浏览器）。不过，`Vue3` 提供了兼容构建版本，可以在不支持 `Proxy` 的环境中使用。

总结来说，`Vue3` 的响应式系统在功能和性能上都有显著的提升，但同时也带来了对现代浏览器环境的要求。开发者需要根据项目需求和目标用户的浏览器使用情况来选择合适的 `Vue` 版本。

- [`Proxy()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)（algorithm/Proxy.js）
  `Proxy` 对象用于创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等）。
  - 语法：`const p = new Proxy(target, handler)`
  - 参数：
    - `target`：要使用 `Proxy` 包装的目标对象（可以是任何类型的对象，包括原生数组，函数，甚至另一个代理）。
    - `handler`：一个通常以函数作为属性的对象，各属性中的函数分别定义了在执行各种操作时代理 `p` 的行为。

```js
// 检查一个值是否为对象类型
function isObject (value) {
  return value !== null && typeof value === 'object'
}
function createReactiveObject (obj) {
  const handler = {
    get (target, key, receiver) {
      console.log(`get target['${key}'] value`)
      const res = Reflect.get(target, key, receiver)
      return res
    },
    set (target, key, value, receiver) {
      console.log(`target['${key}'] changed to '${value}'`)
      if (key in target && target[key] === value) {
        return true
      }
      Reflect.set(target, key, value, receiver)
      return true
    },
    deleteProperty (target, key) {
      console.log(`target['${key}'] has been deleted`)
      const res = Reflect.deleteProperty(target, key)
      return res
    }
  }
  const observed = {}
  for (const key in obj) {
    if (isObject(obj[key])) {
      observed[key] = createReactiveObject(obj[key])
    } else {
      observed[key] = obj[key]
    }
  }
  const proxy = new Proxy(observed, handler)
  return proxy
}

const player = {
  name: 'Curry',
  age: 34,
  career: {
    sports: 'basketball'
  }
}
const reactiveData = createReactiveObject(player)

console.log('reactiveData:', reactiveData) // { name: 'Curry', age: 34, career: { sports: 'basketball' } }

// 访问响应式数据name
console.log('name:', reactiveData.name) // curry

// 修改响应式数据
reactiveData.name = 'Stephen' // 输出: "'name' changed to 'Stephen'"
console.log('reactiveData:', reactiveData)

reactiveData.career.sports = 'golf'
console.log('reactiveData:', reactiveData)

// 删除响应式数据
delete reactiveData.career.sports // 输出: "'sports' has been deleted"
console.log('reactiveData:', reactiveData)
```

## [Reflect](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect)

`Reflect` 是一个内置的对象，它提供拦截 `JavaScript` 操作的方法。这些方法与 `proxy handler` (en-US) 的方法相同。`Reflect` 不是一个函数对象，因此它是不可构造的。

> 用于调用对象的基本操作方法（内部方法）

### 静态方法

- `Reflect.apply(target, thisArgument, argumentsList)`：<br/>
  对一个函数进行调用操作，同时可以传入一个数组作为调用参数。和 `Function.prototype.apply()` 功能类似。
- `Reflect.construct(target, argumentsList[, newTarget])`：<br/>
  对构造函数进行 `new` 操作，相当于执行 `new target(...args)`。
- `Reflect.defineProperty(target, propertyKey, attributes)`：<br/>
  和 `Object.defineProperty()` 类似。如果设置成功就会返回 `true`
- `Reflect.deleteProperty(target, propertyKey)`：<br/>
  作为函数的 `delete` 操作符，相当于执行 `delete target[name]`。
- `Reflect.get(target, propertyKey[, receiver])`：<br/>
  获取对象身上某个属性的值，类似于 `target[name]`。

- `Reflect.getOwnPropertyDescriptor(target, propertyKey)`：<br/>
  类似于 `Object.getOwnPropertyDescriptor()`。如果对象中存在该属性，则返回对应的属性描述符，否则返回 `undefined`。
- `Reflect.getPrototypeOf(target)`：<br/>
  类似于 `Object.getPrototypeOf()`。
- `Reflect.has(target, propertyKey)`：<br/>
  判断一个对象是否存在某个属性，和 `in` 运算符 的功能完全相同。
- `Reflect.isExtensible(target)`：<br/>
  类似于 `Object.isExtensible()`.
- `Reflect.ownKeys(target)`：<br/>
  返回一个包含所有自身属性（不包含继承属性）的数组。(类似于 `Object.keys()`, 但不会受 `enumerable` 影响).
- `Reflect.preventExtensions(target)`：<br/>
  类似于 `Object.preventExtensions()`。返回一个 `Boolean`。
- `Reflect.set(target, propertyKey, value[, receiver])`：<br/>
  将值分配给属性的函数。返回一个 `Boolean`，如果更新成功，则返回 `true`。
- `Reflect.setPrototypeOf(target, prototype)`：<br/>
  设置对象原型的函数。返回一个 `Boolean`，如果更新成功，则返回 `true`。

### 示例

> 检测一个对象是否存在特定属性

  ```js
  const duck = {
    name: 'Maurice',
    color: 'white',
    greeting: function() {
      console.log(`Quaaaack! My name is ${this.name}`)
    }
  }

  Reflect.has(duck, 'color')
  // true
  Reflect.has(duck, 'haircut')
  // false
  ```

> 返回这个对象自身的属性

  ```js

  Reflect.ownKeys(duck)
  // [ "name", "color", "greeting" ]
  ```

> 为这个对象添加一个新的属性

  ```js
  Reflect.set(duck, 'eyes', 'black')
  // returns "true" if successful
  // "duck" now contains the property "eyes: 'black'"
  ```

### 实例解析

1. 实例一

```js
const obj = {}

obj.a = 1 // (间接)在内部会调用内部方法 [[SET]]
Reflect.set(obj, 'a', 2) // (直接)调用内部方法 [[SET]]
obj.a // [[GET]]

console.log(obj) // { a: 2 }
```

2. 实例二

```js
const obj = {
  a: 1,
  b: 2,
  get c () { // 语法糖写法，相当于 Object.defineProperty(obj, 'c', 
    return this.a + this.b
  }
}
console.log(obj.c) // 3 间接调用内部方法 [[GET]]
// 7 (直接)调用内部方法 [[GET]]  get(target, propertyKey, receiver) receiver(可选)：用于指定调用时的 this 指向
Reflect.get(obj2, 'c', { a: 3, b: 4 })
```

3. 实例三

```js
const obj = {
  a: 1,
  b: 2,
  get c () { // 语法糖写法，相当于 Object.defineProperty(obj, 'c', 
    return this.a + this.b
  }
}
const proxy1 = new Proxy(obj, {
  get (target, property) {
    console.log('get1', property)
    return target[property]
  },
  set (target, property, value) {
    console.log('set1', property, value)
    return target[property] = value
  }
})

console.log(proxy1.a)
// get1 a
// 1
console.log(proxy1.c)
// 因为此时 this 指向 obj，而不是 proxy1，因此没有触发 get1 a、get1 b
// get1 c
// 3

const proxy2 = new Proxy(obj, {
  get (target, property, receiver) { // receiver 主要用于指定 this 指向
    console.log('get2', property)
    return Reflect.get(target, property, receiver) // 或者 Reflect.get(target, property, proxy2)
  },
  set (target, property, value, receiver) {
    console.log('set2', property, value)
    return Reflect.set(target, property, value, receiver)
  }
})

console.log(proxy2.a)
// get2 a
// 1
console.log(proxy2.c)
// get2 c
// get2 a
// get2 b
// 3
```
## vue3 登录拦截与跳转相关

- 登录跳转逻辑

```ts
const router = useRouter()
// 登录成功之后跳转到 mine 页面，添加 replace 属性，避免点击返回时回到登录页
router.push({ path: '/mine', replace: true })
```

- 在 `router/index.ts` 中添加全局前置守卫 `router.beforeEach`

```ts
router.beforeEach((to, from) => {
  console.log('beforeEach', to)
  const isAuthenticated = Boolean(store.get('token')) // 是否已登录
  // 检查用户是否已登录；避免无限重定向
  if (!isAuthenticated && to.name !== 'Login') {
     // 将用户重定向到登录页面
     return { name: 'Login' }
   }
})
```
