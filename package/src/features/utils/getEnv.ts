import os from "os"
import type { InternalOptions } from "../../main"

export async function getEnv(options: InternalOptions): Promise<Record<string, any>> {
	try {
		let env

		if (os.platform() === "linux") {
			// Tested on pop_os!
			env = await import(`file:\\\\${options.inputPath}`)
		} else {
			env = await import(`file:\\${options.inputPath}`)
		}

		return env.default
	} catch (err) {
		console.error(err)
		return {}
	}
}
