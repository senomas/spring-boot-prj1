import React from 'react';

import {Panel, Modal, Button, Input} from 'react-bootstrap';  

import action from '../actions/AppAction';
import store from '../stores/AppStore';

export default class Login extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = store.getState();
		
		this.login = this.login.bind(this);
		this.updateLogin = this.updateLogin.bind(this);
		this.updatePassword = this.updatePassword.bind(this);
		this.storeUpdate = this.storeUpdate.bind(this);
	}

	render() {
		let login = this.state.loginForm;
		return (
			<Modal show={!(this.state.login && this.state.login.token)} onHide={this.ignored}>
				<Modal.Header>
					<Modal.Title>Login</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form className='form-horizontal'>
						<Input id="login" value={login.login} onChange={this.updateLogin} type='text' label='Login' labelClassName='col-xs-2' wrapperClassName='col-xs-10' />
						<Input id="password" value={login.password} onChange={this.updatePassword} type='password' label='Password' labelClassName='col-xs-2' wrapperClassName='col-xs-10' />
					</form>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={this.login} bsStyle='primary'>Login</Button>
				</Modal.Footer>
			</Modal>
		);
	}
	
	login() {
		let login = {
			login: this.state.loginForm.login,
			password: this.state.loginForm.password
		};
		this.state.loginForm.password = null;
		action.login(login);
	}
	
	updateLogin(e) {
		var login = this.state.loginForm;
		login.login = e.target.value;
		this.setState({loginForm: login});
	}
	
	updatePassword(e) {
		var login = this.state.loginForm;
		login.password = e.target.value;
		this.setState({loginForm: login});
	}
	
	ignored() {
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