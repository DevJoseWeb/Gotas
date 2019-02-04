import React, {Component} from 'react'
import PropTypes from "prop-types"
import PageTitles from "../../commom/template/PageTitles"
import PendenciaFinanceira from "../cliente/PendenciaFinanceira";
import moment from "moment";
import ClienteDetalhes from "../cliente/ClienteDetalhes";

class AtendimentoDetalhes extends Component {

    state = {
        atendimento: this.props.atendimento,
        modalDetalhes: false,
    }

    constructor(props) {
        super(props)

        this.toggleModalDetalhesCliente = this.toggleModalDetalhesCliente.bind(this)
    }

    componentDidUpdate(previousProps, previousState) {

        if (previousProps.atendimento !== this.props.atendimento) {
            this.setState({atendimento: this.props.atendimento})
        }
    }

    toggleModalDetalhesCliente() {
        this.setState({
            modalDetalhes: !this.state.modalDetalhes
        })
    }

    render() {
        return (
            <div>
                <PageTitles pagina="Detalhes do Atendimento" />

                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="right-page-header">

                                    <div className="d-flex">
                                        <div className="align-self-center">
                                            <h4 className="card-title">Atendimento</h4>
                                            <h6 className="card-subtitle">Detalhes do Atendimento </h6>
                                        </div>
                                    </div>

                                    <div className="button-group andamentos-button">

                                        <button onClick={this.props.voltar} type="button" className="btn btn-danger btn-rounded">
                                            Voltar
                                        </button>

                                    </div>
                                </div>

                                <div className="card">
                                    <div className="card-body">

                                        <div className="row">
                                            <div className="container">
                                                <div className="center">
                                                    <PendenciaFinanceira idCliente={this.state.atendimento.cliente.id}/>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="row">
                                            <div id='card-inf' className="col-md-4">
                                                <small className="text-muted">Nº Atendimento</small>
                                                <h6>{this.state.atendimento.id}</h6>

                                                <small className="text-muted">Solicitante</small>
                                                <h6>{this.state.atendimento.solicitante}</h6>


                                                <small className="text-muted">Sistema</small>
                                                <h6>{this.state.atendimento.sistema.id} - {this.state.atendimento.sistema.nome}</h6>

                                            </div>

                                            <div className="col-md-4">
                                                <small className="text-muted">Data</small>
                                                <h6>
                                                    {moment(this.state.atendimento.abertura).format('DD/MM/Y') + "  "}
                                                    Inicio: {moment(this.state.atendimento.abertura).format('H:mm:ss') + "  "}
                                                    Fim: {moment(this.state.atendimento.conclusao).format('H:mm:ss') + "  "}

                                                    ({this.retornaDiffHoras(this.state.atendimento.abertura, this.state.atendimento.conclusao)})
                                                </h6>

                                                <small className="text-muted">Cliente</small>
                                                <h6>
                                                    <a href="#" className="link m-r-10" onClick={this.toggleModalDetalhesCliente}>
                                                        {this.state.atendimento.cliente.id} - {this.state.atendimento.cliente.razaoSocial}
                                                        <i style={{marginLeft: "10px"}} className='fas fa-search'></i>
                                                    </a>
                                                </h6>

                                                <small className="text-muted">E-mail</small>
                                                <h6>{this.state.atendimento.email}</h6>

                                            </div>


                                            <div className="col-md-4">
                                                <small className="text-muted">Funcionário</small>
                                                <h6>{this.state.atendimento.funcionario.id} - {this.state.atendimento.funcionario.nome}</h6>

                                                <small className="text-muted">Assunto</small>
                                                <h6>{this.state.atendimento.assunto}</h6>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-12">
                                                <small className="text-muted">Situação Atual do Cliente</small>
                                                <form className="m-t-5">
                                                    <div className="form-group">
                                                        <textarea readOnly={true} value="" className="form-control" rows="5"/>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6 b-r">
                                                <small className="text-muted">Texto Interno / Problema Relatado</small>
                                                <div dangerouslySetInnerHTML={{ __html: this.state.atendimento.textoInterno }} />
                                            </div>

                                            <div className="col-md-6">
                                                <small className="text-muted">Texto Externo / Conclusão</small>
                                                <div dangerouslySetInnerHTML={{ __html: this.state.atendimento.textoCliente }} />
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <ClienteDetalhes idCliente={this.state.atendimento.cliente.id} modal={this.state.modalDetalhes} toggle={this.toggleModalDetalhesCliente}/>

            </div>
        );
    }

    retornaDiffHoras(dtInicio, dtFim) {
        var ms = moment(dtFim,"DD/MM/YYYY HH:mm:ss").diff(moment(dtInicio,"DD/MM/YYYY HH:mm:ss"));
        var d = moment.duration(ms);
        var s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");

        return s
    }
}

AtendimentoDetalhes.propTypes = {
    atendimento: PropTypes.object.isRequired,
    voltar: PropTypes.func.isRequired
};

export default AtendimentoDetalhes