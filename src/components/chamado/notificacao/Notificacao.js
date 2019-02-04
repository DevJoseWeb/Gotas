import React, { Component } from 'react'
import { connect } from 'react-redux'
import NotificacaoPresenter from "./NotificacaoPresenter"
import { filtrarNotificacao } from "./NotificacaoAction"
import moment from 'moment'
import { toastr } from "react-redux-toastr"
import NotificacaoModal from './NotificacaoModal'
import If from '../../../utils/If'

import '../../../commom/template/custom.css'

class Notificacao extends Component {

    constructor() {
        super()
        this.state = {
            notificacaoModal: false,
            listNotification: [],
        }
        this.toastMensagem = this.toastMensagem.bind(this)
        this.toggleNotificacaoModal = this.toggleNotificacaoModal.bind(this)
        this.markedAsRead = this.markedAsRead.bind(this)
    }

    componentDidMount() {
        this.presenter = new NotificacaoPresenter(this)
        this.buscarNotificacoes()
    }

    toastMensagem = () => {
        toastr.warning('Notificação', '')
    }

    buscarNotificacoes() {
        this.presenter.carregarNotificacao()

        setTimeout(function () {
            this.buscarNotificacoes()
        }
            .bind(this),
            500000
        );
    }

    exibirNotificacao(notificacao) {
        this.props.dispatch(filtrarNotificacao(notificacao))
        this.setState({
            listNotification: notificacao,
        })
    }

    updateListNotifications(notifications) {
        this.setState({
            listNotification: notifications || notifications.content,
        })
    }

    markedAsRead(id) {
        this.presenter.setarNotificacaoVisualizada(id, false)
    }

    renderTodasNotificacoes() {
        let lista = this.props.listaNotificacao.content || this.props.listaNotificacao || []
        if (lista.totalElements === 0) { return }
        return (
            <li>
                <a className="nav-link text-center" onClick={this.toggleNotificacaoModal} href='#'> <strong>Mostrar
                                todas as notificações</strong> <i className="fa fa-angle-right"></i> </a>
            </li>
        )
    }

    renderSemNotificacao() {
        return (
            <div className='n-notifications'>
                <img className='img-uall' src={require("../../../commom/template/include/img/u-all-up.png")} alt="You're all caught up!" />
                <h4>Não há Notificações!</h4>
                <h6>Você não possui notificações!</h6>
            </div>
        )
    }

    renderIconNotifications(item) {
        return (
            <div className="notify notify-notifications" onClick={() => this.markedAsRead(item.id)}>
                <span className={item.visualizado === true ? '' : 'heartbit'}> </span>
                <span className={item.visualizado === true ? 'point notification-true' : 'point notification-false'}></span>
            </div>
        )
    }

    renderNotificacoes() {
        // const list = this.props.listaNotificacao.content || this.props.listaNotificacao || []     
        const list = this.state.listNotification.content || this.state.listNotification || []
        if (list.numberOfElements === 0) {
            return (
                this.renderSemNotificacao()
            )
        }
        return list.map((item, index) => (
            <div key={index}>
                <a href="#" /*onClick={this.toggleNotificacaoModal}*/ className={this.classNotifyDestaque(item.visualizado)}>
                    <div className="btn btn-warning btn-circle"><i className="fas fa-exchange-alt"></i>
                    </div>
                    <div style={{ marginLeft: "10px" }} className="mail-contnet">
                        <h5>{item.descricao}</h5>
                        <span className="mail-desc">{item.texto}</span>
                        <span className="time">{moment(item.dataHoraCriacao).format('DD/MM/Y HH:mm:ss')}</span>
                    </div>
                    <If test={item.tipo} compare='TRANSFERENCIA' equal={false} >
                        {this.renderIconNotifications(item)}
                    </If>
                </a>
            </div>

        ))
    }

    toggleNotificacaoModal() {
        this.setState({
            notificacaoModal: !this.state.notificacaoModal
        })
    }

    render() {
        let lista = this.props.listaNotificacao.content || this.props.listaNotificacao || []
        return (
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle text-muted text-muted waves-effect waves-dark"
                    href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i
                        className="fas fa-bell"></i>
                    {this.renderNotify()}
                </a>
                <div className={lista.totalElements === 0 ? "dropdown-menu dropdown-menu-right mailbox scale-up n-div-notifications" : "dropdown-menu dropdown-menu-right mailbox scale-up"}   >
                    <ul>
                        <li>
                            <div className="drop-title">Notificações</div>
                        </li>
                        <li>
                            <div className="message-center">
                                {this.renderNotificacoes()}
                            </div>
                        </li>
                        {this.renderTodasNotificacoes()}
                    </ul>
                </div>

                <NotificacaoModal modal={this.state.notificacaoModal} toggle={this.toggleNotificacaoModal}
                    notificacoes={this.props.listaNotificacao} classNotifyDestaque={this.classNotifyDestaque} />

            </li>
        )
    }

    classNotifyDestaque(visualizado) {
        return (visualizado ? '' : 'myLinkNotificacao')
    }

    renderNotify() {
        let lista = this.props.listaNotificacao.content || this.props.listaNotificacao || []
        if (lista.totalElements === 0) { return }
        return (
            <div className="notify">
                <span className="heartbit"></span>
                <span className="point"></span>
                {this.toastMensagem()}
            </div>
        )

        // if (lista.find(o => o.visualizado === false)) {
        //     return (
        //         <div className="notify">
        //             <span className="heartbit"></span>
        //             <span className="point"></span>
        //             {this.toastMensagem()}
        //         </div>
        //     )
        // }
    }
}

const mapStateToProps = state => (
    {
        listaNotificacao: state.notificacaoStore.listaNotificacao
    }
)

export default connect(mapStateToProps)(Notificacao)