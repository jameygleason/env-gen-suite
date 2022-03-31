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

		if (!options?.mode) {
			throw new Error(`Expected "mode" option to be a string. Received ${typeof options?.mode}`)
		}

		const vars = env.publicVars[options.mode]

		const contents = `// Generated file. Edit in ${getRelativeRoot(options)}\nconst publicVars = ${objectToString(
			vars,
		)}\n\nexport default publicVars\n`

		if (!options?.publicOutput) {
			throw new Error(`Expected "publicOutput" option to be a string. Received ${typeof options?.publicOutput}`)
		}

		fs.writeFileSync(options.publicOutput, contents)

		printElapsed(start, "[env_gen] Generated Public Vars")
	} catch (err) {
		console.error(err)
	}
}

// TODO
// let newEnv = {}

// function handleTemplateStr(input) {
// 	console.log("\n++++++++++++++++++++++++++++++")
// 	console.log(input)

// 	if (input.toString() === "[object Object]") {
// 		for (const [k, v] of Object.entries(input)) {
// 			// @ts-ignore
// 			if (v.toString() === "[object Object]") {
// 				console.log(`${k}:`, v)

// 				// newEnv[k] = {}
// 				// const part = Object.fromEntries([[k, v]])
// 				return handleTemplateStr(v)
// 			}

// 			console.log(v)
// 			let str = stripTemplateDelims(v)
// 			console.log("str:", str)
// 		}
// 	}
// }

// function stripTemplateDelims(input) {
// 	if (input[0] === "%" && input[input.length - 1] === "%") {
// 		input = input.slice(1, input.length - 1)
// 	}
// 	return input
// }
