<template>
  <div v-if="currentBlog" class="post-view">
    <div class="container quillWrapper">
      <h2>{{ currentBlog[0].blogTitle }}</h2>
      <p>Posted on: {{ new Date(currentBlog[0].blogDate).toLocaleString("en-us", { dateStyle: "long" }) }}</p>
      <p># {{ this.$store.state.profileUserName }}</p>
      <img :src="currentBlog[0].blogCoverPhoto" alt="" />
      <div class="post-content ql-editor" v-html="currentBlog[0].blogHTML"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'viewBlog',
  data() {
    return {
      currentBlog: null
    }
  },
  async mounted() {
    this.currentBlog = await this.$store.state.blogPosts.filter((post) => {
      return post.blogID === this.$route.params.blogid
    })
  }
}
</script>

<style scoped>
  .post-view> p{
    /* font-weight: 400; */
    font-size: 14px;
    margin-bottom: 24px;
  }

  .post-view {
  min-height: 100%;
  }

  .container {
    max-width: 1000px;
    padding: 60px 25px;
  }

  .ql-editor {
    padding: 0;
  }

  h2 {
    margin-bottom: 16px;
    font-weight: 300;
    font-size: 32px;
  }

  img {
    width: 100%;
    margin-bottom: 32px;
  }
</style>