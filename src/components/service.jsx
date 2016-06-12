import React from 'react';

export default class ServiceSection extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<section className='servicios_block' id='servicios-section'>
				<div className='row'>
					<div className='col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center'>
						<h1 className='title_company'>Servicios</h1>
						<div className='text-box center-block'>
							<p>Mi servicio</p>
						</div>
					</div>
				</div>

				<div className='row text-center'>
					<div className='box-service'>
						<figure className='clearfix column-service'>
							<img src='https://raw.githubusercontent.com/johuder33/idchile/master/wp-content/themes/idchile/assets/images/servicio1.png' alt='Servicios' title='Servicios' className='img-responsive' />
							<span className='rotateHoverAnimation'></span>
						</figure>

						<article className='text-service'>
							<h2>Servicio de Impresión</h2>
							<div className='info-box text-center'>
								<p>Encuentra información sobre viajes y paseos a lugares de interés, hospedajes, transporte.</p>
							</div>
						</article>
					</div>

					<div className='box-service'>
						<figure className='clearfix column-service'>
							<img src='https://raw.githubusercontent.com/johuder33/idchile/master/wp-content/themes/idchile/assets/images/servicio2.png' alt='Servicios' title='Servicios' className='img-responsive center-block' />
							<span className='rotateHoverAnimation'></span>
						</figure>
						<article className='text-service'>
							<h2>Personalizacion de ID</h2>
							<div className='info-box text-center'>
								<p>Encuentra información sobre viajes y paseos a lugares de interés, hospedajes, transporte.</p>
							</div>
						</article>
					</div>

					<div className='box-service'>
						<figure className='clearfix column-service'>
							<img src='https://raw.githubusercontent.com/johuder33/idchile/master/wp-content/themes/idchile/assets/images/servicio3.png' alt='Servicios' title='Servicios' className='img-responsive' />
							<span className='rotateHoverAnimation'></span>
						</figure>
						<article className='text-service'>
							<h2>Soporte Técnico</h2>
							<div className='info-box text-center'>
								<p>Encuentra información sobre viajes y paseos a lugares de interés, hospedajes, transporte.</p>
							</div>
						</article>
					</div>
				</div>
			</section>
		);
	}
}