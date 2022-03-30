import fs from "fs"
import { generateEnv } from "./generateEnv"
import { generateEnvJS } from "./generateEnvJS"
import { generateSampleEnv } from "./generateSampleEnv"
import { paths } from "./config"
import type { Options } from "./main"

export async function buildEnv(options: Options) {
	try {
		if (!fs.existsSync(paths.input)) {
			generateEnvJS()
		}

		await generateEnv(options)
		await generateSampleEnv()
	} catch (err) {
		console.error(err)
	}
}
