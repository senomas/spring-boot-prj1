require('../../../../../node_modules/fixed-data-table/dist/fixed-data-table.css');
require('../../../../../node_modules/react-select/dist/default.css');


import React from 'react';
import { RouteHandler } from 'react-router';
import Select from 'react-select';

import {Panel, Modal, Button, Input} from 'react-bootstrap';  
import {Table, Column} from 'fixed-data-table';

import action from '../../actions/ProductAction';
import store from '../../stores/ProductStore';


export default class ProductFilter extends React.Component {

	constructor(props) {
		super(props);
		this.state = store.getState();

		this.updateName = this.updateName.bind(this);
		this.updateCategory = this.updateCategory.bind(this);
		this.updateDescription = this.updateDescription.bind(this);
		this.storeUpdate = this.storeUpdate.bind(this);
	}
	
	render() {
		var item = this.state.filter;
		return (
			<div className="cmd-bar">
				<Panel header='Filter' collapsible={true} onSelect={this.filterSelect}>
					<form className='form-horizontal'>
						<Input id="name" value={item.name} onChange={this.updateName} type='text' label='Name' labelClassName='col-xs-2' wrapperClassName='col-xs-10' />
						<div className="form-group">
							<label className="control-label col-xs-2"><span>Category</span></label>
							<div className="col-xs-10">
								<Select
						    		name="type"
						    		value={item.categoryId}
						    		options={this.getCategories()}
									onChange={this.updateCategory}
								/>
							</div>
						</div>
						<Input id="description" value={item.description} onChange={this.updateDescription} type='text' label='Description' labelClassName='col-xs-2' wrapperClassName='col-xs-10' />
					</form>
					<div className="cmd-bar text-center">
						<Button onClick={this.doFilter} bsStyle='primary'>Filter</Button>
					</div>
				</Panel>
			</div>
		);
	}
	
	updateName(e) {
		let filter = this.state.filter;
		filter.name = e.target.value;
		action.updateFilter(filter);
	}
	
	getCategories() {
		let categories = [];
		this.state.categories.map(function(v) {
			categories.push({value: String(v.id), label: v.name});
		});
//		console.log('categories '+JSON.stringify(categories));
		return categories;
	}
	
	updateCategory(id, v) {
//		console.log('updateCategory('+id+', '+v+')');
		let filter = this.state.filter;
		filter.categoryId = id;
//		console.log('FILTER '+JSON.stringify(filter));
		action.updateFilter(filter);
	}
	
	updateDescription(e) {
		let filter = this.state.filter;
		filter.description = e.target.value;
		action.updateFilter(filter);
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
