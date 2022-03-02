<template>
  <div class="blog-card">
    <div class="cons"  v-show="editPosts">
      <div @click="editBlog" style="margin-right: 12px;" class="con">
        <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="edit" class="svg-inline--fa fa-edit fa-w-18 edit" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="#000" d="M402.3 344.9l32-32c5-5 13.7-1.5 13.7 5.7V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h273.5c7.1 0 10.7 8.6 5.7 13.7l-32 32c-1.5 1.5-3.5 2.3-5.7 2.3H48v352h352V350.5c0-2.1.8-4.1 2.3-5.6zm156.6-201.8L296.3 405.7l-90.4 10c-26.2 2.9-48.5-19.2-45.6-45.6l10-90.4L432.9 17.1c22.9-22.9 59.9-22.9 82.7 0l43.2 43.2c22.9 22.9 22.9 60 .1 82.8zM460.1 174L402 115.9 216.2 301.8l-7.3 65.3 65.3-7.3L460.1 174zm64.8-79.7l-43.2-43.2c-4.1-4.1-10.8-4.1-14.8 0L436 82l58.1 58.1 30.9-30.9c4-4.2 4-10.8-.1-14.9z"></path></svg>
      </div>
      <div class="con" @click="deletePost">
        <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="trash" class="svg-inline--fa fa-trash fa-w-14 delete" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#000" d="M432 80h-82.4l-34-56.7A48 48 0 0 0 274.4 0H173.6a48 48 0 0 0-41.2 23.3L98.4 80H16A16 16 0 0 0 0 96v16a16 16 0 0 0 16 16h16l21.2 339a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128h16a16 16 0 0 0 16-16V96a16 16 0 0 0-16-16zM173.6 48h100.8l19.2 32H154.4zm173.3 416H101.11l-21-336h287.8z"></path></svg>
      </div>
    </div>
    <img :src="post.blogCoverPhoto" alt="">
    <div class="info">
      <h4>{{ post.blogTitle }}</h4>
      <h6>Posted on: {{new Date(post.blogDate).toLocaleString('en-us', {dateStyle: 'long'})}}</h6>
      <router-link class="link" :to="{name: 'Viewblog', params: {blogid: this.post.blogID }}">
        View The Post<svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="arrow-right" class="svg-inline--fa fa-arrow-right fa-w-14 arrow" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M216.464 36.465l-7.071 7.07c-4.686 4.686-4.686 12.284 0 16.971L387.887 239H12c-6.627 0-12 5.373-12 12v10c0 6.627 5.373 12 12 12h375.887L209.393 451.494c-4.686 4.686-4.686 12.284 0 16.971l7.071 7.07c4.686 4.686 12.284 4.686 16.97 0l211.051-211.05c4.686-4.686 4.686-12.284 0-16.971L233.434 36.465c-4.686-4.687-12.284-4.687-16.97 0z"></path></svg>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'blogcard',
  props: ['post'],
  methods: {
    deletePost() {
      this.$store.dispatch('delete', this.post.blogID)
    },
    editBlog() {
      this.$router.push({name: 'Editblog', params: {blogid: this.post.blogID}})
      // this.$store.dispatch('edit', this.post.blogID)
    }
  },
  computed: {
    ...mapState(['editPost']),
    editPosts() {
      return this.editPost
    }
  }
}
</script>

<style scoped>
  .blog-card{
    position: relative;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    background-color: #fff;
    min-height: 420px;
    transition: 0.5s ease all;
  }

  .blog-card:hover{
    transform: rotate(-1deg) scale(1.01);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.6);
  }

  .cons{
    display: flex;
    position: absolute;
    top: 10px;
    right: 1px;
    z-index: 99;
  }

  .con{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background-color: #fff;
    transition: 0.5s ease all;
  }

  .con:hover path{
    fill: white;
  }

  .con:hover{
    background-color: #303030;
  }

  .edit, .delete{
    color: #fff;
    pointer-events: none;
    height: 15px;
    width: auto;
    display: flex;
    justify-content: center;
  }

  img{
    display: block;
    border-radius: 8px 8px 0 0;
    z-index: 1;
    width: 100%;
    min-height: 200px;
    object-fit: cover;
  }

  .info{
    display: flex;
    flex-direction: column;
    height: 100%;
    z-index: 3;
    padding: 32px 16px;
    color: #000;
  }

  .info>h4{
    padding-bottom: 8px;
    font-size: 20px;
    font-weight: 300;
  }

  .info>h6{
    font-weight: 400;
    font-size: 12px;
    padding-bottom: 16px;

  }

  .link{
    display: inline-flex;
    align-items: center;
    margin-top: auto;
    font-weight: 500;
    padding-top: 20px;
    font-size: 12px;
    transition: .5s ease-in all;
  }

  .link:hover{
    color: rgba(48, 48, 48, 0.8);

  }

  .arrow{
    width: 10px;
  }


</style>
