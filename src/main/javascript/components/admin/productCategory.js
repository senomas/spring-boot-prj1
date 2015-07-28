require('../../../../../node_modules/fixed-data-table/dist/fixed-data-table.css');


import React from 'react';
import { RouteHandler } from 'react-router';

import {Panel} from 'react-bootstrap';  
import {Table, Column} from 'fixed-data-table';

import action from '../../actions/ProductCategoryAction';
import store from '../../stores/ProductCategoryStore';


export default class ProductCategory extends React.Component {

	constructor(props) {
		super(props);
		this.state = store.getState();
		
		this.getRow = this.getRow.bind(this);
		this.storeUpdate = this.storeUpdate.bind(this);
	}
	
	render() {
		console.log('render');
		return (
			<Panel header='Product Category'>
				<Table
					rowHeight={50}
					rowGetter={this.getRow}
					rowsCount={this.state.totalElements}
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
				</Table>
			</Panel>
		);
	}
	
	getRow(row) {
		let data = this.state.content[row];
		data.row = row + 1;
		return data;
	}
	
	componentDidMount() {
		store.listen(this.storeUpdate);
		
		action.fetch(0);
	}
	
	componentWillUnmount() {
		store.unlisten(this.storeUpdate);
	}
	
	storeUpdate(state) {
		this.setState(state);
	}
}
