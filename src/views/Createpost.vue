<template>
  <div class="create-post">
    <BlogCoverPreview v-show="$store.state.blogPhotoPreview"/>
    <Loading v-show="loading" />
    <div class="container">
      <div v-show="error" class="err-message">
        <p><span>Error: {{ this.errorMsg }}</span></p>
      </div>
      <div class="blog-info">
        <input type="text" placeholder="Enter Blog Title" v-model="blogTitle"/>
      </div>
        <div class="upload-file">
          <label for="blog-photo">Upload Photo</label>
          <input type="file" ref="blogPhoto" id="blog-photo" @change="fileChange" accept=".png, .jpg, ,jpeg" />
          <button :disabled="!this.$store.state.blogPhotoFileURL " @click="openPreview" class="preview" :class="{ 'button-inactive': !this.$store.state.blogPhotoFileURL }">
            Preview Photo
          </button>
          <span>File Chosen: {{ this.$store.state.blogPhotoName }}</span>
        </div>
      <div class="editor">
        <vue-editor :editorOptions="editorSettings" v-model="blogHTML" useCustomImageHandler @image-added="imageHandler"/>
      </div>
      <div class="blog-actions">
        <button @click="uploadBlog">Publish Blog</button>
        <router-link class="router-button" :to="{name: 'Preview'}">Post Preview</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import db from '../../firebase/firebaseInit'
import { doc, collection, setDoc } from 'firebase/firestore'
import { getStorage, ref, getDownloadURL, uploadBytesResumable  } from 'firebase/storage'
import BlogCoverPreview from '../components/BlogCoverPreview.vue'
import Loading from '../components/Loading.vue'
import { VueEditor } from "vue3-editor"
import Quill from "quill";

window.Quill = Quill;
const ImageResize = require("quill-image-resize-module").default;
Quill.register("modules/imageResize", ImageResize);

export default {
  name: 'createpost',
  components: {
    VueEditor,
    BlogCoverPreview,
    Loading
  },
  data() {
    return {
      loading: null,
      file: null,
      error: null,
      errorMsg: null,
      editorSettings: {
        modules: {
          imageResize: {},
        }
      }
    }
  },
  methods: {
    fileChange() {
      this.file = this.$refs.blogPhoto.files[0]
      const fileName = this.file.name
      this.$store.commit('fileNameChange', fileName)
      this.$store.commit('createFileURL', URL.createObjectURL(this.file))
    },
    openPreview() {
      this.$store.commit('openPhotoPreview')
    },
    imageHandler(file, Editor, cursorLocation, resetUploader) {
      
// const app = initializeApp(firebaseConfig);
      const storageRef = getStorage()
      const docRef = ref(storageRef, `han@han-ubuntu/Pictures/${file.name}`)      
      const uploadTask = uploadBytesResumable(docRef, file );

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          console.log(snapshot);
        },
        (err) => {
          console.log(err);
        },
        async () => {
          const downloadURL = await getDownloadURL(docRef);
          Editor.insertEmbed(cursorLocation, "image", downloadURL);
          resetUploader();
        }
      );
    },
    uploadBlog() {
      if(this.blogTitle.length !== 0 && this.blogHTML.length !== 0) {
          if(this.file){
          this.loading = true
          const storageRef = getStorage()
      const docRef = ref(storageRef, `han@han-ubuntu/BlogCoverPhotos/${this.$store.state.blogPhotoName}`)      
      const uploadTask = uploadBytesResumable(docRef, this.file );

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // console.log(snapshot);
        },
        (err) => {
          console.log(err);
          this.loading = false
        },
        async () => {

          const downloadURL = await getDownloadURL(docRef);
          const timestamp = Date.now()
          const database = await doc(collection(db, 'blogPosts'))
          // Editor.insertEmbed(cursorLocation, "image", downloadURL);
          // resetUploader();
          await setDoc(database, {
            blogID: database.id,
            blogHTML: this.blogHTML,
            blogCoverPhoto: downloadURL,
            blogCoverPhotoName: this.blogCoverPhotoName,
            blogTitle: this.blogTitle,
            profileId: this.profileId,
            date: timestamp
          })
          await this.$store.dispatch('getPost')
          this.loading = false
          this.$router.push({name: 'Viewblog', params: {blogid: database.id}})
        })
      }
        this.error = true
        this.errorMsg = 'please ensure you uploaded a cover photo!'
        setTimeout(() => {
          this.error = false
        }, 5000);
        return
      }
      this.error = true
      this.errorMsg = 'please ensure the blog title or blog html filled or cover photo!'
      setTimeout(() => {
        this.error = false
      }, 5000);
      return
    }
  },
  computed: {
    profileId () {
      return this.$store.state.profileId
    },
    blogCoverPhotoName() {
      return this.$store.state.blogPhotoName
    },
    blogTitle: {
      get() {
        return this.$store.state.blogTitle
      },

      set(payload) {
        this.$store.commit('updateBlogTitle', payload)
      }
    },
    blogHTML: {
      get() {
        return this.$store.state.blogHTML
      },

      set(payload) {
        this.$store.commit('newBlogPost', payload)
      }
    }
  }
}
</script>

<style scoped>
  .create-post {
  position: relative;
  height: 100%;
  }

  button {
    margin-top: 0;
  }

  .router-button {
    text-decoration: none;
    color: #fff;
  }

  label,
  button,
  .router-button {
    transition: 0.5s ease-in-out all;
    align-self: center;
    font-size: 14px;
    cursor: pointer;
    border-radius: 20px;
    padding: 12px 24px;
    color: #fff;
    background-color: #303030;
    text-decoration: none;
  }

  .label:hover, button:hover {
    background-color: rgba(48, 48, 48, 0.7);
  }

  .container {
    position: relative;
    height: 100%;
    padding: 10px 25px 60px;
  }

  .invisible {
    opacity: 0 !important;
  }

  .err-message {
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    color: #fff;
    margin-bottom: 10px;
    background-color: #303030;
    opacity: 1;
    transition: 0.5s ease all;
  }

  .err-message> {
      font-size: 14px;
    }

  .err-message> {
      font-weight: 600;
    }

    .blog-info {
    display: flex;
    margin-bottom: 32px;
    }

    .blog-info>input:nth-child(1) {
      min-width: 300px;
    }

    .blog-info>input {
      transition: 0.5s ease-in-out all;
      padding: 10px 4px;
      border: none;
      border-bottom: 1px solid #303030;
    }

    .blog-info>input:focus{
      outline: none;
        box-shadow: 0 1px 0 0 #303030;
    }

    .upload-file {
      flex: 1;
      margin-bottom: 16px;
      position: relative;
      display: flex;
    }

    .upload-file>input {
        display: none;
      }

    .upload-file> .preview{
      margin-left: 16px;
        text-transform: initial;
        outline: none;
    }

    .button-inactive{
      background-color: gray;
      cursor: not-allowed;
    }

    .upload-file> span{
       font-size: 12px;
        margin-left: 16px;
        align-self: center;
    }

    .editor {
    height: 60vh;
    display: flex;
    flex-direction: column;
    }

    .quillWrapper {
      position: relative;
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .ql-container {
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow: scroll;
    }

    .ql-editor {
      padding: 20px 16px 30px;
    }

    .blog-actions {
    margin-top: 64px;
    }

    .blog-actions> button{
      margin-right: 16px;
      outline: none;
    }
</style>