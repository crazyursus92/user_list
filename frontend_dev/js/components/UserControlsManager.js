import React, {Component} from "react";
import {Link} from "react-router-dom";
import userModel from "./../model/UserModel";
import toast from './../helpers/Toast';
import MountedComponent from './MountedComponent';

export default class UserControlsManager extends MountedComponent {
	constructor() {
		super();
		this.state = {
			current_user: {}
		};

		userModel.getCurrentUser().then((user) => {
			if(this.isMounted) {
				this.setState({
					current_user: user
				})
			}else{
				this.state = {
					current_user: user
				};
			}
		});
	}

	/**
	 *
	 * @param e
	 * @private
	 */
	_delete(e) {
		e.preventDefault();
		if (confirm('Are you sure you want to delete the user?')) {
			return userModel.delete(this.props.id).then((data) => {
				if (data && data.status === 'success') {
					/**
					 * Кидаем event для того что бы user удалился из списка
					 */
					userModel.trigger('users-update', this.props.id);
					toast.success('User deleted');

				} else if (data && data.status === 'error' && data.code === 404) {
					userModel.trigger('users-update', this.props.id);
				}
			});
		}


	}

	render() {
		if (+this.state.current_user.id !== +this.props.id) {
			return (
				<div>
					<Link to={`/user/${this.props.id}`} className="glyphicon glyphicon-pencil">
					</Link>
					<a className="glyphicon glyphicon-trash" onClick={this._delete.bind(this)}>
					</a>
				</div>
			);
		} else {
			return (
				<div>
				</div>
			);
		}
	}
}