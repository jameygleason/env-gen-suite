import fs from "fs"
import { performance } from "perf_hooks"
import { printElapsed } from "@signalchain/utils/node"

export function generateEnvJS(options): void {
	try {
		const start = performance.now()

		const blankEnv =
			"const shared = {}\n\nconst development = {\n\t...shared,\n}\n\nconst production = {\n\t...shared,\n}\n\nexport default {\n\tdevelopment,\n\tproduction,\n}\n"

		fs.writeFileSync(options.inputPath, blankEnv, "utf-8")
		printElapsed(start, "[env_gen] Generated Env JS")
	} catch (err) {
		console.error(err)
	}
}
