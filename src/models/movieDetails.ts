import mongoose from "mongoose";

const movieDetailsSchema = new mongoose.Schema(
  {
    movieId: { type: Number, unique: true, index: true },

    cast: { type: [String], default: [] },
    directors: { type: [String], default: [] },
    languages: { type: [String], default: [] },
    countries: { type: [String], default: [] },
    genres: { type: [String], default: [] },

    images: { type: [String], default: [] },
    duration: { type: String }
  },
  { timestamps: true }
);

export const MovieDetails = mongoose.model(
  "MovieDetails",
  movieDetailsSchema
);
