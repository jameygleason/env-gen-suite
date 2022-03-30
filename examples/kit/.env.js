// Test
// Number 02398
// String "The string below me gets replaced because the reges matches colon string string (\: \" \") pattern"
// String: "I'm get striped away"

const shared = {
	PORT: 3000,
	APP_SECRET: 'bringadingdingdingdingdingdingdingdingdingdingdingdingdingdingding',
	'123NUM_TEST': 'test'
};

const development = {
	...shared,
	NODE_ENV: 'development',
	FRONTEND_URL: 'http://localhost:3000',
	TEST: 'value'
};

const production = {
	...shared,
	NODE_ENV: 'production'
};

const sharedPublic = {
	PUBLIC: true
};

const publicVars = {
	development: {
		...sharedPublic,
		PUB_KEY: 123
	},
	production: {
		...sharedPublic,
		PUB_KEY: 456
	}
};

export default {
	development,
	production,
	publicVars
};
