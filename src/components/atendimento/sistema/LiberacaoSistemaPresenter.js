import {
    executaLiberacaoSistema
} from "../../api/LiberacaoSistemaApi"

export default class LiberacaoSistemaPresenter {

    constructor(view) {
        this.view = view
    }

    _tratarResponseLiberacaoSistema(response) {
        switch (response.status) {
            case 200:
                response.json().then(liberacao => this.view.exibirLiberacaoSistema(liberacao))
            case 401:
                this.view.exibeMensagemUnauthorized()
                break
            case 403:
                this.view.exibeMensagemForbidden()
                break
            default:
                response.json().then(error => {
                    console.log(error)
                })
        }
    }

    liberacaoSistema(cliente, filial, idSistema){
        executaLiberacaoSistema(cliente, filial, idSistema)
            .then(response => this._tratarResponseLiberacaoSistema(response))
    }

}