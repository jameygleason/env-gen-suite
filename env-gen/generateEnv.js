import fs from "fs"
import path from "path"
import { performance } from "perf_hooks"
import env from "../../.env.js"
import { print_elapsed } from "./utils/print_elapsed.js"

export default async function generate_ENV() {
  try {
    const start = performance.now()
    const envPath = path.join(process.cwd(), ".env.js")
    if (!fs.existsSync(envPath)) {
      throw new Error(`File does not exist${envPath}`)
    }

    const envKeys = env[process.env.NODE_ENV]

    let envStr = "# Generated file. Do not edit.\n"
    for (const [key, val] of Object.entries(envKeys)) {
      envStr = envStr + `${key}=${val}\n`
    }

    fs.writeFileSync(path.join(process.cwd(), ".env"), envStr, "utf-8")

    print_elapsed(start, "[generate env] Generated ENV")
  } catch (err) {
    console.error(err)
  }
}
