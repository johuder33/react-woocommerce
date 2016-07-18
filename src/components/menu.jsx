import React from 'react';

import * as Client from '../utils/client.jsx';
import * as Utils from '../utils/utils.jsx';
import EventStore from '../stores/eventStore.jsx';

export default class Menu extends React.Component {
	constructor(props) {
		super(props);

		this.updateCart = this.updateCart.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
		this.goToContact = this.goToContact.bind(this);

		this.state = {
			cartSize: 0
		}
	}

	goToContact(e) {
		e.preventDefault();
		const hash = '#contacto';
		Utils.scrollAnimated(hash);
	}

	handleHome(e) {
		Utils.handleLink(e, '/');
	}

	updateCart() {
		const cartSize = Utils.getSizeOfCart();
		this.setState({
			cartSize
		});
	}
	
	componentWillMount() {
		EventStore.addUpdateCartListener(this.updateCart);
	}

	componentWillUnMount() {
		EventStore.removeUpdateCartListener(this.updateCart);
	}

	componentDidMount() {
		this.updateCart();
	}

	handleSearch(e) {
		e.preventDefault();

		const isEnter = e.keyCode;

		if (isEnter === 13) {
			const valor = this.refs.search.value.trim();

			const data = {
				'search': valor
			};

			Client.searchProduct('/products', data, (response) => {
				console.log('respuesta', response);
			}, (error) => {
				console.log('error', error);
			});
		}
	}

	render () {
		const {cartSize} = this.state;

		return (
			<div className='container'>
				<nav className='nav-menu clearfix'>
					<div className='wrap-logo'>
						<a
							className='pointer'
							onClick={this.handleHome}
						>
							<img src='./assets/solid2.png' alt='' className='img-responsive'/>
						</a>
					</div>

					<div className='wrap-menu'>
						<ul className='list-inline custom-inline'>
							<li>
								<a
									className='permalink pointer'
									onClick={(e) => {
										Utils.handleLink(e, '/#nosotros');
									}}
								>
									Nosotros
								</a>
							</li>
							<li>
								<a
									className='permalink pointer'
									onClick={(e) => {
										Utils.handleLink(e, '/#servicios');
									}}
								>
									Servicios
								</a>
							</li>
							<li>
								<a
									className='permalink pointer'
									onClick={(e) => {
										Utils.handleLink(e, '/productos');
									}}
								>
									Productos
								</a>
							</li>
							<li>
								<a
									className='permalink pointer'
									onClick={(e) => {
										Utils.handleLink(e, '/#marcas');
									}}
								>
									Marcas
								</a>
							</li>
							<li>
								<a
									className='permalink pointer'
									onClick={this.goToContact}
								>
									Contacto
								</a>
							</li>

							<li>
								<button
									className='btn btn-primary btn-xs badge-solid-container'
									type='button'
									onClick={(e) => {
									Utils.handleLink(e, '/cart');
								}}
								>
									<i className='glyphicon glyphicon-shopping-cart'></i>
									<span className='badge badge-solid'>{cartSize}</span>
								</button>
							</li>

							<li>
								<div className='wrap-search'>
									<input
										type='search'
										ref='search'
										className='search_input'
										onKeyUp={this.handleSearch}
									/>

								<span className='pull'>
									<span className='glyphicon glyphicon-search zoom_search'></span>
								</span>
								</div>
							</li>
						</ul>
					</div>
				</nav>
			</div>
		);
	}
}