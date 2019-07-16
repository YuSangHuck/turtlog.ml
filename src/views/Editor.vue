<template>
  <div class="editor">
		<div id="editor">
		</div>
  </div>
</template>

<script lang="ts">
// import ClassicEditor from '@/lib/ckeditor/ckeditor5-build-classic/ckeditor'
export default {
  name: 'Editor',
  mounted() {
    ClassicEditor
      .create( document.querySelector( '#editor' ), {
        // toolbar: [ 'heading', '|', 'bold', 'italic', 'link' ]
      } )
      .then( editor => {
        window.editor = editor;
      } )
      .catch( err => {
        console.error( err.stack );
      } );
  },
};
</script>
