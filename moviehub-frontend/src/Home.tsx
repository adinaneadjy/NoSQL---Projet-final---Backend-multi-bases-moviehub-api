import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface Movie {
  id: number;
  title: string;
  overview?: string;
  release?: string;
  isRecommended?: boolean;
}

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [overview, setOverview] = useState("");
  const [release, setRelease] = useState("");

  // Charger les films
  const fetchMovies = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/movies`);
      setMovies(res.data);
      setError("");
    } catch {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  // Ajouter un film
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/movies`, {
        title,
        overview,
        release,
      });

      setTitle("");
      setOverview("");
      setRelease("");

      fetchMovies();
    } catch {
      setError(" Impossible de créer le film");
    }
  };

  // Recommander un film
  const handleRecommend = async (id: number) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/movies/${id}/recommend`);
      fetchMovies();
    } catch {
      setError(" Impossible de définir la recommandation");
    }
  };

  const recommended = movies.find((m) => m.isRecommended);

  return (
    <div className="p-6 font-sans">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">🎬 MovieHub — Films</h1>

      {/* Film recommandé */}
      {recommended && (
        <div className="bg-yellow-100 p-4 rounded shadow mb-8">
          <h2 className="text-xl font-bold">🎯 Film recommandé</h2>
          <p className="text-lg">{recommended.title}</p>
          <p>{recommended.overview}</p>
          <p className="text-sm text-gray-600">
            Sortie : {new Date(recommended.release!).toLocaleDateString()}
          </p>
        </div>
      )}

      {/* Formulaire */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded p-6 mb-8 space-y-4"
      >
        <h2 className="text-xl font-semibold">Ajouter un film</h2>

        <div>
          <label className="block font-medium">Titre :</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="border p-2 w-full max-w-md rounded focus:ring focus:ring-blue-300"
          />
        </div>

        <div>
          <label className="block font-medium">Résumé :</label>
          <textarea
            value={overview}
            onChange={(e) => setOverview(e.target.value)}
            className="border p-2 w-full max-w-md rounded focus:ring focus:ring-blue-300"
          />
        </div>

        <div>
          <label className="block font-medium">Date de sortie :</label>
          <input
            type="date"
            value={release}
            onChange={(e) => setRelease(e.target.value)}
            className="border p-2 rounded focus:ring focus:ring-blue-300"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Ajouter
        </button>
      </form>

      {/* Liste des films */}
      <h2 className="text-xl font-semibold mb-4">Liste des films</h2>

      {loading && <p className="text-gray-600">⏳ Chargement...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && movies.length === 0 && <p>Aucun film trouvé.</p>}

      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {movies.map((movie) => (
          <li
            key={movie.id}
            className="bg-white shadow rounded p-4 hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold text-blue-600">{movie.title}</h3>

            {movie.release && (
              <p className="text-sm text-gray-500">
                Sortie : {new Date(movie.release).toLocaleDateString()}
              </p>
            )}

            <p className="text-gray-700 mt-2">{movie.overview}</p>

            <Link
              to={`/movies/${movie.id}`}
              className="inline-block mt-4 text-blue-600 underline hover:text-blue-800"
            >
              Voir détails →
            </Link>

            {/* Bouton recommander */}
            <button
              onClick={() => handleRecommend(movie.id)}
              className={`mt-3 px-3 py-1 rounded ${
                movie.isRecommended
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
               {movie.isRecommended ? "Recommandé" : "Recommander"}
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <Link
          to="/popular"
          className="text-blue-600 underline hover:text-blue-800"
        >
           Voir les films populaires
        </Link>
      </div>
    </div>
  );
}
