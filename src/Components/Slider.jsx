import React, { useEffect, useState } from 'react'
import GlobalApi from '../Services/GlobalApi';
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

function Slider() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchMovie = async () => {
      const data = await GlobalApi.getTopRated();
      setMovies(data.results);
    };

    const fetchGenres = async () => {
      const data = await GlobalApi.getGenres();
      setGenres(data.genres);
    };

    fetchMovie();
    fetchGenres();
  }, []);

  const initGenre = (genresIds) => {
    return genres.filter((genre) => genresIds.includes(genre.id));;
  }

  const handleScroll = (event) => {
    const index = Math.round(event.target.scrollLeft / event.target.clientWidth);
    setActiveIndex(index);
  };

  return (
    <div className="bg-secondary relative w-full mx-auto px-4 pt-[70px]">
      <div
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none scroll-smooth"
        onScroll={handleScroll}
        style={{ scrollBehavior: "smooth" }}
      >
        {movies.map((movie) => {
          const year = movie.release_date.split("-")[0];
          return (
            <div key={movie.id} className="snap-center flex-shrink-0 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3">
              <div className="flex flex-col md:flex-row justify-between items-center text-white p-6 lg:p-10 md:p-10 rounded-lg">
                <img
                  src={IMAGE_BASE_URL + movie.backdrop_path}
                  className="w-full sm:w-64 md:w-48 lg:w-60 xl:w-72 h-40 sm:h-56 md:h-64 lg:h-80 xl:h-96 object-cover"
                />

                <div className="bg-black my-4 min-w-60 p-4 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3">
                  <span className="text-yellow-400 font-bold">★ {movie.vote_average}</span>
                  <p className="text-gray-400 text-sm">{year} • {initGenre(movie.genre_ids).map((data) => data.name).join(", ")}</p>
                  <h2 className="text-lg font-semibold">{movie.title}</h2>
                  <p className="text-gray-400 text-xs pt-1 line-clamp-5">{movie.overview}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dots Navigation */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {movies.slice(0, 7).map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full transition-all ${activeIndex === index ? "bg-red-500 w-8" : "bg-gray-500"
              }`}
            onClick={() =>
              document.querySelector(".overflow-x-auto").scrollTo({ left: index * window.innerWidth, behavior: "smooth" })
            }
          />
        ))}
      </div>
    </div>

  )
}

export default Slider
