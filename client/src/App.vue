<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <router-link to="/" class="navbar-brand">Task Tracker</router-link>
        <div class="collapse navbar-collapse">
          <ul class="navbar-nav ms-auto">
            <li v-if="!isAuthenticated" class="nav-item">
              <router-link to="/login" class="nav-link">Login</router-link>
            </li>
            <li v-if="!isAuthenticated" class="nav-item">
              <router-link to="/signup" class="nav-link">Signup</router-link>
            </li>
            <li v-if="isAuthenticated" class="nav-item">
              <button @click="logout" class="nav-link">Logout</button>
            </li>
          </ul>
        </div> 
      </div>
    </nav>

    <router-view />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'App',
  computed: {
    ...mapGetters( ['isAuthenticated']),
  },
  created() {
    this.$store.dispatch('initAuth')
  },
  methods: {
    async logout() {
      await this.$store.dispatch('logout');
    },
    ...mapActions( ['logout']),
  }
 
}
</script>

<style>

</style>
