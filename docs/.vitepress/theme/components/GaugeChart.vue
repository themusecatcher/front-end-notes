<script setup lang="ts">
import { ref, useTemplateRef, onMounted, onBeforeUnmount, watch, computed } from 'vue'
import { useResizeObserver } from '../utils'
/*
  按需引入
*/
// 使用 ECharts 提供的按需引入的接口来打包必须的组件
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口
import * as echarts from 'echarts/core'
// 引入仪表盘图表，图表后缀都为 Chart
import { GaugeChart } from 'echarts/charts'
// 引入提示框，组件后缀都为 Component
import { TooltipComponent } from 'echarts/components'
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers'
// 注册必须的组件
echarts.use([GaugeChart, TooltipComponent, CanvasRenderer])

/*
  全部引入
*/
// import * as echarts from 'echarts'
/*
  需要注意的是为了保证打包的体积是最小的，ECharts 按需引入的时候不再提供任何渲染器，
  所以需要选择引入 CanvasRenderer 或者 SVGRenderer 作为渲染器。这样的好处是假如
  你只需要使用 svg 渲染模式，打包的结果中就不会再包含无需使用的 CanvasRenderer 模块
*/

const chartRef = useTemplateRef('chartRef')
const myChart = ref<any>()
let option: any
const gradient = ref({ // 自定义渐变色
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0, color: '#FF6E76' // 0% 处的颜色
          },
          {
            offset: 0.25, color: '#FDDD60' // 25% 处的颜色
          },
          {
            offset: 0.75, color: '#58D9F9' // 75% 处的颜色
          },
          {
            offset: 1, color: '#7CFFB2' // 100% 处的颜色
          }
        ],
        global: false // 缺省为 false
      })

interface Gauge {
  name: string // 数据项名称
  value: number // 数据值
  [propName: string]: any // 添加一个字符串索引签名，用于包含带有任意数量的其他属性
}
interface Props {
  gaugeData: Gauge[] // 仪表盘数据源
  width?: string | number // 容器宽度
  height?: string | number // 容器高度
  themeColor?: string // 主题色
}
const props = withDefaults(defineProps<Props>(), {
  gaugeData: () => [],
  width: '100%',
  height: '100%',
  themeColor: '#1677FF'
})
const chartWidth = computed(() => {
  if (typeof props.width === 'number') {
    return `${props.width}px`
  }
  return props.width
})
const chartHeight = computed(() => {
  if (typeof props.height === 'number') {
    return `${props.height}px`
  }
  return props.height
})
watch(
  () => props.gaugeData,
  (to) => {
    // 监听并更新图例数据
    option.series[0].data = to
    myChart.value.setOption(option, true)
  },
  {
    deep: true
  }
)
watch(
  () => [props.themeColor],
  () => {
    myChart.value && myChart.value.dispose() // 销毁实例
    initChart() // 重新初始化实例
  },
  {
    deep: true,
    flush: 'post'
  }
)
// const loadingConfig = {
  // text: 'loading',
  // color: '#c23531',
  // textColor: '#000',
  // maskColor: 'rgba(255, 255, 255, 0.8)',
  // zlevel: 0,
  // 字体大小。从 `v4.8.0` 开始支持。
  // fontSize: 12,
  // 是否显示旋转动画（spinner）。从 `v4.8.0` 开始支持。
  // showSpinner: true,
  // 旋转动画（spinner）的半径。从 `v4.8.0` 开始支持。
  // spinnerRadius: 20,
  // 旋转动画（spinner）的线宽。从 `v4.8.0` 开始支持。
  // lineWidth: 5,
  // 字体粗细。从 `v5.0.1` 开始支持。
  // fontWeight: 'normal',
  // 字体风格。从 `v5.0.1` 开始支持。
  // fontStyle: 'normal',
  // 字体系列。从 `v5.0.1` 开始支持。
  // fontFamily: 'sans-serif'
// }
function initChart () {
  // 等价于使用 Canvas 渲染器（默认）：echarts.init(containerDom, null, { renderer: 'canvas' })
  myChart.value = echarts.init(chartRef.value as HTMLElement)
  option = {
    tooltip: { // 提示框浮层设置
      trigger: 'item',
      triggerOn: 'mousemove', // 提示框触发条件
      enterable: true, // 鼠标是否可进入提示框浮层中，默认false
      confine: true, // 是否将tooltip框限制在图表的区域内
      formatter: function (params: any) { // 提示框浮层内容格式器，支持字符串模板和回调函数两种形式
        // console.log('params:', params)
        return params.marker + params.name + ': ' + params.value || '--'
      },
      backgroundColor: 'transparent', // 提示框浮层的背景颜色
      borderColor: '#7CFFB2', // 提示框浮层的边框颜色
      borderWidth: 1, // 提示框浮层的边框宽
      borderRadius: 6, // 提示框浮层圆角
      padding: [6, 12], // 提示框浮层的内边距
      textStyle: { // 提示框浮层的文本样式
        color: '#333', // 文字颜色
        fontWeight: 600, // 字体粗细
        fontSize: 18, // 字体大小
        // lineHeight: 24, // 行高
        // width: 60, // 文本显示宽度
        // 文字超出宽度是否截断或者换行；只有配置width时有效
        overflow: 'breakAll', // truncate截断，并在末尾显示ellipsis配置的文本，默认为...;break换行;breakAll换行，并强制单词内换行
        ellipsis: '...'
      },
    },
    color: [props.themeColor],
    series: [
      {
        type: 'gauge',
        name: '仪表盘', // 系列名称，用于tooltip的显示
        /*
          从调色盘 option.color 中取色的策略，可选 'series' | 'data'
          'series': 按照系列分配调色盘中的颜色，同一系列中的所有数据都是用相同的颜色
          'data': 按照数据项分配调色盘中的颜色，每个数据项都使用不同的颜色
        */
        colorBy: 'data',
        center: ['50%', '65%'], // 圆心坐标，[400, 300]: 数组的第一项是横坐标，第二项是纵坐标，支持设置成百分比，['50%', '75%']: 设置成百分比时第一项是相对于容器宽度，第二项是相对于容器高度
        radius: '100%', // 仪表盘半径，可以是相对于容器高宽中较小的一项的一半的百分比，也可以是绝对的数值。
        legendHoverLink: true, // 是否启用图例 hover 时的联动高亮
        startAngle: 210, // 仪表盘起始角度。圆心 正右手侧为0度，正上方为90度，正左手侧为180度。
        endAngle: -30, // 仪表盘结束角度。
        clockwise: true, // 仪表盘刻度是否是顺时针增长
        min: 0, // 最小的数据值，映射到 minAngle
        max: 100, // 最大的数据值，映射到 maxAngle
        splitNumber: 10, // 仪表盘刻度的分割段数
        axisLine: { // 仪表盘轴线相关配置
          show: true, // 是否显示仪表盘轴线
          roundCap: true, // 是否在两端显示成圆形
          lineStyle: { // 仪表盘轴线样式
            width: 30, // 轴线宽度
            // color: [ // 仪表盘的轴线可以被分成不同颜色的多段。每段的结束位置和颜色可以通过一个数组来表示
            //   [20, '#FF6E76'],
            //   [40, '#FDDD60'],
            //   [60, '#58D9F9'],
            //   [80, '#7CFFB2'],
            //   [100, '#1677FF']
            // ],
            // shadowBlur: 10, // 图形阴影的模糊大小
            // shadowColor: 'rgba(0, 0, 0, 0.5)', // 阴影颜色
            // shadowOffsetX: 3, // 阴影水平方向上的偏移距离
            // shadowOffsetY: 3, // 阴影垂直方向上的偏移距离
            // opacity: 1 // 图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。
          }
        },
        progress: { // 展示当前进度
          show: true, // 是否显示进度条
          overlap: false, // 多组数据时进度条是否重叠
          // width: 12, // 进度条宽度
          roundCap: true, // 是否在两端显示成圆形
          clip: true, // 是否裁掉超出部分
          itemStyle: { // 进度条样式
            color: gradient.value, // 图形的颜色
            // borderColor: '#1677FF', // 图形的描边颜色
            // borderWidth: 1, // 描边线宽。为 0 时无描边。
            // borderType: 'solid', // 描边类型，可选：'solid' 'dashed' 'dotted'
          }
        },
        splitLine: { // 分隔线样式
          show: true, // 是否显示分隔线
          length: 30, // 分隔线线长。支持相对半径的百分比
          distance: 10, // 分隔线与轴线的距离
          lineStyle: { // 分隔线样式
            color: 'auto', // 线的颜色
            width: 5, // 线宽
            type: 'solid', // 线的类型，可选 'solid' 'dashed' 'dotted'
            cap: 'butt' // 指定线段末端的绘制方式，可选 'butt'(默认) 线段末端以方形结束 'round' 线段末端以圆形结束 'square' 线段末端以方形结束，但是增加了一个宽度和线段相同，高度是线段厚度一半的矩形区域
          }
        },
        axisTick: { // 刻度样式
          show: true, // 是否显示刻度
          splitNumber: 10, // 分隔线之间分割的刻度数
          length: 12, // 刻度线长。支持相对半径的百分比
          distance: 10, // 刻度线与轴线的距离
          lineStyle: { // 刻度线样式
            color: 'auto', // 线的颜色
            width: 2, // 线宽
            type: 'solid', // 线的类型，可选 'solid' 'dashed' 'dotted'
            cap: 'butt' // 指定线段末端的绘制方式，可选 'butt'(默认) 线段末端以方形结束 'round' 线段末端以圆形结束 'square' 线段末端以方形结束，但是增加了一个宽度和线段相同，高度是线段厚度一半的矩形区域
          }
        },
        axisLabel: { // 刻度标签
          show: true, // 是否显示标签
          distance: -80, // 标签与刻度线的距离
          /*
            如果是 number 类型，则表示标签的旋转角，从 -90 度到 90 度，正值是逆时针。
            除此之外，还可以是字符串 'radial' 表示径向旋转、'tangential' 表示切向旋转。
            如果不需要文字旋转，可以将其设为 0。
          */
          rotate: 'tangential',
          // 刻度标签的内容格式器，支持字符串模板和回调函数两种形式
          // formatter: '{value} kg', // // 使用字符串模板，模板变量为刻度默认标签 {value}
          formatter: function (value: number) {// 使用函数模板，函数参数分别为刻度数值
            // console.log('value', value)
            if (value === 90) {
              return 'A'
            } else if (value === 70) {
              return 'B'
            } else if (value === 50) {
              return 'C'
            } else if (value === 30) {
              return 'D'
            } else if (value === 10) {
              return 'F'
            }
            return ''
          },
          color: '#aaa', // 文字的颜色
          fontStyle: 'normal', // 文字字体的风格，可选 'normal' 'italic' 'oblique'
          fontWeight: 'bold', // 文字字体的粗细，可选 'normal' 'bold' 'bolder' 'lighter' 100 | 200 | 300 | 400...
          fontFamily: 'sans-serif', // 文字的字体系列，还可以是 'serif' , 'monospace', 'Arial', 'Courier New', 'Microsoft YaHei', ...
          fontSize: 40 // 文字的字体大小
          // lineHeight: 28, // 行高
          /*
            可以使用颜色值，例如：'#123234', 'red', 'rgba(0,23,11,0.3)'
            也可以直接使用图片，例如：
            backgroundColor: {
              image: 'xxx/xxx.png'
              // 这里可以是图片的 URL，
              // 或者图片的 dataURI，
              // 或者 HTMLImageElement 对象，
              // 或者 HTMLCanvasElement 对象。
            }
          */
          // backgroundColor: 'transparent', // 文字块背景色
          // borderColor: 'red', // 文字块边框颜色
          // borderWidth: 3, // 文字块边框宽度
          // borderType: 'solid', // 文字块边框描边类型，可选 'solid' 'dashed' 'dotted'
          // borderRadius: 10, // 文字块的圆角
          // padding: [6, 12], // 文字块的内边距，文字块宽高不包含 padding
          // width: 60, // 文本显示宽度
          // height: 60 // 文本显示高度
        },
        pointer: { // 仪表盘指针
          show: true, // 是否显示指针
          showAbove: true, // 指针是否显示在标题和仪表盘详情上方
          // 可以通过 'image://url' 设置为图片，其中 URL 为图片的链接，或者 dataURI。
          icon: 'diamond', // 标记类型，可选 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
          offsetCenter: [0, '-28%'], // 相对于仪表盘中心的偏移位置，数组第一项是水平方向的偏移，第二项是垂直方向的偏移。可以是绝对的数值，也可以是相对于仪表盘半径的百分比。
          length: '36%', // 指针长度，可以是绝对数值，也可以是相对于半径的半分比。
          width: 20, // 指针宽度
          itemStyle: { // 指针样式
            // color: 'auto' // 图形颜色
            // 线性渐变，前四个参数分别是 x0, y0, x2, y2, 范围从 0 - 1，相当于在图形包围盒中的百分比，如果 globalCoord 为 `true`，则该四个值是绝对的像素位置
            color: gradient.value
            // borderColor: '#000', // 图形的描边颜色
            // borderWidth: 3, // 描边线宽。为 0 时无描边
            // borderType: 'solid', // 描边类型，可选：'solid' 'dashed' 'dotted'
          }
        },
        anchor: { // 表盘中指针的固定点
          show: true, // 是否显示固定点
          showAbove: true, // 固定点是否显示在指针上面
          size: 24, // 固定点大小
          // 可以通过 'image://url' 设置为图片，其中 URL 为图片的链接，或者 dataURI。
          icon: 'circle', // 标记类型，可选 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
          offsetCenter: [0, '16%'], // 相对于仪表盘中心的偏移位置，数组第一项是水平方向的偏移，第二项是垂直方向的偏移。可以是绝对的数值，也可以是相对于仪表盘半径的百分比。
          itemStyle: { // 指针固定点样式
            color: props.themeColor, // 图形的颜色
            borderColor: '#eee', // 固定点边框颜色
            borderWidth: 8, // 描边线宽。为 0 时无描边
            borderType: 'solid', // 描边类型，可选：'solid' 'dashed' 'dotted'
          }
        },
        title: { // 仪表盘标题
          show: true, // 是否显示标题
          offsetCenter: [0, '36%'], // 相对于仪表盘中心的偏移位置，数组第一项是水平方向的偏移，第二项是垂直方向的偏移。可以是绝对的数值，也可以是相对于仪表盘半径的百分比。
          color: '#464646', // 文字的颜色
          fontStyle: 'normal', // 文字字体的风格，可选 'normal' 'italic' 'oblique'
          fontWeight: 'bold', // 文字字体的粗细，可选 'normal' 'bold' 'bolder' 'lighter' 100 | 200 | 300 | 400...
          fontFamily: 'sans-serif', // 文字的字体系列，还可以是 'serif' , 'monospace', 'Arial', 'Courier New', 'Microsoft YaHei', ...
          fontSize: 45 // 文字的字体大小
          // lineHeight: 48, // 行高
          /*
            可以使用颜色值，例如：'#123234', 'red', 'rgba(0,23,11,0.3)'
            也可以直接使用图片，例如：
            backgroundColor: {
              image: 'xxx/xxx.png'
              // 这里可以是图片的 URL，
              // 或者图片的 dataURI，
              // 或者 HTMLImageElement 对象，
              // 或者 HTMLCanvasElement 对象。
            }
          */
          // backgroundColor: 'transparent', // 文字块背景色
          // borderColor: 'red', // 文字块边框颜色
          // borderWidth: 3, // 文字块边框宽度
          // borderType: 'solid', // 文字块边框描边类型，可选 'solid' 'dashed' 'dotted'
          // borderRadius: 10, // 文字块的圆角
          // padding: [6, 12], // 文字块的内边距，文字块宽高不包含 padding
          // width: 60, // 文本显示宽度
          // height: 60 // 文本显示高度
        },
        detail: { // 仪表盘详情，用于显示数据，即表盘中心的数据展示
          show: true, // 是否显示详情
          color: props.themeColor, // 文本颜色
          fontStyle: 'normal', // 文字字体的风格，可选 'normal' 'italic' 'oblique'
          fontWeight: 'bold', // 文字字体的粗细，可选 'normal' 'bold' 'bolder' 'lighter' 100 | 200 | 300 | 400...
          fontFamily: 'Microsoft YaHei', // 文字的字体系列，还可以是 'serif' , 'monospace', 'Arial', 'Courier New', 'Microsoft YaHei', ...
          fontSize: 72, // 文字的字体大小
          backgroundColor: 'transparent', // 详情背景色
          // borderColor: '#ccc', // 详情边框颜色
          // borderWidth: 1, // 详情边框宽度
          // borderType: 'solid', // 'solid' 'dashed' 'dotted'
          // borderRadius: 5, // 文字块的圆角
          // padding: [3, 6], // 文字块的内边距
          valueAnimation: true, // 是否开启标签的数字动画
          offsetCenter: [0, '-5%'], // 相对于仪表盘中心的偏移位置，数组第一项是水平方向的偏移，第二项是垂直方向的偏移。可以是绝对的数值，也可以是相对于仪表盘半径的百分比。
          formatter: function (value: number) { // 格式化函数或者字符串
            return value + ''
          },
        },
        /*
          系列中的数据内容数组，
          数组项可以为单个数值：[12, 34, 56, 10, 23]
          数据项也可为一个对象：[
                {
                  // 数据项的名称
                  name: '数据1',
                  // 数据项值8
                  value: 10
                },
                {
                  name: '数据2',
                  value: 20
                }]
        对象支持的所有属性：{ title , detail , name , value , itemStyle }
        */
        data: props.gaugeData
      }
    ]
  }
  myChart.value.setOption(option)
}
function showLoading (config: any) {
  myChart.value && myChart.value.showLoading('default', { text: '', color: props.themeColor, ...config }) // 显示加载动画效果
}
function hideLoading () {
  myChart.value && myChart.value.hideLoading() // 隐藏动画加载效果
}
// 监听图表容器尺寸变化，重新初始化图表
useResizeObserver(chartRef, () => {
  requestAnimationFrame(() => {
    myChart.value && myChart.value.resize()
  })
})
onMounted(() => {
  initChart()
})
onBeforeUnmount(() => {
  myChart.value && myChart.value.dispose() // 销毁图表实例
})
defineExpose({
  showLoading,
  hideLoading
})
</script>
<template>
  <div
    class="chart-container"
    ref="chartRef"
    :style="`--chart-width: ${chartWidth}; --chart-height: ${chartHeight};`"
  ></div>
</template>
<style lang="less" scoped>
.chart-container {
  width: var(--chart-width);
  height: var(--chart-height);
}
</style>
