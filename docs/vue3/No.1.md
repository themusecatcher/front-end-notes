# Note 1

## 百度地图

### 参考文档

- [百度地图开放平台](https://lbsyun.baidu.com/index.php?title=%E9%A6%96%E9%A1%B5)
- [JavaScript API GL](https://lbsyun.baidu.com/index.php?title=jspopularGL)
- [JavaScript API](http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference.html)
- [示例中心](https://lbsyun.baidu.com/index.php?title=open/jsdemo)

使用地图时 `eslint` 报错：

- 'BMap' is not defined.
- 'BMAP_ANIMATION_BOUNCE' is not defined

两种解决方法：

1. 添加：`// eslint-disable-next-line no-undef`
2. 在 `.eslinttrc.js` 中添加：

  ```js
  globals: {
    BMap: true,
    BMAP_ANIMATION_BOUNCE: true
  }
  ```

使用地图示例：

- 在 index.html 中引入

  ```html
  <script type="text/javascript" src="https://api.map.baidu.com/api?v=3.0&ak=GPs9yDno13oKRnKmTCvxf0B17FaGicj5"></script>
  ```

- 创建百度地图组件 `BaiduMap.vue`

  ```vue
  <script setup>
  import { ref, onMounted } from 'vue'

  const props = defineProps({ // 运行时声明
    longitude: { type: Number, default: 116.514 }, // 地理经度
    latitude: { type: Number, default: 39.416 }, // 地理纬度
    zoom: { type: Number, default: 18 } // 缩放级别
  })

  const mapRef = ref()
  const map = ref()
  const point = ref()

  onMounted(() => {
    initMap(props.longitude, props.latitude)
  })

  function initMap (lng, lat) {
    map.value = new BMap.Map(mapRef.value, {
      enableDragging: false,
      enableMapClick: false // 底图是否可点
    })
    point.value = new BMap.Point(lng, lat)
    map.value.centerAndZoom(point.value, props.zoom)
    map.value.disableDragging() // 禁用地图拖拽
    map.value.disableDoubleClickZoom() // 禁用双击放大
    map.value.disableScrollWheelZoom() // 禁用滚轮放大缩小
    addMarker(lng, lat)
  }
  function addMarker (lng, lat, icon) {
    let marker
    if (icon) { // 自定义覆盖物
      marker = new BMap.Marker(new BMap.Point(lng, lat), {
        icon: new BMap.Icon(icon, new BMap.Size(30, 30))
      })
    } else {
      marker = new BMap.Marker(new BMap.Point(lng, lat), {
        enableDragging: false // 是否启用拖拽
      })
    }
    map.value.addOverlay(marker)
    marker.setAnimation(BMAP_ANIMATION_BOUNCE) // 跳动动画
    return marker
  }
  </script>
  <template>
    <div class="map" ref="mapRef"></div>
  </template>
  <style lang="less" scoped>
  .map {
    width: 100%;
    height: 100%;
  }
  </style>
  ```

- 在要使用的页面引入即可

  ```vue
  <script setup>
  import BaiduMap from 'components/BaiduMap.vue'
  </script>
  <template>
    <div class="m-map">
      <BaiduMap />
    </div>
  </template>
  <style lang="less" scoped>
  .m-map {
    height: 400px;
    width: 780px;
    // 移除左下角百度地图版权
    :deep(div.BMap_cpyCtrl.BMap_noprint.anchorBL) {
      display: none;
    }
    // 移除左下角百度地图logo
    :deep(div.anchorBL) {
      display: none;
    }
  }
  </style>
  ```

## 百度编辑器 [UEditor](https://fex.baidu.com/ueditor/#start-start)

### vue 使用 UEditor 参考文档

[vue-ueditor-wrap](https://hc199421.gitee.io/vue-ueditor-wrap/#/home)

### 安装

```bash
pnpm i vue-ueditor-wrap@3.x
```

### 下载 `UEditor`

将解压后的文件夹重命名为 `UEditor` 并放到项目的静态资源目录下 `/public`

### 引入并注册组件

```ts
import { createApp } from 'vue'
import VueUeditorWrap from 'vue-ueditor-wrap'
import App from './App.vue'

const app = createApp(App)

app.use(VueUeditorWrap).mount('#app')
```

### 二次封装 `vue-ueditor-wrap`

*UEditor.vue*

```vue
<script setup lang="ts">
  import { ref, watchEffect, watch } from 'vue'
  import { config } from './editorConfig'

  interface Props {
    value: string
  }
  const props = withDefaults(defineProps<Props>(), {
    value: ''
  })
  const content = ref('')
  watchEffect(() => {
    content.value = props.value
  })
  const emits = defineEmits(['update:value', 'change'])
  watch(content, (to) => {
    console.log('to', to)
    emits('update:value', to)
  })
</script>
<template>
  <VueUeditorWrap
    v-model="content"
    :config="config"
    v-bind="$attrs" />
</template>
```

*editorConfig.ts*

```ts
import { useGlobSetting } from '/@/hooks/setting'

const { apiUrl } = useGlobSetting() // 获取全局变量

export const config = {
  UEDITOR_HOME_URL: import.meta.env.BASE_URL + 'UEditor/',
  lang: 'zh-cn',
  initialFrameWidth: '100%',
  initialFrameHeight: 240,
  serverUrl: apiUrl + '/ueditor/server?action=uploadimage',
  toolbars: [[
    'fullscreen', 'source', '|', 'undo', 'redo', '|', 'bold', 'italic', 'underline', 'strikethrough', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
    'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
    'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
    'directionalityltr', 'directionalityrtl', 'indent', '|',
    'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
    'link', 'unlink', 'attachment', '|', 'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
    'simpleupload', 'insertimage', 'insertvideo', 'inserttable'
  ]]
}
```

### 使用

```vue
<script lang="ts" setup>
import { UEditor } from '@/packages'
</script>
<template>
  <UEditor v-model:value="formState.content" />
</template>
```

## [useSlots() & useAttrs()](https://cn.vuejs.org/api/sfc-script-setup.html#useslots-useattrs)

在 `<script setup>` 使用 `slots` 和 `attrs` 的情况应该是相对来说较为罕见的，因为可以在模板中直接通过 `$slots` 和 `$attrs` 来访问它们。在你的确需要使用它们的罕见场景中，可以分别用 `useSlots` 和 `useAttrs` 两个辅助函数：

```vue
<script setup>
import { useSlots, useAttrs } from 'vue'

const slots = useSlots()
const attrs = useAttrs()
</script>
```

`useSlots` 和 `useAttrs` 是真实的运行时函数，它的返回与 `setupContext.slots` 和 `setupContext.attrs` 等价。它们同样也能在普通的组合式 API 中使用。

### 示例

组件内部监听默认插槽 `default slot` 是否有内容

```vue
<script setup lang="ts">
import { computed, useSlots } from 'vue'

const slots = useSlots()
const showText = computed(() => {
  const defaultSlots = slots.default?.()
  if (defaultSlots) {
    return Boolean(defaultSlots[0].children !== 'v-if' && defaultSlots?.length)
  }
  return false
})
</script>
<template>
<span v-show="showText">
  <slot></slot>
</span>
</template>
```

## [shallowRef()](https://cn.vuejs.org/api/reactivity-advanced.html#shallowref)

`ref()` 的浅层作用形式。

::: tip 注
- 和 `ref()` 不同，浅层 `ref` 的**内部值将会原样存储和暴露，并且不会被深层递归地转为响应式**。只有对 `.value` 的访问是响应式的。
- `shallowRef()` 常常用于**对大型数据结构的性能优化或是与外部的状态管理系统集成**。
:::

### 示例

```js
const state = shallowRef({ count: 1 })

// 不会触发更改
state.value.count = 2

// 会触发更改
state.value = { count: 2 }
```

## [toRaw()](https://cn.vuejs.org/api/reactivity-advanced.html#toraw)

根据一个 `Vue` 创建的代理返回其原始对象。

`toRaw()` 可以返回由 `reactive()`、`readonly()`、`shallowReactive()` 或者 `shallowReadonly()` 创建的代理对应的原始对象。

这是一个可以用于临时读取而不引起代理访问/跟踪开销，或是写入而不触发更改的特殊方法。不建议保存对原始对象的持久引用，请谨慎使用。

### 示例

```js
const foo = {}
const reactiveFoo = reactive(foo)

console.log(toRaw(reactiveFoo) === foo) // true
```
