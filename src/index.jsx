// Copyright (c) 2016 ZBox, Spa. All Rights Reserved.
// See LICENSE.txt for license information.

//import './sass/styles.scss';

import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRedirect, Redirect, browserHistory} from 'react-router';

import Root from './components/root.jsx';
import Products from './components/products.jsx';
import singleProduct from './components/single_product.jsx';

const notFoundParams = {
    title: 'Página no encontrada',
    message: 'La página que estás intentando acceder no existe',
    link: '/',
    linkmessage: 'Volver a Manager'
};

function onPreLoggedIn(nextState, replace, callback){
    return callback();
}

function renderRootComponent() {
    ReactDOM.render((
            <Router
                history={browserHistory}
            >
                <Route
                    path='/'
                    component={Root}
                    onEnter={onPreLoggedIn}
                >
                    <Route
                        path='/single'
                        component={singleProduct}
                    />

                    <Route
                        path='/productos'
                        component={Products}
                    />

                    <Route
                        path='/productos/:id'
                        component={singleProduct}
                    />
                </Route>
            </Router>
        ),
        document.getElementById('root'));
}

global.window.setup_root = () => {
    // Do the pre-render setup and call renderRootComponent when done
    // preRenderSetup(renderRootComponent);];
    // Do the pre-render setup and call renderRootComponent when done
    // preRenderSetup(renderRootComponent);
    renderRootComponent();
};