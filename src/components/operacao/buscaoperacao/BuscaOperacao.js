import React, { Component } from 'react'
import { connect } from 'react-redux'
import BuscaOperacaoPresenter from './BuscaOperacaoPresenter'
import { filtrarOperacao, exibirOperacaoNaoEncontrada } from '../OperacaoAction';

class BuscaOperacao extends Component {
    
    exibeOperacao(operacao) {
        this.props.dispatch(filtrarOperacao(operacao))
    }

    exibirMensagemNaoEncontrado(){
        this.props.dispatch(exibirOperacaoNaoEncontrada())
    }   
    
    renderMensagemNaoEncontrado(){
        if (this.props.operacaoNaoEncontrada === true) {
            return (
                <div className="alert-danger">
                    Operação Não Encontrado!
                </div>
            )
        }   
        return null
    }     


    componentDidMount() {
        this.presenter = new BuscaOperacaoPresenter(this)

        this.presenter.carregaOperacaoPorId(1)
    }

    render() {
        return (
            <div>
                {console.log(this.props.lista)}
                {this.renderMensagemNaoEncontrado()}
            </div>        
        );
    }
}

const mapStateToProps = state => (
    { 
        lista: state.operacaoStore.lista,
        operacaoNaoEncontrada: state.operacaoStore.operacaoNaoEncontrada 
    }
)

export default connect(mapStateToProps)(BuscaOperacao);