<script setup>
import { getCurrentInstance } from 'vue';
import { state } from '../store.js'


const instance = getCurrentInstance();

const search = () => {
  instance.emit('search', state.searchTerm)
}

</script>
<template>
  <div>
    <h1>Search Movies</h1>
    <form @submit.prevent="search">
      <input v-model="state.searchTerm" type="text" placeholder="Enter movie title...">
    </form>
  </div>
</template>

<style scoped>
input {
  width: 80vh;
  height: 25px;
  border-radius: 6px;
  border: none;
  margin-bottom: 10px;
}

button {
  color: white;
  background-color: black;
  padding: 4px;
  border-radius: 6px;
  cursor: pointer;
}
</style>