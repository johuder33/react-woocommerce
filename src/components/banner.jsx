import React from 'react';

export default class Banner extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<section className='banner'>
				<div className='wrap-sliders'>
					<img src='https://raw.githubusercontent.com/johuder33/idchile/master/wp-content/themes/idchile/assets/images/banners/banner.png' alt='Banner' className='img-responsive center-block' />
				</div>
				<div className='line_bottom'></div>
			</section>
		);
	}
}