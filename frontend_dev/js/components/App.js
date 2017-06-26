import React, {Component} from "react";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";

import userModel from "./../model/UserModel";
import Login from "./Login";
import UserList from "./UserList";
import UserPage from "./UserPage";
import Logout from "./Logout";
import NoMatch from "./NoMatch";

import toast from "./../helpers/Toast";


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
		userModel.on('current-user-change', this._getCurrentUser.bind(this));
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
			if (!user.id) {
				this.refs.router.history.push('/login');
			}else{
				this.setState({
					current_user: user
				});

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
					<Route path='/logout' component={Logout}/>
					<Route path='/user/:id' component={UserPage}/>
					<Route path='/login' component={Login}/>
					<Route component={NoMatch}/>
				</Switch>
			</Router>
		);
	}
}

export default App;
