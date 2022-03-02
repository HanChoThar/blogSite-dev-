<template>
  <div class="app-wrapper">
    <div class="app" v-if="$store.state.postLoaded">
      <Navigation v-if="!navigation"/>
    <router-view/>
    <Footer v-if="!navigation"/>
    </div>
  </div>
</template>

<script>
import Navigation from './components/Navigation.vue'
import Footer from './components/Footer.vue'
import db from '../firebase/firebaseInit'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { mapState } from 'vuex'
import { computed } from '@vue/runtime-core'

export default {
  components: {
    Navigation, Footer
  },
  data() {
    return {
      navigation: null
    }
  },
  created() {
    this.checkRoute()
    onAuthStateChanged( getAuth(), (user) => {
      this.$store.commit('updateUser', user)
      if(user) {
        this.$store.dispatch('getCurrentUser')
      }
    })
    this.$store.dispatch('getPost')
  },                                                                                                                                                             
  methods: {
    checkRoute() {
      if(this.$route.name == "Login" ||
        this.$route.name == "Register" ||
        this.$route.name == "Forgotpassword") 
      {
        this.navigation = true
        return
      }
        this.navigation = false
    }
  },
  watch: {
    $route() {
      this.checkRoute()
    }
  }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Quicksand", sans-serif;
}
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.container {
  max-width: 1440px;
  margin: 0 auto;
}
.link {
  cursor: pointer;
  text-decoration: none;
  text-transform: uppercase;
  color: black;
}
.link-light {
  color: #fff;
}

.card-wrapper{
  position: relative;
  padding: 80px 16px;
  background-color: #f1f1f1
}

.blog-cards{
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
}

@media (min-width: 500px) {
  .card-wrapper{
    padding: 100px 16px;
  }

  .blog-cards{
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 900px) {
  .blog-cards{
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1200px) {
  .blog-cards{
    grid-template-columns: repeat(4, 1fr);
  }
}

/* Login and register */
.form-wrap{
    display: flex;
    height: 100vh;
    overflow: hidden;
    justify-content: center;
    align-self: center;
    margin: 0 auto;
    width: 90%;
  }

  .login-register{
    margin-bottom: 32px;
  }

  .router-link{
   color: black;
  }

  form{
    padding: 0 10px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
  }

  .head{
    text-align: center;
    font-size: 32px;
    color: #303030;
    margin-bottom: 40px;
  }

  .inputs{
    width: 100%;
    max-width: 350px;
  }

  .input{
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 8px;
  }

  .input> input{
    width: 100%;
    border: none;
    background-color: #f2f7f6;
    padding: 4px 4px 4px 30px;
    height: 50px;
  }

  .input> input:focus{
    outline: none;
  }

  .forgot-password {
    text-decoration: none;
    color: #000;
    cursor: pointer;
    font-size: 14px;
    margin: 16px 0 32px;
    border-bottom: 1px solid transparent;
    transition: 0.5s ease all;
  }

  .forgot-password:hover{
    border-color: #303030;
  }

  .icon{
    width: 12px;
    position: absolute;
    left: 6px;
  }

  .angle{
    display: none;
    position: absolute;
    background-color: #fff;
    width: 60px;
    right: -30px;
    height: 101%;
    transform: rotate(3deg);
  }

  .error{
    text-align: center;
    font-size: 12px;
    color: red;
  }

  .btn{
    background-color: #303030;
    color: #fff;
    padding: 10px 8px;
    border-radius: 30px;
    border: none;
    cursor: pointer;
    margin-top: 2rem;
  }

  .background {
    display: none;
    flex: 2;
    background-size: cover;
    background-image: url('./assets/background.png');
    width: 100%;
    height: 100%;
  }

  @media (min-width: 900px) {
    .form-wrap{
      width: 100%;
    }

    form{
      padding: 0 50px;
    }

    .head {
      font-size: 40px;
    }

    .angle{
      display: initial;
    }

    .background{
      display: initial;
    }
  }
</style>
