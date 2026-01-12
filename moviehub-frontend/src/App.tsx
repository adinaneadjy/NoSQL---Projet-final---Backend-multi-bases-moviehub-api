import { Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import MovieDetails from "./MovieDetails";
import PopularMovies from "./PopularMovies";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Header */}
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">🎬 MovieHub</h1>
        <nav className="space-x-4">
          <Link to="/" className="text-gray-700 hover:text-blue-600">Accueil</Link>
          <Link to="/popular" className="text-gray-700 hover:text-blue-600">Populaires</Link>
        </nav>
      </header>

      {/* Contenu principal */}
      <main className="max-w-4xl mx-auto p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies/:id" element={<MovieDetails />} />
          <Route path="/popular" element={<PopularMovies />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
