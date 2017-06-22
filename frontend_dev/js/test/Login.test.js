import React from "react";
import {shallow} from "enzyme";
import Login from "./../Login";


jest.mock('./../model/UserModel');

describe("Login", () => {
	test('Form rendered', () => {
		const login = shallow(<Login/>);
		expect(login.find('#username').length).toBe(1);
		expect(login.find('#password').length).toBe(1);
		expect(login.find('button').length).toBe(1);
	});

	test('Validate fields', () => {
		jest.mock('./../mixins/controlValidation', ()=> {
			return {
				validate: (e) => {
					e.target.parentElement.classList.add('has-error');
				}
			}
		});
		const login = shallow(<Login/>);
		let username = login.find('#username');
		username.simulate('blur');
		expect(username.parent().is('.has-error')).toBe(true);
		let password = login.find('#password');
		password.simulate('blur');
		expect(password.parent().is('.has-error')).toBe(true);
	});

	// test('Form submit', () => {
	// 	const login = shallow(<Login/>);
	// 	let username = login.find('#username');
	// 	username.val('username');
	// 	let query_login = false;
	//
	//
	//
	//
	// });
});

