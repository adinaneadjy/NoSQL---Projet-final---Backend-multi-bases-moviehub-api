import dotenv from "dotenv";
dotenv.config();

import express from "express";
import bodyParser from "body-parser";
import moviesRouter from "./routes/movies";
import { connectMongo } from "./db/mongoClient";

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => res.send("moviehub-api"));

app.use("/movies", moviesRouter);

connectMongo(process.env.MONGO_URL || "mongodb://localhost:27017/moviehub")
  .then(() => console.log("Mongo connected"))
  .catch((e) => console.error("Mongo error", e));

export default app;
