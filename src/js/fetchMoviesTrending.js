const axios = require('axios').default;
import { ApiKey } from "./refs";

const URL = 'https://api.themoviedb.org/3/trending';

let mediaType = 'all';
let timeWindow = 'day';


export async function fetchMoviesTrending (page) {
    
try{
    const responce = await axios.get(`${URL}/${mediaType}/${timeWindow}?api_key=${ApiKey}&page=${page}`);
    return responce.data;
} catch (error) {
    console.error(error);
}

}