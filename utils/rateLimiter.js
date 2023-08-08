const rateLimit = require('express-rate-limit')

const rateLimiter = (timeInMs, maxRequest) =>
  rateLimit({
    windowMs: timeInMs,
    max: maxRequest, // Max number of requests
    message: { error: 'Too many attempts, please try again later!' },
    standardHeaders: true,
  })

module.exports = rateLimiter
