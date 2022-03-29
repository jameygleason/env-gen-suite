import path from "path"
import kleur from "kleur"
import generateEnv from "./generateEnv.js"
import generateEnvJS from "./generateEnvJS.js"
import { envPath, envJSPath } from "./config.js"

interface Options {
	// bundler?: string
	mode?: string
	path: string
	output: string
	emitFiles?: boolean
	watch?: boolean
	// include?: string
	// exclude?: string[]
}

interface Opts {
	// bundler: string
	mode: string
	path: string
	output: string
	emitFiles: boolean
	watch: boolean
}

let initialized = false

export default function envGen(options: Options) {
	const opts: Opts = {
		// bundler: options?.bundler,
		mode: process?.env?.NODE_ENV || options?.mode || "",
		path: options.path || envJSPath,
		output: options.output || envPath,
		emitFiles: true,
		watch: true,
	}

	if (opts.mode.length === 0) {
		throw new Error('process.env.NODE_ENV could not be detected. Must pass "mode" options.')
	}

	return {
		name: "env-gen",

		buildStart() {
			try {
				if (!initialized) {
					buildEnv(opts)
				}
				initialized = true

				if (opts?.watch === true) {
					// @ts-ignore
					this.addWatchFile(envJSPath)
				}
			} catch (err) {
				console.error(kleur.red(`${err}`))
			}
		},

		async watchChange(file: string) {
			try {
				const splitPath = file.split(path.sep)
				const runBuildEnv = splitPath[splitPath.length - 1] === ".env.js"

				if (opts?.emitFiles !== false && runBuildEnv && initialized) {
					await buildEnv(opts)
				}
			} catch (err) {
				console.error(kleur.red(`${err}`))
			}
		},
	}
}

async function buildEnv(options: Opts) {
	try {
		await generateEnv(options)
		generateEnvJS()
	} catch (err) {
		console.error(kleur.red(`${err}`))
	}
}
