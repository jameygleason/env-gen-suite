import path, { dirname } from "path"
import { spawnSync } from "child_process"
import { fileURLToPath } from "url"
import type { InternalOptions } from "../../main"

const __dirname = dirname(fileURLToPath(import.meta.url))

export async function getEnv(options: InternalOptions) {
	try {
		// This file is in the src/prod
		const prog = spawnSync("node", [path.join(__dirname, "getEnvExec.js"), `--options=${JSON.stringify(options)}`], {
			encoding: "utf8",
		})

		if (prog.stderr) {
			console.error(prog.stderr)
		}

		return JSON.parse(prog.stdout)
	} catch (err) {
		console.error(err)
		return {}
	}
}
