import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3"
const API_KEY = "66de686f9a677bd824aca318c28fd50d"

const getGenres = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/genre/movie/list`, {
      params: {
        api_key: API_KEY,
        language: "en-US"
      }
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching movie genre:", error);
    return null;
  }
}

const getDiscover = async (page) => {
  try {
    const response = await axios.get(`${BASE_URL}/discover/movie`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
        page: page
      }
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching movie discover:", error);
    return null;
  }
}

const getTopRated = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/top_rated`, {
      params: {
        api_key: API_KEY,
        language: "en-US"
      }
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching movie top_rated:", error);
    return null;
  }
}

const getMovieDetail = async (movieId) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return null;
  }
};

export default {
  getTopRated,
  getDiscover,
  getMovieDetail,
  getGenres
}