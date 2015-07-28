import alt from '../lib/altInstance';

class ProductCategoryAction {
	
	constructor() {
		this.generateActions('fetchStart', 'fetchResolve', 'fetchFailed');
	}

	fetch(page) {
		this.actions.fetchStart(page);
		
		console.log('fetch data ajax query');
		jQuery.ajax({
			url: '/rs/productCategory/',
			type: 'POST',
			contentType: "application/json; charset=utf-8",
			data: JSON.stringify({
				page: page,
				size: 1000
			}),
		}).done(function (data) {
			this.actions.fetchResolve(data);
		}.bind(this)).fail(function (xhr, ajaxOptions, errorThrown) {
			if (xhr.responseJSON.message) {
				this.actions.fetchFailed(xhr.responseJSON.message);
			} else {
				this.actions.fetchFailed(errorThrown);
			}
		}.bind(this));
	}
}

export default alt.createActions(ProductCategoryAction);