import alt from '../lib/altInstance';

import TableData from '../lib/tableData';


import action from '../actions/ProductAction';
import appAction from '../actions/AppAction';

class ProductStore {

	constructor() {
		this.bindListeners({
			loginDone: appAction.loginDone,

			showError: appAction.showError,
			dismissError: appAction.dismissError,

			activate: action.activate,
			deactivate: action.deactivate,

			getStart: action.getStart,
			getResolve: action.getResolve,
			getFailed: action.getFailed,

			updateFilter: action.updateFilter,
			getListResolve: action.getListResolve,
			getListFailed: action.getListFailed,

			getCategoriesResolve: action.getCategoriesResolve,

			saveDone: action.saveDone,
			saveFailed: action.saveFailed
		});

		this.active = false;

		this.list = new TableData(this.loadData);
		this.list.rowLoading = {name: 'loading...', category: 'loading...'};

		this.itemId = null;
		this.item = null;
		this.categories = [];
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

	activate() {
		this.active = true;
		window.setTimeout(function() {
			action.getCategories();
			action.getList({
				page: 0,
				filter: this.filter,
				clear: true
			});
			if (this.itemId && !(this.item && this.item.id == this.itemId)) {
				action.get(this.itemId);
			}
		}.bind(this), 0);
	}

	deactivate() {
		this.active = false;
	}

	getStart(id) {
		this.itemId = id;
	}

	getResolve(data) {
		console.log('getResolve '+JSON.stringify(data));
		this.item = data;
	}

	getFailed(error) {
		console.log('getFailed '+JSON.stringify(error));
		this.item = {};
	}

	updateFilter(filter) {
		this.filter = filter;
		if (!this.filterRequestId) {
			this.filterRequestId = JSON.stringify(filter);
			this.list.clear();
			action.getList({
				page: 0,
				filter: {
					name: filter.name ? '%'+filter.name+'%' : null,
					categoryId: filter.categoryId
				},
				requestId: this.filterRequestId,
				background: true
			});
		} else {
			this.filterRequestId = JSON.stringify(filter);
		}
	}

	getListResolve(data) {
		// console.log('getListResolve '+JSON.stringify(data)+'  '+this.filterRequestId);
		this.list.update(data);
		if (this.filterRequestId) {
			if (data.requestId == this.filterRequestId) {
				this.filterRequestId = undefined;
			} else {
				var filter = JSON.parse(this.filterRequestId);
				this.filterRequestId = undefined;
				this.updateFilter(filter);
			}
		}
	}

	getListFailed(error) {
		console.log('getListFailed '+JSON.stringify(error));
		this.list.clear();
	}

	getCategoriesResolve(data) {
		console.log('getCategoriesResolve '+JSON.stringify(data));
		this.categories = data;
	}

	saveDone(data) {
		console.log('saveDone '+JSON.stringify(data));
		this.activate();
		window.location.assign('/#/admin/product');
	}

	saveFailed(error) {
		console.log('saveFailed '+JSON.stringify(error));
	}

	loadData(page, size) {
		console.log('loadData '+page+' '+size);
		action.getList({page: page, size: size, background: true});
	}

	loginDone(data) {
		this.login = data;
		if (this.active && data && data.token) {
			this.activate();
		}
	}
}

export default alt.createStore(ProductStore, 'ProductStore');
