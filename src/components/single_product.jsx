import React from 'react';
import Product from './product.jsx';
import Banner from './banner.jsx';

import * as Client from '../utils/client.jsx';

export default class SingleProduct extends React.Component {
    constructor(props) {
        super(props);

        this.getProduct = this.getProduct.bind(this);
        this.state = {
            product: null
        }
    }

    getProduct() {
        const id = this.props.params.id;

        Client.getProductById(`/products/${id}`, (product) => {
            this.setState({
                product
            });
        }, (err) => {
            console.log(err);
        });
    }

    componentDidMount() {
        this.getProduct();
    }

    render() {
        let item = null;
        const {product} = this.state;

        if (product) {
            const {in_stock, description, name, attributes} = product;
            const stockLabel = in_stock ? 'In Stock' : 'No disponible';
            const attrs = [];
            attributes.forEach((attr, index) => {
                if (attr.visible) {
                    attrs.push(
                        (
                            <div className='attr-list' key={`attr-${index}`}>
                                <h4>{attr.name}</h4>
                                <p>{attr.options.join(', ')}</p>
                            </div>
                        )
                    );
                }
            });
            item = [];
            item.push(
                (
                    <div
                        className='col-xs-6'
                        key='first-col'
                    >
                        <Product product={product} isSingle={true}/>
                    </div>
                )
            );

            item.push(
                (
                <div
                    className='col-xs-6'
                    key='second-col'
                >
                    <div className='container-details'>
                        {name && (
                            <h1 className='title-product'>{name}</h1>
                        )}

                        <div className='container-description'>
                            <div className='in-stock-status'>
                                Disponibilidad: <span className='stock-status'>{stockLabel}</span>
                            </div>

                            <div className='description' dangerouslySetInnerHTML={{__html: description}}>
                            </div>

                            {attrs && attrs.length > 0 && (
                                <div className='features font-family'>
                                    <h2 className='subtitle'>Características</h2>
                                    {attrs}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                )
            )

        }

        return (
            <div>
                <Banner/>
                <div className='container leaving-up-space'>
                    <div className='row'>
                        {item}
                    </div>
                </div>
            </div>
        );
    }
}