import { Suspense, use, useMemo } from "react";
import { axiosInstance } from "../../api/axios";
import MovieHeader from "./MovieHeader";
import MovieList from "./MovieList";
import MovieMain from "./MovieMain";
import MovieLoader from "./MovieLoader";
import { ErrorBoundary } from "react-error-boundary";
import MovieError from "./MovieError";
import { useMovieStore } from "../../store/movieStore";

async function fetchCategory(endpoint: string, page: number) {
  await new Promise((resolve) =>
    setTimeout(
      resolve,
      [3000, 4000, 5000, 6000, 7000][Math.floor(Math.random() * 5)],
    ),
  ); // 3~7초 사이의 랜덤한 지연 시간
  const { data } = await axiosInstance.get(`/${endpoint}?page=${page}`);
  return data; // Promise 객체의 resolve 값이 results 배열이 됨
}

export default function Movie() {
  const page = useMovieStore((state) => state.page);
  const fetchCategoryMemo = useMemo(
    () => fetchCategory(`now_playing`, page),
    [page],
  );
  return (
    <>
      <MovieHeader />
      <MovieMain />
      <ErrorBoundary fallback={<MovieError title="Now Playing" />}>
        <Suspense fallback={<MovieLoader title="Now Playing" />}>
          <MovieList title="Now Playing" promise={fetchCategoryMemo} />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
