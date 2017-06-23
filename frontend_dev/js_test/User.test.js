"use strict";

import User from './../js/model/User';

describe('constructor', () => {
	describe('empty data', () => {
		let user = new User({});
		it('id equal 0', () => {
			expect(user.id).toBe(0);
		});
		it('first_name undefined', () => {
			expect(user.first_name).toBeUndefined();
		});
		it('last_name undefined', () => {
			expect(user.last_name).toBeUndefined();
		});
		it('password undefined', () => {
			expect(user.password).toBeUndefined();
		});
		it('username undefined', () => {
			expect(user.username).toBeUndefined();
		});
		it('not manager', () => {
			expect(user.isManager()).toBeFalsy();
		});
		it('not user', () => {
			expect(user.isUser()).toBeFalsy();
		});
		it('guest', () => {
			expect(user.isGuest()).toBeTruthy();
		});
		it(' not Equals', () => {
			expect(user.isEquals(user)).toBeFalsy();
		});
	});
	describe('data', () => {
		let user = new User({
			id: '1',
			first_name: 'Ivan',
			last_name: 'Ivanov',
			password: '12345',
			type: '2',
			username: 'admin'
		});

		it('id equals constructor data id', () => {
			expect(user.id).toEqual(1);
		});
		it('first_name equals constructor data first_name', () => {
			expect(user.first_name).toEqual('Ivan');
		});
		it('last_name equals constructor data last_name', () => {
			expect(user.last_name).toEqual('Ivanov');
		});
		it('password equals constructor data password', () => {
			expect(user.password).toEqual('12345');
		});
		it('username equals constructor data username', () => {
			expect(user.username).toEqual('admin');
		});
		it('type equals constructor data type', () => {
			expect(user.type).toEqual(2);
		});
	});
});


describe('user type', () => {
	describe('manager', () => {
		let user = new User({
			id: '1',
			first_name: 'Ivan',
			last_name: 'Ivanov',
			password: '12345',
			type: '1',
			username: 'admin'
		});
		it('isManger ', () => {
			expect(user.isManager()).toBeTruthy();
		});
		it('not isUser ', () => {
			expect(user.isUser()).toBeFalsy();
		});
		it('not isGuest', () => {
			expect(user.isGuest()).toBeFalsy();
		});
	});
	describe('user', () => {
		let user = new User({
			id: '1',
			first_name: 'Ivan',
			last_name: 'Ivanov',
			password: '12345',
			type: '2',
			username: 'admin'
		});
		it('not isManger ', () => {
			expect(user.isManager()).toBeFalsy();
		});
		it(' isUser ', () => {
			expect(user.isUser()).toBeTruthy();
		});
		it('not isGuest', () => {
			expect(user.isGuest()).toBeFalsy();
		});
	});
});

describe('isEquals', () => {
	let user = new User({
		id: '1',
		first_name: 'Ivan',
		last_name: 'Ivanov',
		password: '12345',
		type: '1',
		username: 'admin'

	});
	it(' not param', () => {
		expect(user.isEquals()).toBeFalsy();
	});

	it(' user id does not match', () => {
		let compare_user = new User({
			id: '2',
			first_name: 'Ivan',
			last_name: 'Ivanov',
			password: '12345',
			type: '1',
			username: 'admin'
		});
		expect(user.isEquals(compare_user)).toBeFalsy();
	});
	it(' user type does not match', () => {
		let compare_user = new User({
			id: '1',
			first_name: 'Ivan',
			last_name: 'Ivanov',
			password: '12345',
			type: '2',
			username: 'admin'
		});
		expect(user.isEquals(compare_user)).toBeFalsy();
	});
	it(' user first_name does not match', () => {
		let compare_user = new User({
			id: '1',
			first_name: 'Petr',
			last_name: 'Ivanov',
			password: '12345',
			type: '1',
			username: 'admin'
		});
		expect(user.isEquals(compare_user)).toBeTruthy();
	});
	it(' user last_name does not match', () => {
		let compare_user = new User({
			id: '1',
			first_name: 'Ivan',
			last_name: 'Petrov',
			password: '12345',
			type: '1',
			username: 'admin'
		});
		expect(user.isEquals(compare_user)).toBeTruthy();
	});
	it(' user password does not match', () => {
		let compare_user = new User({
			id: '1',
			first_name: 'Ivan',
			last_name: 'Ivanov',
			password: '1234545',
			type: '1',
			username: 'admin'
		});
		expect(user.isEquals(compare_user)).toBeTruthy();
	});
	it(' user username does not match', () => {
		let compare_user = new User({
			id: '1',
			first_name: 'Ivan',
			last_name: 'Ivanov',
			password: '12345',
			type: '1',
			username: 'user'
		});
		expect(user.isEquals(compare_user)).toBeTruthy();
	});
});

