# `Taro3` & `Vue3` & `typescript` & `less`

## 参考文档

- [Taro官网](https://taro.zone/)
- [微信官方文档](https://developers.weixin.qq.com/miniprogram/dev/framework/)
- [微信公众平台](https://mp.weixin.qq.com/)
- [Nut UI](https://nutui.jd.com/taro/vue/4x/#/zh-CN/guide/start)

## 微信小程序文本复制

- [Taro.setClipboardData(option)](https://taro-docs.jd.com/docs/apis/device/clipboard/setClipboardData)

```vue
<script setup lang="ts">
import Taro from '@tarojs/taro'
const text = '我是要复制的文本'
function onCopy () {
  Taro.setClipboardData({
    data: text,
    success: () => {
      Taro.showToast({
        title: '复制成功',
        icon: 'success'
      })
    },
    fail: () => {
      Taro.showToast({
        title: '复制失败',
        icon: 'none'
      })
    }
  })
}
</script>
<template>
  <button @tap="onCopy">复制文本</button>
</template>
```

## 微信小程序获取系统环境信息

- [Taro.getSystemInfo(res)](https://taro-docs.jd.com/docs/apis/base/system/getSystemInfo)

获取系统信息，支持 Promise 化使用

```vue
<script setup lang="ts">
import Taro from '@tarojs/taro'

Taro.getSystemInfo({
  success: (res) => {
    console.log('systemInfo', res)
    Taro.setStorageSync('platform', res.platform)
  },
  fail: () => {
    console.error('无法获取系统信息')
  }
})
</script>
```

## 微信小程序针对不同操作系统进行设置

```vue
<script setup lang="ts">
import { ref } from 'vue'
import Taro from '@tarojs/taro'

const isIOS = ref<boolean>()
const isAndroid = ref<boolean>()
Taro.getSystemInfo({
  success: (res) => {
    console.log('systemInfo', res)
    Taro.setStorageSync('platform', res.platform)
    isIOS.value = res.platform === 'ios'
    isAndroid.value = res.platform === 'android'
  },
  fail: () => {
    console.error('无法获取系统信息')
  }
})
</script>
```

## 微信小程序获取页面路由层级

- [Taro.getCurrentPages()](https://taro-docs.jd.com/docs/apis/framework/getCurrentPages)

获取当前页面栈。数组中第一个元素为首页，最后一个元素为当前页面。 注意：

- 不要尝试修改页面栈，会导致路由以及页面状态错误。
- 不要在 `App.onLaunch` 的时候调用 `getCurrentPages()`，此时 `page` 还没有生成。

```vue
<script setup lang="ts">
import { ref } from 'vue'
import Taro, { useLoad } from '@tarojs/taro'

const pages = ref<any[]>([])
useLoad(() => {
  pages.value = Taro.getCurrentPages()
})
</script>
```
