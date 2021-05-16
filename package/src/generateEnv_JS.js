import fs from "fs"
import { performance } from "perf_hooks"
import { print_elapsed } from "./utils/print_elapsed.js"
import { envJSPath, sampleEnvJSPath, blankEnv } from "./config.js"

export default function generateEnv_JS() {
  try {
    const start = performance.now()
    if (!fs.existsSync(sampleEnvJSPath)) {
      fs.writeFileSync(sampleEnvJSPath, blankEnv, "utf-8")
    }

    if (!fs.existsSync(envJSPath)) {
      fs.writeFileSync(envJSPath, blankEnv, "utf-8")
    }

    const env = fs.readFileSync(envJSPath, "utf-8")
    const strRegex = /:\s*?\r?\n?("([^"]|"")*")/gi
    const sanitizedStr = env.replace(strRegex, ': ""')
    const numRegex = /:\s*?\r?\n?\d+/gi
    const sanitizedENV = sanitizedStr.replace(numRegex, ": 0")
    fs.writeFileSync(sampleEnvJSPath, sanitizedENV, "utf-8")

    print_elapsed(start, "[env_gen] Generated ENV JS")
  } catch (err) {
    console.error(err)
  }
}
