import fs from "fs"
import os from "os"
import { performance } from "perf_hooks"
import { print_elapsed } from "./utils/print_elapsed.js"
import type { Options } from "./main"

export async function generateEnv(options: Options) {
	try {
		const start = performance.now()

		let env
		if (os.platform() === "linux") {
			// Tested on pop_os!
			env = await import(`file:\\\\${options.input}`)
		} else {
			env = await import(`file:\\${options.input}`)
		}

		const envKeys = env.default[options.mode]

		let envStr = "# Generated file. Do not edit.\n"
		for (const [key, val] of Object.entries(envKeys)) {
			if (typeof val === "string") {
				envStr = envStr + `${key}="${val}"\n`
				continue
			}
			envStr = envStr + `${key}=${val}\n`
		}

		fs.writeFileSync(options.envOutput, envStr, "utf-8")

		print_elapsed(start, "[env_gen] Generated Env")
	} catch (err) {
		console.error(err)
	}
}
