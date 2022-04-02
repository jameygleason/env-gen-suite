export function objectToString<T>(arg: T, pad = "", indention = "tabs"): string {
	const indent = indention === "spaces" ? "  " : "\t"
	let out = ""

	if (Array.isArray(arg)) {
		out += "[\n"
		for (let i = 0; i < arg.length; i++) {
			out +=
				pad +
				indent +
				// @ts-ignore
				objectToString(typeof arg[i] === "string" ? handleQuoteType(arg[i]) : arg[i], pad + indent, indention) +
				"," +
				"\n"
		}
		out += pad + "]"
		// @ts-ignore
	} else if (arg.toString() === "[object Object]") {
		out += "{\n"
		for (const k in arg) {
			let key = k
			for (const c of k) {
				if (c === "-") {
					// @ts-ignore
					key = `"${k}"`
					break
				}
			}

			out +=
				pad +
				indent +
				key +
				": " +
				objectToString(
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					(arg as any)[k].constructor === String ? handleQuoteType((arg as any)[k]) : (arg as any)[k],
					pad + indent,
					indention,
				) +
				"," +
				"\n"
		}
		out += pad + "}"
	} else {
		out += arg
	}

	return out
}

function handleQuoteType(str: string): string {
	let newStr = ""
	let strType = '"'
	const quotes: Array<string> = []

	for (let i = 0; i < str.length; i++) {
		if (str[i] === '"') {
			strType = "'"
			quotes.push("'")
		}
		if (str[i] === "'") {
			strType = '"'
			quotes.push('"')
		}
		newStr += str[i]
	}

	if (Array.from(new Set(quotes)).length === 2) {
		strType = "`"
	}

	return strType + newStr + strType
}
