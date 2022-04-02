export default {
	TEST: true,
	STRING: "hi",
	NUMBER: 123,
	TEMPLATE: "%window.location.host%",
	TERNARY: "%`http://${window.location.host}`%",
	TERNARY_TWO: '%`http://${window.location.host.split(":")[0]}:4001`%'
}
