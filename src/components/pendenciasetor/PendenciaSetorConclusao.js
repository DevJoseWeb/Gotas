import React, {Component} from 'react'

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import PropTypes from "prop-types";
import PendenciaSetorPresenter from "./PendenciaSetorPresenter";
import {toastr} from "react-redux-toastr";

const inititalState = {
    textoConclusao: '',
    formErrors: {textoConclusao: '', },
}

class PendenciaSetorConclusao extends Component {

    constructor(props){
        super(props)

        this.state = inititalState

        this.handleSubmit = this.handleSubmit.bind(this)
        this.cancelar = this.cancelar.bind(this)
        this.onCloseModal = this.onCloseModal.bind(this)

        this.presenter = new PendenciaSetorPresenter(this)
    }

    concluidoComSucesso() {
        toastr.success('Sucesso', 'Pendência concluída com sucesso.')
        this.resetState()
        this.props.toggle()
        this.props.sucesso()
        this.props.atualizaPendencia();
    }

    cancelar(){
        this.props.toggle()
    }

    errorClass(error) {
        return(error.length === 0 ? '' : 'has-danger');
    }

    validateOnSubmit() {

        const {
            textoConclusao
        } = this.state

        const errors = [];

        let fieldValidationErrors = this.state.formErrors

        Object.keys(fieldValidationErrors).map((fieldName) => {
            fieldValidationErrors[fieldName] = ''
            return null
        })

        if (textoConclusao.length === 0) {
            fieldValidationErrors.textoConclusao = 'Justificativa é obrigatória'
            errors.push(fieldValidationErrors.textoConclusao );
        }

        this.setState({ fieldValidationErrors });

        return errors.length > 0 ;
    }

    onCloseModal() {
        this.resetState()
    }

    resetState() {
        this.setState(inititalState)
    }

    handleSubmit(event) {
        event.preventDefault()

        const errors = this.validateOnSubmit()

        if (errors) {
            return;
        }

        let obj = {
            textoConclusao: this.state.textoConclusao
        }

        this.presenter.finalizarPendenciaSetor(this.props.pendenciaSetor.id, obj)

    }

    handleChangeTextoConclusao(event) {
        let fieldValidationErrors = this.state.formErrors
        fieldValidationErrors.textoConclusao = ''
        this.setState({textoConclusao: event.target.value, formErrors: fieldValidationErrors})
    }

    render() {
        return (
            <Modal onClosed={this.onCloseModal} backdrop={'static'} isOpen={this.props.modal} toggle={this.props.toggle}>
                <ModalHeader><h4> Pendência de Setor - Conclusão
                </h4>
                </ModalHeader>
                <ModalBody>

                    <form className="form-horizontal" id="formConclusaoPendenciaSetor" onSubmit={this.handleSubmit} >
                        <div className="form-body">
                            <div className={`form-group ${this.errorClass(this.state.formErrors.textoConclusao)}`}>
                                <label>Justificativa</label>
                                <textarea onChange={this.handleChangeTextoConclusao.bind(this)} className="form-control" rows="5"></textarea>
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

PendenciaSetorConclusao.propTypes = {
    pendenciaSetor: PropTypes.object.isRequired,
};

export default PendenciaSetorConclusao;