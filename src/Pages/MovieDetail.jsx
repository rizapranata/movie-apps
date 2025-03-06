import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import GlobalApi from '../Services/GlobalApi';
import Loading from '../Components/Loading';
import star from '../assets/Images/star-icon.png';
import useMovieStore from '../Services/store';
import { useLocation } from "react-router-dom";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

const reviews = [
  {
    "id": 162439,
    "name": "Crooked Highway",
    "date": "December 18, 2024",
    "votes": "8.3",
    "comment": "If you enjoy reading my Spoiler-Free reviews, please follow my blog @ https://www.msbreviews.com The superhero genre has been growing exponentially during the last decade, so it's bizarre to go through an entire year with only Birds of Prey and The New Mutants instead of literally dozens of films from both Marvel and DC. Thankfully, Warner Bros. decided to release Wonder Woman 1984 before the year's end, but not without a catch. Most people will only have the possibility of watching one of the few blockbusters of 2020 through HBO Max, a streaming service only "
  },
  {
    "id": 194232,
    "name": "Apple Studios",
    "date": "July 12, 2024",
    "votes": "7.7",
    "comment": "If you enjoy reading my Spoiler-Free reviews, please follow my blog @ https://www.msbreviews.com The superhero genre has been growing exponentially during the last decade, so it's bizarre to go through an entire year with only Birds of Prey and The New Mutants instead of literally dozens of films from both Marvel and DC. Thankfully, Warner Bros. decided to release Wonder Woman 1984 before the year's end, but not without a catch. Most people will only have the possibility of watching one of the few blockbusters of 2020 through HBO Max, a streaming service only "
  }
]

const MovieDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const { onChangePosition } = useMovieStore();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location.pathname]);

  useEffect(() => {
    const fetchMovie = async () => {
      const data = await GlobalApi.getMovieDetail(id);
      setMovie(data);
      setLoading(false);
    };

    const fetchMovies = async () => {
      const data = await GlobalApi.getDiscover();
      setMovies(data.results);
      setLoading(false);
    };

    fetchMovie();
    fetchMovies();
  }, [id, onChangePosition]);

  useEffect(() => {
    const handleBackButton = (event) => {
      event.preventDefault();
      onChangePosition(false);
    };
    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, [onChangePosition]);

  if (loading) {
    return <Loading />
  }

  return (
    <div className="bg-secondary text-white min-h-screen md:px-10 lg:px-20 xl:px-60">
      <div
        className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] bg-cover bg-center"
        style={{ backgroundImage: `url(${IMAGE_BASE_URL + movie?.backdrop_path})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-9 flex items-center h-full px-6 md:px-20 xl:pt-80 md:pt-80 sm:pt-60">
          <img
            src={IMAGE_BASE_URL + movie?.poster_path}
            alt="Movie Poster"
            className="w-48 md:w-60 lg:w-72 shadow-lg"
          />
          <div className="ml-6 md:ml-10">
            <h2 className="text-2xl md:text-4xl font-bold">{movie?.title} ({new Date(movie?.release_date).getFullYear()})</h2>
            <p className="text-gray-300 italic text-lg">{movie?.tagline}</p>
            <p className="text-gray-400 text-sm md:text-base">
              {movie?.genres.map(genre => genre.name).join(", ")}
            </p>
            <div className="flex items-center space-x-4 mt-4 text-sm md:text-base">
              <span className="flex items-center text-white font-bold text-2xl">⭐ {movie?.vote_average}</span>
              <span className="text-gray-300">{movie?.vote_count} Votes</span>
              <span className="text-gray-300">| {movie?.status} |</span>
              <span className="text-gray-300 hidden sm:block">Language: {movie?.original_language.toUpperCase()} |</span>
              <span className="text-gray-300">Budget: ${movie?.budget.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white pt-20">
        {/* Overview Section */}
        <div className="px-6 md:px-20 py-10">
          <h3 className="text-xl font-bold text-red-500">OVERVIEW</h3>
          <p className="text-gray-900 mt-2">{movie?.overview}</p>
        </div>

        {/* Reviews Section */}
        <div className="px-6 md:px-20 pb-10">
          <h3 className="text-xl font-bold text-red-500">REVIEWS</h3>
          <div className="mt-4 grid md:grid-cols-2 gap-6">
            {reviews.map(review => (
              <div key={review.id} className="bg-gray-50 p-4 rounded-lg shadow-md">
                <div className="flex justify-between">
                  <div className="flex">
                    <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                    <div>
                      <span className="text-gray-900 font-bold">{review.name}</span>
                      <p className="text-gray-900 text-sm mt-1">{review.date}</p>
                    </div>
                  </div>
                  <div className="flex bg-gray-200 rounded-md p-1">
                    <img src={star} alt="" className="md:w-5 md:h-5 sm:w-5 sm:h-5 lg:h-5 lg:w-5 p-1" />
                    <span className="text-gray-900 text-2xl font-bold pr-3">{review.votes}</span>
                  </div>
                </div>
                {review.comment && <p className="text-gray-900 mt-2">{review.comment}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="p-10">
        <div className="text-lg pl-[55px]">RECOMENDATION MOVIES</div>
        <div className="flex mx-auto pt-10">
          <div className="flex-none w-14"></div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-8">
            {movies.slice(0, 5).map((movie) => {
              const year = movie?.release_date.split('-')[0];
              return (
                <div>
                  <Link key={movie.id} className="relative group cursor-pointer">
                    <img
                      src={IMAGE_BASE_URL + movie?.backdrop_path}
                      className="shadow-md lg:w-full h-[350px] object-cover"
                    />

                    <span className="absolute top-0 right-0 bg-green-600 text-xs font-bold text-white px-2 py-1">
                      {movie?.vote_average}
                    </span>

                    <div className="absolute inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-yellow-400 text-lg font-bold flex items-center">
                        ★ {movie?.vote_average}
                      </span>
                      {/* <p className="text-gray-300 text-sm mt-1">{initGenre(movie.genre_ids).map(data => data.name).join(", ")}</p> */}
                      {/* <button
                        className="mt-3 bg-red-500 text-white px-4 py-1 rounded-full text-sm font-semibold"
                        onClick={(e) => e.preventDefault()} // Hindari reload saat klik tombol
                      >
                        VIEW
                      </button> */}
                    </div>
                  </Link>
                  <div key={movie?.title} className="mt-2">
                    <h3 className="text-base font-semibold">{movie?.title}</h3>
                    <p className="text-gray-400 text-sm">{year}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex-none w-14"></div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
