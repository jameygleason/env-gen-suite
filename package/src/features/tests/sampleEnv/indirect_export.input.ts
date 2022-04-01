export const test = "true"

const shared = {
	BOTH: true,
}

const development = {
	...shared,
	TEST: test,
}

const production = {
	TEST: true,
	...shared,
}

const sharedPublic = {
	PUBLIC: true,
	// COMMENT: ""
}

const publicEnv = {
	development: {
		TEST: true,
		...sharedPublic,
		NUMBER: 29475,
	},
	production: {
		...sharedPublic,
		TEST: true,
		TEMPLATE: `${test}`,
		...sharedPublic,
	},
}

export default {
	development,
	production,
	publicEnv,
}
