export default {
	development: {
		TEST: true,
	},
	production: {
		TEST: true,
	},
	publicEnv: {
		development: {
			TEST: true,
			NUMBER: 29475,
		},
		production: {
			TEST: true,
			TEMPLATE: `${"test"}`,
		},
	},
}
