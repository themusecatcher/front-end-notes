# 懒加载 vue3-lazyload<Tag color="volcano" style="vertical-align: top; margin-left: 6px;">0.3.8</Tag><BackTop />

<script lang="ts" setup>
import { ref } from 'vue'

const Image1 = 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.3/5.jpg'
const Image2 = 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.3/8.jpg'
const Image3 = 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.3/9.jpg'

const lazyOptions = ref({
  src: Image1,
  // loading: Image2,
  // error: Image2,
  lifecycle: {
    loading: (el: Element) => {
      console.log('image loading', el)
    },
    error: (el: Element) => {
      console.log('image error', el)
    },
    loaded: (el: Element) => {
      console.log('image loaded', el)
    }
  }
})
function onClick () {
  lazyOptions.value.src = Image3
}
</script>

## vue3-lazyload 参考文档

- [使用文档](https://www.npmjs.com/package/vue3-lazyload)

## Register

::: details Show Code

```ts
import { createApp } from 'vue'
import VueLazyLoad from 'vue3-lazyload'
import App from './App.vue'

const app = createApp(App)
app.use(VueLazyLoad, {
  loading: '...',
  error: '...',
  lifecycle: {
    loading: (el: Element) => {
      console.log('loading', el)
    },
    error: (el: Element) => {
      console.log('error', el)
    },
    loaded: (el: Element) => {
      console.log('loaded', el)
    }
  }
})
app.mount('#app')
```

:::

## 基本使用

<div class="m-image">
  <img class="u-image" v-lazy="Image1" />
</div>

::: details Show Code

```vue
<script lang="ts" setup>
import { ref } from 'vue'

const Image1 = ref('https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.3/5.jpg')
</script>
<template>
  <div class="m-image">
    <img class="u-image" v-lazy="Image1" />
  </div>
</template>
<style lang="less" scoped>
.m-image {
  width: 200px;
  height: 200px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  .u-image {
    width: 100%;
    height: 100%;
    border-radius: 8px;
    &[lazy=loading] {
      object-fit: cover;
    }
    &[lazy=loaded] {
      object-fit: contain;
    }
  }
}
</style>
```

:::

## 自定义配置

<Space align="center" :size="30">
  <div class="m-image">
    <img class="u-image" v-lazy="{...lazyOptions}" />
  </div>
  <Button type="primary" @click="onClick">Change Image</Button>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Space, Button } from 'vue-amazing-ui'
import 'vue-amazing-ui/css'

const Image1 = 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.3/5.jpg'
const Image2 = 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.3/8.jpg'
const Image3 = 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.3/9.jpg'

const lazyOptions = ref({
  src: Image1,
  // loading: Image2,
  // error: Image2,
  lifecycle: {
    loading: (el: Element) => {
      console.log('image loading', el)
    },
    error: (el: Element) => {
      console.log('image error', el)
    },
    loaded: (el: Element) => {
      console.log('image loaded', el)
    }
  }
})
function onClick () {
  lazyOptions.value.src = Image3
}
</script>
<template>
  <Space align="center" :size="30">
    <div class="m-image">
      <img class="u-image" v-lazy="{...lazyOptions}" />
    </div>
    <Button type="primary" @click="onClick">Change Image</Button>
  </Space>
</template>
<style lang="less" scoped>
.m-image {
  width: 200px;
  height: 200px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  .u-image {
    width: 100%;
    height: 100%;
    border-radius: 8px;
    &[lazy=loading] {
      object-fit: cover;
    }
    &[lazy=loaded] {
      object-fit: contain;
    }
  }
}
</style>
```

:::

## 延迟加载

<Space align="center" :size="30">
  <div class="m-image">
    <img class="u-image" v-lazy="{...lazyOptions, delay: 1000}" />
  </div>
  <Button type="primary" @click="onClick">Change Image</Button>
</Space>

::: details Show Code

```vue
<script lang="ts" setup>
import { ref } from 'vue'
import { Space, Button } from 'vue-amazing-ui'
import 'vue-amazing-ui/css'

const Image1 = 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.3/5.jpg'
const Image2 = 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.3/8.jpg'
const Image3 = 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.3/9.jpg'

const lazyOptions = ref({
  src: Image1,
  // loading: Image2,
  // error: Image2,
  lifecycle: {
    loading: (el: Element) => {
      console.log('image loading', el)
    },
    error: (el: Element) => {
      console.log('image error', el)
    },
    loaded: (el: Element) => {
      console.log('image loaded', el)
    }
  }
})
function onClick () {
  lazyOptions.value.src = Image3
}
</script>
<template>
  <Space align="center" :size="30">
    <div class="m-image">
      <img class="u-image" v-lazy="{...lazyOptions, delay: 1000}" />
    </div>
    <Button type="primary" @click="onClick">Change Image</Button>
  </Space>
</template>
<style lang="less" scoped>
.m-image {
  width: 200px;
  height: 200px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  .u-image {
    width: 100%;
    height: 100%;
    border-radius: 8px;
    &[lazy=loading] {
      object-fit: cover;
    }
    &[lazy=loaded] {
      object-fit: contain;
    }
  }
}
</style>
```

:::

<style lang="less" scoped>
.m-image {
  width: 200px;
  height: 200px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  .u-image {
    width: 100%;
    height: 100%;
    border-radius: 8px;
    &[lazy=loading] {
      object-fit: cover;
    }
    &[lazy=loaded] {
      object-fit: contain;
    }
  }
}
</style>
