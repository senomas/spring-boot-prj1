require('../../../../../node_modules/fixed-data-table/dist/fixed-data-table.css');


import React from 'react';
import { RouteHandler } from 'react-router';

import {Panel, Button} from 'react-bootstrap';
import {Table, Column} from 'fixed-data-table';

import action from '../../actions/ProductCategoryAction';
import store from '../../stores/ProductCategoryStore';

export default class ProductCategory extends React.Component {

	constructor(props) {
		super(props);
		this.state = store.getState();

		this.rowClick = this.rowClick.bind(this);
		this.dismissError = this.dismissError.bind(this);
		this.getRow = this.getRow.bind(this);
		this.storeUpdate = this.storeUpdate.bind(this);
	}

	render() {
		return (
			<Panel header='Product Category'>
				<Table
					rowHeight={50}
					rowGetter={this.getRow}
					rowsCount={this.state.list.totalElements}
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
				<div className="cmd-bar text-center">
					<Button onClick={this.createNew} bsStyle='primary'>Create New Item</Button>
				</div>

				<RouteHandler/>
			</Panel>
		);
	}

	rowClick(e) {
		var row = $(e.target).closest('.fixedDataTableCellGroupLayout_cellGroupWrapper').find('.row_NUM').text();
		console.log("SELECTED ROW "+row+"  "+JSON.stringify(this.getRow(row-1)));
		window.location.assign('/#/admin/productCategory/id/'+this.getRow(row-1).id);
	}

	dismissError() {
		this.setState({error: null});
	}

	createNew() {
		window.location.assign('/#/admin/productCategory/new');
	}

	getRow(row) {
		let data = this.state.list.content[row];
		data.row = row + 1;
		return data;
	}

	componentDidMount() {
		store.listen(this.storeUpdate);
		action.getList(0);
	}

	componentWillUnmount() {
		store.unlisten(this.storeUpdate);
	}

	storeUpdate(state) {
		this.setState(state);
	}
}
