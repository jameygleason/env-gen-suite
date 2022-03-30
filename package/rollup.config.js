// @ts-check
import fs from "fs"
import path from "path"
import module from "module"
import commonjs from "@rollup/plugin-commonjs"
import resolve from "@rollup/plugin-node-resolve"
import typescript from "@rollup/plugin-typescript"
import dts from "rollup-plugin-dts"
import filesize from "rollup-plugin-filesize"
import { rimraf } from "@signalchain/utils"

const pkg = JSON.parse(fs.readFileSync(path.join(process.cwd(), "package.json"), "utf8"))
if (Object.keys(pkg).length === 0) {
	console.error("Failed to parse package.json")
}

rimraf(path.join(process.cwd(), "dist"))
rimraf(path.join(process.cwd(), "types"))

const config = {
	external: [].concat(
		// @ts-ignore
		Object.keys(pkg.dependencies || {}),
		Object.keys(pkg.devDependencies || {}),
		Object.keys(pkg.peerDependencies || {}),
		module.builtinModules,
	),
	onwarn: (warning, onwarn) => onwarn(warning),
	watch: {
		clearScreen: false,
		exclude: ["node_modules", "dist", "types"],
	},
}

export default [
	{
		input: "src/main.ts",
		output: [
			{
				file: pkg.exports["."].import,
				format: "es",
				sourcemap: true,
				exports: "named",
			},
			{
				file: pkg.exports["."].import.replace(".js", ".mjs"),
				format: "es",
				sourcemap: true,
				exports: "named",
			},
			{
				file: pkg.exports["."].require,
				format: "cjs",
				sourcemap: true,
				exports: "named",
			},
		],
		plugins: [
			resolve({
				extensions: [".cjs", ".mjs", ".js", ".ts"],
			}),
			commonjs(),
			typescript(),
			filesize(),
		],
		...config,
	},
	{
		input: "src/main.ts",
		output: {
			file: pkg.exports["."].types,
			format: "es",
			sourcemap: true,
			exports: "named",
		},
		plugins: [typescript(), dts()],
		external: [].concat(
			Object.keys(pkg.dependencies || {}),
			Object.keys(pkg.devDependencies || {}),
			Object.keys(pkg.peerDependencies || {}),
			module.builtinModules,
		),
	},
	{
		input: "./src/generate.ts",
		output: [
			{
				file: pkg.exports["./generate"].import,
				format: "es",
				sourcemap: true,
				exports: "named",
			},
			{
				file: pkg.exports["./generate"].import.replace(".js", ".mjs"),
				format: "es",
				sourcemap: true,
				exports: "named",
			},
			{
				file: pkg.exports["./generate"].require,
				format: "cjs",
				sourcemap: true,
				exports: "named",
			},
		],
		plugins: [
			resolve({
				extensions: [".cjs", ".mjs", ".js", ".ts"],
			}),
			commonjs(),
			filesize(),
		],
		...config,
	},
]
