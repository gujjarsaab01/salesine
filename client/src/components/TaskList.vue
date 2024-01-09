<!-- TaskList.vue -->
<template>
  <div>
    <h2>Task List</h2>
    <div v-if="tasks.length === 0">No tasks available.</div>
    <ul v-else>
      <li v-for="task in tasks" :key="task._id">{{ task.title }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'TaskListView',
  props: {
    tasks: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
h2 {
  margin-top: 2em;
  text-align: center;
}
</style>
