import React from 'react';
import {Modal , Button} from 'react-bootstrap';

export default class ModalSolid extends React.Component {
    constructor(props) {
        super(props);

        this.handleHide = this.handleHide.bind(this);

        this.state = {
            show: this.props.show
        };
    }

    handleHide() {
        const {show} = this.state;
        if (show) {
            this.setState({
                show: !show
            });
        }
    }
    
    render() {
        return (
            <Modal
                show={this.state.show}
                dialogClassName="modal-solid"
                bsSize={'lg'}
            >
                <Modal.Header closeButton={false}>
                    <Modal.Title id='contained-modal-title-lg'>{this.props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.props.children}
                </Modal.Body>
                <Modal.Footer>
                    <Button className='btn btn-danger' onClick={this.handleHide}>Cerrar</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

ModalSolid.propTypes = {
    show: React.PropTypes.bool,
    title: React.PropTypes.string,
    children: React.PropTypes.oneOfType([
        React.PropTypes.element,
        React.PropTypes.array,
        React.PropTypes.object
    ])
};