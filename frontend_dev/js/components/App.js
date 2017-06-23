import React, {Component} from "react";
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";


import userModel from "./../model/UserModel";
import Login from "./Login";
import UserList from "./UserList";
import UserPage from "./UserPage";
import Logout from "./Logout";
import toast from "./Toast";


let current_user = {};

const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route {...rest} render={props => (
		current_user.id ? (
			<Component {...props}/>
		) : (
			<Redirect to={{
				pathname: '/login',
				state: { from: props.location }
			}}/>
		)
	)}/>
);


class App extends Component {
	constructor() {
		super();

		this.state = {
			current_user: {}
		};
		current_user = this.state.current_user;
		userModel.getCurrentUser().then((user) => {
			this.setState({
				current_user: user
			});
			current_user = user;
		});

		userModel.on('current-user-update', () => {
			this.refs.router.history.push('/list');
			toast.info('your rights updated');
		});
	}
	render() {
		return (
			<Router ref="router">
				<div>
					<Route exact path="/" component={UserList}/>
					<Route exact path='/list' component={UserList}/>
					<Route strict path='/list/:page' component={UserList}/>
					<Route path='/login' component={Login}/>
					<Route path='/logout' component={Logout}/>
					<Route path='/user/:id' component={UserPage}/>
					<PrivateRoute path="/protected" component={UserList}/>
				</div>
			</Router>
		);
	}
}



export default App;
