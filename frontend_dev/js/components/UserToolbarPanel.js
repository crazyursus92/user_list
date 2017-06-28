import React, {Component} from "react";
import userModel from "./../model/UserModel";
import User from "./../model/User";

export default class UserToolbarPanel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			current_user: new User()
		};
		this._isMount = false;
		this._getCurrentUser = this._getCurrentUser.bind(this);

	}
	componentDidMount(){
		this._isMount  = true;
		this._getCurrentUser();
		userModel.on('current-user-change', this._getCurrentUser);
	}
	componentWillUnmount(){
		this._isMount  = false;
		userModel.off('current-user-change', this._getCurrentUser);
	}
	_getCurrentUser() {
		userModel.getCurrentUser().then((user) => {
			if(this._isMount) {
				this.setState({
					current_user: user
				});
			}
		});
	}
	click(e) {
		e.preventDefault();
	}

	render() {
		return (
			<li ><a
				onClick={this.click.bind(this)}>{this.state.current_user.first_name} {this.state.current_user.last_name}</a>
			</li>
		)
	}
}