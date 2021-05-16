// Test
// Number 02398
// String "The string below me gets replaced because the reges matches colon string string (\: \" \") pattern"
// String: "I'm get striped away"

const devKeys = {
  NODE_ENV: "development",
  FRONTEND_URL: "http://localhost:3001",
}

const prodKeys = {
  NODE_ENV: "production",
}

const sharedKeys = {
  PORT: 3001,
  APP_SECRET:
    "bringadingdingdingdingdingdingdingdingdingdingdingdingdingdingding",
  "123NUM_TEST": "test",
}

export default {
  development: { ...devKeys, ...sharedKeys },
  production: { ...prodKeys, ...sharedKeys },
}
