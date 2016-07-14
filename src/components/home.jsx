// Copyright (c) 2016 ZBox, Spa. All Rights Reserved.
// See LICENSE.txt for license information.
import React from 'react';

import Banner from './banner.jsx';
import AboutUsSection from './aboutus.jsx';
import ServiceSection from './service.jsx';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log('this.props',this.props.location);
    }

    componentWillReceiveProps(newProps) {
        console.log(newProps);
    }

    render() {
        return (
            <div>
                <Banner/>
                <div className='container'>
                    <AboutUsSection/>
                    <ServiceSection/>
                </div>
            </div>
        );
    }
}