import alt from '../lib/altInstance';

import appAction from './AppAction';

class ProductAction {

	constructor() {
		this.generateActions('activate', 'deactivate');
		this.generateActions('getStart', 'getResolve', 'getFailed');
		this.generateActions('getListResolve', 'getListFailed');
		this.generateActions('getCategoriesResolve', 'getCategoriesFailed');
		this.generateActions('saveDone', 'saveFailed');
		this.generateActions('updateFilter');
	}

	get(id) {
		this.actions.getStart(id);
		appAction.ajaxStart();
		jQuery.ajax({
			url: '/rs/product/id/'+id,
			beforeSend: function (xhr) {
				xhr.setRequestHeader('Authorization', 'Bearer '+sessionStorage.getItem('token'));
		  }
		}).done(function (data) {
			this.actions.getResolve(data);
			appAction.ajaxDone();
		}.bind(this)).fail(function (xhr) {
			if (xhr.responseJSON.status == 403 && xhr.responseJSON.message == "Access Denied" && xhr.responseJSON.exception == "org.springframework.security.authentication.ProviderNotFoundException") {
				appAction.loginDone(null);
			} else {
				this.actions.getFailed(xhr.responseJSON.message);
				appAction.showError(xhr.responseJSON.message);
			}
			appAction.ajaxDone();
		}.bind(this));
	}

	getList(param) {
		if (!param.background) appAction.ajaxStart();
		jQuery.ajax({
			url: '/rs/product',
			type: 'POST',
			contentType: "application/json; charset=utf-8",
			data: JSON.stringify(param),
			beforeSend: function (xhr) {
				xhr.setRequestHeader('Authorization', 'Bearer '+sessionStorage.getItem('token'));
		  }
		}).done(function (data) {
			if (param.clear) {
				this.actions.getListResolve({totalElements: 0});
			}
			this.actions.getListResolve(data);
			if (!param.background) appAction.ajaxDone();
		}.bind(this)).fail(function (xhr) {
			if (xhr.responseJSON.status == 403 && xhr.responseJSON.message == "Access Denied" && xhr.responseJSON.exception == "org.springframework.security.authentication.ProviderNotFoundException") {
				appAction.loginDone(null);
			} else {
				this.actions.getListFailed(xhr.responseJSON.message);
				appAction.showError(xhr.responseJSON.message);
			}
			if (!param.background) appAction.ajaxDone();
		}.bind(this));
	}

	getCategories() {
		appAction.ajaxStart();
		jQuery.ajax({
			url: '/rs/productCategory',
			beforeSend: function (xhr) {
				xhr.setRequestHeader('Authorization', 'Bearer '+sessionStorage.getItem('token'));
		  }
		}).done(function (data) {
			this.actions.getCategoriesResolve(data);
			appAction.ajaxDone();
		}.bind(this)).fail(function (xhr) {
			if (xhr.responseJSON.status == 403 && xhr.responseJSON.message == "Access Denied" && xhr.responseJSON.exception == "org.springframework.security.authentication.ProviderNotFoundException") {
				appAction.loginDone(null);
			} else {
				this.actions.getCategoriesFailed(xhr.responseJSON.message);
				appAction.showError(xhr.responseJSON.message);
			}
			appAction.ajaxDone();
		}.bind(this));
	}

	save(data) {
		appAction.ajaxStart();
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
			beforeSend: function (xhr) {
				xhr.setRequestHeader('Authorization', 'Bearer '+sessionStorage.getItem('token'));
		  }
		}).done(function (data) {
			this.actions.saveDone(data);
			appAction.ajaxDone();
		}.bind(this)).fail(function (xhr) {
			if (xhr.responseJSON.status == 403 && xhr.responseJSON.message == "Access Denied" && xhr.responseJSON.exception == "org.springframework.security.authentication.ProviderNotFoundException") {
				appAction.loginDone(null);
			} else {
				this.actions.saveFailed(xhr.responseJSON.message);
				appAction.showError(xhr.responseJSON.message);
			}
			appAction.ajaxDone();
		}.bind(this));
	}
}

export default alt.createActions(ProductAction);
