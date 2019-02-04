import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert } from 'reactstrap';
import {CopyToClipboard} from 'react-copy-to-clipboard';

import LiberacaoSistemaPresenter from './LiberacaoSistemaPresenter';
import ChamadoPresenter from "../../chamado/ChamadoPresenter";

import '../../../commom/template/modal.css';
import { MSG_SYS_Forbidden, MSG_SYS_Unauthorized } from "../../../mensagens";

import moment from "moment";
import BuscaSistemaPresenter from '../../sistema/buscasistema/BuscaSistemaPresenter';

class LiberacaoSistema extends Component {

    constructor(props) {
        super(props);

        this.state = {
            listaLiberacao: [],
            listaSistema: [],
            obj: {
                idSistema: '',
                idFilial: '',
                dtInicio: '',
                dtLimite: '',
                codigoLiberacao: '',
                observacao: '',
                modulos: [],
            },
            finalizarLiberacao: false,
            formErrors: { filial: '', sistema: '', mensagem: '', erroLiberacao: '' },
            visibleAlertUnauthorized: false,
            visibleAlertForbidden: false,
            habCopiado: false,
            nomeSistema: '',
        };

        this.presenter = new LiberacaoSistemaPresenter(this);
        this.presenterChamado = new ChamadoPresenter(this);
        this.presenterSistema = new BuscaSistemaPresenter(this);

        this.cancelarLiberacao = this.cancelarLiberacao.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.onDismissAlertUnauthorized = this.onDismissAlertUnauthorized.bind(this)
        this.onDismissAlertForbidden = this.onDismissAlertForbidden.bind(this)
    }

    componentDidMount() {
        this.presenterChamado.carregarSistemaDoChamado();
    }

    exibirSistema(sistema) {
        this.setState({ listaSistema: sistema });
    }

    exibeSistema(sistema) {
        this.setState({
            nomeSistema: sistema.nome
        })
    }

    onDismissAlertUnauthorized() {
        this.setState({ visibleAlertUnauthorized: false })
    }

    onDismissAlertForbidden() {
        this.setState({ visibleAlertForbidden: false })
    }

    validation() {

        const {
            idFilial,
            idSistema
        } = this.state.obj

        const errors = [];

        let fieldValidationErrors = this.state.formErrors

        Object.keys(fieldValidationErrors).map((fieldName) => {
            fieldValidationErrors[fieldName] = ''
            return null
        })

        if (idSistema === '' || idSistema === -1) {
            fieldValidationErrors.sistema = '* Informe o Sistema'
            errors.push(fieldValidationErrors.sistema)
        }

        if (idFilial === '') {
            fieldValidationErrors.filial = '* Informe a Filial'
            errors.push(fieldValidationErrors.filial)
        }

        this.setState({ fieldValidationErrors });

        return errors.length > 0;

    }

    handleChangeSistema(event) {
        const idSistema = parseInt(event.target.value, 0);
        this.setState({ obj: { ...this.state.obj, idSistema: idSistema } });
    }

    handleChangeFilial(event) {
        this.setState({ obj: { ...this.state.obj, idFilial: event.target.value } });
    }

    handleSubmit(event) {
        if (!this.state.finalizarLiberacao) {

            event.preventDefault();

            this.presenter.liberacaoSistema(this.props.cliente.id, this.state.obj.idFilial, this.state.obj.idSistema);

            const errors = this.validation();
            if (errors) {
                return;
            }        

            this.presenterSistema.carregarSistemaPorId(this.state.obj.idSistema);
        } else {
            this.props.liberacaoConcluida();

            this.setState({
                finalizarLiberacao: false,
            });
        }
    }

    cancelarLiberacao() {
        this.props.toggle();
        this.setState({
            finalizarLiberacao: false,
        });
    }

    errorClass(error) {
        return (error.length === 0 ? '' : 'has-danger');
    }

    showMessageError(val1, val2, val3) {
        return (val1.length === 0 && val2.length === 0 && val3.length === 0 ? 'display-none' : 'display-block');
    }

    formataChave(chave) {
        var i;
        var nChave = '';
        for (i = 0; i < chave.length; i++) { 
            if (i % 4 !== 0) {
                nChave = nChave + chave[i];
            } else {
                nChave = nChave + '-' + chave[i];
            }
        }

        return nChave.substr(1, nChave.length);
    }

    corModulos() {
        let number = Math.floor(Math.random() * 4 + 1);
        return this.newMethod(number);
    }

    exibirLiberacaoSistema(liberacao) {

        this.setState({
            listaLiberacao: liberacao,
        });

        let fieldValidationErrors = this.state.formErrors

        Object.keys(fieldValidationErrors).map((fieldName) => {
            fieldValidationErrors[fieldName] = ''
            return null
        })

        if (this.state.listaLiberacao.mensagens) {
            this.state.listaLiberacao.mensagens.map((item) => {
                fieldValidationErrors.erroLiberacao = fieldValidationErrors.erroLiberacao + '* '+item+'\n'
            })     
        } else {
            fieldValidationErrors.erroLiberacao = '';
            this.setState({
                finalizarLiberacao: true,
                fieldValidationErrors
            });       
        }
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

    habCopiado() {
        this.setState({
            habCopiado: true,
        })
        setTimeout(function () {
            this.setState({
                habCopiado: false,
            })
        }.bind(this), 1000);
    }

    renderMensagemUnauthorized() {
        if (this.state.visibleAlertUnauthorized) {
            return (
                <div className='col-md-12 m-t-20'>
                    <Alert color="danger" isOpen={this.state.visibleAlertUnauthorized} toggle={this.onDismissAlertUnauthorized} fade={true}>
                        {MSG_SYS_Unauthorized}
                    </Alert>
                </div>
            )
        } else {
            return null;
        }
    }

    renderMensagemForbidden() {
        if (this.state.visibleAlertForbidden) {
            return (
                <div className='col-md-12 m-b-20'>
                    <Alert color="danger" isOpen={this.state.visibleAlertForbidden} toggle={this.onDismissAlertForbidden} fade={true}>
                        {MSG_SYS_Forbidden}
                    </Alert>
                </div>
            )
        } else {
            return null;
        }
    }

    renderModulos() {
        if (this.state.listaLiberacao.modulos) {
            return (
                this.state.listaLiberacao.modulos.length > 0 ?                                                    
                    this.state.listaLiberacao.modulos.map((item) => (                                                        
                        <td><span key={item.md5} class='label label-danger' >{item.descricao}</span> </td>
                    ))
                :
                    ''    
            )
        } else {
            return null;
        }        
    }

    renderPrincipal() {
        return (
            <div>
                <h4 className='background-btt'>Cliente</h4>
                <hr />
                <div className="row">
                    <div className="col-md-12">
                        <div className='form-group spacing-control-40'>
                            <label className="control-label label-libsis-color">Razão Social</label><br />
                            <label className="control-label">{this.props.cliente.razaoSocial}</label>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className='form-group spacing-control-40'>
                            <label className="control-label label-libsis-color">Fantasia</label><br />
                            <label className="control-label">{this.props.cliente.nomeFantasia}</label>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-5">
                        <div className='form-group '>
                            <label className="control-label label-libsis-color">CNPJ</label><br />
                            <label className="control-label">{this.props.cliente.cnpj || 'Não Informado'}</label>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className='form-group'>
                            <label className="control-label label-libsis-color">Insc. Estadual</label><br />
                            <label className="control-label">{this.props.cliente.rg || 'Não Informado'}</label>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className='form-group'>
                            <label className="control-label label-libsis-color">Código</label><br />
                            <label className="control-label">{this.props.cliente.id}</label>
                        </div>
                    </div>
                </div>

                <h4 className='background-btt'>Sistema</h4>
                <hr />
                <div className="row">
                    <div className={`col-md-10 ${this.errorClass(this.state.formErrors.sistema)}`}>
                        <div className={'form-group'}>
                            <label className="control-label label-libsis-color">Sistema</label>
                            <select data-placeholder="Selecione o Sistema" tabIndex="5" className="form-control custom-select" onChange={this.handleChangeSistema.bind(this)} value={this.state.obj.idSistema} >
                                <option selected="" value="-1">Selecione...</option>
                                {this.props.sistemas.map((item) =>
                                    <option key={item.id} value={item.id}>{item.descricao}</option>
                                )}
                            </select>
                        </div>
                    </div>

                    <div className={`col-md-2 ${this.errorClass(this.state.formErrors.filial)}`}>
                        <div className={'form-group'}>
                            <label className="control-label label-libsis-color">Filial</label>
                            <input className="form-control" onChange={this.handleChangeFilial.bind(this)} type="text" id="filial" name="filial" value={this.state.obj.idFilial} />
                        </div>
                    </div>
                </div>

                <div class={`alert alert-danger alert-rounded ${this.showMessageError(this.state.formErrors.filial, this.state.formErrors.sistema, this.state.formErrors.erroLiberacao)} `} >
                    {this.state.formErrors.sistema} {this.state.formErrors.sistema ? <br /> : ''}
                    {this.state.formErrors.filial} {this.state.formErrors.filial ? <br /> : ''}
                    {this.state.formErrors.erroLiberacao}
                </div>

                {/* {this.renderMensagemUnauthorized()}
                {this.renderMensagemForbidden()} */}

            </div>
        )
    };

    renderFinalizarLiberacao() {
        return (
            <div>
                <h4 className='background-btt'>Cliente</h4>
                <hr />
                <div className="row">
                    <div className="col-md-7">
                        <div className='form-group spacing-control-40'>
                            <label className="control-label">{this.props.cliente.nomeFantasia}</label>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className='form-group spacing-control-40'>
                            <label className="control-label">{this.props.cliente.cnpj || 'Não Informado'}</label>
                        </div>
                    </div>

                    <div className="col-md-2">
                        <div className='form-group spacing-control-40'>
                            <label className="control-label">{this.props.cliente.rg || 'Não Informado'}</label>
                        </div>
                    </div>
                </div>


                <h4 className='background-btt'>Sistema</h4>
                <hr />
                <div className="row">
                    <div className="col-md-10">
                        <div className={'form-group'}>
                            <label className="control-label">{this.state.nomeSistema}</label>
                        </div>
                    </div>

                    <div className="col-md-2">
                        <div className={'form-group'}>
                            <label className="control-label">{this.state.obj.idFilial}</label>
                        </div>
                    </div>
                </div>

                <h4 className='background-btt'>Liberação</h4>
                <hr />
                <div className="row">
                    <div className="col-md-2">
                        <div className={'form-group form-material'}>
                            <label style={{ fontWeight: "bold" }} className="control-label">Inicio</label> <br />
                            <input type="text" class="form-control form-control-line" value={moment(this.state.listaLiberacao.dataInicio).format('DD/MM/Y')} />
                        </div>
                    </div>

                    <div className="col-md-2">
                        <div className={'form-group form-material'}>
                            <label style={{ fontWeight: "bold" }} className="control-label">Limite</label> <br />
                            <input type="text" class="form-control form-control-line" value={moment(this.state.listaLiberacao.dataFim).format('DD/MM/Y')} />
                        </div>
                    </div>

                    <div className="col-md-8">
                        <div class="form-group">
                            <label style={{ fontWeight: "bold" }} className="control-label">Liberação</label>
                            <small style={{ color: "green" }} className={this.state.habCopiado === true ? 'n-copado control-label float-right' : 'copiado control-label float-right'}>Copiado com Sucesso! <i className="fas fa-check"/></small> <br />
                            <div className="input-group-append">
                                <input type="text" class="form-control chave-liberacao" value={this.formataChave(this.state.listaLiberacao.chave)}/>
                                <CopyToClipboard text={this.state.listaLiberacao.chave}>
                                    <button className="btn btn-danger" onClick={() => this.habCopiado()} type="button">Copiar!</button>
                                </CopyToClipboard>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">

                    <div className="col-md-6">
                        <div className={'form-group form-material'}>
                            <label style={{ fontWeight: "bold" }} className="control-label">Observação</label> <br />
                            <textarea class="form-control" rows="5" readOnly>{this.state.listaLiberacao.observacao}</textarea>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className={'form-group form-material'}>
                            <div class="table-responsive">
                                <table class="table table-libsis" cellPadding="0" cellSpacing="100" >
                                    <thead>
                                        <tr>
                                            <th style={{ fontWeight: "bold" }} >Módulo(s)</th>
                                        </tr>
                                    </thead>
                                    <tbody>      
                                        <tr>
                                            { this.renderModulos() }
                                        </tr>                         
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        )
    }

    render() {
        return (
            <Modal onClosed={this.onCloseModal} backdrop={'static'} isOpen={this.props.modal} toggle={this.props.toggle} className={'myModal'} >
                <ModalHeader>
                    Liberação de Sistema
                </ModalHeader>
                <ModalBody>
                    {!this.state.finalizarLiberacao ? this.renderPrincipal() : this.renderFinalizarLiberacao()}
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={this.cancelarLiberacao}>Cancelar</Button>{' '}
                    <Button color="info" onClick={this.handleSubmit}>{!this.state.finalizarLiberacao ? 'Avançar' : 'Concluir'}</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default (LiberacaoSistema)