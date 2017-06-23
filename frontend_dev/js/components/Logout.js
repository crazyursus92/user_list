import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import userModel from './../model/UserModel';

export  default  class Logout extends Component{
	constructor(){
		super();
		this.state = {
			logout_complete: false
		};
		userModel.logout().then(() => {
			this.setState({
				logout_complete: true
			});
		});
	}
	render(){
		return (
			<div>
				{(() => {
					if(this.state.logout_complete){
						return (
							<Redirect to="/login" push={true}/>
						);
					}
				})()}
			</div>
		);
	}
}