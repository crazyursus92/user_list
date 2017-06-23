import React, {Component} from "react";
import toast from './Toast';
import userModel from './../model/UserModel';


export default class UserDelete extends Component{
	constructor(){
		super();
		// if(!route_data.match.params.id){
		// 	toast.error('failed to delete user');
		// 	throw new Error('route param id not found');
		// }
		userModel.getCurrentUser().then((user) => {
			if(+this.props.id === +user.id){
				toast.error('It is not possible to remove yourself');
				return false;
			}else{
				if(confirm('Are you sure you want to delete the user?')){
					return userModel.delete(this.props.id);
				}
			}
		}).then((data) => {
			if(data && data.status === 'success'){
				userModel.trigger('users-update', this.props.id);
				toast.success('User deleted');

			}
		});
	}
	render(){
		return (
			<div>
			</div>
		);
	}
}