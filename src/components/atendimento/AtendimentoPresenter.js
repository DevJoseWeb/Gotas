import {atualizarAtendimento, buscarTipoAtendimento, criarAtendimento, buscarAtendimento, buscarAtendimentoPorId} from "../api/AtendimentoApi";
import {tratamentoPromise} from "../../utils/utils";

export default class AtendimentoPresenter {

    constructor(view) {
        this.view = view
    }

    _tratarInicioAtendimento(response) {
        switch (response.status) {
            case 201:
                response.json().then(atendimento => this.view.exibeInicioAtendimento(atendimento))
                break
            default:
                response.json().then(error  => {
                    console.log(error)
                })
        }
    }

    _tratarTipoAtendimento(response) {
        switch (response.status) {
            case 200:
                response.json().then(tipoatendimento => this.view.exibeTiposAtendimento(tipoatendimento))
                break
            default:
                response.json().then(error => {
                    console.log(error)
                })
        }
    }

    _tratarFinalizacaoAtendimento(response) {
        switch (response.status) {
            case 204:
                this.view.finalizaAtendimento()
                break
            case 400:
                response.json().then(error => {
                    let arrayErros = []
                    error.erros.map(erro => {

                        if(erro.message.match(/tamanho deve estar entre 5 e 150/)) {
                            let objErros = {}
                            objErros["mensagem"] = `Solicitante deve conter entre 5 e 150 caracteres.`
                            arrayErros.push(objErros)
                        }

                        if(erro.message.match(/não pode ser nulo/)) {
                            let objErros = {}
                            if(erro.fieldName === 'sistemaId') objErros["mensagem"] = `Sistema não pode estar em branco.`
                            if(erro.fieldName === 'tipoAtendimentoId') objErros["mensagem"] = `Tipo de Atendimento não pode estar em branco.`
                            if(erro.fieldName === 'clienteId') objErros["mensagem"] = `Cliente não pode estar em branco.`
                            arrayErros.push(objErros)
                        }

                        if(erro.message.match(/tamanho deve estar entre 5 e 250/)) {
                            let objErros = {}
                            objErros["mensagem"] = `Assunto deve conter entre 5 e 250 caracteres.`
                            arrayErros.push(objErros)
                        }

                        if(erro.message.match(/não pode estar vazio/)) {
                            let objErros = {}
                            objErros["mensagem"] = `E-mail não pode estar em branco.`
                            arrayErros.push(objErros)
                        }

                        if(erro.message.match(/não pode estar em branco/)) {
                            let objErros = {}
                            objErros["mensagem"] = `Texto do Cliente não pode estar em branco.`
                            arrayErros.push(objErros)
                        }

                        return null;
                    })

                    this.view.exibeErrosAtendimento(arrayErros)

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

    _tratarCarregarAtendimento(response) {
        switch (response.status) {
            case 200:
                response.json().then(atendimento => this.view.exibeAtendimentos(tratamentoPromise(atendimento)))
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

    _tratarCarregarAtendimentoPorId(response) {
        switch (response.status) {
            case 200:
                response.json().then(atendimento => this.view.exibeAtendimentos(atendimento))
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


    iniciarAtendimento() {
        criarAtendimento()
            .then(response => this._tratarInicioAtendimento(response))
    }

    carregarTipoAtendimento() {
        buscarTipoAtendimento()
            .then(response => this._tratarTipoAtendimento(response))
    }

    finalizarAtendimento(id, data) {
        atualizarAtendimento(id, data)
            .then(response => this._tratarFinalizacaoAtendimento(response))
    }

    carregarAtendimento(filtro, page = 0, sizePerPage = 10, sorted) {
        var direcao = ''
        var orderBy = ''

        if (sorted) {
            direcao = sorted.map(d => (d.desc ? "DESC" : "ASC"))
            orderBy = sorted.map(sort => typeof sort.id === "string" ? sort.id.toLowerCase() : sort.id)
        }

        let filtroPaginado = filtro + `&pagina=${page}&itensPorPagina=${sizePerPage}&direcao=${direcao}&orderby=${orderBy}`

        buscarAtendimento(filtroPaginado)
            .then(response => this._tratarCarregarAtendimento(response))
    }

    carregarAtendimentoPorId(id) {
        buscarAtendimentoPorId(id)
            .then(response => this._tratarCarregarAtendimento(response))
    }

}