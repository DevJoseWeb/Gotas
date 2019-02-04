import {
    adicionarAndamentoChamado,
    buscarAndamentosDoChamado,
    buscarCategoriaTemplateAndamento,
    buscarTemplateAndamentoPorCategoria,
    saveFeedback,
    buscaFeedback,
    deleteFeedback,
} from '../../api/ChamadoApi'

import { buscarOperacoes } from '../../api/OperacaoApi'

export default class AndamentoPresenter {

    constructor(view) {
        this.view = view
    }

    _tratarResponse(response) {
        switch (response.status) {
            case 204:
                this.view.exibirMensagemNaoEncontrado()
                break
                case 400:
                response.json().then(error => {
                    console.log(error)
                })
                break
            default:
                response.json().then(andamentos => this.view.exibirAndamentos(andamentos))
        }
    }

    _tratarResponseCategoria(response) {
        switch (response.status) {
            case 204:
                this.view.exibirMensagemNaoEncontrado()
                break
            default:
                response.json().then(categoria => this.view.exibirCategoriaTemplate(categoria))
        }
    }

    _tratarResponseTemplate(response) {
        switch (response.status) {
            case 204:
                this.view.exibirMensagemNaoEncontrado()
                break
            default:
                response.json().then(template => this.view.exibirTemplate(template))
        }
    }

    _tratarResponseOperacao(response) {
        switch (response.state) {
            case 204:
                this.view.exibirMensagemNaoEncontrado()
                break
            default:
                response.json().then(operacao => this.view.exibirOperacao(operacao))
        }
    }

    _TratarResponseInclusaoAndamento(response) {
        switch (response.status) {
            case 204:
                this.view.exibirMensagemSucesso()
                break
            case 400:
                response.json().then(error => {

                    let arrayErros = []
                    error.erros.map(erro => {

                        if(erro.message.match(/deve estar no futuro/)) {
                            let objErros = {}
                            objErros["mensagem"] = `A data e hora de previsão não pode ser anterior a data e hora de agora!`
                            arrayErros.push(objErros)
                        }

                        return null
                    })

                    this.view.exibeErrosAndamento(arrayErros)
                })
                break
            default:
                response.json().then(erro => console.log(erro))
        }
    }

    _tratarGravarFeedback(response) {
        switch (response.status) {
            case 204:
                this.view.atualizaFeedback(true)
                break
            default:
                response.json().then(erro => console.log(erro))
        }
    }

    _tratarConsultaFeedback(response) {
        switch (response.status) {
            case 200:
                response.json().then(feedback => this.view.atualizaFeedback(feedback.resultado)) 
                break
            default:
                response.json().then(feedback => console.log(feedback))
        }
    }

    _tratarDeleteFeedback(response) {
        switch (response.status) {
            case 204:
                this.view.atualizaFeedback(false) 
                break
            default:
                response.json().then(feedback => console.log(feedback))
        }
    }
    
    carregarAndamentosDoChamado(idChamado, pagina = 0) {

        buscarAndamentosDoChamado(idChamado, pagina)
            .then(response => {
                this._tratarResponse(response)
            })
    }

    carregarCategoriaTemplateAndamento() {
        buscarCategoriaTemplateAndamento()
            .then(response => this._tratarResponseCategoria(response))
    }

    carregarTemplateAndamentoPorCategoria(idCategoria) {
        buscarTemplateAndamentoPorCategoria(idCategoria)
            .then(response => this._tratarResponseTemplate(response))
    }

    gravarAndamentoDoChamado(idChamado, data) {
        adicionarAndamentoChamado(idChamado, data)
            .then(response => this._TratarResponseInclusaoAndamento(response))
    }

    carregarOperacaoDoAndamento() {
        buscarOperacoes()
            .then(response => this._tratarResponseOperacao(response))
    }

    gravarFeedback(idChamado) {
        saveFeedback(idChamado)
            .then(response => this._tratarGravarFeedback(response))
    }

    consultaFeedback(idChamado) {
        buscaFeedback(idChamado)
            .then(response => this._tratarConsultaFeedback(response))
    }

    cancelarFeedback(idChamado) {
        deleteFeedback(idChamado)
            .then(response => this._tratarDeleteFeedback(response))
    }
    
}