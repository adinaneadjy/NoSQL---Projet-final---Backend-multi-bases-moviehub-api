import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

interface Movie {
  id: number;
  title: string;
  overview?: string;
  release?: string;
  details?: {
    genres?: string[];
    duration?: string;
    cast?: string[];
    directors?: string[];
  };
}

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [recommendations, setRecommendations] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    // Charger le film
    axios
      .get(`${import.meta.env.VITE_API_URL}/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch(() => setError("Impossible de charger le film"))
      .finally(() => setLoading(false));

    // Charger les recommandations
    axios
      .get(`${import.meta.env.VITE_API_URL}/movies/${id}/recommendations`)
      .then((res) => setRecommendations(res.data.results))
      .catch(() => setError("Impossible de charger les recommandations"));
  }, [id]);

  if (loading) return <p className="p-6">Chargement...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;
  if (!movie) return <p className="p-6">Film introuvable.</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-2">{movie.title}</h2>
      <p className="mb-2">{movie.overview}</p>
      {movie.release && (
        <p className="mb-2">
          Date de sortie : {new Date(movie.release).toLocaleDateString()}
        </p>
      )}

      {movie.details && (
        <div className="mb-4">
          <h3 className="text-xl font-semibold">Détails</h3>
          <p>Genres : {movie.details.genres?.join(", ")}</p>
          <p>Durée : {movie.details.duration}</p>
          <p>Réalisateurs : {movie.details.directors?.join(", ")}</p>
          <p>Acteurs : {movie.details.cast?.join(", ")}</p>
        </div>
      )}

      <h3 className="text-xl font-semibold mb-2">Recommandations</h3>
      {recommendations.length === 0 ? (
        <p>Aucune recommandation disponible.</p>
      ) : (
        <ul className="list-disc pl-6 space-y-1">
          {recommendations.map((rec) => (
            <li key={rec.id}>
              <Link to={`/movies/${rec.id}`} className="text-blue-600 underline">
                {rec.title}
              </Link>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6">
        <Link to="/" className="text-blue-600 underline">
          ← Retour à la liste des films
        </Link>
      </div>
    </div>
  );
}
