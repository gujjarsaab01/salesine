<!-- TaskList.vue -->
<template>
  <div class="mt-5">
    <!-- <h2>Task List</h2> -->
    <div class="text-center" v-if="tasks.length === 0">
      <strong style="letter-spacing: 2px"
        >OOPS! You Don't Have Any Task.</strong
      >
    </div>
    <ul v-else class="ps-0 d-flex row justify-content-center flex-wrap">
      <li
        v-for="task in tasks"
        :key="task._id"
        :class="{ 'completed-task': task.completed }"
        class="card w-75 rounded-2 bg-info-subtle mb-2 m-2 list"
      >
        <div class="card-body ms-4">
          <h3 class="text-capitalize">{{ task.title }}</h3>
          <p
            class="card-subtitle text-wrap"
            :class="{ 'completed-description': task.completed }"
          >
            {{ task.description }}
          </p>
        </div>
        <div class="w-100 d-flex justify-content-evenly mb-3">
          <button v-if="!task.completed" class="btn btn-success w-25">
            <router-link
              class="update-task-link card-link"
              :to="{ name: 'TaskUpdate', params: { id: task._id } }"
              >Update</router-link
            >
          </button>
          <button
            v-if="!task.completed"
            class="btn btn-secondary w-25"
            @click="completeTask(task._id)"
          >
            Mark Completed
          </button>
          <button
          :class="{'btn-del': task.completed}"
            class="btn btn-danger w-25 card-link "
            @click="deleteTask(task._id)"
          >
            Delete
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "TaskListView",
  props: {
    tasks: {
      type: Array,
      required: true,
    },
  },
  methods: {
    async deleteTask(taskId) {
      try {
        const isAuthenticated = this.$store.getters.isAuthenticated;
        if (!isAuthenticated) {
          console.error("User not authenticated");
          return;
        }

        // Include the authentication token in the request headers
        const token = this.$store.getters.getUser.token;
        const headers = { Authorization: `Bearer ${token}` };
        const confirmed = await Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        });
        if (confirmed.isConfirmed) {
          const response = await axios.delete(`/tasks/${taskId}`, { headers });
          this.$emit("taskDeleted", taskId);
          await Swal.fire({
            title: "Deleted!",
            text: "Your task has been deleted.",
            icon: "success",
            timer: 3000,
            timerProgressBar: true,
          });
          window.location.reload();
          console.log("Task Deleted Successfully", response.data);
        } else {
          return;
        }

        // Emit  event to notify TaskManager about the deleted task
      } catch (error) {
        console.error("Error deleting task:", error.response.data);
      }
    },
    async completeTask(taskId) {
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

        const marked = await Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Mark It DONE!",
        });

        if (marked.isConfirmed) {
          const response = await axios.patch(
            `/tasks/complete/${taskId}`,
            { id: taskId, completed: true },
            { headers }
          );
          this.$emit("Task Completed", taskId);
          console.log("Task Marked As Completed", response.data);
          window.location.reload();

          await Swal.fire({
            title: "Task Completed!",
            text: "Your Task Has been Marked As Completed!",
            icon: "success",
            timer: 3000,
            timerProgressBar: true,
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Your Task Has Not been Marked As Completed!",
          icon: "error",
          timer: 3000,
          timerProgressBar: true,
        });
        console.error("Error completing task:", error.response.data);
      }
    },
  },
};
</script>

<style scoped>
h2 {
  margin-top: 2em;
  text-align: center;
}
.update-task-link {
  color: azure;
  text-decoration: none;

  cursor: pointer;
}

.description {
  white-space: pre-line;
}

.completed-task {
  /* color: #6c757d; */
  background-color:dimgray !important;
  color: aliceblue;
  text-decoration: line-through;
}

.completed-description{
  color:beige;
}

.btn-del{
  text-decoration: none !important;
}


@media (max-width: 500) {
  body {
    font-size: 15px;
    margin: 0;
    padding: 0;
  }
}
</style>
