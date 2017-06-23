import $ from "jquery";
const ajax_mock = {

	done: (param1, param2, param3) => {
		$.ajax = () => {
			let def = {
				done: (func) => {func.call(null, param1, param2, param3);return this;},
				fail: (func) => {func.call(null, param1, param2, param3);return this;},
			};
			setTimeout(() => {
				def.done();
			}, 50);
			return def;
		};
	},
	fail: () => {
		$.ajax = (param1, param2, param3) => {
			let def = {
				done: (func) => {func.call(null, param1, param2, param3);return this;},
				fail: (func) => {func.call(null, param1, param2, param3);return this;},
			};
			setTimeout(() => {
				def.fail();
			}, 50);
			return def;
		};
	}
};
export  default ajax_mock;