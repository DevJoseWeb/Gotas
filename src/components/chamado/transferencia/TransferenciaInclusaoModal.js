import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert } from 'reactstrap'
import connect from "react-redux/es/connect/connect"
import TransferenciaPresenter from './TransferenciaPresenter'
import BuscaFuncionario from "../../funcionario/buscafuncionario/BuscaFuncionario"
import BuscaStatus from "../../status/buscastatus/BuscaStatus"

class TransferenciaInclusaoModal extends Component {

    constructor(props) {
        super(props)

        this.state = {
            obj: {
                chamados: this.props.chamadosTransf,
                idFuncionarioDestino: null,
                justificativa: '',
                idStatus: null
            },
            visibleAlert: false,
            erros: [],
            formErrors: { justificativa: '', status: '', funcionario: '' },
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.onDismissAlert = this.onDismissAlert.bind(this)
        this.cancelarTransferencia = this.cancelarTransferencia.bind(this)
        this.onCloseModal = this.onCloseModal.bind(this)
    }

    exibeErrosTransferencia(erros) {
        this.setState({
            visibleAlert: true,
            erros: erros
        })
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

    exibirMensagemSucesso() {
        this.props.toggle()
        this.props.sucesso()
        this.setState({
            visibleAlert: false,
            erros: []
        })
    }

    validateOnSubmit() {

        const {
            idFuncionarioDestino,
            justificativa,
            idStatus
        } = this.state.obj

        const errors = [];

        let fieldValidationErrors = this.state.formErrors

        Object.keys(fieldValidationErrors).map((fieldName) => {
            fieldValidationErrors[fieldName] = ''
            return null
        })

        if (idStatus === -1 || idStatus === '' || idStatus === null) {
            fieldValidationErrors.status = 'Status é obrigatório'
            errors.push(fieldValidationErrors.status);
        }

        if (justificativa.trim() === '' || justificativa === null) {
            fieldValidationErrors.justificativa = 'Justificativa é obrigatório'
            errors.push(fieldValidationErrors.justificativa)
        }

        if (idFuncionarioDestino === -1 || idFuncionarioDestino === '' || idFuncionarioDestino === null) {
            fieldValidationErrors.funcionario = 'Funcionário é obrigatório'
            errors.push(fieldValidationErrors.funcionario);
        }

        this.setState({ fieldValidationErrors });

        return errors.length > 0;
    }

    errorClass(error) {
        return (error.length === 0 ? '' : 'has-danger');
    }

    handleChangeFuncionario(value) {
        let fieldValidationErrors = this.state.formErrors
        fieldValidationErrors.funcionario = ''
        this.setState({ obj: { ...this.state.obj, idFuncionarioDestino: value }, formErrors: fieldValidationErrors });
    }

    handleChangeJustificativa(event) {
        let fieldValidationErrors = this.state.formErrors
        fieldValidationErrors.justificativa = ''
        this.setState({ obj: { ...this.state.obj, justificativa: event.target.value }, formErrors: fieldValidationErrors });
    }

    handleChangeStatus(value) {
        let fieldValidationErrors = this.state.formErrors
        fieldValidationErrors.status = ''
        this.setState({ obj: { ...this.state.obj, idStatus: value }, formErrors: fieldValidationErrors });
    }

    componentDidMount() {
        this.presenterTransferencia = new TransferenciaPresenter(this)
    }

    componentDidUpdate(previousProps, previousState) {
        if (previousProps.chamadosTransf !== this.props.chamadosTransf) {
            this.setState({
                obj: {...this.state.obj, chamados: this.props.chamadosTransf}
            })
        }
        console.log(this.state.obj)
    }

    handleSubmit() {
        const errors = this.validateOnSubmit();
        if (errors) {
            return;
        }

        let objeto = { ...this.state.obj }
        this.presenterTransferencia.criarTransferencia(JSON.stringify(objeto))
    }

    cancelarTransferencia() {
        this.props.toggle()
        this.setState({
            visibleAlert: false,
            erros: []
        })
    }

    onCloseModal() {
        this.setState({
            visibleAlert: false,
            erros: []
        })
    }

    render() {
        return (

            <Modal onClosed={this.onCloseModal} backdrop={'static'} isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className}>
                <ModalHeader><h4> Transferência
                    </h4>
                </ModalHeader>
                <ModalBody>

                    <div className="col-md-12 m-b-20" >
                        <BuscaFuncionario handleChange={this.handleChangeFuncionario.bind(this)} />
                    </div>

                    <div className="col-md-12 m-b-20">
                        <div className={`form-group ${this.errorClass(this.state.formErrors.justificativa)}`}>
                            <label>Justificativa</label>
                            <textarea onChange={this.handleChangeJustificativa.bind(this)} className="form-control" rows="5"></textarea>
                        </div>
                    </div>

                    <div className="col-md-12 m-b-20">
                        <BuscaStatus handleChange={this.handleChangeStatus.bind(this)} />
                    </div>

                    {this.renderErros()}

                </ModalBody>
                <ModalFooter>
                    <Button color="info" onClick={this.handleSubmit}>Transferir</Button>{' '}
                    <Button color="secondary" onClick={this.cancelarTransferencia}>Cancelar</Button>
                </ModalFooter>
            </Modal>

        );
    }
}

const mapStateToProps = state => (
    {
        user: state.authStore.user
    }
)

export default connect(mapStateToProps)(TransferenciaInclusaoModal)

