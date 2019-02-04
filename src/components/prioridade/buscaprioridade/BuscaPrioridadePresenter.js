import { buscarPrioridadePorId, buscarPrioridadePorNome } from '../../api/PrioridadeApi'

export default class BuscaPrioridadePresenter {

    constructor(view) {
        this.view = view
    }

    _tratarResponse(response){
        switch(response.status) {
            case 204:
                this.view.exibirMensagemNaoEncontrado()
                break
            default:
                response.json().then(prioridade => this.view.exibePrioridade(prioridade))
                break
        }
    }

    carregarPrioridadePorId(id) { buscarPrioridadePorId(id).then(response => this._tratarResponse(response)) }

    carregarPrioridadePorNome(nome) { buscarPrioridadePorNome(nome).then(response => this._tratarResponse(response)) }
}