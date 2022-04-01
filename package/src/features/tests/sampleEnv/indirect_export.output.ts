// Generated file. Do not edit.
export const test = ""

const shared = {
	BOTH: false,
}

const development = {
	...shared,
	TEST: test,
}

const production = {
	TEST: false,
	...shared,
}

const sharedPublic = {
	PUBLIC: false,
	// COMMENT: ""
}

const publicEnv = {
	development: {
		TEST: false,
		...sharedPublic,
		NUMBER: 0,
	},
	production: {
		...sharedPublic,
		TEST: false,
		TEMPLATE: "",
		...sharedPublic,
	},
}

export default {
	development,
	production,
	publicEnv,
}
