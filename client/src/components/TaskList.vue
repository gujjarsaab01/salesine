<!-- TaskList.vue -->
<template>
  <div>
    <h2>Task List</h2>
    <div v-if="tasks.length === 0">No tasks available.</div>
    <ol v-else>
      <li
        v-for="task in tasks"
        :key="task._id"
        class="d-flex justify-content-between align-items-center mb-3"
      >
        <div>{{ task.title }} - {{ task.description }}</div>
        <div>

          <button class="btn btn-success">
            <router-link
              class="update-task-link"
              :to="{ name: 'TaskUpdate', params: { id: task._id } }"
              >Update</router-link
            >
          </button>
          <button class="btn btn-danger ms-2" @click="deleteTask(task._id)">Delete</button>
        </div>
      </li>
    </ol>
  </div>
</template>

<script>
import axios from 'axios';

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
        const confirmed = confirm("Permanently Delete Task ?");
        if (!confirmed) return;

        const response = await axios.delete(`/tasks/${taskId}`, {headers});

        console.log('Task Deleted Successfully', response.data);

         // Emit an event to notify the parent (TaskManager) about the deleted task
         this.$emit('taskDeleted', taskId);
      } catch (error) {
        console.error('Error deleting task:', error.response.data);
      }
    }
  }
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


</style>
