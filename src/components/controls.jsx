import React from 'react';

import * as Utils from '../utils/utils.jsx';

export default class Controls extends React.Component {
    constructor(props) {
        super(props);

        this.goTo = this.goTo.bind(this);
        this.addToCart = this.addToCart.bind(this);
    }

    goTo(e) {
        if (this.props.url) {
            Utils.handleLink(e, this.props.url);
        }
    }

    addToCart(e, id) {
        console.log('add cart', id);
    }

    render() {
        const classCSS = this.props.hasFile ? null : 'expand';
        const attrs = {};

        if (!this.props.label) {
            attrs.className = this.props.hasFile ? 'single-control half' : 'single-control';
        }

        const buttons = [
            (
                <div
                    className={`shopping-cart ${classCSS}`}
                    key='add-cart'
                    onClick={(e) => {
                        this.addToCart(e, this.props.idProduct);
                    }}
                >
                    <i className='fa fa-shopping-cart fa-lg pointer'></i>
                </div>
            )
        ];

        if (this.props.hasFile) {
            buttons.push(
                (
                    <div
                        className='download-file'
                        key='download-file'
                    >
                        <i className='fa fa-cloud-download fa-lg pointer'></i>
                    </div>
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
    hasFile: React.PropTypes.bool,
    idProduct: React.PropTypes.string
};