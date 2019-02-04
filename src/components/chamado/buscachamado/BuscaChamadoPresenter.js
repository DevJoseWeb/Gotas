import { buscarChamadoPorId, buscarChamadoPorFiltroAvancado } from '../../api/ChamadoApi'
import {OPERACAO_CHAMADO_PENDENTE} from "../../../base";
import {tratamentoPromise} from "../../../utils/utils";

export default class BuscaChamadoPresenter {

    constructor(view) {
        this.view = view
    }

    _tratarResponse(response) {
        switch(response.status) {
            case 200:
                response.json().then(chamado => this.view.exibirChamado(tratamentoPromise(chamado)))
                break
            case 204:
                this.view.exibirMensagemNaoEncontrado()
                break
            case 400:
                this.view.exibirMensagemNaoEncontrado()
                break
            default:
                response.json().then(error => {
                    console.log(error)
                })
        }
    }

    _retornaFiltroChamado(ObjFiltro){

        let filtro = Object.keys(ObjFiltro)
            .map(key => `${key}=${ObjFiltro[key]}`)
            .join("&");

        return filtro;
    }

    carregarChamadoPorId(id) { buscarChamadoPorId(id).then(response => this._tratarResponse(response)) }

    carregarChamadoPorFiltroAvancado(ObjFiltro, idResponsavelPendente = 0, page = 0, sizePerPage = 10, sorted) {

        var direcao = ''
        var orderBy = ''

        if (sorted) {
            direcao = sorted.map(d => (d.desc ? "DESC" : "ASC"))
            orderBy = sorted.map(sort => typeof sort.id === "string" ? sort.id.toLowerCase() : sort.id)
        }

        if (idResponsavelPendente !== 0) {
            ObjFiltro["operacao"] = OPERACAO_CHAMADO_PENDENTE
            ObjFiltro["responsavel"] = idResponsavelPendente
        }

        let filtroPaginado = this._retornaFiltroChamado(ObjFiltro) + `&pagina=${page}&itensPorPagina=${sizePerPage}&direcao=${direcao}&orderby=${orderBy}`

        buscarChamadoPorFiltroAvancado(filtroPaginado).then(response => this._tratarResponse(response))
    }

}