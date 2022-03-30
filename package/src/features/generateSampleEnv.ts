import fs from "fs"
import { performance } from "perf_hooks"
import { print_elapsed } from "../utils/print_elapsed.js"
import { paths } from "../config.js"

export async function generateSampleEnv() {
	try {
		const start = performance.now()

		const file = fs.readFileSync(paths.input, "utf-8")

		let lexObject = false
		let lexValue = false
		let wasVal = false
		let nc = "# Generated file. Do not edit.\n"

		let i = 0
		while (i < file.length) {
			if (file[i] === "}") {
				lexObject = false
				nc += file[i]
				i++
				continue
			}

			if (file[i] === "{") {
				lexObject = true
				nc += file[i]
				i++
				continue
			}

			if (lexObject === false) {
				nc += file[i]
				i++
				continue
			}

			if (file[i] === ":") {
				lexValue = true
				nc += file[i]
				i++
			}

			let foundType = false
			let valType = "string"
			while (lexValue) {
				if (i > file.length) {
					break
				}

				while (!foundType) {
					if (file[i] === " ") {
						i++
						continue
					}

					if (!isNaN(Number(file[i]))) {
						foundType = true
						valType = "number"
						i++
						break
					}

					if (typeof file[i] === "string") {
						foundType = true
						valType = "string"
						i++
						break
					}
				}

				if (file[i] === "," || file[i] === "}") {
					let val = valType === "number" ? 0 : '""'

					lexValue = false
					wasVal = true

					if (file[i] === "}") {
						nc += ` ${val},\n}`
					} else {
						nc += ` ${val},`
					}
					break
				}
				i++
			}

			if (!wasVal) {
				nc += file[i]
			}

			wasVal = false
			i++
		}

		fs.writeFileSync(paths.sampleEnv, nc, "utf-8")

		print_elapsed(start, "[env_gen] Generated Sample Env")
	} catch (err) {
		console.error(err)
	}
}
