import React from 'react';
import * as Client from '../utils/client.jsx';
import * as Utils from '../utils/utils.jsx';

export default class NosotrosSection extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			post: null,
			error: null
		};
	}

	componentDidMount() {
		Client.getDataFromServer('/nosotros', (data) => {
			const post = typeof data === 'object' ? data.shift() : data;
			this.setState({
				post
			});
		}, (error) => {
			this.setState({
				error
			});
		});
	}
	
	componentDidUpdate() {
		if (this.props.location.hash === '#nosotros') {
			const hash = this.props.location.hash;
			Utils.scrollAnimated(hash);
		}
	}

	render() {
		const {post} = this.state;
		const all_images = post ? post.all_images : false;

		if (!post) {
			return (
				<div/>
			);
		}

		const image = all_images ? all_images.full : all_images;

		return (
			<section className='nosotros_block' id='nosotros-section'>
				<div className='row flex'>
					{image && (
						<div className='col-xs-12 col-sm-12 col-md-6 col-lg-6 picture'>
							<figure>
								<img src={image.url} className='img-responsive center-block' />
							</figure>
						</div>
					)}

					<div className='col-xs-12 col-sm-12 info_company'>
						<div>
							<h3 className='title_company'>{post.title.rendered}</h3>
							<h3 className='title_company'>{post.type}</h3>

							<article className='text-justify' dangerouslySetInnerHTML={{__html: post.content.rendered}}>
							</article>
						</div>
					</div>
				</div>
			</section>
		);
	}
}

NosotrosSection.propTypes = {
	location: React.PropTypes.object
};