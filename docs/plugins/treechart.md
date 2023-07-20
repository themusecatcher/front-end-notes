# 树图 echarts

<script setup lang="ts">
import TreeChart from './components/TreeChart.vue'
import { ref } from 'vue'
const treeData = ref({
  name: 'tree',
  children: [
    {
      name: '比较',
      value: 29,
      children: [
        {
          name: '折线图',
          value: 1
        },
        {
          name: '面积图',
          value: 2
        },
        {
          name: '柱状图',
          value: 3
        }
      ]
    },
    {
      name: '趋势趋势趋势趋势趋势趋势趋势趋势趋势趋势',
      value: 9,
      children: [
        {
          name: '折线图',
          value: 1
        },
        {
          name: '阶梯图',
          value: 2
        },
        {
          name: '面积图',
          value: 3
        },
        {
          name: '堆叠面积图',
          value: 4
        }
      ]
    },
    {
      name: '组成'
    }
  ]
})
function onClickNode (data: any) {
  console.log('data:', data)
}
</script>

## TreeChart 参考文档

- [使用手册](https://echarts.apache.org/handbook/zh/get-started)
- [在项目中引入 ECharts](https://echarts.apache.org/handbook/zh/basics/import)
- [tree 配置项](https://echarts.apache.org/zh/option.html#series-tree.type)
- [ECharts 在线定制](https://echarts.apache.org/zh/builder.html)

## 基本使用

<TreeChart :treeData="treeData" :height="500" @click-node="onClickNode" />
