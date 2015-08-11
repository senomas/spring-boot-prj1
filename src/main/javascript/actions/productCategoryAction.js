import alt from '../lib/altInstance';

import appAction from './AppAction';

class ProductCategoryAction {
	
	constructor() {
		this.generateActions('getStart', 'getResolve', 'getFailed');
		this.generateActions('getListStart', 'getListResolve', 'getListFailed');
		this.generateActions('saveStart', 'saveDone', 'saveFailed');
		this.generateActions('deleteStart', 'deleteDone', 'deleteFailed');
	}
	
	get(id) {
		this.actions.getStart(id);
		jQuery.ajax({
			url: '/rs/productCategory/id/'+id,
		    beforeSend: function (xhr) {
		        xhr.setRequestHeader('Authorization', 'Bearer '+sessionStorage.getItem('token'));
		    }
		}).done(function (data) {
			this.actions.getResolve(data);
		}.bind(this)).fail(function (xhr) {
			if (xhr.responseJSON.status == 403 && xhr.responseJSON.message == "Access Denied" && xhr.responseJSON.exception == "org.springframework.security.authentication.ProviderNotFoundException") {
				appAction.loginDone(null);
			} else if (xhr.responseJSON.message) {
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
		    beforeSend: function (xhr) {
		        xhr.setRequestHeader('Authorization', 'Bearer '+sessionStorage.getItem('token'));
		    }
		}).done(function (data) {
			this.actions.getListResolve(data);
		}.bind(this)).fail(function (xhr) {
			console.log('ERROR '+JSON.stringify(xhr));
			if (xhr.responseJSON.status == 403 && xhr.responseJSON.message == "Access Denied" && xhr.responseJSON.exception == "org.springframework.security.authentication.ProviderNotFoundException") {
				appAction.loginDone(null);
			} else if (xhr.responseJSON.message) {
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
		    beforeSend: function (xhr) {
		        xhr.setRequestHeader('Authorization', 'Bearer '+sessionStorage.getItem('token'));
		    }
		}).done(function (data) {
			this.actions.saveDone(data);
			this.actions.getList(0);
		}.bind(this)).fail(function (xhr) {
			console.log('ERROR '+JSON.stringify(xhr));
			if (xhr.responseJSON.status == 403 && xhr.responseJSON.message == "Access Denied" && xhr.responseJSON.exception == "org.springframework.security.authentication.ProviderNotFoundException") {
				appAction.loginDone(null);
			} else if (xhr.responseJSON.message) {
				this.actions.saveFailed(xhr.responseJSON.message);
			} else {
				this.actions.saveFailed(errorThrown);
			}
		}.bind(this));
	}

	delete(id) {
		this.actions.deleteStart(id);
		jQuery.ajax({
			url: '/rs/productCategory/id/'+id,
			type: 'DELETE',
		    beforeSend: function (xhr) {
		        xhr.setRequestHeader('Authorization', 'Bearer '+sessionStorage.getItem('token'));
		    }
		}).done(function (data) {
			this.actions.deleteDone(data);
			this.actions.getList(0);
		}.bind(this)).fail(function (xhr) {
			console.log('ERROR '+JSON.stringify(xhr));
			if (xhr.responseJSON.status == 403 && xhr.responseJSON.message == "Access Denied" && xhr.responseJSON.exception == "org.springframework.security.authentication.ProviderNotFoundException") {
				appAction.loginDone(null);
			} else if (xhr.responseJSON.message) {
				this.actions.deleteFailed(xhr.responseJSON.message);
			} else {
				this.actions.deleteFailed(errorThrown);
			}
		}.bind(this));
	}
}

export default alt.createActions(ProductCategoryAction);