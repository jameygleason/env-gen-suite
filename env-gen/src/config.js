import path from "path"

export const envPath = path.join(process.cwd(), ".env.js")
export const sampleEnvPath = path.join(process.cwd(), ".env.sample.js")

export const blankEnv =
  "const devKeys = {}\n\nconst prodKeys = {}\n\nconst sharedKeys = {}\n\nexport default {\n\tdevelopment: { ...devKeys, ...sharedKeys },\n\tproduction: { ...prodKeys, ...sharedKeys },\n}\n"
