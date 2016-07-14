import React from 'react';

import * as Client from '../utils/client.jsx';
import * as Utils from '../utils/utils.jsx';

export default class Cart extends React.Component {
    constructor(props) {
        super(props);

        this.makeCheckOut = this.makeCheckOut.bind(this);
        this.fillBilling = this.fillBilling.bind(this);
        this.notes = this.notes.bind(this);
        this.billing = {
            "payment_method": "wc_gateway_cod",
            "payment_method_title" : "Cash on Delivery",
            "set_paid": false,
            "status": "processing",
            "billing": {
                "country": "CL"
            },
            "line_items": [],
            "customer_note": ''
        };
    }

    notes(e) {
        const val = e.target.value.trim();

        this.billing.customer_note = val;
    }

    fillBilling(e, key) {
        const val = e.target.value.trim();

        this.billing.billing[key] = val;
    }

    makeCheckOut(e) {
        const ev = e;
        ev.preventDefault();
        const cartExists = Utils.cartExists();

        if (cartExists) {
            const cart = JSON.parse(cartExists);
            const ids = Object.keys(cart);
            const items = ids.map((id) => {
                return {
                    product_id: cart[id].id,
                    quantity: cart[id].cant
                }
            });

            // set the items inside the cart to send to create a new order
            this.billing.line_items = items;

            const btn = ev.target;
            const oldValue = btn.innerHTML;

            btn.disabled = true;
            btn.innerHTML = 'Realizando Pedido <i class="fa fa-spinner fa-pulse fa-1x fa-fw"></i>';

            const data = this.billing;

            Client.setOrder('/orders', data, (success) => {
                console.log('success',success);
                btn.disabled = false;
                btn.innerHTML = oldValue;
                Utils.clearCart();
            }, (error) => {
                console.log(error);
                btn.disabled = false;
                btn.innerHTML = oldValue;
            });
        }
    }

    render() {
        return (
            <div className='container container-checkout'>
                <div className='row'>
                    <div className='col-xs-6'>
                        <h3 className='title-form font-family'>
                            Datos de Compra
                        </h3>
                        <div className='row row-fields'>
                            <div className='col-xs-6'>
                                <div className='form-group'>
                                    <label htmlFor='first-name' className='label-text font-family'>
                                        Nombres
                                        <abbr title='requerido'>{'*'}</abbr>
                                    </label>
                                    <input
                                        id='first-name'
                                        type='text'
                                        className='form-control'
                                        onKeyUp={(e) => {
                                            this.fillBilling(e, 'first_name');
                                        }}
                                    />
                                </div>
                            </div>
                            <div className='col-xs-6'>
                                <div className='form-group'>
                                    <label htmlFor='second-name' className='label-text font-family'>
                                        Apellidos
                                        <abbr title='requerido'>{'*'}</abbr>
                                    </label>
                                    <input
                                        id='last-name'
                                        type='text'
                                        className='form-control'
                                        onKeyUp={(e) => {
                                            this.fillBilling(e, 'last_name');
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className='row row-fields'>
                            <div className='col-xs-12'>
                                <div className='form-group'>
                                    <label htmlFor='company' className='label-text font-family'>Compañia</label>
                                    <input
                                        id='company'
                                        type='text'
                                        className='form-control'
                                        onKeyUp={(e) => {
                                            this.fillBilling(e, 'company');
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className='row row-fields'>
                            <div className='col-xs-6'>
                                <div className='form-group'>
                                    <label htmlFor='addr1' className='label-text font-family'>
                                        Direccion 1
                                        <abbr title='requerido'>{'*'}</abbr>
                                    </label>
                                    <input
                                        id='addr1'
                                        type='text'
                                        className='form-control'
                                        onKeyUp={(e) => {
                                            this.fillBilling(e, 'address_1');
                                        }}
                                    />
                                </div>
                            </div>
                            <div className='col-xs-6'>
                                <div className='form-group'>
                                    <label htmlFor='addr2' className='label-text font-family'>
                                        Direccion 2
                                    </label>
                                    <input
                                        id='addr2'
                                        type='text'
                                        className='form-control'
                                        onKeyUp={(e) => {
                                            this.fillBilling(e, 'address_2');
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className='row row-fields'>
                            <div className='col-xs-6'>
                                <div className='form-group'>
                                    <label htmlFor='city' className='label-text font-family'>
                                        Ciudad
                                        <abbr title='requerido'>{'*'}</abbr>
                                    </label>
                                    <input
                                        id='city'
                                        type='text'
                                        className='form-control'
                                        onKeyUp={(e) => {
                                            this.fillBilling(e, 'city');
                                        }}
                                    />
                                </div>
                            </div>
                            <div className='col-xs-6'>
                                <div className='form-group'>
                                    <label htmlFor='code' className='label-text font-family'>
                                        Código Postal
                                        <abbr title='requerido'>{'*'}</abbr>
                                    </label>
                                    <input
                                        id='code'
                                        type='text'
                                        className='form-control'
                                        onKeyUp={(e) => {
                                            this.fillBilling(e, 'postcode');
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className='row row-fields'>
                            <div className='col-xs-6'>
                                <div className='form-group'>
                                    <label htmlFor='country' className='label-text font-family'>
                                        País
                                        <abbr title='requerido'>{'*'}</abbr>
                                    </label>
                                    <input
                                        id='country'
                                        type='text'
                                        className='form-control'
                                        disabled="disabled"
                                        value="Chile"
                                    />
                                </div>
                            </div>
                            <div className='col-xs-6'>
                                <div className='form-group'>
                                    <label htmlFor='state' className='label-text font-family'>
                                        Estado
                                        <abbr title='requerido'>{'*'}</abbr>
                                    </label>
                                    <input
                                        id='state'
                                        type='text'
                                        className='form-control'
                                        onKeyUp={(e) => {
                                            this.fillBilling(e, 'state');
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className='row row-fields'>
                            <div className='col-xs-6'>
                                <div className='form-group'>
                                    <label htmlFor='email' className='label-text font-family'>
                                        Correo Eléctronico
                                        <abbr title='requerido'>{'*'}</abbr>
                                    </label>
                                    <input
                                        id='email'
                                        type='text'
                                        className='form-control'
                                        onKeyUp={(e) => {
                                            this.fillBilling(e, 'email');
                                        }}
                                    />
                                </div>
                            </div>
                            <div className='col-xs-6'>
                                <div className='form-group'>
                                    <label htmlFor='tlf' className='label-text font-family'>
                                        Télefono
                                        <abbr title='requerido'>{'*'}</abbr>
                                    </label>
                                    <input
                                        id='tlf'
                                        type='text'
                                        className='form-control'
                                        onKeyUp={(e) => {
                                            this.fillBilling(e, 'phone');
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-xs-6'>
                        <h3 className='title-form font-family'>
                            Dirección de Envio
                        </h3>

                        <div className='row row-fields'>
                            <div className='col-xs-12'>
                                <div className='form-group'>
                                    <label htmlFor='specs' className='label-text font-family'>
                                        Especificaciones de cotización
                                        <abbr title='requerido'>{'*'}</abbr>
                                    </label>
                                    <textarea
                                        id='specs'
                                        className='form-control'
                                        rows='8'
                                        onKeyUp={this.notes}
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-xs-12'>
                        <button
                            className='btn center-block btn-default btn-custom font-family'
                            onClick={this.makeCheckOut}
                        >
                            Realizar Cotización
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}