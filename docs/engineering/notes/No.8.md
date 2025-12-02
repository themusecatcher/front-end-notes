# Note 8

## `import()` 动态导入与代码分割

在 `Webpack` 和 `Vite` 中，`import()` 动态导入是实现代码分割的关键。为了让你快速了解它们的异同，下面这个表格汇总了核心信息：

| 特性 | `Webpack` | `Vite` |
| :--- | :--- | :--- |
| **实现原理** | 通过打包工具在构建时分析并拆分 | 开发阶段依赖**浏览器原生ES模块**，生产阶段使用 **Rollup** 打包 |
| **分割方式** | 1. 动态 `import()` 语法<br>2. 配置 `optimization.splitChunks`<br>3. 多入口点 | 1. 动态 `import()` 语法<br>2. **自定义依赖拆分** (`vendor chunk`)<br>3. 多入口点 (`MPA`) |
| **输出结果** | 生成独立的 `.js` `chunk` 文件，可通过魔法注释(`/* webpackChunkName: "my-chunk" */`)命名 | 生成独立的 `.js` `chunk` 文件，遵循 `ES` 模块标准 |
| **优势** | 生态成熟，插件丰富，配置灵活度高 | **开发环境无需打包**，依赖原生`ESM`，加载速度快 |

### 🔧 Webpack 的代码分割机制

<br/>

`Webpack` 主要通过以下方式实现代码分割：

1. **动态导入**：在代码中使用 `import()` 语法，`Webpack` 会自动将被导入的模块分割成单独的 `chunk`。

    ```js
    // 当需要时再加载这个模块
    document.getElementById('btn').addEventListener('click', async () => {
      const module = await import(/* webpackChunkName: "my-chunk" */ './module.js')
      module.doSomething()
    })
    ```

    可以使用 `/* webpackChunkName: "name" */` 魔法注释为分割后的 `chunk` 指定名称。

2. **配置 SplitChunksPlugin**：通过 `optimization.splitChunks` 配置，`Webpack` 可以自动提取公共依赖或按策略拆分代码。

    ```js
    module.exports = {
      optimization: {
        splitChunks: {
          chunks: 'all'
        }
      }
    }
    ```

#### 🔧 核心机制与配置

- 触发分割与生成 `Chunk`：`Webpack` 在编译阶段遇到 `import()` 语法时，会将其识别为一个代码分割点。被 `import()` 引用的模块及其依赖（除非已被主入口或其他 `chunk` 引用）会被提取出来，单独打包成一个新的 `JavaScript` 文件（即 `chunk`）。这避免了该模块的代码被打包进主入口文件（如 `app.js`），从而减小了初始加载体积。
- `Chunk` 命名与魔法注释：默认情况下，这些动态导入产生的 `chunk` 文件会按数字序号命名（例如 `0.js`, `1.js`）。为了便于识别和管理，你可以使用 `Webpack` 特有的魔法注释 `/* webpackChunkName: "your-chunk-name" */` 来自定义 `chunk` 的名称。

  ```js
  // 使用 webpackChunkName 注释给分割出的文件命名[citation:9]
  import(/* webpackChunkName: "my-special-chunk" */ './modules/someSpecialModule.js')
    .then(module => {
      // 使用模块
    })
  ```

  在 `Vue` 项目中，这常用于将多个相关组件打包到同一个 `chunk` 中

  ```js
  // 把组件按组分块：'group-foo' chunk 将包含 Foo, Bar, Baz 组件[citation:10]
  const Foo = () => import(/* webpackChunkName: "group-foo" */ './Foo.vue')
  const Bar = () => import(/* webpackChunkName: "group-foo" */ './Bar.vue')
  const Baz = () => import(/* webpackChunkName: "group-foo" */ './Baz.vue')
  ```

- 运行时加载：打包完成后，在浏览器中运行应用时，当 `JavaScript` 执行到 `import()` 语句，`Webpack` 的运行时会动态地创建一个 `<script>` 标签，向服务器请求对应的 `chunk` 文件。`import()` 函数返回一个 `Promise`，在 `chunk` 文件加载并执行成功后，这个 `Promise` 会 `resolve` 并返回被导入模块的导出内容。

#### ⚙️ Webpack 配置优化

- 使用 `SplitChunksPlugin`：除了动态导入，`Webpack` 的 `optimization.splitChunks` 配置（内置了 `SplitChunksPlugin`）用于提取多个 `chunk` 之间的公共依赖或第三方库到独立的 `chunk`，避免代码重复。
  
  ```js
  // vue.config.js 或 webpack.config.js
  module.exports = {
    configureWebpack: {
      optimization: {
        splitChunks: {
          chunks: 'all', // 对所有类型的 chunk 进行优化[citation:1]
          cacheGroups: {
            vendors: {
              test: /[\\/]node_modules[\\/]/, // 将 node_modules 中的第三方库提取到 vendors chunk[citation:7]
              name: 'vendors',
              chunks: 'all',
            },
            commons: {
              name: 'commons',
              minChunks: 2, // 被至少两个 chunk 引用的模块才会被提取
              priority: 20,
            }
          }
        }
      }
    }
  }
  ```

### ⚡ Vite 的代码分割机制

<br/>

`Vite` 在处理代码分割时，开发环境和生产环境有所不同：

1. **开发环境**：`Vite` 的开发服务器直接利用**浏览器对 ES 模块的原生支持**，不对代码进行打包。当遇到 `import()` 语句时，浏览器会直接按需请求对应的模块文件，`Vite` 服务器则会按需编译，实现了真正的按需加载。
2. **生产环境**：`Vite` 使用 **Rollup** 进行构建打包。`Rollup` 同样支持动态导入语法，会自动将动态 `import()` 语句识别为代码分割点，并将这些异步模块及其依赖打包成独立的 `chunk` 文件（如 `About.[hash].js`）。<br/>
  `Vite` 默认还提供了开箱即用的优化：
    * **自定义拆包策略**：你可以在 `vite.config.ts` 中通过 `build.rollupOptions.output.manualChunks` 配置更精细的拆包策略。例如：将第三方库（来自 `node_modules`）打包到一个单独的 `vendor` `chunk` 中，以提高浏览器缓存利用率。

#### ⚙️ 手动配置与优化代码分割

<br/>

虽然 `Vite` 提供了开箱即用的代码分割，但你也可以通过配置实现更精细化的控制。

1. 自定义第三方库的拆分策略<br/>
  通过 `build.rollupOptions.output.manualChunks`，你可以手动将特定的第三方库拆分到独立的`chunk`中。这有助于更好地利用浏览器缓存。

  ```js
  // vite.config.js
  import { defineConfig } from 'vite'

  export default defineConfig({
    build: {
      rollupOptions: {
        output: {
          // 使用函数形式进行手动分块
          manualChunks(id) {
            if (id.includes('node_modules')) {
              // 将大体积的依赖拆分成独立的 chunk
              if (id.includes('lodash')) {
                return 'lodash'
              }
              if (id.includes('element-plus')) {
                return 'element-plus'
              }
              // 其他依赖归到 vendor 块
              return 'vendor'
            }
          }
        }
      }
    }
  })
  ```

2. 使用对象形式简化配置<br/>
  对于明确的库，你也可以使用对象形式配置 `manualChunks`，更为直观。

  ```js
  // vite.config.js
  import { defineConfig } from 'vite'

  export default defineConfig({
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            // 将 React 相关库打包到单独的 chunk 中
            'react-vendor': ['react', 'react-dom'],
            // 将 Lodash 库的代码单独打包
            'lodash': ['lodash-es'],
            // 将组件库的代码打包
            'library': ['antd']
          }
        }
      }
    }
  })
  ```

#### 🚀 Vite 配置优化建议

1. **优化依赖预构建**：对于某些未能被 `Vite` 自动识别的依赖，你可以使用 `optimizeDeps.include` 强制其预构建。
  ```js
  // vite.config.js
  export default defineConfig({
    optimizeDeps: {
      include: ['lodash-es', 'your-library'], // 显式包含需要预构建的依赖
      exclude: ['old-library'], // 排除不需要预构建的库[citation:2]
    }
  })
  ```

2. **构建过程与输出优化**
    * **代码分割与手动分块**：利用 `Rollup` 的 `manualChunks` 避免 `vendor` 块过大。

      ```js
      export default defineConfig({
        build: {
          rollupOptions: {
            output: {
              manualChunks(id) {
                if (id.includes('node_modules')) {
                  // 将大体积的依赖拆分成独立的 chunk
                  if (id.includes('lodash')) {
                    return 'lodash'
                  }
                  if (id.includes('element-plus')) {
                    return 'element-plus'
                  }
                  return 'vendor' // 其他依赖
                }
              }
            }
          }
        }
      })
      ```

    * **使用 `esbuild` 压缩**：`Vite` 默认使用 `esbuild` 进行压缩，这比 `terser` 快很多。

      ```js
      export default defineConfig({
        build: {
          minify: 'esbuild' // 默认值，通常无需设置
        }
      })
      ```

    * **移除调试代码**：生产构建时移除 `console`、`debugger` 和注释 语句。

      ```js
      export default defineConfig({
        build: {
          minify: 'terser',
          terserOptions: {
            // 在打包代码时移除 console、debugger 和 注释
            compress: {
              /* (default: false) -- Pass true to discard calls to console.* functions.
                If you wish to drop a specific function call such as console.info and/or
                retain side effects from function arguments after dropping the function
                call then use pure_funcs instead
              */
            /**
              * 如果在调试控制台中打印了某个对象，则调试控制台就持有了对该对象的引用，该对象就无法被回收了，会导致内存泄露
              * 经过验证，只有 devtools 打开时，console 打印才会引起内存泄漏的，如果不打开控制台，console 是不会引起内存变化的。
              */
              drop_console: isBuild, // 生产环境时移除 console
              drop_debugger: isBuild
            },
            format: {
              comments: isBuild // 生产环境时删除注释 comments
            }
          }
        }
      })
      ```

    * **资源内联与压缩**：小资源自动转 `Base64` 减少请求；使用 `vite-plugin-compression` 生成 `Gzip` 或 `Brotli` 压缩文件。

3. **开发阶段优化**
    * **精简插件**：仅在必要时使用插件，并确保插件是高效的。避免多个插件做同一件事。
    * **避免桶文件 (Barrel Files)**：直接导入模块的具体路径（如 `import { slash } from './utils/slash.js'`），而非通过索引文件（如 `import { slash } from './utils'`），以减少不必要的文件加载和编译，提升页面加载速度。
    * **预热常用文件**：对于转换时间较长的文件或者预计某些文件将被短时间内请求，使用 `server.warmup` 选项提前转换和缓存它们，可以在服务器启动时提高初始页面加载速度，并防止转换瀑布。

    ```js
    // vite.config.js
    export default defineConfig({
      server: {
         warmup: {
          clientFiles: ['./src/components/*.vue', './src/utils/big-utils.js'], // 仅在客户端使用的文件
          ssrFiles: ['./src/server/modules/*.js'] // 仅在服务端渲染中使用的文件
        }
      }
    })
    ```

4. **使用构建分析工具**：使用 `rollup-plugin-visualizer` 分析构建产物，识别体积过大的模块并针对性优化。

    ```js
    import { defineConfig } from 'vite'
    import visualizer from 'rollup-plugin-visualizer'

    export default defineConfig({
      plugins: [
        // ... 其他插件
        visualizer({
          filename: 'stats.html', // 类型 string 默认 stats.html
          open: true, // 自动打开分析页面
          template: 'treemap', // 类型 string 默认 treemap，可选：'sunburst', 'treemap', 'network', 'raw-data', 'list'
          gzipSize: true,
          brotliSize: true
        })
      ]
    })
    ```

### 💡 实践建议

- **路由级分割**：对于单页面应用（`SPA`），结合 `import()` 和路由配置（如 `Vue Router` 的 `() => import('./MyComponent.vue')` 或 `React.lazy`）实现路由级别的分割，能显著提升首屏加载速度。
- **避免过度分割**：虽然代码分割能优化加载性能，但也要避免产生过多的小文件，因为大量的 `HTTP` 请求也可能带来性能开销。

### 🔍 Vite 与 Webpack 的主要区别

| 特性对比 | Vite | Webpack (开发模式) |
| :---------- | :---------- | :------- |
| **开发服务器启动** | **无需打包**，利用浏览器原生 `ESM`，按需编译 | 需预先打包所有模块，项目大时慢 |
| **热更新 (HMR)**  | **更迅速**，仅编译修改文件 | 需重新构建相关依赖链，反应速度慢 |
| **生产构建**     | 使用 **Rollup**，输出高度优化代码 | 使用自身打包机制 |
| **处理 Vue 单文件** | 深度集成，通过 `@vitejs/plugin-vue` 按需编译 | 依赖 `vue-loader` |
| **TypeScript**   | 默认支持 **`.ts` 文件转译** (仅转译，不校验) | 需额外配置 `ts-loader` 等 |

### 💎 总结

<br/>

`Webpack` 和 `Vite` 都通过 `import()` 实现了强大的代码分割能力，但它们的底层哲学不同。`Webpack` 功能全面且高度可配置，`Vite` 则利用原生 `ESM` 在开发阶段提供了更快的速度和更简洁的体验。你可以根据项目的具体需求和团队的技术栈来选择合适的工具。

## [Vite 默认将小资源自动转 Base64 减少请求](https://cn.vitejs.dev/config/build-options#build-assetsinlinelimit)

`Vite` 默认会将项目中较小的静态资源（如图片、字体等）自动转换为 `Base64` 格式内联到代码中，目的是减少不必要的 `HTTP` 请求，优化应用性能。这个行为在开发和生产构建环境中都可能发生。

### ⚙️ 核心机制与配置

<br/>

`Vite` 实现此功能的核心是 `assetsInlineLimit` 选项。

| 配置场景 | 处理方式 | 说明 |
| :--- | :--- | :--- |
| **使用默认值** | 小于 **4KB** 的资源自动内联为 `Base64`。 | 这是 `Vite` 的初始配置，无需额外设置。 |
| **自定义阈值** | 在 `vite.config.js` 中调整 `build.assetsInlineLimit` 的值。 | 设置为 `0` 可**完全禁用**资源内联。 |
| **开发环境强制内联** | 默认行为不确定，但可通过插件等特殊手段实现。 | `Vite` 默认情况下在开发和生产环境的内联行为可能不同。 |

### 📝 实用建议与注意事项

- **权衡内联利弊**：虽然内联小资源可以减少请求，但过大的资源编码为 `Base64` 后会显著增加代码包的体积，并可能影响加载速度。因此，请根据项目实际情况合理设置阈值。
- **排除特定资源**：如果你希望某个资源始终以独立文件的形式存在，即使它小于内联阈值，也可以在导入时使用 `?url` 后缀来显式告知 `Vite`。例如：

  ```js
  import imgUrl from './some-image.png?url'
  ```

- **公共目录 (`public`) 的资源**：放置于 `public` 目录下的资源不会被 `Vite` 处理，也不会被内联为 `Base64`。它们会被直接复制到输出目录，并始终通过绝对路径引用。

### 💎 总结

<br/>

`Vite` 的这套机制让静态资源管理变得很省心。你只需要理解 `assetsInlineLimit` 这个关键选项，就能根据项目需求灵活控制内联行为。大多数情况下，保持默认的 `4KB` 阈值是一个不错的平衡点。
