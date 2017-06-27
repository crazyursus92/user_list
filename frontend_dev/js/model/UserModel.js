import User from "./User";
import $ from "jquery";
import Api from "./../core/Api";

class UserModel {

	constructor() {
		this._current_user = new User({});
		this.api = new Api();
	}

	getList(offset = 0, limit = 10) {
		let url = '/api/user/list/' + offset + '/' + limit;
		return this.api.get(url).then(this._changeCurrentUser.bind(this), this._apiRejected.bind(this));
	}

	get(id) {
		return this.api.get(`/api/user/get/${id}`).then(this._changeCurrentUser.bind(this), this._apiRejected.bind(this));
	}

	login(username, password) {
		return this.api.post('/api/user/login', {
			username: username,
			password: password
		}).then(this._changeCurrentUser.bind(this), this._apiRejected.bind(this));
	}

	/**
	 * Возвращает текущего авторизованного пользователя
	 * Логика с праверками на текущего пользователя нужна для кэширования пользователя т.е. При множестве запросов данного
	 * метода на сервер уйдет только один запрос
	 * @return {Promise}
	 */
	getCurrentUser() {
		if (!this._current_user.id && !this._current_user_promise) {

			this._current_user_promise = this.api.get('/api/user/current-user').then((data) => {
				if (data.status === 'success') {
					this._changeCurrentUser({user: data.response});
				}else{
					this._changeCurrentUser({user: {}});
				}
				return this._current_user;
			}, this._apiRejected.bind(this));
			return this._current_user_promise;

		} else if (!this._current_user.id) {

			return this._current_user_promise.then(() => {
				return this._current_user;
			});

		} else {

			return Promise.resolve().then(() => {
				return this._current_user;
			});
		}
	}

	logout() {
		return this.api.post("/api/user/logout").then(this._changeCurrentUser.bind(this), this._apiRejected.bind(this));
	}

	create(first_name, last_name, username, password, type) {
		return this.api.post('/api/user/create', {
			first_name: first_name,
			last_name: last_name,
			username: username,
			password: password,
			type: type
		}).then(this._changeCurrentUser.bind(this), this._apiRejected.bind(this));
	}

	update(id, first_name, last_name, username, password = null, type = null) {
		let query_data = {
			id: id,
			first_name: first_name,
			last_name: last_name,
			username: username
		};
		if (password) {
			query_data.password = password;
		}
		if (type) {
			query_data.type = type;
		}
		return this.api.post('/api/user/update', query_data).then(this._changeCurrentUser.bind(this), this._apiRejected.bind(this));
	}

	delete(id) {
		return this.api.post('/api/user/delete', {
			id: id
		}).then(this._changeCurrentUser.bind(this), this._apiRejected.bind(this));
	}

	on(event, callback) {
		$(this).on(event, callback);
	}

	off(event, callback){
		$(this).off(event, callback);
	}

	trigger(event, data) {
		$(this).trigger(event, data);
	}

	_changeCurrentUser(data) {
		let current_user = new User(data.user || {});
		if (this._current_user.isChangeAccess(current_user)) {
			this.trigger('current-user-change-access');
		}
		if(!this._current_user.isEquals(current_user)){
			this._current_user = current_user;
			this._current_user_promise = null;
			this.trigger('current-user-change');
		}
		return data;
	}

	_apiRejected(data) {
		this._changeCurrentUser(data);
		this.trigger('api-error', data);
		return data
	}
}

const user_model = new UserModel();

export default user_model;