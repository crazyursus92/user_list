import validation from './../modeuls/Validation';

class  ControlValidate {
	validate(e){
		let val = e.target.value;
		let error = false;
		try {
			let validate = validation(val);
			if (e.target.hasAttributes('required')) {
				validate.required();
			}
			let rules = e.target.getAttribute('data-validate-rules');
			this._validateByRules(validate, rules);
		}catch (err){
			error = err;
			e.target.parentElement.classList.add('has-error');
		}
		if(!error){
			e.target.parentElement.classList.remove('has-error');
			e.target.parentElement.classList.add('has-success');
		}
	}
	_validateByRules(validate, rules){
		if(rules){
			rules = rules.split(' ');
			let rules_array = [];
			rules.map((rule) => {
				if(rule && rule.trim()){
					rules_array.push(rule);
				}
			});
			if(rules_array.length){
				rules_array.map((rule) => {
					if(validate[rule]){
						validate[rule]();
					}
				});
			}
		}
	}
}
const validate = new ControlValidate();
export default validate;