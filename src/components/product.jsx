import React from 'react';
import {Carousel, Item, Caption} from 'react-bootstrap';
import Controls from './controls.jsx';

export default class Product extends React.Component {
    constructor(props) {
        super(props);

        this.handleCompare = this.handleCompare.bind(this);
    }

    handleCompare(e) {
        e.preventDefault();
        const {isComparing} = this.props;
        const target = e.currentTarget;
        if (this.props.onCompare && typeof this.props.onCompare === 'function' && isComparing && !this.props.isSingle) {
            const {id, name} = this.props.product;
            this.props.onCompare(target, {id, name});
        }
    }

    render() {
        const {images, all_images, name, price} = this.props.product;
        const {onAddCart} = this.props;
        const classCss = this.props.isSingle ? 'product-item-container product-item-container-single' : 'product-item-container';

        let attrs = {
            controls: false,
            indicators: false
        };

        let carouselImages = null;

        if (all_images) {
            const image = all_images.shop_catalog || all_images.medium || all_images.shop_thumbnail || all_images.thumbnail;
            carouselImages = (
                <Carousel.Item>
                    <img src={image.url} className='img-responsive center-block'/>
                </Carousel.Item>
            );
        }else {
            carouselImages = (
                <Carousel.Item>
                    <img src={images[0].src} alt={images[0].alt} title={images[0].name} className='img-responsive center-block'/>
                </Carousel.Item>
            );
        }

        if (this.props.isSingle && images.length > 1) {
            attrs.controls = true;
            attrs.indicators = true;
            carouselImages = images.map((img, index) => {
                return (
                    <Carousel.Item key={`image-${index}`}>
                        <img src={img.src} alt={img.alt} title={img.name} className='img-responsive  center-block'/>
                    </Carousel.Item>
                );
            });
        }

        return(
            <div
                className={classCss}
                style={this.props.styleCss}
                onClick={this.handleCompare}
            >
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
                <Controls label={this.props.label} hasFile={this.props.hasFile} product={this.props.product} onAddCart={onAddCart} url={'/productos'}/>
            </div>
        );
    }
}

Product.propTypes = {
    product: React.PropTypes.object.isRequired,
    isSingle: React.PropTypes.bool,
    label: React.PropTypes.string,
    onAddCart: React.PropTypes.func,
    iterator: React.PropTypes.number,
    onCompare: React.PropTypes.func,
    isComparing: React.PropTypes.bool
};

Product.defaultProps = {
    isSingle: false
};