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
      }
    };
  },
  methods: {
    ...mapActions('store', ['loginUser', 'registerUser']),
    async login() {
      this.$q.loading.show({ message: 'Authenticating user' });

      await this.loginUser(this.formData);

      this.$q.loading.hide();
    },
    async register() {
      this.$q.loading.show({ message: 'Registering user' });

      await this.registerUser(this.formData);

      this.$q.loading.hide();
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
