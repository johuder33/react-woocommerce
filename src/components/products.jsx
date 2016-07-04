// Copyright (c) 2016 ZBox, Spa. All Rights Reserved.
// See LICENSE.txt for license information.
import React from 'react';
import * as Actions from '../actions/actions.jsx';

import Product from './product.jsx';

import * as Client from '../utils/client.jsx';
import * as Utils from '../utils/utils.jsx';

export default class Products extends React.Component {
    constructor(props) {
        super(props);

        this.getProducts = this.getProducts.bind(this);

        this.state = {
            loading: true
        };
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
       Client.getAllProducts('/products', (response, req) => {
           this.setState({
               products: response,
               loading: false
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
       });
    }

    componentDidMount() {
        this.getProducts();
    }

    render() {
        const {products} = this.state;
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

        if (products) {
            productsArr = products.map((producto, index) => {
                return (
                    <div
                        className='col-xs-3'
                        key={`product-${index}`}
                    >
                        <Product
                            product={producto}
                            onAddCart={this.onAddCart}
                            label={'Ver Más'}
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
                </div>
            </div>
        );
    }
}