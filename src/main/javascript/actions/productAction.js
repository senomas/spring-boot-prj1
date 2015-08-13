import alt from '../lib/altInstance';

import appAction from './AppAction';

class ProductAction {

	constructor() {
		this.generateActions('getResolve', 'getFailed');
		this.generateActions('getListResolve', 'getListFailed');
		this.generateActions('getCategoriesResolve', 'getCategoriesFailed');
		this.generateActions('saveDone', 'saveFailed');
		this.generateActions('updateFilter');
	}

	get(id) {
		appAction.ajaxDoStart();
		jQuery.ajax({
			url: '/rs/product/id/'+id,
		}).done(function (data) {
			this.actions.getResolve(data);
			appAction.ajaxDone();
		}.bind(this)).fail(function (xhr, ajaxOptions, errorThrown) {
			if (xhr.responseJSON.message) {
				this.actions.getFailed(xhr.responseJSON.message);
			} else {
				this.actions.getFailed(errorThrown);
			}
			appAction.ajaxDone();
		}.bind(this));
	}

	getList(param) {
		if (!param.background) appAction.ajaxDoStart();
		jQuery.ajax({
			url: '/rs/product',
			type: 'POST',
			contentType: "application/json; charset=utf-8",
			data: JSON.stringify(param),
		}).done(function (data) {
			if (param.clear) {
				this.actions.getListResolve({totalElements: 0});
			}
			this.actions.getListResolve(data);
			if (!param.background) appAction.ajaxDone();
		}.bind(this)).fail(function (xhr, ajaxOptions, errorThrown) {
			if (xhr.responseJSON.message) {
				this.actions.getListFailed(xhr.responseJSON.message);
			} else {
				this.actions.getListFailed(errorThrown);
			}
			if (!param.background) appAction.ajaxDone();
		}.bind(this));
	}

	getCategories() {
		appAction.ajaxDoStart();
		jQuery.ajax({
			url: '/rs/productCategory'
		}).done(function (data) {
			this.actions.getCategoriesResolve(data);
			appAction.ajaxDone();
		}.bind(this)).fail(function (xhr, ajaxOptions, errorThrown) {
			if (xhr.responseJSON.message) {
				this.actions.getCategoriesFailed(xhr.responseJSON.message);
			} else {
				this.actions.getCategoriesFailed(errorThrown);
			}
			appAction.ajaxDone();
		}.bind(this));
	}

	save(data) {
		appAction.ajaxDoStart();
		jQuery.ajax({
			url: '/rs/product',
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
			appAction.ajaxDone();
		}.bind(this)).fail(function (xhr, ajaxOptions, errorThrown) {
			if (xhr.responseJSON.message) {
				this.actions.saveFailed(xhr.responseJSON.message);
			} else {
				this.actions.saveFailed(errorThrown);
			}
			appAction.ajaxDone();
		}.bind(this));
	}
}

export default alt.createActions(ProductAction);
