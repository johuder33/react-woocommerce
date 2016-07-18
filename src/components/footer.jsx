import React from 'react';
import * as Client from '../utils/client.jsx';

export default class Footer extends React.Component {
	constructor(props) {
		super(props);

		this.sender = this.sender.bind(this);
		this.sending = false;

		this.state = {
			error: null,
			contact: null
		};
	}

	componentDidMount() {
		Client.getContact('/get_contact', (contact) => {
			this.setState({
				contact
			});
		}, (err) => {
			this.setState({
				error: err.message
			});
		});
	}

	sender(e) {
		e.preventDefault();
		const button = e.target;

		if (this.sending) {
			return null;
		}

		const emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
		const message = this.refs.message.value.trim();
		const email = this.refs.email.value.trim();
		const person = this.refs.fullname.value.trim();

		if (message === '' || person === '') {
			return this.setState({
				error: 'Faltan campos por llenar'
			});
		}

		if (!emailPattern.test(email)) {
			return this.setState({
				error: `Su email : ${email}, no es válido verifiquelo por favor.`
			});
		}

		this.sending = true;
		button.disabled = true;
		button.classList.add('disabled');
		button.innerHTML = 'Enviando <i class="fa fa-spinner fa-pulse fa-1x fa-fw"></i>';

		return Client.send('/send', (data) => {
			console.log(data);
			this.sending = false;
			button.disabled = false;
			button.innerHTML = 'Enviar';
			button.classList.remove('disabled');
			this.refs.message.value = '';
			this.refs.fullname.value = '';
			this.refs.email.value = '';

			return this.setState({
				error: data.message
			});
		}, (err) => {
			this.sending = false;
			button.disabled = false;
			button.innerHTML = 'Enviar';
			button.classList.remove('disabled');

			return this.setState({
				error: err.message
			});
		}, {
			person,
			message,
			email
		});
	}

	render() {
		const {error, contact} = this.state;

		if (!contact) {
			return (
				<div/>
			);
		}

		const meta_key = contact.meta_box ? Object.keys(contact.meta_box) : null;
		let tlf = null;

		if (meta_key) {
			tlf = contact.meta_box[meta_key.shift()];
		}

		const social_keys = Object.keys(contact.socials);

		const iconsSocials = social_keys.map((key, index) => {
			const url = contact.socials[key];
			if(url && url.length > 0) {
				return (
					<a
						href={url} target='_blank'
						className='btn-circle'
						key={`sn-${index}`}
					>
						<i className={`fa fa-${key}`}></i>
					</a>
				);
			}
		});

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
										<a href={tlf && `tel:+${tlf}`}>
											{tlf}
										</a>
									</h3>
									<div className='sociales'>
										{iconsSocials}
									</div>
									<address className='address-info' dangerouslySetInnerHTML={{__html: contact.post_content}}></address>
								</section>
							</div>

							<div className='col-xs-12 col-sm-12 col-md-7 col-lg-7'>
								<section className='form-block'>
									{error}
									<form action='' className='form-landscape'>
										<div className='form-group'>
											<input
												type='text'
												className='form-control field'
												placeholder='Nombre'
												name='nombre'
												ref={'fullname'}
											/>
											<input
												type='text'
												className='form-control field'
												placeholder='E-mail'
												name='email'
												ref={'email'}
											/>
											<textarea
												name='mensaje'
												className='form-control field'
												cols='30'
												rows='10'
												placeholder='Mensaje'
												ref={'message'}
											></textarea>
											<button
												className='btn btn-default btn-sm btn-form'
												onClick={this.sender}
											>
												Enviar Mensaje
											</button>
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