import alt from '../lib/altInstance';

import appAction from './AppAction';

class ProductCategoryAction {

	constructor() {
		this.generateActions('activate', 'deactivate');
		this.generateActions('getStart', 'getResolve', 'getFailed');
		this.generateActions('getListResolve', 'getListFailed');
		this.generateActions('saveDone', 'saveFailed');
		this.generateActions('deleteDone', 'deleteFailed');
	}

	get(id) {
		this.actions.getStart(id);
		appAction.ajaxStart();
		jQuery.ajax({
			url: '/rs/productCategory/id/'+id,
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
			url: '/rs/productCategory',
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
			console.log('ERROR getList '+JSON.stringify(xhr));
			if (xhr.responseJSON.status == 403 && xhr.responseJSON.message == "Access Denied" && xhr.responseJSON.exception == "org.springframework.security.authentication.ProviderNotFoundException") {
				appAction.loginDone(null);
			} else {
				this.actions.getListFailed(xhr.responseJSON.message);
				appAction.showError(xhr.responseJSON.message);
			}
			if (!param.background) appAction.ajaxDone();
		}.bind(this));
	}

	save(data) {
		appAction.ajaxStart();
		jQuery.ajax({
			url: '/rs/productCategory/',
			type: 'PUT',
			contentType: "application/json; charset=utf-8",
			data: JSON.stringify({
				id: data.id,
				name: data.name
			}),
		    beforeSend: function (xhr) {
		        xhr.setRequestHeader('Authorization', 'Bearer '+sessionStorage.getItem('token'));
		    }
		}).done(function (data) {
			this.actions.saveDone(data);
			appAction.ajaxDone();
		}.bind(this)).fail(function (xhr) {
			console.log('ERROR '+JSON.stringify(xhr));
			if (xhr.responseJSON.status == 403 && xhr.responseJSON.message == "Access Denied" && xhr.responseJSON.exception == "org.springframework.security.authentication.ProviderNotFoundException") {
				appAction.loginDone(null);
			} else {
				this.actions.saveFailed(xhr.responseJSON.message);
				appAction.showError(xhr.responseJSON.message);
			}
			appAction.ajaxDone();
		}.bind(this));
	}

	delete(id) {
		appAction.ajaxStart();
		jQuery.ajax({
			url: '/rs/productCategory/id/'+id,
			type: 'DELETE',
		    beforeSend: function (xhr) {
		        xhr.setRequestHeader('Authorization', 'Bearer '+sessionStorage.getItem('token'));
		    }
		}).done(function (data) {
			this.actions.deleteDone(data);
			this.actions.getList(0);
			appAction.ajaxDone();
		}.bind(this)).fail(function (xhr) {
			console.log('ERROR '+JSON.stringify(xhr));
			if (xhr.responseJSON.status == 403 && xhr.responseJSON.message == "Access Denied" && xhr.responseJSON.exception == "org.springframework.security.authentication.ProviderNotFoundException") {
				appAction.loginDone(null);
			} else {
				this.actions.deleteFailed(xhr.responseJSON.message);
				appAction.showError(xhr.responseJSON.message);
			}
			appAction.ajaxDone();
		}.bind(this));
	}
}

export default alt.createActions(ProductCategoryAction);
