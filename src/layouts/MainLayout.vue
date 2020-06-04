<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <!-- Button Back -->
        <q-btn
          class="absolute-left q-pl-sm"
          dense
          flat
          icon="arrow_back"
          label="Back"
          v-go-back.single
          v-if="$route.fullPath.includes('/chat')"
        />
        <!-- Title -->
        <q-toolbar-title class="absolute-center">
          {{ title }}
        </q-toolbar-title>
        <!-- Button Login -->
        <q-btn
          class="absolute-right q-pr-md"
          dense
          flat
          icon="account_circle"
          label="Login"
          no-caps
          to="/auth"
          v-if="!userDetails.userId"
        />
        <!-- Button Logout -->
        <q-btn
          class="absolute-right q-pr-md"
          dense
          flat
          icon="account_circle"
          label="Logout"
          no-caps
          v-else
          @click="logoutUser"
        />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapActions, mapState } from 'vuex';

import EssentialLink from 'components/EssentialLink';

export default {
  components: { EssentialLink },
  computed: {
    ...mapState('store', ['userDetails']),
    title() {
      const title = {
        '/': 'SmackChat',
        '/auth': 'Login',
        '/chat': 'Chat',
      }

      return title[this.$route.fullPath];
    }
  },
  methods: {
    ...mapActions('store', ['logoutUser'])
  }
}
</script>
