<template>
  <q-form @submit="submitForm">
    <q-input
      class="q-mb-md"
      label="Name"
      outlined
      v-if="tab === 'register'"
      v-model="formData.name"
    />
    <q-input 
      class="q-mb-md"
      label="Email"
      outlined
      type="email"
      v-model="formData.email"
    />
    <q-input 
      class="q-mb-md"
      label="Password"
      outlined
      type="password"
      v-model="formData.password"
    />
    <div class="row">
      <q-space />
      <q-btn
        color="primary"
        type="submit"
        :label="tab"
        :loading="tab === 'login' ? loadingLogin : loadingRegister"
      />
    </div>
  </q-form>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      formData: {
        name: '',
        email: '',
        password: ''
      },
      loadingLogin: false,
      loadingRegister: false
    };
  },
  methods: {
    ...mapActions('store', ['loginUser', 'registerUser']),
    async login() {
      this.loadingLogin = true;

      await this.loginUser(this.formData);

      this.loadingLogin = false;
    },
    async register() {
      this.loadingRegister = true;

      await this.registerUser(this.formData);

      this.loadingRegister = false;
    },
    // #TODO: Notification message for errors and success
    submitForm() {
      if (this.tab === 'login') {
        this.login();
      } else {
        this.register();
      }
    }
  },
  props: ['tab']
};
</script>
