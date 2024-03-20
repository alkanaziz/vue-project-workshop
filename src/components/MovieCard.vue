<script setup>
import { state, addFavorite, removeFavorite } from '../store.js'
import { computed } from 'vue';
import Heart from '../assets/Heart.svg'
import HeartFilled from '../assets/HeartFilled.svg'

const movies = computed(() => {
    return state.data;
})

</script>

<template>
    <div v-if="movies">
        <ul>
            <li class="movie" v-for="movie in movies" :key="movie.imdbID">
                <img :src=movie.Poster alt="movie poster" width="100">
                <h3>{{ movie.Title }}</h3>
                <div class="movie-info">
                    <p><span>Type:</span> {{ movie.Type[0].toUpperCase() + movie.Type.slice(1).toLowerCase() }}</p>
                    <p><span>Year:</span> {{ movie.Year }}</p>
                    <HeartFilled class="icon" v-if="state.favoriteMovies.some(favorite => favorite.imdbID === movie.imdbID)"
                        @click="removeFavorite(movie)" />
                    <Heart class="icon" v-else @click="addFavorite(movie)" />
                </div>
            </li>
        </ul>
    </div>
</template>

<style scoped>
ul {
    list-style-type: none;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
}

li {
    width: 300px;
    margin: 10px;
    padding: 15px;
    background-color: #60686c;
    color: lightgray;
    border-radius: 25px;
    transition: 0.5s;
}

img {
    width: 250px;
    height: 350px;
    border-radius: 25px;
    transition: 0.5s;
}

span {
    font-weight: bold;
}

.movie:hover img {
    scale: 1.03;
    filter: grayscale(95%);
}

.movie:hover {
  background-color: #813434;
}

.movie-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.icon {
    transition: 0.5s;
}

.icon:hover {
    scale: 1.3;
    cursor: pointer;
}

.icon:active{
    scale: 0.9;
}
</style>