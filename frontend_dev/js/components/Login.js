import React, {Component} from "react";
import $ from 'jquery';
import {Redirect} from "react-router-dom";
import userModel from './../model/UserModel';
import controlValidate from './../mixins/controlValidation';

export default class Login extends Component {

	constructor(){
		super();

		this.state = {
			login_complete: false
		};

	}

	submit (e){
		e.preventDefault();
		let invalid_items = e.target.getElementsByClassName('has-error');
		if(!invalid_items.length){
			let form_data = this._getFormData(e.target);
			userModel.login(form_data.username, form_data.password).then((data) => {
				this.setState({
					login_complete: true
				});
			});
		}
	}
	_getFormData (form) {
		let result = {};
		 $(form).find('input, select, textarea').each((index, input) => {
		 	result[input.getAttribute('name')] = input.value;
		 });
		return result;
	}
	_controlValidate(e){
		controlValidate.validate(e);
	}
	render() {
		return (
			<div className="col-md-6 col-md-offset-3 ">
				{(() => {
					if(this.state.login_complete){
						return (
							<Redirect to="/"/>
						);
					}
				})()}
				<div className="panel panel-default ">
					<div className="panel-heading text-center">Authorization</div>

					<div className="panel-body ">
						<form onSubmit={this.submit.bind(this)}>
							<div className="form-group">
								<label htmlFor="username">Username</label>
								<input type="text" className="form-control" name="username" id="username" onBlur={this._controlValidate} required placeholder="Username"/>
							</div>
							<div className="form-group">
							<label htmlFor="password">Password</label>
								<input type="password" id="password" name="password" className="form-control" onBlur={this._controlValidate} required placeholder="Password"/>
							</div>

								<div className="form-group text-center">
									<button className="btn btn-success" type="submit">Send</button>
								</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}