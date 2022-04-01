import path from "path"

export function getRelativeRoot(inputPath: string): string {
	let relRoot = inputPath.replace(process.cwd(), "")
	if (relRoot[0] === path.sep) {
		relRoot = relRoot.slice(1, relRoot.length)
	}
	return relRoot
}
