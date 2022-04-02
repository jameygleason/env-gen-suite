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
			TERNARY: true ? "%`http://${window.location.host}`%" : "http://localhost:3000",
			TERNARY_TWO: true ? '%`http://${window.location.host.split(":")[0]}:4001`%' : "http://localhost:3001",
		},
		production: {
			TEST: true,
			TEMPLATE: `${"test"}`,
		},
	},
}
