import React from 'react';
import * as Client from '../utils/client.jsx';

export default class NosotrosSection extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			post: null,
			featured_image: null,
			error: null
		};
	}

	componentDidMount() {
		Client.getDataFromServer('/nosotros', (data) => {
			const post = typeof data === 'object' ? data.shift() : data;

			if (post) {
				const media_id = post.featured_media;
				return Client.getDataFromServer(`/media/${media_id}`, (media) => {
					const featured_media = media;
					return this.setState({
						post,
					 	featured_media
					});
				}, () =>{
					return this.setState({
						post
					});
				});
			}

			return this.setState({
				post
			});
		}, (error) => {
			this.setState({
				error
			});
		});
	}

	render() {
		const {post} = this.state;
		const {featured_media} = this.state;

		if (!post && !featured_media) {
			return (
				<div/>
			);
		}

		const {sizes} = featured_media.media_details;

		return (
			<section className='nosotros_block' id='nosotros-section'>
				<div className='row flex'>
					<div className='col-xs-12 col-sm-12 col-md-6 col-lg-6 picture'>
						<figure>
							<img src={sizes.full.source_url} alt={featured_media.alt_text} title={featured_media.title.rendered} className='img-responsive center-block' />
						</figure>
					</div>

					<div className='col-xs-12 col-sm-12 <?php echo $class; ?> info_company'>
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