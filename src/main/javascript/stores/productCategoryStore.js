import alt from '../lib/altInstance';

import action from '../actions/ProductCategoryAction';

class ProductCategoryStore {

	constructor() {
		this.bindListeners({
			fetchStart: action.fetchStart,
			fetchResolve: action.fetchResolve,
			fetchFailed: action.fetchFailed
		});
		
		this.totalElements = 0;
	}
	
	fetchStart(page) {
		console.log('FETCH-START '+page);
	}
	
	fetchResolve(data) {
		console.log('RESOLVE '+JSON.stringify(data));
		this.setState(data);
	}
	
	fetchFailed(error) {
		console.log('FAILED '+JSON.stringify(error));
		this.setState({totalElements: 0});
	}
	
}

export default alt.createStore(ProductCategoryStore, 'ProductCategoryStore');