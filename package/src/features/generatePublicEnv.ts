import fs from "fs"
import { performance } from "perf_hooks"
import { objectToString } from "@signalchain/utils/objectToString"
import { printElapsed } from "@signalchain/utils/printElapsed"
import { getEnv } from "./utils/getEnv"
import { parseEnv } from "./utils/parseEnv"
import type { InternalOptions } from "../main"

export async function generatePublicEnv(options: InternalOptions): Promise<void> {
	try {
		const start = performance.now()

		const env = await getEnv(options)
		if (!env?.publicVars || !Object.prototype.hasOwnProperty.call(env.publicVars, options?.mode)) {
			return
		}

		const vars = env.publicVars[options.mode]

		const contents = parseEnv(options.relativeRoot, `export default ${objectToString(vars)}\n`, true)

		fs.writeFileSync(options.publicPath, contents)

		printElapsed(start, "[env_gen] Generated Public Vars")
	} catch (err) {
		console.error(err)
	}
}
