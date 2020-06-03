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
export default {
  data() {
    return {
      formData: {
        name: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    submitForm() {
      if (this.tab === 'login') {
        console.log('login');
      } else {
        console.log('register');
      }
    }
  },
  props: ['tab']
}
</script>