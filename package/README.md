# @signalchain/rollup-plugin-env-gen

Works with Rollup and Vite

## Install

`npm i -D npm i @signalchain/rollup-plugin-env-gen`

## Use

```javascript
plugins: [envGen(Options)]
```

```typescript
type Options = {
	mode: string
	input: string
	envOutput: string
	sampleOutput: string
	publicOutput: string
	watch: boolean
}
```

## .gitignore

If you don't want to commit your secrets to git, add the following to your `.gitignore`

```txt
# dotenv environment variables files
.env
.env*
!.env.sample
```

This says, "don't commit `.env` or `.env<any other text>`, but do commit `.env.sample`"
