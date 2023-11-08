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

## [空值合并运算符（`??`）](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing)

空值合并运算符（`??`）是一个逻辑运算符，当左侧的操作数为 `null` 或者 `undefined` 时，返回其右侧操作数，否则返回左侧操作数。

与逻辑或运算符（`||`）不同，逻辑或运算符会在左侧操作数为假值时返回右侧操作数。也就是说，如果使用 `||` 来为某些变量设置默认值，可能会遇到意料之外的行为。比如为假值（例如，'' 或 0）时。

由于 `||` 是一个布尔逻辑运算符，左侧的操作数会被强制转换成布尔值用于求值。任何假值（`0`， `''`， `NaN1`， `null`， `undefined`）都不会被返回。这导致如果你使用`0`，`''`或`NaN`作为有效值，就会出现不可预料的后果。

```js
const foo = null ?? 'default string'
console.log(foo)
// Expected output: 'default string'

const baz = 0 ?? 42
console.log(baz)
// Expected output: 0

let count = 0
let text = ''

let qty = count || 42
let message = text || 'hi!'
console.log(qty) // 42，而不是 0
console.log(message) // 'hi!'，而不是 ''
```

## [可选链运算符（?.）](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Optional_chaining)

可选链运算符（`?.`）允许读取位于连接对象链深处的属性的值，而不必明确验证链中的每个引用是否有效。`?.` 运算符的功能类似于 `.` 链式运算符，不同之处在于，在引用为空 (`nullish`) (`null` 或者 `undefined`) 的情况下不会引起错误，该表达式短路返回值是 `undefined`。与函数调用一起使用时，如果给定的函数不存在，则返回 `undefined`。

当尝试访问可能不存在的对象属性时，可选链运算符将会使表达式更短、更简明。在探索一个对象的内容时，如果不能确定哪些属性必定存在，可选链运算符也是很有帮助的。

```js
const adventurer = {
  name: 'Alice',
  cat: {
    name: 'Dinah'
  }
}

const dogName = adventurer.dog?.name
console.log(dogName)
// Expected output: undefined

console.log(adventurer.someNonExistentMethod?.())
// Expected output: undefined
```

### 可选链与函数调用

当尝试调用一个可能不存在的方法时也可以使用可选链。这将是很有帮助的，比如，当使用一个 API 的方法可能不可用时，要么因为实现的版本问题要么因为当前用户的设备不支持该功能。

函数调用时如果被调用的方法不存在，使用可选链可以使表达式自动返回 `undefined` 而不是抛出一个异常。

```js
let result = someInterface.customMethod?.()
```

:::tip 备注
如果存在一个属性名且不是函数，使用 `?.` 仍然会产生一个 TypeError 异常 (x.y is not a function).

如果 someInterface 自身是 `null` 或者 `undefined` ，异常 TypeError 仍会被抛出 someInterface is null 如果你希望允许 someInterface 也为 `null` 或者 `undefined` ，那么你需要像这样写 `someInterface?.customMethod?.()`
:::
