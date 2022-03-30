import os from "os"

export async function getEnv(options) {
	let env

	if (os.platform() === "linux") {
		// Tested on pop_os!
		env = await import(`file:\\\\${options.input}`)
	} else {
		env = await import(`file:\\${options.input}`)
	}

	return env.default
}
