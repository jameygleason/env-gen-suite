import fs from "fs"
import { performance } from "perf_hooks"
import { getEnv } from "./utils/getEnv"
import { printElapsed } from "./utils/printElapsed"
import type { InternalOptions } from "../main"

export async function generateEnv(options: InternalOptions): Promise<void> {
	try {
		const start = performance.now()
		const env = await getEnv(options)

		if (!Object.prototype.hasOwnProperty.call(env, options?.mode)) {
			throw new Error(`Property "${options.mode}" doesn't exist`)
		}

		let envStr = `# Generated file. Edit in ${options.relativeRoot}\n`

		for (const [key, val] of Object.entries(env[options.mode])) {
			if (typeof val === "string") {
				envStr += `${key}="${val}"\n`
				continue
			}
			envStr += `${key}=${val}\n`
		}

		fs.writeFileSync(options.envPath, envStr, "utf-8")

		printElapsed(start, "[env_gen] Generated Env")
	} catch (err) {
		console.error(err)
	}
}
