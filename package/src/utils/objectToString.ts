export function objectToString<T>(arg: T, pad = "", indention = "spaces"): string {
	const indent = indention === "spaces" ? "  " : "\t"
	let out = ""

	if (Array.isArray(arg)) {
		out += "[\n"
		for (let i = 0; i < arg.length; i++) {
			out +=
				pad +
				indent +
				// @ts-ignore
				objectToString(typeof arg[i] === "string" ? `"${arg[i]}"` : arg[i], pad + indent, indention) +
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
					(arg as any)[k].constructor === String ? `"${(arg as any)[k]}"` : (arg as any)[k],
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
