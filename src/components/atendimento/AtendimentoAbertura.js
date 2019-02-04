import React, { Component } from 'react'
import PendenciaFinanceira from "../cliente/PendenciaFinanceira"
import PropTypes from "prop-types"
import AtendimentoPresenter from "./AtendimentoPresenter"
import ChamadoPresenter from "../chamado/ChamadoPresenter"
import CreatableSelect from "react-select/lib/Creatable"
import ClientePresenter from "../cliente/ClientePresenter"
import draftToHtml from "draftjs-to-html"
import { convertToRaw, EditorState, ContentState, convertFromHTML } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import '../../commom/template/custom.css'
import { toastr } from "react-redux-toastr"

import { Alert } from 'reactstrap'
import ClienteDetalhes from "../cliente/ClienteDetalhes"
import BuscaClienteTypeahead from "../cliente/buscacliente/BuscaClienteTypeahead"
import Liberacao from "./sistema/LiberacaoSistema"
import ReactTooltip from "react-tooltip"

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ms = require('pretty-ms')

class AtendimentoAbertura extends Component {

    constructor(props) {
        super(props)

        this.state = {
            time: 0,
            start: 0,
            isOn: false,
            atendimento: this.props.atendimento,
            tiposAtendimento: [],
            listaSistema: [],
            listaEmailCliente: [],
            modalDetalhes: false,
            dadosCliente: [],
            obj: {
                id: this.props.atendimento.id,
                solicitante: '',
                clienteId: '',
                assunto: '',
                tipoAtendimentoId: '',
                email: [],
                textoCliente: '',
                textoInterno: '',
                sistemaId: ''
            },

            listEmails: [{ value: '', label: '' }],
            value: [],

            editorTextoInternoState: EditorState.createEmpty(),
            editorTextoClienteState: EditorState.createEmpty(),

            modoPesquisaCliente: 'nome',
            textoModoPesquisaCliente: 'Consulta por nome',
            title: "Atendimento Iniciado: ",
            visibleAlert: false,
            visibleAlertCliente: false,
            erros: [],
            modalLiberacao: false,

            formErrors: { email: '', assunto: '', solicitante: '', tipo: '', cliente: '', sistema: '', textoCliente: '', textoLiberacao: '' },

            renderCancelamento: false,
            modalCancelarAtendimento: false,

            listaSistemasCliente: [],

            onScrollUp: false,

            atendimentoHoje: false,
        }

        this.startTimer = this.startTimer.bind(this)
        this.stopTimer = this.stopTimer.bind(this)
        this.resetTimer = this.resetTimer.bind(this)
        this.toggleModalDetalhesCliente = this.toggleModalDetalhesCliente.bind(this)

        this.presenter = new AtendimentoPresenter(this)
        this.presenterChamado = new ChamadoPresenter(this)
        this.presenterCliente = new ClientePresenter(this)
        this.openLiberacao = this.openLiberacao.bind(this)

        this.toggleCancelarAtendimento = this.toggleCancelarAtendimento.bind(this);

        this.liberacaoConcluida = this.liberacaoConcluida.bind(this)
    }


    toggleCancelarAtendimento() {
        this.setState({
            modalCancelarAtendimento: !this.state.modalCancelarAtendimento
        });
        this.props.atendimentoHoje('', false);
    }

    startTimer() {
        this.setState({
            time: this.state.time,
            start: Date.now() - this.state.time,
            isOn: true
        })
        this.timer = setInterval(() => this.setState({
            time: Date.now() - this.state.start
        }), 1);

    }

    stopTimer() {
        this.setState({ isOn: false })
        clearInterval(this.timer)
    }

    resetTimer() {
        this.setState({ time: 0 })
    }

    validateOnSubmit() {

        const {
            solicitante,
            clienteId,
            assunto,
            tipoAtendimentoId,
            email,
            textoCliente,
            sistemaId
        } = this.state.obj

        const errors = [];

        let fieldValidationErrors = this.state.formErrors

        Object.keys(fieldValidationErrors).map((fieldName) => {
            fieldValidationErrors[fieldName] = ''
            return null
        })

        if (assunto.length === 0) {
            fieldValidationErrors.assunto = 'Assunto é obrigatório'
            errors.push(fieldValidationErrors.assunto);
        }

        if (this.state.listEmails.length === 0) {
            fieldValidationErrors.email = 'E-mail não informado';
            errors.push(fieldValidationErrors.email);
        } else {
            this.state.listEmails.map((item) => {
                const emailValid = item.value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                if (!emailValid) {
                    fieldValidationErrors.email = 'E-mail inválido';
                    errors.push(fieldValidationErrors.email);
                }
            })
        }

        if (solicitante.length === 0) {
            fieldValidationErrors.solicitante = 'Solicitante é obrigatório'
            errors.push(fieldValidationErrors.solicitante);
        }

        if (tipoAtendimentoId === -1 || tipoAtendimentoId === '') {
            fieldValidationErrors.tipo = 'Tipo Chamado é obrigatório'
            errors.push(fieldValidationErrors.tipo);
        }

        if (clienteId === '') {
            fieldValidationErrors.cliente = 'Cliente é obrigatório'
            errors.push(fieldValidationErrors.cliente)
        }

        if (sistemaId === '' || sistemaId === -1) {
            fieldValidationErrors.sistema = 'Sistema é obrigatório'
            errors.push(fieldValidationErrors.sistema)
        }

        if (textoCliente.trim() === '' || textoCliente.trim() === '<p></p>') {
            fieldValidationErrors.textoCliente = 'Texto do cliente é obrigatório'
            errors.push(fieldValidationErrors.textoCliente)
        }

        this.setState({ fieldValidationErrors });

        return errors.length > 0;
    }

    exibirCliente(cliente) {
        this.setState({
            dadosCliente: cliente,
        })
    }

    exibeAtendimentoHoje(atendimentoHoje) {
        this.setState({
            atendimentoHoje: atendimentoHoje.resultado
        })
        this.props.atendimentoHoje(this.state.dadosCliente.nomeFantasia, this.state.atendimentoHoje);
    }

    exibeSistemaCliente(sistema) {
        this.setState({
            listaSistemasCliente: sistema,
        })
    }

    onChangeSolicitante(event) {
        this.setState({ obj: { ...this.state.obj, solicitante: event.target.value } });
    }

    onChangeCliente(value) {
        this.setState({ obj: { ...this.state.obj, clienteId: value } })

        this.presenterCliente.carregarClientePorId(value)
        this.presenterCliente.carregarEmailPorIdCliente(value)
        this.presenterCliente.carregarSistemasPorIdCliente(value)
        this.presenterCliente.carregarAtendimentoHoje(value)
    }

    onChangeClienteLabel(value) {
        this.props.onChangeClienteLabel(value)
    }

    onChangeAssunto(event) {
        this.setState({ obj: { ...this.state.obj, assunto: event.target.value } });
    }

    handleChangeTipo(event) {
        const idTipo = parseInt(event.target.value, 0)
        this.setState({obj: {...this.state.obj, tipoAtendimentoId: idTipo }})
    }

    handleChangeSistema(event) {
        const idSistema = parseInt(event.target.value, 0)
        this.setState({ obj: { ...this.state.obj, sistemaId: idSistema } })
    }

    onChangeValueEmail = event => {
        this.state.listEmails = [];
        this.state.obj.email = [];
        event.map((item) => {
            this.state.listEmails.push({ value: item.value, label: item.value })
            this.state.obj.email.push(item.value)
        })

        this.setState({
            ... this.state.value, value: event.value
        });
    };

    onEditorTextoInternoStateChange = (editorTextoInternoState) => {
        this.setState({
            editorTextoInternoState,
            obj: { ...this.state.obj, textoInterno: draftToHtml(convertToRaw(editorTextoInternoState.getCurrentContent())) },
        });
    };

    onEditorTextoClienteStateChange = (editorTextoClienteState) => {
        this.setState({
            editorTextoClienteState,
            obj: { ...this.state.obj, textoCliente: draftToHtml(convertToRaw(editorTextoClienteState.getCurrentContent())) },
        });
    };

    exibeTiposAtendimento(tipoatendimentos) {
        this.setState({ tiposAtendimento: tipoatendimentos })
    }

    exibirSistema(sistema) {
        this.setState({ listaSistema: sistema })
    }

    exibeEmail(email) {
        this.setState({ listaEmailCliente: email })
    }

    exibeErrosAtendimento(erros) {
        this.setState({
            visibleAlert: true,
            erros: erros
        })
    }

    onDismissAlert() {
        this.setState({ visibleAlert: false, erros: [] });
    }

    onDismissAlertCliente() {
        this.setState({ visibleAlertCliente: false, });
    }

    finalizaAtendimento() {
        toastr.success('Sucesso', 'Atendimento finalizado com sucesso.')
        document.title = "Atendimento Zaal";

        this.setState({
            visibleAlert: false,
            erros: []
        })

        this.props.atendimentoConcluido()
    }

    concluirAtendimento() {

        const errors = this.validateOnSubmit();
        if (errors) {
            return;
        }

        this.presenter.finalizarAtendimento(this.state.atendimento.id, this.state.obj)
        this.props.atendimentoHoje('', false);
    }

    cancelarAtendimento() {

        document.title = "Atendimento Zaal";

        this.props.toggle();
        this.setState({
            visibleAlert: false,
            erros: []
        })

    }

    liberacaoConcluida() {
        this.setState({
            editorTextoClienteState: EditorState.createWithContent(
                ContentState.createFromBlockArray(
                    convertFromHTML('<p><strong>Liberação de produto(s) Zaal concluída com sucesso.</strong></p>')
                )
            )
        })
        this.setState({
            modalLiberacao: false,
        });
    }

    componentDidMount() {
        this.inputSolicitante.focus();

        this.presenter.carregarTipoAtendimento()
        this.presenterChamado.carregarSistemaDoChamado()

        window.addEventListener('scroll', this.onWindowScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onWindowScroll);
    }

    onWindowScroll = () => {
        var lastScrollTop = 0;
        var st = window.pageYOffset || document.documentElement.scrollTop;
        if (st > lastScrollTop){
            this.setState({ onScrollUp: true });
        } else {
            this.setState({ onScrollUp: false })
        }
    }

    renderModalCancelarAtendimento() {
        return (
            <div>
                <Modal isOpen={this.state.modalCancelarAtendimento} toggle={this.toggleCancelarAtendimento}>
                    <ModalHeader toggle={this.toggleCancelarAtendimento}>Cancelar Atendimento</ModalHeader>
                    <ModalBody>
                        Deseja realmente cancelar este atendimento?
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.cancelarAtendimento.bind(this)}>Confirmar</Button>{' '}
                        <Button color="secondary" onClick={this.toggleCancelarAtendimento}>Cancelar</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }

    errorClass(error) {
        return (error.length === 0 ? '' : 'has-danger');
    }

    errorClassEditor(error) {
        return (error.length === 0 ? '' : 'demo-editor-error');
    }

    toggleModalDetalhesCliente() {

        if (this.state.obj.clienteId === '') {
            this.setState({
                visibleAlertCliente: true
            })

            setTimeout(function () {
                this.setState({
                    visibleAlertCliente: false
                })
            }
                .bind(this),
                3000
            )

            return
        }

        this.setState({
            modalDetalhes: !this.state.modalDetalhes
        })
    }

    openLiberacao() {

        const { clienteId } = this.state.obj;
        let fieldValidationErrors = this.state.formErrors;
        
        if (clienteId === '') {
            fieldValidationErrors.textoLiberacao = ' * Informe um CLIENTE antes de Liberar o Sistema.';
            return;
        } else {
            fieldValidationErrors.textoLiberacao = '';
        }
        
        this.setState({
            modalLiberacao: !this.state.modalLiberacao
        });
    }

    renderMsgCliente() {
        return (
            <div className="col-md-12 m-b-20">
                <Alert color="warning" isOpen={this.state.visibleAlertCliente} toggle={this.onDismissAlertCliente.bind(this)} fade={true}>
                    <div className="text-center">Selecione o Cliente</div>
                </Alert>
            </div>
        )
    }

    renderErros() {
        return (
            <div className="col-md-12 m-b-20">
                <Alert color="danger" isOpen={this.state.visibleAlert} toggle={this.onDismissAlert.bind(this)} fade={true}>
                    {this.state.erros.map(item => <p>{item.mensagem}</p>)}
                </Alert>
            </div>
        )
    }

    render() {

        return (
            
            <div>
                {this.state.visibleAlertCliente ? 

                    <div className="row">
                        <div className="container">
                            <div className="center">
                                <PendenciaFinanceira idCliente={this.state.obj.clienteId} />
                                {this.renderMsgCliente()}
                            </div>
                        </div>
                    </div>
                    
                :

                    ''
                }
                
                <div className="row h-m-t-screen-95">
                    <div tabIndex="0" className="col-md-6">
                        <div className={`form-group ${this.errorClass(this.state.formErrors.solicitante)}`}>
                            <label className="control-label">Solicitante</label>
                            <input ref={(input) => { this.inputSolicitante = input; }}  className="form-control" onChange={this.onChangeSolicitante.bind(this)} type="text" id="solicitante" name="solicitante" value={this.state.obj.solicitante} />
                        </div>
                    </div>

                    <div tabIndex="1" className="col-md-6">
                        <div className={`form-group ${this.errorClass(this.state.formErrors.cliente)}`}>
                            <label>Cliente
                                <small className="form-control-feedback"> {`(${this.state.textoModoPesquisaCliente})`}
                                    <a tabIndex="-1" href="#" className="link m-r-10" onClick={this.toggleModalDetalhesCliente}>
                                        <i style={{ marginLeft: "10px" }} className='fas fa-search'></i>
                                    </a>
                                </small>
                            </label>
                            <BuscaClienteTypeahead paramPesquisa={this.state.modoPesquisaCliente}
                                                   handleChange={this.onChangeCliente.bind(this)}
                                                   handleLabel={this.onChangeClienteLabel.bind(this)}/>
                            <small className="form-control-feedback"> F2 alterar modo de pesquisa </small>
                        </div>
                    </div>
                </div>

                <div className="row h-m-t-screen-100">

                    <div tabIndex="2" className="col-md-6">
                        <div className={`form-group ${this.errorClass(this.state.formErrors.assunto)}`}>
                            <label>Assunto</label>
                            <input type="text"
                                className="form-control"
                                id="assunto"
                                name="assunto"
                                value={this.state.obj.assunto}
                                onChange={this.onChangeAssunto.bind(this)}
                            />
                        </div>
                    </div>


                    <div tabIndex="4" className="col-md-6">
                        <div  className={`form-group ${this.errorClass(this.state.formErrors.tipo)}`}>
                            <label className={this.state.obj.tipoAtendimentoId === 5 ? "control-label label-tipo" : "control-label"}  >Tipo</label>
                            <select data-placeholder="Selecione o Tipo"
                                    className={this.state.obj.tipoAtendimentoId === 5 ? "form-control custom-select select-tipo" : "form-control custom-select"}
                                    onChange={this.handleChangeTipo.bind(this)}
                                    value={this.state.obj.tipoAtendimentoId} >
                                <option selected="" value="">Selecione...</option>
                                {this.state.tiposAtendimento.map((item) =>
                                    <option key={item.id} value={item.id}>{item.nome}</option>
                                )}
                            </select>
                            {this.state.obj.tipoAtendimentoId === 5 ? (
                                <button type="button"
                                        className={this.state.obj.tipoAtendimentoId === 5 ? "btn waves-effect waves-light btn-info btn-liberacao-tipo" : "btn waves-effect waves-light btn-info"}
                                        onClick={this.openLiberacao} >Liberação
                                </button>
                            ) : (
                                ''
                            )}
                            <small style={{ color: "red" }} >{this.state.formErrors.textoLiberacao}</small>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div tabIndex="5" className="col-md-6">
                        <div className={`form-group ${this.errorClass(this.state.formErrors.sistema)}`}>
                            <label className="control-label">Sistema</label>
                            <select disabled={this.state.obj.clienteId === '' ? true : false} data-placeholder="Selecione o Sistema" className="form-control custom-select" onChange={this.handleChangeSistema.bind(this)} value={this.state.obj.sistemaId} ena >
                                <option selected="" value="-1">Selecione...</option>
                                {this.state.listaSistemasCliente.map((item, index) =>
                                    <option key={item.id} value={item.id}>{item.descricao}</option>
                                )}
                            </select>
                        </div>
                    </div>

                    <div tabIndex="6" className="col-md-6">
                        <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
                            <label>E-mail</label>
                            <CreatableSelect
                                className='has-danger'
                                value={this.state.value}
                                onChange={this.onChangeValueEmail}
                                isMulti
                                options={
                                    this.state.listaEmailCliente.map(item => (
                                        { value: item.email, label: item.email }
                                    ))
                                }
                            />
                            <small className={this.state.listEmails.length === 0 ? 'small-email-show' : 'small-email-hide'} >* Selecione pelo menos um e-mail.</small>
                            <small className={this.state.formErrors.email.length !== 0 ? 'small-email-show' : 'small-email-hide'} >* E-mail inválido!</small>
                        </div>
                    </div>

                </div>

                <div className="row">
                    <div tabIndex="7" className="col-md-6 m-b-5">
                        <div className="form-group">
                            <label>Texto Interno / Problema Relatado</label>
                            <Editor
                                wrapperClassName="form-group"
                                editorClassName={`editor-atendimento`}
                                toolbarClassName="toolbar-class"
                                onEditorStateChange={this.onEditorTextoInternoStateChange}
                                editorState={this.state.editorTextoInternoState}
                                toolbar={{
                                    options: ['inline', 'textAlign', 'history'],//options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign','history'],
                                }}
                            />
                        </div>
                    </div>

                    <div tabIndex="8" className="col-md-6 m-b-5">
                        <div className={`form-group ${this.errorClass(this.state.formErrors.textoCliente)}`}>
                            <label>Texto Externo / Conclusão</label>
                            <Editor
                                wrapperClassName="form-group"
                                editorClassName={`editor-atendimento ${this.errorClassEditor(this.state.formErrors.textoCliente)}`}
                                toolbarClassName="toolbar-class"
                                onEditorStateChange={this.onEditorTextoClienteStateChange}
                                editorState={this.state.editorTextoClienteState}
                                toolbar={{
                                    options: ['inline', 'textAlign', 'history'],
                                }}
                            />
                        </div>
                    </div>
                </div>

                <Liberacao modal={this.state.modalLiberacao}
                           toggle={this.openLiberacao}
                           cliente={this.state.dadosCliente} 
                           sistemas={this.state.listaSistemasCliente}
                           liberacaoConcluida={this.liberacaoConcluida} />

                <div className="text-right m-b-15">
                    <div className="button-group">

                        <button
                            onClick={this.props.iniciarNovoAtendimento}
                            type="button"
                            data-tip={'Inicia um novo atendimento em uma nova aba.'}
                            data-place='right'
                            className="btn btn-success btn-rounded">{'Iniciar Novo Atendimento'}
                        </button>

                        <button onClick={this.concluirAtendimento.bind(this)} className="btn btn-info btn-rounded" style={{ marginRight: '10px' }}> Concluir </button>
                        <button onClick={this.toggleCancelarAtendimento} className="btn btn-secondary btn-rounded" style={{ marginRight: '10px' }}> Cancelar</button>

                        <ReactTooltip />
                    </div>

                </div>
            
                {this.renderErros()}

                <ClienteDetalhes idCliente={this.state.obj.clienteId} modal={this.state.modalDetalhes} toggle={this.toggleModalDetalhesCliente} />

                {this.renderModalCancelarAtendimento()}

                <div class={ this.state.onScrollUp ? 'popup-timer display-block' : 'popup-timer display-none'}>{ms(this.props.timerAtendimento)}</div>

            </div>
            
        );
    }
}

AtendimentoAbertura.propTypes = {
    atendimento: PropTypes.object.isRequired,
};

export default AtendimentoAbertura;