import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fitlrarChamado, exibirChamadoNaoEncontrado } from '../ChamadoAction'
import BuscaChamadoPresenter from './BuscaChamadoPresenter'

class BuscaChamado extends Component {

    exibirChamado(chamado) {
        this.props.dispatch(fitlrarChamado(chamado))
    }

    exibirMensagemNaoEncontrado(){
        this.props.dispatch(exibirChamadoNaoEncontrado())
    }

    renderMensagemNaoEncontrado() {
        if(this.props.chamadoNaoEncontrado === true) {
            return (
                <div className="alert-danger" >
                    Chamado não encontrado                    
                </div>
            )
        }

        return null
    }    

    componentDidMount(){
        this.presenter = new BuscaChamadoPresenter(this)       

        this.presenter.carregarChamadoPorId(1)
    }

    render() {
        return (
            <div>
                {console.log(this.props.lista)}
                {this.renderMensagemNaoEncontrado()}
            </div>
        )
    }
}

const mapStateToProps = state => (
    { 
        lista: state.chamadoStore.lista, 
        chamadoNaoEncontrado: state.chamadoStore.chamadoNaoEncontrado 
    }
)

export default connect(mapStateToProps)(BuscaChamado)