<template>
    <div @submit.prevent="updateTask" class="container mt-5">
        <h2>Update Task</h2>
        <form class="col-md-6 mx-auto">
            <div class="mb-3">
                <label  for="title" class="form-label">Update Title</label>
                <input v-model="title" type="text" id="title" class="form-control" required>
            </div>
            <div class="mb-3">
                <label for="description" class="form-label">Update Description</label>
                <input v-model="description" type="text" id="description" class="form-control" required>
            </div>
            <button type="submit" class="btn btn-primary w-100">Update Task</button>
        </form>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    data() {
        return {
            title: '',
            description: '',
        }
    },
    methods: {
        async updateTask() {
            try {
                const taskId = this.$route.params.id;
                const response = await axios.patch(`/tasks/${taskId}`, {
                    title: this.title,
                    description: this.description,
                })
                this.$router.push("/tasks");
                console.log('Task Updated', response.data);
            } catch (error) {
                console.error('error updating task')
            }
        }
    }
}
</script>