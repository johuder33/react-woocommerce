import React from 'react';
import {Carousel, Item, Caption} from 'react-bootstrap';
import Controls from './controls.jsx';

export default class Product extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {images, name, price} = this.props.product;
        const classCss = this.props.isSingle ? 'product-item-container product-item-container-single' : 'product-item-container';
        let attrs = {
            controls: false,
            indicators: false
        };
        let carouselImages = (
            <Carousel.Item>
                <img src={images[0].src} alt={images[0].alt} title={images[0].name} className='img-responsive'/>
            </Carousel.Item>
        );

        if (!this.props.isSingle) {
            attrs.controls = true;
            attrs.indicators = true;
            carouselImages = images.map((img, index) => {
                return (
                    <Carousel.Item key={`image-${index}`}>
                        <img src={img.src} alt={img.alt} title={img.name} className='img-responsive'/>
                    </Carousel.Item>
                );
            });
        }

        return(
            <div className={classCss}>
                <div>
                    <Carousel {...attrs}>
                        {carouselImages}
                    </Carousel>
                </div>
                <div className='caption-product'>
                    <p className='title-product font-family'>{name}</p>
                    <div className='price-product font-family'>
                        {price}
                    </div>
                </div>
                <Controls label={this.props.label} hasFile={this.props.hasFile}/>
            </div>
        );
    }
}

Product.propTypes = {
    product: React.PropTypes.object.isRequired,
    isSingle: React.PropTypes.bool,
    hasFile: React.PropTypes.bool,
    label: React.PropTypes.string
};

Product.defaultProps = {
    isSingle: false,
    hasFile: false
};