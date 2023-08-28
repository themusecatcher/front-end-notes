---
layout: home

title: Front-end Notes
titleTemplate: Library

hero:
  name: Front-end Notes
  text: notes library
  tagline: vue2、vue3、js、css...
  image:
    src: /amazing-logo.svg
    alt: Front-end Notes
  actions:
    - theme: brand
      text: Get Started
      link: /vue2/started
    - theme: alt
      text: View on GitHub
      link: https://github.com/themusecatcher/front-end-notes
features:
  - icon: <svg class="logo" viewBox="0 0 128 128" width="24" height="24" data-v-c0161dce=""><path fill="#42b883" d="M78.8,10L64,35.4L49.2,10H0l64,110l64-110C128,10,78.8,10,78.8,10z" data-v-c0161dce=""></path><path fill="#35495e" d="M78.8,10L64,35.4L49.2,10H25.6L64,76l38.4-66H78.8z" data-v-c0161dce=""></path></svg>
    title: vue相关
    details: Vue2 / Vue3 相关学习、使用和开发笔记
  - icon: JS
    title: js相关
    details: JavaScript 相关学习、使用和开发笔记
  - icon: CSS
    title: css相关
    details: CSS 相关学习、使用和开发笔记
---

<script setup lang="ts">
import { onMounted } from 'vue'
import { fetchVersion } from './.vitepress/utils/fetchVersion'

onMounted(() => {
  fetchVersion()
})
</script>
