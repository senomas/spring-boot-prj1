
export default class ProductCategoryFetcher {
	
	constructor() {
		this.fetcher = this.fetcher.bind(this);
	}

	fetch(page) {
		return null;
//		return new Promise(function (resolve, reject) {
//			console.log('fetch data ajax query');
//			jQuery.ajax({
//				url: '/rs/productCategory',
//				type: 'PUT',
//				contentType: "application/json; charset=utf-8",
//				data: {
//					page: page,
//					size: 1000
//				},
//			}).done(function (data) {
//				resolve(data);
//			}).fail(function (xhr, ajaxOptions, errorThrown) {
//				if (xhr.responseJSON.message) {
//					reject(xhr.responseJSON.message);
//				} else {
//					reject(errorThrown);
//				}
//			});
//		});
	}

}
