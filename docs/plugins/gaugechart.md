# 引擎图 echarts

<script setup lang="ts">
import GaugeChart from './components/GaugeChart.vue'
import { ref } from 'vue'
const gaugeData = ref([
    {
      value: 80,
      name: 'Rating'
    }
  ])
</script>

## GaugeChart 参考文档

- [使用手册](https://echarts.apache.org/handbook/zh/get-started)
- [在项目中引入 ECharts](https://echarts.apache.org/handbook/zh/basics/import)
- [gauge 配置项](https://echarts.apache.org/zh/option.html#series-gauge)
- [ECharts 在线定制](https://echarts.apache.org/zh/builder.html)

## 基本使用

<GaugeChart :gaugeData="gaugeData" :height="500" />
