import React from 'react';
import * as Client from '../utils/client.jsx';
import Slider from 'nuka-carousel';

export default class Brands extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            brand: null,
            shouldRender: true
        };

        this.settings = {
            slidesToShow: 5,
            dots: false
        };
    }

    componentDidMount() {
        Client.getDataFromServer('/marcas', (brand) => {
            const data = brand.length ? brand.shift() : null;
            this.setState({
                brand: data
            });
        }, (err) => {
            console.log('err', err);
        });
    }

    componentWillReceiveProps(newProps) {
        //console.log('new newProps',newProps.location);
    }

    render() {
        const {shouldRender, brand} = this.state;

        if (!shouldRender || !brand) {
            return (
                <div/>
            );
        }

        const images = brand.meta_box.img_brands;
        let slides = null;

        if (images) {
            const ids = Object.keys(images);
            slides = ids.map((id, index) => {
                const slide = images[id];
                return (
                    <div>
                        <img src={slide.full_url} alt={slide.alt || slide.caption} title={slide.title} />
                    </div>
                );
            });
        }

        return (
            <div className='container'>
                <section className='brands-block clearfix' id='marcas-section'>
                    <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                        <div className='row title-brand'>
                            <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center'>
                                <h2>{brand.title.rendered}</h2>
                            </div>
                        </div>

                        <div className='row title-brand'>
                            <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center'>
                                <article className='brand-info' dangerouslySetInnerHTML={{__html: brand.content.rendered}}>
                                </article>
                            </div>
                        </div>

                        <div className='wrap-carousel'>
                            {slides && (
                                <Slider {...this.settings}>
                                    {slides}
                                </Slider>
                            )}
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

Brands.propTypes = {
    location: React.PropTypes.object
};