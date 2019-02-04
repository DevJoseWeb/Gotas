import {
    buscarAtuacao,
    saveAtuacao,
    deleteAtuacao
} from '../../api/AtuacaoApi'

export default class AtuacaoPresenter {

    constructor(view) {
        this.view = view
    }

    _tratarResponseAtuacao(response) {
        switch (response.status) {
            case 200:
                response.json().then(atuacao => this.view.exibirAtuacao(atuacao))
                break
            default:
                response.json().then(erro => console.log(erro))
        }
    }

    
    _tratarGravarAtuacao(response) {
        console.log(response.status)
        switch (response.status) {
            case 204:
                this.view.atualizaAtuacao(true) 
                break
            default:
                response.json().then(erro => console.log(erro))
        }
    }

    _tratarDeleteAtuacao(response) {
        console.log(response.status)
        switch (response.status) {
            case 204:
                this.view.atualizaAtuacao(false)
                break
            default:
                response.json().then(erro => console.log(erro))
        }
    }

    carregarAtuacao(id) {
        buscarAtuacao(id)
            .then(response => this._tratarResponseAtuacao(response))
    }

    gravarAtuacao(idChamado) {
        saveAtuacao(idChamado)
            .then(response => this._tratarGravarAtuacao(response))
    }

    cancelarAtuacao(idChamado) {
        deleteAtuacao(idChamado)
            .then(response => this._tratarDeleteAtuacao(response))
    }
}


