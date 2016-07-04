import React from 'react';

export default class Cart extends React.Component {
    constructor(props) {
        super(props);
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
                                        Primer Nombre
                                        <abbr title='requerido'>{'*'}</abbr>
                                    </label>
                                    <input id='first-name' type='text' className='form-control'/>
                                </div>
                            </div>
                            <div className='col-xs-6'>
                                <div className='form-group'>
                                    <label htmlFor='second-name' className='label-text font-family'>
                                        Segundo Nombre
                                        <abbr title='requerido'>{'*'}</abbr>
                                    </label>
                                    <input id='second-name' type='text' className='form-control'/>
                                </div>
                            </div>
                        </div>

                        <div className='row row-fields'>
                            <div className='col-xs-12'>
                                <div className='form-group'>
                                    <label htmlFor='company' className='label-text font-family'>Compañia</label>
                                    <input id='company' type='text' className='form-control'/>
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
                                    <input id='addr1' type='text' className='form-control'/>
                                </div>
                            </div>
                            <div className='col-xs-6'>
                                <div className='form-group'>
                                    <label htmlFor='addr2' className='label-text font-family'>
                                        Direccion 2
                                    </label>
                                    <input id='addr2' type='text' className='form-control'/>
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
                                    <input id='city' type='text' className='form-control'/>
                                </div>
                            </div>
                            <div className='col-xs-6'>
                                <div className='form-group'>
                                    <label htmlFor='code' className='label-text font-family'>
                                        Código Postal
                                        <abbr title='requerido'>{'*'}</abbr>
                                    </label>
                                    <input id='code' type='text' className='form-control'/>
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
                                    <input id='country' type='text' className='form-control'/>
                                </div>
                            </div>
                            <div className='col-xs-6'>
                                <div className='form-group'>
                                    <label htmlFor='state' className='label-text font-family'>
                                        Estado
                                        <abbr title='requerido'>{'*'}</abbr>
                                    </label>
                                    <input id='state' type='text' className='form-control'/>
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
                                    <input id='email' type='text' className='form-control'/>
                                </div>
                            </div>
                            <div className='col-xs-6'>
                                <div className='form-group'>
                                    <label htmlFor='tlf' className='label-text font-family'>
                                        Télefono
                                        <abbr title='requerido'>{'*'}</abbr>
                                    </label>
                                    <input id='tlf' type='text' className='form-control'/>
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
                                    <textarea id='specs' className='form-control' rows='8'></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-xs-12'>
                        <button className='btn center-block btn-default btn-custom font-family'>
                            Realizar Cotización
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}