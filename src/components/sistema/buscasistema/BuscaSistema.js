import React, { Component } from 'react'
import { connect } from 'react-redux'

import { filtrarSistema, exibirSistemaNaoEncontrado } from '../SistemaAction'
import BuscaSistemaPresenter from './BuscaSistemaPresenter'

class BuscaSistema extends Component {
    
    exibeSistema(sistema) {
        this.props.dispatch(filtrarSistema(sistema))
    }

    exibirMensagemNaoEncontrado(){
        this.props.dispatch(exibirSistemaNaoEncontrado())
    }     

    componentDidMount(){
        this.presenter = new BuscaSistemaPresenter(this)

        this.presenter.carregarSistemaPorId(589)
    }

    renderMensagemNaoEncontrado(){
        if (this.props.sistemaNaoEncontrado === true) {
            return (
                <div className="alert-danger">
                    Sistema Não Encontrado!
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
        lista: state.sistemaStore.lista,
        sistemaNaoEncontrado: state.sistemaStore.sistemaNaoEncontrado 
    }
)

export default connect(mapStateToProps)(BuscaSistema)