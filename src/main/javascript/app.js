require('jquery');
require('bootstrap');
require('../../../node_modules/bootstrap/dist/css/bootstrap.css');
require("../css/app.css");

import React from 'react';  
import Router from 'react-router';  
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';

import Login from './components/login';
import AppHeader from './components/appHeader';
import Dashboard from './components/dashboard';
import ProductCategory from './components/admin/productCategory';
import ProductCategoryEdit from './components/admin/productCategoryEdit';
import Product from './components/admin/product';
import ProductEdit from './components/admin/productEdit';

export default class App extends React.Component {
	
	render() {
		return (
			<div className="app-container container">
				<Login/>
				<AppHeader/>
				<RouteHandler/>
			</div>
		);
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