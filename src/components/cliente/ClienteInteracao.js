import React, {Component} from 'react'
import PropTypes from "prop-types"
import ClientePresenter from "./ClientePresenter";

class ClienteInteracao extends Component {

    state = {
        interacao: {}
    }

    constructor(props) {
        super(props)

        this.presenter = new ClientePresenter(this)
    }

    componentDidMount() {
        this.presenter.carregarInteracaoPorIdCliente(this.props.idCliente)
    }

    exibeInteracao(interacao) {
        this.setState( { interacao } )
    }

    renderRowsNovasFuncionalidades() {
        if (!this.state.interacao.chamadoLimite) return null

        if (!this.state.interacao.chamadoLimite.sistemas) return null

        return this.state.interacao.chamadoLimite.sistemas.map(itens => (
            <tr>
                <td>{itens.sistema.descricao}</td>
                <td>{itens.limite}</td>
                <td>{itens.quantidade}</td>
            </tr>
        ))

    }

    renderRowResumo() {
        if (!this.state.interacao.resumo) return null

        return this.state.interacao.resumo.map(itens => (
            <tr>
                <td>{itens.descricao}</td>
                <td>{itens.qtd}</td>
            </tr>
        ))

    }

    render() {
        return (

            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-lg-6">
                            <h4 className="card-title">Solicitação/Nova Funcionalidade</h4>
                            <h6 className="card-subtitle">Grupo: <em> {this.state.interacao.grupo ? this.state.interacao.grupo.descricao : ''} </em></h6>
                            <div className="table-responsive">
                                <table className="table color-table primary-table">
                                    <thead>
                                    <tr>
                                        <th>Sistema</th>
                                        <th>Limite</th>
                                        <th>Lançado</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {this.renderRowsNovasFuncionalidades()}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <h4 className="card-title">Atendimentos/Chamados</h4>
                            <h6 className="card-subtitle">Grupo: <em> {this.state.interacao.grupo ? this.state.interacao.grupo.descricao : ''} </em></h6>
                            <div className="table-responsive">
                                <table className="table color-table primary-table">
                                    <thead>
                                    <tr>
                                        <th>Tipo</th>
                                        <th>Quantidade</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {this.renderRowResumo()}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ClienteInteracao.propTypes = {
    idCliente: PropTypes.number.isRequired,
};

export default ClienteInteracao;