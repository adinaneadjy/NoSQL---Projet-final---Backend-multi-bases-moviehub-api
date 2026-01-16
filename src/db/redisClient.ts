import Redis from "ioredis";

export const redis = new Redis({
  host: process.env.REDIS_HOST || "redis",
  port: 6379,
  retryStrategy: (times) => Math.min(times * 50, 2000)
});

redis.on("connect", () => {
  console.log("Redis connected");
});

redis.on("error", (err) => {
  console.error("Redis error:", err);
});

console.log("redisClient.ts loaded");
