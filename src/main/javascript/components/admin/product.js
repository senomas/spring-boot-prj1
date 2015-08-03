require('../../../../../node_modules/fixed-data-table/dist/fixed-data-table.css');


import React from 'react';
import { RouteHandler } from 'react-router';

import {Panel} from 'react-bootstrap';  
import {Table, Column} from 'fixed-data-table';

import ProductFilter from './ProductFilter';

import action from '../../actions/ProductAction';
import store from '../../stores/ProductStore';



export default class Product extends React.Component {

	constructor(props) {
		super(props);
		this.state = store.getState();
		
		this.rowClick = this.rowClick.bind(this);
		this.storeUpdate = this.storeUpdate.bind(this);
	}
	
	render() {
		console.log('render');
		return (
			<Panel header='Product'>
				{this.state.ajaxCall > 0 ? <div className="loading"><img src='images/load.png'/></div> : ''}
				<Table
					rowHeight={50}
					rowGetter={this.state.list.getRow}
					rowsCount={this.state.list.total}
					onRowClick={this.rowClick}
					width={938}
					height={500}
					headerHeight={50}>
				    
					<Column
						label="#"
						width={50}
						cellClassName="row_NUM"
						align='right'
						fixed={true}
						dataKey="row" />
		
					<Column
						label="Name"
						fixed={true}
						width={400}
						flexGrow={10}
						dataKey="name" />
					
					<Column
						label="Category"
						fixed={true}
						width={400}
						flexGrow={10}
						dataKey="category" />
				</Table>
				<ProductFilter/>
				<RouteHandler/>
			</Panel>
		);
	}
	
	rowClick(e) {
		var row = $(e.target).closest('.fixedDataTableCellGroupLayout_cellGroupWrapper').find('.row_NUM').text();
//		console.log("SELECTED ROW "+row+"  "+JSON.stringify(this.getRow(row-1)));
		window.location.assign('/#/admin/product/id/'+this.state.list.getRow(row-1).id);
	}
	
	componentDidMount() {
//		console.log('didMount');
		store.listen(this.storeUpdate);
		action.getCategories();
		action.getList({
			page: 0,
			filter: this.state.filter
		});
	}
	
	componentWillUnmount() {
		store.unlisten(this.storeUpdate);
	}
	
	storeUpdate(state) {
		this.setState(state);
	}
}
