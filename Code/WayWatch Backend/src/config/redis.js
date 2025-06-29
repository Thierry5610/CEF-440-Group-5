// config/redis.js
import { Redis } from '@upstash/redis';

// Initialize the Redis client using environment variables.
// The '@upstash/redis' client is designed for their REST API,
// so it expects a REST URL (https://...) and a REST Token.
const redisClient = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

// The @upstash/redis client handles connections internally
// and does not expose a direct 'connect()' or 'on("error")'
// event listener like traditional TCP-based Redis clients.
// Error handling should typically be done with try/catch blocks
// around specific Redis operations where you anticipate issues.

console.log('Upstash Redis client initialized. Awaiting connections via REST API.');

export default redisClient;