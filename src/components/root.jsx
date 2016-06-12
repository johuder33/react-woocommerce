// Copyright (c) 2016 ZBox, Spa. All Rights Reserved.
// See LICENSE.txt for license information.
import React from 'react';
import {browserHistory} from 'react-router';

export default class Root extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            root: true
        };
        this.redirectIfNecessary = this.redirectIfNecessary.bind(this);
    }
    componentWillReceiveProps(newProps) {
        this.redirectIfNecessary(newProps);
    }
    componentWillMount() {
        this.redirectIfNecessary(this.props);
    }
    render() {
        if (this.props.children == null) {
            return <div/>;
        }

        //return this.props.children;
        return (
            <div>
                <h1>Hola</h1>
            </div>
        );
    }
}
Root.defaultProps = {
};

Root.propTypes = {
    children: React.PropTypes.object
};