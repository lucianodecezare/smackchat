<template>
  <q-page class="flex column">
    <!-- Offline Alert -->
    <!-- <q-banner class="bg-grey-4 text-center">
      User is offline
    </q-banner> -->
    <!-- Chat Messages -->
    <div class="q-pa-md column col justify-end">
        <q-chat-message
          class="full-width"
          v-for="message in messages"
          :sent="message.from === 'me'"
          :key="message.text"
          :name="message.from"
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
export default {
  data () {
    return {
      messages: [
        { text: 'Ohaio!', from: 'me' },
        { text: 'ORA! ORA!', from: 'them' },
        { text: 'See you next time', from: 'me' }
      ],
      newMessage: ''
    }
  },
  methods: {
    sendMessage(asd) {
      this.messages.push({ text: this.newMessage, from: 'me' });

      this.newMessage = '';
    }
  }
}
</script>

<style>
</style>