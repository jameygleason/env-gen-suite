# @signalchain/rollup-plugin-env-gen

Works with Rollup and Vite

## Install

`npm i -D @signalchain/rollup-plugin-env-gen`

## Use

```typescript
export type Options = {
	mode?: string // process.env?.NODE_ENV
	inputPath?: string // [PROJECT_ROOT]/.env.js
	envPath?: string // [PROJECT_ROOT]/.env
	samplePath?: string | boolean // [PROJECT_ROOT]/.env.sample.js
	publicPath?: string // [PROJECT_ROOT]/src/publicEnv.js
	watch?: boolean // true
}

// rollup.config.js || vite.config.js
plugins: [envGen(Options)]
```

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

The `inputPath` defaults to `[PROJECT_ROOT]/.env.js`. That file exports a default object with a set of keys that will be used to match the `mode` option on build.

`publicVars` is a special key name. If it is present it will generate a `publicEnv.js` file at the `publicPath` option path location. Defaults to `[PROJECT_ROOT]/src/publicEnv.js`.

For runtime template strings in Public Env, wrap your template string with `"%`YOUR_TEMPLATE_STRING`%"`. Wrapping is required to keep the template string from being evaluated at build time. This feature only makes sense for the public env feature, so any template string outside of the `publicEnv` object will be evaluated at build time.

## .gitignore

If you don't want to commit your secrets to git, add the following to your `.gitignore`

```txt
# dotenv environment variables files
.env
.env*
!.env.sample
```

This says, "don't commit `.env` or `.env<any other text>`, but do commit `.env.sample`"
