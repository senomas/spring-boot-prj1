import alt from '../lib/altInstance';

import TableData from '../lib/tableData';


import action from '../actions/ProductAction';

class ProductStore {

	constructor() {
		this.bindListeners({
			ajaxStart: action.ajaxStart,
			ajaxDone: action.ajaxDone,
		
			getResolve: action.getResolve,
			getFailed: action.getFailed,
			
			updateFilter: action.updateFilter,
			getListResolve: action.getListResolve,
			getListFailed: action.getListFailed,
			
			getCategoriesResolve: action.getCategoriesResolve,
			
			saveDone: action.saveDone,
			saveFailed: action.saveFailed
		});
		
		this.list = new TableData(this.loadData);
		this.list.rowLoading = {name: 'loading...', category: 'loading...'};
		
		this.item = {};
		this.categories = [];
		this.filter = {};
		this.filterRequestId = undefined;
		
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
		console.log('getListResolve '+JSON.stringify(data)+'  '+this.filterRequestId);
		this.list.update(data);
		if (this.filterRequestId) {
			if (data.requestId == this.filterRequestId) {
				this.filterRequestId = undefined;
			} else {
				console.log('HEREEE '+(data.requestId == this.filterRequestId)+'   '+data.requestId+' == '+this.filterRequestId);
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
		this.list.content.forEach((v, k, list) => {
			if (data.id == v.id) {
				list[k] = {
					id: data.id,
					category: data.category.name,
					name: data.name
				};
			}
		});
		window.location.assign('/#/admin/product');
		this.preventDefault();
	}
	
	saveFailed(error) {
		console.log('saveFailed '+JSON.stringify(error));
	}
	
	loadData(page, size) {
		console.log('loadData '+page+' '+size);
		action.getList({page: page, size: size, background: true});
	}
}

export default alt.createStore(ProductStore, 'ProductStore');