import { buscarMeioChamadoPorId, buscarMeioChamadoPorNome } from '../../api/MeioChamadoApi'

export default class BuscaMeioChamadoPresenter {

    constructor(view) {
        this.view = view
    }

    _trataResponse(response) {
        switch(response.status) {
            case 204:
                this.view.exibirMensagemNaoEncontrado()
                break
            default:
                response.json().then(meiochamado => this.view.exibeMeioChamado(meiochamado))
        }
    }

    carregarMeioChamadoPorId(id) { buscarMeioChamadoPorId(id).then(response => this._trataResponse(response)) }

    carregarMeioChamadoPorNome(nome) { buscarMeioChamadoPorNome(nome).then(response => this._trataResponse(response)) }

}