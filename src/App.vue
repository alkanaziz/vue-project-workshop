<script setup>
import Search from './components/Search.vue'
import { state } from './store.js'
import { computed } from 'vue';

const movies = computed(() => {
  return state.data;
})

</script>

<template>
  <div>
    <Search @search="state.handleSearch" />
    <div v-if="movies">
      <ul>
        <li v-for="movie in movies" :key="movie.imdbID">
          <img :src=movie.Poster alt="movie poster" width="100">
          <h3>{{ movie.Title }}</h3>
          <p>{{ movie.Type }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
ul {
  list-style-type: none;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

li {
  width: 300px;
  margin: 10px;
  padding: 15px;
  background-color: gray;
  border-radius: 25px;
}

img {
  width: 250px;
  height: 350px;
  border-radius: 25px;
}
</style>
