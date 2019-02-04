import React, {Component} from 'react'
import {connect} from 'react-redux'
import ReactTable from "react-table"
import {filtrarTransferenciaPendente} from "./TransferenciaAction"
import TransferenciaPresenter from "./TransferenciaPresenter"
import PageTitles from '../../../commom/template/PageTitles'
import { Modal, ModalHeader, ModalBody, Alert } from 'reactstrap'
import {toastr} from "react-redux-toastr"
import moment from 'moment'

import '../../../commom/template/include/datatables/jquery.dataTables.min.css'
import '../../../commom/template/custom.css'
import TransferenciaRecusar from "./TransferenciaRecusar"
import {montarObjetoTransferencia} from "./TransferenciaUtils"

import Pagination from '../Pagination'

import Checkbox from "@material-ui/core/Checkbox"
import FormControl from '@material-ui/core/FormControl'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { withStyles } from "@material-ui/core/styles"
import CustomNoDataComponent from "../ProtocoloNaoEncontrado"

import {MSG_SYS_Forbidden, MSG_SYS_Unauthorized} from '../../../mensagens'

export const popoverStyles = {
    boxElementPad: {
        paddingLeft: "16px",
        height:'auto'
    },

    formGroup: {
        marginTop: "1px",
    },
    formControl: {},
    checkbox: {
        width: "12px",
        height: "12px",
        marginRight: "5px"
    },
    checked: {},
    label: {
        fontSize: "4px",
        marginLeft: "5px",
        color: "green",
        fontFamily: "seriff"
    },

};

class TransferenciaAceitarRecusar extends Component {

    constructor(props){
        super(props)

        const { classes, columns } = this.props;

        this.state = {
            obj: {
                transferencias: []
            },
            justificativa: '',
            modal: false,
            visibleAlert: false,
            visibleAlertUnauthorized: false,
            visibleAlertForbidden: false,
            erros: [],
            formErrors: {justificativa: '', },
            valores: [],
            loading: true,
            columns: [
                {
                    id: "checkbox",
                    accessor: "",
                    Cell: ({ original }) => {
                        return (     
                            <FormControl component={"fieldset"} className={classes.boxElementPad} > 
                                <FormGroup className={classes.formGroup}>
                                    <FormControlLabel
                                        key={original.id}
                                        classes={{
                                            root: classes.formControl,
                                            label: classes.label,
                                        }}
                                        control={
                                            <Checkbox
                                                className={classes.checkbox}
                                                onChange={() => this.toggleRow(original.id)}
                                                checked={this.state.selected[original.id] === true}   
                                            />
                                        }                                        
                                    />
                                </FormGroup> 
                            </FormControl>                                                                    
                        );
                    },
                    Header: x => {
                        return (
                            <FormControl component={"fieldset"} className={classes.boxElementPad} > 
                                <FormGroup className={classes.formGroup}>
                                    <FormControlLabel
                                        key={x.id}
                                        classes={{
                                            root: classes.formControl,
                                            label: classes.label,
                                        }}
                                        control={
                                            <Checkbox
                                                className={classes.checkbox}
                                                onChange={() => this.toggleSelectAll()}
                                                checked={this.state.selectAll === 1} 
                                            />
                                        }                                        
                                    />
                                </FormGroup> 
                            </FormControl>        
                        );
                    },
                    sortable: false,
                    width: 45
                },
                {
                    accessor: 'idChamado',
                    Header: 'Protocolo',
                    show: true,
                },
                {
                    accessor: 'solicitante',
                    Header: 'Solicitante',
                    minWidth: 160,
                    show: true,
                },
                {
                    accessor: 'assuntoChamado',
                    Header: 'Assunto',
                    minWidth: 330,
                    show: true,
                },
                {        
                    id: "dataHoraEnvio",
                    Header: 'Data Envio',
                    accessor: d => {
                        return moment(d.dataHoraAbertura)
                            .local()
                            .format("DD/MM/YYYY")
                    },
                    minWidth: 150,
                    show: true,
                },
                {
                    accessor: 'idFuncionarioEnvio',
                    Header: 'Cód. Funcionário',
                    minWidth: 200,
                    show: true,
                },
                {
                    accessor: 'nomeFuncionarioEnvio',
                    Header: 'Funcionário',
                    minWidth: 330,
                    show: true,
                },
                {
                    accessor: 'idcliente',
                    Header: 'Cód. Cliente',
                    minWidth: 150,
                    show: true,
                },   
                {
                    accessor: 'nomeCliente',
                    Header: 'Cliente',
                    minWidth: 330,
                    show: true,
                },                   
            ],
            selected: {}, 
            selectAll: 0,  
        }
        
        this.toggleRow = this.toggleRow.bind(this)
        this.toggleModal = this.toggleModal.bind(this)
        this.onDismissAlert = this.onDismissAlert.bind(this)
        this.onDismissAlertUnauthorized = this.onDismissAlertUnauthorized.bind(this)
        this.onDismissAlertForbidden = this.onDismissAlertForbidden.bind(this)
        this.cliqueBotaoAceitar = this.cliqueBotaoAceitar.bind(this)
        this.onCloseModal = this.onCloseModal.bind(this)

        this.presenter = new TransferenciaPresenter(this)
    }

    toggleSelectAll() {
		let newSelected = {};

		if (this.state.selectAll === 0) {
			this.props.listaTransferencia.forEach(x => {
				newSelected[x.id] = true;
			});
		}

		this.setState({
			selected: newSelected,
			selectAll: this.state.selectAll === 0 ? 1 : 0
		});
	}

    componentDidMount() {        
        this.presenter.carregarTransferenciaPendente(this.props.user.id)
    }

    errorClass(error) {
        return(error.length === 0 ? '' : 'has-danger');
    }

    onCloseModal() {
        this.setState({
            visibleAlert: false,
            erros: []
        })
    }

    onDismissAlert() {
        this.setState({ visibleAlert: false });
    }

    onDismissAlertUnauthorized() {
        this.setState({ visibleAlertUnauthorized: false })
    }

    onDismissAlertForbidden() {
        this.setState({ visibleAlertForbidden: false })
    }

    toggleModal() {

        if (this.state.obj.transferencias.length  > 0) {
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

    exibirTransferencia(transferencias) {
        this.props.dispatch(filtrarTransferenciaPendente(transferencias))
    }

    cliqueBotaoAceitar() {

        if (this.state.obj.transferencias.length > 0) {

            let objeto = montarObjetoTransferencia(this.state.obj.transferencias)
            this.presenter.atualizarTransferencia(JSON.stringify(objeto))

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

    renderSelecioneTransferencias() {
        return (
            <Alert color="warning" isOpen={this.state.visibleAlert} toggle={this.onDismissAlert} fade={true}>
                Selecione ao menos uma transferência
            </Alert>
        )
    }

    renderMensagemUnauthorized() {
        return (
            <Alert color="error" isOpen={this.state.visibleAlertUnauthorized} toggle={this.onDismissAlertUnauthorized} fade={true}>
                {MSG_SYS_Unauthorized}
            </Alert>
        )
    }

    renderMensagemForbidden() {
        return (
            <Alert color="error" isOpen={this.state.visibleAlertForbidden} toggle={this.onDismissAlertForbidden} fade={true}>
                {MSG_SYS_Forbidden}
            </Alert>
        )
    }

    renderModalJustificativa() {

        return (
            <Modal onClosed={this.onCloseModal} backdrop={'static'} toggle={this.toggleModal} isOpen={this.state.modal} className={this.props.className}>
                <ModalHeader>
                    <h4> Justificativa </h4>
                </ModalHeader>
                <ModalBody>

                    <TransferenciaRecusar classDiv="col-md-12 m-b-20"
                                          classFooter="modal-footer"
                                          cancelar={this.cancelar.bind(this)}
                                          transferencias={this.state.obj.transferencias}
                                          exibirMensagemSucesso={this.exibirMensagemSucesso.bind(this)}
                                          isModal={false}/>

                </ModalBody>
            </Modal>
        )
    }

    cancelar() {
        this.toggleModal()
        this.setState({
            visibleAlert: false,
            erros: []
        })
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

    exibirMensagemSucesso() {
        toastr.success('Sucesso', 'Operação realizada com sucesso.')
        this.setState({
            visibleAlert: false,
            visibleAlertUnauthorized: false,
            visibleAlertForbidden: false,
            modal: false,
            erros: [],
            justificativa: '',
            obj: { transferencias: [] }
        })

        this.presenter.carregarTransferenciaPendente(this.props.user.id)
    }

    selecionarProtocolosTransferencia(checked, value) {
        let {transferencias} = this.state.obj
        let index = transferencias.findIndex(val => val.id === value)
        let obj = this.props.listaTransferencia.find(x => x.id === value);
        if(checked) {
            transferencias.push(obj)
        }
        else {
            transferencias.splice(index, 1)
        }

        this.setState({
            obj: { ...this.state.obj, transferencias}
        })
    }

    toggleRow(id) {
		const newSelected = Object.assign({}, this.state.selected);
        newSelected[id] = !this.state.selected[id];
		this.setState({
			selected: newSelected,
			selectAll: 2
        }, () => {
            this.selecionarProtocolosTransferencia(newSelected[id], id)
        });            
	}

    render() {
        
        return (
            <div>
                <PageTitles pagina="Aceitar Transferências" />

                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">

                                <div className="right-page-header">
                                    <div className="d-flex">
                                        <div className="align-self-center">
                                            <h4 className="card-title">Transferências</h4>
                                            <h6 className="card-subtitle">Listagem de transferências para aceitar/recusar</h6>
                                        </div>
                                    </div>
                                    {this.renderSelecioneTransferencias()}
                                    {this.renderMensagemUnauthorized()}
                                    {this.renderMensagemForbidden()}
                                </div>

                                <ReactTable
                                    NoDataComponent={CustomNoDataComponent}
                                    PaginationComponent={Pagination}
                                    resizable={true}
                                    columns={this.state.columns}                                    
                                    data={this.props.listaTransferencia}                                                                                                         
                                    defaultPageSize={10}
                                    className="-striped -highlight"    
                                    SubComponent={row => {
                                        return (
                                            <div style={{ padding: "8px" }}>
                                                <em dangerouslySetInnerHTML={{ __html: row.original.justificativa }} >
                                                </em>
                                            </div>
                                        );
                                    }}                                
                                />

                                <br />
                                <button className="btn btn-success btn-rounded" onClick={this.cliqueBotaoAceitar} > Aceitar</button>
                                <button className="btn btn-danger btn-rounded" onClick={this.toggleModal}> Recusar</button>
                            </div>
                        </div>
                    </div>
                </div>

                {this.renderModalJustificativa()}

            </div>
        );
    }
}

const mapStateToProps = state => (
    {
        listaTransferencia: state.transferenciaStore.listaTransferenciaPendente,
        user: state.authStore.user
    }
)

export default connect(mapStateToProps)(withStyles(popoverStyles)(TransferenciaAceitarRecusar))