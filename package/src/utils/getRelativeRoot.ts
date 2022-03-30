import path from "path"

export function getRelativeRoot(options) {
	let relRoot = options.input.replace(process.cwd(), "")
	if (relRoot[0] === path.sep) {
		relRoot = relRoot.slice(1, relRoot.length)
	}
	return relRoot
}
