// Generated file. Edit in .env.js
export const test = "true"

const development = {
	TEST: test,
}

const production = {
	TEST: true,
}

const publicEnv = {
	development: {
		TEST: true,
		NUMBER: 29475,
	},
	production: {
		TEST: true,
		TEMPLATE: `${test}`,
	},
}

export default {
	development,
	production,
	publicEnv,
}
