import MovieCard from "./MovieCard";

export default function MovieList({ movies, onRecommend }: { movies: any[], onRecommend: (id: string) => void }) {
  return (
    <div className="grid grid-cols-2 gap-4 mt-6">
      {movies.map((m) => (
        <MovieCard key={m._id} movie={m} onRecommend={onRecommend} />
      ))}
    </div>
  );
}
