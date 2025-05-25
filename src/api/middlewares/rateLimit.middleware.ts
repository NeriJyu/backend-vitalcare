import rateLimit from "express-rate-limit";

export const globalRateLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 150,
  message: "Too many requests, please try again later.",
});
