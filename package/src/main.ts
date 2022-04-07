import path from "path"
import { buildEnv } from "./buildEnv"
import { getRelativeRoot } from "./features/utils/getRelativeRoot"

type ConfigPaths = {
	input: string
	env: string
	sampleEnv: string
	publicEnv: string
}

const paths: ConfigPaths = {
	input: path.join(process.cwd(), ".env.js"),
	env: path.join(process.cwd(), ".env"),
	sampleEnv: path.join(process.cwd(), ".env.sample.js"),
	publicEnv: path.join(process.cwd(), "src", "publicEnv.js"),
}

export type Options = {
	mode?: string
	inputPath?: string
	envPath?: string
	samplePath?: string | boolean
	publicPath?: string
	watch?: boolean
}

export type InternalOptions = {
	mode: string
	inputPath: string
	envPath: string
	samplePath: string | boolean
	publicPath: string
	watch: boolean
	relativeRoot: string
}

export default function envGen(o: Options) {
	const options: InternalOptions = {
		mode: o?.mode || process.env?.NODE_ENV || "",
		inputPath: o?.inputPath || paths.input,
		envPath: o?.envPath || paths.env,
		samplePath: o?.samplePath || paths.sampleEnv,
		publicPath: o?.publicPath || paths.publicEnv,
		watch: true,
		relativeRoot: getRelativeRoot(o?.inputPath || paths.input),
	}

	if (!!options?.mode === false) {
		throw new Error('NODE_ENV could not be detected. Missing required field "mode".')
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

				// @ts-ignore
				if (options?.watch === true && !!this?.addWatchFile) {
					// @ts-ignore
					this.addWatchFile(options.inputPath)
				}
			} catch (err) {
				console.error(err)
			}
		},

		async watchChange(file: string) {
			try {
				const splitPath = file.split(path.sep)
				const inputChanged = splitPath[splitPath.length - 1] === options.relativeRoot

				if (inputChanged && initialized) {
					await buildEnv(options)
				}
			} catch (err) {
				console.error(err)
			}
		},
	}
}
