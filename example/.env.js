const devKeys = {
  NODE_ENV: "development",
  FRONTEND_URL: "http://localhost:3000",
}

const prodKeys = {
  NODE_ENV: "production",
}

// Millisecond converter
// http://www.kylesconverter.com/time/hours-to-milliseconds
const sharedKeys = {
  PORT: 3000,
  APP_SECRET: "bringadingding",
}

export default {
  development: { ...devKeys, ...sharedKeys },
  production: { ...prodKeys, ...sharedKeys },
}
