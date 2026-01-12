import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { connectMongo } from "./db/mongoClient";

const PORT = process.env.PORT || 3000;

connectMongo(process.env.MONGO_URL || "mongodb://localhost:27017/moviehub")
  .then(() => {
    console.log("Mongo connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((e) => console.error("Mongo error", e));
