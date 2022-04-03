# @signalchain/rollup-plugin-env-gen

Config based generation of a `.env` and public variables file. Manage your environment secrets and public application variables from a single JavaScript file.

Works with Rollup and Vite.

## Install

`npm i -D @signalchain/rollup-plugin-env-gen`

## Sample Env

Optionally generate a modified version of the source file and produce a `.sample` file. (This is the default, but can be turned off by setting `samplePath` to false.) The sample file is identical to the input file with the exception that variables and secrets are converted to the zero value of their type.

For example:

- "Hello world!" ➡ ""
- 12345 ➡ 0
- true ➡ false

## Public Vars

Public variables, such as those used in client side applications, will be generated only if the exported object has a `publicVars` field. There is a clear boundary at build time between `publicVars` and all other fields. That said, if you import secrets into client side code, they are visible to anyone who wants to poke at the source. So only include variables that are meant to be public in the `publicVars` object.

### Runtime Template Variables

For runtime template strings in Public Env, wrap your template string like this ➡ `"%`YOUR_TEMPLATE_STRING`%"`. Wrapping is required to keep the template string from being evaluated at build time. This feature only makes sense for public vars, so any template string outside of the `publicEnv` object will be evaluated at build time.

## Use

```typescript
export type Options = {
	mode?: string // process.env.NODE_ENV
	inputPath?: string // [PROJECT_ROOT]/.env.js
	envPath?: string // [PROJECT_ROOT]/.env
	samplePath?: string | boolean // [PROJECT_ROOT]/.env.sample.js
	publicPath?: string // [PROJECT_ROOT]/src/publicEnv.js
	watch?: boolean // true (WIP)
}

// rollup.config.js || vite.config.js
plugins: [envGen(Options)]
```

The `inputPath` defaults to `[PROJECT_ROOT]/.env.js`. That file exports a default object with a set of keys that will be used to match the `mode` option on build. If the `publicVars` key is in the exported object from the `inputPath`, it will generate a `publicEnv.js` file at the `publicPath`. (Defaults to `[PROJECT_ROOT]/src/publicEnv.js`.)

## Example

```js
// .env.js

const shared = {
	BOTH: true,
}

const development = {
	...shared,
	TEST: true,
}

const production = {
	...shared,
	TEST: false,
}

const sharedPublic = {
	PUBLIC: true,
}

const publicVars = {
	development: {
		...sharedPublic,
		TEMPLATED_TEMPLATE: "%`${window.location.host}`%",
	},
	production: {
		...sharedPublic,
	},
}

export default {
	development,
	production,
	publicVars,
}
```

## .gitignore

If you don't want to commit your secrets to git, add the following to your `.gitignore`

```txt
# environment variables files
.env
.env*
!.env.sample.js
```

This says, "don't commit `.env` or `.env<any other text>`, but do commit `.env.sample.js`"
