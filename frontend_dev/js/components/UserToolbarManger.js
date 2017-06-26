import React, {Component} from "react";
import {Link} from "react-router-dom";
import UserToolbarPanel from "./UserToolbarPanel";

export default class UserToolbarManager extends Component {

	render() {
		return (
			<div>
				<ul className="nav navbar-nav">
					<li><Link to="/list">Users list</Link></li>
					<li><Link to="/user/create">Create new user</Link></li>
					<li><Link to="/logout">logout</Link></li>

				</ul>
				<ul className="nav navbar-nav navbar-right">
					<UserToolbarPanel/>
				</ul>
			</div>
		);
	}
}