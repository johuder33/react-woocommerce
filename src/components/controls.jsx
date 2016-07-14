import React from 'react';

import * as Utils from '../utils/utils.jsx';

export default class Controls extends React.Component {
    constructor(props) {
        super(props);

        this.goTo = this.goTo.bind(this);
        this.handleCart = this.handleCart.bind(this);
    }

    goTo(e) {
        if (this.props.url) {
            Utils.handleLink(e, `${this.props.url}/${this.props.product.id}`);
        }
    }

    handleCart(e) {
        if (typeof this.props.onAddCart === 'function') {
            const {product} = this.props;
            this.props.onAddCart(e, product);
        }
    }

    render() {
        const metabox = this.props.product.metabox ? Object.keys(this.props.product.metabox): [];
        const hasFile = metabox > 0 ? true : false;
        const classCSS = hasFile ? null : 'expand';
        const attrs = {};

        if (!this.props.label) {
            attrs.className = hasFile ? 'single-control half' : 'single-control';
        }

        const buttons = [
            (
                <div
                    className={`shopping-cart ${classCSS}`}
                    key='add-cart'
                    onClick={this.handleCart}
                >
                    <i className='fa fa-shopping-cart fa-lg pointer'></i>
                </div>
            )
        ];

        if (hasFile) {
            const {url, title} = this.props.product.metabox[metabox[0]];
            buttons.push(
                (
                    <a
                        href={url}
                        target='_blank'
                        className='download-file'
                        key='download-file'
                        title={title}
                    >
                        <i className='fa fa-cloud-download fa-lg pointer'></i>
                    </a>
                )
            );
        }

        return(
            <div className='controls-block'>
                <div className='controls-container'>
                    {this.props.label && (
                        <div className='pointer'>
                            <a
                                onClick={this.goTo}
                                className='font-family'
                            >
                                {this.props.label}
                            </a>
                        </div>
                    )}
                    <div {...attrs}>
                        {buttons}
                    </div>
                </div>
            </div>
        );
    }
}

Controls.propTypes = {
    label: React.PropTypes.string,
    url: React.PropTypes.string,
    product: React.PropTypes.object,
    onAddCart: React.PropTypes.func
};