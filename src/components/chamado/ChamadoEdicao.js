import React, { Component } from 'react';
import Select from 'react-select';
import CreatableSelect from 'react-select/lib/Creatable'
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ReactTooltip from 'react-tooltip';
import { toastr } from "react-redux-toastr";

import ChamadoPresenter from './ChamadoPresenter';
import {filtrarChamado} from "./ChamadoAction";
import { filtrarEmailCliente } from "../cliente/ClienteAction";
import ClientePresenter from '../cliente/ClientePresenter';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../../commom/template/custom.css';

const INITIAL_STATE = {
    obj: {
        id: '',
        assunto: '',
        email: [],
        idMeio: '',
        meio: '',
        idTipo: '',
        tipo: '',
        idPrioridade: '',
        prioridade: '',
        idStatus: '',
        status: '',
        idSistema: '',
        sistema: '',
        idVersaoSistema: '',
        versaoSistema: '',
    },
    formErrors: { email: '', assunto: '', meiochamado: '', tipo: '', prioridade: '', sistema: '', versaoSistema: '', status: '' },
    value: '',
    listEmails: [],
    optionsMeio: [],
    optionsTipo: [],
    optionsPrioridade: [],
    optionsVersaoSistema: [],
    optionsStatus: [],
    optionsSistema: [],
};

class ChamadoEdicao extends Component {

    constructor() {
        super();

        this.state = INITIAL_STATE;

        this.presenter = new ChamadoPresenter(this);
        this.presenterCliente = new ClientePresenter(this);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.cancelarEdicao = this.cancelarEdicao.bind(this);
        this.handleChangeMeio = this.handleChangeMeio.bind(this);
        this.handleChangeTipo = this.handleChangeTipo.bind(this);
        this.handleChangePrioridade = this.handleChangePrioridade.bind(this);
        this.handleChangeStatus = this.handleChangeStatus.bind(this);
        this.handleChangeSistema = this.handleChangeSistema.bind(this);
        this.handleChangeVersaoSistema = this.handleChangeVersaoSistema.bind(this);
    }

    componentDidMount() {
        this.presenter.carregarChamadoPorId(this.props.idChamado);
        this.presenterCliente.carregarEmailPorIdCliente(this.props.idCliente);
    }

    exibeEmail(email) {
        this.props.dispatch(filtrarEmailCliente(email));
    }

    exibirChamado(chamado) {
        chamado.map((item) => {

            let valueEmails = []
            let listEmails = []
            let emails = item.email.split(" ");
            emails.map((item, index) => {
                valueEmails.push(index === 0 && item.charAt(item.length-1) === ';' ? { value: item.substr(0, item.length-1), label: item.substr(0, item.length-1) } :  item.charAt(item.length-1) === ';' ? { value: item.substr(0, item.length-1) , label: item.substr(0, item.length-1)  } :  { value: item, label: item } )
                listEmails.push(index === 0 && item.charAt(item.length-1) === ';' ? item.substr(0, item.length-1) : item.charAt(item.length-1) === ';' ? item.substr(0, item.length-1) : item )
            })

            this.setState({
                obj: {
                    ...this.state.obj,
                    id: item.id,
                    assunto: item.assunto,
                    email: listEmails,
                    idMeio: item.meio.id,
                    meio: item.meio.nome,
                    idTipo: item.tipo.id,
                    tipo: item.tipo.nome,
                    idPrioridade: item.prioridade.id,
                    prioridade: item.prioridade.nome,
                    idStatus: item.status ? item.status.id : '-1',
                    status: item.status ? item.status.nome : '',
                    idSistema: item.sistema.id,
                    sistema: item.sistema.nome,
                    idVersaoSistema: item.versaoSistema ? item.versaoSistema.id : '-1',
                    versaoSistema: item.versaoSistema ? item.versaoSistema.nome : '-1',
                },
                listEmails: valueEmails,
                value: valueEmails,
                optionsMeio: [],
                optionsTipo: [],
                optionsPrioridade: [],
                optionsVersaoSistema: [],
                optionsStatus: [],
                optionsSistema: [],
            });
        });
        this.iniciandoOptions();
        this.props.dispatch(filtrarChamado(chamado))
    }

    handleSubmit() {
        const errors = this.validateOnSubmit();
        if (errors) {
            return;
        }

        let arr = []
        let objeto = {}
        let obj = {    
            id: this.state.obj.id,
            email: this.state.obj.email,
            idMeio: this.state.obj.idMeio,
            idPrioridade: this.state.obj.idPrioridade,
            idSistema: this.state.obj.idSistema,
            idStatus: this.state.obj.idStatus,
            idTipo: this.state.obj.idTipo,
            idVersaoSistema: this.state.obj.idVersaoSistema
        };

        arr.push(obj)
        objeto["chamados"] = arr

        this.presenter.alterarChamado(JSON.stringify(objeto));
    };

    exibirMensagemSucesso() {
        this.props.toggle();
        this.chamadoAlterado();
    };

    cancelarEdicao() {
        this.presenter.carregarChamadoPorId(this.props.idChamado);
        this.props.toggle();
    };

    chamadoAlterado() {
        toastr.success('Sucesso', 'Chamado alterado com sucesso.')
        this.presenter.carregarChamadoPorId(this.props.idChamado)
        this.props.atualizarChamado();
    }

    validateOnSubmit() {
        const {
            idMeio,
            idTipo,
            idPrioridade,
            idSistema,
            idStatus
        } = this.state.obj;

        const errors = [];

        const fieldValidationErrors = this.state.formErrors;

        Object.keys(fieldValidationErrors).map((fieldName) => {
            fieldValidationErrors[fieldName] = '';
            return null;
        });

        if (idMeio === -1 || idMeio === '') {
            fieldValidationErrors.meiochamado = 'Meio Chamado é obrigatório';
            errors.push(fieldValidationErrors.meiochamado);
        }

        if (idTipo === -1 || idTipo === '') {
            fieldValidationErrors.tipo = 'Tipo Chamado é obrigatório';
            errors.push(fieldValidationErrors.tipo);
        }

        if (idPrioridade === -1 || idPrioridade === '') {
            fieldValidationErrors.prioridade = 'Prioridade Chamado é obrigatório';
            errors.push(fieldValidationErrors.prioridade);
        }

        if (idStatus === -1 || idStatus === '') {
            fieldValidationErrors.status = 'Status do Chamado é obrigatório';
            errors.push(fieldValidationErrors.status);
        }

        if (idSistema === -1 || idSistema === '') {
            fieldValidationErrors.sistema = 'Sistema do Chamado é obrigatório';
            errors.push(fieldValidationErrors.sistema);
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

        this.setState({ fieldValidationErrors });

        return errors.length > 0;

    }

    handleChangeMeio(event) {
        const idMeio = parseInt(event.value, 0);
        const fieldValidationErrors = this.state.formErrors;
        fieldValidationErrors.meiochamado = '';
        this.setState({ obj: { ...this.state.obj, idMeio }, formErrors: fieldValidationErrors });
    }

    handleChangeTipo(event) {
        const idTipo = parseInt(event.value, 0);
        const fieldValidationErrors = this.state.formErrors;
        fieldValidationErrors.tipo = '';
        this.setState({ obj: { ...this.state.obj, idTipo }, formErrors: fieldValidationErrors });
    }

    handleChangePrioridade(event) {
        const idPrioridade = parseInt(event.value, 0)
        let fieldValidationErrors = this.state.formErrors
        fieldValidationErrors.prioridade = ''
        this.setState({ obj: { ...this.state.obj, idPrioridade: idPrioridade }, formErrors: fieldValidationErrors })
    }

    handleChangeStatus(event) {
        const idStatus = parseInt(event.value, 0)
        let fieldValidationErrors = this.state.formErrors
        fieldValidationErrors.status = ''
        this.setState({ obj: { ...this.state.obj, idStatus: idStatus }, formErrors: fieldValidationErrors })
    }

    handleChangeSistema(event) {
        const idSistema = parseInt(event.value, 0)
        let fieldValidationErrors = this.state.formErrors
        fieldValidationErrors.sistema = ''
        this.setState({ obj: { ...this.state.obj, idSistema: idSistema }, formErrors: fieldValidationErrors })
    }

    handleChangeVersaoSistema(event) {
        const idVersaoSistema = parseInt(event.value, 0)
        let fieldValidationErrors = this.state.formErrors
        fieldValidationErrors.versaoSistema = ''
        this.setState({ obj: { ...this.state.obj, idVersaoSistema: idVersaoSistema }, formErrors: fieldValidationErrors })
    }

    onChangeEmail(event) {
        const fieldValidationErrors = this.state.formErrors;
        fieldValidationErrors.email = '';
        this.setState({
            obj: { ...this.state.obj, email: event.target.value }, formErrors: fieldValidationErrors,
        });
    }

    errorClass(error) {
        return (error.length === 0 ? '' : 'has-danger');
    }

    iniciandoOptions() {
        if (this.state.obj.meio !== '') {
            this.state.optionsMeio.push({ value: this.state.obj.idMeio, label: this.state.obj.meio });
            this.options(this.state.optionsMeio, this.state.obj.meio, this.props.listaMeio);
        } else {
            this.copyArray(this.state.optionsMeio, this.props.listaMeio);
        }

        if (this.state.obj.tipo !== '') {
            this.state.optionsTipo.push({ value: this.state.obj.idTipo, label: this.state.obj.tipo });
            this.options(this.state.optionsTipo, this.state.obj.tipo, this.props.listaTipo);
        } else {
            this.copyArray(this.state.optionsTipo, this.props.listaTipo);
        }

        if (this.state.obj.prioridade !== '') {
            this.state.optionsPrioridade.push({ value: this.state.obj.idPrioridade, label: this.state.obj.prioridade });
            this.options(this.state.optionsPrioridade,  this.state.obj.prioridade, this.props.listaPrioridade);
        } else {
            this.copyArray(this.state.optionsPrioridade, this.props.listaPrioridade);
        }

        if (this.state.obj.status !== '') {
            this.state.optionsStatus.push({ value: this.state.obj.idStatus, label: this.state.obj.status });
            this.options(this.state.optionsStatus, this.state.obj.status, this.props.listaStatus);
        } else {
            this.copyArray(this.state.optionsStatus, this.props.listaStatus);
        }

        if (this.state.obj.sistema !== '') {
            this.state.optionsSistema.push({ value: this.state.obj.idSistema, label: this.state.obj.sistema });
            this.options(this.state.optionsSistema, this.state.obj.sistema, this.props.listaSistema);
        } else {
            this.copyArray(this.state.optionsSistema, this.props.listaSistema);
        }

        if (this.state.obj.versaoSistema !== '') {
            this.state.optionsVersaoSistema.push({ value: this.state.obj.idVersaoSistema, label: this.state.obj.versaoSistema });
            this.options(this.state.optionsVersaoSistema, this.state.obj.versaoSistema, this.props.listaVersaoSistema);
        } else {
            this.copyArray(this.state.optionsVersaoSistema, this.props.listaVersaoSistema);
        }
    }

    options(options, propriedade, lista) {
        const arrayOptions = lista.filter((opt) => opt.nome !== propriedade);

        arrayOptions.map(item => (
            options.push({ value: item.id, label: item.nome })
        ));
    }

    copyArray(options, list) {
        options.push({ value: -1, label: 'Selecione ...' });
        list.map(item => (
            options.push({ value: item.id, label: item.nome })
        ));
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

    renderData() {
        return (
            <div>
                <form className="form-horizontal" id="formAlteracaoChamado" onSubmit={this.handleSubmit} >
                    <div className="form-body">
                        <div className="row">
                            <div className="col-md-6">
                                <div className={`form-group ${this.errorClass(this.state.formErrors.meiochamado)}`}>
                                    <label className="control-label">Meio</label>
                                    <Select options={this.state.optionsMeio} defaultValue={this.state.optionsMeio[0]} onChange={this.handleChangeMeio} />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className={`form-group ${this.errorClass(this.state.formErrors.tipo)}`}>
                                    <label className="control-label">Tipo</label>
                                    <Select options={this.state.optionsTipo} defaultValue={this.state.optionsTipo[0]} onChange={this.handleChangeTipo} />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <div className={'form-group'}>
                                    <label className="control-label">Prioridade</label>
                                    <Select options={this.state.optionsPrioridade} defaultValue={this.state.optionsPrioridade[0]} onChange={this.handleChangePrioridade} />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className={'form-group'}>
                                    <label className="control-label">Status</label>
                                    <Select options={this.state.optionsStatus} defaultValue={this.state.optionsStatus[0]} onChange={this.handleChangeStatus} />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <div className={'form-group'}>
                                    <label className="control-label">Sistema</label>
                                    <Select options={this.state.optionsSistema} defaultValue={this.state.optionsSistema[0]} onChange={this.handleChangeSistema} />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className={'form-group'}>
                                    <label className="control-label">Versão Sistema</label>
                                    <Select options={this.state.optionsVersaoSistema} defaultValue={this.state.optionsVersaoSistema[0]} onChange={this.handleChangeVersaoSistema} />
                                </div>
                            </div>
                        </div>

                        <div className="row p-t-5">
                            <div className="col-md-12">
                                <div className={`form-group`} >
                                    <label>E-mail</label>
                                    <CreatableSelect
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
                                    <small className={this.state.listEmails.length === 0 ? 'small-email-show' : 'small-email-hide'} >* Selecione pelo menos um e-mail.</small>
                                    <small className={this.state.formErrors.email.length !== 0 ? 'small-email-show' : 'small-email-hide'} >* E-mail inválido!</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }

    render() {
        return (
            <Modal size="lg" onClosed={this.onCloseModal} backdrop={'static'} isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className}>
                <ModalHeader>
                    Alteração de Chamado <br/> 
                    <small> {this.props.idChamado} - {this.state.obj.assunto} </small>   
                    <ReactTooltip />
                </ModalHeader>
                <ModalBody>
                    {this.renderData()}
                </ModalBody>
                <ModalFooter>
                    <Button color="info" onClick={this.handleSubmit}>Confirmar</Button>{' '}
                    <Button color="secondary" onClick={this.cancelarEdicao}>Cancelar</Button>
                </ModalFooter>
            </Modal>
        );
    }


}

const mapStateToProps = state => (
    {
        listaMeio: state.chamadoStore.listaMeio,
        listaPrioridade: state.chamadoStore.listaPrioridade,
        listaSistema: state.chamadoStore.listaSistema,
        listaVersaoSistema: state.chamadoStore.listaVersao,
        listaTipo: state.chamadoStore.listaTipo,
        listaStatus: state.chamadoStore.listaStatus,
        listaEmailCliente: state.clienteStore.email,
    }
);

export default connect(mapStateToProps)(ChamadoEdicao);
