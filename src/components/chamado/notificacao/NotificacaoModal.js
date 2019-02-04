import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import moment from "moment"
import { connect } from 'react-redux'
import TransferenciaPresenter from "../transferencia/TransferenciaPresenter"
import TransferenciaRecusar from "../transferencia/TransferenciaRecusar"
import NotificacaoPresenter from "./NotificacaoPresenter"
import { loadChamados, buscarTodasNotificacoes } from "./NotificacaoAction"
import If from '../../../utils/If'
import { ACAO_TRANSFERENCIA_CHAMADO, APP_LOAD_MORE_NOTIFICATIONS } from "../../../base";

class NotificacaoModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeItem: -1,
      bounce: -1,
      classDiv: '',
      classTransfRec: '',
      showJustificar: false,
      listAllNotifications: [],
    };
    this.markedAsRead = this.markedAsRead.bind(this);
    this.accept = this.accept.bind(this);
    this.loadMoreNotifications = this.loadMoreNotifications.bind(this);

    this.presenter = new TransferenciaPresenter(this);
    this.presenterNotificacao = new NotificacaoPresenter(this);
  }

  componentDidMount() {
    localStorage.setItem(APP_LOAD_MORE_NOTIFICATIONS, JSON.stringify(0));
    this.presenterNotificacao.carregarTodasNotificacoes();
  }

  toggle() {
    this.props.toggle();
  }

  exibirChamadoNotificacao(chamados) {
    this.props.dispatch(loadChamados(chamados));
  }

  exibirTodasNotificacao(notificacoes) {
    this.props.dispatch(buscarTodasNotificacoes(notificacoes));
    this.setState({
      listAllNotifications: notificacoes,
    });
  }

  updateListNotifications(notifications) {
    this.setState({
      listAllNotifications: this.filterListNotifications(notifications.content),
    });
  }

  showButtonsTransf = (index, id) => {
    console.log(id)
    if (!this.state.showJustificar) {
      this.presenterNotificacao.loadChamado(id);
      this.setState({
        activeItem: index,
        showJustificar: false
      });
    }
  }

  aceitarTransferencia(idTransferencia, idNotificacao) {
    let arr = []
    let obj = {}

    obj["idTransferencia"] = idTransferencia
    obj["situacao"] = ACAO_TRANSFERENCIA_CHAMADO.Aceitar

    arr.push(obj)

    let objeto = {}
    objeto["transferencias"] = arr

    this.presenter.atualizarTransferencia(JSON.stringify(objeto));
    this.markedAsRead(idNotificacao, true);
    this.presenterNotificacao.carregarTodasNotificacoes();
  }

  verifyAccept(visualizado) {
    return visualizado === true ? 'display-none' : '';
  }

  exibirMensagemSucesso() {
    this.setState({
      showJustificar: false,
      classDiv: 'animated bounceOutLeft'
    });

    setTimeout(function () {
      this.setState({ classDiv: 'display-none' })
      this.presenterNotificacao.carregarTodasNotificacoes()
    }.bind(this), 1000);
  }

  cancelar() {
    this.setState({
      showJustificar: false,
      bounce: -1
    });
  }

  accept(index, idTransferencia, idNotificacao) {
    this.setState({
      bounce: index,
      classDiv: 'animated bounceOutLeft'
    });

    setTimeout(function () {
      this.setState({ classDiv: 'display-none' })
    }.bind(this), 1000);

    this.aceitarTransferencia(idTransferencia, idNotificacao);
  }

  refuse(index) {
    this.setState({
      bounce: index,
      classDiv: 'animated bounceOutLeft',
    });

    setTimeout(function () {
      this.setState({
        showJustificar: true,
        classDiv: 'display-none'
      })
    }.bind(this), 650);
  }

  markedAsRead(id) {
    this.presenterNotificacao.setarNotificacaoVisualizada(id, true);
  }

  filterListNotifications(list, loadRows = 5) {
    var newList = [];
    if (list) {
      list.map((item) => {
        if (item.tipo === 'TRANSFERENCIA') {
          if (item.transferencia) {
            if (item.transferencia.situacao === 'PENDENTE') { newList.push(item); }
          } else { if (item.visualizado === false) newList.push(item); }
        } else { newList.push(item); }
        return null;
      })
  
      // if (newList.length === 0 || newList.length < 5) this.loadMoreNotifications(loadRows);
    }
    return newList;
  }

  loadMoreNotifications(loadRows = 0) {
    this.presenterNotificacao.carregarTodasNotificacoes(loadRows);
  }

  renderChamado(item) {
    return (
      <div style={{ marginTop: '20px' }} className='row'>
        <div className="col-12">
          <ul className="timeline">
            <li className={'li-desc'}  >
              <div className="timeline-badge info"><i className="fas fa-info"></i></div>
              <div className="timeline-panel">
                <div className="timeline-heading">
                  <h4 class="timeline-title"> {item.chamado.clienteNomeFantasia} </h4>
                </div>
                <div className="timeline-body">
                  <p>{item.chamado.assunto}</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    )
  }

  renderNotificacoes() {
    const listTodasNot = this.state.listAllNotifications.content || this.state.listAllNotifications || [];
    return listTodasNot.map((item, index) => (
      <div key={index} >
        <div className={this.state.bounce === index && this.state.showJustificar ? '' : 'display-none'}>
          <div className="row">
            <div className="col-12">
              <ul className="timeline">
                <li >
                  <div className="timeline-badge danger"><i className="fas fa-info"></i></div>
                  <div className="timeline-panel">
                    <div className="timeline-body">
                      <TransferenciaRecusar classDiv={`'${this.state.classTransfRec} col-md-12 m-b-20'`}
                        classFooter="modal-footer"
                        cancelar={this.cancelar.bind(this)}
                        transferencias={Array(item)}
                        exibirMensagemSucesso={this.exibirMensagemSucesso.bind(this)}
                        isModal={true} />
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className={this.state.bounce === index ? `row ${this.state.classDiv}` : ''} >
          <div >
            <table id="table-notificaton-2"
              className="display nowrap table table-hover table-striped table-bordered"
              cellSpacing="0" width="100%">
              <tbody>
                <tr>
                  <td>
                    <div>
                      <div className='btn btn-warning btn-circle' >
                        <i className='fas fa-exchange-alt'></i>
                      </div>

                      <div className='descricao-notificacao'>
                        <h4>{item.descricao}</h4>
                      </div>

                      <If test={item.tipo} compare='TRANSFERENCIA' equal={true} >
                        <div style={{ marginRight: '12px' }} >
                          <i style={{ marginTop: '-39px' }} className={this.state.activeItem === index ? 'fas fa-caret-down float-right' : 'fas fa-caret-right float-right'} ></i>
                        </div>
                      </If>

                      <If test={item.tipo} compare='TRANSFERENCIA' equal={false} >
                        <a href="#" onClick={() => this.markedAsRead(item.id, item.visualizado)} >
                          <div className="notify">
                            <span className={item.visualizado === true ? '' : 'heartbit'}> </span>
                            <span className={item.visualizado === true ? 'point notification-true' : 'point notification-false'}></span>
                          </div>
                        </a>
                      </If>
                      
                      <a href="#" value={item.id} onClick={this.showButtonsTransf.bind(this, index, item.chamado.id)} className=''>
                        <div className="mail-contnet informacao-notificacao">
                          <span className='mail-desc' > {item.texto} </span>
                        </div>
                      </a>

                      <div className='data-notificacao float-right' >
                        <i className='fas fa-calendar-alt'></i>
                        <span className='format-timedate' > {moment(item.dataHoraCriacao).format('DD/MM/Y HH:mm:ss')} </span>
                      </div>

                      <div className={this.state.activeItem === index && item.tipo === 'TRANSFERENCIA' ? 'display-block' : 'display-none'} >
                        {this.renderChamado(item)}
                        <div className='float-right' >
                          <Button className={'btn-notificacoes js--triggerAnimation'} color="info"
                            onClick={() => this.accept(index, item.transferencia.idTransferencia, item.id)} >Aceitar</Button>
                          <Button className={'btn-notificacoes'} color="danger"
                            onClick={this.refuse.bind(this, index)} >Recusar</Button>
                          {/* <Button className={'btn-notificacoes'} color="secondary" >Visualizar</Button> */}
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    ))
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.props.modal} modalTransition={{ timeout: 700 }} backdropTransition={{ timeout: 1300 }}
          toggle={this.toggle.bind(this)} className={this.props.className}>
          <ModalHeader toggle={this.toggle.bind(this)}>Notificações</ModalHeader>
          <ModalBody>
            {this.renderNotificacoes()}
            <a className="nav-link text-center" onClick={() => this.loadMoreNotifications()} href="#"> <strong>Carregar mais notificações</strong> <i className="fa fa-angle-down"></i> </a>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.toggle.bind(this)}>Fechar</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    listaNotificacao: state.notificacaoStore.listaNotificacao,
    listaTodasNotificacoes: state.notificacaoStore.listaTodasNotificacoes,
    chamado: state.notificacaoStore.chamado,
  }
)

export default connect(mapStateToProps)(NotificacaoModal)