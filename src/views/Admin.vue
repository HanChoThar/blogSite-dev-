<template>
  <div class="admin">
    <Modal modalMessage="this feature is not available right now!" v-show="modal" v-on:close-modal="addAdmin"/>
    <div class="container">
      <h2>Administration</h2>
      <div class="admin-info">
        <h2>Add Admin</h2>
        <div class="input">
          <input placeholder="Enter user email to make them an admin" type="text" id="addAdmins" v-model="adminEmail" />
        </div>
        <span>{{ this.functionMsg }}</span>
        <button @click="addAdmin" class="btn">Submit</button>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from '../components/Modal.vue'
export default {
  name: 'Admin',
  components: {
    Modal
  },
  data() {
    return {
      modal: null,
      adminEmail: '',
      functionMsg: null
    }
  },
  methods: {
    addAdmin() {
      this.modal = !this.modal
    }
  }
}
</script>

<style scoped>
  .container {
    max-width: 1000px;
    padding: 60px 25px;
  }

  h2 {
      text-align: center;
      margin-bottom: 16px;
      font-weight: 300;
      font-size: 32px;
    }

  .admin-info {
      border-radius: 8px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      padding: 32px;
      background-color: #f1f1f1;
      display: flex;
      flex-direction: column;
      max-width: 600px;
      margin: 32px auto;
  }

  span {
        font-size: 14px;
      }

  .input {
        margin: 16px 0;
  }

  label {
          font-size: 14px;
          display: block;
          padding-bottom: 6px;
        }

  input {
          width: 100%;
          border: none;
          background-color: #f2f7f6;
          padding: 8px;
          height: 50px;
  }

  input:focus{
    outline: none;
  }

  button {
        align-self: center;
      }
</style>