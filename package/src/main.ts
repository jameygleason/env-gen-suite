import path from "path"
import { buildEnv } from "./buildEnv"
import { getRelativeRoot } from "./features/utils/getRelativeRoot"

type ConfigPaths = {
	input: string
	env: string
	sampleEnv: string
	publicVars: string
}

const paths: ConfigPaths = {
	input: path.join(process.cwd(), ".env.js"),
	env: path.join(process.cwd(), ".env"),
	sampleEnv: path.join(process.cwd(), ".env.sample.js"),
	publicVars: path.join(process.cwd(), "src", "publicVars.js"),
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

let initialized = false
let forceBuild = false

async function runBuild(options) {
	if (!initialized || forceBuild) {
		await buildEnv(options)
		initialized = true
	}
}

export default function envGen(o: Options) {
	const options: InternalOptions = {
		mode: o?.mode || process.env?.NODE_ENV || "",
		inputPath: o?.inputPath || paths.input,
		envPath: o?.envPath || paths.env,
		samplePath: o?.samplePath || paths.sampleEnv,
		publicPath: o?.publicPath || paths.publicVars,
		watch: true,
		relativeRoot: getRelativeRoot(o?.inputPath || paths.input),
	}

	if (!!options?.mode === false) {
		throw new Error('NODE_ENV could not be detected. Missing required field "mode"')
	}

	return {
		name: "env-gen",

		async buildStart() {
			try {
				// Rollup
				// @ts-ignore
				if (options?.watch === true && !!this?.addWatchFile) {
					// @ts-ignore
					this.addWatchFile(options.inputPath)
				}

				await runBuild(options)
			} catch (err) {
				console.error(err)
			}
		},

		// Rollup
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

		// Vite
		configureServer(server) {
			server.watcher.add([options.inputPath])
			server.watcher.on("add", handleFileChange)
			server.watcher.on("change", handleFileChange)
			server.watcher.on("unlink", handleFileChange)

			async function handleFileChange(file) {
				if (file !== options.inputPath) {
					return
				}

				forceBuild = true
				await runBuild(options)
				server.ws.send({ type: "full-reload" })
				forceBuild = false
			}
		},
	}
}
