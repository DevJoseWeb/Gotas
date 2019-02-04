import { buscarSetorPorIdCached, buscarSetorPorNomeCached } from '../../api/SetorApi'

export default class BuscaSetorPresenter {

    constructor(view) {
        this.view = view
    }

    _tratarResponse(response){
        switch(response.status) {
            case 200:
                response.json().then(setor => this.view.exibeSetor(setor))
                break
            case 204:
                this.view.exibirMensagemNaoEncontrado()                
                break
            case 404:
                this.view.exibirMensagemNaoEncontrado()                               
                break                
            default:
                response.json().then(error => console.log(error))
                break
        }
    }

    carregarSetorPorId(id) { buscarSetorPorIdCached(id).then(response => this._tratarResponse(response)) }

    carregarSetorPorNome(nome = '') { buscarSetorPorNomeCached(nome).then(response => this._tratarResponse(response))}
    
}