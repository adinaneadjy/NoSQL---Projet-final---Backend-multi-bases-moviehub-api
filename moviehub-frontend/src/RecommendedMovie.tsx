export default function RecommendedMovie({ movie }: { movie: any }) {
  return (
    <div className="mb-6 p-4 bg-yellow-100 rounded shadow">
      <h2 className="text-lg font-bold">🎯 Film recommandé</h2>
      <p className="text-xl">{movie.title}</p>
      <p>{movie.description}</p>
      <p className="text-sm text-gray-600">Sortie : {movie.releaseDate}</p>
    </div>
  );
}
