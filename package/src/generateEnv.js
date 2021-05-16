import fs from "fs"
import { performance } from "perf_hooks"
import { print_elapsed } from "./utils/print_elapsed.js"
import { envPath, envJSPath, blankEnv } from "./config.js"

export default async function generateENV(mode) {
  try {
    const start = performance.now()

    if (!fs.existsSync(envJSPath)) {
      fs.writeFileSync(envJSPath, blankEnv, "utf-8")
    }

    let env

    // FIX: Sapper example doesn't output new env key unless you restart the server
    // console.log('env:', env)
    try {
      env = await import(`file:\\${envJSPath}`)
    } catch (err) {
      env = require(envJSPath)
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

    fs.writeFileSync(envPath, envStr, "utf-8")
    print_elapsed(start, "[env_gen] Generated ENV")
  } catch (err) {
    console.error(err)
  }
}
