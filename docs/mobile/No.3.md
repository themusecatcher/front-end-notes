# `Taro3` & `Vue3` & `typescript` & `less`

## 参考文档

- [Taro官网](https://taro.zone/)
- [微信官方文档](https://developers.weixin.qq.com/miniprogram/dev/framework/)
- [微信公众平台](https://mp.weixin.qq.com/)
- [Nut UI](https://nutui.jd.com/taro/vue/4x/#/zh-CN/guide/start)

## 微信小程序上传文件

使用 [`<nut-uploader/>`](https://nutui.jd.com/taro/vue/4x/#/zh-CN/component/uploader) 组件，并自定义上传方式

<br/>

![alt text](image-4.png)

```vue
<script setup lang="ts">
import { ref, reactive } from 'vue'
import Taro from '@tarojs/taro'
import { encryptData } from '@/http/encrypt'

const url = {
  upload: '/api/tools/file/upload'
}
const uploadUrl = process.env.TARO_APP_PROXY + url.upload
interface Image {
  name: string
  url: string
}
interface FormType {
  images: Image[]
  [key: string]: any
}
const formData = reactive<FormType>({
  images: []
})
const uploadFileList = ref<any[]>([])
function uploadFile (src, taroUploadFile, options) {
  const fs = Taro.getFileSystemManager()
  fs.getFileInfo({
    filePath: src,
    success: (res) => {
      console.log('getFileInfo res', res)
    }
  })
  fs.readFile({ // 读取本地文件内容。单个文件大小上限为100M
    filePath: src, // 要读取的文件的路径 (本地路径)
    encoding: 'base64', // 指定读取文件的字符编码，如果不传 encoding，则以 ArrayBuffer 格式读取文件的二进制内容
    success: (res) => {
      console.log('readFile', res)
      const data = {
        decodeFile: res.data, // 以base64字符串上传
        fileFormat: options.taroFilePath.slice(options.taroFilePath.lastIndexOf('.') + 1)
      }
      const uploadData = encryptData(data, 'post')
      const uploadTask = taroUploadFile({
        url: options.url,
        filePath: src,
        name: options.name,
        fileType: options.fileType,
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        formData: uploadData,
        success: (response: { errMsg; statusCode; data }) => {
          if (options.xhrState == response.statusCode) {
            options.onSuccess?.(response, options)
          } else {
            options.onFailure?.(response, options)
          }
        },
        fail: (e) => {
          options.onFailure?.(e, options)
        }
      })
      options.onStart?.(options)
      uploadTask.progress((res) => {
        options.onProgress?.(res, options)
        // console.log('上传进度', res.progress);
        // console.log('已经上传的数据长度', res.totalBytesSent);
        // console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend);
      })
    },
    fail: (err) => {
      console.error(err)
    }
  })
}
function beforeXhrUpload (taroUploadFile, options) {
  console.log('before taroUploadFile', taroUploadFile)
  console.log('before options', options)
  Taro.compressImage({
    src: options.taroFilePath,
    quality: 80,
    compressedWidth: 300,
    success: (res: any) => {
      console.log('compress', res)
      uploadFile(res.tempFilePath, taroUploadFile, options)
    },
    fail: (err: any) => {
      console.log('compress err', err)
      abortUpload(taroUploadFile, options)
    }
  })
}
function abortUpload (taroUploadFile, options) {
  const uploadTask = taroUploadFile(options)
  uploadTask.abort()
}
function onStart (options) {
  console.log('start options', options)
}
function onDelete ({index}) {
  console.log('delete', index)
  formData.images.splice(index, 1)
  console.log('images', formData.images)
  console.log('uploadFileList', uploadFileList.value)
}
function onOversize (files) {
  console.log('oversize files', files)
}
function onSuccess ({data}) {
  console.log('success', data)
  const res = JSON.parse(data.data)
  console.log('res', res)
  if (res.message.code === 0) {
    formData.images.push({
      name: res.data.fileUrl.split('/').pop(),
      url: res.data.fileUrl
    })
    console.log('images', formData.images)
  } else {
    Taro.showToast({
      title: res.message.message,
      icon: 'none',
      mask: true,
      duration: 2000
    })
  }
  console.log('uploadFileList', uploadFileList.value)
}
function onFailure ({data}) {
  console.log('failure', data)
  if (data !== undefined) {
    Taro.showToast({
      title: '上传失败',
      icon: 'none',
      mask: true,
      duration: 2000
    })
    uploadFileList.value.pop()
    console.log('uploadFileList', uploadFileList.value)
  }
}
</script>
<template>
  <view>
    <view class="m-image-wrap">
      <view class="u-head">
        上传照片<text class="u-tip">（最多支持3张）</text>
      </view>
      <view class="m-upload-wrap">
        <nut-uploader
          v-model:file-list="uploadFileList"
          :url="uploadUrl"
          multiple
          :maximize="10 * 1024 * 1024"
          :maximum="3"
          :media-type="['image']"
          :size-type="['compressed']"
          :before-xhr-upload="beforeXhrUpload"
          @start="onStart"
          @delete="onDelete"
          @oversize="onOversize"
          @success="onSuccess"
          @failure="onFailure" />
      </view>
    </view>
  </view>
</template>
<style lang="less">
.m-image-wrap {
  padding: 24px 28px 40px;
  margin: 20px auto;
  width: 690px;
  height: 349px;
  background: #FFFFFF;
  border-radius: 12px;
  .m-upload-wrap {
    margin-top: 40px;
    .nut-uploader__preview {
      margin-bottom: 0;
      margin-right: 0;
      &:not(:last-child) {
        margin-right: 17px;
      }
    }
  }
}
</style>
```

## 微信小程序根据系统主题展示不同样式 [`darkMode`](https://developers.weixin.qq.com/miniprogram/dev/framework/ability/darkmode.html)

- 在 `src/app.config.ts` 下写入相关配置：

```ts
export default defineAppConfig({
  darkmode: true, // 所有基础组件均会根据系统主题展示不同的默认样式，navigation bar 和 tab bar 也会根据下面的配置自动切换
  themeLocation: 'theme.json',
  window: {
    // backgroundColor: '@bgColor', // 窗口的背景色
    backgroundColorTop: '@bgColorTop', // 顶部窗口的背景色，仅 iOS 支持，默认 #ffffff，即loading背景色
    backgroundColorBottom: '@bgColorBottom', // 底部窗口的背景色，仅 iOS 支持，默认 #ffffff
    backgroundTextStyle: '@bgTxtStyle', // 下拉 loading 的样式，仅支持 dark / light，默认 dark
    // navigationStyle: 'custom', // 全局导航栏样式，仅支持以下值：default 默认样式；custom 自定义导航栏，只保留右上角胶囊按钮
    navigationBarBackgroundColor: '@navBgColor', // 导航栏背景颜色，默认 #000000
    navigationBarTitleText: 'WeChat', // 导航栏标题文字内容
    navigationBarTextStyle: '@navTxtStyle' // 导航栏标题颜色，仅支持 black | white
  }
})
```

- 在 `src/theme.json` 中写入相关样式变量

```json
{
  "light": {
    "bgColor": "#FFFFFF",
    "bgTxtStyle": "dark",
    "navBgColor": "#f6f6f6",
    "navTxtStyle": "black",
    "bgColorTop": "#FFFFFF",
    "bgColorBottom": "#FFFFFF"
  },
  "dark": {
    "bgColor": "#1677ff",
    "bgTxtStyle": "light",
    "navBgColor": "#191919",
    "navTxtStyle": "white",
    "bgColorTop": "#000000",
    "bgColorBottom": "#000000"
  }
}
```

## 使用轮播图[`<Swiper>`](https://taro-docs.jd.com/docs/components/viewContainer/swiper)

1. 使用 `<swiper>` 实现轮播组件，创建 `Carousel.vue` 轮播组件：

**兼容微信小程序和H5的轮播图**

```vue
<script setup lang="ts">
import Taro from '@tarojs/taro'
import { ref, computed } from 'vue'

interface Image {
  title?: string // 图片名称
  src: string // 图片地址
  link?: string // 图片跳转链接
}
interface Props {
  images: Image[] // 图片数组
  height?: number|string // 走马灯宽度 
  mode?: string // 图片裁剪、缩放的模式，与微信小程序 <image> 标签 mode 属性一致
  autoplay?: boolean // 是否自动切换
  circular?: boolean // 是否采用衔接滑动
  vertical?: boolean // 滑动方向是否为纵向
  interval?: number // 自动切换时间间隔
  duration?: number // 滑动动画时长
  easingFunction?: 'default'|'linear'|'easeInCubic'|'easeOutCubic'|'easeInOutCubic' // 默认缓动函数 线性动画 缓入动画 缓出动画 缓入缓出动画
  indicatorDots?: boolean // 是否显示面板指示点
  indicatorColor?: string // 指示点颜色
  indicatorActiveColor?: string // 当前选中的指示点颜色
  preview?: boolean // 是否开启图片预览
}
const props = withDefaults(defineProps<Props>(), {
  images: () => [],
  height: '100vh',
  mode: 'aspectFill', // 缩放模式，保持纵横比缩放图片，只保证图片的短边能完全显示出来。也就是说，图片通常只在水平或垂直方向是完整的，另一个方向将会发生截取。
  autoplay: true,
  circular: true,
  vertical: false,
  interval: 3000,
  duration: 1000,
  easingFunction: 'default',
  indicatorDots: true,
  indicatorColor: 'rgba(0, 0, 0, .3)',
  indicatorActiveColor: '#1677FF', // #000000
  preview: false
})
const CarouselHeight = computed(() => {
  if (typeof props.height === 'number') {
    return props.height + 'rpx'
  }
  return props.height
})
function onRoute (url: string) {
  Taro.navigateTo({
    url: url
  })
}
const isWeapp = process.env.TARO_ENV === 'weapp'
const showPreview = ref(false)
const showIndex = ref(0)
function onPreview (index: number) {
  showIndex.value = index
  showPreview.value = true
}
function onClose () {
  showPreview.value = false
}
</script>
<template>
  <swiper
    class="m-swiper"
    :style="`height: ${CarouselHeight};`"
    :interval="interval"
    :autoplay="autoplay"
    :circular="circular"
    :vertical="vertical"
    :duration="duration"
    :easingFunction="easingFunction"
    :indicator-dots="indicatorDots"
    :indicator-color="indicatorColor"
    :indicator-active-color="indicatorActiveColor"
    v-bind="$attrs">
    <swiper-item v-for="(image, index) in images" :key="index">
      <view class="m-image" @tap="image.link ? onRoute(image.link) : () => false">
        <image @tap="preview ? onPreview(index) : () => false" class="u-image" :src="image.src" :mode="mode" />
      </view>
    </swiper-item>
  </swiper>
  <nut-image-preview
    v-if="isWeapp && preview"
    :init-no="showIndex"
    :show="showPreview"
    :images="props.images"
    is-Loop
    pagination-visible
    closeable
    close-icon-position="top-left"
    @close="onClose" />
</template>
<style lang="less">
.m-swiper {
  max-height: calc(100vh - 100px - env(safe-area-inset-bottom));
  .m-image {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .u-image {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
```

2. 使用 `<nut-swiper>` 实现轮播组件，创建 `NutCarousel.vue` 轮播组件:

**只支持微信小程序**

```vue
<script setup lang="ts">
import Taro from '@tarojs/taro'
import { ref, computed } from 'vue'

interface Image {
  title?: string // 图片名称
  src: string // 图片地址
  link?: string // 图片跳转链接
}
interface Props {
  images: Image[] // 图片数组
  height?: number|string // 轮播卡片的高度
  direction?: 'horizontal'|'vertical' // 轮播方向
  mode?: string // 图片裁剪、缩放的模式，与微信小程序 <image> 标签 mode 属性一致
  loop?: boolean // 是否循环轮播
  duration?: number|string // 动画时长（单位是 ms）
  autoPlay?: number|string // 自动轮播时长，0 表示不会自动轮播
  initPage?: number|string // 初始化索引值
  touchable?: boolean // 是否可触摸滑动
  paginationVisible?: boolean // 分页指示器是否展示
  paginationUnselectedColor?: string // 分页指示器没有选中的颜色
  paginationColor?: string // 分页指示器选中的颜色
  preview?: boolean // 是否开启图片预览
}
const props = withDefaults(defineProps<Props>(), {
  images: () => [],
  height: '100vh',
  direction: 'horizontal',
  mode: 'aspectFill', // 缩放模式，保持纵横比缩放图片，只保证图片的短边能完全显示出来。也就是说，图片通常只在水平或垂直方向是完整的，另一个方向将会发生截取。
  loop: true,
  duration: 500,
  autoPlay: 3000,
  initPage: 0,
  touchable: true,
  paginationVisible: true,
  paginationUnselectedColor: 'rgba(0, 0, 0, .3)',
  paginationColor: '#FF5B29',
  preview: false
})
const CarouselHeight = computed(() => {
  if (typeof props.height === 'number') {
    return props.height + 'rpx'
  }
  return props.height
})
function onRoute (url: string) {
  Taro.navigateTo({
    url: url
  })
}
const isWeapp = process.env.TARO_ENV === 'weapp'
const showPreview = ref(false)
const showIndex = ref(0)
function onPreview (index: number) {
  showIndex.value = index
  showPreview.value = true
}
function onClose () {
  showPreview.value = false
}
</script>
<template>
  <nut-swiper
    class="m-swiper"
    :style="`height: ${CarouselHeight};`"
    :direction="direction"
    :loop="loop"
    :duration="duration"
    :auto-play="autoPlay"
    :init-page="initPage"
    :touchable="touchable"
    :pagination-visible="paginationVisible"
    :pagination-unselected-color="paginationUnselectedColor"
    :pagination-color="paginationColor"
    v-bind="$attrs">
    <nut-swiper-item v-for="(image, index) in images" :key="index">
      <view class="m-image" @tap="image.link ? onRoute(image.link) : () => false">
        <image @tap="preview ? onPreview(index) : () => false" class="u-image" :src="image.src" :mode="mode" />
      </view>
      </nut-swiper-item>
  </nut-swiper>
  <nut-image-preview
    v-if="isWeapp && preview"
    :init-no="showIndex"
    :show="showPreview"
    :images="props.images"
    is-Loop
    pagination-visible
    closeable
    close-icon-position="top-left"
    @close="onClose" />
</template>
<style lang="less">
.nut-swiper-pagination .h5-i {
  width: 48px;
  height: 10px;
  border-radius: 6px;
  &:not(:last-child) {
    margin-right: 20px;
  }
}
.m-swiper {
  max-height: calc(100vh - 100px - env(safe-area-inset-bottom));
  .m-image {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .u-image {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
```

- 在要使用的页面引入:

```vue
<script setup lang="ts">
import { ref } from 'vue'
import Carousel from '@/components/Carousel.vue'
// import NutCarousel from '@/components/NutCarousel.vue'

const images = ref([
  {
    src: 'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Homepage-Model-Y-Mobile-CN-v2.png'
  },
  {
    src: 'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Homepage-Model-3-Mobile-LHD-v2.jpg'
  },
  {
    src: 'https://digitalassets.tesla.com/tesla-contents/image/upload/h_1624,w_750,c_fit,f_auto,q_auto:best/Model-S-homepage-mobile'
  },
  {
    src: 'https://digitalassets.tesla.com/tesla-contents/image/upload/h_1700,w_800,c_fit,f_auto,q_auto:best/Homepage-Model-X-Mobile-LHD_001'
  }
])
</script>
<template>
  <Carousel :images="images" />
  <!-- <NutCarousel :images="images" /> -->
</template>
```
