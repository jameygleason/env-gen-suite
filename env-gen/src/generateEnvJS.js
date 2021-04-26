import fs from "fs"
import { performance } from "perf_hooks"
import { print_elapsed } from "./utils/print_elapsed.js"
import { envPath, sampleEnvPath, blankEnv } from "./config.js"

export default function generateEnvJS() {
  try {
    const start = performance.now()
    if (!fs.existsSync(sampleEnvPath)) {
      fs.writeFileSync(sampleEnvPath, blankEnv, "utf-8")
    }

    if (!fs.existsSync(envPath)) {
      fs.writeFileSync(envPath, blankEnv, "utf-8")
    }

    const env = fs.readFileSync(envPath, "utf-8")
    const strRegex = /:\s*?\r?\n?("([^"]|"")*")/gi
    const sanitizedStr = env.replace(strRegex, ': ""')
    const numRegex = /:\s*?\r?\n?\d+/gi
    const sanitizedENV = sanitizedStr.replace(numRegex, ": 0")
    fs.writeFileSync(sampleEnvPath, sanitizedENV, "utf-8")

    print_elapsed(start, "[env gen] Generated ENV JS")
  } catch (err) {
    console.error(err)
  }
}
