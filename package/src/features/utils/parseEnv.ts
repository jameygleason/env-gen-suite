let state = {
	preserve: false,
	input: "",
	output: "",
	pos: 0,
	leftDelimCount: 0,
	rightDelimCount: 0,
	eof: false,
}

export function parseEnv(relRoot: string, input: string, preserveAssignments: boolean): string {
	state = {
		preserve: preserveAssignments || false,
		input,
		output: `// Generated file. Edit in ${relRoot}\n`,
		pos: 0,
		leftDelimCount: 0,
		rightDelimCount: 0,
		eof: false,
	}

	while (state.eof === false) {
		if (outOfBounds()) {
			break
		}
		run()
	}

	return state.output
}

function run() {
	acceptWhitespace()

	switch (currChar()) {
		case "=":
			acceptChar()
			parseAssignment()
			break
		case ":":
			acceptChar()
			parseAssignment()
			break
		case "{":
			state.leftDelimCount++
			acceptChar()
			parseObject()
			break
		case "}":
			state.rightDelimCount++
			if (state.leftDelimCount !== 0 && state.leftDelimCount === state.rightDelimCount) {
				state.leftDelimCount = 0
				state.rightDelimCount = 0
				acceptChar()
				break
			}
			acceptChar()
			parseObject()
			break
		case "e":
			parseExport()
			break
		default:
			acceptChar()
	}
}

function parseExport() {
	const exportKW = "export"
	const exportDefaultStr = "export default"

	if (state.input.slice(state.pos, state.pos + exportKW.length) === exportKW) {
		if (state.input.slice(state.pos, state.pos + exportDefaultStr.length) !== exportDefaultStr) {
			acceptChar()
			return
		}

		state.output += state.input.slice(state.pos, exportDefaultStr.length)
		state.pos = state.pos + exportDefaultStr.length

		acceptWhitespace()

		if (currChar() === "{") {
			parseObject()
			return
		}
	}

	acceptChar()
}

function parseAssignment() {
	acceptWhitespace()

	if (currChar() === "{") {
		return parseObject()
	}

	if (currChar() === '"' || currChar() === "'" || currChar() === "`") {
		return parseString()
	}

	if (!isNaN(Number(currChar()))) {
		return parseNumber()
	}

	let t = "true"
	let f = "false"
	if (
		state.input.slice(state.pos, state.pos + t.length) === t ||
		state.input.slice(state.pos, state.pos + f.length) === f
	) {
		return parseBool()
	}

	if (typeof currChar() === "string") {
		return parseVar()
	}

	console.error(`Unhandled type ${typeof currChar()}`)
}

function parseString() {
	let delim = currChar()
	let str = ""
	eat()

	while (!outOfBounds()) {
		if (currChar() === delim && peekPrev() !== "\\") {
			eat()
			break
		}

		str += currChar()
		eat()
	}

	if (state.preserve === false) {
		insert('""')
		return
	}

	if (state.preserve === true) {
		if (str[0] === "%" && str[str.length - 1] === "%") {
			insert(str.slice(1, str.length - 1))
			return
		}
		insert(`"${str}"`)
	}
}

function parseNumber() {
	while (
		!outOfBounds() &&
		!isNaN(Number(currChar())) &&
		currChar() !== "\n" &&
		currChar() !== "\r" &&
		currChar() !== "\t" &&
		currChar() !== " "
	) {
		if (state.preserve === false) {
			eat()
		}

		if (state.preserve === true) {
			acceptChar()
		}
	}

	if (state.preserve === false) {
		insert(0)
	}
}

function parseVar() {
	while (!outOfBounds()) {
		if (!/[a-zA-Z0-9_-]/.test(currChar())) {
			break
		}
		acceptChar()
	}
}

function parseBool() {
	const boolChars = ["t", "r", "u", "e", "f", "a", "l", "s", "e"]
	while (!outOfBounds()) {
		if (state.preserve === false) {
			if (!boolChars.includes(currChar())) {
				break
			}
			eat()
		}

		if (state.preserve === true) {
			if (!boolChars.includes(currChar())) {
				break
			}
			acceptChar()
		}
	}

	if (state.preserve === false) {
		insert("false")
	}
}

function parseObject() {
	if (outOfBounds()) {
		return
	}

	if (currChar() === ":") {
		acceptChar()
		return parseAssignment()
	}

	if (currChar() === "{") {
		state.leftDelimCount++
	}

	acceptChar()
	return parseObject()
}

function currChar() {
	return state.input[state.pos]
}

// function peekNext() {
// 	return state.input[state.pos + 1]
// }

function peekPrev() {
	return state.input[state.pos - 1]
}

function acceptChar() {
	if (currChar() === undefined) {
		return
	}

	state.output += currChar()
	state.pos++
}

function insert(char) {
	state.output += char
}

function eat() {
	state.pos++
}

function acceptWhitespace() {
	while (state.input[state.pos] === " " || state.input[state.pos] === "\n" || state.input[state.pos] === "\r") {
		if (outOfBounds()) {
			break
		}
		acceptChar()
	}
}

function outOfBounds() {
	if (state.pos >= state.input.length) {
		state.eof = true
		return true
	}
	return false
}
