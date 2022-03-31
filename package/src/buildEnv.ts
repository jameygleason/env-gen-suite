import fs from "fs"
import { generateEnv } from "./features/generateEnv"
import { generateEnvJS } from "./features/generateEnvJS"
import { generatePublicEnv } from "./features/generatePublicEnv"
import { generateSampleEnv } from "./features/generateSampleEnv"
import { paths } from "./config"
import type { Options } from "./main"

export async function buildEnv(options: Options) {
	try {
		if (!fs.existsSync(paths.input)) {
			generateEnvJS()
		}

		await generateEnv(options)
		await generatePublicEnv(options)

		if (options.sampleOutput) {
			generateSampleEnv()
		}
	} catch (err) {
		console.error(err)
	}
}
