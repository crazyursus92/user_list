import React, {Component} from "react";
import toast from './../helpers/Toast';
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
				/**
				 * Кидаем event для того что бы user удалился из списка
				 */
				userModel.trigger('users-update', this.props.id);
				toast.success('User deleted');

			}else if(data && data.status === 'error' && data.code === 404){
				userModel.trigger('users-update', this.props.id);
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