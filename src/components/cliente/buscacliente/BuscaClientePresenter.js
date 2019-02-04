import { buscarClientePorId, buscarClientePorNome, buscarClientePorGrupo, buscarClientePorCPF, buscarClientePorCNPJ } from '../../api/ClienteApi'

export default class BuscaClientePresenter {

    constructor(view) {
        this.view = view
    }

    _trataResponse(response) {
        switch (response.status) {
            case 204:
                this.view.exibirMensagemNaoEncontrado()
                break
            default:
                response.json().then(cliente => this.view.exibirCliente(cliente) )  
        }       
    }

    carregarClientePorId(id) { buscarClientePorId(id).then(response => this._trataResponse(response)) }

    carregarClientePorNome(nome) { buscarClientePorNome(nome).then(response => this._trataResponse(response)) }

    carregarClientePorGrupo(grupo) { buscarClientePorGrupo(grupo).then(response => this._trataResponse(response)) }

    carregarClientePorCPF(cpf) { buscarClientePorCPF(cpf).then(response => this._trataResponse(response)) }

    carregarClientePorCNPJ(cnpj) { buscarClientePorCNPJ(cnpj).then(response => this._trataResponse(response)) }

}