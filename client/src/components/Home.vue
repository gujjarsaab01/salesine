<template>
    <div class="container ">
      <h2 class="mt-5">Welcome To Task Tracker</h2>
      <router-link to="/login" class="btn btn-primary">Login</router-link> |
      <router-link to="/signup" class="btn btn-primary">Signup</router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: "HomeView",
  };
  </script>
  <style scoped>
  .container {
    
    text-align: center;
  }
  </style>
  