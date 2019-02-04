import React, { Component } from 'react';
import connect from 'react-redux/es/connect/connect';
import { toastr } from "react-redux-toastr";

import PendenciaSetorPresenter from './PendenciaSetorPresenter';
import { buscarExistenciPendencia } from './PendenciaSetorAction';

const URL_PENDENCIA_SETOR = '/app/pendenciasetor';

class PendenciaSetorNotification extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listaPendencia: [],
        }

        this.presenter = new PendenciaSetorPresenter(this);

        this.toPendenciaSetor = this.toPendenciaSetor.bind(this);
        this.toastMensagem = this.toastMensagem.bind(this);
        this.exibeObs = this.exibeObs.bind(this);
    }

    componentDidMount() {
        this.presenter.carregaExistePendencia();
    }

    exibirExistePendencia(pendencia) {
        this.props.dispatch(buscarExistenciPendencia(pendencia.resultado));
    }

    toPendenciaSetor() {
        window.location.href = URL_PENDENCIA_SETOR;
    }

    toastMensagem = () => {
        toastr.warning('Pendência do Setor', '');
    }

    validaExistePendencia() {
        return this.props.existePendencia;
    }

    exibeObs(observacao) {
        if (observacao.length > 34) { return observacao.substr(1, 30) + '...'; }
        else { return observacao }
    }

    renderSemPendencias() {
        return (
            <div className='n-notifications'>
                <img className='img-uall' src={require("../../commom/template/include/img/u-all-up.png")} alt="You're all caught up!" />
                <h4>Não há Pendências!</h4>
                <h6>Todas as Pendências foram resolvidas!</h6>
            </div>
        )
    }

    renderNotify() {
        if (!this.validaExistePendencia()) return;
        return (
            <div className="notify">
                <span className="heartbit"></span>
                <span className="point"></span>
                {this.toastMensagem()}
            </div>
        )
    }

    renderTodasPendencias() {
        const list = this.props.listPendencia.content || this.props.listPendencia || []
        if (list.length === 0) { return null }
        return (
            <li>
                <a className="nav-link text-center" onClick={this.toggleNotificacaoModal} href='#'> <strong>Mostrar
                    todas as pendências</strong> <i className="fa fa-angle-right"></i> </a>
            </li>
        )
    }

    renderNotificacoesPendenciaSetor() {
        const list = this.props.listPendencia.content || this.props.listPendencia || [];
        if (list.length === 0) { return (this.renderSemPendencias()) }
        return list.map((item, index) => (
            <div key={index}>
                <a href="#" >
                    <div className="btn btn-danger btn-circle"><i className="far fa-clock fa-lg"></i>
                    </div>
                    <div style={{ marginLeft: "10px" }} className="mail-contnet">
                        <h5>{item.nome}</h5>
                        <span className="mail-desc">{item.assunto}</span>
                        <span className="time">{this.exibeObs(item.observacao)}</span>
                    </div>
                </a>
            </div>
        ))
    }

    render() {
        const list = this.props.listPendencia.content || this.props.listPendencia || []
        return (
            <li className="nav-item dropdown nav-pendencia">
                <a className="nav-link dropdown-toggle text-muted text-muted waves-effect waves-dark"
                    href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="fas fa-clock"></i>
                    {this.renderNotify()}
                </a>
                <div className={list.length === 0 ? "dropdown-menu dropdown-menu-right mailbox scale-up n-div-notifications" : "dropdown-menu dropdown-menu-right mailbox scale-up"}   >
                    <ul>
                        <li>
                            <div className="drop-title">Pendência de Setor</div>
                        </li>
                        <li>
                            <div className="message-center">
                                {this.renderNotificacoesPendenciaSetor()}
                            </div>
                        </li>
                        {this.renderTodasPendencias()}
                    </ul>
                </div>
            </li>
        )
    }
}

const mapStateToProps = state => (
    {
        existePendencia: state.pendenciaSetorStore.existePendencia,
        listPendencia: state.pendenciaSetorStore.listPendencia,
    }
)

export default connect(mapStateToProps)(PendenciaSetorNotification)