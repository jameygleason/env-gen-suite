import fs from "fs"
import { performance } from "perf_hooks"
import { printElapsed } from "../utils/printElapsed"
import { paths } from "../config.js"

export function generateSampleEnv() {
	try {
		const start = performance.now()
		const input = fs.readFileSync(paths.input, "utf-8")
		const content = parseEnv(input)

		fs.writeFileSync(paths.sampleEnv, content, "utf-8")

		printElapsed(start, "[env_gen] Generated Sample Env")
	} catch (err) {
		console.error(err)
	}
}
const state = {
	input: "",
	output: "// Generated file. Do not edit.\n",
	pos: 0,
	leftDelimCount: 0,
	rightDelimCount: 0,
}

function parseEnv(input) {
	state.input = input

	while (state.pos <= state.input.length - 1) {
		switch (currChar()) {
			case "{":
				state.leftDelimCount++
				acceptChar()
				parseObject()
				continue
			case "}":
				state.rightDelimCount++
				if (state.leftDelimCount !== 0 && state.leftDelimCount === state.rightDelimCount) {
					state.leftDelimCount = 0
					state.rightDelimCount = 0
					acceptChar()
					continue
				}
				acceptChar()
				parseObject()
				continue
			case "e":
				parseExport()
				continue
			default:
				acceptChar()
		}
	}

	return state.output
}

function currChar() {
	return state.input[state.pos]
}

function acceptChar() {
	state.output += currChar()
	state.pos++
}

function parseExport() {
	const kw = "export"
	if (state.input.slice(state.pos, state.pos + kw.length) === kw) {
		state.output += state.input.slice(state.pos, state.input.length)
		state.pos = state.input.length
		return
	}
	acceptChar()
}

// let lexValue = false
// let wasVal = false
// let nc = "// Generated file. Do not edit.\n"

function parseObject() {
	acceptChar()

	// if (file[i] === ":") {
	// 	lexValue = true
	// 	nc += file[i]
	// 	i++
	// }
	// let foundType = false
	// let valType = "string"
	// while (lexValue) {
	// 	if (i > file.length) {
	// 		break
	// 	}
	// 	while (!foundType) {
	// 		if (file[i] === " ") {
	// 			i++
	// 			continue
	// 		}
	// 		if (file[i] === "{") {
	// 			nc += " " + file[i]
	// 			i++
	// 			continue
	// 		}
	// 		if (!isNaN(Number(file[i]))) {
	// 			foundType = true
	// 			valType = "number"
	// 			i++
	// 			break
	// 		}
	// 		if (typeof file[i] === "string") {
	// 			foundType = true
	// 			valType = "string"
	// 			i++
	// 			break
	// 		}
	// 	}
	// 	if (file[i] === "," || file[i] === "}") {
	// 		let val = valType === "number" ? 0 : '""'
	// 		lexValue = false
	// 		wasVal = true
	// 		if (file[i] === "}") {
	// 			nc += ` ${val},\n}`
	// 		} else {
	// 			nc += ` ${val},`
	// 		}
	// 		break
	// 	}
	// 	i++
	// }
	// if (!wasVal) {
	// 	nc += file[i]
	// }
	// wasVal = false
	// i++
}
