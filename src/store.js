import { reactive, watchEffect } from "vue";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const key = import.meta.env.VITE_KEY;
const apiUrl = `https://www.omdbapi.com/?apikey=${key}`;
const localStorageKey = "favorite-movies-vue";

const state = reactive({
    data: [],
    searchTerm: '',
    favoriteMovies: []
});

// Vue-Tostify Package
const removeNotify = () => {
    toast("The movie has been removed...", {
        "theme": "dark",
        "type": "error",
        "dangerouslyHTMLString": true,
        autoClose: 1000
    });
}

const addNotify = () => {
    toast("The movie added to favorites", {
        "theme": "dark",
        "type": "success",
        "autoClose": 1000,
        "transition": "slide",
        "dangerouslyHTMLString": true
    });
}


// Favori filmleri localStorage'den al
function getFavoriteFromLocal() {
    const localFavoriteMovies = JSON.parse(localStorage.getItem(localStorageKey)) || [];
    state.favoriteMovies = localFavoriteMovies;
}

// Favori filmleri localStorage'e kaydet
function saveToLocalStorage(items) {
    localStorage.setItem(localStorageKey, JSON.stringify(items));
}

// Favori film ekleme işlevi
function addFavorite(movie) {
    if (!state.favoriteMovies.some(favorite => favorite.imdbID === movie.imdbID)) {
        state.favoriteMovies.push(movie);
        saveToLocalStorage(state.favoriteMovies);
        addNotify();
    }
}

// Favori filmi kaldırma işlevi
function removeFavorite(movie) {
    const index = state.favoriteMovies.findIndex(favorite => favorite.imdbID === movie.imdbID);
    if (index !== -1) {
        state.favoriteMovies.splice(index, 1);
        saveToLocalStorage(state.favoriteMovies);
        removeNotify();
    }
}

// Arama terimi değiştiğinde API'den veri al
watchEffect(async () => {
    const response = await fetch(`${apiUrl}&s=${state.searchTerm}`);
    const data = await response.json();
    state.data = data.Search || [];
});

// Favori filmleri localStorage'den al
getFavoriteFromLocal();

export { state, addFavorite, removeFavorite };
