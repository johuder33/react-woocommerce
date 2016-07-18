import React from 'react';
import * as Utils from '../../utils/utils.jsx';

export default class Pagination extends React.Component {
    constructor(props) {
        super(props);
        
        this.handleClick = this.handleClick.bind(this);
        this.goToFirst = this.goToFirst.bind(this);
        this.goToLast = this.goToLast.bind(this);

        this.page = this.props.location.query.page ? parseInt(this.props.location.query.page, 10) : 1;

        this.state = {
            page: this.page
        };
    }

    handleClick(e, id) {
        if (this.props.onClick && typeof this.props.onClick === 'function') {
            this.props.onClick(e, id);
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps.location.query.page !== this.props.location.query.page) {
            const page = newProps.location.query.page ? parseInt(newProps.location.query.page, 10) : 1;

            this.setState({
                page
            });
        }
    }

    goToFirst(e) {
        Utils.handleLink(e, `/productos`);
    }

    goToLast(e) {
        Utils.handleLink(e, `/productos?page=${this.props.totalPages}`);
    }

    render() {
        const {totalPages} = this.props;
        const {page} = this.state;
        let items = null;

        if (totalPages < 2 || !totalPages) {
            return <div/>;
        }

        const total = typeof totalPages === 'string' ? parseInt(totalPages, 10) : totalPages;

        items = [];

        if (page !== 1) {
            items.push(
                (
                    <li key={'paginate-first'}>
                        <a
                            className='pointer'
                            onClick={this.goToFirst}
                        >
                            {'Primero'}
                        </a>
                    </li>
                )
            )
        }

        for (let i = 0; i < total; i++) {
            const id = i + 1;
            const isActive = id === page ? 'active' : '';
            items.push(
                (
                    <li className={isActive} key={`paginate-${id}`}>
                        <a
                            className='pointer'
                            onClick={(e) => {
                                this.handleClick(e, id);
                            }}
                        >
                            {id}
                        </a>
                    </li>
                )
            );
        }

        if (page !== total) {
            items.push(
                (
                    <li key={'paginate-last'}>
                        <a
                            className='pointer'
                            onClick={this.goToLast}
                        >
                            {'Último'}
                        </a>
                    </li>
                )
            )
        }

        return (
            <nav className='wrap-pagination'>
                {items && (
                    <ul className='pagination'>
                        {items}
                    </ul>
                )}
            </nav>
        );
    }
}

Pagination.propTypes = {
    totalPages: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number
    ]),
    location: React.PropTypes.object
};