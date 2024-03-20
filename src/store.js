import { reactive, watchEffect } from "vue";

const key = import.meta.env.VITE_KEY;
const apiUrl = `https://www.omdbapi.com/?apikey=${key}`;
const localStorageKey = "favorite-movies-vue";

const state = reactive({
    data: [],
    searchTerm: '',
    favoriteMovies: []
});

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
    }
}

// Favori filmi kaldırma işlevi
function removeFavorite(movie) {
    const index = state.favoriteMovies.findIndex(favorite => favorite.imdbID === movie.imdbID);
    if (index !== -1) {
        state.favoriteMovies.splice(index, 1);
        saveToLocalStorage(state.favoriteMovies);
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
