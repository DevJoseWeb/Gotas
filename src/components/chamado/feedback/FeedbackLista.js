import React, {Component} from 'react'
import {connect} from 'react-redux'
import FeedbackPresenter from "./FeedbackPresenter"
import {filtrarFeedbackChamado} from "./FeedbackAction"
import ChamadoLista from "../ChamadoLista";

class FeedbackLista extends Component {

    componentDidMount() {
        this.presenter = new FeedbackPresenter(this)
        this.presenter.carregarFuncionarioFeedbackChamado(10)
    }

    exibirFeedback(feedback) {
        this.props.dispatch(filtrarFeedbackChamado(feedback))
    }

    render() {
        return (
            <div>
                {console.log(this.props.listaFeedback)}
            </div>
        );
    }
}

const mapStateToProps = state => (
    {
        listaFeedback: state.feedbackStore.listaFeedback
    }
)

export default connect(mapStateToProps)(FeedbackLista)