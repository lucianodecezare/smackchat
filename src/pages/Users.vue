<template>
  <q-page class="flex q-pa-md">
    <q-list class="full-width" separator>
      <q-item 
        clickable
        to="/chat"
        v-for="user in users"
        v-ripple
        :key="user.id">
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">
            {{ user.name[0] }}
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ user.name }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-badge :color="user.online ? 'light-green-6' : 'grey-5'">
            {{ user.online ? 'Online' : 'Offline' }}
          </q-badge>
        </q-item-section>
      </q-item>

    </q-list>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      users: [{
        id: 1,
        name: 'Beni',
        online: true
      },{
        id: 2,
        name: 'Joe',
        online: true
      },{
        id: 3,
        name: 'Kim',
        online: false
      }]
    }
  }
}
</script>

<style>
</style>