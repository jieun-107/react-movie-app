import { Dispatch, SetStateAction, useEffect, useState } from "react";
import MovieHeader from "./MovieHeader";
import MovieList from "./MovieList";
import MovieMain from "./MovieMain";
import { axiosInstance } from "../../api/axios";
import { useInView } from "react-intersection-observer";

export default function Movie() {
  const [nowData, setNowData] = useState<MovieType[]>([]);
  const [nowLoading, setNowLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [nowError, setNowError] = useState<Error | null>(null);

  const { ref } = useInView({
    threshold: 0.5,
    rootMargin: "200px",
    onChange: (inView: boolean) => {
      if (inView && !nowLoading && hasMore) {
        setPage((prev) => prev + 1);
      }
    },
  });
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

      // await new Promise((resolve) =>
      //   setTimeout(
      //     resolve,
      //     [3000, 4000, 5000, 6000, 7000][Math.floor(Math.random() * 5)],
      //   ),
      // );
      try {
        const {
          data: { results, total_pages },
        } = await axiosInstance.get(`/${endpoint}?page=${page}`, { signal });
        setHasMore(page < total_pages);
        if (page === 1) setData(results);
        else setData((prev) => [...prev, ...results]);
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
  }, [page]);

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
      <div ref={ref}></div>
    </>
  );
}
