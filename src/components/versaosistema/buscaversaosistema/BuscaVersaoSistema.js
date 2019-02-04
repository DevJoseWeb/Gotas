import React, { Component } from 'react'
import { connect } from 'react-redux'
import { filtrarVersaoSistema, exibirVersaoSistemaNaoEncontrado } from '../VersaoSistemaAction'
import BuscaVersaoSistemaPresenter from './BuscaVersaoSistemaPresenter'

class BuscaVersaoSistema extends Component {
    
    exibeVersao(versao) {
        this.props.dispatch(filtrarVersaoSistema(versao))
    }

    exibirMensagemNaoEncontrado(){
        this.props.dispatch(exibirVersaoSistemaNaoEncontrado())
    }  

    componentDidMount(){
        this.presenter = new BuscaVersaoSistemaPresenter(this)

        this.presenter.carregarVersaoSistemaPorId(1000)  
    }

    renderMensagemNaoEncontrado(){
        if (this.props.versaoSistemaNaoEncontrado === true) {
            return (
                <div className="alert-danger">
                    Versão Sistema Não Encontrado!
                </div>
            )
        }   
        return null
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
        lista: state.versaosistemaStore.lista,
        versaoSistemaNaoEncontrado: state.versaosistemaStore.versaoSistemaNaoEncontrado 
    }
)

export default connect(mapStateToProps)(BuscaVersaoSistema)