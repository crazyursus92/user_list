import userModel from './../js/model/UserModel';
import ajax_mock from './ajaxMock';



describe('getList', () => {
	it('valid url', () => {
		userModel.api.get = jest.fn(userModel.api.get);
		userModel.getList();
		userModel.getList(10);
		userModel.getList(20, 5);
		expect(userModel.api.get.mock.calls.length).toBe(3);
		expect(userModel.api.get.mock.calls[0][0]).toBe('/api/user/list/0/10');
		expect(userModel.api.get.mock.calls[1][0]).toBe('/api/user/list/10/10');
		expect(userModel.api.get.mock.calls[2][0]).toBe('/api/user/list/20/5');
	});

	it('return promise', () => {
		expect(userModel.getList()).toBeInstanceOf(Promise);
	});

	it('change current user trigger event', (done) => {
		userModel.trigger = jest.fn(userModel.trigger);
		ajax_mock.done({user: {
			id: 1,
			first_name: 'Ivan',
			last_name: 'Ivanov',
			type: 2,
			username: 'admin'
		}});
		userModel.getList().then(() => {
			expect(userModel.trigger.mock.calls.length).toBe(1);
			expect(userModel.trigger.mock.calls[0][0]).toBe('current-user-change');
			done();
		});
	});
});


describe('get', () => {
	it('valid url', () => {
		userModel.api.get = jest.fn(userModel.api.get);
		userModel.get(1);
		userModel.get(10);
		expect(userModel.api.get.mock.calls.length).toBe(2);
		expect(userModel.api.get.mock.calls[0][0]).toBe('/api/user/get/1');
		expect(userModel.api.get.mock.calls[1][0]).toBe('/api/user/get/10');
	});

	it('return promise', () => {
		expect(userModel.get(1)).toBeInstanceOf(Promise);
	});

	it('change current user trigger event', (done) => {
		userModel.trigger = jest.fn(userModel.trigger);
		ajax_mock.done({});
		userModel.get(1).then(() => {
			expect(userModel.trigger.mock.calls.length).toBe(1);
			expect(userModel.trigger.mock.calls[0][0]).toBe('current-user-change');
			done();
		});

	});
});

describe('getCurrentUser', () => {


	it('valid url', () => {
		userModel.api.get = jest.fn(userModel.api.get);
		userModel.getCurrentUser();
		expect(userModel.api.get.mock.calls.length).toBe(1);
		expect(userModel.api.get.mock.calls[0][0]).toBe('/api/user/current-user');
	});

	it('call get one', () => {
		userModel.api.get = jest.fn(userModel.api.get);
		userModel.getCurrentUser();
		userModel.getCurrentUser();
		userModel.getCurrentUser();
		userModel.getCurrentUser();
		expect(userModel.api.get.mock.calls.length).toBe(0);
	});

	it('return promise', () => {
		expect(userModel.getCurrentUser()).toBeInstanceOf(Promise);
		expect(userModel.getCurrentUser()).toBeInstanceOf(Promise);
		expect(userModel.getCurrentUser()).toBeInstanceOf(Promise);
	});
});

describe('login', () => {
	it('valid url and params', () => {
		userModel.api.post = jest.fn(userModel.api.post);
		userModel.login('admin', '12345');
		expect(userModel.api.post.mock.calls.length).toBe(1);
		expect(userModel.api.post.mock.calls[0][0]).toBe('/api/user/login');
		expect(userModel.api.post.mock.calls[0][1]).toBeInstanceOf(Object);
		expect(userModel.api.post.mock.calls[0][1].username).toBe('admin');
		expect(userModel.api.post.mock.calls[0][1].password).toBe('12345');
	});

	it('return promise', () => {
		expect(userModel.login('admin', '12345')).toBeInstanceOf(Promise);
	});

});


describe('logout', () => {
	it('valid url and params', () => {
		userModel.api.post = jest.fn(userModel.api.post);
		userModel.logout();
		expect(userModel.api.post.mock.calls.length).toBe(1);
		expect(userModel.api.post.mock.calls[0][0]).toBe('/api/user/logout');
	});

	it('return promise', () => {
		expect(userModel.logout()).toBeInstanceOf(Promise);
	});
});


describe('create', () => {
	it('valid url and params', () => {
		userModel.api.post = jest.fn(userModel.api.post);
		userModel.create('Ivan', "Ivanov", 'new_user', '12345', 1);
		expect(userModel.api.post.mock.calls.length).toBe(1);
		expect(userModel.api.post.mock.calls[0][0]).toBe('/api/user/create');
		expect(userModel.api.post.mock.calls[0][1]).toBeInstanceOf(Object);
		expect(userModel.api.post.mock.calls[0][1].first_name).toBe('Ivan');
		expect(userModel.api.post.mock.calls[0][1].last_name).toBe('Ivanov');
		expect(userModel.api.post.mock.calls[0][1].username).toBe('new_user');
		expect(userModel.api.post.mock.calls[0][1].password).toBe('12345');
		expect(userModel.api.post.mock.calls[0][1].type).toBe(1);
	});

	it('return promise', () => {
		expect(userModel.create('Ivan', "Ivanov", 'new_user', '12345', 1)).toBeInstanceOf(Promise);
	});

	it('change current user trigger event', (done) => {
		userModel.trigger = jest.fn(userModel.trigger);
		ajax_mock.done({user: {
			id: 1,
			first_name: 'Ivan',
			last_name: 'Ivanov',
			type: 2,
			username: 'admin'
		}});
		userModel.create('Ivan', "Ivanov", 'new_user', '12345', 1).then(() => {
			expect(userModel.trigger.mock.calls.length).toBe(1);
			expect(userModel.trigger.mock.calls[0][0]).toBe('current-user-change');
			done();
		});
	});
});

describe('update', () => {
	it('valid url and params', () => {
		userModel.api.post = jest.fn(userModel.api.post);
		userModel.update(1, 'Ivan', "Ivanov", 'admin', '12345', 2);
		expect(userModel.api.post.mock.calls.length).toBe(1);
		expect(userModel.api.post.mock.calls[0][0]).toBe('/api/user/update');
		expect(userModel.api.post.mock.calls[0][1]).toBeInstanceOf(Object);
		expect(userModel.api.post.mock.calls[0][1].id).toBe(1);
		expect(userModel.api.post.mock.calls[0][1].first_name).toBe('Ivan');
		expect(userModel.api.post.mock.calls[0][1].last_name).toBe('Ivanov');
		expect(userModel.api.post.mock.calls[0][1].username).toBe('admin');
		expect(userModel.api.post.mock.calls[0][1].password).toBe('12345');
		expect(userModel.api.post.mock.calls[0][1].type).toBe(2);
	});

	it('valid url and params ( without type )', () => {
		userModel.api.post = jest.fn(userModel.api.post);
		userModel.update(1, 'Ivan', "Ivanov", 'admin', '12345');
		expect(userModel.api.post.mock.calls.length).toBe(1);
		expect(userModel.api.post.mock.calls[0][0]).toBe('/api/user/update');
		expect(userModel.api.post.mock.calls[0][1]).toBeInstanceOf(Object);
		expect(userModel.api.post.mock.calls[0][1].id).toBe(1);
		expect(userModel.api.post.mock.calls[0][1].first_name).toBe('Ivan');
		expect(userModel.api.post.mock.calls[0][1].last_name).toBe('Ivanov');
		expect(userModel.api.post.mock.calls[0][1].username).toBe('admin');
		expect(userModel.api.post.mock.calls[0][1].password).toBe('12345');
		expect(userModel.api.post.mock.calls[0][1].type).toBeUndefined();
	});

	it('valid url and params ( without type and password)', () => {
		userModel.api.post = jest.fn(userModel.api.post);
		userModel.update(1, 'Ivan', "Ivanov", 'admin');
		expect(userModel.api.post.mock.calls.length).toBe(1);
		expect(userModel.api.post.mock.calls[0][0]).toBe('/api/user/update');
		expect(userModel.api.post.mock.calls[0][1]).toBeInstanceOf(Object);
		expect(userModel.api.post.mock.calls[0][1].id).toBe(1);
		expect(userModel.api.post.mock.calls[0][1].first_name).toBe('Ivan');
		expect(userModel.api.post.mock.calls[0][1].last_name).toBe('Ivanov');
		expect(userModel.api.post.mock.calls[0][1].username).toBe('admin');
		expect(userModel.api.post.mock.calls[0][1].password).toBeUndefined();
		expect(userModel.api.post.mock.calls[0][1].type).toBeUndefined();
	});


	it('return promise', () => {
		expect(userModel.update(1, 'Ivan', "Ivanov", 'admin')).toBeInstanceOf(Promise);
	});

	it('change current user trigger event', (done) => {
		userModel.trigger = jest.fn(userModel.trigger);
		ajax_mock.done({user: {
			id: 1,
			first_name: 'Petr',
			last_name: 'Ivanov',
			type: 2,
			username: 'admin'
		}});
		userModel.update(1, 'Ivan', "Ivanov", 'admin').then(() => {
			expect(userModel.trigger.mock.calls.length).toBe(1);
			expect(userModel.trigger.mock.calls[0][0]).toBe('current-user-change');
			done();
		});

	});
});

describe('delete', () => {
	it('valid url and params', () => {
		userModel.api.post = jest.fn(userModel.api.post);
		userModel.delete(1);
		expect(userModel.api.post.mock.calls.length).toBe(1);
		expect(userModel.api.post.mock.calls[0][0]).toBe('/api/user/delete');
		expect(userModel.api.post.mock.calls[0][1]).toBeInstanceOf(Object);
		expect(userModel.api.post.mock.calls[0][1].id).toBe(1);
	});

	it('return promise', () => {
		expect(userModel.delete(1)).toBeInstanceOf(Promise);
	});

	it('change current user trigger event', (done) => {
		userModel.trigger = jest.fn(userModel.trigger);
		ajax_mock.done({user: {
			id: 1,
			first_name: 'Fedor',
			last_name: 'Ivanov',
			type: 2,
			username: 'admin'
		}});
		userModel.delete(1).then(() => {
			expect(userModel.trigger.mock.calls.length).toBe(1);
			expect(userModel.trigger.mock.calls[0][0]).toBe('current-user-change');
			done();
		});

	});
});

describe('on', () => {
	it('called', () => {
		let mockFunction = jest.fn();
		userModel.on('test-event', mockFunction);
		userModel.trigger('test-event');
		expect(mockFunction.mock.calls.length).toBe(1);
	});
});