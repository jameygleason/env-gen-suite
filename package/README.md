# @signalchain/rollup-plugin-env-gen

Works with Rollup and Vite

## Install

`npm i -D npm i @signalchain/rollup-plugin-env-gen`

## Use

```typescript
export type Options = {
	mode?: string
	inputPath?: string
	envPath?: string
	samplePath?: string | boolean
	publicPath?: string
	watch?: boolean
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
	TEST: false,
	...shared,
}

const sharedPublic = {
	PUBLIC: true,
}

const publicEnv = {
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
	publicEnv,
}
```

The `inputPath` defaults to `[PROJECT_ROOT]/.env.js`. That file exports a default object with a set of keys that will be used to match the `mode` option on build.

`publicEnv` is a special key name. If it is present it will generate a `publicEnv.js` file at the `publicPath` option path location. Defaults to `[PROJECT_ROOT]/src/publicEnv.js`.

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
