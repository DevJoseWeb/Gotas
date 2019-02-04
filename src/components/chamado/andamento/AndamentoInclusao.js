import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert } from 'reactstrap'
import AndammentoPresenter from './AndamentoPresenter'
import {exibirCategoriaTemplateAndamento, exibirOperacaoAndamento, exibirTemplateAndamento} from './AndamentoAction'
import {OPERACAO_ATENDIMENTO} from "../../../base"

import Checkbox from "@material-ui/core/Checkbox";
import Popover, {PopoverAnimationVertical} from '@material-ui/core/Popover';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from "@material-ui/core/styles";
import AlarmIcon from '@material-ui/icons/Reorder';
import Tooltip from '@material-ui/core/Tooltip';

import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import '../../../commom/template/custom.css'

export const popoverStyles = {
    boxElementPad: {
        padding: "16px 24px 16px 24px",
        height:'auto',

    },

    formGroup: {
        marginTop: "8px",
    },
    formControl: {},
    checkbox: {
        width: "12px",
        height: "12px",
    },
    // checkboxColor: {
    //     "&$checked": {
    //         color: "#027cb5",
    //     },
    // },
    checked: {},
    label: {
        fontSize: "15px",
        marginLeft: "5px",
        color: "black",
        fontFamily: "seriff"
    },

};

const INITIAL_STATE = {
    obj: {
        idOperacao: 0,
        texto: '',
        enviaEmail: false,
        previsao: null
    },
    exibirPrevisao: false,
    editorTextoState: EditorState.createEmpty(),
    formErrors: {texto: '', operacao: '', previsao: ''},
    visibleAlert: false,
    erros: []
}

class AndamentoInclusao extends Component {

    constructor() {
        super()

        this.state = INITIAL_STATE

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChangeOperacao = this.handleChangeOperacao.bind(this)
        this.handleChangeCategoria = this.handleChangeCategoria.bind(this)
        this.handleChangeTemplate = this.handleChangeTemplate.bind(this)
        this.cancelarAndamento = this.cancelarAndamento.bind(this)
        this.onDismissAlert = this.onDismissAlert.bind(this)
    }

    componentDidMount() {
        this.presenter = new AndammentoPresenter(this)

        this.presenter.carregarOperacaoDoAndamento()
        this.presenter.carregarCategoriaTemplateAndamento()
    }

    exibirCategoriaTemplate(categoria) {this.props.dispatch(exibirCategoriaTemplateAndamento(categoria))}

    exibirTemplate(template) {this.props.dispatch(exibirTemplateAndamento(template))}

    exibirOperacao(operacao) {this.props.dispatch(exibirOperacaoAndamento(operacao))}

    handleSubmit() {

        const errors = this.validateOnSubmit();
        if (errors) {
            return;
        }

        let objeto = {...this.state.obj};
        this.presenter.gravarAndamentoDoChamado(this.props.idChamado, JSON.stringify(objeto))
    }

    validateOnSubmit() {

        const {
            idOperacao,
            previsao,
            texto
        } = this.state.obj

        const errors = [];

        console.log(previsao)

        let fieldValidationErrors = this.state.formErrors

        Object.keys(fieldValidationErrors).map((fieldName) => {
            fieldValidationErrors[fieldName] = ''
            return null
        })

        if (idOperacao === -1 || idOperacao === '') {
            fieldValidationErrors.operacao = 'Operação é obrigatória'
            errors.push(fieldValidationErrors.operacao);
        }

        if (texto.trim() === '' || texto.trim() === '<p></p>') {
            fieldValidationErrors.texto = 'Texto do cliente é obrigatório'
            errors.push(fieldValidationErrors.texto)
        }

        if (idOperacao === OPERACAO_ATENDIMENTO.PREVISAO && (previsao === null || previsao === '')) {
            fieldValidationErrors.previsao = 'Previsão é obrigatória'
            errors.push(fieldValidationErrors.previsao)
        }

        this.setState({ fieldValidationErrors });

        return errors.length > 0 ;
    }

    exibirMensagemSucesso() {
        this.props.toggle()
        this.props.sucesso()
        this.setState({
            INITIAL_STATE
        })
    }

    exibeErrosAndamento(erros) {
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
                    {this.state.erros.map(item => <p>{item.mensagem}</p> )}
                </Alert>
            </div>
        )
    }

    cancelarAndamento() {
        this.props.toggle()
        this.setState({
            INITIAL_STATE,
        })
    }

    onEditorTextoStateChange = (editorTextoState) => {
        let fieldValidationErrors = this.state.formErrors
        fieldValidationErrors.texto = ''
        this.setState({
            editorTextoState,
            obj: {...this.state.obj, texto: draftToHtml(convertToRaw(editorTextoState.getCurrentContent()))},
            formErrors: fieldValidationErrors
        });
    };

    onChangeDataPrevisao(event) {
        let fieldValidationErrors = this.state.formErrors
        fieldValidationErrors.previsao = ''
        this.setState({ obj: {...this.state.obj, previsao: event.target.value }, formErrors: fieldValidationErrors  });
    }

    handleChangeOperacao(event) {
        const idOperacao = parseInt(event.target.value, 0)
        //const operacaoNova = this.props.listaOperacao.find(operacao => operacao.id === idOperacao)
        let fieldValidationErrors = this.state.formErrors
        fieldValidationErrors.operacao = ''
        if (idOperacao === OPERACAO_ATENDIMENTO.PREVISAO) {
            this.setState( { obj: {...this.state.obj, idOperacao: idOperacao }, formErrors: fieldValidationErrors , exibirPrevisao: true } )
        }
        else {
            this.setState( { obj: {...this.state.obj, idOperacao: idOperacao, previsao: null }, formErrors: fieldValidationErrors , exibirPrevisao: false } )
        }

    }

    handleChangeCategoria(event) {
        const idCategoria = parseInt(event.target.value, 0)
        const categoriaNova = this.props.listaCategoriaTemplate.find(categoria => categoria.id === idCategoria)
        this.setState({  categoria: categoriaNova })
        this.presenter.carregarTemplateAndamentoPorCategoria(idCategoria)
    }

    handleChangeTemplate(event) {
        const idTemplate = parseInt(event.target.value, 0)
        const templateNovo = this.props.listaTemplate.find(template => template.id === idTemplate)
        this.setState({  obj: {...this.state.obj, textoCliente: templateNovo.texto, template: templateNovo } })
    }

    onChangeEnviaEmail(){
        this.setState({
            obj: { ...this.state.obj,  enviaEmail: !this.state.obj.enviaEmail}
        });
    }

    errorClassEditor(error) {
        return(error.length === 0 ? '' : 'demo-editor-error');
    }

    errorClass(error) {
        return(error.length === 0 ? '' : 'has-danger');
    }

    renderDataPrevisao() {
        if (this.state.exibirPrevisao === true) {
            return (
                <div className="col-md-12 m-b-20">
                    <div className={`form-group ${this.errorClass(this.state.formErrors.previsao)}`}>
                        <label>Data previsão</label>
                        <input onChange={this.onChangeDataPrevisao.bind(this)} className="form-control" type="datetime-local" id="dataprevisao"/>
                    </div>
                </div>
            )
        }
        return null
    }

    render() {
        const { classes } = this.props;

        return (
            <Modal size="lg" onClosed={this.onCloseModal} backdrop={'static'} isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className}>
                <ModalHeader>
                    <h4>Inclusão Andamento</h4>
                </ModalHeader>
                <ModalBody>
                        <div className="col-md-12 m-b-20">
                            <div className={`form-group ${this.errorClass(this.state.formErrors.texto)}`}>
                                <label>Texto</label>
                                <Editor
                                    wrapperClassName="form-group"
                                    editorClassName={`demo-editor ${this.errorClassEditor(this.state.formErrors.texto)}`}
                                    toolbarClassName="toolbar-class"
                                    onEditorStateChange={this.onEditorTextoStateChange}
                                    editorState={this.state.editorTextoState}
                                    toolbar={{
                                        options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign','history'],
                                    }}
                                />
                            </div>
                        </div>

                        <div className="col-md-12 m-b-20">

                            <FormControlLabel
                                classes={{
                                    root: classes.formControl,
                                    label: classes.label,
                                }}
                                control={
                                    <Checkbox
                                        className={classes.checkbox}
                                        onChange={this.onChangeEnviaEmail.bind(this)}
                                        checked={this.state.obj.enviaEmail}
                                        value={this.state.obj.enviaEmail}
                                    />
                                }
                                label={'Envia email'}
                            />

                        </div>

                        <div className="col-md-12 m-b-20">
                            <div className={`form-group ${this.errorClass(this.state.formErrors.operacao)}`}>
                                <label className="control-label">Operação</label>
                                <select name="operacao" data-placeholder="Selecione a operação" tabIndex="1" className="form-control custom-select" onChange={this.handleChangeOperacao} value={this.state.obj.idOperacao}>
                                    <option selected="" value="-1">Selecione...</option>
                                    {this.props.listaOperacao.map((item, index) =>
                                        <option  key={item.id} value={item.id}>{item.nome}</option>
                                    )}
                                </select>
                            </div>

                        </div>

                        {this.renderDataPrevisao()}

                        {this.renderErros()}

                </ModalBody>
                <ModalFooter>
                    <Button color="info" onClick={this.handleSubmit}>Confirmar</Button>{' '}
                    <Button color="secondary" onClick={this.cancelarAndamento}>Cancelar</Button>
                </ModalFooter>
            </Modal>
        );
    }


}

const mapStateToProps = state => (
    {
        listaCategoriaTemplate: state.andamentoStore.listaCategoriaTemplate,
        listaTemplate: state.andamentoStore.listaTemplate,
        listaOperacao: state.andamentoStore.listaOperacao,
        andamentoNaoEncontrado: state.andamentoStore.andamentoNaoEncontrado
    }
)

export default connect(mapStateToProps)(withStyles(popoverStyles)(AndamentoInclusao))