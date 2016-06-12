// Copyright (c) 2016 ZBox, Spa. All Rights Reserved.
// See LICENSE.txt for license information.
import React from 'react';

import Menu from './menu.jsx';
import Banner from './banner.jsx';
import AboutUsSection from './aboutus.jsx';
import ServiceSection from './service.jsx';
import Footer from './footer.jsx';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const hola = 'hello world';
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