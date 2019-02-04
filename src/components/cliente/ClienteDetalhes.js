import React, {Component} from 'react'
import PropTypes from "prop-types"

import { withStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import ReactTable from "react-table"

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { Collapse, CardBody, Card } from 'reactstrap'
import ClientePresenter from "./ClientePresenter"
import AndamentoPresenter from '../chamado/andamento/AndamentoPresenter'

import "react-table/react-table.css"
import moment from "moment";
import Pagination from "../chamado/Pagination"
import '../../commom/template/modal.css'
import BuscaFuncionario from "../funcionario/buscafuncionario/BuscaFuncionario";

import CustomNoDataComponent from '../chamado/ProtocoloNaoEncontrado'
import PendenciaFinanceira from "./PendenciaFinanceira";

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    tabsRoot: {
        borderBottom: '1px solid #e8e8e8',
    },
    tabsIndicator: {
        backgroundColor: '#1890ff',
    },
    tabRoot: {
        textTransform: 'initial',
        minWidth: 72,
        fontWeight: theme.typography.fontWeightRegular,
        marginRight: theme.spacing.unit * 4,
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:hover': {
            color: '#40a9ff',
            opacity: 1,
        },
        '&$tabSelected': {
            color: '#1890ff',
            fontWeight: theme.typography.fontWeightMedium,
        },
        '&:focus': {
            color: '#40a9ff',
        },
    },
    tabSelected: {},
    typography: {
        padding: theme.spacing.unit * 3,
    },
});

const TabContainerCliente = (props) => {
    return (
        <div className="container">
        <br />
            <div className="row">
                <div className="col-lg-12">
                    <div className="card card-outline-info">
                        <div className="card-body">
                            <form className="form-horizontal" role="form">
                                <div className="form-body">
                                    <h3 className="box-title">Informações Pessoais</h3>
                                    <hr className="m-t-0 m-b-40"/>
                                    <div className="row">

                                        <div className="col-md-3">
                                            <div className="form-group row">
                                                <label className="control-label text-right col-md-6">Cód.:</label>
                                                <div className="col-md-6">
                                                    <p className="form-control-static"> {props.cliente.id} </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-5">
                                            <div className="form-group row">
                                                <label className="control-label text-right col-md-4">CNPJ: </label>
                                                <div className="col-md-8">
                                                    <p className="form-control-static"> {props.cliente.cnpj} </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="form-group row">
                                                <label className="control-label text-right col-md-4">Insc:</label>
                                                <div className="col-md-8">
                                                    < p className="form-control-static"> {props.cliente.rg} </p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group row">
                                                <label className="control-label text-right col-md-3">Grupo:</label>
                                                <div className="col-md-9">
                                                    <p className="form-control-static"> {props.cliente.grupo ? props.cliente.grupo.nome : ''}  </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-group row">
                                                <label className="control-label text-right col-md-3">Ramo:</label>
                                                <div className="col-md-9">
                                                    <p className="form-control-static"> {props.cliente.ramoAtividade ? props.cliente.ramoAtividade.descricao : ''} </p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group row">
                                                <label className="control-label text-right col-md-3">Fantasia:</label>
                                                <div className="col-md-9">
                                                    <p className="form-control-static"> {props.cliente.nomeFantasia} </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group row">
                                                <label className="control-label text-right col-md-3">Razão:</label>
                                                <div className="col-md-9">
                                                    <p className="form-control-static">{props.cliente.razaoSocial} </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <h3 className="box-title">Endereço</h3>
                                    <hr className="m-t-0 m-b-40"/>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group row">
                                                <label className="control-label text-right col-md-3">Cep:</label>
                                                <div className="col-md-9">
                                                    <p className="form-control-static"> {props.cliente.cep} </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-group row">
                                                <label className="control-label text-right col-md-3">End:</label>
                                                <div className="col-md-9">
                                                    <p className="form-control-static"> {props.cliente.endereco} </p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group row">
                                                <label className="control-label text-right col-md-3">Nº:</label>
                                                <div className="col-md-9">
                                                    <p className="form-control-static">{props.cliente.numeroEndereco}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group row">
                                                <label className="control-label text-right col-md-3">Comp.:</label>
                                                <div className="col-md-9">
                                                    <p className="form-control-static"> {props.cliente.complemento} </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-group row">
                                                <label className="control-label text-right col-md-3">Bairro:</label>
                                                <div className="col-md-9">
                                                    <p className="form-control-static"> {props.cliente.bairro} </p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group row ">
                                                <label className="control-label text-right col-md-3">Ref.:</label>
                                                <div className="col-md-9">
                                                    <p className="form-control-static"> {props.cliente.referenciaEndereco} </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">

                                        <div className="col-md-6">
                                            <div className="form-group row">
                                                <label className="control-label text-right col-md-3">Cidade:</label>
                                                <div className="col-md-9">
                                                    <p className="form-control-static"> {props.cliente.cidade ? props.cliente.cidade.nome : ''} </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-group row">
                                                <label className="control-label text-right col-md-3">UF:</label>
                                                <div className="col-md-9">
                                                    <p className="form-control-static"> {props.cliente.cidade ? props.cliente.cidade.uf : ''} </p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const TabContainerEmail = (props) => {
    return (
        <div className="container">
            <br />
            <div className="card card-default" id="card_contacts">
                <div id="contacts" className="panel-collapse collapse show" aria-expanded="true">
                    <ul className="list-group pull-down" id="contact-list">
                        <li className="list-group-item">
                            <div className="row w-100">
                                <div className="col-12 col-sm-6 col-md-9 text-center text-sm-left">
                                    <h5>
                                        <span className="fa fa-phone fa-fw text-muted" data-toggle="tooltip"
                                                  title="" data-original-title="">
                                        </span> Telefones
                                    </h5>
                                    { props.telefones ?
                                        props.telefones.map(telefones => {
                                        return (
                                                <div>
                                                    <span style={{marginLeft: "25px"}} className="text-muted small">
                                                        {telefones.telefone} - {telefones.descricao}
                                                    </span>
                                                    <br/>
                                                </div>
                                            )
                                        }) : ''
                                    }
                                    <br/>
                                    <h5>
                                        <span className="fa fa-envelope fa-fw text-muted" data-toggle="tooltip"
                                               data-original-title="" title="">
                                        </span> E-mail
                                    </h5>
                                    {
                                        props.email ?
                                            props.email.map(email => {
                                                return (
                                                    <div>
                                                        <span style={{marginLeft: "25px"}} className="text-muted small text-truncate">
                                                            {email.email} - {email.descricao}
                                                        </span>
                                                        <br />
                                                    </div>
                                                )
                                            }) : ''
                                    }
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

function TabContainerSistemas() {
    return (
        <div>
            Sistemas
        </div>
    )
}

const preventDefault = (event) => {
    event.preventDefault()

}


const TabContainerAtendimentos = (props) => {
    return (
        <div>
            <br />
            <ReactTable
                NoDataComponent={CustomNoDataComponent}
                PaginationComponent={Pagination}
                data={props.atendimentos.content || []}
                columns={[
                    {
                        accessor: 'id',
                        Header: 'Protocolo'
                    },
                    {
                        accessor: 'solicitante',
                        Header: 'Solicitante',
                        minWidth: 160,
                    },
                    {
                        accessor: 'assunto',
                        Header: 'Assunto',
                        minWidth: 330,
                    },
                    {
                        id: "abertura",
                        Header: 'Data Abertura',
                        accessor: d => {
                            return moment(d.abertura)
                                .local()
                                .format("DD/MM/YYYY")
                        },
                        minWidth: 150,
                    },
                    {
                        id: "conclusao",
                        Header: 'Data Conclusão',
                        accessor: d => {
                            return moment(d.conclusao)
                                .local()
                                .format("DD/MM/YYYY")
                        },
                        minWidth: 150,
                    },
                    {
                        accessor: 'email',
                        Header: 'E-mail',
                        minWidth: 400,
                    },
                    {
                        accessor: 'cliente.id',
                        Header: 'Cód Cliente',
                        minWidth: 120,
                    },
                    {
                        accessor: 'cliente.nomeFantasia',
                        Header: 'Nome Fantasia Cliente',
                        minWidth: 250,
                    },
                    {
                        accessor: 'cliente.razaoSocial',
                        Header: 'Razão Social Cliente',
                        minWidth: 250,
                    },
                    {
                        accessor: 'funcionario.id',
                        Header: 'Cód. Func.',
                        minWidth: 220,
                    },
                    {
                        accessor: 'funcionario.nome',
                        Header: 'Nome Func.',
                        minWidth: 220,
                    },
                    {
                        accessor: 'sistema.id',
                        Header: 'Cód. Sistema',
                    },
                    {
                        accessor: 'sistema.nome',
                        Header: 'Sistema',
                    },
                    {
                        accessor: 'tipo.nome',
                        Header: 'Tipo',
                    },
                    {
                        accessor: 'concluido',
                        Header: '*',
                        show: false,
                    },
                ]}
                defaultPageSize={5}
                className="-striped -highlight"
                SubComponent={row => {
                    return (
                        <div style={{ padding: "5px" }}>
                            <em dangerouslySetInnerHTML={{ __html: row.original.textoInterno }} >
                            </em>
                        </div>
                    );
                }}
            />

            <br />

            <Button color="default btn-rounded" onClick={() => props.toggle()}>
                <i className="fa fa-search" style={{ marginRight: "5px" }}/>
                Filtro
            </Button>

            <div>
                <br />
                <Collapse isOpen={props.collapse}>
                    <Card>
                        <CardBody>
                            <form id="formConsulta" onSubmit={preventDefault}>

                                <div className="row">
                                    <div className="col-md-6">
                                        <BuscaFuncionario handleChange={props.handleChangeFuncionario} label="Funcionário Cadastro" />
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="control-label">Assunto</label>
                                            <input type="text" id="assunto" name="assunto" className="form-control" placeholder=""/>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="control-label">De</label>
                                            <input id="periodode" name="periodode" type="date" className="form-control" />
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="control-label">Até</label>
                                            <input id="periodoate" name="periodoate" type="date" className="form-control" />
                                        </div>
                                    </div>

                                </div>

                                <div className="row">

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="control-label">Solicitante</label>
                                            <input type="text" id="solicitante" name="solicitante" className="form-control" placeholder=""/>
                                        </div>
                                    </div>

                                </div>

                                <div className="text-right">
                                    <button onClick={() => props.aplicarFiltro()} className="btn btn-info btn-rounded" style={{marginLeft:'10px'}}> Aplicar Filtros</button>
                                </div>
                            </form>
                        </CardBody>
                    </Card>
                </Collapse>
            </div>

        </div>
    )
}

const TabContainerChamados = (props) => {
    return (
        <div>
            <br />
            <ReactTable
                NoDataComponent={CustomNoDataComponent}
                PaginationComponent={Pagination}
                data={props.chamados.content || []}
                columns={[
                    {
                        accessor: 'id',
                        Header: 'Protocolo',
                        show: true,
                        fixed: "left",
                    },
                    {
                        accessor: 'solicitante',
                        Header: 'Solicitante',
                        minWidth: 160,
                        show: true,
                    },
                    {
                        accessor: 'assunto',
                        Header: 'Assunto',
                        minWidth: 330,
                        show: true,
                    },
                    {
                        id: "dataHoraAbertura",
                        Header: 'Data Abertura',
                        accessor: d => {
                            return moment(d.dataHoraAbertura)
                                .local()
                                .format("DD/MM/YYYY")
                        },
                        minWidth: 150,
                        show: true,
                    },
                    {
                        accessor: 'email',
                        Header: 'E-mail',
                        minWidth: 400,
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
                        accessor: 'cliente.razaoSocial',
                        Header: 'Razão Social Cliente',
                        minWidth: 250,
                        show: true,
                    },
                    {
                        accessor: 'funcionarioCadastro.id',
                        Header: 'Cód. Func. Cadastro',
                        minWidth: 220,
                        show: true,
                    },
                    {
                        accessor: 'funcionarioCadastro.nome',
                        Header: 'Nome Func. Cadastro',
                        minWidth: 220,
                        show: true,
                    },
                    {
                        accessor: 'funcionarioResponsavel.id',
                        Header: 'Cód. Responsável',
                        show: true,
                    },
                    {
                        accessor: 'funcionarioResponsavel.nome',
                        Header: 'Nome Responsável',
                        show: true,
                    },
                    {
                        accessor: 'meio.nome',
                        Header: 'Meio',
                        show: true,
                    },
                    {
                        accessor: 'operacao.nome',
                        Header: 'Operação',
                        show: true,
                    },
                    {
                        accessor: 'prioridade.nome',
                        Header: 'Prioridade',
                        show: true,
                    },
                    {
                        accessor: 'sistema.id',
                        Header: 'Cód. Sistema',
                        show: true,
                    },
                    {
                        accessor: 'sistema.nome',
                        Header: 'Sistema',
                        show: true,
                    },
                    {
                        accessor: 'status.nome',
                        Header: 'Status',
                        show: true,
                    },
                    {
                        accessor: 'tipo.nome',
                        Header: 'Tipo',
                        show: true,
                    },
                    {
                        accessor: 'versaoSistema.id',
                        Header: 'Cód. Versão',
                        show: true,
                    },
                    {
                        accessor: 'versaoSistema.nome',
                        Header: 'Versão',
                        show: true,
                    }
                ]}
                defaultPageSize={5}
                className="-striped -highlight"
            />

            <br />

            <Button color="default btn-rounded" onClick={() => props.toggle()}>
                <i className="fa fa-search" style={{ marginRight: "5px" }}/>
                  Filtro
            </Button>

            <div>
                <br />
                <Collapse isOpen={props.collapse}>
                    <Card>
                        <CardBody>
                            <form id="formConsulta" onSubmit={preventDefault}>
                                <div className="row">

                                    <div className="col-md-4">
                                    <div className="form-group">
                                        <label className="control-label">De</label>
                                        <input id="periodode" name="periodode" type="date" className="form-control" />
                                    </div>
                                </div>

                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label className="control-label">Até</label>
                                            <input id="periodoate" name="periodoate" type="date" className="form-control" />
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label className="control-label">Tipo</label>
                                            <select className="form-control custom-select" id="data" name="data">
                                                <option selected="" value="">Selecione...</option>
                                                <option value="abertura">Abertura</option>
                                                <option value="conclusao">Conclusão</option>
                                                <option value="previsao">Previsão</option>
                                            </select>
                                        </div>
                                    </div>

                                </div>

                                <div className="row">

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="control-label">Protocolo</label>
                                            <input type="text" id="idChamado" name="idChamado" className="form-control" placeholder=""/>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <label className="control-label">Operação</label>
                                        <select name="operacao" data-placeholder="Selecione a operação" tabIndex="1" className="form-control custom-select">
                                            <option selected="" value="">Selecione...</option>
                                            {props.listaOperacao.map((item, index) =>
                                                <option  key={item.id} value={item.id}>{item.nome}</option>
                                            )}
                                        </select>
                                    </div>

                                </div>

                                <div className="text-right">
                                    <button onClick={() => props.aplicarFiltro()} className="btn btn-info btn-rounded" style={{marginLeft:'10px'}}> Aplicar Filtros</button>
                                </div>
                            </form>
                        </CardBody>
                    </Card>
                </Collapse>
            </div>
        </div>
    )
}

const TabContainerObservacao = (props) => {
    return (
        <div className="container">
            <br />
            <div className="row">
                <div className="col-lg-12">
                    <div className="card card-outline-info">
                        <div className="card-body">
                            <form className="form-material m-t-5">
                                <div className="form-group">
                                    <textarea readOnly={true} value={props.cliente.informacaoAdicional} className="form-control" rows="15"/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


class ClienteDetalhes extends Component {

    state = {
        value: 0,
        cliente: {},
        telefone: [],
        email: [],
        chamados: [],
        operacao: [],
        atendimentos: [],
        funcionario: '',
        collapse: false,
        collapseAtendimento: false,
    };

    constructor(props) {
        super(props)

        this.fechar = this.fechar.bind(this)
        this.presenter = new ClientePresenter(this)
        this.presenterAndamento = new AndamentoPresenter(this)
    }

    componentDidMount() {
        this.presenter.carregarClientePorId(this.props.idCliente)
        this.presenter.carregarTelefonePorIdCliente(this.props.idCliente)
        this.presenter.carregarEmailPorIdCliente(this.props.idCliente)
        this.presenter.carregarChamadoPorIdCliente(this.props.idCliente)
        this.presenter.carregarAtendimentoPorIdCliente(this.props.idCliente)
        this.presenterAndamento.carregarOperacaoDoAndamento()
    }

    componentDidUpdate(previousProps, previousState) {

        if (previousProps.idCliente !== this.props.idCliente) {

            this.presenter.carregarClientePorId(this.props.idCliente)
            this.presenter.carregarTelefonePorIdCliente(this.props.idCliente)
            this.presenter.carregarEmailPorIdCliente(this.props.idCliente)
            this.presenter.carregarChamadoPorIdCliente(this.props.idCliente)
            this.presenter.carregarAtendimentoPorIdCliente(this.props.idCliente)
            this.presenterAndamento.carregarOperacaoDoAndamento()

        }
    }

    handleChangeFuncionario(value) {
        this.setState( { funcionario: value} )
    }


    exibirCliente(cliente) {
        this.setState( { cliente } )
    }

    exibeTelefone(telefone) {
        this.setState( { telefone } )
    }

    exibeEmail(email) {
        this.setState( { email } )
    }

    exibeChamados(chamados) {
        this.setState( { chamados } )
    }

    exibirOperacao(operacao) {
        this.setState( { operacao } )
    }

    exibeAtendimentos(atendimentos) {
        this.setState( { atendimentos } )
    }

    handleChange = (event, value) => {
        this.setState({ value, funcionario: '' });
    }

    aplicarFiltro() {
        let strParams = window.$("form").serialize()
        this.presenter.carregarChamadoFiltroAvancadoCliente(this.props.idCliente, strParams)
    }

    aplicarFiltroAtendimento() {
        let strParams = window.$("form").serialize()
        strParams = strParams + '&funcionario=' + this.state.funcionario
        this.presenter.carregarAtendimentoFiltroAvancadoCliente(this.props.idCliente, strParams)
    }

    toggle() {
        this.setState( { collapse: !this.state.collapse } )
    }

    toggleAtendimento() {
        this.setState( { collapseAtendimento: !this.state.collapseAtendimento } )
    }

    fechar() {
        this.props.toggle()
    }

    render() {

        const { classes } = this.props;
        const { value } = this.state;

        return (
            <Modal className="myModal" size="lg" backdrop={'static'} isOpen={this.props.modal} toggle={this.props.toggle}>
                <ModalHeader>
                    <h4 className="box-title">{this.state.cliente.id} - {this.state.cliente.nomeFantasia}</h4>
                </ModalHeader>
                <ModalBody>

                    <div className="row">
                        <div className="container">
                            <div className="center">
                                <PendenciaFinanceira idCliente={this.state.cliente.id}/>
                            </div>
                        </div>
                    </div>

                    <div className={classes.root}>
                        <Tabs
                            value={value}
                            onChange={this.handleChange}
                            classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
                        >
                            <Tab
                                disableRipple
                                classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                                label="Info. Pessoais"
                            />
                            <Tab
                                disableRipple
                                classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                                label="Email/Telefone"
                            />
                            <Tab
                                disableRipple
                                classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                                label="Atendimentos"
                            />
                            <Tab
                                disableRipple
                                classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                                label="Chamados"
                            />
                            <Tab
                                disableRipple
                                classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                                label="Observações"
                            />
                        </Tabs>
                        {value === 0 && <TabContainerCliente cliente={this.state.cliente}></TabContainerCliente>}
                        {value === 1 && <TabContainerEmail cliente={this.state.cliente} telefones={this.state.telefone} email={this.state.email}></TabContainerEmail>}
                        {value === 2 && <TabContainerAtendimentos atendimentos={this.state.atendimentos}
                                                                  toggle={this.toggleAtendimento.bind(this)}
                                                                  collapse={this.state.collapseAtendimento}
                                                                  handleChangeFuncionario={this.handleChangeFuncionario.bind(this)}
                                                                  aplicarFiltro={this.aplicarFiltroAtendimento.bind(this)} ></TabContainerAtendimentos>}
                        {value === 3 && <TabContainerChamados listaOperacao={this.state.operacao || []}
                                                              toggle={this.toggle.bind(this)}
                                                              chamados={this.state.chamados}
                                                              collapse={this.state.collapse}
                                                              aplicarFiltro={this.aplicarFiltro.bind(this)}></TabContainerChamados>}
                        {value === 4 && <TabContainerObservacao cliente={this.state.cliente}></TabContainerObservacao>}
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={this.fechar}>Fechar</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

ClienteDetalhes.propTypes = {
    idCliente: PropTypes.number.isRequired,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ClienteDetalhes)