import fs from "fs"
import os from "os"
import { performance } from "perf_hooks"
import { print_elapsed } from "./utils/print_elapsed.js"
import { blankEnv } from "./config.js"

export default async function generateENV(options) {
  try {
    const start = performance.now()

    if (!fs.existsSync(options.path)) {
      fs.writeFileSync(options.path, blankEnv, "utf-8")
    }

    let env
    if (os.platform() === "linux") {
      // Tested on pop_os!
      env = await import(`file:\\\\${options.path}`)
    } else {
      env = await import(`file:\\${options.path}`)
    }

    const envKeys = env.default[options.mode]

    let envStr = "# Generated file. Do not edit.\n"
    for (const [key, val] of Object.entries(envKeys)) {
      envStr = envStr + `${key}=${val}\n`
    }

    fs.writeFileSync(options.output, envStr, "utf-8")
    print_elapsed(start, "[env_gen] Generated ENV")
  } catch (err) {
    console.error(err)
  }
}
