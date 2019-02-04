import { buscarFuncionarioPorId, buscarFuncionarioPorNome } from '../../api/FuncionarioApi'

export default class BuscaFuncionarioPresenter {

    constructor(view) {
        this.view = view
    }

    _trataResponse(response) {
        switch(response.status) {
            case 204:
                this.view.exibirMensagemNaoEncontrado()
                break
            default:
                response.json().then(funcionario => this.view.exibirFuncionario(funcionario))
        }
    }

    _trataResponsefuncionario(response) {
        switch(response.status) {
            case 204:
                this.view.exibirMensagemNaoEncontrado()
                break
            default:
                response.json().then(funcionario => this.view.exibirFuncionario(funcionario))
        }
    }

    carregarFuncionarioPorId(id) { buscarFuncionarioPorId(id).then(funcionario => this._trataResponse(funcionario)) }

    carregarFuncionarioPorNome(nome) { buscarFuncionarioPorNome(nome).then(funcionario => this._trataResponsefuncionario(funcionario)) }

}