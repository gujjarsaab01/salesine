import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import 'vue3-toastify/dist/index.css';
import store from "./store/auth";




const app = createApp(App);

axios.defaults.baseURL = "http://localhost:3000"; // Replace with your Nest.js backend URL


// Configure the base URL for Axios requests
app.use(router);
app.use(store);

app.mount("#app");