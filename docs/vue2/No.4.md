# Note 4

## Vue登录后，无操作半小时后自动清除登录状态

> 在项目的页面入口文件 `App.vue` 文件中监听用户最后一次操作鼠标、键盘或滚动事件

```js
import storage from 'store'
computed: {
  token () {
    return storage.get('TOKEN')
  },
  uid () {
    return storage.get('UID')
  },
  userInfo () {
    return storage.get('USER_INFO')
  }
},
mounted () { // 使用防抖debounce，对于短时间内连续触发的事件（上面的滚动事件），防抖就是让某个时间期限（如上面的1000毫秒）内，事件处理函数只执行一次
  document.onmousemove = this.debounce(this.resetStatus, 3000)
  document.onkeydown = this.debounce(this.resetStatus, 3000)
  document.onscroll = this.debounce(this.resetStatus, 3000)
},
methods: {
  debounce (fn, delay) {
    let timer = null
    return function () {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(fn, delay)
    }
  },
  resetStatus () {
    if (this.token) {
      storage.set('TOKEN', this.token, new Date().getTime() + 30 * 60 * 1000)
      storage.set('UID', this.uid, new Date().getTime() + 30 * 60 * 1000)
      storage.set('USER_INFO', this.userInfo, new Date().getTime() + 30 * 60 * 1000)
    }
  }
}
```

## Vue创建全局函数或变量

1. 在 `index.js` 中创建 `getAction` 函数，并全局使用

```js
export function getAction (url, parameter) {
  return request({
    url: url,
    method: 'get',
    params: parameter
  })
}
```

2. 创建 `globalUse.js`：

```js
import { getAction } from './index'

// 方式一挂载到Vue.prototype：
import Vue from 'vue'
Vue.getAction = getAction // 使用时需先引入Vue，然后调用：Vue.getAction
Vue.prototype.$getAction = getAction // 使用：this.$getAction

// 方式二使用全局混入Vue.mixin：
Vue.mixin({ data () { return { getAction } } }) // 全局混入到data中，使用：this.getAction
// Vue.mixin({ methods: { getAction } }) // 全局混入到methods中，使用：this.getAction
```

3. 在 `main.js` 中引入：

```js
import Vue from 'vue'
import App from './App.vue'
import './utils/globalUse'
new Vue({
  render: h => h(App)
}).$mount('#app')
```

## Vue表单页监听浏览器回退

> 拦截并提示用户，点击确定执行返回，点击取消阻止返回

```js
// 这个离开守卫通常用来禁止用户在还未保存修改前突然离开。该导航可以通过 next(false) 来取消。
beforeRouteLeave (to, from, next) {
  const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
  if (answer) {
    next()
  } else {
    next(false)
  }
}
```

## `$router` 新页面打开路由

```js
onDetail (id) {
  const routeUrl = this.$router.resolve({
    path: '/show/detail',
    query: { id }
  })
  window.open(routeUrl.href, '_blank')
}
```

## [npm link](https://npm.nodejs.cn/cli/v10/commands/npm-link)

- 没有参数的包文件夹中的 `npm link` 将在全局文件夹 `{prefix}/lib/node_modules/<package>` 中创建一个符号链接，该符号链接链接到执行 `npm link` 命令的包。它还将封装中的任何垃圾箱链接到 {prefix}/bin/{name}。 请注意，npm link 使用全局前缀（参见 npm prefix -g 的值）

- 在某个其他位置，`npm link package-name` 将创建一个从全局安装的 `package-name` 到当前文件夹的 `node_modules/` 的符号链接。

::: tip
注意，`package-name` 取自 `package.json`，而不是目录名称。

包名称可以选择以范围为前缀。 见 scope。 范围必须以 @ 符号开头，后跟斜杠
:::

### 例如：

```bash
cd ~/projects/node-redis    # go into the package directory
npm link                    # creates global link
cd ~/projects/node-bloggy   # go into some other package directory.
npm link redis              # link-install the package
```

现在，对 `~/projects/node-redis` 的任何更改都将反映在 `~/projects/node-bloggy/node_modules/node-redis/` 中。 请注意，**链接应该指向包名称，而不是该包的目录名称**。

你也可以将这两个步骤合二为一。 例如，以更短的方式执行上述用例：

```bash
cd ~/projects/node-bloggy  # go into the dir of your main project
npm link ../node-redis     # link the dir of your dependency
```

第二行相当于做：

```bash
(cd ../node-redis; npm link)
npm link redis
```

即它首先创建一个全局链接，然后将全局安装目标链接到你项目的 `node_modules` 文件夹中。

请注意，**在这种情况下，你指的是目录名称 node-redis，而不是包名称 redis**。

如果你的链接包有范围（参见 scope），你的链接命令必须包含该范围，例如

```bash
npm link @myorg/privatepackage
```

## [npm uninstall](https://npm.nodejs.cn/cli/v10/commands/npm-uninstall)

```bash
npm uninstall [<@scope>/]<pkg>...

aliases: unlink, remove, rm, r, un
```

这将卸载一个包，完全删除代表它安装的所有 npm。

它还会从 `package.json` 中的 `dependencies`、`devDependencies`、`optionalDependencies` 和 `peerDependencies` 对象中删除包。

此外，如果你有 `npm-shrinkwrap.json` 或 `package-lock.json`，`npm` 也会更新这些文件。

`--no-save` 会告诉 `npm` 不要从你的 `package.json`、`npm-shrinkwrap.json` 或 `package-lock.json` 文件中删除包。

`--save` 或 `-S` 将告诉 `npm` 从你的 `package.json`、`npm-shrinkwrap.json` 和 `package-lock.json` 文件中删除该包。 这是默认设置，但如果你的 `npmrc` 文件中有例如 `save=false`，你可能需要使用它

在全局模式下（即，将 `-g` 或 `--global` 附加到命令中），它将当前包上下文作为全局包卸载。 在这种情况下，`--no-save` 被忽略。

范围是可选的，并遵循 `scope` 的通常规则。

## 监听键盘事件，绑定Enter按键

- 输入框监听键盘事件(`Enter`)

```vue
<a-input v-model="text" @keydown.enter="onClick" placeholder="请输入"/>
```

- 在当前页面监听键盘事件(`Enter`)

  - `onkeydown`：会在用户按下一个键盘按键时发生
  - `onkeypress`：会在键盘按键被按下并释放时发生。
  - `onkeyup`：会在键盘按键被松开时发生。
  事件发生次序为：
    1. onkeydown
    2. onkeypress
    3. onkeyup

    在所有浏览器中 `onkeypress` 事件不是适用于所有按键(如： ALT, CTRL, SHIFT, ESC)。
    监听一个用户是否按下按键请使用 `onkeydown` 事件,所有浏览器都支持 `onkeydown` 事件。

    ```js
    // 当前页面监听键盘确认键
    // 等价于window.onkeydown = function (e) { … }
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        // doing something
      }
    })
    ```
