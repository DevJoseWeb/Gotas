import React, {Component} from 'react'
import TransferenciaPresenter from "./TransferenciaPresenter";
import {ACAO_TRANSFERENCIA_CHAMADO} from "../../../base";
import {montarObjetoTransferencia} from "./TransferenciaUtils";

class TransferenciaRecusar extends Component {

    constructor(){
        super()

        this.state = {
            justificativa: '',
            formErrors: {justificativa: '', },
        }

        this.cancelar = this.cancelar.bind(this)
    }

    componentDidMount() {
        this.presenter = new TransferenciaPresenter(this)
    }

    exibirMensagemSucesso() {
        this.props.exibirMensagemSucesso()
    }

    validateOnSubmit() {

        const {
            justificativa
        } = this.state

        const errors = [];

        let fieldValidationErrors = this.state.formErrors

        Object.keys(fieldValidationErrors).map((fieldName) => {
            fieldValidationErrors[fieldName] = ''
            return null
        })

        if (justificativa.length === 0) {
            fieldValidationErrors.justificativa = 'Justificativa é obrigatória'
            errors.push(fieldValidationErrors.assunto );
        }

        this.setState({ fieldValidationErrors });

        return errors.length > 0 ;
    }

    transferencia(acao) {
        let objeto = montarObjetoTransferencia(this.props.transferencias, this.state.justificativa, this.props.isModal)
        this.presenter.atualizarTransferencia(JSON.stringify(objeto))
    }

    cancelar(){
        this.props.cancelar()
    }

    recusarTransferencia() {

        const errors = this.validateOnSubmit();
        if (errors) {
            return;
        }

        this.transferencia(ACAO_TRANSFERENCIA_CHAMADO.Recusar)
    }

    errorClass(error) {
        return(error.length === 0 ? '' : 'has-danger');
    }

    handleChangeJustificativa(event) {
        let fieldValidationErrors = this.state.formErrors
        fieldValidationErrors.justificativa = ''
        this.setState({justificativa: event.target.value, formErrors: fieldValidationErrors})
    }

    render() {
        return (
            <div>
                <div className={this.props.classDiv}>
                    <div className={`form-group ${this.errorClass(this.state.formErrors.justificativa)}`}>
                        <label>Justificativa</label>
                        <textarea onChange={this.handleChangeJustificativa.bind(this)} className="form-control" rows="5"></textarea>
                    </div>
                </div>

                <div className={this.props.classFooter} >
                    <button className="btn btn-info" onClick={this.recusarTransferencia.bind(this)}>Confirmar</button>{' '}
                    <button className="btn btn-default" onClick={this.cancelar}>Cancelar</button>
                </div>
            </div>

        );
    }
}

export default TransferenciaRecusar