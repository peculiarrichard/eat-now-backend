// import dotenv from "dotenv";
// import { createClient } from "redis";

// dotenv.config();

// const redisClient = createClient({
//   url: process.env.REDIS_URL,
// });

// export const connectToRedis = async () => {
//   try {
//     await redisClient.connect();
//     redisClient.on("connect", () => {
//       console.log("Connected to Redis");
//     });

//     redisClient.on("error", (err) => {
//       console.log("Redis Client Error", err);
//     });
//   } catch (error) {
//     console.error("Failed to connect to Redis", error);
//     process.exit(1);
//   }
// };

// export const hasKey = async (key: string) => {
//   try {
//     const reply = await redisClient.exists(key);
//     return reply === 1;
//   } catch (err) {
//     console.error("Redis has error:", err);
//     throw err;
//   }
// };

// export const getKey = async (key: string) => {
//   try {
//     const reply = await redisClient.get(key);
//     return reply;
//   } catch (err) {
//     console.error("Redis get error:", err);
//     throw err;
//   }
// };

// export const setKey = async (key: string, value: string, ttl = 3600) => {
//   try {
//     const reply = await redisClient.setEx(key, ttl, JSON.stringify(value));
//     return reply;
//   } catch (err) {
//     console.error("Redis set error:", err);
//     throw err;
//   }
// };
