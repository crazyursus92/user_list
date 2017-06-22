import _ from 'underscore';
import $ from 'jquery';

class Validation{
	constructor(value, name = '', element = null){
		this.value = value;
		this.name = name;
		this.element = element ? $(element) : null;
		this.rules = {};
	}


	required(){
		if(_.isNumber(this.value) && this.value === 0){
			return this;
		}
		if(!this.value){
			let message = this.name ? `${this.name} обязательное поле`: 'не найдено обязательное поле';
			if(this.element){
				this.element.trigger('validation-error', 'required', 'обязательное поле');
			}
			throw new Error(message);
		}
		return this;
	}
	string(){
		if(!_.isString(this.value)){
			let message = this.name ? `${this.name} не строка`: 'значение не являеться строкой';
			if(this.element){
				this.element.trigger('validation-error', 'string', ' не строка');
			}
			throw new Error(message);
		}
		return this;
	}
	number(){
		if(!_.isNumber(this.value)){
			let message = this.name ? `${this.name} не является числом`: 'значение не является числом';
			this.element.trigger('validation-error', 'number', ' не являеться числом');
			throw new Error(message);
		}
		return this;
	}
}
/**
 *
 * @param value
 * @param name
 * @param element
 * @return {Validation}
 */
export default (value, name, element) => {

	return new Validation(value, name, element);
}


