import fs from "fs"
import { performance } from "perf_hooks"
import { paths } from "../config"
import { printElapsed } from "./utils/printElapsed"

export function generateEnvJS() {
	try {
		const start = performance.now()

		const blankEnv =
			"const shared = {}\n\nconst development = {\n\t...shared,\n}\n\nconst production = {\n\t...shared,\n}\n\nexport default {\n\tdevelopment,\n\tproduction,\n}\n"

		fs.writeFileSync(paths.input, blankEnv, "utf-8")
		printElapsed(start, "[env_gen] Generated Env JS")
	} catch (err) {
		console.error(err)
	}
}
