import { Router } from "express";
import {
  getMovies,
  getMovieById,
  createMovie,
  createMovieDetails,
  getMovieRecommendations,
  getPopularMovies,
  recommendMovie
} from "../controllers/moviesController";

const router = Router();

router.get("/", getMovies);
router.get("/popular", getPopularMovies);
router.get("/:id", getMovieById);
router.post("/", createMovie);
router.post("/:id/details", createMovieDetails);
router.get("/:id/recommendations", getMovieRecommendations);
router.put("/:id/recommend", recommendMovie); 

export default router;
