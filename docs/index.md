---
layout: home

title: Front-end Notes
titleTemplate: Library

hero:
  name: Front-end Notes
  text: notes library
  tagline: vue2、vue3、css、js...
  image:
    src: https://viteconf.org/23/_nuxt/viteconf.9feb32c8.svg
    alt: Front-end Notes
  actions:
    - theme: brand
      text: Get Started
      link: /vue2/started
    - theme: alt
      text: View on GitHub
      link: https://github.com/themusecatcher/front-end-notes
---

<script setup lang="ts">
import { onMounted } from 'vue'
import { fetchVersion } from './.vitepress/utils/fetchVersion'

onMounted(() => {
  fetchVersion()
})
</script>
