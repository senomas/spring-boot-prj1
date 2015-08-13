import alt from '../lib/altInstance';

import TableData from '../lib/tableData';


import action from '../actions/ProductCategoryAction';
import appAction from '../actions/AppAction';

class ProductCategoryStore {

	constructor() {
		this.bindListeners({
			showError: appAction.showError,
			dismissError: appAction.dismissError,

			getResolve: action.getResolve,
			getFailed: action.getFailed,

			getListResolve: action.getListResolve,
			getListFailed: action.getListFailed,

			saveDone: action.saveDone,
			saveFailed: action.saveFailed,

			deleteDone: action.deleteDone,
			deleteFailed: action.deleteFailed
		});

		this.list = new TableData(this.loadData);
		this.list.rowLoading = {name: 'loading...'};

		this.item = {};
		this.filter = {};
		this.filterRequestId = undefined;

		let uv = sessionStorage.getItem('login');
		this.login = uv ? JSON.parse(uv) : null;
	}

	showError(error) {
		this.error = error;
	}

	dismissError() {
		this.error = null;
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
		this.list.update(data);
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

	loadData(page, size) {
		console.log('loadData '+page+' '+size);
		action.getList({page: page, size: size, background: true});
	}
}

export default alt.createStore(ProductCategoryStore, 'ProductCategoryStore');
