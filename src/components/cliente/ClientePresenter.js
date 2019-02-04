import {
    buscarAtendimentosPorIdCliente,
    buscarChamadosPorIdCliente,
    buscarClientePorId,
    buscarEmailPorIdCliente,
    buscarInteracaoPorIdCliente,
    buscarTelefonePorIdCliente,
    carregarChamadoFiltroAvancadoCliente,
    buscarAtendimentoPorFiltroAvancado,
    buscaSistemaCliente,
    buscarAtendimentoHoje
    
} from '../api/ClienteApi'
import {buscarChamadoPorFiltroAvancado} from "../api/ChamadoApi";

export default class ClientePresenter {

    constructor(view) {
        this.view = view
    }

    _tratarResponseCliente(response) {
        switch (response.status) {
            case 200:
                response.json().then(cliente => this.view.exibirCliente(cliente))
                break
            default:
                response.json().then(error => {
                    console.log(error)
                })
        }
    }

    _tratarResponseTelefone(response) {
        switch (response.status) {
            case 200:
                response.json().then(telefone => this.view.exibeTelefone(telefone))
                break
            default:
                response.json().then(error => {
                    console.log(error)
                })
        }
    }

    _tratarResponseEmail(response) {
        switch (response.status) {
            case 200:
                response.json().then(email => this.view.exibeEmail(email))
                break
            default:
                response.json().then(error => {
                    console.log(error)
                })
        }
    }

    _tratarResponseChamado(response) {
        switch (response.status) {
            case 200:
                response.json().then(chamados => this.view.exibeChamados(chamados))
                break
            default:
                response.json().then(error => {
                    console.log(error)
                })
        }
    }

    _tratarResponseAtendimento(response) {
        switch (response.status) {
            case 200:
                response.json().then(atendimentos => this.view.exibeAtendimentos(atendimentos))
                break
            default:
                response.json().then(error => {
                    console.log(error)
                })
        }
    }

    _tratarResponseInteracao(response) {
        switch (response.status) {
            case 200:
                response.json().then(interacao => this.view.exibeInteracao(interacao))
                break
            default:
                response.json().then(error => {
                    console.log(error)
                })
        }
    }

    _tratarResponseSistemasPorIdCliente(response) {
        switch (response.status) {
            case 200:
                response.json().then(sistema => this.view.exibeSistemaCliente(sistema))
                break
            default:
                response.json().then(error => {
                    console.log(error)
                })
        }
    }

    _tratarResponseAtendimentoHoje(response) {
        switch (response.status) {
            case 200:
                response.json().then(atendimento => this.view.exibeAtendimentoHoje(atendimento))
                break
            default:
                response.json().then(error => {
                    console.log(error)
                })
        }
    }

    carregarTelefonePorIdCliente(id) {
        buscarTelefonePorIdCliente(id)
            .then(response => this._tratarResponseTelefone(response))
    }

    carregarEmailPorIdCliente(id) {
        buscarEmailPorIdCliente(id)
            .then(response => this._tratarResponseEmail(response))
    }

    carregarClientePorId(id) {
        buscarClientePorId(id).then(response => this._tratarResponseCliente(response))
    }

    carregarChamadoPorIdCliente(idCliente) {
        buscarChamadosPorIdCliente(idCliente).then(response => this._tratarResponseChamado(response))
    }

    carregarChamadoFiltroAvancadoCliente(idCliente, filtro) {
        let filtroCliente = filtro + '&cliente='+idCliente
        buscarChamadoPorFiltroAvancado(filtroCliente).then(response => this._tratarResponseChamado(response))
    }

    carregarAtendimentoPorIdCliente(idCliente) {
        buscarAtendimentosPorIdCliente(idCliente).then(response => this._tratarResponseAtendimento(response))
    }

    carregarInteracaoPorIdCliente(idCliente) {
        buscarInteracaoPorIdCliente(idCliente).then(response => this._tratarResponseInteracao(response))
    }


    carregarAtendimentoFiltroAvancadoCliente(idCliente, filtro) {
        buscarAtendimentoPorFiltroAvancado(idCliente, filtro).then(response => this._tratarResponseAtendimento(response))
    }

    carregarSistemasPorIdCliente(idCliente) {
        buscaSistemaCliente(idCliente).then(response => this._tratarResponseSistemasPorIdCliente(response))
    }

    carregarAtendimentoHoje(idCliente) {
        buscarAtendimentoHoje(idCliente).then(response => this._tratarResponseAtendimentoHoje(response))
    }
}