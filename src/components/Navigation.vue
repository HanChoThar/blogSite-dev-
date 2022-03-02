<template>
<header>
  <nav class="container">
    <div class="branding">
      <router-link class="header" :to="{name: 'Home'}">BlogSite</router-link>
    </div>
    <div class="nav-links">
      <ul v-show="!mobile">
        <router-link class="link" to="/">Home</router-link>
        <router-link class="link" :to="{name: 'Blog'}">Blogs</router-link>
        <router-link class="link" :to="{name: 'Createpost'}">Create Post</router-link>
        <router-link class="link" v-if="!user" :to="{name: 'Login'}">Loging/Register</router-link>
      </ul>
      <div v-if="user" @click="toggleProfile" class="profile" ref="profile">
        <span>{{ this.$store.state.profileInitials }}</span>
        <div v-show="profileMenu" class="profile-menu">
          <div class="info">
            <p class="initials">{{ this.$store.state.profileInitials }}</p>
            <div class="right">
              <p>{{ this.$store.state.profileFirstName }} {{ this.$store.state.profileLastName}}</p>
              <p>{{ this.$store.state.profileUserName }}</p>
              <p>{{ this.$store.state.profileEmail }}</p>
            </div>
          </div>
          <div class="options">
            <div class="option">
              <router-link class="option" :to="{name: 'Profile'}">
                <svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="user-alt" class="svg-inline--fa fa-user-alt fa-w-16 ico" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 32c61.8 0 112 50.2 112 112s-50.2 112-112 112-112-50.2-112-112S194.2 32 256 32m128 320c52.9 0 96 43.1 96 96v32H32v-32c0-52.9 43.1-96 96-96 85 0 67.3 16 128 16 60.9 0 42.9-16 128-16M256 0c-79.5 0-144 64.5-144 144s64.5 144 144 144 144-64.5 144-144S335.5 0 256 0zm128 320c-92.4 0-71 16-128 16-56.8 0-35.7-16-128-16C57.3 320 0 377.3 0 448v32c0 17.7 14.3 32 32 32h448c17.7 0 32-14.3 32-32v-32c0-70.7-57.3-128-128-128z"></path></svg>
                <p>Profile</p>
              </router-link>
            </div>
            <div class="option">
              <router-link class="option" :to="{name: 'Admin'}">
                <svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="user-crown" class="svg-inline--fa fa-user-crown fa-w-14 ico" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M313.6 320c-28.71 0-42.6 16-89.6 16-47.09 0-60.82-16-89.6-16C60.17 320 0 380.17 0 454.4v9.6c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48v-9.6c0-74.23-60.17-134.4-134.4-134.4zM416 464c0 8.82-7.18 16-16 16H48c-8.82 0-16-7.18-16-16v-9.6C32 397.94 77.94 352 134.4 352c19.38 0 39.33 16 89.6 16 49.4 0 70.66-16 89.6-16 56.46 0 102.4 45.94 102.4 102.4v9.6zM224 288c70.7 0 128-57.31 128-128V0l-64 32-64-32-64 32L96 0v160c0 70.69 57.31 128 128 128zM128 51.78l32 16 64-32 64 32 32-16V112H128V51.78zm0 92.22h192v16c0 52.93-43.06 96-96 96s-96-43.07-96-96v-16z"></path></svg>
                <p>Admin</p>
              </router-link>
            </div>
            <div @click="signOut" class="option">
              <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="sign-out-alt" class="svg-inline--fa fa-sign-out-alt fa-w-16 ico" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M272 112v51.6h-96c-26.5 0-48 21.5-48 48v88.6c0 26.5 21.5 48 48 48h96v51.6c0 42.6 51.7 64.2 81.9 33.9l144-143.9c18.7-18.7 18.7-49.1 0-67.9l-144-144C323.8 48 272 69.3 272 112zm192 144L320 400v-99.7H176v-88.6h144V112l144 144zM96 64h84c6.6 0 12 5.4 12 12v24c0 6.6-5.4 12-12 12H96c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h84c6.6 0 12 5.4 12 12v24c0 6.6-5.4 12-12 12H96c-53 0-96-43-96-96V160c0-53 43-96 96-96z"></path></svg>
              <p>Sign Out</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
  <svg @click="toggleMobileNav" v-show="mobile" aria-hidden="true" focusable="false" data-prefix="far" data-icon="bars" class="svg-inline--fa fa-bars fa-w-14 menu-icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M436 124H12c-6.627 0-12-5.373-12-12V80c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12z"></path></svg>
  <transition name="mobile-nav">
    <ul class="mobile-nav" v-show="mobileNav">
        <router-link class="link" to="/">Home</router-link>
        <router-link class="link" :to="{name: 'Blog'}">Blogs</router-link>
        <router-link class="link" :to="{name: 'Createpost'}">Create Post</router-link>
        <router-link class="link" v-if="!user" :to="{name: 'Login'}">Loging/Register</router-link>
    </ul>
  </transition>
</header>
</template>

<script>
import {signOut, getAuth} from 'firebase/auth'
export default {
  name: 'navigation',
  components: {},
  data() {
    return {
      profileMenu: null,
      mobile: null,
      mobileNav: null,
      windowWidth: null
    }
  },
  watch: {
    '$route' () {
      this.mobileNav = false
      this.profileMenu = false
    }
  },
  created() {
    this.checkScreenSize()
    window.addEventListener('resize', this.checkScreenSize)
  },
  computed: {
    user() {
      return this.$store.state.user
    }
  },
  methods: {
    toggleProfile(e) {
      if(e.target == this.$refs.profile) {
        this.profileMenu = !this.profileMenu
      }
    },
    checkScreenSize() {
      this.windowWidth = window.innerWidth
      if(this.windowWidth <=750) {
        this.mobile = true
        return
      }
      this.mobile = false
      this.mobileNav = false
      return
    },

    toggleMobileNav() {
      this.mobileNav = !this.mobileNav
    },

    signOut() {
      signOut(getAuth())
      window.location.reload()
    }
  }
}
</script>

<style scoped>
  header{
    background-color: #fff;
    padding: 0 25px;
    z-index: 99;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  .link{
    font-weight: 500;
    padding: 0 8px;
    transition: 0.3s color ease;
  }
  .link:hover{
    color: #1eb8b8;
  }

  nav{
    display: flex;
    padding: 25px 0;
  }

  .branding{
    display: flex;
    align-items: center;
  }

  .header{
    font-weight: 600;
    font-size: 24px;
    color: #000;
    text-decoration: none;
  }

  .nav-links{
    position: relative;
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: flex-end;
  }

  ul{
    margin-right: 32px;
  }

  .link{
    margin-right: 32px;
  }

  .link:last-child{
    margin-right: 0px;
  }

  .menu-icon{
    cursor: pointer;
    position: absolute;
    top: 32px;
    right: 25px;
    height: 25px;
    width: auto;
  }

  .mobile-nav{
    padding: 20px;
    width: 70%;
    max-width: 250px;
    display: flex;
    flex-direction: column;
    height: 100%;
    position: fixed;
    left: 0;
    background-color: #303030;
    top: 0;
  }

  .mobile-nav >.link{
    color: #fff;
    padding: 15px 0;
  }

  .profile{
    position: relative;
    cursor: pointer;
    color: #fff;
    background-color: #303030;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  @media (max-width: 750px) {
    .profile {
      position: absolute;
      right: 15%;
    }
  }

  .profile > span {
    pointer-events: none;
  }

  .profile-menu{
    position: absolute;
    top: 60px;
    right: 0;
    width: 250px;
    background-color: #303030;
    color: #fff;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  .info{
    display: flex;
    align-items: center;
    padding: 15px;
    border-bottom: 1px solid #fff;
  }

  .initials {
    position: initial;
    background-color: #fff;
    color: #303030;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  .right {
    flex: 1;
    margin-left: 24px;

  }

  p:nth-child(1){
    font-size: 14px;
  }

  p:nth-child(2), p:nth-child(3){
    font-size: 12px;
  }

  .options{
    padding: 15px;
  }
  .option{
    text-decoration: none;
    color: #fff;
    display: flex;
    align-items: center;
    margin-bottom: 12px;
  }

  .ico {
    width: 14px;
    height: auto;
  }

  .option > p{
    margin-left: 12px;
    font-size: 1rem;
    cursor: pointer;
  }

  .option:last-child {
    margin-bottom: 0;
  }
  /* animation mobilenav */
  .mobile-nav-enter-active,
  .mobile-nav-leave-active {
    transition: all 0.8s ease;
  }
  .mobile-nav-enter {
    transform: translateX(-250px);
  }
  .mobile-nav-enter-to {
    transform: translateX(0);
  }
  .mobile-nav-leave-to {
    transform: translateX(-250px);
  }

</style>