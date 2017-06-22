import Validation from "./../Validation";

describe('Validation', () => {
	describe('required', () => {
		it('required not value', () => {
			expect(() => {
				Validation(null).required();
			}).toThrowError();
		});

		it('value equal 0', () => {
			expect(Validation(0).required() instanceof Object).toBeTruthy();
		});

		it('value equal empty string', () => {
			expect(() => {
				Validation('').required();
			}).toThrowError();
		});
		it('value equal NaN', () => {
			expect(() => {
				Validation(NaN).required();
			}).toThrowError();
		});
		it('value equal number', () => {
			expect(Validation(10).required() instanceof Object).toBeTruthy();
			expect(Validation(-10).required() instanceof Object).toBeTruthy();
			expect(Validation(Infinity).required() instanceof Object).toBeTruthy();
			expect(Validation(-Infinity).required() instanceof Object).toBeTruthy();
		});
		it('value equal string', () => {
			expect(Validation("Hello World").required() instanceof Object).toBeTruthy();
		});
		it('value equal Date', () => {
			expect(Validation(new Date).required() instanceof Object).toBeTruthy();
		});
		it('value equal Function', () => {
			expect(Validation(() => {
				}).required() instanceof Object).toBeTruthy();
		});
		it('value eqal Object', () => {
			expect(Validation({}).required() instanceof Object).toBeTruthy();
		});
	});
	describe('string', () => {
		it('value equal empty string', function () {
			expect(Validation('').string() instanceof Object).toBeTruthy();
		});
		it('value equal  string', () => {
			expect(Validation('Hello').string() instanceof Object).toBeTruthy();
		});
		it('value equal number', () => {
			expect(() => {
				Validation(10).string();
			}).toThrowError();
		});
		it('value equal Date', () => {
			expect(() => {
				Validation(new Date).string();
			}).toThrowError();
		});
		it('value equal Function', () => {
			expect(() => {
				Validation(() => {}).string();
			}).toThrowError();
		});
		it('value equal Object', () => {
			expect(() => {
				Validation({}).string();
			}).toThrowError();
		});
	});
	describe('number', () => {
		it('value equal NaN', () => {
			expect(Validation(NaN).number() instanceof Object).toBeTruthy();
		});
		it('value equal Infinity', () => {
			expect(Validation(Infinity).number() instanceof Object).toBeTruthy();
		});
		it('value equal -Infinity', () => {
			expect(Validation(-Infinity).number() instanceof Object).toBeTruthy();
		});
		it('value equal negative number', () => {
			expect(Validation(-10).number() instanceof Object).toBeTruthy();
		});
		it('value equal 0', () => {
			expect(Validation(0).number() instanceof Object).toBeTruthy();
		});
		it('value equal string', () => {
			expect(() => {
				Validation('1').number();
			}).toThrowError();
		});
		it('value equal Function', () => {
			expect(() => {
				Validation(() => {
				}).number();
			});
		});
		it('value equal Date', () => {
			expect(() => {
				Validation(new Date).number();
			});
		});
		it('value equal Object', () => {
			expect(() => {
				Validation({}).number();
			});
		});
	});
});