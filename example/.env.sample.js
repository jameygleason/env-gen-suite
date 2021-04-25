const devKeys = {
  NODE_ENV: "",
  FRONTEND_URL: "",
}

const prodKeys = {
  NODE_ENV: "",
}

// Millisecond converter
// http://www.kylesconverter.com/time/hours-to-milliseconds
const sharedKeys = {
  PORT: 3000,
  APP_SECRET: "",
}

export default {
  development: { ...devKeys, ...sharedKeys },
  production: { ...prodKeys, ...sharedKeys },
}
