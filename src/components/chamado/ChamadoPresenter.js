import {
    adicionarAnexoArquivoChamado,
    adicionarChamado, buscarAnexoChamado,
    buscarChamadoPorFiltroAvancado, buscarChamadoPorId,
    buscarStatusChamado,
    buscarTipoChamado,
    deletarAnexoChamado,
    buscarClienteComPendencia,
    atualizarChamado,
} from '../api/ChamadoApi'

import {buscarOperacoes} from "../api/OperacaoApi"
import {buscarMeioChamadoPorNome} from "../api/MeioChamadoApi"
import {buscarPrioridadePorNome} from "../api/PrioridadeApi"
import {buscarSistemaPorNome} from "../api/SistemaApi"
import {buscarVersaoSistemaPorNome} from "../api/VersaoSistemaApi"
import {OPERACAO_CHAMADO_PENDENTE} from "../../base"

import imageDownload from '../../commom/template/include/img/download_file_orange.png'

import { tratamentoPromise } from '../../utils/utils';

export default class ChamadoPresenter {

    constructor(view) {
        this.view = view
    }

    _tratarResponseMeio(response) {
        switch (response.status) {
            case 204:
                this.view.exibirMensagemNaoEncontrado()
                break
            default:
                response.json().then(meio => this.view.exibirMeio(meio))
        }
    }

    _tratarResponsePrioridade(response){
        switch (response.status) {
            case 204:
                this.view.exibirMensagemNaoEncontrado()
                break
            default:
                response.json().then(prioridade => this.view.exibirPrioridade(prioridade))
        }
    }

    _tratarResponseSistema(response) {
        switch (response.status) {
            case 204:
                this.view.exibirMensagemNaoEncontrado()
                break
            default:
                response.json().then(sistema => this.view.exibirSistema(sistema))
        }
    }

    _tratarResponseStatus(response) {
        switch (response.status) {
            case 204:
                this.view.exibirMensagemNaoEncontrado()
                break
            default:
                response.json().then(status => this.view.exibirStatus(status))
        }
    }

    _tratarResponseTipo(response) {
        switch (response.status) {
            case 204:
                this.view.exibirMensagemNaoEncontrado()
                break
            default:
                response.json().then(tipo => this.view.exibirTipo(tipo))
        }
    }

    _tratarResponseVersao(response) {
        switch (response.status) {
            case 204:
                this.view.exibirMensagemNaoEncontrado()
                break
            default:
                response.json().then(versao => this.view.exibirVersao(versao))
        }
    }

    _tratarResponseChamado(response) {
        switch (response.status) {
            case 400:
                response.json().then(error => {
                    let arrayErros = []
                    error.erros.map(erro => {
                        if(erro.message.match(/tamanho deve estar entre 5/)) {
                            let objErros = {}
                            objErros["mensagem"] = `Solicitante deve conter entre 5 e 150 caracteres!`
                            arrayErros.push(objErros)
                        }
                        return null
                    })
                    
                    this.view.exibeErrosChamado(arrayErros)

                })
                break
            default:
                this.view.exibirMensagemSucesso()
        }
    }

    _tratarResponseChamadoPendente(response) {
        switch (response.status) {
            case 200:
                response.json().then(chamado => {      
                    this.view.exibirChamadoPendente(tratamentoPromise(chamado))
                })
                break
            case 400:
                response.json().then(error => {
                    console.log(error)
                })
                break
            default:
                response.json().then(error => {
                    console.log(error)
                })

        }
    }

    _tratarResponsePorIdObj(response) {
        switch (response.status) {
            case 200:
                response.json().then(chamado => this.view.exibirChamadoObjeto(chamado))
                break
            case 404:
                this.view.exibirChamadoNaoEncontrado();
                break
            default:
                response.json().then(error => {
                    console.log(error)
                })
        }
    }

    _tratarResponsePorId(response) {
        switch (response.status) {
            case 200:
                response.json().then(chamado => this.view.exibirChamado(new Array(chamado)))
                break
            case 404:
                this.view.exibirChamadoNaoEncontrado();
                break                
            default:
                response.json().then(error => {
                    console.log(error)
                })
        }
    }

    _tratarResponseAnexoChamado(response) {
        switch (response.status) {
            case 404:
                console.log(response)
                break
            default:
                response.json().then(anexos =>{
                    let listaAnexos = []

                    anexos.map(item => {
                        let obj = {}

                        let extensao = item.extensao.match('(\\w*)\\/')

                        if (extensao[1] === 'image') {
                            obj["src"] = item.uri
                            obj["thumbnail"] = item.uri
                            obj["thumbnailWidth"] = 320
                            obj["thumbnailHeight"] = 212
                        } else {
                            obj["src"] = imageDownload
                            obj["thumbnail"] = imageDownload
                            obj["caption"] = "Clique para realizar o download"
                            obj["thumbnailWidth"] = 155
                            obj["thumbnailHeight"] = 212
                        }
                        obj["imgName"] = item.nome
                        obj["imgUri"] = item.uri
                        obj["imgExtensao"] = extensao[1]

                        listaAnexos.push(obj)
                        return null
                    })

                    this.view.exibirAnexos(listaAnexos)
                })
        }
    }

    _tratarResponseExclusaoAnexo (response) {
        switch (response.status) {
            case 204:
                this.view.recarregarAnexos();
                break
            default:
                response.json().then(error => {
                    console.log(error)
                })
        }
    }

    _tratarResponseClienteComPendencia(response) {
        switch (response.status) {
            case 200:
                response.json().then(cliente => {
                    this.view.renderPendenciaCliente(cliente.pendenciaFinanceira)
                })
                break
            default:
                response.json().then(error  => {
                    console.log(error)
                })
        }
    }

    _tratarResponseAlterarChamado(response) {
        switch (response.status) {
            case 400:
                response.json().then(error => { console.log('Erro Ao Atualizar') })
                break
            default:
                this.view.exibirMensagemSucesso()
        }
    }

    criarChamado(data) {
        adicionarChamado(data)
            .then(response => this._tratarResponseChamado(response))
            .catch(error => console.log(error.message))
    }

    alterarChamado(data) {
        atualizarChamado(data)
            .then(response => this._tratarResponseAlterarChamado(response))
            .catch(error => console.log(error.message))
    }

    carregarMeioDoChamado(nome = ''){
        buscarMeioChamadoPorNome(nome)
            .then(response => this._tratarResponseMeio(response))
    }

    carregarPrioridadeDoChamado(nome = '') {
        buscarPrioridadePorNome(nome)
            .then(response => this._tratarResponsePrioridade(response))
    }

    carregarSistemaDoChamado(nome = '') {
        buscarSistemaPorNome(nome)
            .then(response => this._tratarResponseSistema(response))
    }

    carregarStatusDoChamado() {
        buscarStatusChamado()
            .then(response => this._tratarResponseStatus(response))
    }

    carregarTipoDoChamado() {
        buscarTipoChamado()
            .then(response => this._tratarResponseTipo(response))
    }

    carregarVersaoSistemaDoChamado(nome = '') {
        buscarVersaoSistemaPorNome(nome)
            .then(response => this._tratarResponseVersao(response))
    }

    carregarChamadoPorId(id) { buscarChamadoPorId(id).then(response => this._tratarResponsePorId(response)) }

    carregarChamadoPorIdObj(id) { buscarChamadoPorId(id).then(response => this._tratarResponsePorIdObj(response)) }

    carregarAnexoChamado(id) {
        buscarAnexoChamado(id)
            .then(response => this._tratarResponseAnexoChamado(response))
    }

    excluirAnexoChamado(id, anexoList) {
        let obj = {}
        obj["filenames"] = anexoList;
        deletarAnexoChamado(id, obj)
            .then(response => this._tratarResponseExclusaoAnexo(response))
    }

    verificarClienteComPendencia(idCliente) {
        buscarClienteComPendencia(idCliente)
            .then(response => this._tratarResponseClienteComPendencia(response))
    }

}