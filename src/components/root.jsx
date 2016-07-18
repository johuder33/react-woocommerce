// Copyright (c) 2016 ZBox, Spa. All Rights Reserved.
// See LICENSE.txt for license information.
import React from 'react';
import {browserHistory} from 'react-router';
import * as Client from '../utils/client.jsx';

import Home from './home.jsx';
import Menu from './menu.jsx';
import Footer from './footer.jsx';
import Brands from './brands.jsx';

import * as Utils from '../utils/utils.jsx';

export default class Root extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            root: true
        };
    }
    componentDidMount() {
        /*Client.custom((exito) => {
            console.log('exito', exito);
        }, (er) => {
            console.log('error', er);
        });*/

        if (this.props.location) {
            const hash = this.props.location.hash;
            Utils.scrollAnimated(hash);
        }
    }

    componentWillReceiveProps(newProps) {
        const hash = newProps.location.hash;
        if (hash !== this.props.location.hash) {
            Utils.scrollAnimated(hash);
        }
    }
    render() {
        let home;
        if (this.props.children == null) {
            home = <Home location={this.props.location}/>;
        }

        return (
            <div>
                <Menu/>
                {this.props.children || home}
                <Brands location={this.props.location}/>
                <Footer/>
            </div>
        );
    }
}
Root.defaultProps = {
};

Root.propTypes = {
    children: React.PropTypes.object
};