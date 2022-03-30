import { getEnv } from "../utils/getEnv"
import type { Options } from "../main"

export async function generatePublicEnv(options: Options) {
	const env = await getEnv(options)
	console.log("env:", env)
}
