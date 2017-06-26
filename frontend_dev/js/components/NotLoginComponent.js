import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import userModel from "./../model/UserModel";


export default class NotLoginComponent extends Component{
	constructor(){
		super();
		this.state = {
			current_user: null
		};
		this._getCurrentUser();
		userModel.on('api-error', () => {
			this.setState({
				current_user: null
			});
			this._getCurrentUser();
		});
		userModel.on('current-user-change-access', () => {
			this.setState({
				current_user: null
			});
			this._getCurrentUser();
		});
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
			<Redirect to='/login'/>
		}else{
			return (
				<div>
				</div>
			);
		}
	}

}