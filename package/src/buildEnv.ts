import fs from "fs"
import { generateEnv } from "./features/generateEnv"
import { generateEnvJS } from "./features/generateEnvJS"
import { generatePrivateEnv } from "./features/generatePrivateEnv"
import { generateSampleEnv } from "./features/generateSampleEnv"
import { paths } from "./config"
import type { Options } from "./main"

export async function buildEnv(options: Options) {
	try {
		if (!fs.existsSync(paths.input)) {
			generateEnvJS()
		}

		await generateEnv(options)
		await generatePrivateEnv(options)
		await generateSampleEnv()
	} catch (err) {
		console.error(err)
	}
}
