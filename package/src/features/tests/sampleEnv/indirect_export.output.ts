// Generated file. Edit in .env.js
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

const publicVars = {
	development: {
		TEST: false,
		...sharedPublic,
		NUMBER: 0,
		TEMPLATED_TEMPLATE: "",
		TERNARY: false ? "" : "",
		TERNARY_TWO: false ? "" : "",
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
	publicVars,
}
