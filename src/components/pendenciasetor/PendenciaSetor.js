import React, {Component} from 'react'
import connect from 'react-redux/es/connect/connect'
import PendenciaSetorInclusao from "./PendenciaSetorInclusao";
import ChamadoInclusao from "../chamado/ChamadoInclusao";
import PageTitle from "../../commom/template/PageTitles";
import Pagination from "../chamado/Pagination";
import CustomNoDataComponent from "../chamado/ProtocoloNaoEncontrado";
import ReactTable from "react-table";
import PendenciaSetorPresenter from "./PendenciaSetorPresenter";
import moment from "moment";
import PendenciaSetorConclusao from "./PendenciaSetorConclusao";
import {Alert} from "reactstrap";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer/SwipeableDrawer";
import {withStyles} from "@material-ui/core";
import BuscaFuncionario from "../funcionario/buscafuncionario/BuscaFuncionario";
import SetorPresenter from "../setor/buscasetor/BuscaSetorPresenter";
import { buscarExistenciPendencia } from './PendenciaSetorAction';
import { buscarPendencia } from './PendenciaSetorAction'

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
        accessor: 'nome',
        Header: 'Nome',
        show: true,
    },
    {
        accessor: 'assunto',
        Header: 'Assunto',
        show: true,
    },
    {
        accessor: 'cliente.id',
        Header: 'Cód Cliente',
        minWidth: 120,
        show: true,
    },
    {
        accessor: 'cliente.nomeFantasia',
        Header: 'Nome Fantasia Cliente',
        minWidth: 250,
        show: true,
    },
    {
        id: "abertura",
        Header: 'Data Abertura',
        accessor: d => {
            return moment(d.abertura)
                .local()
                .format("DD/MM/YYYY HH:MM:SS")
        },
        minWidth: 150,
        show: true,
    },
    {
        accessor: 'preferenciaContato',
        Header: 'Preferência Contato',
        show: true,
    },
    {
        accessor: 'telefone',
        Header: 'Telefone',
        show: true,
    },
    {
        accessor: 'setor.nome',
        Header: 'Setor',
        show: true,
    },

]

class PendenciaSetor extends Component {

    state = {
        modalInclusao: false,
        modalConclusao: false,
        loading: true,
        selected: null,
        selectedIndex: null,
        visibleAlert: false,

        pendenciasLista: [],
        columns: COLUMNS,

        filtroPendencias: {
            abertura: '',
            conclusao: '',
            destinatario: '',
            status: 'aberto',
            data: '',
            periodode: '',
            periodoate: ''
        },

        right: false,
        listaSetor: []
    }

    constructor(props) {
        super(props)

        this.toggleModalInclusao = this.toggleModalInclusao.bind(this)
        this.toggleModalConclusao = this.toggleModalConclusao.bind(this)
        this.sucessoInclusao = this.sucessoInclusao.bind(this)
        this.sucessoConclusao = this.sucessoConclusao.bind(this)
        this.fetchData = this.fetchData.bind(this)
        this.onDismissAlert = this.onDismissAlert.bind(this)
        this.atualizaPendencia = this.atualizaPendencia.bind(this)

        this.presenter = new PendenciaSetorPresenter(this)
        this.setorPresenter = new SetorPresenter(this)
    }

    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        });

        if (open) this.setorPresenter.carregarSetorPorNome('')
    };

    componentDidMount() {
        this.presenter.carregarPendenciaSetor(this.retornaFiltroPendencias())
    }

    exibirPendenciaSetor(pendencias) {
        this.props.dispatch(buscarPendencia(pendencias))
        this.setState({
            pendenciasLista: pendencias,
            loading: false
        })
    }

    exibeSetor(setor) {
        this.setState({listaSetor: setor})
    }

    toggleModalInclusao() {
        this.setState({
            modalInclusao: !this.state.modalInclusao
        })
    }

    sucessoInclusao() {
        this.presenter.carregarPendenciaSetor(this.retornaFiltroPendencias())
    }

    sucessoConclusao() {

        this.setState({
            selected: null,
            selectedIndex: null,
        })

        this.presenter.carregarPendenciaSetor(this.retornaFiltroPendencias())
    }

    toggleModalConclusao() {

        if (this.state.selected === null || this.state.selected.conclusao)  {

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
        } else {
            this.setState({
                modalConclusao: !this.state.modalConclusao,
                visibleAlert: false
            })
        }
    }

    onDismissAlert() {
        this.setState({ visibleAlert: false });
    }

    exibirExistePendencia(pendencia) {
        this.props.dispatch(buscarExistenciPendencia(pendencia.resultado))
    }

    atualizaPendencia() {
        this.presenter.carregaExistePendencia();
    }

    fetchData(state, instance) {

        this.setState({ loading: true })

        this.presenter.carregarPendenciaSetor(this.retornaFiltroPendencias(), state.page, state.pageSize, state.sorted)
    }

    renderSelecionePendencia() {
        return (
            <Alert color="warning" isOpen={this.state.visibleAlert} toggle={this.onDismissAlert} fade={true}>
                Selecione um pendência "em aberto" para prosseguir.
            </Alert>
        )
    }

    onChangePeriodoDe(event) {
        this.setState({ filtroPendencias: { ...this.state.filtroPendencias, periodode: event.target.value } })
    }

    onChangePeriodoAte(event) {
        this.setState({ filtroPendencias: { ...this.state.filtroPendencias, periodoate: event.target.value } })
    }

    onChangeTipoData(event) {
        this.setState({ filtroPendencias: { ...this.state.filtroPendencias, data: event.target.value } })
    }

    onChangeFuncionarioCadastro(value) {
        this.setState({ filtroPendencias: { ...this.state.filtroPendencias, abertura: value } })
    }

    onChangeFuncionarioConclusao(value) {
        this.setState({ filtroPendencias: { ...this.state.filtroPendencias, conclusao: value } })
    }

    onChangeStatus(event) {
        this.setState({ filtroPendencias: { ...this.state.filtroPendencias, status: event.target.value } })
    }

    onChangeSetor(event) {
        this.setState({ filtroPendencias: { ...this.state.filtroPendencias, destinatario: event.target.value } })
    }

    close() {
        this.setState({
            right: false,
        });
    }

    retornaFiltroPendencias(){

        let filtro = Object.keys(this.state.filtroPendencias)
                            .map(key => `${key}=${this.state.filtroPendencias[key]}`)
                            .join("&");

        return filtro;
    }

    aplicarFiltro() {

        this.presenter.carregarPendenciaSetor(this.retornaFiltroPendencias())
        this.close()
    }

    renderRightSidebar() {
        const { classes } = this.props;

        const sideList = (
            <div className={classes.list}>
                <div className="card card-outline-info">
                    <div className="card-header">
                        <h4 className="m-b-0 text-white">Filtro de Pendências</h4>
                    </div>
                    <div className="card-body">

                        <div className="row">

                            <div className="col-md-4">
                                <div className="form-group">
                                    <label className="control-label">De</label>
                                    <input
                                        onChange={this.onChangePeriodoDe.bind(this)}
                                        value={this.state.filtroPendencias.periodode}
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
                                        value={this.state.filtroPendencias.periodoate}
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
                                        value={this.state.pendenciasLista.data}
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
                            <div className="col-md-6">
                                <BuscaFuncionario handleChange={this.onChangeFuncionarioConclusao.bind(this)} label="Funcionário Conclusão" />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <label className="control-label">Setor</label>
                                <select
                                    onChange={this.onChangeSetor.bind(this)}
                                    value={this.state.pendenciasLista.destinatario}
                                    name="setor"
                                    data-placeholder="Selecione o Setor"
                                    tabIndex="6"
                                    className="form-control custom-select" >
                                    <option selected="" value="">Selecione...</option>
                                    {this.state.listaSetor.map((item, index) =>
                                        <option key={item.id} value={item.id}>{item.nome}</option>
                                    )}
                                </select>
                            </div>

                            <div className="col-md-4">
                                <div className="form-group">
                                    <label className="control-label">Status</label>
                                    <select
                                        onChange={this.onChangeStatus.bind(this)}
                                        value={this.state.pendenciasLista.status}
                                        className="form-control custom-select"
                                        id="data"
                                        name="data">
                                        <option selected="" value="">Selecione...</option>
                                        <option value="aberto">Em Aberto</option>
                                        <option value="fechado">Fechado</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="text-right">
                            <button onClick={this.close.bind(this)} className="btn btn-secondary btn-rounded"> Cancelar</button>
                            <button onClick={this.aplicarFiltro.bind(this)} className="btn btn-info btn-rounded" style={{marginLeft:'10px'}}> Aplicar Filtros</button>
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

    render() {

        const { loading } = this.state;

        return (
            <div>
                <PageTitle pagina="Pendência de Setor"/>

                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="right-page-header">
                                    <div className="d-flex">
                                        <div className="align-self-center">
                                            <h4 className="card-title">Pendências de Setor</h4>
                                            <h6 className="card-subtitle">Listagem de pendências do setor</h6>
                                        </div>

                                        <div className="ml-auto">
                                            <button
                                                onClick={this.toggleDrawer('right', true)}
                                                className="myRight-side-toggle waves-effect waves-light btn btn-secondary btn btn-circle btn-sm pull-right m-l-10">
                                                <i className="fas fa-filter"></i>
                                            </button>
                                        </div>

                                    </div>

                                    <div  className="button-group">
                                        <button onClick={this.toggleModalInclusao} type="button" className="btn btn-success btn-rounded">Incluir</button>
                                        <button onClick={this.toggleModalConclusao} type="button" className="btn btn-info btn-rounded">Concluir Pendência</button>
                                    </div>
                                    <br />
                                    {this.renderSelecionePendencia()}
                                </div>
                                <br/>

                                <ReactTable
                                    PaginationComponent={Pagination}
                                    resizable={false}
                                    columns={this.state.columns }
                                    manual // Força a tabela a não ordenar e paginar automáticamente, para o processo ser feito do lado servidor
                                    data={this.state.pendenciasLista.content || this.state.pendenciasLista}
                                    pages={ this.state.pendenciasLista.totalPages || 1} // Exibir o número total de páginas
                                    loading={loading} // Exibir o carregamento
                                    onFetchData={ this.fetchData } // Solicitar novos dados a qualquer alteração
                                    defaultPageSize={10}
                                    className="-striped -highlight"
                                    NoDataComponent={CustomNoDataComponent}
                                    SubComponent={row => {
                                        return (
                                            <div style={{ padding: "8px" }}>
                                                <em dangerouslySetInnerHTML={{ __html: row.original.observacao }} >
                                                </em>
                                            </div>
                                        );
                                    }}
                                    getTrProps={(state, rowInfo) => {
                                        if (rowInfo && rowInfo.row) {
                                            return {
                                                onClick: (e) => {
                                                    this.setState({
                                                        selected: rowInfo.original,
                                                        selectedIndex: rowInfo.index
                                                    })
                                                },
                                                style: {
                                                    background: rowInfo.index === this.state.selectedIndex ? '#00afec' : 'white',
                                                    color: rowInfo.index === this.state.selectedIndex ? 'white' : 'black'
                                                }
                                            }
                                        } else {
                                            return {}
                                        }
                                    }}
                                />

                            </div>
                        </div>

                        {this.renderRightSidebar()}
                    </div>
                </div>

                <PendenciaSetorInclusao modal={this.state.modalInclusao}
                                        toggle={this.toggleModalInclusao}
                                        sucesso={this.sucessoInclusao}
                                        atualizaPendencia={this.atualizaPendencia}/>

                <PendenciaSetorConclusao modal={this.state.modalConclusao}
                                         toggle={this.toggleModalConclusao}
                                         pendenciaSetor={this.state.selected}
                                         sucesso={this.sucessoConclusao}
                                         atualizaPendencia={this.atualizaPendencia}/>
            </div>
        );
    }
}


export default connect(null)(withStyles(styles)(PendenciaSetor))