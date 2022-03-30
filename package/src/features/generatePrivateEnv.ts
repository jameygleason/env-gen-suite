import { getEnv } from "../utils/getEnv"
import type { Options } from "../main"

export async function generatePrivateEnv(options: Options) {
	const env = await getEnv(options)
	console.log("env:", env)
}
