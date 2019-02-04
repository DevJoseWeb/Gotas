import {adicionarTransferencia} from "../../api/ChamadoApi"
import {buscarTransferenciaPendente, adicionarAtualizacaoTransferencia, buscarTransferenciaChamado} from "../../api/TransferenciaApi"

export default class TransferenciaPresenter {

    constructor(view) {
        this.view = view
    }

    _tratarResponseTransferencia(response) {
        switch (response.status) {
            case 204:
                this.view.exibirMensagemSucesso()
                break
            case 400:
                response.json().then(error => {
                    let arrayErros = []
                    error.erros.map(erro => {

                        if(erro.message.match(/Funcionário já é o responsável do chamado/)) {
                            let objErros = {}
                            let id = erro.message.substr((erro.message.search(/Id: /)+3)).trim()
                            objErros["mensagem"] = `Chamado ${id} já se encontra em sua responsabilidade!`
                            arrayErros.push(objErros)
                        }
 
                        if(erro.message.match(/Chamado já transferido/)) {
                            let objErros = {}
                            let id = erro.message.substr((erro.message.search(/Id: /)+3)).trim()
                            objErros["mensagem"] = `Chamado ${id} está com uma transferência pendente!`
                            arrayErros.push(objErros)
                        }
                        return null;
                    })

                    this.view.exibeErrosTransferencia(arrayErros)

                })
                break
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

    _tratarResponseAtualizacaoTransferencia(response) {
        switch (response.status) {
            case 204:
                this.view.exibirMensagemSucesso()
                break
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
                break
        }
    }

    _tratarResponseTransferenciaPendente(response) {
        switch (response.status) {
            case 200:
                response.json().then(transferencias =>
                    this.view.exibirTransferencia(transferencias)
                )
                break
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
                break

        }
    }

    _tratarResponseTransferenciaChamado(response) {
        switch (response.status) {
            case 200:
                response.json().then(transferencias => this.view.exibirTransferencia(transferencias))
                break
            case 401:
                this.view.exibeMensagemUnauthorized()
                break
            case 403:
                this.view.exibeMensagemForbidden()
                break
            case 404:
                response.json().then(error => {
                    console.log(error)
                })
                break
            default:
                response.json().then(error => {
                    console.log(error)
                })
                break
        }
    }

    criarTransferencia(data) {        
        adicionarTransferencia(data)
        .then(response => this._tratarResponseTransferencia(response))
        .catch(error => console.log(error.message))
    }

    carregarTransferenciaPendente(usuario) {
        buscarTransferenciaPendente(usuario)
            .then(response => this._tratarResponseTransferenciaPendente(response))
    }

    atualizarTransferencia(data) {
        adicionarAtualizacaoTransferencia(data)
            .then(response => this._tratarResponseAtualizacaoTransferencia(response))
            .catch(error => console.log(error))
    }

    carregarTransferencia(chamado) {
        buscarTransferenciaChamado(chamado)
            .then(response => this._tratarResponseTransferenciaChamado(response))
    }
}