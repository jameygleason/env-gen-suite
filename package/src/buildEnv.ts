import fs from "fs"
import { generateEnv } from "./features/generateEnv"
import { generateEnvJS } from "./features/generateEnvJS"
import { generatePublicEnv } from "./features/generatePublicEnv"
import { generateSampleEnv } from "./features/generateSampleEnv"
import type { InternalOptions } from "./main"

export async function buildEnv(options: InternalOptions): Promise<void> {
	try {
		if (!fs.existsSync(options.inputPath)) {
			generateEnvJS(options)
		}

		await generateEnv(options)
		await generatePublicEnv(options)

		if (typeof options.samplePath !== "string") {
			generateSampleEnv(options)
		}
	} catch (err) {
		console.error(err)
	}
}
