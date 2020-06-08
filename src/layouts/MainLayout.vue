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

import mixinOtherUserDetails from '../mixins/mixin-other-user-details';

export default {
  computed: {
    ...mapState('store', ['userDetails']),
    title() {
      const title = {
        '/': 'SmackChat',
        '/auth': 'Login',
      };

      // This because of route params
      if (this.$route.fullPath.includes('/chat')) {
        return this.otherUserDetails.name;
      }

      return title[this.$route.fullPath];
    }
  },
  methods: {
    ...mapActions('store', ['logoutUser'])
  },
  mixins: [mixinOtherUserDetails]
}
</script>
