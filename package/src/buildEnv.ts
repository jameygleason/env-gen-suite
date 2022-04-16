import fs from "fs"
import { generateEnv } from "./features/generateEnv"
import { generateEnvJS } from "./features/generateEnvJS"
import { generatePublicVars } from "./features/generatePublicVars"
import { generateSampleEnv } from "./features/generateSampleEnv"
import type { InternalOptions } from "./main"

export async function buildEnv(options: InternalOptions): Promise<void> {
	try {
		if (!fs.existsSync(options.inputPath)) {
			generateEnvJS(options)
		}

		await generateEnv(options)
		await generatePublicVars(options)

		if (typeof options.samplePath === "string") {
			generateSampleEnv(options)
		}
	} catch (err) {
		console.error(err)
	}
}
