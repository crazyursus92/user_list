import Model from './../model/Model';

describe('Model', () => {
	describe('constructor', () => {
		it('field api is define', () => {
			let model = new Model();
			expect(model.api).toBeDefined();
		});
	});
});