import React, {Component} from 'react'
import {connect} from 'react-redux'
import {exibirSetorNaoEncontrado, filtrarSetor} from '../SetorAction'
import BuscaSetorPresenter from './BuscaSetorPresenter'

class BuscaSetor extends Component {

    exibeSetor(setor) {
        this.props.dispatch(filtrarSetor(setor))
    }

    exibirMensagemNaoEncontrado(){
        this.props.dispatch(exibirSetorNaoEncontrado())
    } 
    
    renderMensagemNaoEncontrado(){
        if (this.props.setorNaoEncontrado === true) {
            return (
                <div className="alert-danger">
                    Setor Não Encontrado!
                </div>
            )
        }   
        return null
    }     

    componentDidMount(){
        this.presenter = new BuscaSetorPresenter(this)
    }

    cliqueBotao(){
        this.presenter.carregarSetorPorNome("Dese")

        /*setTimeout(function() {
                this.cliqueBotao()
            }
            .bind(this),
            20000
        );*/
    }

    render() {
        return (
            <div>
                {console.log(this.props.lista)}
                {this.renderMensagemNaoEncontrado()}
                <button className="btn btn-primary" onClick={() => this.cliqueBotao()}>Carregar Setor</button>
            </div>
        );
    }
}

const mapStateToProps = state => (
    { 
        lista: state.setorStore.lista,
        setorNaoEncontrado: state.setorStore.setorNaoEncontrado 
    }
)

export default connect(mapStateToProps)(BuscaSetor);