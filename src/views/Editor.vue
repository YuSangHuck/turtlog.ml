<template>
  <div class="aaaa">
    {{ content }}
    <div id="editor">
    </div>
    <!-- <button id='btn'>click</button> -->
    <button @click="test">click</button>
    <div class="toggle-mode">
      <button @click="how">toggle mode</button>
      <span>curMode: {{ editor.isReadOnly }}</span>
    </div>
    <div>
      <figure class="image"><img src="https://precium.io/img/MarkJang.cd19bf1d.png"><figcaption>캡션을 달아봣슴다</figcaption></figure><p>이분은 장뽀현</p>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
// NOTE UploadAdapter interface를 구현한 것
// reference: https://ckeditor.com/docs/ckeditor5/latest/api/module_upload_filerepository-UploadAdapter.html
class MyUploadAdapter {
  constructor(loader) {
    // NOTE file loader(read image from disk to variable)
    this.loader = loader;
  }

  // Initializes the XMLHttpRequest object using the URL passed to the constructor.
  _initRequest(method, uploadUrl) {
    console.log('_initRequest called');
    this.xhr = new XMLHttpRequest();
    const { xhr } = this.xhr;
    xhr.open(method, uploadUrl, true);
    xhr.responseType = 'json';
  }

  // Initializes XMLHttpRequest listeners.
  _initListeners(resolve, reject, file) {
    console.log('_initListeners called');
    console.log(file);
    const { xhr } = this;
    const { loader } = this;
    const genericErrorText = `Couldn't upload file: ${file.name}.`;

    console.log('xhr set eventListener');
    xhr.addEventListener('error', () => reject(genericErrorText));
    xhr.addEventListener('abort', () => reject());
    xhr.addEventListener('load', () => {
      console.log('xhr load called');
      const { response } = xhr;
      console.log(`_initListeners.onLoad response.url: ${response.url}`);
      // This example assumes the XHR server's "response" object will come with
      // an "error" which has its own "message" that can be passed to reject()
      // in the upload promise.
      //
      // Your integration may handle upload errors in a different way so make sure
      // it is done properly. The reject() function must be called when the upload fails.
      if (!response || response.error) {
        return reject(response && response.error ? response.error.message : genericErrorText);
      }

      // If the upload is successful, resolve the upload promise with an object containing
      // at least the "default" URL, pointing to the image on the server.
      // This URL will be used to display the image in the content. Learn more in the
      // UploadAdapter#upload documentation.
      return resolve({
        default: response.url,
        // srcset
        // default: 'http://example.com/images/image–default-size.png',
        // '160': 'http://example.com/images/image–size-160.image.png',
        // '500': 'http://example.com/images/image–size-500.image.png',
        // '1000': 'http://example.com/images/image–size-1000.image.png',
        // '1052': 'http://example.com/images/image–default-size.png'
      });
    });

    // Upload progress when it is supported. The file loader has the #uploadTotal and #uploaded
    // properties which are used e.g. to display the upload progress bar in the editor
    // user interface.
    if (xhr.upload) {
      xhr.upload.addEventListener('progress', (evt) => {
        if (evt.lengthComputable) {
          loader.uploadTotal = evt.total;
          loader.uploaded = evt.loaded;
        }
      });
    }
  }

  // create에서 post로 만들엇으므로 axios.post 같은거
  _sendRequest(file) {
    console.log(`_sendRequest called with ${file}`);
    // Prepare the form data.
    const data = new FormData();
    data.append('upload', file);
    console.log(`data: ${data}`);
    // Important note: This is the right place to implement security mechanisms
    // like authentication and CSRF protection. For instance, you can use
    // XMLHttpRequest.setRequestHeader() to set the request headers containing
    // the CSRF token generated earlier by your application.
    // Send the request.
    // XMLHttpRequest.send
    this.xhr.send(data);
    // resolve({default: 'naver.com'});
  }

  // NOTE UploadAdapter interface -> upload, abort
  // NOTE Upload must return a promise
  // ex) server.upload(file)
  upload() {
    console.log('upload called');
    return this.loader.file
      .then(file => new Promise((resolve, reject) => {
        // console.log(file)
        // 1. 서버저장소에 이미지 저장하고 저장된 이미지의 uri를 resolve 해줘야 함 -> 모든건 _sencdRequet에서 처리 됨
        const method = 'POST';
        // const uploadUrl = 'http://localhost:9090/manager/timesale-sequencial';
        const uploadUrl = 'http://localhost:9090/manager/test';
        this._initRequest(method, uploadUrl);
        this._initListeners(resolve, reject, file);
        this._sendRequest(file);
      }));
  }

  // Aborts the upload process.
  // ex) server.upload(file)
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
  // created() {
  // },
  mounted() {
    // document.getElementById('btn').addEventListener('click', this.test);
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
  methods: {
    how() {
      console.log('how calleed');
      this.editor.mode = !this.editor.mode;
    },
    test() {
      console.log('test calleed');
      this.content = editor.getData();
    },
    MyCustomUploadAdapterPlugin(editor) {
      console.log('MyCustomUploadAdapterPlugin called');
      editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
        // Configure the URL to the upload script in your back-end here!
        this.uploadAdapter = new MyUploadAdapter(loader);
        console.log(`여기야! :${this.uploadAdapter}`);
        return this.uploadAdapter;
      };
    },
  },
};
</script>

<style lang="scss">
.ck-content.ck-editor__editable {
  height: calc(100vh - 200px);
}
</style>
