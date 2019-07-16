<template>
  <div class="editor">
    editor
    <textarea name="editor1"></textarea>
    <button>작성</button>
  </div>
</template>

<script lang="ts">
// import { Component, Vue } from 'vue-property-decorator';

// @Component({
//   components: {
//   },
// })
export default {
  name: 'Editor',
  // OpenGraph
  metaInfo: {
    meta: [
      { property: 'og:title', content: 'editor title', vmid: 'og:title' },
      { property: 'og:description', content: 'editor description', vmid: 'og:description' },
      { property: 'og:image:type', content: 'image/jpg', vmid: 'og:image:type' },
      { property: 'og:image', content: '/og_editor.jpg', vmid: 'og:image' },
      { property: 'og:url', content: 'http://turtlog.ml', vmid: 'og:url' },
      { property: 'og:type', content: 'website', vmid: 'og:type' },
    ],
  },
  // created() {
  // beforeMount() {
  mounted() {
    const editorConfig1 = {
      language: 'es',
      uiColor: '#9AB8F3',
      height: 300,
      toolbarCanCollapse: true,
    };
    const editorConfig2 = {
      toolbarGroups: [
        { name: 'clipboard', groups: ['clipboard', 'undo'] },
        { name: 'document', groups: ['mode', 'document', 'doctools'] },
        { name: 'editing', groups: ['find', 'selection', 'spellchecker', 'editing'] },
        { name: 'forms', groups: ['forms'] },
        '/',
        { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
        { name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph'] },
        { name: 'links', groups: ['links'] },
        { name: 'insert', groups: ['insert'] },
        '/',
        { name: 'styles', groups: ['styles'] },
        { name: 'colors', groups: ['colors'] },
        { name: 'tools', groups: ['tools'] },
        { name: 'others', groups: ['others'] },
        { name: 'about', groups: ['about'] },
      ],
    };
    // CKEDITOR.replace( 'editor1', editorConfig1);
    CKEDITOR.replace('editor1', editorConfig2);
  },
};
</script>
