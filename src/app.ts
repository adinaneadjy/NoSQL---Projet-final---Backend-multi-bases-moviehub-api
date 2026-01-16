import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import moviesRouter from "./routes/movies";

const app = express();

app.use(cors({
  origin: "http://localhost:5173"
}));

app.use(bodyParser.json());

app.get("/", (req, res) => res.send("moviehub-api"));

app.use("/movies", moviesRouter);

export default app;
