import path from "path"

export type ConfigPaths = {
	input: string
	env: string
	sampleEnv: string
	publicEnv: string
}

export const paths: ConfigPaths = {
	input: path.join(process.cwd(), ".env.js"),
	env: path.join(process.cwd(), ".env"),
	sampleEnv: path.join(process.cwd(), ".env.sample.js"),
	publicEnv: path.join(process.cwd(), "src", "publicEnv.js"),
}
