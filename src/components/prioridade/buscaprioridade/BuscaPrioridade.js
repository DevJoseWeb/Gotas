import React, { Component } from 'react'
import { connect } from 'react-redux'
import { filtrarPrioridade, exibirPrioridadeNaoEncontrada } from '../PrioridadeAction'
import  BuscaPrioridadePresenter from './BuscaPrioridadePresenter'

class BuscaPrioridade extends Component {
    
    exibePrioridade(prioridade) {
        this.props.dispatch(filtrarPrioridade(prioridade))
    }

    exibirMensagemNaoEncontrado(){
        this.props.dispatch(exibirPrioridadeNaoEncontrada())
    }   
    
    renderMensagemNaoEncontrado(){
        if (this.props.prioridadeNaoEncontrada === true) {
            return (
                <div className="alert-danger">
                    Prioridade Não Encontrado!
                </div>
            )
        }   
        return null
    }      

    componentDidMount(){
        this.presenter = new BuscaPrioridadePresenter(this)

        this.presenter.carregarPrioridadePorId(3)
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
        lista: state.prioridadeStore.lista, 
        prioridadeNaoEncontrada: state.prioridadeStore.prioridadeNaoEncontrada
    }
)

export default connect(mapStateToProps)(BuscaPrioridade);