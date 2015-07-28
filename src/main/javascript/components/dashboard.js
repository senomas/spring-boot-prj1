import React from 'react';

import {Jumbotron} from 'react-bootstrap';

export default class Dashboard extends React.Component {
	render() {
		return (
			<Jumbotron>
				<h1>Dashboard!</h1>
				<p>This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
			</Jumbotron>
		);
	}
	
}