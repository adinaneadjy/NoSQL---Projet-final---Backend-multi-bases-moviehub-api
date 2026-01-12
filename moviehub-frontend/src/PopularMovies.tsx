import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface Movie {
  id: number;
  title: string;
}

export default function PopularMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/movies/popular`)
      .then((res) => setMovies(res.data.movies))
      .catch(() => setError("Impossible de récupérer les films populaires"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-6">Chargement...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">🔥 Films populaires</h2>
      {movies.length === 0 ? (
        <p>Aucun film populaire trouvé.</p>
      ) : (
        <ul className="space-y-2">
          {movies.map((m) => (
            <li key={m.id} className="border-b pb-2">
              <Link to={`/movies/${m.id}`} className="text-blue-600 underline">
                {m.title}
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
