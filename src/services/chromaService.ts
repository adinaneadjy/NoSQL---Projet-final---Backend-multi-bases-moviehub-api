/**
 * ChromaDB désactivé
 * Implémentation factice pour compatibilité TypeScript
 */

export async function indexMovieText(
  movieId: number,
  text: string
): Promise<void> {
  // Chroma désactivé → no-op
  return;
}

export async function getSimilarMovies(
  movieId: number
): Promise<number[]> {
  // Pas de similarité vectorielle
  return [];
}
