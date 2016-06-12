import React from 'react';

import * as Client from '../utils/client.jsx';
import * as Utils from '../utils/utils.jsx';

export default class Menu extends React.Component {
	constructor(props) {
		super(props);
		this.handleSearch = this.handleSearch.bind(this);
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
		return (
			<div className='container'>
				<nav className='nav-menu clearfix'>
					<ul className='list-inline custom-inline'>
						<li>
							<a
								className='permalink'
								href='#nosotros'
							>
								Nosotros
							</a>
						</li>
						<li>
							<a
								className='permalink'
								href='#servicios'
							>
								Servicios
							</a>
						</li>
						<li>
							<a
							    className='permalink'
								onClick={(e) => {
									Utils.handleLink(e, '/productos');
								}}
							>
								Productos
							</a>
						</li>
						<li>
							<a
								href='#marcas'
							    className='permalink'
							>
								Marcas
							</a>
						</li>
						<li>
							<a
								href='#contacto'
								className='permalink'
							>
								Contacto
							</a>
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
				</nav>
			</div>
		);
	}
}