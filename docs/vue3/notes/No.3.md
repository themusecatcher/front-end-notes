# Note 3

<BackTop />

## Vue3+TypeScript+Vite+Less 开发 H5 项目（amfe-flexible + postcss-pxtorem）

### 参考文档

- [amfe-flexible](https://www.npmjs.com/package/amfe-flexible)：将根元素 `html` 的字体大小 `fontSize（1rem）` 设为 `viewWidth / 10`，以适配不同终端

- [postcss-pxtorem](https://www.npmjs.com/package/postcss-pxtorem)：将 `px` 单位转换为 `rem` 单位

### 安装依赖

```bash
pnpm add amfe-flexible
pnpm add postcss-pxtorem -D
```

### 引入插件

<br/>

在 `mian.ts` 中引入

```ts
import 'amfe-flexible'
```

### 配置插件

<br/>

在 `vite.config.ts` 中添加相关配置

```ts
import type { ConfigEnv, UserConfig } from 'vite'
import pxtorem from 'postcss-pxtorem'

export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
  console.log(command, mode)
  return {
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            themeColor: '#1677ff'
          },
          javascriptEnabled: true,
        }
      },
      postcss: {
        plugins: [
          pxtorem({
            rootValue: 75, // 类型：Number | Function；根元素字体大小，默认 16，一般设置为设计稿尺寸 viewWidth 的 1/10（750 => 75 / 375 => 37.5）
            unitPrecision: 5, // 类型：Number；rem 单位允许的小数位数，默认 5
            propList: ['*'], // 类型：Array，需要将 px 单位转换为 rem 单位的属性列表，默认 ['font', 'font-size', 'line-height', 'letter-spacing']
            selectorBlackList: [] // 类型：Array，需要忽略的选择器列表，不会转换 px 单位，默认 []
            replace: true, // 类型：Boolean，默认 true
            exclude: (file: any) => { // 类型：String | Regexp | Function，要忽略并保持 px 单位的文件路径，默认 /node_modules/i
              if (file.includes('h5'))) {
                // 将所有包含 h5 目录中的文件 px 单位转换为 rem 单位
                return false
              }
              return true
            }
          })
        ]
      }
    }
  }
})
```

## Vue3 使用事件总线

### 发布-订阅模式 使用 `Map` 和 `Set` 实现

```ts
// eventBus.ts
// 发布-订阅模式 使用 Map 和 Set 实现
export class EventBus {
  private eventsMap: Map<string, Set<Function>>
  constructor() {
    this.eventsMap = new Map() // 存储事件及其回调列表
  }
  /**
   * 订阅事件
   * @param {string} event - 事件名称
   * @param {Function} callback - 回调函数
   */
  on(event: string, callback: Function): void {
    if (typeof callback !== 'function') {
      throw new TypeError('Callback must be a function')
    }
    if (!this.eventsMap.has(event)) {
      this.eventsMap.set(event, new Set())
    }
    this.eventsMap.get(event)!.add(callback)
  }
  /**
   * 发布事件
   * @param {string} event - 事件名称
   * @param {...*} args - 传递给回调函数的参数
   */
  emit(event: string, ...args: any[]): void { // ...args：剩余参数语法，用于将所有接收到的参数收集到 args 数组中
    const callbacksSet = this.eventsMap.get(event)
    if (callbacksSet) {
      for (const cb of callbacksSet) { // 或者 forEach
        try {
          cb(...args) // 同步执行回调，可在此处添加异步逻辑
        } catch (e) {
          console.error(`Error in ${event} handler:`, e)
        }
      }
    }
  }
  /**
   * 取消订阅
   * @param {string} event - 事件名称
   * @param {Function} callback - 要取消的回调函数
   */
  off(event: string, callback: Function): void {
    if (typeof callback !== 'function') {
      throw new TypeError('Callback must be a function')
    }
    const callbacksSet = this.eventsMap.get(event)
    if (callbacksSet && callbacksSet.has(callback)) {
      callbacksSet.delete(callback)
      // 如果该事件的所有回调都被移除，则从 eventsMap 中删除该事件
      if (callbacksSet.size === 0) {
        this.eventsMap.delete(event)
      }
    }
  }
  /**
   * 一次性订阅事件
   * @param {string} event - 事件名称
   * @param {Function} callback - 回调函数
   */
  once(event: string, callback: Function): void {
    if (typeof callback !== 'function') {
      throw new TypeError('Callback must be a function')
    }
    const onceWrapper = (...args: any[]) => {
      try {
        callback(...args)
      } finally {
        this.off(event, onceWrapper) // 确保无论是否抛出异常，都自动取消订阅
      }
    }
    this.on(event, onceWrapper)
  }
}
```

### 使用 `app.config.globalProperties.$eventBus` 添加全局事件总线

```ts
// main.ts
import { createApp } from 'vue'
import App from './App.vue'
 
const app = createApp(App)
import { EventBus } from './EventBus'
app.config.globalProperties.$eventBus = new EventBus()
 
app.mount('#app')
```

```vue
<script setup>
// 引入使用
import { EventBus } from './EventBus'
const eventBus = new EventBus()

// 全局事件总线使用
import { getCurrentInstance } from 'vue'
const { proxy }: any = getCurrentInstance()
console.log('proxy:', proxy.$eventBus)
const eventBus = proxy.$eventBus

// 订阅 message 事件
const logMessage = (msg) => console.log('Message:', msg)
eventBus.on('message', logMessage)

// 发布 message 事件
eventBus.emit('message', 'Hello World') // 输出: Message: Hello World

// 取消订阅 message 事件
eventBus.off('message', logMessage)
// 再次发布 message 事件，无输出
eventBus.emit('message', 'This will not be logged')

// 一次性订阅 greet 事件
eventBus.once('greet', (name) => console.log(`Hello, ${name}!`))

// 发布一次性订阅 greet 事件
eventBus.emit('greet', 'Alice') // 输出: Hello, Alice!
eventBus.emit('greet', 'Bob')   // 无输出
</script>
```

### 使用第三方库 `mitt`

参考文档： [mitt](https://www.npmjs.com/package/mitt)

- 安装

  ```sh
  pnpm add mitt
  ```

- 使用

  ```js
  import mitt from 'mitt'

  const emitter = mitt()

  // listen to an event
  emitter.on('foo', e => console.log('foo', e) )

  // listen to all events
  emitter.on('*', (type, e) => console.log(type, e) )

  // fire an event
  emitter.emit('foo', { a: 'b' })

  // clearing all events
  emitter.all.clear()

  // working with handler references:
  function onFoo() {}
  emitter.on('foo', onFoo)   // listen
  emitter.off('foo', onFoo)  // unlisten
  ```

  ```ts
  import mitt from 'mitt';

  type Events = {
    foo: string
    bar?: number
  }

  const emitter = mitt<Events>() // inferred as Emitter<Events>

  emitter.on('foo', (e) => {}) // 'e' has inferred type 'string'

  emitter.emit('foo', 42) // Error: Argument of type 'number' is not assignable to parameter of type 'string'. (2345)
  ```

  或者

  ```ts
  import mitt, { Emitter } from 'mitt'

  type Events = {
    foo: string
    bar?: number
  }

  const emitter: Emitter<Events> = mitt<Events>()
  ```

## `Vue2` 和 `Vue3` 在响应式依赖收集

`Vue2` 和 `Vue3` 在响应式依赖收集的实现上有显著差异，主要源于底层响应式系统的重构。

### **Vue2 的响应式依赖收集（基于 `Object.defineProperty`）**

#### **1. 数据劫持**

- **实现方式**：  
  通过 `Object.defineProperty` 递归遍历对象的每个属性，将其转换为 getter/setter。

  ```js
  function defineReactive(obj, key) {
    const dep = new Dep() // 每个属性对应一个 Dep 实例
    let val = obj[key]
    Object.defineProperty(obj, key, {
      get() {
        if (Dep.target) { // Dep.target 是当前 Watcher
          dep.depend()   // 收集依赖（将 Watcher 添加到 Dep 中）
        }
        return val
      },
      set(newVal) {
        val = newVal
        dep.notify()     // 通知所有依赖的 Watcher 更新
      }
    })
  }
  ```

#### **2. 依赖管理**

- **Dep 类**：
  每个响应式属性关联一个 `Dep` 实例，用于存储依赖该属性的 `Watcher`。

  ```js
  class Dep {
    constructor() {
      this.subs = [] // 存储 Watcher 列表
    }
    depend() {
      if (Dep.target) {
        Dep.target.addDep(this) // Watcher 订阅当前 Dep
      }
    }
    notify() {
      this.subs.forEach(watcher => watcher.update())
    }
  }
  ```

- **Watcher 类**：  
  代表一个依赖（如组件渲染函数、计算属性等），在求值过程中触发 `getter` 收集依赖。

  ```js
  class Watcher {
    constructor(vm, expOrFn) {
      this.vm = vm
      this.getter = expOrFn
      this.value = this.get()
    }
    get() {
      Dep.target = this // 设置当前 Watcher 为全局目标
      const value = this.getter.call(this.vm)
      Dep.target = null // 收集完成后清空
      return value
    }
    update() {
      this.get() // 重新求值以触发更新
    }
  }
  ```

#### **3. 局限**

- **对于对象，无法属性的添加/删除**：需通过 `Vue.set`/`Vue.delete` 手动处理。
- **对于数组，不能检测以下数组的变动**：
  - 当你利用索引直接设置一个数组项时，例如：`vm.items[indexOfItem] = newValue`，需使用 `Vue.set(vm.items, indexOfItem, newValue)`
  - 当你修改数组的长度时，例如：`vm.items.length = newLength`，需使用 `vm.items.splice(newLength)` 来代替。
  - 另外，需重写数组方法（如 `push`、`pop`）来触发更新。
- **性能开销**：递归初始化所有属性的 `getter/setter`，数据量大时影响性能。

### **Vue3 的响应式依赖收集（基于 `Proxy`）**

#### **1. 数据劫持**

- **实现方式**：  
  使用 `Proxy` 代理对象，动态拦截属性的访问和修改。

  ```js
  function reactive(obj) {
    return new Proxy(obj, {
      get(target, key, receiver) {
        track(target, key) // 收集依赖
        return Reflect.get(target, key, receiver)
      },
      set(target, key, value, receiver) {
        Reflect.set(target, key, value, receiver)
        trigger(target, key) // 触发更新
        return true
      }
    })
  }
  ```

#### **2. 依赖管理**

- **全局依赖映射**：  
  使用 `WeakMap` 结构存储对象与依赖关系。

  ```js
  const targetMap = new WeakMap() // 存储对象 -> 键 -> 依赖集合

  function track(target, key) {
    if (!activeEffect) return
    let depsMap = targetMap.get(target)
    if (!depsMap) {
      targetMap.set(target, (depsMap = new Map()))
    }
    let dep = depsMap.get(key)
    if (!dep) {
      depsMap.set(key, (dep = new Set()))
    }
    dep.add(activeEffect) // 将当前 effect 添加到依赖集合
  }

  function trigger(target, key) {
    const depsMap = targetMap.get(target)
    if (!depsMap) return
    const effects = depsMap.get(key)
    effects && effects.forEach(effect => effect.run())
  }
  ```

- **Effect 函数**：  
  代替 `Vue2` 的 `Watcher`，代表副作用（如渲染函数）。

  ```js
  let activeEffect = null

  function effect(fn) {
    activeEffect = fn
    fn() // 执行函数时会触发 track
    activeEffect = null
  }
  ```

#### **3. 优势**

- **全面监听**：支持对象属性的新增、删除及数组索引变化。
- **按需收集**：仅在访问属性时动态创建代理，减少初始化开销。
- **高效更新**：通过依赖映射精准触发相关副作用，避免无效更新。

### **核心对比**

| **特性** | **Vue2** | **Vue3** |
|--|--|--|
| **底层实现** | `Object.defineProperty` | `Proxy` |
| **依赖存储结构** | 每个属性对应一个 `Dep` 实例 | 全局 `WeakMap` 嵌套 `Map` 和 `Set` |
| **数组监听** | 需重写数组方法 | 直接监听索引变化 |
| **新增/删除属性** | 需手动处理（`Vue.set`/`Vue.delete`）| 自动检测 |
| **性能优化** | 初始化递归遍历，数据量大时性能差 | 按需代理，减少初始开销 |
| **嵌套对象处理** | 递归劫持所有子属性 | 惰性代理（仅在访问时处理）|

### **总结**

- **Vue2** 通过 `Object.defineProperty` 和 `Dep/Watcher` 实现依赖收集，简单但存在性能和功能限制。
- **Vue3** 利用 `Proxy` 和全局依赖映射，提供更高效、灵活的响应式系统，支持更全面的数据变化检测。  
- **升级意义**：`Vue3` 的响应式机制不仅提升了性能，还为 `Composition API` 和更复杂的状态管理提供了基础。
