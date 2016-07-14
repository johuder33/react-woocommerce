// Copyright (c) 2016 ZBox, Spa. All Rights Reserved.
// See LICENSE.txt for license information.
import React from 'react';
import * as Actions from '../actions/actions.jsx';

import Product from './product.jsx';

import * as Client from '../utils/client.jsx';
import * as Utils from '../utils/utils.jsx';
import Pagination from './common/pagination.jsx';

export default class Products extends React.Component {
    constructor(props) {
        super(props);

        this.getProducts = this.getProducts.bind(this);
        this.page = this.props.location.query.page || 1;

        this.state = {
            loading: true,
            page: this.page
        };
    }

    handlePaginate(e, id) {
        const path = id > 1 ? `/productos?page=${id}` : '/productos';
        Utils.handleLink(e, path);
    }

    onAddCart(e, product) {
        e.preventDefault();
        const values = {
            id: product.id,
            cant: 1,
            price: product.price,
            name: product.name,
            images: product.images
        };

        Utils.addToCart(values.id, values);

        Actions.updateCart();
    }

    getProducts() {
        const parameters = {
            per_page: 16,
            page: this.state.page
        };

        Client.getAllProducts('/products', (response, req) => {
           const totalPages = req.getResponseHeader('X-WP-TotalPages');

           this.setState({
               products: response,
               loading: false,
               totalPages
           });

           /*setTimeout(() => {
               console.log('set order');
               const data = {
                   "payment_method": "wc_gateway_cod",
                   "payment_method_title": "Cash on Delivery",
                   "set_paid": false,
                   "billing": {
                       "first_name": "Juorder",
                       "last_name": "Gonzalez",
                       "address_1": "Mac Iver 524",
                       "address_2": "",
                       "city": "Santiago de Chile",
                       "state": "RM",
                       "postcode": "94103",
                       "country": "CL",
                       "email": "johudergb@hotmail.com",
                       "phone": "04161179668"
                   },
                   "line_items": [
                       {
                           "product_id": 99,
                           "quantity": 1
                       },
                       {
                           "product_id": 83,
                           "quantity": 2
                       }
                   ]
               };
               Client.setOrder('/orders', data, (success) => {
                   console.log('success',success);
               }, (error) => {
                  console.log(error);
               });
           }, 3000);*/
        }, (error) => {
           console.log('error', error);
        }, parameters);
    }

    componentDidMount() {
        this.getProducts();
    }

    componentWillReceiveProps(newProps) {
        if (newProps.location.query.page !== this.props.location.query.page) {
            const page = newProps.location.query.page ? parseInt(newProps.location.query.page, 10) : 1;

            this.state = {
                loading: true,
                page: page
            };

            this.getProducts();
        }
    }

    render() {
        const {products, totalPages} = this.state;
        let productsArr;
        const list_products = [];

        if (this.state.loading) {
            list_products.push(
                (
                    <div className='text-center leaving-up-space' key='loader-products'>
                        <i className='fa fa-spinner fa-pulse fa-3x fa-fw'></i>
                        <span className='center-block'>
                            Cargando Productos...
                        </span>
                        <span className="sr-only">Cargando...</span>
                    </div>
                )
            );
        }

        if (products && !this.state.loading) {
            productsArr = products.map((producto, index) => {
                const delay = index ? `${(index / 2)}s` : `${index}s`;
                const fadeIn = {
                    transitionDelay: `${index * 4}s`
                };
                return (
                    <div
                        className='col-xs-3'
                        key={`product-${index}`}
                    >
                        <Product
                            product={producto}
                            onAddCart={this.onAddCart}
                            label={'Ver Más'}
                            iterator={index}
                        />
                    </div>
                );
            });

            for (var i = 0; i < productsArr.length; i += 4) {
                const elements = productsArr.slice(i, i + 4);
                list_products.push(
                    (
                        <div className='row row-product' key={`row-${i}`}>
                            {elements}
                        </div>
                    )
                );
            }
        }

        return (
            <div>
                <div className='container list-products'>
                    {list_products}
                    <Pagination
                        totalPages={totalPages}
                        location={this.props.location}
                        onClick={this.handlePaginate}
                    />
                </div>
            </div>
        );
    }
}