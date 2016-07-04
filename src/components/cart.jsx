import React from 'react';
import * as Utils from '../utils/utils.jsx';
import * as Actions from '../actions/actions.jsx';
import EventStore from '../stores/eventStore.jsx';

export default class Cart extends React.Component {
    constructor(props) {
        super(props);

        this.getCartItems = this.getCartItems.bind(this);
        this.handleDelete = this.handleDelete.bind(this);

        this.state = {
            cart: null,
            isEmpty: false
        }
    }

    handleDelete(e, id) {
        e.preventDefault();

        Utils.removeItemFromCart(id);

        Actions.updateCart();
    }

    getCartItems() {
        const isCartFilled = Utils.cartExists();

        const cart = isCartFilled ? JSON.parse(isCartFilled) : false;
        const size = cart ? Object.keys(cart).length : false;

        if (!cart || !size) {
            return this.setState({
                isEmpty: true
            });
        }

        return this.setState({
            cart
        });
    }

    componentDidMount() {
        this.getCartItems();
    }

    componentWillMount() {
        EventStore.addUpdateCartListener(this.getCartItems);
    }

    componentWillUnMount() {
        EventStore.removeUpdateCartListener(this.getCartItems);
    }

    render() {
        const {cart, isEmpty} = this.state;
        let items = (
            <div className='text-center leaving-up-space'>
                <i className='fa fa-spinner fa-pulse fa-3x fa-fw'></i>
                        <span className='center-block'>
                            Cargando Productos...
                        </span>
                <span className='sr-only'>Cargando...</span>
            </div>
        );

        if (isEmpty) {
            return (
                <div className='container'>
                    <h1 className='page-header'>
                        Su carrito esta vacio
                    </h1>
                </div>
            );
        }

        if (cart) {
            const ids = Object.keys(cart);
            items = ids.map((id) => {
                const {price, cant, name, images} = cart[id];
                const image = images[0];
                return (
                    <div key={`producto-${id}`} className='row-item clearfix'>
                        <div className='col-xs-3 text-left'>
                            <div className='col-xs-6'>
                                <a
                                    className='btn btn-danger btn-xs'
                                    onClick={(e) => {
                                    this.handleDelete(e, id);
                                }}
                                >
                                    <i className='fa fa-trash-o' title={`Sacar ${name} del carrito`} aria-hidden='true'></i>
                                    <span className='sr-only'>Borrar</span>
                                </a>
                            </div>
                            <div className='col-xs-6'>
                                <a
                                    className='pointer'
                                    onClick={(e) => {
                                        Utils.handleLink(e, `productos/${id}`);
                                    }}
                                >
                                    <img src={image.src} alt={image.alt} title={image.title} className='img-responsive thumbnail-item'/>
                                </a>
                            </div>
                        </div>

                        <div className='col-xs-3'>
                            {name}
                        </div>

                        <div className='col-xs-2'>
                            {price}
                        </div>

                        <div className='col-xs-2'>
                            {cant}
                        </div>

                        <div className='col-xs-2'>
                            {(cant * price)}
                        </div>
                    </div>
                );
            });
        }

        return (
            <div className='container container-cart'>
                <div className='rows'>
                    <div className='col-xs-12'>
                        <h3 className='title-cart font-family'>
                            Tu Orden
                        </h3>

                        <div className='container-table-product'>
                            <div className='header-cart text-center row'>
                                <div className='col-xs-3'></div>
                                <div className='col-xs-3'>
                                    Producto
                                </div>
                                <div className='col-xs-2'>
                                    Precio
                                </div>
                                <div className='col-xs-2'>
                                    Cantidad
                                </div>
                                <div className='col-xs-2'>
                                    Total
                                </div>
                            </div>
                            <div className='body-cart text-center row'>
                                {items}
                            </div>
                            <div className='footer-cart text-center'>
                                <div className='col-xs-6'>
                                    <button className='btn btn-primary'>
                                        Seguir Comprando
                                    </button>
                                </div>
                                <div className='col-xs-6'>
                                    <button className='btn btn-info'>
                                        Realizar Cotización
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}