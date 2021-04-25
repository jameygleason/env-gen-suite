import path from "path"
import child_process from "child_process"
import { promisify } from "util"
import fg from "fast-glob"
import kleur from "kleur"

const exec = promisify(child_process.exec)

let initialized = false

export default function envGen(options) {
  return {
    name: "generate-env",

    async buildStart() {
      try {
        if (!initialized) {
          buildEnv()
        }
        initialized = true

        if (options?.watch !== false) {
          const addFiles = []

          const envGenGlob = fg("packages/environment**/*")
          const envGlob = fg(".env.js")
          const [envGen, env] = await Promise.all([envGenGlob, envGlob])

          addFiles.push(...envGen)
          addFiles.push(...env)

          for (const file of addFiles) {
            this.addWatchFile(path.join(process.cwd(), file))
          }
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
  const { stdout, stderr } = await exec(
    "cross-env NODE_ENV=development node -r esm packages/runGenEnv.js",
  )
  console.log(kleur.blue(stdout))
  if (stderr) {
    console.error(kleur.red(`Error: ${stderr}`))
  }
}
