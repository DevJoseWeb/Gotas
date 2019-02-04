import React, {Component} from 'react'
import {connect} from 'react-redux'
import PageTitle from '../../commom/template/PageTitles'
import ChamadoPresenter from '../chamado/ChamadoPresenter'
import moment from "moment"
import {Alert} from 'reactstrap'
import {toastr} from 'react-redux-toastr'
import {withStyles} from '@material-ui/core/styles'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import {exibirChamadoNaoEncontrado, 
    filtrarChamado, 
    filtrarChamadoPendente, 
    exibirVersao, 
    exibirStatus} from "./ChamadoAction"

import TransferenciaInclusaoModal from "./transferencia/TransferenciaInclusaoModal"
import ChamadoInclusao from "./ChamadoInclusao"

import Andamento from "./andamento/AndamentoLista"

import BuscaChamadoAvancado from "./buscachamado/BuscaChamadoAvancado"
import ChamadoListaTable2 from "./ChamadoListaTable2"
import BuscaChamadoPresenter from "./buscachamado/BuscaChamadoPresenter";

const styles = {
    list: {
        width: 750,
    },
    fullList: {
        width: 'auto',
    },
};

class ChamadoLista extends Component {

    constructor(props){
        super(props)
        this.state = {
            protocolo: '',
            obj: {
                chamados: []
            },
            modal: false,
            modalInclusao: false,
            visibleAlert: false,
            podeTransferir: false,
            exibirDetalheChamado: false,
            chamadoDetalhe: {},

            filtroChamados: {
                solicitante: '',
                assunto: '',
                operacao: '',
                cliente: '',
                setor: '',
                sistema: '',
                versao: '',
                meio: '',
                cadastro: '',
                responsavel: '',
                desenvolvedor: '',
                teste: '',
                prioridade: '',
                status: '',
                data: '',
                periodode: '',
                periodoate: ''
            },

            idResponsavel: this.props.user.id,

            right: false,
        }

        this.keyHandler = this.keyHandler.bind(this)
        this.toggleRow = this.toggleRow.bind(this)
        this.selecionarProtocolosTransferencia = this.selecionarProtocolosTransferencia.bind(this)
        this.toggleModal = this.toggleModal.bind(this)
        this.toggleModalInclusao = this.toggleModalInclusao.bind(this)
        this.onDismissAlert = this.onDismissAlert.bind(this)
        this.cancelarTransferencia = this.cancelarTransferencia.bind(this)
        this.transferenciaRealizada = this.transferenciaRealizada.bind(this)
        this.chamadoCadastrado = this.chamadoCadastrado.bind(this)
        this.voltarListagem = this.voltarListagem.bind(this)
    }

    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        });
    };


    filtrarChamado(objFiltro) {

        this.setState({
            right: false,
            filtroChamados: objFiltro,
            idResponsavel: 0
        }, () => {
            this.presenterBuscaChamado.carregarChamadoPorFiltroAvancado(this.state.filtroChamados)
        });
    }

    transferenciaRealizada() {
        toastr.success('Sucesso', 'Transferência realizada com sucesso.')
        this.cancelarTransferencia()
        this.presenterBuscaChamado.carregarChamadoPorFiltroAvancado(this.state.filtroChamados)
    }

    chamadoCadastrado() {
        toastr.success('Sucesso', 'Chamado cadastrado com sucesso.')
    }

    cancelarTransferencia() {
        this.setState({
            obj:{ ...this.state.obj, chamados: []},
            visibleAlert: false,
            podeTransferir: false
        });
    }

    toggleModal() {

        if (this.state.obj.chamados.length  > 0) {
            this.setState({
                modal: !this.state.modal,
                visibleAlert: false
            })
        } else {
            this.setState({
                visibleAlert: true
            })

            setTimeout(function() {
                    this.setState({
                        visibleAlert: false
                    })
                }
                    .bind(this),
                4000
            )
        }

    }

    toggleModalInclusao() {
        this.setState({
            modalInclusao: !this.state.modalInclusao
        })
    }

    componentDidMount() {
        this.presenter = new ChamadoPresenter(this);

        this.presenterBuscaChamado = new BuscaChamadoPresenter(this);
        this.presenterBuscaChamado.carregarChamadoPorFiltroAvancado(this.state.filtroChamados, this.props.user.id)

        this.presenter.carregarVersaoSistemaDoChamado();
        this.presenter.carregarStatusDoChamado();
    }

    exibirChamado(chamado) {
        this.props.dispatch(filtrarChamado(chamado))
    }

    exibirChamadoNaoEncontrado(){
        this.props.dispatch(exibirChamadoNaoEncontrado())
    }

    exibirVersao(versao) {
        this.props.dispatch(exibirVersao(versao))
    }

    exibirStatus(status) {
        this.props.dispatch(exibirStatus(status))
    }

    selecionarProtocolosTransferencia(protocolos){

        this.setState({
            obj:{ chamados: protocolos},
            podeTransferir: (protocolos.length > 0)
        });
    }

    toggleRow(event) {
        let {chamados} = this.state.obj
        let {checked, value} = event.target
        if (checked) {
            chamados.push(value)
        }
        else {
            chamados.splice(chamados.indexOf(value), 1)
        }

        this.setState({
            obj:{ ...this.state.obj, chamados},
            podeTransferir: (chamados.length > 0)
        });
    }

    renderSelecioneOsChamados() {
        return (
            <Alert color="warning" isOpen={this.state.visibleAlert} toggle={this.onDismissAlert} fade={true}>
                Selecione ao menos um chamado
            </Alert>
        )
    }

    abrirDetalheChamado(chamado) {

        this.setState({
            exibirDetalheChamado: true,
            chamadoDetalhe: chamado
        })
    }

    renderOpcoesChamado() {

        return (
            <div  className="button-group">
                <button onClick={this.toggleModalInclusao} type="button" className="btn btn-success btn-rounded">Incluir</button>
                {/*<button onClick={this.toggleRenderCheck} type="button" className="btn btn-info btn-rounded">Transferir</button>*/}
                <button onClick={this.toggleModal} type="button" className="btn btn-info btn-rounded">Transferir</button>
            </div>
        )
    }

    onChangeConsulta(event) {
        this.setState({ protocolo: event.target.value})
    }

    clearConsulta() {
        this.setState({ protocolo: ''})
        this.presenterBuscaChamado.carregarChamadoPorFiltroAvancado(this.state.filtroChamados, this.props.user.id)
    }

    keyHandler(event){
        if(event.key === 'Enter'){
            this.buscarProtocolo(event.target.value)
        } else if (event.key === 'Escape') {
            this.clearConsulta()
        }
    }

    buscarProtocolo(protocolo) {
        if(protocolo) {
            this.presenter.carregarChamadoPorId(protocolo)
        }
    }

    onDismissAlert() {
        this.setState({ visibleAlert: false });
    }

    voltarListagem() {
        this.setState({
            exibirDetalheChamado: false,
            chamadoDetalhe: {}
        })
    }

    renderRightSidebar() {
        const { classes } = this.props;

        const sideList = (
            <div className={classes.list}>
                <div className="card card-outline-info">
                    <div className="card-header">
                        <h4 className="m-b-0 text-white">Filtro de chamado</h4>
                    </div>
                    <div className="card-body">
                        <BuscaChamadoAvancado close={this.toggleDrawer('right', false)} filtrarChamado={this.filtrarChamado.bind(this)}/>
                    </div>
                </div>
            </div>
        );

        return (
            <div>
                <SwipeableDrawer
                    anchor="right"
                    open={this.state.right}
                    onClose={this.toggleDrawer('right', false)}
                    onOpen={this.toggleDrawer('right', true)}
                >
                    <div
                        tabIndex={0}
                        role="button"
                    >
                        {sideList}
                    </div>
                </SwipeableDrawer>
            </div>
        )
    }

    renderTable() {
        return (
            <ChamadoListaTable2 
                idResponsavel={parseInt(this.state.idResponsavel, 0)}
                onRowClick={this.abrirDetalheChamado.bind(this)}
                selecionarProtocolosTransferencia={this.selecionarProtocolosTransferencia}
                emTransferencia={false}
                filtroChamado={this.state.filtroChamados}/>
        )
    }

    render() {

        if (this.state.exibirDetalheChamado) {
            return (
                <Andamento chamado={this.state.chamadoDetalhe} voltar={this.voltarListagem}/>
            )
        }

        return (
            
            <div>
                <PageTitle pagina="Chamados"/>

                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">

                                <div className="right-page-header">
                                    <div className="d-flex">
                                        <div className="align-self-center">
                                            <h4 className="card-title">Chamados</h4>
                                            <h6 className="card-subtitle">Listagem de chamados</h6>
                                        </div>
                                        <div className="ml-auto">
                                            <input
                                                onChange={this.onChangeConsulta.bind(this)}
                                                onKeyUp={this.keyHandler.bind(this)}
                                                value={this.state.protocolo}
                                                type="text"
                                                id="demo-input-search2"
                                                placeholder="Pesquisar Protocolo"
                                                className="form-control"/>
                                        </div>
                                        <div className="">
                                            <button
                                                onClick={this.toggleDrawer('right', true)}
                                                className="myRight-side-toggle waves-effect waves-light btn btn-secondary btn btn-circle btn-sm pull-right m-l-10">
                                                <i className="fas fa-filter"></i>
                                            </button>
                                        </div>

                                    </div>
                                    {this.renderSelecioneOsChamados()}
                                    {this.renderOpcoesChamado()}
                                </div>

                                {this.renderTable()}


                                <TransferenciaInclusaoModal sucesso={this.transferenciaRealizada}
                                                            chamadosTransf={this.state.obj.chamados}
                                                            modal={this.state.modal}
                                                            toggle={this.toggleModal}/>

                            </div>
                        </div>

                        {this.renderRightSidebar()}
                    </div>
                </div>

                <ChamadoInclusao sucesso={this.chamadoCadastrado} modal={this.state.modalInclusao}
                                toggle={this.toggleModalInclusao}/>
            </div>
        );
    }
}

const mapStateToProps = state => (
    {
        user : state.authStore.user,
        listaChamado: state.chamadoStore.listaChamado,
        chamadoNaoEncontrado: state.chamadoStore.chamadoNaoEncontrado
    }
)

export default connect(mapStateToProps)(withStyles(styles)(ChamadoLista))