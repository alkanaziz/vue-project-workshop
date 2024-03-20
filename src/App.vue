<script setup>
import FavoriteMovieCard from './components/FavoriteMovieCard.vue';
import Search from './components/Search.vue'
import NotFound from './components/NotFound.vue'
import { ref, computed } from 'vue';

const routes = {
  '/': Search,
  '/favorites': FavoriteMovieCard
}

const currentPath = ref(window.location.hash)

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/'] || NotFound
})

</script>

<template>
  <nav>
    <a href="#/">Search</a>
    <a href="#/favorites">Favorite Movies</a>
  </nav>
  <component :is="currentView" />
</template>

<style scoped>

a {
  text-decoration: none;
  color: black;
  border-radius: 5px;
  background-color: lightgray;
  padding: 3px 10px;
  margin: 5px;
  font-size: 20px;
  transition: 0.3s;
}

a:hover {
  color: lightgray;
  background-color: #232424;
}

nav {
  width: 100vw;
  height: 50px;
  background: linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(128,128,128,1) 25%, rgba(128,128,128,1) 75%, rgba(255,255,255,1) 100%);
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>