import React, {Component} from 'react'
import PropTypes from "prop-types"
import ChamadoPresenter from "../chamado/ChamadoPresenter"
import MensagemPendenciaFinanceira from "./MensagemPendenciaFinanceira";

class PendenciaFinanceira extends Component {

    state = {
        comPendencia: false
    }

    componentDidMount() {
        this.presenter = new ChamadoPresenter(this)

        this.presenter.verificarClienteComPendencia(this.props.idCliente)
    }

    componentDidUpdate(previousProps, previousState) {
        if (previousProps.idCliente !== this.props.idCliente) {
            this.presenter.verificarClienteComPendencia(this.props.idCliente);
        }
    }

    renderPendenciaCliente(pendencia) {
        this.setState( { comPendencia: pendencia } )
    }

    render() {
        if (this.state.comPendencia) {
            return (
                <MensagemPendenciaFinanceira />
            );
        }

        return <div />
    }
}

PendenciaFinanceira.propTypes = {
    idCliente: PropTypes.number.isRequired,
};

export default PendenciaFinanceira