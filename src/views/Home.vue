<template>
  <div class="home">
  </div>
</template>

<script lang="ts">
// import { Component, Vue } from 'vue-property-decorator';

// @Component({
//   components: {
//   },
// })
export default {
  name: 'Home',
  // OpenGraph
  metaInfo: {
    meta: [
      { charset: 'utf-8' },
      { property: 'og:title', content: 'home title', vmid: 'og:title' },
      { property: 'og:description', content: 'home description', vmid: 'og:description' },
      { property: 'og:image:type', content: 'image/jpg', vmid: 'og:image:type' },
      { property: 'og:image', content: '/og_home.jpg', vmid: 'og:image' },
      { property: 'og:url', content: 'http://turtlog.ml', vmid: 'og:url' },
      { property: 'og:type', content: 'website', vmid: 'og:type' },
    ],
  },
};
</script>
