import React, { Component } from 'react'
import { connect } from 'react-redux'
import CreatableSelect from 'react-select/lib/Creatable'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert } from 'reactstrap'
import ChamadoPresenter from "./ChamadoPresenter"
import ClientePresenter from '../cliente/ClientePresenter';
import { filtrarEmailCliente } from "../cliente/ClienteAction"
import {
    exibirMeioChamado,
    exibirPrioridade,
    exibirSistema,
    exibirTipo
} from "./ChamadoAction"

import { Editor } from 'react-draft-wysiwyg'
import { EditorState, convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import '../../commom/template/custom.css'
import { MODO_PESQUISA_CLIENTE } from "../../base"
import { hotkeys } from 'react-keyboard-shortcuts'
import PendenciaFinanceira from "../cliente/PendenciaFinanceira"
import BuscaClienteTypeahead from "../cliente/buscacliente/BuscaClienteTypeahead"

const INITIAL_STATE = {
    obj: {
        assunto: '',
        solicitante: '',
        idCliente: '',
        email: '',
        idMeio: '',
        idTipo: '',
        idPrioridade: '',
        idSistema: '',
        texto: '',
    },
    editorTextoState: EditorState.createEmpty(),
    visibleAlert: false,
    erros: [],
    modoPesquisaCliente: 'nome',
    clienteComPendencia: false,
    textoModoPesquisaCliente: 'Consulta por nome',
    formErrors: { email: '', assunto: '', solicitante: '', meiochamado: '', tipo: '', cliente: '', prioridade: '', sistema: '', texto: '' },
    value: '',
    listEmails: []
}

class ChamadoInclusao extends Component {

    constructor(props) {
        super(props)

        this.state = INITIAL_STATE

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChangeMeio = this.handleChangeMeio.bind(this)
        this.handleChangePrioridade = this.handleChangePrioridade.bind(this)
        this.handleChangeSistema = this.handleChangeSistema.bind(this)
        this.handleChangeTipo = this.handleChangeTipo.bind(this)
        this.cancelarInclusaoChamado = this.cancelarInclusaoChamado.bind(this)
        this.onCloseModal = this.onCloseModal.bind(this)
    }

    exibirMensagemSucesso() {  
        this.props.toggle()
        this.props.sucesso()
        this.setState({
            state: INITIAL_STATE
        })
    }

    hot_keys = {
        'f2': {
            priority: 1,
            handler: (event) => this.keyHandler(),
        },
    }

    keyHandler(event) {

        let values = Object.values(MODO_PESQUISA_CLIENTE);
        let nextIndex = values.indexOf(this.state.modoPesquisaCliente) + 1;
        let nextValue = values[nextIndex]

        if (nextValue) {
            this.setState({
                modoPesquisaCliente: nextValue,
                textoModoPesquisaCliente: 'Consulta por ' + nextValue
            })
        } else {
            this.setState({
                modoPesquisaCliente: MODO_PESQUISA_CLIENTE.Nome,
                textoModoPesquisaCliente: 'Consulta por nome'
            })
        }

    }

    onEditorTextoStateChange = (editorTextoState) => {
        let fieldValidationErrors = this.state.formErrors
        fieldValidationErrors.texto = ''
        this.setState({
            editorTextoState,
            obj: { ...this.state.obj, texto: draftToHtml(convertToRaw(editorTextoState.getCurrentContent())) },
            formErrors: fieldValidationErrors
        });
    };

    componentDidMount() {
        this.presenter = new ChamadoPresenter(this)
        this.presenterCliente = new ClientePresenter(this);

        this.presenter.carregarMeioDoChamado()
        this.presenter.carregarPrioridadeDoChamado()
        this.presenter.carregarSistemaDoChamado()
        this.presenter.carregarTipoDoChamado()

    }

    exibirMeio(meio) { this.props.dispatch(exibirMeioChamado(meio)) }
    exibirPrioridade(prioridade) { this.props.dispatch(exibirPrioridade(prioridade)) }
    exibirSistema(sistema) { this.props.dispatch(exibirSistema(sistema)) }
    exibirTipo(tipo) { this.props.dispatch(exibirTipo(tipo)) }
    exibeEmail(email) { this.props.dispatch(filtrarEmailCliente(email)) }

    onChangeTextoAssunto(event) {
        let fieldValidationErrors = this.state.formErrors
        fieldValidationErrors.assunto = ''
        this.setState({ obj: { ...this.state.obj, assunto: event.target.value }, formErrors: fieldValidationErrors });
    }

    onChangeEmail(event) {
        let fieldValidationErrors = this.state.formErrors
        fieldValidationErrors.email = ''
        this.setState({
            obj: { ...this.state.obj, email: event.target.value }, formErrors: fieldValidationErrors
        })
    }

    errorClass(error) {
        return (error.length === 0 ? '' : 'has-danger');
    }

    errorClassEditor(error) {
        return (error.length === 0 ? '' : 'demo-editor-error');
    }

    onDismissAlert() {
        this.setState({ visibleAlert: false, erros: [] });
    }

    renderErros() {
        return (
            <div className="col-md-12 m-b-20">
                <Alert color="danger" isOpen={this.state.visibleAlert} toggle={this.onDismissAlert} fade={true}>
                    {this.state.erros.map(item => <p>{item.mensagem}</p>)}
                </Alert>
            </div>
        )
    }

    exibeErrosChamado(erros) {
        this.setState({
            visibleAlert: true,
            erros: erros
        })
    }

    validateOnSubmit() {

        const {
            assunto,
            solicitante,
            idCliente,
            idMeio,
            idTipo,
            idPrioridade,
            idSistema,
            texto
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
                return null;
            })
        }

        if (solicitante.length === 0) {
            fieldValidationErrors.solicitante = 'Solicitante é obrigatório'
            errors.push(fieldValidationErrors.solicitante);
        }

        if (idMeio === -1 || idMeio === '') {
            fieldValidationErrors.meiochamado = 'Meio Chamado é obrigatório'
            errors.push(fieldValidationErrors.meiochamado);
        }

        if (idTipo === -1 || idTipo === '') {
            fieldValidationErrors.tipo = 'Tipo Chamado é obrigatório'
            errors.push(fieldValidationErrors.tipo);
        }

        if (idCliente === '') {
            fieldValidationErrors.cliente = 'Cliente é obrigatório'
            errors.push(fieldValidationErrors.cliente)
        }

        if (idPrioridade === '' || idPrioridade === -1) {
            fieldValidationErrors.prioridade = 'Prioridade é obrigatório'
            errors.push(fieldValidationErrors.prioridade)
        }

        if (idSistema === '' || idPrioridade === -1) {
            fieldValidationErrors.sistema = 'Sistema é obrigatório'
            errors.push(fieldValidationErrors.sistema)
        }

        if (texto.trim() === '' || texto.trim() === '<p></p>') {
            fieldValidationErrors.texto = 'Texto do cliente é obrigatório'
            errors.push(fieldValidationErrors.texto)
        }

        this.setState({ fieldValidationErrors });

        return errors.length > 0;
    }

    onChangeSolicitante(event) {
        this.setState({ obj: { ...this.state.obj, solicitante: event.target.value } });
    }

    onChangeCliente(value) {
        this.setState({ obj: { ...this.state.obj, idCliente: value } })
        this.presenterCliente.carregarEmailPorIdCliente(this.state.obj.idCliente)
    }

    handleChangeMeio(event) {
        const idMeio = parseInt(event.target.value, 0)
        let fieldValidationErrors = this.state.formErrors
        fieldValidationErrors.meiochamado = ''
        this.setState({ obj: { ...this.state.obj, idMeio: idMeio }, formErrors: fieldValidationErrors })
    }

    handleChangeTipo(event) {
        const idTipo = parseInt(event.target.value, 0)
        let fieldValidationErrors = this.state.formErrors
        fieldValidationErrors.tipo = ''
        this.setState({ obj: { ...this.state.obj, idTipo: idTipo }, formErrors: fieldValidationErrors })
    }

    handleChangePrioridade(event) {
        const idPrioridade = parseInt(event.target.value, 0)
        let fieldValidationErrors = this.state.formErrors
        fieldValidationErrors.prioridade = ''
        this.setState({ obj: { ...this.state.obj, idPrioridade: idPrioridade }, formErrors: fieldValidationErrors })
    }

    handleChangeSistema(event) {
        const idSistema = parseInt(event.target.value, 0)
        let fieldValidationErrors = this.state.formErrors
        fieldValidationErrors.sistema = ''
        this.setState({ obj: { ...this.state.obj, idSistema: idSistema }, formErrors: fieldValidationErrors })
    }

    handleSubmit(event) {
        event.preventDefault()

        const errors = this.validateOnSubmit();
        if (errors) {
            return;
        }

        let objeto = { ...this.state.obj }
    
        this.presenter.criarChamado(JSON.stringify(objeto))

    }

    
    cancelarInclusaoChamado() {
        this.props.toggle()
        
        this.setState({
            INITIAL_STATE,
            obj: {
                ...this.state.obj,
                idCliente: '',
            },
            listEmails: []
        })
    }

    onCloseModal() {
        this.setState({
            INITIAL_STATE
        })
    }

    onChangeValue = event => {
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

    render() {
        return (
            <div>
                <Modal onClosed={this.onCloseModal} size="lg" backdrop={'static'} isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className}>
                    <ModalHeader><h4> Inclusão Chamado
                    </h4>
                    </ModalHeader>
                    <ModalBody>
                        <form className="form-horizontal" id="formInclusaoChamado" onSubmit={this.handleSubmit} >
                            <div className="form-body">
                                <div className="row p-t-20">
                                    <div className="col-md-12">
                                        <PendenciaFinanceira idCliente={this.state.obj.idCliente} />
                                        <div className={`form-group ${this.errorClass(this.state.formErrors.cliente)}`}>
                                            <label>Cliente <small className="form-control-feedback"> {`(${this.state.textoModoPesquisaCliente})`}</small> </label>
                                            {/*<BuscaCliente paramPesquisa={this.state.modoPesquisaCliente} handleChange={this.onChangeCliente.bind(this)} />*/}
                                            <BuscaClienteTypeahead paramPesquisa={this.state.modoPesquisaCliente} handleChange={this.onChangeCliente.bind(this)}/>
                                            <small className="form-control-feedback"> F2 alterar modo de pesquisa </small>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className={`form-group ${this.errorClass(this.state.formErrors.solicitante)}`}>
                                            <label className="control-label">Solicitante</label>
                                            <input className="form-control" onChange={this.onChangeSolicitante.bind(this)} type="text" id="solicitante" name="solicitante" value={this.state.obj.solicitante} />
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className={`form-group ${this.errorClass(this.state.formErrors.assunto)}`}>
                                            <label>Assunto</label>
                                            <input type="text"
                                                className="form-control"
                                                id="assunto"
                                                name="assunto"
                                                value={this.state.obj.assunto}
                                                onChange={this.onChangeTextoAssunto.bind(this)}
                                            />
                                        </div>
                                    </div>

                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className={`form-group ${this.errorClass(this.state.formErrors.meiochamado)}`}>
                                            <label className="control-label">Meio</label>
                                            <select name="meiochamado" data-placeholder="Selecione o meio" tabIndex="1" className="form-control custom-select" onChange={this.handleChangeMeio} value={this.state.obj.idMeio}>
                                                <option selected="" value="-1">Selecione...</option>
                                                {this.props.listaMeio.map((item, index) =>
                                                    <option key={item.id} value={item.id}>{item.nome}</option>
                                                )}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className={`form-group ${this.errorClass(this.state.formErrors.tipo)}`}>
                                            <label className="control-label">Tipo</label>
                                            <select data-placeholder="Selecione o Tipo" tabIndex="4" className="form-control custom-select" onChange={this.handleChangeTipo} value={this.state.obj.idTipo} >
                                                <option selected="" value="-1">Selecione...</option>
                                                {this.props.listaTipo.map((item, index) =>
                                                    <option key={item.id} value={item.id}>{item.nome}</option>
                                                )}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className={`form-group ${this.errorClass(this.state.formErrors.sistema)}`}>
                                            <label className="control-label">Sistema</label>
                                            <select data-placeholder="Selecione o Sistema" tabIndex="5" className="form-control custom-select" onChange={this.handleChangeSistema} value={this.state.obj.idSistema} >
                                                <option selected="" value="-1">Selecione...</option>
                                                {this.props.listaSistema.map((item, index) =>
                                                    <option key={item.id} value={item.id}>{item.nome}</option>
                                                )}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className={`form-group ${this.errorClass(this.state.formErrors.prioridade)}`}>
                                            <label className="control-label">Prioridade</label>
                                            <select data-placeholder="Selecione a Prioridade" tabIndex="6" className="form-control custom-select" onChange={this.handleChangePrioridade} value={this.state.obj.idPrioridade} >
                                                <option selected="" value="-1">Selecione...</option>
                                                {this.props.listaPrioridade.map((item, index) =>
                                                    <option key={item.id} value={item.id}>{item.nome}</option>
                                                )}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-12">
                                        <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
                                            <label>Email</label>
                                            <CreatableSelect
                                                isDisabled={this.state.obj.idCliente ? false : true}
                                                className='has-danger'
                                                value={this.state.value}
                                                onChange={this.onChangeValue}
                                                isMulti
                                                options={
                                                    this.props.listaEmailCliente.map(item => (
                                                        { value: item.email, label: item.email }
                                                    ))
                                                }
                                            />
                                            <small className={this.state.listEmails.length === 0 ? 'small-email-show' : 'small-email-hide'} >
                                                {this.state.obj.idCliente === '' ? '* Você deve selecionar um Cliente antes de informar um e-mail.' : '* Selecione pelo menos um e-mail.'} 
                                            </small>
                                            <small className={this.state.formErrors.email.length !== 0 ? 'small-email-show' : 'small-email-hide'} >* E-mail inválido!</small>
                                            {/* <input className="form-control" onChange={this.onChangeEmail.bind(this)} type="text" id="email" name="email" value={this.state.obj.email} /> */}
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-12">
                                        <div className={`form-group ${this.errorClass(this.state.formErrors.texto)}`}>
                                            <label>Texto do Cliente</label>
                                            <Editor
                                                wrapperClassName="form-group"
                                                editorClassName={`demo-editor ${this.errorClassEditor(this.state.formErrors.texto)}`}
                                                toolbarClassName="toolbar-class"
                                                onEditorStateChange={this.onEditorTextoStateChange}
                                                editorState={this.state.editorTextoState}
                                                toolbar={{
                                                    options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'history'],
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </form>

                        {this.renderErros()}

                    </ModalBody>
                    <ModalFooter>
                        <Button color="info" onClick={this.handleSubmit}>Salvar</Button>{' '}
                        <Button color="secondary" onClick={this.cancelarInclusaoChamado}>Cancelar</Button>
                    </ModalFooter>
                </Modal>

            </div>
        )
    }
}

const mapStateToProps = state => (
    {
        listaMeio: state.chamadoStore.listaMeio,
        listaPrioridade: state.chamadoStore.listaPrioridade,
        listaSistema: state.chamadoStore.listaSistema,
        listaTipo: state.chamadoStore.listaTipo,
        user: state.authStore.user,
        listaEmailCliente: state.clienteStore.email
    }
)

export default connect(mapStateToProps)(hotkeys(ChamadoInclusao))