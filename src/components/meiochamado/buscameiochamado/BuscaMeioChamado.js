import React, { Component } from 'react'
import { connect } from 'react-redux'
import BuscaMeioChamadoPresenter from './BuscaMeioChamadoPresenter'
import { filtrarMeioChamado, exibirMeioChamadoNaoEncontrado } from '../MeiochamadoAction';

class BuscaMeioChamado extends Component {

    exibeMeioChamado(meiochamado) {
        this.props.dispatch(filtrarMeioChamado(meiochamado))
    }

    exibirMensagemNaoEncontrado(){
        this.props.dispatch(exibirMeioChamadoNaoEncontrado())
    }     

    renderMensagemNaoEncontrado(){
        if (this.props.meioChamadoNaoEncontrado === true) {
            return (
                <div className="alert-danger">
                    Meio Chamado Não Encontrado!
                </div>
            )
        }   
        return null
    }     

    componentDidMount(){
        this.presenter = new BuscaMeioChamadoPresenter(this)

        this.presenter.carregarMeioChamadoPorNome('Emssdsds')
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
        lista: state.meiochamadoStore.lista,
        meioChamadoNaoEncontrado: state.meiochamadoStore.meioChamadoNaoEncontrado
    }
)

export default connect(mapStateToProps)(BuscaMeioChamado);