// Test
// String "I don't get replaced, but the string below me gets replaced because it comes after a colon"
// String: "I'm get striped away"
// Number 02398
// Number: 02398
// Boolean true
// Boolean: true

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
	PUBLIC: true,
	// COMMENT: test
	PRINT_STRING: '%`http://${window.location.host}`%'
};

const publicVars = {
	development: {
		PUB_KEY: 123,
		...sharedPublic,
		TEMPLATE: '%window.location.host%',
		TERNARY: true ? '%`http://${window.location.host}`%' : 'http://localhost:3000',
		TERNARY_TWO: true
			? '%`http://${window.location.host.split(":")[0]}:4001`%'
			: 'http://localhost:3001'
	},
	production: {
		...sharedPublic,
		PUB_KEY: 456,
		TEMPLATE: '%window.location.host%'
	}
};

export default {
	development,
	production,
	publicVars
};
