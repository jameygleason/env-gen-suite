import fs from "fs"
import { performance } from "perf_hooks"
import { printElapsed } from "@signalchain/utils/node"
import { getEnv } from "./utils/getEnv"
import type { InternalOptions } from "../main"

export async function generateEnv(options: InternalOptions): Promise<void> {
	try {
		const start = performance.now()
		const env = await getEnv(options)

		if (!Object.prototype.hasOwnProperty.call(env, options?.mode)) {
			throw new Error(`Property "${options.mode}" doesn't exist`)
		}

		const envStream = fs.createWriteStream(options.envPath)
		envStream.write(`# Generated file. Edit in ${options.relativeRoot}\n`)

		for (const [key, val] of Object.entries(env[options.mode])) {
			if (typeof val === "string") {
				envStream.write(`${key}="${val}"\n`)
				continue
			}
			envStream.write(`${key}=${val}\n`)
		}

		printElapsed(start, "[env_gen] Generated Env")
	} catch (err) {
		console.error(err)
	}
}
