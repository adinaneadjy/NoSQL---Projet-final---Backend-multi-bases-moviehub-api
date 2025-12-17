import mongoose from "mongoose";
import { MovieDetails } from "../src/models/movieDetails";

const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/moviehub";

async function main() {
  await mongoose.connect(MONGO_URL);
  await MovieDetails.create({
    movieId: 1,
    cast: ["Actor One", "Actor Two"],
    directors: ["Director A"],
    languages: ["English"],
    countries: ["USA"],
    genres: ["Drama"],
    images: [],
    duration: "1h 40m"
  });
  await MovieDetails.create({
    movieId: 2,
    cast: ["Actor X", "Actor Y"],
    directors: ["Director B"],
    genres: ["Action"],
    duration: "2h"
  });
  console.log("Mongo seed done");
  process.exit(0);
}

main().catch(e => { console.error(e); process.exit(1); });
