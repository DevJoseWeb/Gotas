import {
    buscarFuncionarioFeedbackChamado,
    deletarFuncionarioFeedbackChamado,
    inserirFuncionarioFeedbackChamado
} from "../../api/FeedbackApi"

export default class FeedbackPresenter {

    constructor(view) {
        this.view = view
    }

    _tratarResponseFuncionarioFeedback(response) {
        switch (response.status) {
            case 400:
                response.json().then(error => {
                    console.log(error)
                })
                break
            default:
                response.json().then(feedback => this.view.exibirFeedback(feedback))
        }
    }


    carregarFuncionarioFeedbackChamado(chamado) {
        buscarFuncionarioFeedbackChamado(chamado)
            .then(response => this._tratarResponseFuncionarioFeedback(response))
    }

    excluirFuncionarioFeedbackChamado(chamado){
        deletarFuncionarioFeedbackChamado(chamado)
            .then(response => console.log(response))
    }

    adicionarFuncionarioFeedbackChamado(chamado){
        inserirFuncionarioFeedbackChamado(chamado)
            .then(response => console.log(response))
    }

}