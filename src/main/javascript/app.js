import React from 'react';  
import Router from 'react-router';  
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';

import ProductCategory from './components/admin/productCategory.js';

let App = React.createClass({  
  render() {
    return (
      <div className="nav">
        <Link to="app">Home</Link>
        <Link to="adminProductCategory">Product Category</Link>

        {/* this is the importTant part */}
        <RouteHandler/>
      </div>
    );
  }
});

let routes = (  
  <Route name="app" path="/" handler={App}>
    <Route name="adminProductCategory" path="/admin/productCategory" handler={ProductCategory}/>
  </Route>
);

Router.run(routes, function (Handler) {  
  React.render(<Handler/>, document.body);
});