import React, {Component} from "react";
import {Link} from "react-router-dom";
import UserToolbarPanel from "./UserToolbarPanel";

export default class UserToolbarUser extends Component {


	render() {
		return (
			<div>
				<ul className="nav navbar-nav">
					<li><Link to="/list">Users list</Link></li>
					<li><Link to="/logout">logout</Link></li>
				</ul>
				<ul className="nav navbar-nav navbar-right">
					<UserToolbarPanel/>
				</ul>
			</div>

		);
	}
}