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
