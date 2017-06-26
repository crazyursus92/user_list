import React, {Component} from "react";
import $ from "jquery";
import {Redirect} from "react-router-dom";
import userModel from "./../model/UserModel";
import {Form} from "formsy-react";
import {Input} from "formsy-react-components";

export default class Login extends Component {

	constructor() {
		super();
	}

	submit(form_data) {
		userModel.login(form_data.username, form_data.password).then((data) => {
			if(data && data.status === 'success') {
				this.props.history.push('/');
			}
		});
	}

	render() {
		return (
			<div className="col-md-6 col-md-offset-3 ">
				<div className="panel panel-default ">
					<div className="panel-heading text-center">Authorization</div>

					<div className="panel-body ">
						<Form onSubmit={this.submit.bind(this)}>
							<Input ref="username" type="text" className="form-control" required name="username"
							       label="Username" placeholder="Username"/>
							<Input ref="password" type="password" className="form-control" required name="password"
							       label="Password" placeholder="Password"/>
							<div className="col-sm-9 col-sm-offset-3">
								<button className="btn btn-success">Send</button>
							</div>
						</Form>
					</div>
				</div>
			</div>
		);
	}
}