import React from "react";
import userModel from "./../model/UserModel";
import MountedComponent from './MountedComponent';

export default class UserToolbarPanel extends MountedComponent {
	constructor(props) {
		super(props);
		this.state = {
			current_user: {}
		};
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

	click(e) {
		e.preventDefault();
	}

	render() {
		return (
			<li ><a
				onClick={this.click.bind(this)}>{this.state.current_user.first_name} {this.state.current_user.last_name}</a>
			</li>
		)
	}
}