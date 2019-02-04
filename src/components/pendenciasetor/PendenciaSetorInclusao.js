import React, {Component} from 'react'

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import PendenciaFinanceira from "../cliente/PendenciaFinanceira"
import {hotkeys} from 'react-keyboard-shortcuts'
import {MODO_PESQUISA_CLIENTE} from "../../base"
import PendenciaSetorPresenter from "./PendenciaSetorPresenter"
import BuscaSetorPresenter from "../setor/buscasetor/BuscaSetorPresenter"
import {toastr} from "react-redux-toastr"
import BuscaClienteTypeahead from "../cliente/buscacliente/BuscaClienteTypeahead"

const inititalState = {
    assunto: '',
    clienteId: '',
    nome: '',
    observacao: '',
    preferenciaContato: '',
    setorId: '',
    telefone: '',

    listaSetor: [],
    modoPesquisaCliente: 'nome',
    textoModoPesquisaCliente: 'Consulta por nome',
    formErrors: {nome: '', assunto: '', observacao: '', setor: ''}
}

class PendenciaSetorInclusao extends Component {

    constructor(props) {
        super(props)

        this.state = inititalState

        this.handleSubmit = this.handleSubmit.bind(this)
        this.cancelar = this.cancelar.bind(this)
        this.onCloseModal = this.onCloseModal.bind(this)

        this.presenter = new PendenciaSetorPresenter(this);
        this.presenterSetor = new BuscaSetorPresenter(this)
    }

    componentDidMount() {
        this.presenterSetor.carregarSetorPorNome()
    }

    componentDidUpdate(previousProps, previousState) {
        if (previousProps.modal !== this.props.modal) {
            this.presenterSetor.carregarSetorPorNome()
        }
    }

    resetState() {
        this.setState(inititalState)
    }

    inclusaoComSucesso() {
        toastr.success('Sucesso', 'Pendência incluída com sucesso.')
        this.resetState()
        this.props.toggle()
        this.props.sucesso()
        this.props.atualizaPendencia()
    }

    exibeSetor(setor) {
        this.setState({ listaSetor: setor })
    }

    onChangeCliente(value) {
        this.setState({ clienteId: value } )
    }

    hot_keys = {
        'f2': {
            priority: 1,
            handler: (event) => this.keyHandler(),
        },
    }

    keyHandler(event){

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

    onChangeTextoNome(event) {
        let fieldValidationErrors = this.state.formErrors
        fieldValidationErrors.nome = ''
        this.setState({ nome: event.target.value, formErrors: fieldValidationErrors });
    }

    onChangeTextoTelefone(event) {
        this.setState({ telefone: event.target.value })
    }

    onChangeTextoAssunto(event) {
        let fieldValidationErrors = this.state.formErrors
        fieldValidationErrors.assunto = ''
        this.setState({ assunto: event.target.value, formErrors: fieldValidationErrors });
    }

    onChangeTextoPreferenciaContato(event) {
        this.setState({ preferenciaContato: event.target.value })
    }

    handleChangeObservacao(event) {
        let fieldValidationErrors = this.state.formErrors
        fieldValidationErrors.observacao = ''
        this.setState({  observacao: event.target.value, formErrors: fieldValidationErrors })
    }

    handleChangeSetor(event) {
        const idSetor = parseInt(event.target.value, 0)
        let fieldValidationErrors = this.state.formErrors
        fieldValidationErrors.setor = ''
        this.setState({ setorId: idSetor, formErrors: fieldValidationErrors })
    }

    errorClass(error) {
        return(error.length === 0 ? '' : 'has-danger')
    }

    handleSubmit(event) {
        event.preventDefault()

        const errors = this.validateOnSubmit()

        if (errors) {
            return;
        }

        let obj = {
            assunto: this.state.assunto,
            clienteId: this.state.clienteId,
            nome: this.state.nome,
            observacao: this.state.observacao,
            preferenciaContato: this.state.preferenciaContato,
            setorId: this.state.setorId,
            telefone: this.state.telefone
        }

        this.presenter.criarPendenciaSetor(obj)
    }

    cancelar() {
        this.resetState()
        this.props.toggle()
    }

    onCloseModal() {
        this.resetState()
    }

    validateOnSubmit() {

        const {
            assunto,
            nome,
            setorId,
        } = this.state

        const errors = []

        let fieldValidationErrors = this.state.formErrors

        Object.keys(fieldValidationErrors).map((fieldName) => {
            fieldValidationErrors[fieldName] = ''
            return null
        })

        if (assunto.length === 0) {
            fieldValidationErrors.assunto = 'Assunto é obrigatório'
            errors.push(fieldValidationErrors.assunto)
        }

        if (nome.length === 0) {
            fieldValidationErrors.nome = 'Nome é obrigatório'
            errors.push(fieldValidationErrors.nome)
        }

        if (setorId === -1 || setorId === '') {
            fieldValidationErrors.setor = 'Setor é obrigatório'
            errors.push(fieldValidationErrors.setor)
        }

        this.setState({fieldValidationErrors});

        return errors.length > 0
    }

    render() {
        return (
            <Modal size="lg" onClosed={this.onCloseModal} backdrop={'static'} isOpen={this.props.modal} toggle={this.props.toggle}>
                <ModalHeader><h4> Pendência de Setor
                </h4>
                </ModalHeader>
                <ModalBody>

                    <form className="form-horizontal" id="formInclusaoChamado" onSubmit={this.handleSubmit} >
                        <div className="form-body">

                            <div className="row">
                                <div className="col-md-12">
                                    <div className={`form-group ${this.errorClass(this.state.formErrors.nome)}`}>
                                        <label>Nome</label>
                                        <input type="text"
                                               className="form-control"
                                               id="nome"
                                               name="nome"
                                               value={this.state.nome}
                                               onChange={this.onChangeTextoNome.bind(this)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-12">
                                    <PendenciaFinanceira idCliente={this.state.clienteId}/>
                                    <div className="form-group">
                                        <label>Cliente <small className="form-control-feedback"> {`(${this.state.textoModoPesquisaCliente})`}</small> </label>
                                        <BuscaClienteTypeahead paramPesquisa={this.state.modoPesquisaCliente} handleChange={this.onChangeCliente.bind(this)}/>
                                        {/*<BuscaCliente paramPesquisa={this.state.modoPesquisaCliente} handleChange={this.onChangeCliente.bind(this)}/>*/}
                                        <small className="form-control-feedback"> F2 alterar modo de pesquisa </small>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Telefone</label>
                                        <input type="text"
                                               className="form-control"
                                               id="telefone"
                                               name="telefone"
                                               value={this.state.telefone}
                                               onChange={this.onChangeTextoTelefone.bind(this)}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className={`form-group ${this.errorClass(this.state.formErrors.assunto)}`}>
                                        <label>Assunto</label>
                                        <input type="text"
                                               className="form-control"
                                               id="assunto"
                                               name="assunto"
                                               value={this.state.assunto}
                                               onChange={this.onChangeTextoAssunto.bind(this)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <div className={`form-group ${this.errorClass(this.state.formErrors.setor)}`}>
                                        <label className="control-label">Setor</label>
                                        <select data-placeholder="Selecione o Setor" tabIndex="6" className="form-control custom-select" onChange={this.handleChangeSetor.bind(this)} value={this.state.setorId} >
                                            <option selected="" value="-1">Selecione...</option>
                                            {this.state.listaSetor.map((item, index) =>
                                                <option key={item.id} value={item.id}>{item.nome}</option>
                                            )}
                                        </select>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Pref. Contato</label>
                                        <input type="text"
                                               className="form-control"
                                               id="preferenciaContato"
                                               name="preferenciaContato"
                                               value={this.state.preferenciaContato}
                                               onChange={this.onChangeTextoPreferenciaContato.bind(this)}
                                        />
                                    </div>
                                </div>


                            </div>

                            <div className="row">
                                <div className="col-md-12 m-b-20">
                                    <div className={`form-group ${this.errorClass(this.state.formErrors.observacao)}`}>
                                        <label>Observação</label>
                                        <textarea onChange={this.handleChangeObservacao.bind(this)} className="form-control" rows="5"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>

                </ModalBody>
                <ModalFooter>
                    <Button color="info" onClick={this.handleSubmit}>Confirmar</Button>{' '}
                    <Button color="secondary" onClick={this.cancelar}>Cancelar</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default hotkeys(PendenciaSetorInclusao)