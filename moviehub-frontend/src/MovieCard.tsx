export default function MovieCard({ movie, onRecommend }: { movie: any, onRecommend: (id: string) => void }) {
  return (
    <div className="border p-4 rounded shadow">
      <h2 className="text-xl font-bold">{movie.title}</h2>
      <p>{movie.description}</p>
      <p className="text-sm text-gray-500">Sortie : {movie.releaseDate}</p>
      <button
        onClick={() => onRecommend(movie._id)}
        className={`mt-3 px-3 py-1 rounded ${movie.isRecommended ? "bg-green-600 text-white" : "bg-gray-300"}`}
      >
        {movie.isRecommended ? "Recommandé" : "Recommander"}
      </button>
    </div>
  );
}
