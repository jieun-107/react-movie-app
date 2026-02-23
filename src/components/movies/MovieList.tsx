import { use } from "react";
import MovieListItem from "./MovieListItem";
import { useMovieStore } from "../../store/movieStore";

export default function MovieList({
  title,
  promise,
}: {
  title: string;
  promise: Promise<{results: MovieType[]; total_pages: number}>;
}) {
  const page = useMovieStore((state) => state.page);
  const setPage = useMovieStore((state) => state.setPage);
  const {results: movies, total_pages} = use(promise);
  const pageUp = () => {
    const currentPage = Math.min(page + 1, total_pages); // 최대 페이지는 10으로 제한
    setPage(currentPage);
  };
  const pageDown = () => {
    const currentPage = Math.max(1, page - 1); // 최소 페이지는 1로 제한
    setPage(currentPage);
  };

  return (
    <>
      <article className="bg-black px-4 pt-4 xs:px-0">
        <section className="container mx-auto py-8 text-white">
          <span className="text-yellow-600">ONLINE STREAMING</span>
          <h2 className="text-[36px] font-bold mb-8">{title}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:px-0">
            {/* 아이템 1개 */}
            {movies &&
              movies.map((movie) => (
                <MovieListItem key={movie.id} {...movie} />
              ))}
          </div>
          {/* 이전, 다음 버튼 */}
          <div className="grid grid-cols-2 gap-4 my-8">
            <button className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors" 
              onClick={pageDown}
            >
              Prev
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors" 
              onClick={pageUp}
            >
              Next
            </button>
          </div>
        </section>
      </article>
    </>
  );
}
