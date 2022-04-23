// @ts-check
import os from "os"

export async function getEnvExec() {
	try {
		let options
		let env

		for (let i = 0; i < process.argv.length; i++) {
			const arg = process.argv[i]
			const flag = "--options="

			if (arg.slice(0, flag.length) === flag) {
				options = JSON.parse(arg.slice(flag.length, arg.length))
				break
			}
		}

		if (os.platform() === "win32") {
			env = await import(`file:\\${options.inputPath}`)
		} else {
			env = await import(`file:\\\\${options.inputPath}`)
		}

		process.stdout.write(JSON.stringify(env.default))
	} catch (err) {
		console.error(err)
	}
}
getEnvExec()
