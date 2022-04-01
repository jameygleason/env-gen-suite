import fs from "fs"
import { performance } from "perf_hooks"
import { paths } from "../config"
import { parseEnv } from "./utils/parseEnv"
import { printElapsed } from "./utils/printElapsed"

export function generateSampleEnv() {
	try {
		const start = performance.now()
		const input = fs.readFileSync(paths.input, "utf-8")

		const content = parseEnv(input, false)

		fs.writeFileSync(paths.sampleEnv, content, "utf-8")

		printElapsed(start, "[env_gen] Generated Sample Env")
	} catch (err) {
		console.error(err)
	}
}
