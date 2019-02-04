import React, { Component } from 'react'
import connect from 'react-redux/es/connect/connect'

import PageTitleAtendimento from "./PageTitleAtendimento"
import CustomNoDataComponent from "../chamado/ProtocoloNaoEncontrado"
import Pagination from "../chamado/Pagination"

import AtendimentoPresenter from "./AtendimentoPresenter"
import AtendimentoAbertura from "./AtendimentoAbertura"
import { hotkeys } from 'react-keyboard-shortcuts'

import SwipeableDrawer from "@material-ui/core/SwipeableDrawer/SwipeableDrawer"
import { withStyles } from "@material-ui/core"

import moment from "moment";
import ReactTooltip from 'react-tooltip'
import BuscaFuncionario from "../funcionario/buscafuncionario/BuscaFuncionario"
import BuscaClienteTypeahead from "../cliente/buscacliente/BuscaClienteTypeahead"
import { MODO_PESQUISA_CLIENTE } from "../../base"
import AtendimentoDetalhes from "./AtendimentoDetalhes"

import ReactTable from "react-table"
import 'react-table/react-table.css'

import treeTableHOC from 'react-table/lib/hoc/treeTable'
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import Button from "@material-ui/core/Button/Button";
import ColumnChooser from "../chamado/ColumnChooser";
import { Collapse } from 'reactstrap'

import SelectionsColumnGroupChamado from "../chamado/ChamadoTableGroupColumn";

import { Alert } from 'reactstrap'
import { MSG_SYS_Forbidden, MSG_SYS_Unauthorized } from "../../mensagens";

const TreeTableHOC = treeTableHOC(ReactTable)

const ms = require('pretty-ms')

const styles = {
    list: {
        width: 750,
    },
    fullList: {
        width: 'auto',
    },
};


const COLUMNS = [
    {
        accessor: 'sistema.ponto',
        Header: 'Pontuação',
        show: true,
    },
    {
        accessor: 'id',
        Header: 'Nº do Atendimento',
        minWidth: 155,
        show: true,
    },
    {
        accessor: 'solicitante',
        Header: 'Solicitante',
        minWidth: 110,
        show: true,
    },
    {
        accessor: 'cliente.id',
        Header: 'Cód. do Cliente',
        minWidth: 130,
        show: true,
    },
    {
        accessor: 'cliente.nomeFantasia',
        Header: 'Nome Fantasia',
        minWidth: 330,
        show: true,
    },
    {
        id: "abertura",
        Header: 'Data Abertura',
        accessor: d => {
            return moment(d.abertura)
                .local()
                .format("DD/MM/YYYY HH:mm")
        },
        minWidth: 150,
        show: true,
    },
    {
        accessor: 'assunto',
        Header: 'Assunto',
        minWidth: 400,
        show: true,
    },
    {
        accessor: 'email',
        Header: 'E-mail',
        minWidth: 250,
        show: true,
    },
    {
        accessor: 'cliente.razaoSocial',
        Header: 'Razão Social',
        minWidth: 250,
        show: true,
    },
    {
        accessor: 'funcionario.id',
        Header: 'Cód. Funcionário',
        minWidth: 145,
        show: true,
    },
    {
        accessor: 'funcionario.nome',
        Header: 'Funcionário',
        minWidth: 300,
        show: true,
    },
    {
        accessor: 'sistema.nome',
        Header: 'Sistema',
        minWidth: 310,
        show: true,
    },
]

class Atendimento extends Component {

    state = {
        atendimento: null,
        numAtendimento: '',
        modalInclusao: false,
        loading: true,
        atendimentoLista: [],
        columns: COLUMNS,

        obj: {
            nomeCliente: '',
            possuiAtendimentoHoje: false,
        },

        time: 0,
        start: 0,
        isOn: false,

        filtroAtendimento: {
            solicitante: '',
            assunto: '',
            cliente: '',
            sistema: '',
            status: '',
            data: '',
            periodode: '',
            periodoate: '',
            funcionario: ''
        },

        right: false,
        modoPesquisaFiltroCliente: 'nome',
        textoModoPesquisaFiltroCliente: 'Consulta por nome',
        title: "Atendimento Iniciado: ",

        atendimentoDetalhe: {},
        exibirDetalheAtendimento: false,

        pivotBy: [],
        expanded: {},
        collapse: false,
        visibleAlertUnauthorized: false,
        visibleAlertForbidden: false,
    }

    constructor(props) {
        super(props)

        this.iniciarAtendimento = this.iniciarAtendimento.bind(this)
        this.atendimentoConcluido = this.atendimentoConcluido.bind(this)
        this.changeAtendimento = this.changeAtendimento.bind(this)
        this.presenter = new AtendimentoPresenter(this)
        this.fetchData = this.fetchData.bind(this)
        this.onChangeClienteLabel = this.onChangeClienteLabel.bind(this)

        this.startTimer = this.startTimer.bind(this)
        this.stopTimer = this.stopTimer.bind(this)
        this.resetTimer = this.resetTimer.bind(this)

        this.toggle = this.toggle.bind(this);

        this.onDismissAlertUnauthorized = this.onDismissAlertUnauthorized.bind(this)
        this.onDismissAlertForbidden = this.onDismissAlertForbidden.bind(this)

        this.verificaAtendimentoHoje = this.verificaAtendimentoHoje.bind(this)
    }

    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }

    componentWillUpdate(nextProps) {
        if (this.state.isOn) {
            document.title = this.state.title + " " + ms(this.state.time);
        }
    }

    onChangeClienteLabel(value) {
        this.setState({ title: "Atend.: " + value.slice(0, 8) })
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


    hot_keys = {
        'f2': {
            priority: 1,
            handler: (event) => this.keyHandlerFiltro(),
        },
    }

    keyHandlerFiltro(event) {

        let values = Object.values(MODO_PESQUISA_CLIENTE);
        let nextIndex = values.indexOf(this.state.modoPesquisaFiltroCliente) + 1;
        let nextValue = values[nextIndex]

        if (nextValue) {
            this.setState({
                modoPesquisaFiltroCliente: nextValue,
                textoModoPesquisaFiltroCliente: 'Consulta por ' + nextValue
            })
        } else {
            this.setState({
                modoPesquisaFiltroCliente: MODO_PESQUISA_CLIENTE.Nome,
                textoModoPesquisaFiltroCliente: 'Consulta por nome'
            })
        }

    }

    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        });

    };


    voltarListagem() {
        this.setState({
            exibirDetalheAtendimento: false,
            atendimentoDetalhe: {}
        })
    }

    close() {
        this.setState({
            right: false,
        });
    }

    retornaFiltroAtendimento() {

        let filtro = Object.keys(this.state.filtroAtendimento)
            .map(key => `${key}=${this.state.filtroAtendimento[key]}`)
            .join("&");

        return filtro;
    }

    aplicarFiltro() {

        this.presenter.carregarAtendimento(this.retornaFiltroAtendimento())
        this.close()
    }

    handleChangeFiltroCliente(value) {
        this.setState({ filtroAtendimento: { ...this.state.filtroAtendimento, cliente: value } })
    }

    onChangePeriodoDe(event) {
        this.setState({ filtroAtendimento: { ...this.state.filtroAtendimento, periodode: event.target.value } })
    }

    onChangePeriodoAte(event) {
        this.setState({ filtroAtendimento: { ...this.state.filtroAtendimento, periodoate: event.target.value } })
    }

    onChangeTipoData(event) {
        this.setState({ filtroAtendimento: { ...this.state.filtroAtendimento, data: event.target.value } })
    }

    onChangeFuncionarioCadastro(value) {
        this.setState({ filtroAtendimento: { ...this.state.filtroAtendimento, funcionario: value } })
    }

    onChangeStatus(event) {
        this.setState({ filtroAtendimento: { ...this.state.filtroAtendimento, status: event.target.value } })
    }

    onChangeFiltroAssunto(event) {
        this.setState({ filtroAtendimento: { ...this.state.filtroAtendimento, assunto: event.target.value } })
    }

    onChangeFiltroSolicitante(event) {
        this.setState({ filtroAtendimento: { ...this.state.filtroAtendimento, solicitante: event.target.value } })
    }

    componentDidMount() {
        this.presenter.carregarAtendimento(this.retornaFiltroAtendimento());
    }

    exibeAtendimentos(atendimentos) {
        let atendimento = atendimentos.content ? atendimentos : [atendimentos];
        this.setState({
            atendimentoLista: atendimento,
            loading: false
        })
    }

    exibeInicioAtendimento(atendimento) {
        this.setState({ atendimento: atendimento }, () => {
            this.startTimer()
        })
    }

    changeAtendimento() {

        this.stopTimer()
        this.resetTimer()

        this.setState({
            modalInclusao: !this.state.modalInclusao,
            atendimento: null,
            title: "Zaal Atendimento"
        })

    }

    iniciarAtendimento() {
        this.changeAtendimento();
        this.presenter.iniciarAtendimento()
    }

    iniciarNovoAtendimento() {
        window.open('atendimento')
        return
    }

    atendimentoConcluido() {
        this.setState({ atendimento: null })
    }

    fetchData(state) {
        this.setState({ loading: true })
        this.presenter.carregarAtendimento(this.retornaFiltroAtendimento(), state.page, state.pageSize, state.sorted)
    }

    onChangeConsulta(event) {
        this.setState({ numAtendimento: event.target.value })
    }

    clearConsulta() {
        this.setState({ atendimento: '' })
        this.presenter.carregarAtendimento(0, 10, [])
    }

    keyHandler(event) {
        if (event.key === 'Enter') {
            this.buscarAtendimento(event.target.value)
        } else if (event.key === 'Escape') {
            this.clearConsulta()
        }
    }

    buscarAtendimento(atendimento) {
        if (atendimento) {
            this.presenter.carregarAtendimentoPorId(atendimento)
        }
    }

    renderInicioAtendimento() {

        if (this.state.atendimento === null) {
            return null
        }

        return (
            <div>
                <AtendimentoAbertura atendimento={this.state.atendimento}
                    atendimentoConcluido={this.atendimentoConcluido}
                    modal={this.state.modalInclusao}
                    toggle={this.changeAtendimento}
                    iniciarNovoAtendimento={this.iniciarNovoAtendimento}
                    onChangeClienteLabel={this.onChangeClienteLabel}
                    timerAtendimento={this.state.time}
                    atendimentoHoje={this.verificaAtendimentoHoje}
                />
            </div>
        )

    }

    renderRightSidebar() {
        const { classes } = this.props;

        const sideList = (
            <div className={classes.list}>
                <div className="card card-outline-info">
                    <div className="card-header">
                        <h4 className="m-b-0 text-white">Filtro de Atendimentos</h4>
                    </div>
                    <div className="card-body">

                        <div className="row">

                            <div className="col-md-4">
                                <div className="form-group">
                                    <label className="control-label">De</label>
                                    <input
                                        onChange={this.onChangePeriodoDe.bind(this)}
                                        value={this.state.filtroAtendimento.periodode}
                                        id="periodode"
                                        name="periodode"
                                        type="date"
                                        className="form-control" />
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="form-group">
                                    <label className="control-label">Até</label>
                                    <input
                                        onChange={this.onChangePeriodoAte.bind(this)}
                                        value={this.state.filtroAtendimento.periodoate}
                                        id="periodoate"
                                        name="periodoate"
                                        type="date"
                                        className="form-control" />
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="form-group">
                                    <label className="control-label">Tipo</label>
                                    <select
                                        onChange={this.onChangeTipoData.bind(this)}
                                        value={this.state.filtroAtendimento.data}
                                        className="form-control custom-select"
                                        id="data"
                                        name="data">
                                        <option selected="" value="">Selecione...</option>
                                        <option value="abertura">Abertura</option>
                                        <option value="conclusao">Conclusão</option>
                                    </select>
                                </div>
                            </div>

                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <BuscaFuncionario handleChange={this.onChangeFuncionarioCadastro.bind(this)} label="Funcionário Cadastro" />
                            </div>

                            <div className="col-md-6 m-b-10">
                                <label>Cliente <small className="form-control-feedback"> {`(${this.state.textoModoPesquisaFiltroCliente})`}</small> </label>
                                <BuscaClienteTypeahead paramPesquisa={this.state.modoPesquisaFiltroCliente} handleChange={this.handleChangeFiltroCliente.bind(this)} />
                                <small className="form-control-feedback"> F2 alterar modo de pesquisa </small>
                            </div>
                        </div>

                        <div className="row">

                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="control-label">Status</label>
                                    <select
                                        onChange={this.onChangeStatus.bind(this)}
                                        value={this.state.filtroAtendimento.status}
                                        className="form-control custom-select"
                                        id="data"
                                        name="data">
                                        <option selected="" value="">Selecione...</option>
                                        <option value="aberto">Em Aberto</option>
                                        <option value="concluido">Fechado</option>
                                    </select>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="control-label">Assunto</label>
                                    <input value={this.state.filtroAtendimento.assunto} onChange={this.onChangeFiltroAssunto.bind(this)} type="text" id="assunto" name="assunto" className="form-control" placeholder="" />
                                </div>
                            </div>
                        </div>

                        <div className="row">

                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="control-label">Solicitante</label>
                                    <input value={this.state.filtroAtendimento.solicitante} onChange={this.onChangeFiltroSolicitante.bind(this)} type="text" id="solicitante" name="solicitante" className="form-control" placeholder="" />
                                </div>
                            </div>
                        </div>

                        <div className="text-right">
                            <button onClick={this.close.bind(this)} className="btn btn-secondary btn-rounded"> Cancelar</button>
                            <button onClick={this.aplicarFiltro.bind(this)} className="btn btn-info btn-rounded" style={{ marginLeft: '10px' }}> Aplicar Filtros</button>
                        </div>

                    </div>
                </div>
            </div>
        );

        return (
            <div>
                <SwipeableDrawer
                    anchor="right"
                    open={this.state.right}
                    onClose={this.toggleDrawer('right', false)}
                    onOpen={this.toggleDrawer('right', true)}
                >
                    <div
                        tabIndex={0}
                        role="button"
                    >
                        {sideList}
                    </div>
                </SwipeableDrawer>
            </div>
        )
    }


    retornaColunas() {

        let columns = this.state.columns.map(item => {
            if (item.id !== 'dataHoraAbertura') {
                return { value: item.accessor, label: item.Header }
            } else {
                return { value: 'dataHoraAbertura', label: 'Data Hora' }
            }
        })

        return columns
    }

    handlePivotBy(columns) {
        this.setState({ pivotBy: columns })
    }

    onExpandedChange = (expanded) => {
        this.setState({ expanded });
    }

    onDismissAlertUnauthorized() {
        this.setState({ visibleAlertUnauthorized: false })
    }

    onDismissAlertForbidden() {
        this.setState({ visibleAlertForbidden: false })
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

    verificaAtendimentoHoje(cliente, atendimentoHoje) {
        this.setState({
            obj: { 
                ... this.state.obj, 
                nomeCliente: cliente,
                possuiAtendimentoHoje: atendimentoHoje
            }
        })  
    }

    renderAtendimentoHoje() {
        return(
            <div class="ribbon-wrapper-reverse ribbon-cliente">
                <div class="ribbon ribbon-bookmark ribbon-right ribbon-danger"><strong>{this.state.obj.nomeCliente}</strong> já teve um atendimento <strong>hoje.</strong></div>
            </div>
        )
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

    render() {

        const { pivotBy, expanded, selectType, selectAll } = this.state;

        const {
            onExpandedChange,
            isSelected,
            toggleSelection,
            toggleAll
        } = this;

        const extraProps =
        {
            expanded,
            pivotBy,
            onExpandedChange
        }

        if (this.state.exibirDetalheAtendimento) {
            return (
                <AtendimentoDetalhes atendimento={this.state.atendimentoDetalhe} voltar={this.voltarListagem.bind(this)} />
            )
        }

        const { loading } = this.state;

        return (
            <div>
                <div>
                    <PageTitleAtendimento atendimento={this.state.atendimento} timer={this.state.time} />
                    { this.state.obj.possuiAtendimentoHoje ? this.renderAtendimentoHoje() : null }
                    <div className="row">
                        <div className="col-12">
                            <div className="card">

                                {this.renderMensagemUnauthorized()}
                                {this.renderMensagemForbidden()}

                                <div className="card-body">

                                    {!this.state.modalInclusao ?
                                        <div>
                                            <div className="right-page-header">
                                                <div className="d-flex">
                                                    <div className="align-self-center">
                                                        <h4 className="card-title">Atendimentos</h4>
                                                        <h6 className="card-subtitle">Listagem de atendimentos</h6>
                                                    </div>


                                                    <div className="ml-auto d-flex">
                                                        <div>
                                                            <input
                                                                onChange={this.onChangeConsulta.bind(this)}
                                                                onKeyUp={this.keyHandler.bind(this)}
                                                                value={this.state.numAtendimento}
                                                                type="text"
                                                                id="demo-input-search2"
                                                                placeholder="Pesquisar Atendimento"
                                                                className="form-control" />
                                                        </div>
                                                        <div className="">
                                                            <button
                                                                onClick={this.toggleDrawer('right', true)}
                                                                className="myRight-side-toggle waves-effect waves-light btn btn-secondary btn btn-circle btn-sm pull-right m-l-10">
                                                                <i className="fas fa-filter"></i>
                                                            </button>
                                                        </div>
                                                    </div>


                                                </div>

                                                <div className="button-group">

                                                    <button
                                                        onClick={this.iniciarAtendimento}
                                                        type="button"
                                                        data-place='right'
                                                        className="btn btn-success btn-rounded">Iniciar Atendimento
                                                    </button>

                                                </div>

                                            </div>

                                            <br />

                                            <div>
                                                <div className="text-right">
                                                    <div className="btn-group">
                                                        <Tooltip id="tooltip-columns_agrupar" title="Agrupar Colunas">
                                                            <Button size="small" variant="outlined" onClick={this.toggle} style={{ backgroundColor: 'white', height: '32px', padding: '2px', marginLeft: '5px' }} >
                                                                <i className="fas fa-th-large" />
                                                            </Button>
                                                        </Tooltip>

                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-12 m-b-5 m-t-5">
                                                        <Collapse isOpen={this.state.collapse}>
                                                            <div >
                                                                <SelectionsColumnGroupChamado columns={this.retornaColunas()} handleChange={this.handlePivotBy.bind(this)} />
                                                            </div>
                                                        </Collapse>
                                                    </div>
                                                </div>

                                                <TreeTableHOC
                                                    PaginationComponent={Pagination}
                                                    resizable={false}
                                                    keyField='id'
                                                    {...extraProps}
                                                    ref={(r) => this.selectTable = r}
                                                    freezWhenExpanded={true}
                                                    columns={this.state.columns}
                                                    manual
                                                    data={this.state.atendimentoLista.content || this.state.atendimentoLista}
                                                    pages={this.state.atendimentoLista.totalPages || 1}
                                                    loading={loading}
                                                    onFetchData={this.fetchData}
                                                    defaultPageSize={10}
                                                    className="-striped -highlight"
                                                    NoDataComponent={CustomNoDataComponent}
                                                    getTrGroupProps={(state, rowInfo, column, instance) => {
                                                        if (rowInfo !== undefined) {
                                                            if (rowInfo.original) {
                                                                return {
                                                                    onDoubleClick: (e, handleOriginal) => {
                                                                        this.setState({
                                                                            exibirDetalheAtendimento: true,
                                                                            atendimentoDetalhe: rowInfo.original
                                                                        })
                                                                    },
                                                                }
                                                            }
                                                        }
                                                    }
                                                    }
                                                />
                                            </div>
                                        </div>
                                        :
                                        this.renderInicioAtendimento()
                                    }
                                </div>
                            </div>

                            {this.renderRightSidebar()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => (
    {
        user: state.authStore.user
    }
)

export default connect(mapStateToProps)(withStyles(styles)(hotkeys((Atendimento))))