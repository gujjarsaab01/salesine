<template>
    <div class="container  ">
      <h2 class="mt-5 mb-5">Welcome To Task Tracker</h2>
      <div>

        <router-link to="/login" class="btn btn-primary w-25">Login</router-link> |
        <router-link to="/signup" class="btn btn-success w-25">Signup</router-link>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "HomeView",
  };
  </script>
  <style scoped>
  .container {
    display: flex ;
    flex-direction: column;
    justify-content: center;
    height: 70vh;
    text-align: center;
  }
  </style>
  