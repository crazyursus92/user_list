import React, {Component} from "react";
import userModel from "./../model/UserModel";
import User from "./../model/User";
import UserControlsManager from "./UserControlsManager";
import UserControlsUser from "./UserControlsUser";


export  default  class UserControls extends Component {
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