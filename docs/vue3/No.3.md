# Note 3

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
