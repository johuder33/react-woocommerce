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

    render() {
        return (
            <div>
                <Banner/>
                <div className='container'>
                    <AboutUsSection location={this.props.location}/>
                    <ServiceSection location={this.props.location}/>
                </div>
            </div>
        );
    }
}

Home.propTypes = {
    location: React.PropTypes.object
};