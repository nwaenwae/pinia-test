<template>
  <form @submit.prevent="handleSubmit">
    <input type="text" placeholder="I need to..." v-model="newTask">
    <button>Add</button>
  </form>
</template>

<script setup>
import {ref} from "vue";
import {useTaskStore} from "@/stores/TaskStore.js";

const newTask = ref('')
const taskStore = useTaskStore()

const handleSubmit = () => {
  if(newTask.value.length >0) {
    taskStore.addTask({
      title: newTask.value,
      isFav: false,
      id: Math.floor(Math.random()*10000)
    })
    newTask.value = ''
  }
}
</script>