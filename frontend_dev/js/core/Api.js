import $ from "jquery";
import Toast from "./../helpers/Toast";

export default class Api {
	/**
	 * Get query
	 * @param {String} url
	 * @param {Object} [params]
	 * @param {Object} [config]
	 * @return {Promise}
	 */
	get(url, params = {}, config = {}) {
		return new Promise((resolve, reject) => {
			$.get(url, params).done((data) => {
				resolve(data);
			}).fail((data, status, text) => {
				Toast.error(data.responseJSON.response);
				reject(data.responseJSON);

			});
		});
	}

	/**
	 * Post query
	 * @param {String} url
	 * @param {Object} [params]
	 * @param {Object} [config]
	 * @return {Promise}
	 */
	post(url, params = {}, config = {}) {
		return new Promise((resolve, reject) => {
			$.post(url, params).done((data) => {
				resolve(data);
			}).fail((data, status, text) => {
				Toast.error(data.responseJSON.response);
				reject(data.responseJSON);

			});
		});
	}

	_errorMessage(response_message = '') {
		return response_message.replace(/.+:/, '').trim();
	}

}