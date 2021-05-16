import path from "path"
import kleur from "kleur"
import generateEnv from "./generateEnv.js"
import generateEnv_JS from "./generateEnv_JS.js"
import { envJSPath } from "./config.js"

interface Options {
  bundler?: string
  mode?: string
  emitFiles?: boolean
  watch?: boolean
  // include?: string
  // exclude?: string[]
}

let initialized = false

export default function envGen(options: Options) {
  if (!process?.env?.NODE_ENV && !options?.mode) {
    throw new Error(
      'process.env.NODE_ENV could not be detected. Must pass "mode" options.',
    )
  }

  const opts: Options = {
    bundler: options?.bundler,
    mode: process?.env?.NODE_ENV || options.mode,
    emitFiles: true,
    watch: true,
    // include: ".env.js",
  }

  return {
    name: "env-gen",

    async buildStart() {
      try {
        if (!initialized) {
          // If you add the await keyword, generate theme will run twice on initialization
          buildEnv(opts.mode)
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

    async watchChange(file) {
      try {
        const splitPath = file.split(path.sep)
        const runBuildEnv = splitPath[splitPath.length - 1] === ".env.js"

        if (opts?.emitFiles !== false && runBuildEnv && initialized) {
          await buildEnv(opts.mode)
        }
      } catch (err) {
        console.error(kleur.red(`${err}`))
      }
    },
  }
}

async function buildEnv(mode) {
  try {
    generateEnv(mode)
    generateEnv_JS()
  } catch (err) {
    console.error(kleur.red(`${err}`))
  }
}
