import path from "path"
import kleur from "kleur"
import generateEnv from "./generateEnv.js"
import generateEnv_JS from "./generateEnvJS.js"

let initialized = false

export default function envGen(options) {
  return {
    name: "env-gen",

    async buildStart() {
      try {
        if (!initialized) {
          // If you add the await keyword, generate theme will run twice on initialization
          buildEnv()
        }
        initialized = true

        // if (options?.watch !== false) {
        //   // @ts-ignore
        //   console.log(path.join(process.cwd(), ".env.js"))
        //   this.addWatchFile(path.join(process.cwd(), ".env.js"))
        // }
      } catch (err) {
        console.error(kleur.red(`${err}`))
      }
    },

    async watchChange(file) {
      try {
        const splitPath = file.split(path.sep)
        const runBuildEnv = splitPath[splitPath.length - 1] === ".env.js"

        if (options?.emitFiles !== false && runBuildEnv && initialized) {
          await buildEnv()
        }
      } catch (err) {
        console.error(kleur.red(`${err}`))
      }
    },
  }
}

async function buildEnv() {
  try {
    generateEnv()
    generateEnv_JS()
  } catch (err) {
    console.error(kleur.red(`${err}`))
  }
}
