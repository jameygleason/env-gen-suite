import fs from "fs"
import { performance } from "perf_hooks"
import { paths } from "../config"
import { printElapsed } from "./utils/printElapsed"

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
	eof: false,
}

function parseEnv(input) {
	state.input = input

	while (state.eof === false) {
		if (outOfBounds()) {
			break
		}

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

function parseObject() {
	if (outOfBounds()) {
		return
	}

	if (currChar() === ":") {
		acceptChar()
		return lexValue()
	}

	acceptChar()
	return parseObject()
}

function lexValue() {
	if (outOfBounds()) {
		return
	}

	eatSpace()

	if (currChar() === "{") {
		state.leftDelimCount++
		insert(" ")
		return parseObject()
	}

	const value = getValue()
	const valueType = getValueType(value)

	const zeroVal = {
		string: '""',
		number: 0,
		boolean: false,
	}[valueType]

	if (currChar() === "}") {
		state.rightDelimCount++

		let indent = ""
		for (let i = 0; i < state.leftDelimCount - state.rightDelimCount; i++) {
			indent += "\t"
		}

		if (state.leftDelimCount !== 0 && state.leftDelimCount === state.rightDelimCount) {
			state.leftDelimCount = 0
			state.rightDelimCount = 0

			insert(` ${zeroVal},\n${indent}}`)
			state.pos++
			return
		}

		insert(` ${zeroVal},\n${indent}}`)
		state.pos++
	} else {
		insert(` ${zeroVal},`)
		state.pos++
	}

	return parseObject()
}

function getValue() {
	let buildStr = true
	let value = ""

	while (buildStr) {
		if (outOfBounds()) {
			return
		}

		if (currChar() === "," || currChar() === "}") {
			buildStr = false
			break
		}

		value += currChar()
		state.pos++
	}

	return value.trim()
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

function getValueType(value) {
	if (!isNaN(Number(value))) {
		return "number"
	}

	if (value === "true" || value === "false") {
		return "boolean"
	}

	if (typeof value === "string") {
		return "string"
	}

	return typeof value
}

function currChar() {
	return state.input[state.pos]
}

function acceptChar() {
	state.output += currChar()
	state.pos++
}

function insert(char) {
	state.output += char
}

function eatSpace() {
	while (state.input[state.pos] === " ") {
		if (outOfBounds()) {
			break
		}
		state.pos++
	}
}

function outOfBounds() {
	if (state.pos >= state.input.length) {
		state.eof = true
		return true
	}
	return false
}
