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
		return checkLogicOperators()
	}

	if (state.preserve === true) {
		if (str[0] === "%" && str[str.length - 1] === "%") {
			insert(str.slice(1, str.length - 1))
			return checkLogicOperators()
		}
		insert(`"${str}"`)
	}

	return checkLogicOperators()
}

function parseNumber() {
	while (!outOfBounds() && !isNaN(Number(currChar())) && !/\s/.test(currChar())) {
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

	return checkLogicOperators()
}

function parseVar() {
	while (!outOfBounds()) {
		if (currChar() === "?" && peekNext() !== ".") {
			break
		}

		if (!/[a-zA-Z0-9_\-.[\]"'`${}]/.test(currChar())) {
			break
		}
		acceptChar()
	}

	return checkLogicOperators()
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

	return checkLogicOperators()
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

function checkLogicOperators() {
	acceptWhitespace()

	let operator: boolean | number | string = false

	const lo = ["=", "|", "?", "&", ":"]
	const loMap = {
		"==": "==",
		"===": "===",
		"||": "||",
		"??": "??",
		"&&": "&&",
		"?": "?",
		":": ":",
	}

	for (let i = 0; i < lo.length; i++) {
		operator = lo.indexOf(currChar())
	}

	if (operator !== -1) {
		if (loMap?.[currChar() + peekNext(2)]) {
			operator = loMap[currChar() + peekNext(2)]
		}

		if (loMap?.[currChar() + peekNext(1)]) {
			operator = loMap[currChar() + peekNext(1)]
		}

		if (loMap?.[currChar()]) {
			operator = loMap[currChar()]
		}

		if (typeof operator === "string") {
			insert(operator)

			for (let i = 0; i < operator.length; i++) {
				eat()
			}

			return parseAssignment()
		}
	}
}

function currChar() {
	return state.input[state.pos]
}

function peekNext(stride = 1) {
	return state.input[state.pos + stride]
}

function peekPrev(stride = 1) {
	return state.input[state.pos - stride]
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
	while (/\s/.test(state.input[state.pos])) {
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
