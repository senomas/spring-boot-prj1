import alt from '../lib/altInstance';

import TableData from '../lib/tableData';

import action from '../actions/AppAction';

class AppStore {

	constructor() {
		this.bindListeners({
			ajaxStart: action.ajaxStart,
			ajaxDone: action.ajaxDone,
			
			showError: action.showError,
			dismissError: action.dismissError,
			
			loginDone: action.loginDone,
			loginFailed: action.loginFailed
		});
		
		let uv = sessionStorage.getItem('login');
		this.login = uv ? JSON.parse(uv) : null;
		
		this.loginForm = {};
		
		this.ajaxCall = 0;
	}

	ajaxStart() {
		if (this.ajaxCall > 0) this.preventDefault();
		this.ajaxCall ++;
	}
	
	ajaxDone() {
		if (this.ajaxCall > 0) {
			this.ajaxCall --;
		}
		if (this.ajaxCall > 0) this.preventDefault();
	}
	
	showError(error) {
		this.error = error;
	}
	
	dismissError() {
		this.error = null;
	}
	
	loginDone(data) {
		this.login = data;
		sessionStorage.setItem('login', JSON.stringify(data));
		if (data && data.token) {
			sessionStorage.setItem('token', data.token);
		} else {
			sessionStorage.setItem('token', null);
		}
		console.log('LOGIN DONE '+JSON.stringify(data));
	}
	
	loginFailed(msg) {
		console.log('LOGIN FAILED '+msg);
	}
}

export default alt.createStore(AppStore, 'AppStore');