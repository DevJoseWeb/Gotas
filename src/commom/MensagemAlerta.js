import React, {Component} from 'react';
import PropTypes from "prop-types";
import Alert from "reactstrap/src/Alert";

class MensagemAlerta extends Component {

    render() {
        return (
            <Alert color={this.props.color} isOpen={this.props.isOpen} toggle={this.props.onDismissAlert} fade={true}>
                {this.props.mensagem}
            </Alert>
        );
    }
}

MensagemAlerta.propTypes = {
    mensagem: PropTypes.string.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onDismissAlert: PropTypes.func.isRequired,
    color: PropTypes.string.isRequired
};


export default MensagemAlerta;