import fs from "fs"
import path from "path"
import module from "module"
import resolve from "@rollup/plugin-node-resolve"
import replace from "@rollup/plugin-replace"
import commonjs from "@rollup/plugin-commonjs"
import url from "@rollup/plugin-url"
import svelte from "rollup-plugin-svelte"
import { terser } from "rollup-plugin-terser"
import config from "sapper/config/rollup.js"
import sveltePreprocess from "svelte-preprocess"
import postcssPresetEnv from "postcss-preset-env"
import postcsseasings from "postcss-easings"
import purgecss from "@fullhuman/postcss-purgecss"
import cssnano from "cssnano"
import { isEmpty } from "@signalchain/utils/isEmpty"
import envVariables from "./.env.js"
import env from "@signalchain/rollup-plugin-env-gen"

const pkg = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "package.json"), "utf8"),
)
if (isEmpty(pkg)) console.error("Failed to parse package.json")

const mode = process.env.NODE_ENV
const dev = mode === "development"

const ENV_VARS = {}
const modes = Object.keys(envVariables)
const idx = modes.indexOf(mode)
const [_, envVars] = Object.entries(envVariables)[idx]
ENV_VARS["process.env.NODE_ENV"] = JSON.stringify(mode)

for (const [key, val] of Object.entries(envVars)) {
  ENV_VARS[`process.env.${key}`] = JSON.stringify(val)
}

/**
 * autoprefixer browserslist is in the package.json
 *
 * postcss-preset-env enables Stage 2 by default
 * https://preset-env.cssdb.org/features
 * https://www.npmjs.com/package/postcss-preset-env
 *
 * We are using the older syntax for :is()
 * Until :is() has better support, use :matches()
 *
 */
const postcssProdPlugins = !dev
  ? [
      purgecss({
        content: ["./src/**/*.svelte"],
      }),
      cssnano({
        preset: "default",
      }),
    ]
  : []

const preprocess = sveltePreprocess({
  scss: {
    includePaths: ["src"],
    sourceMap: dev,
  },
  postcss: {
    plugins: [
      postcsseasings(),
      postcssPresetEnv({
        autoprefixer: !dev,
        stage: 0,
        features: {
          "logical-properties-and-values": false,
          "prefers-color-scheme-query": false,
          "gap-properties": false,
        },
      }),
      ...postcssProdPlugins,
    ],
  },
})

const onwarn = (warning, onwarn) => {
  // if (warning.code === 'a11y-distracting-elements') return
  // if (warning.loc.file.match(/depd/gi)) return

  return (
    (warning.code === "MISSING_EXPORT" && /'preload'/.test(warning.message)) ||
    (warning.code === "CIRCULAR_DEPENDENCY" &&
      /[/\\]@sapper[/\\]/.test(warning.message)) ||
    onwarn(warning)
  )
}

const client = {
  input: config.client.input(),
  output: config.client.output(),
  plugins: [
    env(),
    replace({
      "process.browser": true,
      ...ENV_VARS,
      preventAssignment: true,
    }),
    svelte({
      preprocess,
      compilerOptions: {
        dev,
        hydratable: true,
      },
    }),
    url({
      sourceDir: path.resolve(__dirname, "src/node_modules/images"),
      publicPath: "/client/",
    }),
    resolve({
      browser: true,
      dedupe: ["svelte"],
    }),
    commonjs(),

    !dev &&
      terser({
        module: true,
      }),
  ],

  preserveEntrySignatures: false,
  onwarn,
  watch: {
    exclude: "./**/generated/**/*",
  },
}

const server = {
  input: config.server.input(),
  output: config.server.output(),
  plugins: [
    env({
      emitFiles: false,
    }),
    replace({
      "process.browser": false,
      ...ENV_VARS,
      preventAssignment: true,
    }),
    svelte({
      preprocess,
      emitCss: false,
      compilerOptions: {
        dev,
        generate: "ssr",
        hydratable: true,
      },
    }),
    url({
      sourceDir: path.resolve(__dirname, "src/node_modules/images"),
      publicPath: "/client/",
      emitFiles: false,
    }),
    resolve({
      dedupe: ["svelte"],
    }),
    commonjs(),
  ],
  external: [].concat(
    Object.keys(pkg.dependencies || {}),
    module.builtinModules,
  ),

  preserveEntrySignatures: "strict",
  onwarn,
  watch: {
    exclude: "./**/generated/**/*",
  },
}

// const serviceworker = {
//   input: config.serviceworker.input(),
//   output: config.serviceworker.output(),
//   plugins: [
//     resolve(),
//     replace({
//       'process.browser': true,
//       ...ENV_VARS,
//     }),
//     commonjs(),
//     !dev && terser(),
//   ],
//   preserveEntrySignatures: false,
//   onwarn,
// }

const configuration = {
  client,
  server,
  // serviceworker,
}

export default configuration
