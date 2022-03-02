<template>
  <div class="blog-wrapper" :class="{'no-user': !use}">
    <div class="blog-content">
      <div>
        <h2 class="welhead" v-if="post.welcomeScreen">{{ post.title }}</h2>
        <h2 class="head" v-else>{{ post.blogTitle }}</h2>
        <p v-if="post.welcomeScreen">{{ post.blogPost }}</p>
        <p class="content-preview" v-else v-html="post.blogHTML"></p>
        <router-link class="link link-light" v-if="post.welcomeScreen" :to="{name: 'Register'}">
          <span  style="color: white !important;">Login/Register</span><svg style="width: 13px; color: white" aria-hidden="true" focusable="false" data-prefix="fal" data-icon="arrow-right" class="svg-inline--fa fa-arrow-right fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M216.464 36.465l-7.071 7.07c-4.686 4.686-4.686 12.284 0 16.971L387.887 239H12c-6.627 0-12 5.373-12 12v10c0 6.627 5.373 12 12 12h375.887L209.393 451.494c-4.686 4.686-4.686 12.284 0 16.971l7.071 7.07c4.686 4.686 12.284 4.686 16.97 0l211.051-211.05c4.686-4.686 4.686-12.284 0-16.971L233.434 36.465c-4.686-4.687-12.284-4.687-16.97 0z"></path></svg>
        </router-link>
        <router-link class="link link-light" v-else :to="{name: 'Viewblog', params: {blogid: this.post.blogID }}">
          View The Post <svg style="width: 13px; color: black" aria-hidden="true" focusable="false" data-prefix="fal" data-icon="arrow-right" class="svg-inline--fa fa-arrow-right fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M216.464 36.465l-7.071 7.07c-4.686 4.686-4.686 12.284 0 16.971L387.887 239H12c-6.627 0-12 5.373-12 12v10c0 6.627 5.373 12 12 12h375.887L209.393 451.494c-4.686 4.686-4.686 12.284 0 16.971l7.071 7.07c4.686 4.686 12.284 4.686 16.97 0l211.051-211.05c4.686-4.686 4.686-12.284 0-16.971L233.434 36.465c-4.686-4.687-12.284-4.687-16.97 0z"></path></svg>
        </router-link>
      </div>
    </div>
    <div class="blog-photo">
        <img v-if="post.welcomeScreen" :src="require(`../assets/blogPhotos/${post.photo}.jpg`)">
        <img v-else :src="post.blogCoverPhoto" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: 'blogpost',
  props: ['post'],
  computed: {
    use() {
      return this.$store.state.user
    }
  }
}
</script>

<style scoped>
  .blog-wrapper{
    display: flex;
    flex-direction: column;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1) 0 2px 4px -1px rgba(0, 0, 0, 0.6);
  }

  .blog-content{
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 4;
    order: 2;
  }

  .blog-content>div{
    max-width: 375px;
    padding: 72px 24px;
  }

  .head{
      font-size: 2rem !important;
      font-weight: 300;
      text-transform: uppercase;
      margin-bottom: 24px;
  }

  .welhead{
    font-size: 2rem !important;
      font-weight: 300;
      text-transform: uppercase;
      margin-bottom: 24px;
      color: #fff;
  }


  .blog-content>div>p{
    font-size: 15px;
    font-weight: 300;
    line-height: 1.7;
  }

  .content-preview {
    font-size: 13px;
    max-height: 24px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 250px;
  }

  .link{
    display: inline-flex;
    align-items: center;
    margin-top: 32px;
    margin-bottom: 4px;
    border-bottom: 1px solid transparent;
    transition: 0.5s ease-in  all;
    color: black !important;
  }
  .link:hover{
    border-bottom-color: #303030;
  }

  .link-light:hover{
    border-bottom-color: #ffff;
  }

  .blog-photo{
    order: 1;
    flex: 4;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.6);
  }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       

  img{
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .blog-wrapper:nth-child(even)> .blog-content{                                                                                                        
    order: 2;
  }

  .blog-wrapper:nth-child(even)> .blog-photo {
    order: 1;
  }

  .no-user:first-child> .blog-content{
    background-color: #303030;
    color: #fff;
  }

  @media (min-width: 720px) {
    .blog-wrapper{
      flex-direction: row;
      min-height: 650px;
      max-height: 650px;
    }

    .blog-content{
      order: 1;
    }

    .blog-content>div{
      padding: 0 24px;
    }

    .blog-content>div>h2{
      font-size: 0.8rem;
    }

    img{
      order: 2;
    }
  }

  @media (min-width: 800px) {
    .blog-content{
      flex: 3;
    }

    img{
      flex: 4;
    }
  }
</style>