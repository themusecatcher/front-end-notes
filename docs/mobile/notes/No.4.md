# `Taro3` & `Vue3` & `typescript` & `less`

<BackTop />

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

## 微信小程序使用 `<web-view />` 组件

- [web-view](https://taro-docs.jd.com/docs/components/open/web-view)

`web-view` 组件是一个可以用来承载网页的容器，会自动铺满整个小程序页面。个人类型与海外类型的小程序暂不支持使用。

```vue
<template>
  <web-view src='https://mp.weixin.qq.com/' @message="handleMessage" />
</template>
```

## [env()](https://developer.mozilla.org/zh-CN/docs/Web/CSS/env) CSS 函数

最初由 `iOS` 浏览器提供，用于允许开发人员将其内容放置在视口的安全区域中，该规范中定义的 `safe-area-inset-*` 值可用于确保内容即使在非矩形的视区中也可以完全显示。

### 语法

<br/>

`env()`的第二个参数可选，如果环境变量不可用，该参数可让你设置备用值

```css
/* Using the four safe area inset values with no fallback values */
env(safe-area-inset-top)
env(safe-area-inset-right)
env(safe-area-inset-bottom)
env(safe-area-inset-left)

/* Using them with fallback values */
env(safe-area-inset-top, 20px)
env(safe-area-inset-right, 1em)
env(safe-area-inset-bottom, 0.5vh)
env(safe-area-inset-left, 1.4rem)
```

### Values

<br/>

`safe-area-inset-top`, `safe-area-inset-right`, `safe-area-inset-bottom`, `safe-area-inset-left`
`safe-area-inset-*`由四个定义了视口边缘内矩形的 `top`, `right`, `bottom` 和 `left` 的环境变量组成，这样可以安全地放入内容，而不会有被非矩形的显示切断的风险。对于矩形视口，例如普通的笔记本电脑显示器，其值等于零。对于非矩形显示器（如圆形表盘，iPhoneX 屏幕），在用户代理设置的四个值形成的矩形内，所有内容均可见。

注意: 不同于其他的 `CSS` 属性，用户代理定义的属性名字对大小写敏感。

`env(safe-area-inset-bottom)` 是一种 `CSS` 环境变量，用于获取设备屏幕底部的安全区域大小，这通常是指屏幕底部可能被系统 `UI`（如状态栏、导航栏等）占据的空间。在微信小程序中，使用这种变量可以确保你的界面设计不会与系统 `UI` 重叠，从而提供更好的用户体验。

- `env(safe-area-inset-bottom)`: 获取屏幕**低部的安全区域大小**
- `env(safe-area-inset-top)`: 获取屏幕**顶部的安全区域大小**
- `env(safe-area-inset-left)`: 获取屏幕**左边的安全区域大小**
- `env(safe-area-inset-right)`: 获取屏幕**右边的安全区域大小**

这些环境变量允许开发者在设计小程序界面时，能够适应不同设备的屏幕形状和系统 `UI` 布局，避免内容被系统 `UI` 遮挡。

使用这些环境变量时，应该注意它们的支持情况，因为它们是 `CSS` 的较新特性，可能不是所有浏览器或环境中都可用。在微信小程序中，这些环境变量被用于适配不同的设备，确保小程序的 `UI` 设计能够适应各种屏幕形状和系统 `UI` 的布局。
