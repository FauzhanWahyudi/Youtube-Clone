const Redis = require("ioredis");
const redis = new Redis({
  port: 19599, // Redis port
  host: "redis-19599.c334.asia-southeast2-1.gce.redns.redis-cloud.com", // Redis host
  password: process.env.Redis_SECRET,
  db: 0,
});
module.exports = redis;
