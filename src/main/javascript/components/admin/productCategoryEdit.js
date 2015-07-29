require('../../../../../node_modules/fixed-data-table/dist/fixed-data-table.css');


import React from 'react';
import { RouteHandler } from 'react-router';

import {Panel, Modal, Button, Input} from 'react-bootstrap';  
import {Table, Column} from 'fixed-data-table';

import action from '../../actions/ProductCategoryAction';
import store from '../../stores/ProductCategoryStore';


export default class ProductCategoryEdit extends React.Component {

	constructor(props) {
		super(props);
		this.state = store.getState();

		this.updateName = this.updateName.bind(this);
		this.save = this.save.bind(this);
		this.storeUpdate = this.storeUpdate.bind(this);
	}
	
	render() {
		var item = this.state.item;
		return (
			<Modal show={true} onHide={this.ignored}>
				<Modal.Header>
					<Modal.Title>Edit Product Category</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form className='form-horizontal'>
						<Input id="id" value={item.id} readOnly='true' type='text' label='ID' labelClassName='col-xs-2' wrapperClassName='col-xs-10' />
						<Input id="name" value={item.name} onChange={this.updateName} type='text' label='Name' labelClassName='col-xs-2' wrapperClassName='col-xs-10' />
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
		var item = this.state.item;
		item.name = e.target.value;
		this.setState({item: item});
	}
	
	ignored() {
	}
	
	
	save() {
		action.save(this.state.item);
	}
	
	close() {
		window.location.assign('/#/admin/productCategory');
	}
	
	componentDidMount() {
		store.listen(this.storeUpdate);
		action.get(this.props.params.id);
	}
	
	componentWillUnmount() {
		store.unlisten(this.storeUpdate);
	}
	
	storeUpdate(state) {
		this.setState(state);
	}
}
