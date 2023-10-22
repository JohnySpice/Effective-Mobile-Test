import Redis from "ioredis";
import { create } from '../services/user-history.service.js';
import 'dotenv/config.js';

export function initializeRedis() {
  const redis = new Redis(parseInt(process.env.REDIS_PORT), process.env.REDIS_HOST);

  redis.subscribe("user-changes", (err, count) => {
    if (err) {
      console.error("Failed to subscribe: %s", err.message);
    } else {
      console.log(
        `Subscribed successfully! This client is currently subscribed to ${count} channels.`
      );
    }
  });

  redis.on("message", async (_, message) => {
    try {
      const changes = JSON.parse(message);
      await create(changes);
    } catch (err) {
      console.error("Error during writting changes", err.message);
    }
  });
}