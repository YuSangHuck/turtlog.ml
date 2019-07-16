<template>
  <div class="editor">
    editor
    <textarea name="editor1"></textarea>
    <button>작성</button>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Editor',
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
