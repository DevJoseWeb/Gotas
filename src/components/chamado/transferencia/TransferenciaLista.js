import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from "prop-types"
import TransferenciaPresenter from './TransferenciaPresenter'
import {filtrarTransferencia} from "./TransferenciaAction"
import moment from 'moment'
import { Alert } from 'reactstrap'
import {MSG_SYS_Forbidden, MSG_SYS_Unauthorized} from "../../../mensagens";

class TransferenciaLista extends Component {

    state = {
        visibleAlertUnauthorized: false,
        visibleAlertForbidden: false,
    }

    constructor(props){
        super(props)

        this.onDismissAlertUnauthorized = this.onDismissAlertUnauthorized.bind(this)
        this.onDismissAlertForbidden = this.onDismissAlertForbidden.bind(this)
    }

    componentDidMount(){
        this.presenter = new TransferenciaPresenter(this)
        this.presenter.carregarTransferencia(this.props.idChamado)
    }

    exibirTransferencia(transferencias) {
        this.props.dispatch(filtrarTransferencia(transferencias))
    }

    onDismissAlertUnauthorized() {
        this.setState({ visibleAlertUnauthorized: false })
    }

    onDismissAlertForbidden() {
        this.setState({ visibleAlertForbidden: false })
    }

    exibeMensagemUnauthorized() {
        this.setState({
            visibleAlertUnauthorized: true,
        })
    }

    exibeMensagemForbidden() {
        this.setState({
            visibleAlertForbidden: true,
        })
    }

    renderMensagemUnauthorized() {
        return (
            <Alert color="error" isOpen={this.state.visibleAlertUnauthorized} toggle={this.onDismissAlertUnauthorized} fade={true}>
                {MSG_SYS_Unauthorized}
            </Alert>
        )
    }

    renderMensagemForbidden() {
        return (
            <Alert color="error" isOpen={this.state.visibleAlertForbidden} toggle={this.onDismissAlertForbidden} fade={true}>
                {MSG_SYS_Forbidden}
            </Alert>
        )
    }

    renderListagem() {
        return (
            this.props.listaTransferencia.map((item, index) => {
                return (
                    <div key={index} className="d-flex flex-row comment-row">
                        <div className="p-2">
                            
                                <div className="btn btn-warning btn-circle">
                                    <i className="fas fa-exchange-alt"/>
                                </div>  
                            
                        </div>
                        <div className="comment-text w-100">
                            <h5>{item.funcionarioDe.nome}</h5>
                            <div className="m-b-5" dangerouslySetInnerHTML={{ __html: item.justificativa }} />
                            <div className="comment-footer"> 
                                <span className="text-muted pull-right">
                                    {moment(item.dataHoraEnvio).format('DD/MM/Y HH:mm:ss')}
                                </span>
                            </div>
                        </div>
                    </div>                                          
                )
            })
        )
    }

    render() {
        return (
            <div className="comment-widgets">
                {this.renderMensagemUnauthorized()}
                {this.renderMensagemForbidden()}
                {this.renderListagem()}                                                                   

            </div>
        );
    }
}

const mapStateToProps = state => (
    {
        listaTransferencia: state.transferenciaStore.listaTransferencia
    }
)

TransferenciaLista.propTypes = {
    idChamado: PropTypes.number.isRequired
};

export default connect(mapStateToProps)(TransferenciaLista)