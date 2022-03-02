<template>
<div class="reset-password">
  <Modal v-if="modalActive" :modalMessage="modalMessage" v-on:close-modal="closeModal"/>
  <Loading v-if="loading"/>
  <div class="form-wrap">
      <form class="reset">
        <p class="login-register">
          Back to
          <router-link class="router-link" :to="{ name: 'Login' }">Login</router-link>
        </p>
        <h2>Reset Password</h2>
        <p>Forgot your passowrd? Enter your email to reset it</p>
        <div class="inputs">
          <div class="input">
            <input type="text" placeholder="Email" v-model="email" />
            <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="envelope" class="svg-inline--fa fa-envelope fa-w-16 icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm0 48v40.805c-22.422 18.259-58.168 46.651-134.587 106.49-16.841 13.247-50.201 45.072-73.413 44.701-23.208.375-56.579-31.459-73.413-44.701C106.18 199.465 70.425 171.067 48 152.805V112h416zM48 400V214.398c22.914 18.251 55.409 43.862 104.938 82.646 21.857 17.205 60.134 55.186 103.062 54.955 42.717.231 80.509-37.199 103.053-54.947 49.528-38.783 82.032-64.401 104.947-82.653V400H48z"></path></svg>
          </div>
        </div>
        <button @click.prevent="reset" class="btn">Reset</button>
        <div class="angle"></div>
      </form>
      <div class="background"></div>
    </div>
</div>
</template>

<script>
import Modal from '../components/Modal.vue'
import Loading from '../components/Loading.vue'
import { sendPasswordResetEmail, getAuth } from 'firebase/auth'

export default {
  name: 'forgotpassword',
  components: {
    Modal,
    Loading
  },
  data() {
    return {
      email: '',
      modalActive: false,
      modalMessage: "",
      loading: null
    }
  },
  methods: {
    async reset() {
      this.loading = true
      try{
        const auth =await getAuth()
        await sendPasswordResetEmail(auth, this.email)
        this.loading = false
        this.modalActive = true
        this.modalMessage = 'If your account exits, you will recieve a email'
      } catch(err) {
        this.loading = false
        this.modalMessage = err.message
        this.modalActive = true
      }
    },
    closeModal() {
      this.modalActive = !this.modalActive
      this.email = ''
    },

  }
}
</script>

<style>
  .reset-password{
    position: relative;
  }

  .reset > h2{
    margin-bottom: 8px
  }

  .reset> p {
    text-align: center;
    margin-bottom: 32px;
  }
</style>