<template>
  <div class="aaaa">
    <div id="editor">
    </div>
    <button @click="uploadAdapter.sendRequest" >click</button>
  </div>
</template>

<script>
class MyUploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }

  // Initializes the XMLHttpRequest object using the URL passed to the constructor.
  _initRequest() {
    console.log('_initRequest called');
    const xhr = this.xhr = new XMLHttpRequest();
    const uploadUrl = 'http://localhost:9090/manager/timesale-sequencial';
    xhr.open('POST', uploadUrl, true);
    xhr.responseType = 'json';
  }

  // Initializes XMLHttpRequest listeners.
  _initListeners(resolve, reject, file) {
    console.log('_initListeners called');
    const { xhr } = this;
    const { loader } = this;
    const genericErrorText = `Couldn't upload file: ${file.name}.`;

    xhr.addEventListener('error', () => reject(genericErrorText));
    xhr.addEventListener('abort', () => reject());
    xhr.addEventListener('load', () => {
      const { response } = xhr;
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
      resolve({
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

  // setFileData() {
  upload() {
    console.log('upload called');
    return this.loader.file
      .then(file => new Promise((resolve, reject) => {
        this._initRequest();
        this._initListeners(resolve, reject, file);
      }));
  }

  // create에서 post로 만들엇으므로 axios.post 같은거
  sendRequest(file) {
    console.log('sendRequest called');
    // Prepare the form data.
    const data = new FormData();
    data.append('upload', file);
    // Important note: This is the right place to implement security mechanisms
    // like authentication and CSRF protection. For instance, you can use
    // XMLHttpRequest.setRequestHeader() to set the request headers containing
    // the CSRF token generated earlier by your application.
    // Send the request.
    // this.xhr.send(data);
  }

  // Aborts the upload process.
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
    };
  },
  mounted() {
    ClassicEditor
      .create(document.querySelector('#editor'), {
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
      })
      // .then(this.MyCustomUploadAdapterPlugin)
      .catch((err) => {
        console.error(err.stack);
      });
  },
  methods: {
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
