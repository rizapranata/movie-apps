import axios from "axios";
import { useEffect, useState } from "react";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "66de686f9a677bd824aca318c28fd50d";

export const useGetMovies = (url, triger = true, page) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!triger) return;
    const source = axios.CancelToken.source();

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}${url}`, {
          cancelToken: source.token,
          params: {
            api_key: API_KEY,
            loading: "en-US",
            page: page,
          },
        });
        setData(response.data);
        setError(null);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request canceled", error.message);
        } else {
          setError(error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      source.cancel("Operation canceled by the user.");
    };
  }, [url, triger]);

  return { data, error, loading };
};
