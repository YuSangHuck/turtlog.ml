<template>
  <div class="aaaa">
    {{ content }}
    <div id="editor">
    </div>
    <!-- <button id='btn'>click</button> -->
    <button @click="getContent">get editor content</button>
    <div class="toggle-mode">
    </div>
    <div>
      <figure class="image"><img src="https://precium.io/img/MarkJang.cd19bf1d.png"><figcaption>캡션을 달아봣슴다</figcaption></figure><p>이분은 장뽀현</p>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import axios from 'axios';
// NOTE UploadAdapter interface를 구현한 것
// reference: https://ckeditor.com/docs/ckeditor5/latest/api/module_upload_filerepository-UploadAdapter.html
class MyUploadAdapter {
  constructor(loader) {
    // NOTE file loader(read image from disk to variable)
    this.loader = loader;
  }
  // NOTE interface of UploadAdapter. should be implemented
  upload() {
    return this.loader.file
      .then(file => new Promise((resolve, reject) => {
        const genericErrorText = `Couldn't upload file: ${file.name}.`;
        const formData = new FormData();
        formData.append('upload', file);
        const url = 'http://localhost:9090/manager/influencer/review/image'
        axios.post(url, formData)
          .then((res) => {
            // console.log(`res: ${JSON.stringify(res)}`);
            // console.log(`res.data.message: ${res.data.message}`);
            // console.log(`res.data.url: ${res.data.url}`);
            // alert('resolve한당!')
            resolve({ default: res.data.url });
          })
          .catch((err) => {
            // console.error(`err in axios: ${JSON.stringify(err)}`);
            // alert('reject한당!');
            reject(err ? err.message : genericErrorText)
          })
      }));
  }
  // NOTE interface of UploadAdapter. should be implemented
  abort() {
    console.log('abort called');
    if (this.xhr) {
      this.xhr.abort();
    }
  }
}
export default {
  name: 'Editor',
  data() {
    return {
      uploadAdapter: {},
      uploadAdapterPlugin: {},
      editor: {},
      content: '',
    };
  },
  methods: {
    getContent() {
      this.content = editor.getData();
    },
    MyCustomUploadAdapterPlugin(editor) {
      console.log('MyCustomUploadAdapterPlugin called');
      editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
        // Configure the URL to the upload script in your back-end here!
        this.uploadAdapter = new MyUploadAdapter(loader);
        return this.uploadAdapter;
      };
    },
  },
  mounted() {
    ClassicEditor
      .create(document.querySelector('#editor'), {
        isReadOnly: true,
        extraPlugins: [this.MyCustomUploadAdapterPlugin],
        // plugins: [ EasyImage ],

        // toolbar: [ 'heading', '|', 'bold', 'italic', 'link' ]
        // toolbar: [ 'imageUpload' ],

        // Configure the endpoint. See the "Configuration" section above.
        // cloudServices: {
        //   tokenUrl: 'https://example.com/cs-token-endpoint',
        //   uploadUrl: 'https://your-organization-id.cke-cs.com/easyimage/upload/'
        // }
      })
      .then((editor) => {
        window.editor = editor;
        this.editor = window.editor;
      })
      // .then(this.MyCustomUploadAdapterPlugin)
      .catch((err) => {
        console.error(err.stack);
      });
  },
};
</script>

<style lang="scss">
.ck-content.ck-editor__editable {
  height: calc(100vh - 200px);
}
</style>
