import fs from "fs"
import { performance } from "perf_hooks"
import { getEnv } from "../utils/getEnv"
import { printElapsed } from "../utils/printElapsed"
import { objectToString } from "../utils/objectToString"
import { getRelativeRoot } from "../utils/getRelativeRoot"
import type { Options } from "../main"

export async function generatePublicEnv(options: Options) {
	try {
		const start = performance.now()

		const env = await getEnv(options)
		if (!env?.publicVars || Object.keys(env.publicVars).length === 0) {
			return
		}

		if (!Object.prototype.hasOwnProperty.call(env.publicVars, options.mode)) {
			throw new Error(`"Property ${options.mode}" doesn't exist on "publicVars"`)
		}

		const vars = env.publicVars[options.mode]

		const contents = `// Generated file. Edit in ${getRelativeRoot(options)}\nconst publicVars = ${objectToString(
			vars,
		)}\n\nexport default publicVars\n`

		fs.writeFileSync(options.publicOutput, contents)

		printElapsed(start, "[env_gen] Generated Public Vars")
	} catch (err) {
		console.error(err)
	}
}
