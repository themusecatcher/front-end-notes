# 拖拽 vuedraggable@next<Tag color="volcano" style="vertical-align: top; margin-left: 6px;">{{ pkg.dependencies.vuedraggable }}</Tag><BackTop />

<script lang="ts" setup>
import pkg from '../../package.json'
import { ref, watchEffect } from 'vue'
import Draggable from 'vuedraggable'

const players = ref([
  { name: 'curry', id: 1 },
  { name: 'klay', id: 2 },
  { name: 'green', id: 3 },
  { name: 'kobe', id: 4 },
  { name: 'james', id: 5 },
  { name: 'jordan', id: 6 },
  { name: 'dear', id: 7 },
  { name: 'muse', id: 8 }
])
const roles = ref([
  { name: '李白', id: 1 },
  { name: '韩信', id: 2 },
  { name: '公孙离', id: 3 },
  { name: '李元芳', id: 4 },
  { name: '关羽', id: 5 },
  { name: '诸葛亮', id: 6 },
  { name: '澜', id: 7 },
  { name: '吕布', id: 8 }
])

watchEffect(() => {
  console.log('players:', players.value)
})
watchEffect(() => {
  console.log('roles:', roles.value)
})
function onStart (e: any) { // 开始拖动时触发的事件
  console.log('开始拖拽 start:', e)
  console.log('拖拽操作前的索引oldIndex:', e.oldIndex)
  console.log('拖拽完成后的索引newIndex:', e.newIndex)
}
function onEnd (e: any) { // 拖动完成时触发的事件
  console.log('结束拖拽 end:', e)
  console.log('拖拽操作前的索引oldIndex:', e.oldIndex)
  console.log('拖拽完成后的索引newIndex:', e.newIndex)
}
function onMove (evt: any, originalEvent: DragEvent) { // 拖拽move事件回调
  console.log('move:', evt)
  console.log('originalEvent:', originalEvent)
  // 不允许拖拽
  return evt.draggedContext.element.id !== 7 // false表示阻止，true表示不阻止
}
</script>

## vuedraggable@next 参考文档

- [使用文档](https://www.npmjs.com/package/vuedraggable/v/4.1.0)

## 设置相同的 group，即可实现两个拖拽区域按钮拖动交换

<Space direction="vertical" :size="32">
  <Card title="players (sort: false，不允许内部拖动排序，但可以拖动元素到外部 roles)">
    <!-- 参考文档：https://github.com/SortableJS/vue.draggable.next
    https://www.itxst.com/vue-draggable-next/tutorial.html -->
    <Draggable
      animation="300"
      v-model="players"
      group="human"
      :sort="false"
      item-key="id"
      @start="onStart"
      @end="onEnd"
      :move="onMove">
      <template #item="{ element }">
        <Button class="mr12 mb12">{{ element.name }} {{ element.id }}</Button>
      </template>
      <template #header>
        <Button class="mr12" type="primary">header</Button>
      </template>
      <template #footer>
        <Button type="primary">footer</Button>
      </template>
    </Draggable>
  </Card>
  <Card title="roles (id 值为偶数不可拖动，奇数可拖动)">
    <Draggable
      animation="300"
      v-model="roles"
      group="human"
      filter=".unmover"
      draggable=".mover"
      item-key="id"
      @start="onStart"
      @end="onEnd"
      :move="onMove">
      <template #item="{ element }">
        <Button class="mr12 mb12" :class="[element.id % 2 === 0 ? 'unmover' : 'mover']">{{ element.name }} {{ element.id }}</Button>
      </template>
      <template #header>
        <Button class="mr12" type="primary">header</Button>
      </template>
      <template #footer>
        <Button type="primary">footer</Button>
      </template>
    </Draggable>
  </Card>
</Space>

<style lang="less" scoped>
.mr12 {
  margin-right: 12px;
}
.mb12 {
  margin-bottom: 12px;
}
</style>

::: details Show Code

```vue
<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import Draggable from 'vuedraggable'
import { Space, Card, Button } from 'vue-amazing-ui' // pnpm i vue-amazing-ui
import 'vue-amazing-ui/css'

const players = ref([
  { name: 'curry', id: 1 },
  { name: 'klay', id: 2 },
  { name: 'green', id: 3 },
  { name: 'kobe', id: 4 },
  { name: 'james', id: 5 },
  { name: 'jordan', id: 6 },
  { name: 'dear', id: 7 },
  { name: 'muse', id: 8 }
])
const roles = ref([
  { name: '李白', id: 1 },
  { name: '韩信', id: 2 },
  { name: '公孙离', id: 3 },
  { name: '李元芳', id: 4 },
  { name: '关羽', id: 5 },
  { name: '诸葛亮', id: 6 },
  { name: '澜', id: 7 },
  { name: '吕布', id: 8 }
])

watchEffect(() => {
  console.log('players:', players.value)
})
watchEffect(() => {
  console.log('roles:', roles.value)
})
function onStart (e: any) { // 开始拖动时触发的事件
  console.log('开始拖拽 start:', e)
  console.log('拖拽操作前的索引oldIndex:', e.oldIndex)
  console.log('拖拽完成后的索引newIndex:', e.newIndex)
}
function onEnd (e: any) { // 拖动完成时触发的事件
  console.log('结束拖拽 end:', e)
  console.log('拖拽操作前的索引oldIndex:', e.oldIndex)
  console.log('拖拽完成后的索引newIndex:', e.newIndex)
}
function onMove (evt: any, originalEvent: DragEvent) { // 拖拽move事件回调
  console.log('move:', evt)
  console.log('originalEvent:', originalEvent)
  // 不允许拖拽
  return evt.draggedContext.element.id !== 7 // false表示阻止，true表示不阻止
}
</script>
<template>
  <Space direction="vertical" :size="32">
    <Card title="players (sort: false，不允许内部拖动排序，但可以拖动元素到外部 roles)">
      <!-- 参考文档：https://github.com/SortableJS/vue.draggable.next
      https://www.itxst.com/vue-draggable-next/tutorial.html -->
      <Draggable
        animation="300"
        v-model="players"
        group="human"
        :sort="false"
        item-key="id"
        @start="onStart"
        @end="onEnd"
        :move="onMove">
        <template #item="{ element }">
          <Button class="mr12 mb12">{{ element.name }} {{ element.id }}</Button>
        </template>
        <template #header>
          <Button class="mr12" type="primary">header</Button>
        </template>
        <template #footer>
          <Button type="primary">footer</Button>
        </template>
      </Draggable>
    </Card>
    <Card title="roles (id 值为偶数不可拖动，奇数可拖动)">
      <Draggable
        animation="300"
        v-model="roles"
        group="human"
        filter=".unmover"
        draggable=".mover"
        item-key="id"
        @start="onStart"
        @end="onEnd"
        :move="onMove">
        <template #item="{ element }">
          <Button class="mr12 mb12" :class="[element.id % 2 === 0 ? 'unmover' : 'mover']">{{ element.name }} {{ element.id }}</Button>
        </template>
        <template #header>
          <Button class="mr12" type="primary">header</Button>
        </template>
        <template #footer>
          <Button type="primary">footer</Button>
        </template>
      </Draggable>
    </Card>
  </Space>
</template>
<style lang="less" scoped>
.mr12 {
  margin-right: 12px;
}
.mb12 {
  margin-bottom: 12px;
}
</style>
```

:::
