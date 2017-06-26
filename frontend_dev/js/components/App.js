import React, {Component} from "react";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";

import userModel from "./../model/UserModel";
import Login from "./Login";
import UserList from "./UserList";
import UserPage from "./UserPage";
import Logout from "./Logout";
import NotLoginComponent from "./NotLoginComponent";
import toast from "./../helpers/Toast";





const NoMatch = ({ location }) => (
	<div className="text-center">
		<h2>404</h2>
		<h3>No match for <code>{location.pathname}</code></h3>
	</div>
);


class App extends Component {
	constructor() {
		super();

		this.state = {
			current_user: {}
		};

		this._getCurrentUser();
		this._listener();
	}

	_listener(){
		userModel.on('api-error', this._apiError.bind(this));
		userModel.on('current-user-change-access', this._currentUserChange.bind(this));
		userModel.on('user-logout', this._logout.bind(this));
	}

	_logout(){
		this.setState({
			current_user: {}
		});
	}

	_currentUserChange(){
		if (this.state.current_user.id) {
			this.refs.router.history.push('/list');
			toast.info('your rights updated');
		}
	}
	_apiError(e, data){
		if(data.code === 403){
			if(this.state.current_user.id) {
				this.refs.router.history.push('/');
			}else{
				this.refs.router.history.push('/login');
			}
		}
		this._getCurrentUser();
	}
	_getCurrentUser() {
		userModel.getCurrentUser().then((user) => {
			this.setState({
				current_user: user
			});
			if (!user.id) {
				this.refs.router.history.push('/login');
			}
		});
	}

	render() {
		return (
			<Router ref="router">
				<Switch>
					<Route exact path="/" component={UserList}/>
					<Route exact path='/list' component={UserList}/>
					<Route strict path='/list/:page' component={UserList}/>
					<Route path='/login' component={Login}/>
					<Route path='/logout' component={Logout}/>
					<Route path='/user/:id' component={UserPage}/>
					<Route component={NoMatch}/>
					<NotLoginComponent />
				</Switch>
			</Router>
		);
	}
}

export default App;
