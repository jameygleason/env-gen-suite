// Generated file. Do not edit.
// Test
// Number 02398
// String "The string below me gets replaced because the reges matches colon string string (\: \" \") pattern"
// String: "I'm get striped away"

const shared = {
	PORT: 0,
	APP_SECRET: "",
	'123NUM_TEST': "",
};

const development = {
	...shared,
	NODE_ENV: "",
	FRONTEND_URL: "",
	TEST: "",
};

const production = {
	...shared,
	NODE_ENV: "",
};

const sharedPublic = {
	PUBLIC: false,
};

const publicVars = {
	development: {
		...sharedPublic,
		PUB_KEY: 0,
	},
	production: {
		...sharedPublic,
		PUB_KEY: 0,
	}
};

export default {
	development,
	production,
	publicVars
};
