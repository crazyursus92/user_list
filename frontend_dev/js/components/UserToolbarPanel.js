import React, {Component} from "react";
import userModel from "./../model/UserModel";

export default class UserToolbarPanel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			current_user: {}
		};
	}
	componentDidMount(){
		userModel.getCurrentUser().then((user) => {
			this.setState({
				current_user: user
			});
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