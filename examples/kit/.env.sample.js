// Generated file. Edit in .env.js
// Test
// String "I don't get replaced, but the string below me gets replaced because it comes after a colon"
// String: ""
// Number 02398
// Number: 0
// Boolean true
// Boolean: false

const shared = {
	PORT: 0,
	APP_SECRET: "",
	'123NUM_TEST': ""
};

const development = {
	...shared,
	NODE_ENV: "",
	FRONTEND_URL: "",
	TEST: ""
};

const production = {
	...shared,
	NODE_ENV: ""
};

const sharedPublic = {
	PUBLIC: false
	// TODO: Handle template string templates
	// PRINT_STRING: ""
};

const publicVars = {
	development: {
		PUB_KEY: 0,
		...sharedPublic
	},
	production: {
		...sharedPublic,
		PUB_KEY: 0
	}
};

export default {
	development,
	production,
	publicVars
};
