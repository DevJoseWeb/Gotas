import { buscarVersaoSistemaPorId, buscarVersaoSistemaPorNome } from '../../api/VersaoSistemaApi'

export default class BuscaVersaoSistemaPresenter {

    constructor(view){
        this.view = view
    }

    _tratarResponse(response) {
        switch(response.status) {
            case 204:
                this.view.exibirMensagemNaoEncontrado()
                break
            default:
                response.json().then(versao => this.view.exibeVersao(versao))
        }
    }

    carregarVersaoSistemaPorId(id) { buscarVersaoSistemaPorId(id).then(response => this._tratarResponse(response)) }

    carregarVersaoSistemaPorNome(nome) { buscarVersaoSistemaPorNome(nome).then(response => this.view.exibeVersao(response)) }
}