<template>
  <q-page class="flex column">
    <!-- Offline Alert -->
    <q-banner class="bg-grey-4 text-center" v-if="!otherUserDetails.online">
      {{ otherUserDetails.name }} is offline
    </q-banner>
    <!-- Chat Messages -->
    <div class="q-pa-md column col justify-end">
        <q-chat-message
          class="full-width"
          v-for="(message, key) in messages"
          :sent="message.from === 'me'"
          :key="key"
          :name="message.from === 'me' ? 'Me' : otherUserDetails.name"
          :text="[message.text]"
        />
    </div>
    <!-- Message -->
    <q-footer elevated>
      <q-toolbar>
        <q-form class="full-width row wrap" @submit="sendMessage">
          <!-- Input Message -->
          <q-input
            bg-color="white"
            class="col-grow"
            dense
            label="Message"
            outlined
            rounded
            v-model="newMessage"
          />
          <!-- Button Send -->
          <q-btn
            color="white"
            class="q-ml-sm"
            dense
            flat
            icon="send"
            round
            type="submit"
          />
        </q-form>
      </q-toolbar>
    </q-footer>
  </q-page>
</template>

<script>
import { mapActions, mapState } from 'vuex';

import mixinOtherUserDetails from '../mixins/mixin-other-user-details';

export default {
  computed: {
    ...mapState('store', ['messages', 'userDetails'])
  },
  data () {
    return {
      newMessage: '',
      otherUserId: this.$route.params.otherUserId
    }
  },
  destroyed() {
    this.firebaseStopGettingMessages();
  },
  methods: {
    ...mapActions(
      'store',
      [
        'firebaseGetMessages',
        'firebaseSendMessage',
        'firebaseStopGettingMessages'
      ]
    ),
    sendMessage(asd) {
      this.firebaseSendMessage(
        {
          message: {
            from: 'me',
            text: this.newMessage
          },
          otherUserId: this.otherUserId
        }
      );

      this.newMessage = '';
    }
  },
  mixins: [mixinOtherUserDetails],
  mounted() {
    this.$q.loading.show({ message: 'Recovering messages' });

    this.firebaseGetMessages(this.otherUserId);

    this.$q.loading.hide();
  }
}
</script>

<style>
</style>