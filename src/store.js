import { reactive, watchEffect } from "vue";

const key = import.meta.env.VITE_KEY
const apiUrl = `https://www.omdbapi.com/?apikey=${key}`

const handleSearch = (movieTitle) => {
    state.searchTerm = movieTitle;
}

export const state = reactive({
    data: [],
    handleSearch: handleSearch,
    searchTerm: ''
});

watchEffect(async () => {
    const response = await fetch(`${apiUrl}&s=${state.searchTerm}`);
    const data = await response.json();
    state.data = data.Search;
})


