<template>
  <div @submit.prevent="updateTask" class="container mt-5">
    <h2>Update Task</h2>
    <form class="col-md-6 mx-auto">
      <div class="mb-3">
        <label for="title" class="form-label">Update Title</label>
        <input
          v-model="title"
          type="text"
          id="title"
          class="form-control"
          required
        />
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Update Description</label>
        <input
          v-model="description"
          type="text"
          id="description"
          class="form-control"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary w-100">Update Task</button>
    </form>
  </div>
</template>
<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      title: "",
      description: "",
    };
  },
  methods: {
    async updateTask() {
      try {
        const isAuthenticated = this.$store.getters.isAuthenticated;
        if (!isAuthenticated) {
          Swal.fire({
            title: "UnAuthorized!",
            text: "User Not Authenticated.",
            icon: "success",
            timer: 3000,
            timerProgressBar: true,
          });

          return;
        }
        const token = this.$store.getters.getUser.token;
        const headers = { Authorization: `Bearer ${token}` };

        const taskId = this.$route.params.id;
        const response = await axios.patch(`/tasks/${taskId}`, {
          title: this.title,
          description: this.description,
        }, {headers});
        Swal.fire({
          title: "Task Updated Successfully !",
          timerProgressBar: toolbar,
          icon: "success",
          timer: 3000,
        });
        this.$router.push("/tasks");
        console.log("Task Updated", response.data);
      } catch (error) {
        Swal.fire({
          title: "Error Updating Task",
          timerProgressBar: toolbar,
          icon: "error",
          timer: 3000,
        });
        console.error("error updating task");
      }
    },
  },
};
</script>
