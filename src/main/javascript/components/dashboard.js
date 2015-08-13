import React from 'react';

import {Jumbotron} from 'react-bootstrap';

import action from '../actions/AppAction';
import store from '../stores/AppStore';

export default class Dashboard extends React.Component {

	constructor(props) {
		super(props);
		this.state = store.getState();

		this.logout = this.logout.bind(this);
		this.storeUpdate = this.storeUpdate.bind(this);
	}

	render() {
		return (
			<Jumbotron>
				<h1>Dashboard!</h1>
				<p>Hello {this.state.login ? this.state.login.user.fullName : "" } <a onClick={this.logout}>Logout</a></p>
				<p>This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
			</Jumbotron>
		);
	}

	logout() {
		action.logout();
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
