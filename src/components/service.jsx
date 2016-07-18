import React from 'react';

import * as Client from '../utils/client.jsx';
import * as Utils from '../utils/utils.jsx';

export default class ServiceSection extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			services: null,
			service_content: null,
			error: null
		};
	}

	componentDidUpdate() {
		if (this.props.location.hash === '#servicios') {
			const hash = this.props.location.hash;
			Utils.scrollAnimated(hash);
		}
	}

	componentDidMount() {
		Client.getDataFromServer('/servicio-content', (servicio_content) => {
			if (servicio_content) {
				Client.getDataFromServer('/services', (data) => {
					this.setState({
						services: data,
						servicio_content: servicio_content[0]
					});
				}, () => {
					this.setState({
						servicio_content: servicio_content[0]
					});
				});
			}
		}, (err) => {
			this.setState({
				error: err
			});
		});
	}

	render() {
		const {services, servicio_content} = this.state;

		if (!services) {
			return (
				<div/>
			);
		}

		const servicesArray = services.map((service, index) => {
			const metabox = service.meta_box.constructor.name === 'Object' ? service.meta_box : null;
			const instanceImage = metabox ? metabox.image_service : null;
			const metaboxID = instanceImage ? Object.keys(instanceImage) : null;
			const image = metaboxID ? instanceImage[metaboxID[0]] : null;

			return (
				<div
					className='box-service'
					key={`service-${index}`}
				>
					<figure className='clearfix column-service'>
						{image && (
							<img src={image.full_url} alt={image.alt || image.caption} title={image.title} className='img-responsive' />
						)}
						<span className='rotateHoverAnimation'></span>
					</figure>

					<article className='text-service'>
						<h2>{service.title.rendered}</h2>
						<div className='info-box text-center' dangerouslySetInnerHTML={{__html: service.content.rendered}}>
						</div>
					</article>
				</div>
			);
		});

		return (
			<section className='servicios_block' id='servicios-section'>
				<div className='row'>
					<div className='col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center'>
						<h1 className='title_company'>{servicio_content.title.rendered}</h1>
						<div className='text-box center-block' dangerouslySetInnerHTML={{__html: servicio_content.content.rendered}}>
						</div>
					</div>
				</div>

				<div className='row text-center'>
					{servicesArray}
				</div>
			</section>
		);
	}
}

ServiceSection.propTypes = {
	location: React.PropTypes.object
};