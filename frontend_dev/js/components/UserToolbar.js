import React, {Component} from "react";
import userModel from "./../model/UserModel";
import User from "./../model/User";
import UserToolbarUser from "./UserToolbarUser";
import UserToolbarManager from "./UserToolbarManger";

export default class UserToolbar extends Component {

	constructor() {
		super();
		this.state = {
			current_user: new User({})
		};
		this._getCurrentUser = this._getCurrentUser.bind(this);
	}
	componentDidMount(){
		this._getCurrentUser();
		userModel.on('current-user-change', this._getCurrentUser);
	}
	componentWillUnmount(){
		userModel.off('current-user-change', this._getCurrentUser);
	}

	_getCurrentUser() {
		userModel.getCurrentUser().then((user) => {
				this.setState({
					current_user: user
				});
		});
	}

	render() {
		return (
			<nav className="navbar navbar-default">
				<div className="container-fluid">
					<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
						{(() => {
							if (this.state.current_user.isManager()) {
								return (
									<UserToolbarManager/>
								);
							} else {
								return (
									<UserToolbarUser/>
								);
							}
						})()}
					</div>
				</div>
			</nav>
		);
	}
}