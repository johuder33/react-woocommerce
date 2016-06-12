import React from 'react';

export default class Footer extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<footer className='container-fluid footer-block'>
				<section className='row footer-section'>
					<div className='container wrap-footer' id='contacto-section'>
						
						<div className='row'>
							<div className='col-xs-12 col-sm-12 col-md-7 col-lg-7 col-md-push-5 col-lg-push-5 wrap-form-title'>
								<h3 className='form-title'>Contacto</h3>
							</div>
						</div>

						<div className='row elements-box'>
							<div className='col-xs-12 col-sm-12 col-md-5 col-lg-5'>
								<section className='address'>
									<h3 className='phone-number'>
										<a href='tel:+8005480923'>
											(800) 548-0923
										</a>
									</h3>
									<div className='sociales'>
										<a href='#!' className='btn-circle'>
											<i className='fa fa-facebook'></i>
										</a>

										<a href='#!' className='btn-circle'>
											<i className='fa fa-twitter'></i>
										</a>

										<a href='#!' className='btn-circle'>
											<i className='fa fa-instagram'></i>
										</a>
									</div>
									<address className='address-info'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae, facere.</address>
								</section>
							</div>

							<div className='col-xs-12 col-sm-12 col-md-7 col-lg-7'>
								<section className='form-block'>
									<form action='' className='form-landscape'>
										<div className='form-group'>
											<input type='text' className='form-control field' placeholder='Nombre' name='nombre' />
											<input type='text' className='form-control field' placeholder='E-mail' name='email' />
											<textarea name='mensaje' className='form-control field' cols='30' rows='10' placeholder='Mensaje'></textarea>
											<button className='btn btn-default btn-sm btn-form'>Enviar</button>
										</div>
									</form>
								</section>
							</div>
						</div>

					</div>
				</section>

				<div className='row subfooter border text-center'>
					<span className='copyright'>Copyright 2016 ID Chile, Group. All rights reserved.</span>
				</div>
			</footer>
		);
	}
}