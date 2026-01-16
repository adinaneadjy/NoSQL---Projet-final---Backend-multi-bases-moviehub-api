import { Request, Response } from "express";
import { prisma } from "../db/prismaClient";
import { MovieDetails } from "../models/movieDetails";
import { redis } from "../db/redisClient";
import { getRecommendationsByMetadata } from "../services/recommendationService";


export const getMovies = async (req: Request, res: Response) => {
  try {
    const movies = await prisma.movie.findMany({ take: 100 });
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch movies" });
  }
};


export const getPopularMovies = async (req: Request, res: Response) => {
  try {
    const z = await redis.zrevrange("movies:views", 0, 9, "WITHSCORES");

    const ranking: { id: number; views: number }[] = [];

    for (let i = 0; i < z.length; i += 2) {
      ranking.push({
        id: Number(z[i]),
        views: Number(z[i + 1])
      });
    }

    const movies = await prisma.movie.findMany({
      where: { id: { in: ranking.map(r => r.id) } }
    });

    res.json({ ranking, movies });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch popular movies" });
  }
};


export const getMovieById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const cacheKey = `movie:${id}`;

    const cached = await redis.get(cacheKey);
    if (cached) {
      await redis.zincrby("movies:views", 1, `${id}`);
      return res.json(JSON.parse(cached));
    }

    const movie = await prisma.movie.findUnique({ where: { id } });
    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    const details = await MovieDetails.findOne({ movieId: id }).lean();
    const result = { ...movie, details };

    await redis.set(cacheKey, JSON.stringify(result), "EX", 60);
    await redis.zincrby("movies:views", 1, `${id}`);

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch movie" });
  }
};


export const createMovie = async (req: Request, res: Response) => {
  try {
    const { title, overview, release } = req.body;

    const movie = await prisma.movie.create({
      data: {
        title,
        overview,
        release: release ? new Date(release) : undefined
      }
    });

    res.status(201).json(movie);
  } catch (err) {
    res.status(500).json({ error: "Failed to create movie" });
  }
};


export const createMovieDetails = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    await MovieDetails.findOneAndUpdate(
      { movieId: id },
      { movieId: id, ...req.body },
      { upsert: true, new: true }
    );

    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to create movie details" });
  }
};


export const getMovieRecommendations = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const results = await getRecommendationsByMetadata(id);

    res.json({
      source: "MongoDB (metadata-based)",
      count: results.length,
      results
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch recommendations" });
  }
};


export const recommendMovie = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    
    await prisma.movie.updateMany({
      data: { isRecommended: false }
    });

    
    const updated = await prisma.movie.update({
      where: { id },
      data: { isRecommended: true }
    });

    res.json(updated);
  } catch (err) {
    console.error("Erreur recommandation :", err);
    res.status(500).json({ error: "Impossible de définir la recommandation" });
  }
};
