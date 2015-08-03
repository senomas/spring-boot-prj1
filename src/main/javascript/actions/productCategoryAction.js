import alt from '../lib/altInstance';

class ProductCategoryAction {
	
	constructor() {
		this.generateActions('getStart', 'getResolve', 'getFailed');
		this.generateActions('getListStart', 'getListResolve', 'getListFailed');
		this.generateActions('saveStart', 'saveDone', 'saveFailed');
	}
	
	get(id) {
		this.actions.getStart(id);
		jQuery.ajax({
			url: '/rs/productCategory/id/'+id,
		}).done(function (data) {
			this.actions.getResolve(data);
		}.bind(this)).fail(function (xhr, ajaxOptions, errorThrown) {
			if (xhr.responseJSON.message) {
				this.actions.getFailed(xhr.responseJSON.message);
			} else {
				this.actions.getFailed(errorThrown);
			}
		}.bind(this));
	}

	getList(page) {
		this.actions.getListStart(page);
		jQuery.ajax({
			url: '/rs/productCategory',
			type: 'POST',
			contentType: "application/json; charset=utf-8",
			data: JSON.stringify({
				page: page,
				size: 1000
			}),
		}).done(function (data) {
			this.actions.getListResolve(data);
		}.bind(this)).fail(function (xhr, ajaxOptions, errorThrown) {
			if (xhr.responseJSON.message) {
				this.actions.getListFailed(xhr.responseJSON.message);
			} else {
				this.actions.getListFailed(errorThrown);
			}
		}.bind(this));
	}

	save(data) {
		this.actions.saveStart(data);
		jQuery.ajax({
			url: '/rs/productCategory/',
			type: 'PUT',
			contentType: "application/json; charset=utf-8",
			data: JSON.stringify({
				id: data.id,
				name: data.name
			}),
		}).done(function (data) {
			this.actions.saveDone(data);
			this.actions.getList(0);
		}.bind(this)).fail(function (xhr, ajaxOptions, errorThrown) {
			if (xhr.responseJSON.message) {
				this.actions.saveFailed(xhr.responseJSON.message);
			} else {
				this.actions.saveFailed(errorThrown);
			}
		}.bind(this));
	}
}

export default alt.createActions(ProductCategoryAction);