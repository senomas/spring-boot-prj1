import React from 'react';

import {Panel, Modal, Button, Input} from 'react-bootstrap';  

import action from '../actions/AppAction';
import store from '../stores/AppStore';

export default class PopupError extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = store.getState();
		
		this.dismiss = this.dismiss.bind(this);
		this.storeUpdate = this.storeUpdate.bind(this);
	}

	render() {
		return (
			<Modal show={this.state.error} onHide={this.ignored} bsStyle='danger'>
				<Modal.Header>
					<Modal.Title>Error</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div>{this.state.error}</div>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={this.dismiss} bsStyle='primary'>Dismiss</Button>
				</Modal.Footer>
			</Modal>
		);
	}
	
	ignored() {
	}
	
	dismiss() {
		action.dismissError();
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