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
}
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

## 微信小程序左右滑动切换 `tabbar`

