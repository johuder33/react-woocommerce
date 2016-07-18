// Copyright (c) 2016 ZBox, Spa. All Rights Reserved.
// See LICENSE.txt for license information.
import React from 'react';
import * as Actions from '../actions/actions.jsx';

import Product from './product.jsx';

import * as Client from '../utils/client.jsx';
import * as Utils from '../utils/utils.jsx';
import Pagination from './common/pagination.jsx';
import Modal from './common/modal.jsx';

export default class Products extends React.Component {
    constructor(props) {
        super(props);

        this.getProducts = this.getProducts.bind(this);
        this.getCategories = this.getCategories.bind(this);
        this.changeCategory = this.changeCategory.bind(this);
        this.compareProducts = this.compareProducts.bind(this);
        this.handleCompare = this.handleCompare.bind(this);

        const page = this.props.location.query.page || 1;
        this.category = '';
        this.compare = [];

        this.state = {
            loading: true,
            page: page,
            categories: null,
            isComparing: false,
            cssForComparing: '',
            showModal: false,
            diff: null,
            sw: 'hola'
        };
    }

    handleCompare(target, id) {
        const element = target;

        if (element.classList.contains('chosen')) {
            element.classList.remove('chosen');
            return Utils.deleteCompare(this.compare, id);
        }

        if (this.compare.length > 1) {
            return false;
        }

        element.classList.add('chosen');
        this.compare.push(id);
    }

    compareProducts() {
        const {isComparing} = this.state;
        let cssForComparing = '';

        if (!isComparing) {
            cssForComparing = 'comparing';
        }

        if (this.compare.length > 1) {
            this.comparingProducts(this.compare);
        }

        this.setState({
            isComparing: !isComparing,
            cssForComparing
        });
    }

    comparingProducts(products) {
        const promises = products.map((product) => {
            return new Promise((resolve, reject) => {
                Client.getProductById(`/products/${product.id}`, (data) => {
                    resolve(data);
                }, (err) => {
                    reject(err);
                });
            });
        });

        Promise.all(promises).then((results) => {
            this.setState({
                diff: results,
                showModal: true
            });
        }).catch((err) => {
            console.log('err all', err);
        });
    }

    changeCategory(e) {
        const attrs = {};

        const id = e.target.value;
        this.category = id;

        if (id !== '') {
            attrs.category = id;
            this.category = parseInt(id, 10);
        }

        this.setState({
            loading: true
        });

        this.getProducts(attrs);
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

    getCategories(attrs) {
        let parameters = {};

        if (attrs) {
            parameters = Object.assign({}, parameters, attrs);
        }

        Client.getCategories('/products/categories', (categories) => {
            const cats = Utils.filterCategories(categories);
            this.setState({
                categories: cats
            });
            this.getProducts({page: this.state.page});
        }, (error) => {
            console.log('error', error);
        }, parameters);
    }

    getProducts(attrs) {
        let parameters = {
            per_page: 16
        };

        if (attrs) {
            parameters = Object.assign({}, parameters, attrs);
        }

        Client.getAllProducts('/products', (response, req) => {
            const totalPages = req.getResponseHeader('X-WP-TotalPages');

            this.setState({
                products: response,
                loading: false,
                totalPages
            });
        }, (error) => {
            console.log('error', error);
        }, parameters);
    }

    componentDidMount() {
        this.getCategories();
    }

    componentWillReceiveProps(newProps) {
        if (newProps.location.query.page !== this.props.location.query.page) {
            const page = newProps.location.query.page ? parseInt(newProps.location.query.page, 10) : 1;

            this.setState({
                loading: true
            });

            this.getProducts({page});
        }
    }

    render() {
        const {products, totalPages, categories, cssForComparing, isComparing, diff} = this.state;
        let productsArr;
        const list_products = [];
        const category = [];

        if (this.state.loading) {
            return (
                <div className='container list-products'>
                    <div className='text-center leaving-up-space'>
                        <i className='fa fa-spinner fa-pulse fa-3x fa-fw'></i>
                            <span className='center-block'>
                                Cargando Productos...
                            </span>
                        <span className='sr-only'>Cargando...</span>
                    </div>
                </div>
            );
        }

        if (products && !this.state.loading) {
            category.push(
                (
                    <option key='cat-all' value=''>Todas</option>
                )
            );

            categories.forEach((cat, index) => {
                const id = cat.id;
                category.push(
                    (
                        <option
                            value={id}
                            key={`option-${index}`}
                        >
                            {cat.name}
                        </option>
                    )
                );
            });

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
                            isComparing={isComparing}
                            onCompare={this.handleCompare}
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
                <div className={`container list-products ${cssForComparing}`}>
                    <div className='categories-container row'>
                        <div className='col-xs-6'>
                            {category && category.length > 1 && (
                                <div className='form-group'>
                                    <label className='col-xs-6' forHtml='category'>Categorias</label>
                                    <select
                                        value={this.category}
                                        id='category'
                                        className='form-control col-xs-6'
                                        onChange={
                                            this.changeCategory
                                        }
                                    >
                                        {category}
                                    </select>
                                </div>
                            )}
                        </div>
                        <div className='col-xs-6 text-center'>
                            <button
                                className='btn btn-primary'
                                onClick={this.compareProducts}
                            >
                                Comparar Productos
                            </button>
                        </div>
                    </div>
                    {list_products}
                    <Pagination
                        totalPages={totalPages}
                        location={this.props.location}
                        onClick={this.handlePaginate}
                    />
                </div>

                {diff && (
                    <Modal show={this.state.showModal} title={'Comparador de productos'}>
                        {diff}
                    </Modal>
                )}
            </div>
        );
    }
}