# Note 9

## Webpack 的 Loader & Plugin

### Loader（加载器）

#### 定义和作用

<br/>

`Loader` 是文件加载器，用于**转换特定类型的模块**。它们工作在**单个文件级别**，在打包过程中对模块的源代码进行转换。

#### 主要特点

- **单一职责**：每个 `Loader` 只负责一种类型的文件转换
- **链式调用**：多个 `Loader` 可以串联使用
- **文件转换**：将文件从一种格式转换为另一种格式
- **预处理器**：在模块被打包前进行处理

#### 常见 `Loader` 示例

```js
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader', // 将 CSS 插入到 DOM 中
          'css-loader' // 解析 CSS 文件
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          'file-loader' // 处理图片文件
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'babel-loader' // 转换 ES6+ 语法
        ]
      }
    ]
  }
};
```

#### `Loader` 的执行时机

```js
// 源代码 → Loader1 → Loader2 → ... → 打包后的代码
// 例如：SCSS文件 → sass-loader → css-loader → style-loader → JS包
```

### Plugin（插件）

#### 定义和作用

<br/>

`Plugin` 是插件，用于**扩展 Webpack 的功能**。它们在**整个构建过程**中执行更广泛的任务，包括**资源优化**、**环境变量注入**、**打包优化**等。

#### 主要特点

- **功能丰富**：可以执行各种复杂的任务
- **生命周期钩子**：在 `Webpack` 构建的不同阶段执行
- **全局操作**：能够操作整个打包过程和结果
- **多次执行**：可以在多个编译阶段执行

#### 常见 `Plugin` 示例

```js
// webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CompressionWebpackPlugin = require('compression-webpack-plugin')

module.exports = {
  plugins: [
    new CleanWebpackPlugin(), // 清理输出目录
    new HtmlWebpackPlugin({ // 生成 HTML 文件
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({ // 提取 CSS 到单独文件
      filename: '[name].css'
    }),
    new BundleAnalyzerPlugin(), // 打包结果分析工具
    new CompressionWebpackPlugin({ // gizp 压缩工具
      algorithm: 'gzip',
      test: /\.(js|css|json|txt|html|svg)(\?.*)?$/i,
      threshold: 10240,
      minRatio: 0.8,
      deleteOriginalAssets: false
    })
  ]
}
```

#### `Plugin` 的工作原理

```js
class MyPlugin {
  apply(compiler) {
    compiler.hooks.done.tap('MyPlugin', (stats) => {
      console.log('编译完成！')
    })
  }
}
```

### 核心区别对比

| 特性 | `Loader` | `Plugin` |
|------|--------|---------|
| **作用范围** | 单个文件级别 | 整个构建过程 |
| **主要功能** | 文件转换和预处理 | 功能扩展和优化 |
| **执行时机** | 模块加载阶段 | 整个编译生命周期 |
| **配置方式** | `module.rules` | `plugins` 数组 |
| **使用场景** | 处理特定类型文件 | 优化、资源管理、环境注入 |
| **链式调用** | 支持 | 不支持 |
| **参数形式** | 字符串或对象数组 | 插件实例数组 |

### 实际使用示例

#### 完整的配置文件示例

```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CompressionWebpackPlugin = require('compression-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  
  // Loader 配置
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, // 使用插件提供的 loader
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      }
    ]
  },
  
  // Plugin 配置
  plugins: [
    new HtmlWebpackPlugin({ // 生成 HTML 文件
      title: 'Webpack App',
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({ // 提取 CSS 到单独文件
      filename: '[name].css'
    }),
    new BundleAnalyzerPlugin(), // 打包结果分析工具
    new CompressionWebpackPlugin({ // gizp 压缩工具
      algorithm: 'gzip',
      test: /\.(js|css|json|txt|html|svg)(\?.*)?$/i,
      threshold: 10240,
      minRatio: 0.8,
      deleteOriginalAssets: false
    })
  ]
};
```

### 总结

- **Loader** 是"转换器"：专注于文件级别的转换，如将 `TypeScript` 转为 `JavaScript`、`SCSS` 转为 `CSS`
- **Plugin** 是"功能扩展"：专注于构建过程的优化和功能增强，如生成 `HTML`、压缩代码、提取 `CSS`、构建打包结果分析
