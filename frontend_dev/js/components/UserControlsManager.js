import React, {Component} from "react";
import {Link} from "react-router-dom";
import userModel from "./../model/UserModel";
import UserDelete from "./UserDelete";


export default class UserControlsManager extends Component {
	constructor() {
		super();
		this.state = {
			current_user: {}
		};

		userModel.getCurrentUser().then((user) => {
			this.setState({
				current_user: user
			})
		});
	}

	/**
	 * Рендерим компонент delete по нажатию на иконку
	 * @param e
	 * @private
	 */
	_delete(e) {
		e.preventDefault();
		this.setState({
			delete: true
		});
	}

	render() {
		if (+this.state.current_user.id !== +this.props.id) {
			return (
				<div>
					<Link to={`/user/${this.props.id}`} className="glyphicon glyphicon-pencil">
					</Link>
					<a className="glyphicon glyphicon-trash" onClick={this._delete.bind(this)}>
					</a>
					{(() => {
						if (this.state.delete) {
							return (
								<UserDelete id={this.props.id}/>
							);
						}
					})()}
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