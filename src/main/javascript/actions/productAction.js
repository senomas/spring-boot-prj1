import alt from '../lib/altInstance';

class ProductAction {
	
	constructor() {
		this.generateActions('ajaxStart', 'ajaxDone');
		this.generateActions('getResolve', 'getFailed');
		this.generateActions('getListResolve', 'getListFailed');
		this.generateActions('getCategoriesResolve', 'getCategoriesFailed');
		this.generateActions('saveDone', 'saveFailed');
		this.generateActions('updateFilter');
	}
	
	get(id) {
		this.actions.ajaxStart();
		jQuery.ajax({
			url: '/rs/product/id/'+id,
		}).done(function (data) {
			this.actions.getResolve(data);
			this.actions.ajaxDone();
		}.bind(this)).fail(function (xhr, ajaxOptions, errorThrown) {
			if (xhr.responseJSON.message) {
				this.actions.getFailed(xhr.responseJSON.message);
			} else {
				this.actions.getFailed(errorThrown);
			}
			this.actions.ajaxDone();
		}.bind(this));
	}
	
	getList(param) {
		if (!param.background) this.actions.ajaxStart();
		jQuery.ajax({
			url: '/rs/product',
			type: 'POST',
			contentType: "application/json; charset=utf-8",
			data: JSON.stringify(param),
		}).done(function (data) {
			this.actions.getListResolve(data);
			if (!param.background) this.actions.ajaxDone();
		}.bind(this)).fail(function (xhr, ajaxOptions, errorThrown) {
			if (xhr.responseJSON.message) {
				this.actions.getListFailed(xhr.responseJSON.message);
			} else {
				this.actions.getListFailed(errorThrown);
			}
			if (!param.background) this.actions.ajaxDone();
		}.bind(this));
	}
	
	getCategories() {
		this.actions.ajaxStart();
		jQuery.ajax({
			url: '/rs/productCategory'
		}).done(function (data) {
			this.actions.getCategoriesResolve(data);
			this.actions.ajaxDone();
		}.bind(this)).fail(function (xhr, ajaxOptions, errorThrown) {
			if (xhr.responseJSON.message) {
				this.actions.getCategoriesFailed(xhr.responseJSON.message);
			} else {
				this.actions.getCategoriesFailed(errorThrown);
			}
			this.actions.ajaxDone();
		}.bind(this));
	}

	save(data) {
		this.actions.ajaxStart();
		jQuery.ajax({
			url: '/rs/product/',
			type: 'PUT',
			contentType: "application/json; charset=utf-8",
			data: JSON.stringify({
				id: data.id,
				category: {id: data.category.id},
				name: data.name,
				description: data.description
			}),
		}).done(function (data) {
			this.actions.saveDone(data);
			this.actions.ajaxDone();
		}.bind(this)).fail(function (xhr, ajaxOptions, errorThrown) {
			if (xhr.responseJSON.message) {
				this.actions.saveFailed(xhr.responseJSON.message);
			} else {
				this.actions.saveFailed(errorThrown);
			}
			this.actions.ajaxDone();
		}.bind(this));
	}
}

export default alt.createActions(ProductAction);