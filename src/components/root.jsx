// Copyright (c) 2016 ZBox, Spa. All Rights Reserved.
// See LICENSE.txt for license information.
import React from 'react';
import {browserHistory} from 'react-router';

import Home from './home.jsx';
import Menu from './menu.jsx';
import Footer from './footer.jsx';

export default class Root extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            root: true
        };
    }
    componentWillReceiveProps(newProps) {
        //this.redirectIfNecessary(newProps);
    }
    componentDidMount() {
        //this.redirectIfNecessary(this.props);
    }
    render() {
        if (this.props.children == null) {
            return <Home/>;
        }

        return (
            <div>
                <Menu/>
                {this.props.children}
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