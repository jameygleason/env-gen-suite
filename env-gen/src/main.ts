// @ts-nocheck
import path from "path"
import kleur from "kleur"
import generateEnv from "./generateEnv.js"
import generateEnvJS from "./generateEnvJS.js"

let initialized = false

export default function envGen(options) {
  return {
    name: "env-gen",

    async buildStart() {
      try {
        if (!initialized) {
          buildEnv()
        }
        initialized = true

        if (options?.watch !== false) {
          const env = path.join(process.cwd(), ".env.js")
          this.addWatchFile(env)
        }
      } catch (err) {
        console.error(kleur.red(`Error: ${err}`))
      }
    },

    async watchChange(file) {
      try {
        const splitPath = file.split(path.sep)
        const runBuildEnv = splitPath[splitPath.length - 1] === ".env.js"

        if (options?.emitFiles !== false && runBuildEnv) {
          buildEnv()
        }
      } catch (err) {
        console.error(kleur.red(`Error: ${err}`))
      }
    },
  }
}

async function buildEnv() {
  generateEnv()
  generateEnvJS()
}
