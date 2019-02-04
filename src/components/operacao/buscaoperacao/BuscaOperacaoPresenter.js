import { buscarOperacoes, buscarOperacaoPorId, buscarOperacaoPorNome } from '../../api/OperacaoApi'

export default class BuscaOperacaoPresenter {

    constructor(view) {
        this.view = view
    }

    _tratarResponse(response) {
        switch(response.status){
            case 204:
                this.view.exibirMensagemNaoEncontrado()
                break
            default:
                response.json().then(operacao => this.view.exibeOperacao(operacao))
                break
        }
    }

    carregaOperacao() { buscarOperacoes().then(operacoes => this._tratarResponse(operacoes)) }

    carregaOperacaoPorId(id) { buscarOperacaoPorId(id).then(operacao => this._tratarResponse(operacao)) }

    carregaOperacaoPorNome(nome) {buscarOperacaoPorNome(nome).then(operacao => this._tratarResponse(operacao)) }
}