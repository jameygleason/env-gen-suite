import fs from "fs"
import path from "path"
import module from "module"
import commonjs from "@rollup/plugin-commonjs"
import resolve from "@rollup/plugin-node-resolve"
import typescript from "rollup-plugin-typescript2"
import filesize from "rollup-plugin-filesize"
import { rimraf } from "./rimraf.js"

const pkg = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "package.json"), "utf8"),
)
if (Object.keys(pkg).length === 0) console.error("Failed to parse package.json")

const tsOptions = {
  check: !!process.env.TS_CHECK_ENABLED,
  tsconfig: "tsconfig.json",
  useTsconfigDeclarationDir: true,
}

rimraf(path.join(process.cwd(), "dist"))
rimraf(path.join(process.cwd(), "typings"))

const config = {
  plugins: [
    resolve({
      extensions: [".cjs", ".mjs", ".js", ".ts"],
    }),
    commonjs(),
    typescript(tsOptions),
  ],
  external: [].concat(
    Object.keys(pkg.dependencies || {}),
    Object.keys(pkg.devDependencies || {}),
    Object.keys(pkg.peerDependencies || {}),
    module.builtinModules,
  ),
  onwarn: (warning, onwarn) =>
    warning.code === "CIRCULAR_DEPENDENCY" && onwarn(warning),
  watch: {
    clearScreen: false,
    exclude: [
      "node_modules",
      "dist",
      "typings",
      "utils",
      "**/*.map",
      "**/*.d.ts",
    ],
  },
}

export default [
  {
    input: "./src/main.ts",
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
      {
        file: `${pkg.exports["."].require}.js`,
        format: "cjs",
        sourcemap: true,
        exports: "named",
      },
    ],
    ...config,
    plugins: [...config.plugins, filesize()],
  },
  {
    input: "./src/runEnvGen.js",
    output: [
      {
        file: "./dist/runEnvGen.js",
        format: "es",
        sourcemap: true,
        exports: "named",
      },
    ],
    ...config,
    plugins: [...config.plugins, filesize()],
  },
]
