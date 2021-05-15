import fs from "fs"
import path from "path"
import { performance } from "perf_hooks"
import { print_elapsed } from "./utils/print_elapsed.js"
import { envPath, blankEnv } from "./config.js"

export default async function generateENV(mode) {
  try {
    const start = performance.now()

    if (!fs.existsSync(envPath)) {
      fs.writeFileSync(envPath, blankEnv, "utf-8")
    }

    let env

    try {
      env = await import(`file:\\${envPath}`)
    } catch (err) {
      env = require(envPath)
    }

    let envKeys
    if (Object.keys(env).includes("default")) {
      envKeys = env.default[mode]
    } else {
      envKeys = env[mode]
    }

    let envStr = "# Generated file. Do not edit.\n"
    for (const [key, val] of Object.entries(envKeys)) {
      envStr = envStr + `${key}=${val}\n`
    }

    fs.writeFileSync(path.join(process.cwd(), ".env"), envStr, "utf-8")

    print_elapsed(start, "[env_gen] Generated ENV")
  } catch (err) {
    console.error(err)
  }
}
