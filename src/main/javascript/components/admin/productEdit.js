require('../../../../../node_modules/fixed-data-table/dist/fixed-data-table.css');
require('../../../../../node_modules/react-select/dist/default.css');


import React from 'react';
import { RouteHandler } from 'react-router';
import Select from 'react-select';

import {Panel, Modal, Button, Input} from 'react-bootstrap';
import {Table, Column} from 'fixed-data-table';

import action from '../../actions/ProductAction';
import store from '../../stores/ProductStore';


export default class ProductEdit extends React.Component {

	constructor(props) {
		super(props);
		this.state = store.getState();

		this.updateName = this.updateName.bind(this);
		this.updateCategory = this.updateCategory.bind(this);
		this.getCategories = this.getCategories.bind(this);
		this.save = this.save.bind(this);
		this.storeUpdate = this.storeUpdate.bind(this);
	}

	render() {
		var item = this.state.item;
		if (!item) return null;
		return (
			<Modal show={!this.state.error} onHide={this.ignored}>
				<Modal.Header>
					<Modal.Title>Edit Product</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form className='form-horizontal'>
						<Input id="id" value={item.id} readOnly='true' type='text' label='ID' labelClassName='col-xs-2' wrapperClassName='col-xs-10' />
						<Input id="name" value={item.name} onChange={this.updateName} type='text' label='Name' labelClassName='col-xs-2' wrapperClassName='col-xs-10' />
						<div className="form-group">
							<label className="control-label col-xs-2"><span>Category</span></label>
							<div className="col-xs-10">
								<Select
						    		name="type"
						    		value={String(item.category.id)}
						    		options={this.getCategories()}
									onChange={this.updateCategory}
								/>
							</div>
						</div>
						<Input id="description" value={item.description} onChange={this.updateDescription} type='text' label='Description' labelClassName='col-xs-2' wrapperClassName='col-xs-10' />
					</form>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={this.save} bsStyle='primary'>Save</Button>
					<Button onClick={this.delete} bsStyle='danger'>Delete</Button>
					<Button onClick={this.close}>Close</Button>
				</Modal.Footer>
			</Modal>
		);
	}

	updateName(e) {
		let item = this.state.item;
		item.name = e.target.value;
		this.setState({item: item});
	}

	getCategories() {
		let categories = [];
		this.state.categories.map(function(v) {
			categories.push({value: String(v.id), label: v.name});
		});
		console.log('categories '+JSON.stringify(categories));
		return categories;
	}

	updateCategory(id, v) {
		console.log('updateCategory('+id+', '+v+')');
		let item = this.state.item;
		if (id) {
			this.state.categories.map(function(v) {
				if (v.id == id) {
					item.category = v;
				}
			});
		} else {
			item.category = {id: ''};
		}
		console.log('ITEM '+JSON.stringify(item));
		this.setState({item: item});
	}

	updateDescription(e) {
		var item = this.state.item;
		item.description = e.target.value;
		this.setState({item: item});
	}

	ignored() {
	}


	save() {
		action.save(this.state.item);
	}

	close() {
		window.location.assign('/#/admin/product');
	}

	componentDidMount() {
		store.listen(this.storeUpdate);
		if (this.props.params.id) {
			action.get(this.props.params.id);
		} else {
			action.getResolve({category: {}});
		}
	}

	componentWillUnmount() {
		store.unlisten(this.storeUpdate);
	}

	storeUpdate(state) {
		this.setState(state);
	}
}
