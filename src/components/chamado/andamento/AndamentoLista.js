import React, { Component } from 'react'
import { connect } from 'react-redux'
import AndamentoPresenter from './AndamentoPresenter'
import { exibirAndamentoNaoEncontrado, filtrarAndamento } from './AndamentoAction'
import PageTitles from "../../../commom/template/PageTitles"
import moment from 'moment'
import { Collapse, Button, CardBody, Card } from 'reactstrap'
import { OPERACAO_ATENDIMENTO } from "../../../base"

import '../../../commom/template/custom.css'
import AndamentoInclusao from "./AndamentoInclusao"
import { toastr } from "react-redux-toastr"
import { classNameOperacao } from "../../../utils/utils"
import { exibirLoading, encerrarLoading } from "../../LoadingAction"
import ChamadoAnexos from "../ChamadoAnexos"
import TransferenciaLista from '../../chamado/transferencia/TransferenciaLista'
import ChamadoEdicao from '../ChamadoEdicao'
import ClienteDetalhes from "../../cliente/ClienteDetalhes"
import ClienteInteracao from "../../cliente/ClienteInteracao";
import PendenciaFinanceira from "../../cliente/PendenciaFinanceira";
import Atuacao from '../atuacao/Atuacao';

import { filtrarChamado } from "../ChamadoAction"
import ChamadoPresenter from "../ChamadoPresenter";
import AtuacaoPresenter from '../atuacao/AtuacaoPresenter';

class Andamento extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalInclusao: false,
            modalEdicao: false,
            modalDetalhes: false,
            anexo: true,
            andamento: true,
            collapse: false,
            collapseTransferencias: false,
            feedback: false,
            atuacao: false,
            isMouseInside: false,
            chamadoDetalhe: this.props.chamado,
            listAtuacao: [],
        }

        this.toggle = this.toggle.bind(this);
        this.toggleTransferencia = this.toggleTransferencia.bind(this)
        this.toggleModalInclusao = this.toggleModalInclusao.bind(this)
        this.toggleModalEdicao = this.toggleModalEdicao.bind(this)
        this.andamentoCadastrado = this.andamentoCadastrado.bind(this)
        this.toggleAnexo = this.toggleAnexo.bind(this)
        this.toggleAndamento = this.toggleAndamento.bind(this)
        this.toggleModalDetalhesCliente = this.toggleModalDetalhesCliente.bind(this)
        this.atualizarChamado = this.atualizarChamado.bind(this)

        this.presenter = new AndamentoPresenter(this)
        this.presenterChamado = new ChamadoPresenter(this)
        this.presenterAtuacao = new AtuacaoPresenter(this)

        this.toastMensagem = this.toastMensagem.bind(this);
    }

    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }

    toggleTransferencia() {
        this.setState({ collapseTransferencias: !this.state.collapseTransferencias })
    }

    componentDidMount() {
        this.props.dispatch(exibirLoading());
        this.presenter.carregarAndamentosDoChamado(this.props.chamado.id);
        this.presenterAtuacao.carregarAtuacao(this.state.chamadoDetalhe.id);
        //this.presenterChamado.carregarChamadoPorIdObj(this.props.chamado.id)
        this.consultaFeedback();
    }

    atualizarChamado() {
        this.presenterChamado.carregarChamadoPorIdObj(this.props.chamado.id)
    }

    exibirChamadoObjeto(chamado) {
        this.setState({
            chamadoDetalhe: chamado
        })
    }

    exibirAndamentos(andamentos) {
        this.props.dispatch(filtrarAndamento(andamentos))
        this.props.dispatch(encerrarLoading())
    }

    exibirMensagemNaoEncontrado() {
        this.props.dispatch(exibirAndamentoNaoEncontrado())
    }

    exibirChamado(chamado) {
        this.props.dispatch(filtrarChamado(chamado))
    }

    toggleModalInclusao() {
        this.setState({
            modalInclusao: !this.state.modalInclusao
        })
    }

    toggleModalEdicao() {
        this.setState({
            modalEdicao: !this.state.modalEdicao
        })
    }

    toggleModalDetalhesCliente() {
        this.setState({
            modalDetalhes: !this.state.modalDetalhes
        })
    }

    toggleAnexo() {
        this.setState({
            anexo: !this.state.anexo,
            andamento: false
        })
    }

    toggleAndamento() {
        this.setState({
            anexo: false,
            andamento: !this.state.andamento,
        })
    }

    andamentoCadastrado() {
        toastr.success('Sucesso', 'Andamento cadastrado com sucesso.')
        this.presenter.carregarAndamentosDoChamado(this.state.chamadoDetalhe.id)
    }

    chamadoAlterado() {
        toastr.success('Sucesso', 'Chamado alterado com sucesso.')
        this.presenter.carregarChamadoPorId(this.state.chamadoDetalhe.id)
    }

    renderMensagemNaoEncontrado() {

        if (this.props.andamentoNaoEncontrado === true) {
            return (
                <div className="alert-danger" >
                    Andamentos não encontrados
                </div>
            )
        }

        return null
    }

    timeLineClaas(index) {
        return (index % 2 === 0 ? '' : 'timeline-inverted');
    }

    timelineBadge(operacao) {
        switch (operacao) {
            case OPERACAO_ATENDIMENTO.ANDAMENTO:
                return <div className="timeline-badge success"><i className="fas fa-play"></i></div>
            case OPERACAO_ATENDIMENTO.ANEXO_ARQUIVO:
                return <div className="timeline-badge info"><i className="fas fa-paperclip"></i></div>
            case OPERACAO_ATENDIMENTO.CANCELADA:
                return <div className="timeline-badge danger"><i className="fas fa-times"></i></div>
            case OPERACAO_ATENDIMENTO.CONCLUSAO:
                return <div className="timeline-badge mytimeline-badge-success"><i className="fas fa-check"></i></div>
            case OPERACAO_ATENDIMENTO.EM_ANALISE:
                return <div className="timeline-badge warning"><i className="fas fa-hourglass-half"></i></div>
            case OPERACAO_ATENDIMENTO.MODIFICACAO_CHAMADO:
                return <div className="timeline-badge mytimeline-badge-secondary"><i className="fas fa-pencil-alt"></i></div>
            case OPERACAO_ATENDIMENTO.PAUSA:
                return <div className="timeline-badge mytimeline-badge-pausa"><i className="fas fa-pause"></i></div>
            case OPERACAO_ATENDIMENTO.PREVISAO:
                return <div className="timeline-badge mytimeline-badge-warning"><i className="fas fa-calendar-alt"></i></div>
            case OPERACAO_ATENDIMENTO.REINICIO:
                return <div className="timeline-badge mytimeline-badge-reinicio"><i className="fas fa-undo-alt"></i></div>
            default:
                return <div className="timeline-badge info"><i className="fas fa-play"></i></div>
        }
    }

    toastMensagem = (tipo) => {
        switch(tipo) {
            case 0: return ( toastr.success('Muito bem!', 'Agora você está seguindo esse chamado.') )
            case 1: return ( toastr.error('Já vai?', 'Você deixou de seguir esse chamado.') )
            case 2: return ( toastr.success('Muito bem!', 'Agora você está atuando nesse chamado.') )
            case 3: return ( toastr.error('Até Breve!', 'Você não está mais atuando nesse chamado.') )
            default: console.log(tipo)  
          }
    }

    ativarFeedback() {
        this.presenter.gravarFeedback(this.state.chamadoDetalhe.id);
        this.toastMensagem(0);
    }

    ativarAtuacao() {
        this.presenterAtuacao.gravarAtuacao(this.state.chamadoDetalhe.id);
        this.toastMensagem(2);
        setTimeout(function () {
            this.presenterAtuacao.carregarAtuacao(this.state.chamadoDetalhe.id);
        }.bind(this), 5000);
    }

    desativarFeedback() {
        this.presenter.cancelarFeedback(this.state.chamadoDetalhe.id);
        this.toastMensagem(1);
    }

    desativarAtuacao() {
        this.presenterAtuacao.cancelarAtuacao(this.state.chamadoDetalhe.id);
        this.toastMensagem(3);
        setTimeout(function () {
            this.presenterAtuacao.carregarAtuacao(this.state.chamadoDetalhe.id);
        }.bind(this), 5000);
    }

    consultaFeedback = () => {
        this.presenter.consultaFeedback(this.state.chamadoDetalhe.id);
    }

    atualizaFeedback(response) {
        this.setState({
            feedback: response
        })
    }

    atualizaAtuacao(response) {
        this.setState({
            atuacao: response
        })
    }

    exibirAtuacao(response) {
        if (response.length !== 0) this.setState({ atuacao: true })
        this.setState({
            listAtuacao: response
        })
    }

    // mouseEnter = () => {
    //     this.setState({ isMouseInside: true });
    // }

    // mouseLeave = () => {
    //     this.setState({ isMouseInside: false });
    // }

    // renderButtonDeixarSeguir() {
    //     return (
    //         <div className='float-right' >
    //             <button type="button" onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}
    //                 className="btn btn-outline-danger btn-rounded"
    //                 onClick={() => this.desativarFeedback(this.state.chamadoDetalhe.id)} >
    //                 <i className="fa fa-bell-slash"></i> Deixar de Seguir
    //             </button>
    //         </div>
    //     )
    // }
    renderButtonSeguir() {
        return (
            <div className='float-right' >
                {/* <button type="button" onMouseEnter={this.state.feedback === true || this.props.feedbackAction.seguindo === true ? this.mouseEnter : this.mouseLeave} onMouseLeave={this.mouseLeave}
                    className={this.state.feedback === true || this.props.feedbackAction.seguindo === true ? 'btn btn-info btn-rounded' : 'btn btn-outline-info btn-rounded btn-seguir-chamado'}
                    onClick={() => this.ativarFeedback(this.state.chamadoDetalhe.id)} >
                    {this.state.feedback === true || this.props.feedbackAction.seguindo === true ? <i className="fa fa-check"></i> : ''}
                    {this.state.feedback === true || this.props.feedbackAction.seguindo === true ? ' Seguindo' : ' Seguir'}
                </button> */}

                <div className="dropdown">
                    <button type="button" className="btn btn-info btn-rounded btn-seguir-chamado dropdown-toggle " data-toggle="dropdown">Acompanhar Chamado</button>
                    <div className="dropdown-menu drop-width">
                        <a href="#" 
                           onClick={ this.state.feedback === true ?
                                      () => this.desativarFeedback() : 
                                      () => this.ativarFeedback()} 
                            className={ this.state.feedback === true ?
                                        'dropdown-item dropdown-item-checked seguindo-atuando' : 
                                        'dropdown-item'} >
                            {this.state.feedback === true ? 'Seguindo' : 'Seguir Chamado'} 
                        </a>
                        <a href="#" 
                           onClick={ this.state.atuacao === true ?
                                      () => this.desativarAtuacao() : 
                                      () => this.ativarAtuacao()} 
                            className={ this.state.atuacao === true ?
                                        'dropdown-item dropdown-item-checked seguindo-atuando' : 
                                        'dropdown-item'} >
                            {this.state.atuacao === true ? 'Atuando' : 'Atuar no Chamado'} 
                        </a>
                        {/* <a href="#" className="dropdown-item"> Atuar no Chamado</a> */}
                    </div>
                </div>

            </div>
        )
    }

    renderAnexosChamado() {

        if (this.state.anexo === true) {
            return (
                <ChamadoAnexos chamado={this.state.chamadoDetalhe} />
            )
        }

        return null
    }

    renderAndamentosChamado() {

        if (this.state.andamento === true) {
            return (
                <ul className="timeline">
                    {this.renderTimeLine()}
                </ul>
            )
        }

        return null
    }

    renderTimeLine() {
        return (
            this.props.lista.map((item, index) => {
                return (
                    <li key={index} className={`${this.timeLineClaas(index)}`} >
                        {this.timelineBadge(item.operacao.id)}
                        <div className="timeline-panel mytimeline-panel">
                            <div className="timeline-heading">
                                <div className="row">
                                    <div className="col-md-8">
                                        <h4 className="timeline-title">{item.funcionario.nome}</h4>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="text-right">
                                            <span className={`${classNameOperacao(item.operacao.id)}`}>{item.operacao.nome}</span>
                                            {item.enviaEmail ? <span className="label label-info">Email</span> : ''}
                                        </div>
                                    </div>
                                </div>
                                <p>
                                    <small className="text-muted"><i className="fa fa-clock-o"></i>
                                        {moment(item.dataHora).format('DD/MM/Y HH:mm:ss')}
                                    </small>
                                </p>

                            </div>

                            <div className="timeline-body">
                                <p className="card-text" dangerouslySetInnerHTML={{ __html: item.texto }} />
                            </div>

                        </div>
                    </li>
                )
            })
        )
    }

    render() {
        return (
            <div>
                <PageTitles pagina="Andamentos do Chamado" />

                <div className="row">

                    <div className='col-md-12 col-xlg-12' >
                        {/* <div className="col-md-12 col-xlg-12"> */}

                        <div className="card">
                            <div className="card-body">

                                <div className="right-page-header">
                                    <div className="d-flex">
                                        <div className="align-self-center">
                                            <h4 className="card-title">Andamentos</h4>
                                            <h6 className="card-subtitle">Andamentos do chamado </h6>
                                        </div>

                                    </div>

                                    <div className="button-group andamentos-button">

                                        <button onClick={this.toggleModalInclusao} type="button"
                                            className="btn btn-success btn-rounded">Incluir
                                        </button>

                                        <button onClick={this.props.voltar} type="button"
                                            className="btn btn-danger btn-rounded">Voltar
                                        </button>

                                        { this.renderButtonSeguir() } {/* {this.state.isMouseInside === true ? this.renderButtonDeixarSeguir() : this.renderButtonSeguir()} */}

                                    </div>

                                    <div className="card">
                                        <div className="card-body">

                                            <div className="row">
                                                <div className="container">
                                                    <div className="center">
                                                        <PendenciaFinanceira idCliente={this.state.chamadoDetalhe.cliente.id} />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">

                                                <div id='card-inf' className="col-md-4">
                                                    <small className="text-muted">Protocolo</small>
                                                    <h6>{this.state.chamadoDetalhe.id}</h6>
                                                    <small className="text-muted">Data Abertura</small>
                                                    <h6>{moment(this.state.chamadoDetalhe.dataHoraAbertura).format('DD/MM/Y,  H:mm:ss')}</h6>
                                                    <small className="text-muted">Solicitante</small>
                                                    <h6>{this.state.chamadoDetalhe.solicitante}</h6>
                                                    <small className="text-muted">Cliente</small>
                                                    <h6>
                                                        <a href="#" className="link m-r-10" onClick={this.toggleModalDetalhesCliente}>
                                                            {this.state.chamadoDetalhe.cliente.id} - {this.state.chamadoDetalhe.cliente.razaoSocial}
                                                            <i style={{ marginLeft: "10px" }} className='fas fa-search'></i>
                                                        </a>
                                                    </h6>
                                                </div>

                                                <div className="col-md-4">
                                                    <small className="text-muted">Funcionário Cadastro</small>
                                                    <h6>{this.state.chamadoDetalhe.funcionarioCadastro.id} - {this.state.chamadoDetalhe.funcionarioCadastro.nome}</h6>
                                                    <small className="text-muted">Funcionário Responsável</small>
                                                    <h6>{this.state.chamadoDetalhe.funcionarioResponsavel.id} - {this.state.chamadoDetalhe.funcionarioResponsavel.nome}</h6>

                                                    <small className="text-muted">Meio</small>
                                                    <h6>{this.state.chamadoDetalhe.meio.id} - {this.state.chamadoDetalhe.meio.nome}</h6>
                                                </div>

                                                <div className="col-md-4">
                                                    <small className="text-muted">Tipo</small>
                                                    <h6>{this.state.chamadoDetalhe.tipo.id} - {this.state.chamadoDetalhe.tipo.nome}</h6>

                                                    <small className="text-muted">Assunto</small>
                                                    <h6>{this.state.chamadoDetalhe.assunto}</h6>
                                                </div>

                                            </div>

                                            <div className="row">
                                                <div className="col-12 text-right">

                                                    <Button style={{ marginRight: '5px' }} color="primary btn-rounded" onClick={this.toggleTransferencia}>
                                                        <i className="fa fa-exchange-alt" /> Transferências {/*{ this.state.collapseTransferencias } */}
                                                    </Button>

                                                    <Button style={{ marginRight: '5px' }} color="warning btn-rounded" onClick={this.toggleModalEdicao}>
                                                        <i className="fa fa-edit" /> Alterar Chamado
                                                </Button>

                                                    <Button color="default btn-rounded" onClick={this.toggle}>
                                                        <i className="fa fa-paperclip" /> Anexos
                                                </Button>

                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <Collapse isOpen={this.state.collapse}>
                                            <Card>
                                                <CardBody>
                                                    {this.renderAnexosChamado()}
                                                </CardBody>
                                            </Card>
                                        </Collapse>
                                    </div>

                                    <div>
                                        <Collapse isOpen={this.state.collapseTransferencias}>
                                            <Card>
                                                <CardBody>
                                                    <TransferenciaLista idChamado={this.state.chamadoDetalhe.id} />
                                                </CardBody>
                                            </Card>
                                        </Collapse>
                                    </div>

                                    <div className="card">
                                        <div className="card-body">
                                            {this.renderAndamentosChamado()}
                                        </div>
                                    </div>

                                    <ClienteInteracao idCliente={this.state.chamadoDetalhe.cliente.id} />
                                </div>

                            </div>

                        </div>

                    </div>

                    <div className='col-md-12 col-xlg-12'>

                        <Atuacao listaAtuacao={this.state.listAtuacao} />

                    </div>

                    {/* <div className='col-md-12 col-xlg-12' >
                        
                    </div> */}

                </div>

                <AndamentoInclusao idChamado={this.state.chamadoDetalhe.id} sucesso={this.andamentoCadastrado} modal={this.state.modalInclusao} toggle={this.toggleModalInclusao} />

                <ChamadoEdicao atualizarChamado={this.atualizarChamado} idChamado={this.state.chamadoDetalhe.id} idCliente={this.state.chamadoDetalhe.cliente.id} sucesso={this.chamadoAlterado} modal={this.state.modalEdicao} toggle={this.toggleModalEdicao} />

                <ClienteDetalhes idCliente={this.state.chamadoDetalhe.cliente.id} modal={this.state.modalDetalhes} toggle={this.toggleModalDetalhesCliente} />

                {this.renderMensagemNaoEncontrado()}

            </div>
        );
    }
}


const mapStateToProps = state => (
    {
        lista: state.andamentoStore.lista,
        andamentoNaoEncontrado: state.andamentoStore.andamentoNaoEncontrado,
    }
)

export default connect(mapStateToProps)(Andamento)