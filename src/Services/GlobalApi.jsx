import axios from "axios";

const movieBaseUrl = "https://api.themoviedb.org/3"
const apiKey = "66de686f9a677bd824aca318c28fd50d"

const getTopRated = axios.get(movieBaseUrl+"/movie/top_rated?api_key="+apiKey);
const getDiscover = axios.get(movieBaseUrl+"/discover/movie?api_key="+apiKey);
const getGenres = axios.get(movieBaseUrl+"/genre/movie/list?api_key="+apiKey);
const getMovieDetail = axios.get(movieBaseUrl+"/genre/movie/movie_id?api_key="+apiKey);

export default {
  getTopRated,
  getDiscover,
  getMovieDetail,
  getGenres
}