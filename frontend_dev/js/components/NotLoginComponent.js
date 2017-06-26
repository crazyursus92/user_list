import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import userModel from "./../model/UserModel";
/**
 * TODO проверить необхоимость данного компонента - уже отключил если будет работать нормально то выкидываем его
 */

export default class NotLoginComponent extends Component{
	constructor(){
		super();
		this.state = {
			current_user: null
		};
		this._getCurrentUser();
	}
	_listener(){
		userModel.on('current-user-change-access', this._userChange.bind(this));
		userModel.on('api-error', this._userChange.bind(this));
	}
	_userChange(){
		this.setState({
			current_user: null
		});
		this._getCurrentUser();
	}
	_getCurrentUser(){
		userModel.getCurrentUser().then((user) => {
			this.setState({
				current_user: user
			})
		});
	}

	render(){
		if(this.state.user && !this.state.user.id){
			return (
				<Redirect to='/login'/>
			);
		}else{
			return (
				<div>
				</div>
			);
		}
	}

}