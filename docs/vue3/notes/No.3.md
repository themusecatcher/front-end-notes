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

```js
// eventBus.js
// 发布-订阅模式 使用 Map 和 Set 实现
export class EventBus {
  constructor() {
    this.eventsMap = new Map() // 存储事件及其回调列表
  }
  /**
   * 订阅事件
   * @param {string} event - 事件名称
   * @param {Function} callback - 回调函数
   */
  on(event, callback) {
    if (typeof callback !== 'function') {
      throw new TypeError('Callback must be a function')
    }
    if (!this.eventsMap.has(event)) {
      this.eventsMap.set(event, new Set())
    }
    this.eventsMap.get(event).add(callback)
  }
  /**
   * 发布事件
   * @param {string} event - 事件名称
   * @param {...*} args - 传递给回调函数的参数
   */
  emit(event, ...args) { // ...args：剩余参数语法，用于将所有接收到的参数收集到 args 数组中
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
  off(event, callback) {
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
  once(event, callback) {
    if (typeof callback !== 'function') {
      throw new TypeError('Callback must be a function')
    }
    const onceWrapper = (...args) => {
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

```vue
<script setup>
import { EventBus } from './EventBus'
// 使用示例
const eventBus = new EventBus()

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
