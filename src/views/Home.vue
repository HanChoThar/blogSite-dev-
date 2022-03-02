<template>
  <div class="home">
    <Blogpost v-if="!use" :post="welcomeScreen"/>
    <Blogpost :post="post" v-for="(post, index) in blogFeed" :key="index" />
    <div class="card-wrapper">
      <div class="container">
        <h2 class="recent">See The Recent Blogs</h2>
        <div class="blog-cards">
          <Blogcard :post="post" v-for="(post, index) in blogCard" :key="index"/>
        </div>
      </div>
    </div>
    <div v-if="!use" class="updates">
      <div class="container">
        <h2>never miss a post. Register for your free account today!</h2>
        <router-link class="router-button" to="#">
          Register for FireBlogs<svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="arrow-right" class="svg-inline--fa fa-arrow-right fa-w-14 arrow" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M216.464 36.465l-7.071 7.07c-4.686 4.686-4.686 12.284 0 16.971L387.887 239H12c-6.627 0-12 5.373-12 12v10c0 6.627 5.373 12 12 12h375.887L209.393 451.494c-4.686 4.686-4.686 12.284 0 16.971l7.071 7.07c4.686 4.686 12.284 4.686 16.97 0l211.051-211.05c4.686-4.686 4.686-12.284 0-16.971L233.434 36.465c-4.686-4.687-12.284-4.687-16.97 0z"></path></svg>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex'
import Blogpost from '../components/Blogpost.vue'
import Blogcard from '../components/Blogcard.vue'

export default {                                                                                                      
  name: 'Home',                                                                                     
  components: {
    Blogpost, Blogcard
  },
  data() {
    return {
      welcomeScreen: {
        title: "Welcome!",
        blogPost:
          "Weekly blog articles with all things programming including HTML, CSS, JavaScript and more. Register today to never miss a post!",
        welcomeScreen: true,
        photo: "coding",
      }
    };
  },
  computed: {
    ...mapState(['sampleBlogCards']),
    ...mapGetters(['blogPostsFeed', 'blogPostsCards']),
    blogFeed() {
      return this.blogPostsFeed
    },
    blogCard() {
      return this.blogPostsCards
    },
    sampleBlogCard() {
      return this.sampleBlogCards
    },
    use() {
      return this.$store.state.user
    }
  },
}
</script>

<style scoped>
  .recent{
    font-weight: 300;
    font-size: 1.8rem;
    margin-bottom: 2rem;
  }

  .updates>.container{
    padding: 100px 25px;
    display: flex;
    text-align: center;
    flex-direction: column;
    align-items: center;
  }

  .updates>.container>h2{
    margin-bottom: 2rem;
    font-weight: 300;
    text-transform: uppercase;
    font-size: 32px;
    max-width: 425px;
    width: 100%;
  }

  .arrow{
    width: 12px;
  }

  .router-button{
    background: #303030;
    color: #fff;
    padding: 5px 5px;
    border-radius: 10px;
    outline: none;
    text-decoration: none;
    transition: .3s ease-in all;
  }
  .router-button:hover{
    transform: scale(1.03);
  }

</style>