---
layout: home

title: Front-end Notes
titleTemplate: Library

hero:
  name: Front-end Notes
  text: notes library
  tagline: JavaScript/HTML/CSS/Vue/Mobile/Http...
  image:
    src: /amazing-logo.svg
    alt: Front-end Notes
  actions:
    - theme: brand
      text: 开始使用
      link: /javascript/started
features:
  - icon: JS
    title: JavaScript 相关
    details: JavaScript 相关学习、使用和开发笔记
  - icon: HTML
    title: HTML 相关
    details: HTML 相关学习、使用和开发笔记
  - icon: CSS
    title: CSS 相关
    details: CSS 相关学习、使用和开发笔记
  - icon: <svg class="logo" viewBox="0 0 128 128" width="24" height="24" data-v-c0161dce=""><path fill="#42b883" d="M78.8,10L64,35.4L49.2,10H0l64,110l64-110C128,10,78.8,10,78.8,10z" data-v-c0161dce=""></path><path fill="#35495e" d="M78.8,10L64,35.4L49.2,10H25.6L64,76l38.4-66H78.8z" data-v-c0161dce=""></path></svg>
    title: Vue 相关
    details: Vue2/3 相关学习、使用和开发笔记
  - icon: Mobile
    title: Mobile 相关
    details: Mobile 相关学习、使用和开发笔记
  - icon: Plugins
    title: Plugins 相关
    details: 各种常用插件相关学习、使用和开发笔记
---

<script setup lang="ts">
import { onMounted } from 'vue'
import { fetchVersion } from './.vitepress/utils/fetchVersion'

onMounted(() => {
  fetchVersion()
})
</script>
