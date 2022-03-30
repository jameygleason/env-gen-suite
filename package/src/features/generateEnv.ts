import fs from "fs"
import { performance } from "perf_hooks"
import { getEnv } from "../utils/getEnv"
import { print_elapsed } from "../utils/print_elapsed.js"
import type { Options } from "../main"

export async function generateEnv(options: Options) {
	try {
		const start = performance.now()
		const env = await getEnv(options)

		let envStr = "# Generated file. Do not edit.\n"
		for (const [key, val] of Object.entries(env[options.mode])) {
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
