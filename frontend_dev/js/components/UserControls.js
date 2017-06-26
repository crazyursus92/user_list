import React, {Component} from "react";
import userModel from "./../model/UserModel";
import User from "./../model/User";
import UserControlsManager from "./UserControlsManager";
import UserControlsUser from "./UserControlsUser";
import MountedComponent from './MountedComponent';

export  default  class UserControls extends MountedComponent {
	constructor() {
		super();
		this.state = {
			current_user: new User({})
		};
		this._getCurrentUser();
		this._listener();
	}
	
	_listener(){
		userModel.on('current-user-change', this._getCurrentUser.bind(this));
	}

	_getCurrentUser() {
		userModel.getCurrentUser().then((user) => {
			if(this.isMounted) {
				this.setState({
					current_user: user
				});
			}else{
				this.state = {
					current_user: user
				};
			}
		});
	}

	render() {
		if (this.state.current_user.isManager()) {
			return (
				<td>
					<UserControlsManager id={this.props.id}/>
				</td>
			);
		} else {
			return (
				<UserControlsUser id={this.props.id}/>
			);
		}
	}
}