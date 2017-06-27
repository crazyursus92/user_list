import React, {Component} from "react";
import userModel from "./../model/UserModel";
import Input from './Input';

export default class Login extends Component {

	constructor() {
		super();
		this.state = {
			username: '',
			password: '',
			errors: {}
		};
		this._isMounted = false;

	}
	_changeInput(e){
		if(this._isMounted) {
			let name = e.target.getAttribute('name');
			this.setState({
				[name]: e.target.value
			});
		}
	}
	componentDidMount(){
		userModel.getCurrentUser().then((user) => {
			if(user.id){
				this.props.history.push('/');
			}
		});
		this._isMounted = true;
	}
	componentWillUnmount(){
		this._isMounted = false;
	}
	submit(e) {
		e.preventDefault();
		userModel.login(this.state.username, this.state.password).then((data) => {
			if(data && data.status === 'success') {
				this.props.history.push('/');
			}else if(data.status === 'error' && data.code === 200){
				this.setState({
					errors: data.response
				});
			}
		});
	}

	render() {
		return (
			<div className="col-md-6 col-md-offset-3 ">
				<div className="panel panel-default ">
					<div className="panel-heading text-center">Authorization</div>

					<div className="panel-body ">
						<form className="form-horizontal" onSubmit={this.submit.bind(this)}>
							<Input  type="text"
							        onChange={this._changeInput.bind(this)}
							        required name="username"
							        label="Username"
							        maxLength={32}
							        placeholder="Username"
							        value={this.state.username}
							        error={this.state.errors['username']}
							/>
							<Input  type="password"
							        onChange={this._changeInput.bind(this)}
							        label="Password"
							        name="password"
							        placeholder="Password"
							        required
							        value={this.state.password}
							        error={this.state.errors['password']}
							/>
							<div className="col-sm-9 col-sm-offset-3">
								<button className="btn btn-success">Send</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}