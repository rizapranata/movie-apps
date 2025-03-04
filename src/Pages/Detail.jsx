import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GlobalApi from '../Services/GlobalApi';

function Detail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      const data = await GlobalApi.getMovieDetail(id);
      setMovie(data);
    };

    fetchMovie();
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  console.log("detail:", movie);
  
  
  return (
    <div>

    </div>
  )
}

export default Detail
