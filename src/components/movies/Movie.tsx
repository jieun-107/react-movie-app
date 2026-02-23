import { Dispatch, SetStateAction, useEffect, useState } from "react";
import MovieHeader from "./MovieHeader";
import MovieList from "./MovieList";
import MovieMain from "./MovieMain";
import { axiosInstance } from "../../api/axios";

export default function Movie() {
  const [nowData, setNowData] = useState<MovieType[]>([]);
  const [nowLoading, setNowLoading] = useState(false);
  const [nowError, setNowError] = useState<Error | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    const fetchCategory = async (
      endpoint: string,
      setData: Dispatch<SetStateAction<MovieType[]>>,
      setLoading: Dispatch<SetStateAction<boolean>>,
      setError: Dispatch<SetStateAction<Error | null>>,
    ) => {
      setLoading(true);
      setError(null);
      try {
        const {
          data: { results },
        } = await axiosInstance.get(`/${endpoint}`, { signal });
        console.log(results);
        setData(results);
      } catch (e) {
        if (e instanceof Error && e.name !== "CanceledError") {
          setError(e);
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    fetchCategory("now_playing", setNowData, setNowLoading, setNowError);

    return () => controller.abort();
  }, []);

  return (
    <>
      <MovieHeader />
      <MovieMain />
      <MovieList
        title="Now Playing"
        movies={nowData}
        loading={nowLoading}
        error={nowError}
      />
    </>
  );
}
