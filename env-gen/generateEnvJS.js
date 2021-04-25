import fs from "fs"
import path from "path"
import { performance } from "perf_hooks"
import { print_elapsed } from "./utils/print_elapsed.js"

export default function generate_Env_JS() {
  try {
    const start = performance.now()
    const envPath = path.join(process.cwd(), ".env.js")
    const sampleEnvPath = path.join(process.cwd(), ".env.sample.js")

    if (!fs.existsSync(sampleEnvPath)) {
      fs.writeFileSync(
        sampleEnvPath,
        "const devKeys = {}\n\nconst prodKeys = {}\n\nconst sharedKeys = {}\n\nexport default {\n\tdevelopment: { ...devKeys, ...sharedKeys },\n\tproduction: { ...prodKeys, ...sharedKeys },\n}\n",
        "utf-8",
      )
    }

    if (!fs.existsSync(envPath)) {
      fs.writeFileSync(
        envPath,
        "const devKeys = {}\n\nconst prodKeys = {}\n\nconst sharedKeys = {}\n\nexport default {\n\tdevelopment: { ...devKeys, ...sharedKeys },\n\tproduction: { ...prodKeys, ...sharedKeys },\n}\n",
        "utf-8",
      )
    }

    const env = fs.readFileSync(envPath, "utf-8")
    const regex = /:\s+".+"/gi
    const sanitizedENV = env.replace(regex, ': ""')
    fs.writeFileSync(sampleEnvPath, sanitizedENV, "utf-8")

    print_elapsed(start, "[generate env] Generated ENV JS")
  } catch (err) {
    console.error(err)
  }
}
