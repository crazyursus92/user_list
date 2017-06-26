import React, {Component} from "react";
import _ from 'underscore';
import {Form} from "formsy-react";
import {Checkbox,  Input} from "formsy-react-components";
import UserToolbar from "./UserToolbar";
import userModel from "./../model/UserModel";
import toast from './../helpers/Toast';
import User from './../model/User';

export default class UserPage extends Component {
	constructor(route_data) {
		super();
		this.state = {
			user: {},
			errors: {}
		};
		this.next_step_user_id = 0;
		this.reset_form = false;
		if (route_data.match.params.id && route_data.match.params.id !== 'create') {
			let id = +route_data.match.params.id;
			this.next_step_user_id = id;
			this.state = {
				user: {},
				errors: {}
			};
			this._getUser(id);
		}
	}

	_getUser (id){
		userModel.get(id).then((data) => {
			if(data.status === 'success') {
				this.setState({user: data.response, errors: {}});
			}else{
				this.setState({errors: data.response});
			}
		});
	}

	/**
	 * Обновляем текущий user_id и запрашиваем этого пользователя если  новый user_id отличается от текущего
	 * @param nextProps
	 * @param nextState
	 */
	componentWillUpdate(nextProps, nextState){
		window.uprefs = this.refs;
		let new_id = !isNaN(+nextProps.match.params.id) ? +nextProps.match.params.id : nextProps.match.params.id;
		if ( nextProps.match.params.id && new_id !== this.next_step_user_id) {
			this.next_step_user_id = new_id;
			if(new_id === 'create') {
				let user = new User({});

				this.setState({
					user: user
				});
				this.reset_form =  true;

			}else{
				this._getUser(new_id);
			}
		}
	}

	/**
	 * Топор на отчистку формы если у мы переходим со страницы пользователя на страницу создания пользователя
	 */
	componentDidUpdate(){
		if(this.reset_form && this.refs){
			this.reset_form = false;
			setTimeout(() => {
				if(this.state.user.id === 'create') {
					this.refs.username.setValue('');
					this.refs.password.setValue('');
					this.refs.retype_password.setValue('');
					this.refs.first_name.setValue('');
					this.refs.last_name.setValue('');
					this.refs.type.setValue(false);
					this.refs.form.reset({});
				}
			}, 100);
		}
	}

	_submit(values, reset, invalid) {

		let validate_password = this._validatePassword(values.password, values.retype_password);

		if(_.isString(validate_password)){
			invalid({
				retype_password: validate_password
			});
			return;
		}

		if (validate_password) {
			values.type = values.type ? 1 : 2;
			if (this.state.user.id) {
				this._update(values);
			} else {
				this._create(values);
			}
		}
	}
	_update (values){
		userModel.update(this.state.user.id, values.first_name, values.last_name, values.username, values.password || null, values.type || null).then((data) => {
			if (data.status === 'success') {
				this.setState({
					user: data.response,
					errors: {}
				});
				toast.success('User updated');

			} else if (data.status === 'errors') {
				let errors = this.state.errors;
				_.extend(errors, data.response);
				this.setState({
					errors: errors
				});
			}
		});
	}
	_create (values){
		userModel.create(values.first_name, values.last_name, values.username, values.password || null, values.type || null).then((data) => {
			if(data.status === 'error'){
				this.setState({
					errors: data.response
				});
			}else{
				this.setState({
					errors: {}
				});
				this.props.history.push('/user/' + data.response.id);
				toast.success('User created');
			}
		});
	}
	_validatePassword(password, retypePassword) {
		let state;
		if (this.state.user.id) {
			if (!password) {
				return true;
			}
			state = password === retypePassword;
		}else {
			state = !!password && password === retypePassword;
		}
		if(!state){
			return 'Passwords do not match';
		}
		return state;
	}

	_isErrors(){
		return !_.isEmpty(this.state.errors);
	}

	render() {
		return (
			<div>
				<UserToolbar/>
				<div className="col-md-offset-3 col-md-6">
					<div className="panel panel-default">
						<div className="panel-body">


							<div className="panel panel-default" hidden={!this._isErrors()}>
								<div className="panel-body danger">
									<ol>
										{
											Object.keys(this.state.errors).map((item) => {
												return (
													<li key={item}>{this.state.errors[item]}</li>
												);
											})
										}
									</ol>
								</div>
							</div>
							<Form onSubmit={this._submit.bind(this)} ref="form">
								<Input ref="username" type="text" className="form-control" required name="username" label="Username"
								       placeholder="Username" value={this.state.user.username}/>
								<Input ref="password" type="password" className="form-control" label="Password" name="password"
								       placeholder="Password" required={!this.state.user.id} />
								<Input ref="retype_password" type="password" className="form-control" label="Retype password"
								       name="retype_password" placeholder="Retype password" required={!this.state.user.id} />
								<Input ref="first_name" type="text" className="form-control" required name="first_name"
								       label="First Name" placeholder="First Name" value={this.state.user.first_name}/>
								<Input ref="last_name" type="text" className="form-control" required name="last_name" label="Last name"
								       placeholder="Last Name" value={this.state.user.last_name}/>
								<Checkbox ref="type" type="checkbox"  name="type" label="Manager"
								          value={this.state.user.type === 1}/>
								<div className="col-sm-9 col-sm-offset-3">
									<button className="btn btn-success">Send</button>
								</div>
							</Form>
						</div>
					</div>
				</div>
			</div>
		);
	}
};