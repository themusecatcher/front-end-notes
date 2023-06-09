---
layout: home

title: Front-end Notes
titleTemplate: Library

hero:
  name: Front-end Notes
  text: ''
  tagline: 前端笔记文档
  image:
    src: /logo-with-shadow.png
    alt: Front-end Notes
  actions:
    - theme: brand
      text: Get Started
      link: /guide/started
    - theme: alt
      text: View on GitHub
      link: https://github.com/themusecatcher/front-end-notes
---

<script setup>
import { onMounted } from 'vue'
import { fetchVersion } from './.vitepress/utils/fetchVersion'

onMounted(() => {
  fetchVersion()
})
</script>
