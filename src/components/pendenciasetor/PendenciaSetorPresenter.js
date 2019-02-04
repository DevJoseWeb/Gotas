import {adicionarPendenciaSetor, buscarPendenciaSetor, concluirPendenciaSetor, buscarExistePendencia} from "../api/PendenciaApi";
import {tratamentoPromise} from "../../utils/utils";

export default class PendenciaSetorPresenter {

    constructor(view) {
        this.view = view
    }

    _tratarInclusaoPendenciaSetor(response) {
        switch (response.status) {
            case 201:
                this.view.inclusaoComSucesso()
                break
            default:
                response.json().then(error => {
                    console.log(error)
                })
        }
    }

    _tratarConclusaoPendenciaSetor(response) {
        switch (response.status) {
            case 204:
                this.view.concluidoComSucesso()
                break
            default:
                response.json().then(error => {
                    console.log(error)
                })
        }
    }

    _tratarBuscaPendenciaSetor(response) {
        switch (response.status) {
            case 200:
                response.json().then(pendencias => {
                    this.view.exibirPendenciaSetor(tratamentoPromise(pendencias))
                })
                break
            default:
                response.json().then(error => {
                    console.log(error)
                })
        }
    }

    _tratarExistePendencia(response) {
        switch (response.status) {
            case 200:
                response.json().then(pendencias => {
                    this.view.exibirExistePendencia(pendencias)
                })
                break
            default:
                response.json().then(error => {
                    console.log(error)
                })
        }
    }

    criarPendenciaSetor(data) {
        adicionarPendenciaSetor(data)
            .then(response => this._tratarInclusaoPendenciaSetor(response))
            .catch(error => console.log(error))
    }

    finalizarPendenciaSetor(id, data) {
        concluirPendenciaSetor(id, data)
            .then(response => this._tratarConclusaoPendenciaSetor(response))
    }

    carregarPendenciaSetor(filtro,  page = 0, sizePerPage = 10, sorted) {

        var direcao = ''
        var orderBy = ''

        if (sorted) {
            direcao = sorted.map(d => (d.desc ? "DESC" : "ASC"))
            orderBy = sorted.map(sort => typeof sort.id === "string" ? sort.id.toLowerCase() : sort.id)
        }

        let filtroPaginado = filtro + `&pagina=${page}&itensPorPagina=${sizePerPage}&direcao=${direcao}&orderby=${orderBy}`

        buscarPendenciaSetor(filtroPaginado)
            .then(response => this._tratarBuscaPendenciaSetor(response))
    }

    carregaExistePendencia() {
        buscarExistePendencia()
            .then(response => this._tratarExistePendencia(response))
    }
 
}