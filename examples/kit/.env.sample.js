// Test
// Number 02398
// String "The string below me gets replaced because the reges matches colon string string (\: \" \") pattern"
// String: ""

const devKeys = {
  NODE_ENV: "",
  FRONTEND_URL: "",
  TEST: ""
}

const prodKeys = {
  NODE_ENV: "",
}

const sharedKeys = {
  PORT: 0,
  APP_SECRET: "",
  "123NUM_TEST": "",
}

export default {
  development: { ...devKeys, ...sharedKeys },
  production: { ...prodKeys, ...sharedKeys },
}
