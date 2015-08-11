import alt from '../lib/altInstance';

import sha256 from 'sha256';

class AppAction {
	
	constructor() {
		this.generateActions('ajaxStart', 'ajaxDone');
		this.generateActions('loginDone', 'loginFailed');
	}
	
	logout() {
		this.actions.loginDone(null);
	}
	
	login(login) {
		console.log('LOGIN '+JSON.stringify(login));
		this.actions.ajaxStart();
		jQuery.ajax({
			url: '/rs/login',
		}).done(function (data) {
			data.login = login.login;
			let token = sha256(login.login + '|' + login.password);
			console.log('LOGIN TOKEN '+token);
			data.token = sha256(token + '|' + data.salt + '|' + data.timestamp);
			console.log('LOGIN SALT '+JSON.stringify(data));
			jQuery.ajax({
				url: '/rs/login',
				type: 'POST',
				contentType: "application/json; charset=utf-8",
				data: JSON.stringify(data),
			}).done(function (data) {
				console.log('LOGIN RESPONSE '+JSON.stringify(data));
				this.actions.loginDone(data);
				this.actions.ajaxDone();
			}.bind(this)).fail(function (xhr, ajaxOptions, errorThrown) {
				console.log('Invalid post login '+JSON.stringify(xhr));
				if (xhr.responseJSON.message) {
					this.actions.loginFailed(xhr.responseJSON.message);
				} else {
					this.actions.loginFailed(errorThrown);
				}
				this.actions.ajaxDone();
			}.bind(this));
		}.bind(this)).fail(function (xhr, ajaxOptions, errorThrown) {
			console.log('Invalid get login '+JSON.stringify(xhr));
			if (xhr.responseJSON.message) {
				this.actions.loginFailed(xhr.responseJSON.message);
			} else {
				this.actions.loginFailed(errorThrown);
			}
			this.actions.ajaxDone();
		}.bind(this));
	}
}

export default alt.createActions(AppAction);