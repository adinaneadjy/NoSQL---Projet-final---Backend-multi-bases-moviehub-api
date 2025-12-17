import { MovieDetails } from "../models/movieDetails";

export async function getRecommendationsByMetadata(
  movieId: number,
  limit = 5
) {
  const base = await MovieDetails.findOne({ movieId }).lean();

  if (!base || !base.genres || base.genres.length === 0) {
    return [];
  }

  return MovieDetails.find({
    movieId: { $ne: movieId },
    genres: { $in: base.genres }
  })
    .limit(limit)
    .lean();
}
