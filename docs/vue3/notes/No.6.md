# Note 6

<BackTop />

## 登录之后 5 分钟内无操作自动退出登录

整体方案使用 `Vue3 + TS + Pinia` 实现

> 1. 在 stores 文件夹下新建一个 `user.ts` 文件，进行全局用户状态管理

```ts
// 定义认证存储
export const useUserStore = defineStore('auth', () => {
  const isLoggedIn = ref(false)
  const username = ref('')
  const lastActivityTime = ref(Date.now())
  const timeoutDuration = 5 * 60 * 1000 // 5分钟
  const warningDuration = 30 * 1000 // 30秒警告

  // 登录
  const login = (user: string, pass: string) => {
    if (user === 'admin' && pass === 'password') {
      isLoggedIn.value = true
      username.value = user
      updateActivityTime()
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('username', user)
      return true
    }
    return false
  }

  // 登出
  const logout = () => {
    isLoggedIn.value = false
    username.value = ''
    localStorage.setItem('isLoggedIn', 'false')
  }

  // 更新活动时间
  const updateActivityTime = () => {
    lastActivityTime.value = Date.now()
    localStorage.setItem('lastActivityTime', lastActivityTime.value.toString())
  }

  // 计算剩余时间
  const timeLeft = computed(() => {
    if (!isLoggedIn.value) return 0
    const elapsed = Date.now() - lastActivityTime.value
    return Math.max(0, timeoutDuration - elapsed)
  })

  // 检查是否需要显示警告
  const showWarning = computed(() => {
    return timeLeft.value > 0 && timeLeft.value <= warningDuration
  })

  // 检查是否超时
  const isTimeout = computed(() => {
    return timeLeft.value <= 0
  })

  // 格式化剩余时间
  const formattedTimeLeft = computed(() => {
    const seconds = Math.floor(timeLeft.value / 1000)
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`
  })

  // 初始化
  const init = () => {
    const storedLogin = localStorage.getItem('isLoggedIn')
    const storedUsername = localStorage.getItem('username')
    const storedTime = localStorage.getItem('lastActivityTime')

    if (storedLogin === 'true' && storedUsername) {
      isLoggedIn.value = true
      username.value = storedUsername

      if (storedTime) {
        lastActivityTime.value = parseInt(storedTime)
      } else {
        updateActivityTime()
      }
    }
  }

  return {
    isLoggedIn,
    username,
    lastActivityTime,
    login,
    logout,
    updateActivityTime,
    timeLeft,
    showWarning,
    isTimeout,
    formattedTimeLeft,
    init
  }
})
```

> 2. 在入口文件 `App.vue` 中监测用户活动状态

```vue
<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { throttle, debounce } from 'vue-amazing-ui'
const timer = ref<number>()
const userStore = useUserStore()
console.log('userStore', userStore)
const router = useRouter()
// 捕获阶段监听事件
const eventOptions = { capture: true }
onMounted(() => {
  if (userStore.isLoggedIn.value) {
    window.addEventListener('mousemove', throttledHandler, eventOptions) // 鼠标移动监测
    window.addEventListener('keydown', debouncedHandler, eventOptions) // 键盘点击监测
    window.addEventListener('click', debouncedHandler, eventOptions) // 鼠标点击监测
    window.addEventListener('scroll', debouncedHandler, eventOptions) // 滚动监测
    window.addEventListener('storage', handleStorageEvent) // 存储事件监听
    // 定期检查超时
    timer.value = setInterval(checkTimeout, 1000) as unknown as number
  }
})
onBeforeUnmount(() => {
  if (userStore.isLoggedIn.value) {
    cleanMonitor()
  }
})
function cleanMonitor () {
  window.removeEventListener('mousemove', throttledHandler, eventOptions)
  window.removeEventListener('keydown', debouncedHandler, eventOptions)
  window.removeEventListener('click', debouncedHandler, eventOptions)
  window.removeEventListener('scroll', debouncedHandler, eventOptions)
  window.removeEventListener('storage', handleStorageEvent)
  timer.value && clearInterval(timer.value)
}
const throttledHandler = throttle(handleUserActivity, 1000) as EventListener
const debouncedHandler = debounce(handleUserActivity, 1000) as EventListener
// 用户活动处理
function handleUserActivity () {
  userStore.updateActivityTime()
}
// 存储事件处理（跨标签页同步活动状态）
function handleStorageEvent () {
  if (e.key === 'lastActivityTime' && e.newValue) {
    // 其他标签页更新了活动时间
    userStore.lastActivityTime = parseInt(e.newValue)
  } else if (e.key === 'isLoggedIn' && e.newValue === 'false') {
    // 其他标签页已退出登录
    userStore.logout()
    cleanMonitor()
    router.push('/login')
  }
}
// 超时检查
const checkTimeout = () => {
  if (userStore.isTimeout) {
    userStore.logout()
    cleanMonitor()
    router.push('/login')
  }
}
</script>
<template>
  <RouterView />
</template>
```

## Vue 的 key 属性

`key` 这个特殊的 `attribute` 主要作为 `Vue` 的虚拟 `DOM` 算法提示，在比较新旧节点列表时用于识别 `vnode`。

- 预期：`number` | `string` | `symbol`
- 详细信息<br/>
  在没有 `key` 的情况下，`Vue` 将使用一种最小化元素移动的算法，并尽可能地就地更新/复用相同类型的元素。如果传了 `key`，则将根据 `key` 的变化顺序来重新排列元素，并且将始终移除/销毁 `key` 已经不存在的元素。

  同一个父元素下的子元素必须具有唯一的 `key`。重复的 `key` 将会导致渲染异常。

  最常见的用例是与 `v-for` 结合：

  ```vue
  <template>
    <ul>
      <li v-for="item in items" :key="item.id">...</li>
    </ul>
  </template>
  ```

  也可以用于强制替换一个元素/组件而不是复用它。当你想这么做时它可能会很有用：
  - 在适当的时候触发组件的生命周期钩子
  - 触发过渡
  
  举例来说：

  ```vue
  <template>
    <transition>
      <span :key="text">{{ text }}</span>
    </transition>
  </template>
  ```
  当 `text` 变化时，`<span>` 总是会被替换而不是更新，因此 `transition` 将会被触发。

### 通过 `key` 管理状态​

<br/>

`Vue` 默认按照“就地更新”的策略来更新通过 `v-for` 渲染的元素列表。当数据项的顺序改变时，`Vue` 不会随之移动 `DOM` 元素的顺序，而是就地更新每个元素，确保它们在原本指定的索引位置上渲染。

<br/>

默认模式是高效的，但只适用于列表渲染输出的结果不依赖子组件状态或者临时 `DOM` 状态 (例如表单输入值) 的情况。

<br/>

为了给 `Vue` 一个提示，以便它可以跟踪每个节点的标识，从而重用和重新排序现有的元素，你需要为每个元素对应的块提供一个唯一的 `key attribute`：

```vue
<template>
  <div v-for="item in items" :key="item.id">
    <!-- 内容 -->
  </div>
</template>
```
当你使用 `<template v-for>` 时，`key` 应该被放置在这个 `<template>` 容器上：

```vue
<template v-for="todo in todos" :key="todo.name">
  <li>{{ todo.name }}</li>
</template>
```

::: warning 注意
`key` 在这里是一个通过 `v-bind` 绑定的特殊 `attribute`。请不要和在 `v-for` 中使用对象里所提到的对象属性名相混淆。
:::

推荐在任何可行的时候为 `v-for` 提供一个 `key attribute`，除非所迭代的 `DOM` 内容非常简单 (例如：不包含组件或有状态的 `DOM` 元素)，或者你想有意采用默认行为来提高性能。

<br/>

`key` 绑定的值期望是一个基础类型的值，例如字符串或 `number` 类型。不要用对象作为 `v-for` 的 `key`。