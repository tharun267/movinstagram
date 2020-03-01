import Axios from 'axios';
const API_KEY = '566b95a4';
const BASE_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;

export async function searchMovies(searchText) {
    try {
        const response = await Axios.get(`${BASE_URL}&s=${searchText}`);
        if (response.status === 200) {
            let data = response.data
            if (data.Response === 'True') {
                return data.Search;
            }
        } else {
            alert("API Error 1")
            return [];
        }
    } catch (error) {
        alert("API Error")
        return [];
    }
}

export async function getMovieByID(id) {
    try {
        const response = await Axios.get(`${BASE_URL}&i=${id}`);
        if (response.status === 200) {
            let data = response.data
            if (data.Response === 'True') {
                return data;
            }
        } else {
            alert("API Error 1")
            return {};
        }
    } catch (error) {
        alert("API Error")
        return {};
    }
}