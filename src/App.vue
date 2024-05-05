<template>
  <main>
    <header>
      <img src="./assets/pinia-logo.svg" alt="pinia logo">
      <h1>Pinia Tasks</h1>
    </header>
    <nav class="filter">
        <button @click="filter = 'all'">All tasks</button>
        <button @click="filter = 'favs'">Fav tasks</button>
    </nav>
    <div class="task-list" v-if="filter === 'all'">
      <p>You have {{taskStore.totalCount}} tasks left to do</p>
      <div v-for="task in taskStore.tasks" :key="task.id">
        <TaskDetails :task="task"/>
      </div>
    </div>
    <div class="task-list" v-if="filter === 'favs'">
      <p>You have {{taskStore.favCount}} tasks left to do</p>
      <div v-for="task in taskStore.favs" :key="task.id">
        <TaskDetails :task="task"/>
      </div>
    </div>
  </main>
</template>

<script setup>
import {ref} from "vue";
import {useTaskStore} from "@/stores/TaskStore.js";
import TaskDetails from "@/components/TaskDetails.vue";

const filter = ref('all')
const taskStore = useTaskStore()
</script>

