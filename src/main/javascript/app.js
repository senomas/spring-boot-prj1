require('jquery');
require('bootstrap');
require('../../../node_modules/bootstrap/dist/css/bootstrap.css');
require("../css/app.css");

import React from 'react';
import Router from 'react-router';
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';

import store from './stores/AppStore';

import Login from './components/login';
import AppHeader from './components/appHeader';
import Dashboard from './components/dashboard';
import ProductCategory from './components/admin/productCategory';
import ProductCategoryEdit from './components/admin/productCategoryEdit';
import Product from './components/admin/product';
import ProductEdit from './components/admin/productEdit';
import PopupError from './components/popupError';

export default class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = store.getState();
		this.storeUpdate = this.storeUpdate.bind(this);
	}

	render() {
		return (
			<div className="app-container container">
				{ this.state.ajaxCall > 0 ? <div className="loading"><img src='images/load.png'/></div> : '' }
				<Login/>
				<PopupError/>
				<AppHeader/>
				<RouteHandler/>
			</div>
		);
	}

	componentDidMount() {
		store.listen(this.storeUpdate);
	}

	componentWillUnmount() {
		store.unlisten(this.storeUpdate);
	}

	storeUpdate(state) {
		this.setState(state);
	}
}

let routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="adminProductCategory" path="/admin/productCategory" handler={ProductCategory}>
    	<Route name="adminProductCategoryEdit" path="id/:id" handler={ProductCategoryEdit}/>
    	<Route name="adminProductCategoryNew" path="new" handler={ProductCategoryEdit}/>
    </Route>
    <Route name="adminProduct" path="/admin/product" handler={Product}>
    	<Route name="adminProductEdit" path="id/:id" handler={ProductEdit}/>
    </Route>
	<Route path="/*" handler={Dashboard}/>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('app'));
});
