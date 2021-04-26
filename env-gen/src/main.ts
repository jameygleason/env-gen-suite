import path from "path"
import child_process from "child_process"
import { promisify } from "util"
import kleur from "kleur"

const exec = promisify(child_process.exec)

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

        if (options?.watch !== false) {
          // @ts-ignore
          this.addWatchFile(path.join(process.cwd(), ".env.js"))
        }
      } catch (err) {
        console.error(kleur.red(`Error: ${err}`))
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
        console.error(kleur.red(`Error: ${err}`))
      }
    },
  }
}

async function buildEnv() {
  try {
    const { stdout, stderr } = await exec(
      "cross-env NODE_ENV=development node -r esm node_modules/@signalchain/rollup-plugin-env-gen/dist/runEnvGen.js",
    )
    if (stderr) {
      console.error(kleur.red(`Error: ${stderr}`))
      return
    }
    console.log(kleur.blue(stdout))
  } catch (err) {
    console.error(kleur.red(`Error: ${err}`))
  }
}
