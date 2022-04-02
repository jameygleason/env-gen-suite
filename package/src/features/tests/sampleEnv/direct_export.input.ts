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
			TEMPLATED_TEMPLATE: "%`${window.location.host}`%",
		},
		production: {
			TEST: true,
			TEMPLATE: `${"test"}`,
		},
	},
}
