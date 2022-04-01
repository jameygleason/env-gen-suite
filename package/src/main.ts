import path from "path"
import { buildEnv } from "./buildEnv"
import { paths } from "./config"

export type Options = {
	mode?: string
	input?: string
	envOutput?: string
	sampleOutput?: string | boolean
	publicOutput?: string
	watch?: boolean
}

export default function envGen(options: Options) {
	let mode = process.env?.NODE_ENV
	if (options?.mode) {
		mode = options.mode
	}
	if (!mode) {
		throw new Error('NODE_ENV could not be detected. Missing required field "mode".')
	}

	options = {
		mode,
		input: options?.input || paths.input,
		envOutput: options?.envOutput || paths.env,
		sampleOutput: options?.sampleOutput || paths.sampleEnv,
		publicOutput: options?.publicOutput || paths.publicEnv,
		watch: true,
	}

	let initialized = false

	return {
		name: "env-gen",

		buildStart() {
			try {
				if (!initialized) {
					buildEnv(options)
				}
				initialized = true

				if (options?.watch === true) {
					// @ts-ignore
					this.addWatchFile(paths.input)
				}
			} catch (err) {
				console.error(err)
			}
		},

		async watchChange(file: string) {
			try {
				const splitPath = file.split(path.sep)
				const inputChanged = splitPath[splitPath.length - 1] === ".env.js"

				if (inputChanged && initialized) {
					await buildEnv(options)
				}
			} catch (err) {
				console.error(err)
			}
		},
	}
}
