<template>
  <main>
    <header>
      <img src="./assets/pinia-logo.svg" alt="pinia logo">
      <h1>Pinia Tasks</h1>
    </header>
    <div class="new-task-form">
      <TaskForm/>
    </div>
    <nav class="filter">
        <button @click="filter = 'all'">All tasks</button>
        <button @click="filter = 'favs'">Fav tasks</button>
    </nav>

    <div class="loading" v-if="loading">
      Loading tasks...
    </div>
    <div class="task-list" v-if="filter === 'all'">
      <p>You have {{totalCount}} tasks left to do</p>
      <div v-for="task in tasks" :key="task.id">
        <TaskDetails :task="task"/>
      </div>
    </div>
    <div class="task-list" v-if="filter === 'favs'">
      <p>You have {{favCount}} tasks left to do</p>
      <div v-for="task in favs" :key="task.id">
        <TaskDetails :task="task"/>
      </div>
    </div>
    <button @click="taskStore.$reset">Reset State</button>
  </main>
</template>

<script setup>
import {ref} from "vue";
import {useTaskStore} from "@/stores/TaskStore.js";
import {storeToRefs} from "pinia";
import TaskDetails from "@/components/TaskDetails.vue";
import TaskForm from "@/components/TaskForm.vue";

const filter = ref('all')
const taskStore = useTaskStore()
const {tasks, loading, favs, totalCount, favCount} = storeToRefs(taskStore)

taskStore.getTasks()
</script>

