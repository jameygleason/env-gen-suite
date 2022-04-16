import fs from "fs"
import { performance } from "perf_hooks"
import { printElapsed } from "@signalchain/utils/node"
import { parseEnv } from "./utils/parseEnv"
import type { InternalOptions } from "../main"

export function generateSampleEnv(options: InternalOptions): void {
	try {
		if (typeof options.samplePath !== "string") {
			return
		}

		const start = performance.now()
		const input = fs.readFileSync(options.inputPath, "utf-8")

		const content = parseEnv(options.relativeRoot, input, false)

		fs.writeFileSync(options.samplePath, content, "utf-8")

		printElapsed(start, "[env_gen] Generated Sample Env")
	} catch (err) {
		console.error(err)
	}
}
