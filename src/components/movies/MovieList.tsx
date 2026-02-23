import MovieError from "./MovieError";
import MovieListItem from "./MovieListItem";
import MovieLoader from "./MovieLoader";

export default function MovieList({
  title,
  movies,
  loading,
  error,
}: {
  title: string;
  movies: MovieType[];
  loading: boolean;
  error: Error | null;
}) {
  return (
    <>
      <article className="bg-black px-4 pt-4 xs:px-0">
        <section className="container mx-auto py-8 text-white">
          <span className="text-yellow-600">ONLINE STREAMING</span>
          <h2 className="text-[36px] font-bold mb-8">{title}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:px-0">
            {/* 아이템 1개 */}
            {movies && movies.map((movie) => <MovieListItem key={movie.id} {...movie} />)}
            {/* loading... */}
            {loading && <MovieLoader />}
          </div>
          {/* error */}
          {error && <MovieError error={error}/>}
        </section>
      </article>
    </>
  );
}
