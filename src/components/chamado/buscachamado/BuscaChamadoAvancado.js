import React, {Component} from 'react'
import {connect} from 'react-redux'
import BuscaChamadoPresenter from './BuscaChamadoPresenter'
import ChamadoPresenter from '../ChamadoPresenter'
import SetorPresenter from '../../setor/buscasetor/BuscaSetorPresenter'
import {
    exibirChamadoNaoEncontrado,
    exibirMeioChamado,
    exibirPrioridade,
    exibirSistema,
    filtrarChamado
} from '../ChamadoAction'
import BuscaStatus from "../../status/buscastatus/BuscaStatus"
import {MODO_PESQUISA_CLIENTE} from "../../../base"
import {hotkeys} from 'react-keyboard-shortcuts'
import {filtrarSetor} from "../../setor/SetorAction"
import BuscaVersao from "../../versaosistema/buscaversaosistema/BuscaVersao"
import BuscaFuncionario from "../../funcionario/buscafuncionario/BuscaFuncionario"
import PropTypes from "prop-types"
import BuscaClienteTypeahead from "../../cliente/buscacliente/BuscaClienteTypeahead";

class BuscaChamadoAvancado extends Component {
    
    constructor() {
        super()

        this.state = {
            obj: {
                solicitante: '',
                assunto: '',
                operacao: '',
                cliente: '',
                setor: '',
                sistema: '',
                versao: '',
                meio: '',
                cadastro: '',
                responsavel: '',
                desenvolvedor: '',
                teste: '',
                prioridade: '',
                status: '',
                data: '',
                periodode: '',
                periodoate: ''
            },
            modoPesquisaCliente: 'nome',
            textoModoPesquisaCliente: 'Consulta por nome'
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChangeStatus(value){
        this.setState( {obj:{ ...this.state.obj, status: value}} );
    }

    handleChangeCliente(value){
        this.setState( {obj:{ ...this.state.obj, cliente: value}} )
    }

    handleChangeVersao(value){
        this.setState( {obj:{ ...this.state.obj, versao: value}} )
    }

    handleChangeFuncionarioCadastro(value) {
        this.setState( {obj:{ ...this.state.obj, cadastro: value}} )
    }

    handleChangeFuncionarioTeste(value){
        this.setState( {obj:{ ...this.state.obj, teste: value}} )
    }

    handleChangeFuncionarioDesenvolvedor(value){
        this.setState( {obj:{ ...this.state.obj, desenvolvedor: value}} )
    }

    handleChangeFuncionarioResponsavel(value){
        this.setState( {obj:{ ...this.state.obj, responsavel: value}} )
    }

    onChangePeriodoDe(event) {
        this.setState({ obj: { ...this.state.obj, periodode: event.target.value } })
    }

    onChangePeriodoAte(event) {
        this.setState({ obj: { ...this.state.obj, periodoate: event.target.value } })
    }

    onChangeTipoData(event) {
        this.setState({ obj: { ...this.state.obj, data: event.target.value } })
    }

    onChangeFiltroSolicitante(event) {
        this.setState({ obj: { ...this.state.obj, solicitante: event.target.value } })
    }

    onChangeFiltroAssunto(event) {
        this.setState({ obj: { ...this.state.obj, assunto: event.target.value } })
    }

    onChangeFiltroMeio(event) {
        this.setState({ obj: { ...this.state.obj, meio: event.target.value } })
    }

    onChangeFiltroSistema(event) {
        this.setState({ obj: { ...this.state.obj, sistema: event.target.value } })
    }

    onChangeFiltroPrioridade(event) {
        this.setState({ obj: { ...this.state.obj, prioridade: event.target.value } })
    }

    onChangeFiltroSetor(event) {
        this.setState({ obj: { ...this.state.obj, setor: event.target.value } })
    }

    exibirMeio(meio) {this.props.dispatch(exibirMeioChamado(meio))}
    exibirPrioridade(prioridade) {this.props.dispatch(exibirPrioridade(prioridade))}
    exibirSistema(sistema) {this.props.dispatch(exibirSistema(sistema))}
    exibeSetor(setor) {this.props.dispatch(filtrarSetor(setor))}

    hot_keys = {
        'f2': {
            priority: 1,
            handler: (event) => this.keyHandler(),
        },
    }

    close(event){
        event.preventDefault()
        this.props.close()
    }

    keyHandler(event){

        let values = Object.values(MODO_PESQUISA_CLIENTE);
        let nextIndex = values.indexOf(this.state.modoPesquisaCliente) + 1;
        let nextValue = values[nextIndex]

        if (nextValue) {
            this.setState({
                modoPesquisaCliente: nextValue,
                textoModoPesquisaCliente: 'Consulta por ' + nextValue
            })
        } else {
            this.setState({
                modoPesquisaCliente: MODO_PESQUISA_CLIENTE.Nome,
                textoModoPesquisaCliente: 'Consulta por nome'
            })
        }

    }

    componentDidMount() {
        this.presenter = new BuscaChamadoPresenter(this)
        this.chamadoPresenter = new ChamadoPresenter(this)
        this.setorPresenter = new SetorPresenter(this)

        this.chamadoPresenter.carregarMeioDoChamado()
        this.chamadoPresenter.carregarPrioridadeDoChamado()
        this.chamadoPresenter.carregarSistemaDoChamado()
        this.setorPresenter.carregarSetorPorNome('')
    }

    exibirChamado(chamado) {
        this.props.dispatch(filtrarChamado(chamado))
    }

    exibirMensagemNaoEncontrado(){
        this.props.dispatch(exibirChamadoNaoEncontrado())
    }    

    renderMensagemNaoEncontrado() {
       /* if(this.props.chamadoNaoEncontrado === true) {
            return (
                <div className="alert-danger" >
                    Chamado não encontrado                    
                </div>
            )
        } */

        return null
    }     

    renderFormulario() {
        return (
            <form id="formConsulta" onSubmit={this.handleSubmit}>
                <div className="form-body">

                    <div className="row">

                        <div className="col-md-4">
                            <div className="form-group">
                                <label className="control-label">De</label>
                                <input onChange={this.onChangePeriodoDe.bind(this)}
                                       id="periodode"
                                       name="periodode"
                                       type="date"
                                       className="form-control" />
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="form-group">
                                <label className="control-label">Até</label>
                                <input onChange={this.onChangePeriodoAte.bind(this)}
                                       id="periodoate"
                                       name="periodoate"
                                       type="date"
                                       className="form-control" />
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="form-group">
                                <label className="control-label">Tipo</label>
                                <select onChange={this.onChangeTipoData.bind(this)} value={this.state.obj.data} className="form-control custom-select" id="data" name="data">
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
                            <BuscaStatus handleChange={this.handleChangeStatus.bind(this)}/>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="control-label">Solicitante</label>
                                <input onChange={this.onChangeFiltroSolicitante.bind(this)}
                                       value={this.state.obj.solicitante}
                                       type="text"
                                       id="solicitante"
                                       name="solicitante"
                                       className="form-control"
                                       placeholder=""/>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6 m-b-10">
                            <label>Cliente <small className="form-control-feedback"> {`(${this.state.textoModoPesquisaCliente})`}</small> </label>
                            <BuscaClienteTypeahead paramPesquisa={this.state.modoPesquisaCliente} handleChange={this.handleChangeCliente.bind(this)}/>
                            <small className="form-control-feedback"> F2 alterar modo de pesquisa </small>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="control-label">Assunto</label>
                                <input value={this.state.obj.assunto} onChange={this.onChangeFiltroAssunto.bind(this)} type="text" id="assunto" name="assunto" className="form-control" placeholder=""/>
                            </div>
                        </div>
                    </div>

                    <div className="row m-b-20">
                        <div className="col-md-6">
                            <label className="control-label">Meio</label>
                            <select
                                onChange={this.onChangeFiltroMeio.bind(this)}
                                value={this.state.obj.meio}
                                name="meio"
                                data-placeholder="Selecione o meio"
                                tabIndex="1"
                                className="form-control custom-select" >
                                <option selected="" value="">Selecione...</option>
                                {this.props.listaMeio.map((item, index) =>
                                    <option key={item.id} value={item.id}>{item.nome}</option>
                                )}
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label className="control-label">Sistema</label>
                            <select
                                onChange={this.onChangeFiltroSistema.bind(this)}
                                value={this.state.obj.sistema}
                                name="sistema"
                                data-placeholder="Selecione o Sistema"
                                tabIndex="5"
                                className="form-control custom-select" >
                                <option selected="" value="">Selecione...</option>
                                {this.props.listaSistema.map((item, index) =>
                                    <option key={item.id} value={item.id}>{item.nome}</option>
                                )}
                            </select>
                        </div>
                    </div>

                    <div className="row m-b-20">
                        <div className="col-md-6 ">
                                <label className="control-label">Prioridade</label>
                                <select
                                    onChange={this.onChangeFiltroPrioridade.bind(this)}
                                    value={this.state.obj.prioridade}
                                    name="prioridade"
                                    data-placeholder="Selecione a Prioridade"
                                    tabIndex="6"
                                    className="form-control custom-select" >
                                    <option selected="" value="">Selecione...</option>
                                    {this.props.listaPrioridade.map((item, index) =>
                                        <option key={item.id} value={item.id}>{item.nome}</option>
                                    )}
                                </select>
                        </div>
                        <div className="col-md-6">
                            <label className="control-label">Setor</label>
                            <select
                                onChange={this.onChangeFiltroSetor.bind(this)}
                                value={this.state.obj.setor}
                                name="setor"
                                data-placeholder="Selecione a Prioridade"
                                tabIndex="6"
                                className="form-control custom-select" >
                                <option selected="" value="">Selecione...</option>
                                {this.props.listaSetor.map((item, index) =>
                                    <option key={item.id} value={item.id}>{item.nome}</option>
                                )}
                            </select>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <BuscaVersao handleChange={this.handleChangeVersao.bind(this)} />
                        </div>
                        <div className="col-md-6">
                            <BuscaFuncionario handleChange={this.handleChangeFuncionarioCadastro.bind(this)} label="Funcionário Cadastro" />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <BuscaFuncionario handleChange={this.handleChangeFuncionarioResponsavel.bind(this)} label="Funcionário Responsável" />
                        </div>
                        <div className="col-md-6">
                            <BuscaFuncionario handleChange={this.handleChangeFuncionarioDesenvolvedor.bind(this)} label="Funcionário Desenvolvedor" />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <BuscaFuncionario handleChange={this.handleChangeFuncionarioTeste.bind(this)} label="Funcionário Teste" />
                        </div>
                    </div>

                    <div className="text-right">
                        <button onClick={this.close.bind(this)} className="btn btn-secondary btn-rounded"> Cancelar</button>
                        <button className="btn btn-info btn-rounded" style={{marginLeft:'10px'}}> Aplicar Filtros</button>
                    </div>

                </div>

            </form>

        )
    }

    handleSubmit(event) {
        event.preventDefault()        
        //this.presenter.carregarChamadoPorFiltroAvancado( search)
        this.props.filtrarChamado(this.state.obj)
        //this.props.close()
    }    

    render() {
        return (
            <div className="container">
                {this.renderFormulario()}
                {this.renderMensagemNaoEncontrado()}                
            </div>        
        );
    }
}

const mapStateToProps = state => (
    { 
        lista: state.chamadoStore.lista, 
        chamadoNaoEncontrado: state.chamadoStore.chamadoNaoEncontrado,
        listaMeio: state.chamadoStore.listaMeio,
        listaPrioridade: state.chamadoStore.listaPrioridade,
        listaSistema: state.chamadoStore.listaSistema,
        listaSetor: state.setorStore.lista
    }
)

BuscaChamadoAvancado.propTypes = {
    close: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(hotkeys(BuscaChamadoAvancado))