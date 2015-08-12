import alt from '../lib/altInstance';

import action from '../actions/ProductCategoryAction';
import appAction from '../actions/AppAction';

class ProductCategoryStore {

	constructor() {
		this.bindListeners({
			getStart: action.getStart,
			getResolve: action.getResolve,
			getFailed: action.getFailed,
			
			getListStart: action.getListStart,
			getListResolve: action.getListResolve,
			getListFailed: action.getListFailed,
			
			saveStart: action.saveStart,
			saveDone: action.saveDone,
			saveFailed: action.saveFailed,
			
			deleteStart: action.deleteStart,
			deleteDone: action.deleteDone,
			deleteFailed: action.deleteFailed,
			
			loginDone: appAction.loginDone
		});
		
		this.list = {totalElements: 0};
		this.item = {};
		
		let uv = sessionStorage.getItem('login');
		this.login = uv ? JSON.parse(uv) : null;
	}
	
	getStart(page) {
		console.log('getStart '+page);
	}
	
	getResolve(data) {
		console.log('getResolve '+JSON.stringify(data));
		this.setState({item: data});
	}
	
	getFailed(error) {
		console.log('getFailed '+JSON.stringify(error));
		this.setState({item: {}});
	}

	getListStart(page) {
		console.log('getListStart '+page);
	}
	
	getListResolve(data) {
		console.log('getListResolve '+JSON.stringify(data));
		this.setState({list: data});
	}
	
	getListFailed(error) {
		console.log('getListFailed '+JSON.stringify(error));
		this.setState({list: {totalElements: 0}});
	}
	
	saveStart(data) {
		console.log('saveStart '+JSON.stringify(data));
		this.setState({redirect: 'close'});
	}

	saveDone(data) {
		console.log('saveDone '+JSON.stringify(data));
		window.location.assign('/#/admin/productCategory');
		this.preventDefault();
	}
	
	saveFailed(error) {
		console.log('saveFailed '+JSON.stringify(error));
	}
	
	deleteStart(data) {
		console.log('deleteStart '+JSON.stringify(data));
		this.setState({redirect: 'close'});
	}

	deleteDone(data) {
		console.log('deleteDone '+JSON.stringify(data));
		window.location.assign('/#/admin/productCategory');
		this.preventDefault();
	}
	
	deleteFailed(error) {
		console.log('deleteFailed '+JSON.stringify(error));
	}

	loginDone(data) {
		this.login = data;
		console.log('PRODUCT CATEGORY LOGIN DONE '+JSON.stringify(data));
		if (this.login && this.login.token) {
			console.log('window reload');
			document.location.reload();
			this.preventDefault();
		}
	}
}

export default alt.createStore(ProductCategoryStore, 'ProductCategoryStore');