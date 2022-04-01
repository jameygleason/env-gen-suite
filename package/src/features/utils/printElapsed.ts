import { performance } from "perf_hooks"
import kleur from "kleur"

/**
 * Usage:
 * const start = performance.now()
 * <YOUR CODE>
 * printElapsed(start, "Build complete")
 */
export function printElapsed(start: number, msg: string): void {
	const end = performance.now()
	let elapsed = end - start
	let unit = "ms"
	if (elapsed >= 1000) {
		elapsed = elapsed * 0.001
		unit = "s"
	}
	console.log(`${kleur.blue(msg)} ${kleur.green("in")} ${kleur.blue(elapsed.toFixed(1))}${kleur.blue(unit)}`)
}
