import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GlobalApi from '../Services/GlobalApi';
import Loading from '../Components/Loading';
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

const reviews = [
  {
    "id": 162439,
    "name": "Crooked Highway",
    "date": "December 18, 2024",
    "votes": "8.789",
    "comment": "If you enjoy reading my Spoiler-Free reviews, please follow my blog @ https://www.msbreviews.com The superhero genre has been growing exponentially during the last decade, so it's bizarre to go through an entire year with only Birds of Prey and The New Mutants instead of literally dozens of films from both Marvel and DC. Thankfully, Warner Bros. decided to release Wonder Woman 1984 before the year's end, but not without a catch. Most people will only have the possibility of watching one of the few blockbusters of 2020 through HBO Max, a streaming service only "
  },
  {
    "id": 194232,
    "name": "Apple Studios",
    "date": "July 12, 2024",
    "votes": "8.789",
    "comment": "If you enjoy reading my Spoiler-Free reviews, please follow my blog @ https://www.msbreviews.com The superhero genre has been growing exponentially during the last decade, so it's bizarre to go through an entire year with only Birds of Prey and The New Mutants instead of literally dozens of films from both Marvel and DC. Thankfully, Warner Bros. decided to release Wonder Woman 1984 before the year's end, but not without a catch. Most people will only have the possibility of watching one of the few blockbusters of 2020 through HBO Max, a streaming service only "
  }
]

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      const data = await GlobalApi.getMovieDetail(id);
      setMovie(data);
      setLoading(false);
    };

    fetchMovie();
  }, [id]);

  if (loading) {
    return <Loading />
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen pt-10 md:px-10 lg:px-20 xl:px-60">
      {/* Hero Section */}
      <div
        className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] bg-cover bg-center"
        style={{ backgroundImage: `url(${IMAGE_BASE_URL + movie.backdrop_path})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-9 flex items-center h-full px-6 md:px-20">
          <img
            src={IMAGE_BASE_URL + movie.poster_path}
            alt="Movie Poster"
            className="w-48 md:w-60 lg:w-72 rounded-lg shadow-lg"
          />
          <div className="ml-6 md:ml-10">
            <h2 className="text-2xl md:text-4xl font-bold">{movie.title} ({new Date(movie.release_date).getFullYear()})</h2>
            <p className="text-gray-300 italic text-lg">{movie.tagline}</p>
            <p className="text-gray-400 text-sm md:text-base">
              {movie.genres.map(genre => genre.name).join(", ")}
            </p>
            <div className="flex items-center space-x-4 mt-4 text-sm md:text-base">
              <span className="flex items-center text-yellow-400 font-bold text-xl">⭐ {movie.vote_average}</span>
              <span className="text-gray-300">{movie.vote_count} Votes</span>
              <span className="text-gray-300">| {movie.status} |</span>
              <span className="text-gray-300">Language: {movie.original_language.toUpperCase()} |</span>
              <span className="text-gray-300">Budget: ${movie.budget.toLocaleString()} |</span>
            </div>
          </div>
        </div>
      </div>

      {/* Overview Section */}
      <div className="px-6 md:px-20 py-10">
        <h3 className="text-xl font-bold text-red-500">OVERVIEW</h3>
        <p className="text-gray-300 mt-2">{movie.overview}</p>
      </div>

      {/* Reviews Section */}
      <div className="px-6 md:px-20 pb-10">
        <h3 className="text-xl font-bold text-red-500">REVIEWS</h3>
        <div className="mt-4 grid md:grid-cols-2 gap-6">
          {reviews.map((review, index) => (
            <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-md">
              <div className="flex justify-between">
                <span className="text-white font-bold">{review.name}</span>
                <span className="text-yellow-400 font-bold">⭐ {review.votes}</span>
              </div>
              <p className="text-gray-400 text-sm mt-1">{review.date}</p>
              {review.comment && <p className="text-gray-300 mt-2">{review.comment}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
