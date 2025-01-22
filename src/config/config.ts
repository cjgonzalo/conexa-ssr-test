export default {
  port: process.env.APP_PORT || 3000,
  jwtPass: process.env.JWT_PASS,
  mongodb: {
    host: process.env.MONGODB_HOST || "localhost",
    user: process.env.MONGODB_USER || null,
    password: process.env.MONGODB_PASS || null,
    database: process.env.MONGODB_DATABASE || '',
    port: process.env.MONGODB_PORT || 27017
  }
}