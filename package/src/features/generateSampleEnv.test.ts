import fs from "fs"
import path from "path"
import { describe, it, assert } from "vitest"
import { parseEnv } from "./utils/parseEnv"

const tests = [{ file: "direct_export" }, { file: "indirect_export" }]

describe("Generate Sample Env Output", () => {
	it("Generates sample env output as string", () => {
		for (const { file } of tests) {
			let input = fs.readFileSync(
				path.join(process.cwd(), "src", "features", "tests", "sampleEnv", `${file}.input.ts`),
				"utf8",
			)

			let output = fs.readFileSync(
				path.join(process.cwd(), "src", "features", "tests", "sampleEnv", `${file}.output.ts`),
				"utf8",
			)

			const data = parseEnv(input, false)
			assert.strictEqual(data, output)
		}
	})
})
