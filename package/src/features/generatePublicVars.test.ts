import fs from "fs"
import path from "path"
import { describe, it, assert } from "vitest"
import { parseEnv } from "./utils/parseEnv"

const tests = [{ file: "direct_export" }]

describe("Generate Public Vars Output", () => {
	it("Generates public vars output as string", () => {
		for (const { file } of tests) {
			let input = fs.readFileSync(
				path.join(process.cwd(), "src", "features", "tests", "publicEnv", `${file}.input.ts`),
				"utf8",
			)

			let output = fs.readFileSync(
				path.join(process.cwd(), "src", "features", "tests", "publicEnv", `${file}.output.ts`),
				"utf8",
			)

			const data = parseEnv(".env.js", input, true)
			assert.strictEqual(data, output)
		}
	})
})
