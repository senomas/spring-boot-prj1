import React from 'react';

import {Navbar, Nav, DropdownButton, MenuItem} from 'react-bootstrap';  

export default class AppHeader extends React.Component {
	render() {
		return (
			<Navbar brand={<a href="#/">Hanoman</a>} >
				<Nav onSelect={this.handleSelect}>
					<DropdownButton eventKey={3} title='Admin'>
						<MenuItem eventKey='admin/productCategory'>Product Category</MenuItem>
						<MenuItem eventKey='admin/product'>Product</MenuItem>
						<MenuItem eventKey=''>item 2</MenuItem>
						<MenuItem divider />
						<MenuItem eventKey=''>item 10</MenuItem>
					</DropdownButton>
					<DropdownButton eventKey={3} title='Reports'>
						<MenuItem eventKey=''>report 1</MenuItem>
						<MenuItem eventKey=''>report 2</MenuItem>
						<MenuItem eventKey=''>report 3</MenuItem>
					</DropdownButton>
				</Nav>
			</Navbar>
		);
	}
	
	handleSelect(page) {
		window.location.assign('/#/'+page);
	}

}