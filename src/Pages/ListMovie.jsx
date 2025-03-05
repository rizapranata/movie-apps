import React, { useEffect, useState } from "react";
import GlobalApi from "../Services/GlobalApi";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import useMovieStore from "../Services/store";
import Loading from "../Components/Loading";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

function ListMovie() {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [sortBy, setSortBy] = useState("popularity-ascending");
  const [genres, setGenres] = useState([]);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const { onChangePosition } = useMovieStore();

  const { id } = useParams();

  useEffect(() => {
    const fetchMovie = async () => {
      const data = await GlobalApi.getDiscover(page);
      setMovies(data.results);
      setLoading(false);
    };

    const fetchGenres = async () => {
      const data = await GlobalApi.getGenres();
      setGenres(data.genres);
      setLoading(false);
    };

    fetchMovie();
    fetchGenres();
  }, [page]);

  useEffect(() => {
    handleGenreChange(id);
  }, [id]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  }

  const initGenre = (genresIds) => {
    return genres.filter((genre) => genresIds.includes(genre.id));;
  }

  useEffect(() => {
    const handleBackButton = (event) => {
      event.preventDefault();
      onChangePosition(false);
    };
    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, [onChangePosition]);

  const handleGenreChange = (genreId) => {
    setSelectedGenres((prevGenres) =>
      prevGenres.includes(genreId)
        ? prevGenres.filter((id) => id !== genreId)
        : [...prevGenres, genreId]
    );
  };

  const filteredMovies =
    selectedGenres.length > 0
      ? movies.filter((movie) =>
        movie.genre_ids.some((id) => selectedGenres.includes(id))
      )
      : movies;

  const sortedMovies = [...filteredMovies].sort((a, b) => {
    switch (sortBy) {
      case "popularity-ascending":
        return a.popularity - b.popularity;
      case "popularity-descending":
        return b.popularity - a.popularity;
      case "releasedate-ascending":
        return a.release_date - b.release_date;
      case "releasedate-descending":
        return b.release_date - a.release_date
      case "rating-ascending":
        return a.vote_average - b.vote_average;
      case "rating-descending":
        return b.vote_average - a.vote_average
      default:
        return a.popularity - b.popularity;
    }
  });

  if (loading) {
    return <Loading />
  }

  return (
    <div className="bg-secondary text-white min-h-screen md:px-10 lg:px-20 xl:px-80 px-4 pt-20 pb-5 relative">
      <div className="py-10">
        <div className="w-20 h-1 bg-red-500 mt-1"></div>
        <h2 className="text-3xl md:text-4xl text-white">Movies {id}</h2>
      </div>

      {/* Container */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar - Filter */}
        <div className="w-full md:w-1/5 h-1/2 bg-gradient-to-b from-gray-900 to-gray-800 p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-4 ml-2">Sorted Result By</h2>
          <hr className="border-t border-gray-600 my-2" />
          <select
            className="w-full p-2 my-3 bg-gray-700 text-white rounded"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="popularity-ascending">Popularity Ascending</option>
            <option value="popularity-descending">Popularity Descending</option>
            <option value="releasedate-ascending">Release Date Ascending</option>
            <option value="releasedate-descending">Release Date Descending</option>
            <option value="rating-ascending">Rating Ascending</option>
            <option value="rating-descending">Rating Descending</option>
          </select>
          <hr className="border-t border-gray-600 my-2" />
          <h2 className="text-lg font-semibold mb-4 ml-2">Genres</h2>
          <hr className="border-t border-gray-600 my-3" />
          {genres.map((genre) => (
            <label key={JSON.stringify(genre.id)} className="flex items-center flex-row-reverse justify-between mb-2 ml-2">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-red-300 rounded border-gray-300 bg-gray-400"
                checked={selectedGenres.includes(genre.id)}
                onChange={() => handleGenreChange(genre.id)}
              />
              <span>{genre.name}</span>
            </label>
          ))}
        </div>

        {/* Movie List */}
        <div className="w-full md:w-4/5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-40 relative">
          {sortedMovies.map((movie) => {
            const year = movie.release_date.split('-')[0];

            return (
              <div>
                <Link key={movie.id} to={`/detail/movie/${movie.id}`} onClick={() => onChangePosition(true)} className="relative group cursor-pointer">
                  <img
                    src={IMAGE_BASE_URL + movie.backdrop_path}
                    className="shadow-md lg:w-full h-[350px] object-cover"
                  />

                  <span className="absolute top-0 right-0 bg-green-600 text-xs font-bold text-white px-2 py-1">
                    {movie.vote_average}
                  </span>

                  <div className="absolute inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-yellow-400 text-lg font-bold flex items-center">
                      ★ {movie.vote_average}
                    </span>
                    <p className="text-gray-300 text-sm mt-1">{initGenre(movie.genre_ids).map(data => data.name).join(", ")}</p>
                    <button
                      className="mt-3 bg-red-500 text-white px-4 py-1 rounded-full text-sm font-semibold"
                      onClick={(e) => e.preventDefault()}
                    >
                      VIEW
                    </button>
                  </div>

                </Link>
                <div className="mt-2">
                  <h3 className="text-base font-semibold">{movie.title}</h3>
                  <p className="text-gray-400 text-sm">{year}</p>
                </div>
              </div>
            );
          })}

          <button
            className="absolute left-1/2 transform -translate-x-1/2 bottom-[40px] bg-red-600 text-white font-semibold py-2 px-6 rounded-full shadow-lg hover:bg-red-700 transition duration-300"
            onClick={handleLoadMore}
          >
            Load More
          </button>
        </div>
      </div>
    </div>
  );
}

export default ListMovie;
