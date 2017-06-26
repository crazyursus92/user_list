import Api from "./../js/core/Api";
import toast from './../js/helpers/Toast';
import $ from "jquery";
import ajax_mock from './ajaxMock';




describe('get', () => {
	$.get = jest.fn($.get);
	let api = new Api();

	it('params', () => {
		let result = api.get('/get/list');
		ajax_mock.done();
		expect(result instanceof Promise).toBeTruthy();
		expect($.get.mock.calls.length).toBe(1);
		expect($.get.mock.calls[0][0]).toBe('/get/list');
		expect($.get.mock.calls[0][1]).toBeInstanceOf(Object);
	});

	it('params object', () => {
		api.get('/get/list', {offset: 10});
		ajax_mock.done();
		expect($.get.mock.calls[1][1]).toBeInstanceOf(Object);
		expect($.get.mock.calls[1][1].offset).toEqual(10);
	});

	it('done resolve data', (done) => {
		let data = 'server response';
		ajax_mock.done(data);
		api.get('/get/list').then((response) => {
			expect(data).toEqual(response);
			done();
		});
	});

	it(' fail call toast error ', (done) => {
		ajax_mock.fail({}, 400, 'Bed request');
		toast.error = jest.fn(toast.error);
		api.get('/get/list', {}).then(() => {
			done();
		}, () => {
			expect(toast.error.mock.calls.length).toBe(1);
			expect(toast.error.mock.calls[0][0]).toBe("Bed request");
			done();
		});
	});

	it(' fail reject data', (done) => {
		ajax_mock.fail({status: 'error'}, 400, 'Bed request');
		api.get('/get/list', {}).then((data) => {
			done();
		}, (data) => {
			expect(data).toBeInstanceOf(Object);
			expect(data.status).toEqual('error');
			done();
		});
	});
});

describe('post', () => {
	$.post = jest.fn($.post);
	let api = new Api();

	it('params', () => {
		let result = api.post('/post/list');
		ajax_mock.done();
		expect(result instanceof Promise).toBeTruthy();
		expect($.post.mock.calls.length).toBe(1);
		expect($.post.mock.calls[0][0]).toBe('/post/list');
		expect($.post.mock.calls[0][1]).toBeInstanceOf(Object);
	});

	it('params object', () => {
		api.post('/post/list', {offset: 10});
		ajax_mock.done();
		expect($.post.mock.calls[1][1]).toBeInstanceOf(Object);
		expect($.post.mock.calls[1][1].offset).toEqual(10);
	});

	it('  done resolve data', (done) => {
		let data = 'server response';
		ajax_mock.done(data);
		api.post('/post/list').then((response) => {
			expect(data).toEqual(response);
			done();
		});
	});

	it(' fail call toast error ', (done) => {
		ajax_mock.fail({}, 400, 'Bed request');
		toast.error = jest.fn(toast.error);
		api.post('/post/list', {}).then(() => {
			done();
		}, () => {
			expect(toast.error.mock.calls.length).toBe(1);
			expect(toast.error.mock.calls[0][0]).toBe("Bed request");
			done();
		});
	});

	it(' fail reject data', (done) => {
		ajax_mock.fail({status: 'error'}, 400, 'Bed request');
		api.post('/post/list', {}).then((data) => {
			done();
		}, (data) => {
			expect(data).toBeInstanceOf(Object);
			expect(data.status).toEqual('error');
			done();
		});
	});
});
