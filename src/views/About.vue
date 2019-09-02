<template>
  <div class="about">
    <h1>This is an about page</h1>
    <img src="@/assets/logo.png" alt="" srcset="">
    <img src="@/assets/earth_rotate.gif" alt="" srcset="">
  </div>
</template>

<script>
export default {
  name: 'About',
  // OpenGraph
  metaInfo: {
    meta: [
      { property: 'og:title', content: 'about title', vmid: 'og:title' },
      { property: 'og:description', content: 'about description', vmid: 'og:description' },
      { property: 'og:image:type', content: 'image/jpg', vmid: 'og:image:type' },
      { property: 'og:image', content: '/og_about.jpg', vmid: 'og:image' },
      { property: 'og:url', content: 'http://turtlog.ml/about', vmid: 'og:url' },
      { property: 'og:type', content: 'website', vmid: 'og:type' },
    ],
  },
};
</script>
