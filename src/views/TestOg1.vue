<template>
  <div class="test-og1">
    test-og1
  </div>
</template>

<script lang="js">
// import { Component, Vue } from 'vue-property-decorator';
// @Component({
// })
// export default class TestOg1 extends Vue {
//   metaInfo: Object = {
//     meta: [
//       { charset: 'utf-8' },
//       { name: 'viewport', content: 'width=device-width, initial-scale=1' }
//     ]
//   }
// }
export default {
  metaInfo: {
    meta: [
    // <meta property="og:title" content="root og tag">
    // <meta property="og:description" content="root의 og tag입니다.">
    // <meta property="og:image" content="<%= BASE_URL %>ogImage1.jpg">
    // <meta property="og:image:type" content="image/jpg">
    // <meta property="og:url" content="http://turtlog.ml">
    // <meta property="og:type" content="website">
      { charset: 'utf-8' },
      { property: 'og:title', content: 'test1 title', vmid: 'og:title' },
      { property: 'og:description', content: 'test1 description', vmid: 'og:description' },
      { property: 'og:image:type', content: 'image/jpg', vmid: 'og:image:type' },
      { property: 'og:image', content: '/ogImage1.jpg', vmid: 'og:image' },
    ],
  },
};
</script>

<style lang="scss" scoped>

</style>
