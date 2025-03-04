import React, { useEffect, useState } from "react";
import GlobalApi from "../Services/GlobalApi";
import { useParams } from "react-router-dom";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

function ListMovie() {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);
  const [movies, setMovies] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getMovies();
    getGenres();
  }, []);

  const getMovies = () => {
    GlobalApi.getDiscover.then(res => {
      setMovies(res.data.results);
    })
  }

  const getGenres = () => {
    GlobalApi.getGenres.then(res => {
      setGenres(res.data.genres);
    })
  }

  useEffect(() => {
    handleGenreChange(id);
  }, [id]);

  // Handle genre selection
  const handleGenreChange = (genreId) => {
    setSelectedGenres((prevGenres) =>
      prevGenres.includes(genreId)
        ? prevGenres.filter((id) => id !== genreId)
        : [...prevGenres, genreId]
    );
  };

  console.log("selectedGenres:", selectedGenres);


  // Filter movies based on selected genres
  const filteredMovies =
    selectedGenres.length > 0
      ? movies.filter((movie) =>
        movie.genre_ids.some((id) => selectedGenres.includes(id))
      )
      : movies;

  return (
    <div className="bg-secondary text-white min-h-screen px-4 md:px-10 lg:px-20 xl:px-60 pt-20 pb-5">
      <div className="py-6">
        <div className="w-20 h-1 bg-red-500 mt-1"></div>
        <h2 className="text-3xl md:text-4xl text-white">Movies {id}</h2>
      </div>

      {/* Container */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar - Filter */}
        <div className="w-full md:w-1/5 h-1/2 bg-gray-900 p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-4 ml-2">Sorted Result By</h2>
          <hr className="border-t border-gray-200 my-2" />
          <h2 className="text-lg font-semibold mb-4 ml-2">Popularity</h2>
          <hr className="border-t border-gray-200 my-2" />
          <h2 className="text-lg font-semibold mb-4 ml-2">Genres</h2>
          <hr className="border-t border-gray-200 my-3" />
          {genres.map((genre) => (
            <label key={JSON.stringify(genre.id)} className="flex items-center flex-row-reverse justify-between mb-2 ml-2">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-500"
                checked={selectedGenres.includes(genre.id)}
                onChange={() => handleGenreChange(genre.id)}
              />
              <span>{genre.name}</span>
            </label>
          ))}
        </div>

        {/* Movie List */}
        <div className="w-full md:w-4/5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredMovies.map((movie) => (
            <div key={JSON.stringify(movie.id)} className="relative">
              <img
                src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-[300px] sm:h-[350px] md:h-[383px] object-cover shadow-md"
              />
              <span className="absolute top-0 right-0 bg-green-600 text-white text-xs font-bold px-2 py-1">
                {movie.vote_average.toFixed(1)}
              </span>
              <h3 className="text-sm font-semibold mt-2">{movie.title}</h3>
              <p className="text-xs text-gray-400">{movie.release_date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>

  );
}

export default ListMovie;
