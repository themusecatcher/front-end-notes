# Note 11

## Yalc 本地组件库调试工具使用笔记

### 一、什么是 Yalc

<br/>

`Yalc` 是一个本地 `npm` 包调试工具，它可以在本地环境中模拟发布 `npm` 包，并在其他项目中像安装普通 `npm` 包一样使用它。

**与 npm link 的对比：**

| 对比项 | Yalc | npm link |
|--------|------|----------|
| 依赖引用方式 | 解压到 `.yalc` 和 `node_modules`，接近正常使用方式 | 符号链接 |
| 变更反射 | 通过 `yalc push` 传播到消费者 | 链接模块导致环境不一致 |
| 适用场景 | 适合同时在多个应用中验证 | 适合小规模或一次性验证 |

`Yalc` 会在项目中创建一个 `yalc.lock` 文件（类似于 `yarn.lock` 和 `package-lock.json`），用于确保一致性。

### 二、安装

<br/>

全局安装 `Yalc`：

```bash
# 使用 npm
npm install -g yalc

# 使用 yarn
yarn global add yalc
```

验证是否安装成功：

```bash
yalc --version
```

### 三、核心工作流程

#### 3.1 发布本地包（组件库/包侧）

<br/>

在需要调试的 `npm` 包根目录下：

```bash
# 先构建（如果需要）
yarn build

# 发布到本地 Yalc 仓库
yalc publish
```

执行 `yalc publish` 后，包会被复制到本地 `Yalc` 存储库中（默认位于 `~/.yalc`）。

#### 3.2 在项目中使用（使用方侧）

<br/>

在需要使用该包的项目中：

```bash
yalc add <package-name>
```

例如：

```bash
yalc add @mbcx/mbcx-mma-jsbridge
```

执行后：
- 项目根目录会出现 `.yalc/` 文件夹
- `package.json` 中的依赖会变为 `file:.yalc/<package-name>` 形式
- 生成 `yalc.lock` 文件

#### 3.3 更新包（核心操作）

<br/>

当本地包代码有变更时，在包目录下执行：

```bash
# 重新构建
yarn build

# 推送更新到所有已添加该包的项目
yalc push
```

`yalc push` 是 `yalc publish --push` 的简写，会同时完成发布和推送。

### 四、⚠️ 重点：重新 yalc push 后的缓存清理

<br/>

**这是使用 Yalc 时最容易被忽略的问题。** 当你执行 `yalc push` 更新了本地包后，使用方的构建工具（Webpack、Next.js、Vite 等）可能因为缓存而无法感知到变化。

#### 4.1 问题根源

<br/>

`Webpack` 等构建工具会基于 `package.json` 中的版本号来缓存 `node_modules` 中的模块。如果每次 `yalc push` 时包版本号保持不变，即使包内容发生了变化，构建工具仍会使用缓存，导致更新不生效。

#### 4.2 Webpack 缓存清理方案

<br/>

**方案一：使用 `--sig` 选项（推荐）**

```bash
yalc push --sig
```

`--sig` 选项会在部署的包版本号中添加当前构建签名，强制 `Webpack` 重新构建。

**方案二：修改 package.json 版本号**

每次发布前手动更新 `package.json` 中的 `version` 字段。

**方案三：禁用 Webpack 缓存（仅开发环境）**

在 `webpack.config.js` 中配置：

```js
module.exports = {
  cache: false,  // 禁用缓存
};
```

或设置：

```js
module.exports = {
  snapshot: {
    managedPaths: [],  // 让 Webpack 不缓存 node_modules
  },
};
```

**方案四：手动清理 Webpack 缓存**

```bash
# 删除 Webpack 缓存目录
rm -rf node_modules/.cache

# 或删除项目缓存（如 Angular 项目）
rm -rf .angular/cache
```

#### 4.3 Next.js 缓存清理方案

<br/>

`Next.js` 会将构建产物缓存到 `.next` 文件夹中，`yalc push` 后变化可能不会自动反映。

**方案一：删除 .next 文件夹（最常用）**

```bash
# 停止 Next.js 开发服务器
# 删除 .next 文件夹
rm -rf .next
# 重新启动
yarn dev
```

**方案二：使用脚本自动重启**

可以编写脚本在每次 `yalc push` 后自动重启 `Next.js` 开发服务器。

**方案三：使用 `next-remote-watch`**

第三方库 `next-remote-watch` 可以解决本地包更新不刷新的问题。

#### 4.4 Vite 缓存清理方案

<br/>

`Vite` 会预构建并缓存依赖，且**不识别 Yalc 包的变化**。

**方案一：使用 `--force` 启动**

```bash
vite dev --force
```

这会强制 `Vite` 重新构建依赖。

**方案二：手动删除 Vite 缓存**

```bash
rm -rf node_modules/.vite
```

**方案三：在 Vite 配置中自定义缓存目录**

```js
export default {
  cacheDir: './.my_cache',  // 更容易清理的自定义目录
};
```

**方案四：配置 Vite 不缓存特定包**

在 `vite.config.js` 中配置 `server.watch` 来优化对本地包变更的监听。

#### 4.5 各框架缓存清理速查表

| 框架/工具 | 缓存位置 | 清理命令 |
|-----------|---------|---------|
| Webpack | `node_modules/.cache` | `rm -rf node_modules/.cache` |
| Next.js | `.next/` | `rm -rf .next` |
| Vite | `node_modules/.vite` | `rm -rf node_modules/.vite` |
| Angular | `.angular/cache` | `rm -rf .angular/cache` |

### 五、其他常用命令

| 命令 | 说明 |
|------|------|
| `yalc update` | 更新已添加的包 |
| `yalc remove <package>` | 移除指定的 Yalc 包 |
| `yalc remove --all` | 移除所有 Yalc 包 |
| `yalc installations show <package>` | 显示包的安装位置 |
| `yalc installations clean <package>` | 清理包的安装记录 |

### 六、最佳实践

#### 6.1 忽略 `Yalc` 相关文件

<br/>

将以下文件添加到 `.gitignore` 中，防止被意外提交：

```
.yalc/
yalc.lock
```

#### 6.2 开发完成后清理

<br/>

调试完成后，在使用方项目中执行：

```bash
yalc remove --all
```

然后重新安装正式的 `npm` 依赖。

#### 6.3 建议的工作流

1. **包侧**：修改代码 → `yarn build` → `yalc push --sig`
2. **使用方侧**：如遇更新不生效 → 根据框架清理对应缓存
3. **调试完成**：`yalc remove --all` → 安装正式依赖

#### 6.4 定时清理全局 Yalc 存储

`Yalc` 的全局存储位于 `~/.yalc`，可以定期清理以释放磁盘空间：

```bash
rm -rf ~/.yalc
```

### 七、常见问题排查清单

当 `yalc push` 后页面没有更新时，按以下顺序排查：

1. ✅ 确认包侧已执行 `yarn build` 构建最新代码
2. ✅ 确认已执行 `yalc push`（而非仅 `yalc publish`）
3. ✅ 检查使用方 `node_modules` 中的包文件是否已更新
4. ✅ 清除对应构建工具的缓存（参考速查表）
5. ✅ 尝试 `yalc push --sig` 或更新包版本号
6. ✅ 尝试硬刷新浏览器（Ctrl+Shift+R / Cmd+Shift+R）
7. ✅ 如仍不生效，尝试完全删除 `node_modules` 和 `lock` 文件后重新安装
