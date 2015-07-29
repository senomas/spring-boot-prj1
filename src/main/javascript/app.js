require('jquery');
require('bootstrap');
require('../../../node_modules/bootstrap/dist/css/bootstrap.css');
require("../css/app.css");

import React from 'react';  
import Router from 'react-router';  
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';

import AppHeader from './components/appHeader.js';
import Dashboard from './components/dashboard.js';
import ProductCategory from './components/admin/productCategory.js';
import ProductCategoryEdit from './components/admin/productCategoryEdit.js';

export default class App extends React.Component {
  render() {
    return (
      <div className="app-container container">
		<AppHeader/>

        <RouteHandler/>
      </div>
    );
  }
};

let routes = (  
  <Route name="app" path="/" handler={App}>
    <Route name="adminProductCategory" path="/admin/productCategory" handler={ProductCategory}>
    	<Route name="adminProductCategoryEdit" path="id/:id" handler={ProductCategoryEdit}/>
    </Route>
	<Route path="/*" handler={Dashboard}/>
  </Route>
);

Router.run(routes, function (Handler) {  
  React.render(<Handler/>, document.getElementById('app'));
});