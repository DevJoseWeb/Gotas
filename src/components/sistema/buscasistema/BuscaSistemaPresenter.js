import { buscarSistemaPorId, buscarSistemaPorNome } from '../../api/SistemaApi'

export default class BuscaSistemaPresenter {

    constructor(view) {
        this.view = view
    }

    _tratarResponse(response) {
        switch(response.status) {
            case 204:
                this.view.exibirMensagemNaoEncontrado()
                break
            default:
                response.json().then(sistema => this.view.exibeSistema(sistema))
        }
    }

    carregarSistemaPorId(id) { buscarSistemaPorId(id).then(response => this._tratarResponse(response)) }

    carregarSistemaPorNome(nome) { buscarSistemaPorNome(nome).then(response => this._tratarResponse(response)) }
}