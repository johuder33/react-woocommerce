import React from 'react';

export default class NosotrosSection extends React.Component {
	constructor(props) {
		super(props);		
	}

	render() {
		return (
			<section className='nosotros_block' id='nosotros-section'>
				<div className='row flex'>
					<div className='col-xs-12 col-sm-12 col-md-6 col-lg-6 picture'>
						<figure>
							<img src='https://raw.githubusercontent.com/johuder33/idchile/master/wp-content/themes/idchile/assets/images/nosotros.png' alt='Quienes Somos' title='Quienes Somos' className='img-responsive center-block' />
						</figure>
					</div>

					<div className='col-xs-12 col-sm-12 <?php echo $class; ?> info_company'>
						<div>
							<h3 className='title_company'></h3>
							<h3 className='title_company'>Nosotros</h3>

							<article className='text-justify'>
							</article>
						</div>
					</div>
				</div>
			</section>
		);
	}
}