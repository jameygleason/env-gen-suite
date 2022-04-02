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
		TEMPLATED_TEMPLATE: "%`${window.location.host}`%",
		TERNARY: true ? "%`http://${window.location.host}`%" : "http://localhost:3000",
		TERNARY_TWO: true ? '%`http://${window.location.host.split(":")[0]}:4001`%' : "http://localhost:3001",
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
