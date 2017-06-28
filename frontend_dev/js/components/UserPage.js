import React, {Component} from "react";
import Input from "./Input";
import Checkbox from "./Checkbox";
import UserToolbar from "./UserToolbar";
import userModel from "./../model/UserModel";
import toast from "./../helpers/Toast";
import User from "./../model/User";

export default class UserPage extends Component {
	constructor(route_data) {
		super();
		this.state = {
			user: new User(),
			errors: {}
		};
		this.new_user_id = 0;
		this.current_user = new User();
		this._isMounted = false;
		if (route_data.match.params.id && route_data.match.params.id !== 'create') {
			this.new_user_id = +route_data.match.params.id;
		}else if(route_data.match.params.id === 'create'){
			this.new_user_id = route_data.match.params.id;
		}else{
			toast.error('Page not found');
			this.props.history.push('/');
		}

		this._currentUserAccess = this._currentUserAccess.bind(this);

	}

	componentDidMount() {
		this._currentUserAccess();
		this._isMounted = true;
		userModel.on('current-user-change', this._currentUserAccess);
		this.props.history.listen(() => {
			if (this.props.match.params.id === 'create') {
				this._clearUser();
			}
		});
	}

	componentWillUnmount() {
		this._isMounted = false;
		userModel.off('current-user-change', this._currentUserAccess);
	}

	_clearUser() {
		if (this._isMounted) {
			this.setState({
				user: new User(),
				errors: {}
			});
		}
	}

	_currentUserAccess() {
		userModel.getCurrentUser().then((current_user) => {
			if (!current_user.id) {
				return;
			}
			if (!current_user.isManager()) {
				toast.error('Forbidden');
				this.props.history.push('/');
			} else if (current_user.id === this.new_user_id) {
				toast.error('You can not edit yourself');
				this.props.history.push('/');
			} else if (this.new_user_id && this.new_user_id !== 'create') {
				this._getUser(this.new_user_id);
			}

		});
	}

	_getUser(id) {
		userModel.get(id).then((data) => {
			if (data.status === 'success') {
				this.setState({user: new User(data.response), errors: {}});
			} else if (data.code === 200) {
				this.setState({errors: data.response});
			} else {
				this.props.history.push('/');
			}
		});
	}

	/**
	 * Обновляем текущий user_id и запрашиваем этого пользователя если новый user_id отличается от текущего
	 * @param nextProps
	 * @param nextState
	 */
	componentWillUpdate(nextProps, nextState) {
		let new_id = !isNaN(+nextProps.match.params.id) ? +nextProps.match.params.id : nextProps.match.params.id;
		if (nextProps.match.params.id && new_id !== this.new_user_id) {
			this.new_user_id = new_id;
			if (new_id === 'create') {
				this._clearUser();
			} else {
				this._getUser(new_id);
			}
		}
	}


	_submit(e) {
		e.preventDefault();
		let values = this.state.user.toJSON();
		if (this._validatePassword(values.password, values.retype_password)) {

			if (this.state.user.id) {
				this._update(values);
			} else {
				this._create(values);
			}
		}
	}

	_update(values) {
		userModel.update(this.state.user.id, values.first_name, values.last_name, values.username, values.password || null, values.type || null).then((data) => {
			if (data.status === 'success') {
				this.setState({
					user: new User(data.response),
					errors: {}
				});
				toast.success('User updated');

			} else if (data.status === 'error' && data.code === 200) {
				this.setState({
					errors: data.response
				});
			} else {
				this.props.history.push('/');
			}
		});
	}

	/**
	 *
	 * @param {} values
	 * @private
	 */
	_create(values) {
		userModel.create(values.first_name, values.last_name, values.username, values.password || null, values.type || null).then((data) => {
			if (data.status === 'error' && data.code === 200) {
				this.setState({
					errors: data.response
				});
			} else {
				this.setState({
					errors: {}
				});
				this.props.history.push('/list');
				toast.success('User created');
			}
		});
	}

	/**
	 * Валидация пароля
	 * Если мы создаем пользователя то проверяем пароли на равенство.
	 * Если мы обновляем пользователя то тогда проверяем на то что пароль есть (изменился) и пароли равны.
	 * В случие отрицательного результата проверки выводим сообщение
	 * @param password
	 * @param retypePassword
	 * @return {Boolean}
	 * @private
	 */
	_validatePassword(password, retypePassword) {
		let state;
		if (this.state.user.id) {
			if (!password) {
				return true;
			}
			state = password === retypePassword;
		} else {
			state = !!password && password === retypePassword;
		}
		if (!state) {
			this.setState({
				errors: {
					retype_password: 'Passwords do not match'
				}
			});
		}
		return state;
	}

	/**
	 * Обновляем состояние компонента при изменении инпута
	 * Если у инпута имя "type" значит это чекбокс и мы в выставляем значения типа пользователя в зависимости от checked
	 * @param {Event} e
	 * @private
	 */
	_changeInput(e) {
		let name = e.target.getAttribute('name'),
			user = this.state.user;

		if (name === 'type') {
			user[name] = !e.target.value || e.target.value === 'false' ? 1 : 2;
		} else {
			user[name] = e.target.value;
		}

		this.setState({
			user: user
		});
	}

	render() {
		return (
			<div>
				<UserToolbar/>
				<div className="col-md-offset-3 col-md-6">
					<div className="panel panel-default">
						<div className="panel-body">

							<form className="form-horizontal" onSubmit={this._submit.bind(this)}>
								<Input type="text"
								       onChange={this._changeInput.bind(this)}
								       required name="username"
								       label="Username"
								       maxLength={32}
								       placeholder="Username"
								       value={this.state.user.username}
								       error={this.state.errors['username']}
								/>
								<Input type="password"
								       onChange={this._changeInput.bind(this)}
								       label="Password"
								       name="password"
								       placeholder="Password"
								       required={!this.state.user.id}
								       value={this.state.user.password}
								       error={this.state.errors['password']}
								/>
								<Input type="password"
								       onChange={this._changeInput.bind(this)}
								       label="Retype password"
								       name="retype_password"
								       placeholder="Retype password"
								       required={!this.state.user.id}
								       value={this.state.user.retype_password}
								       error={this.state.errors['retype_password']}
								/>
								<Input type="text"
								       onChange={this._changeInput.bind(this)}
								       required
								       name="first_name"
								       maxLength={32}
								       label="First Name"
								       placeholder="First Name"
								       value={this.state.user.first_name}
								       error={this.state.errors['first_name']}
								/>
								<Input type="text"
								       onChange={this._changeInput.bind(this)}
								       required
								       name="last_name"
								       maxLength={32}
								       label="Last name"
								       placeholder="Last Name"
								       value={this.state.user.last_name}
								       error={this.state.errors['last_name']}
								/>
								<Checkbox
									onChange={this._changeInput.bind(this)}
									name="type"
									label="Manager"
									placeholder="Manager"
									value={this.state.user.isManager()}
									error={this.state.errors['type']}
								/>
								<div className="col-sm-9 col-sm-offset-3">
									<button
										className="btn btn-success">{ this.state.user.id ? 'Save' : 'Create'}</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
};