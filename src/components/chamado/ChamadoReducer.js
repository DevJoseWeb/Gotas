import {
    FILTRO_CHAMADO,
    FILTRO_CHAMADO_MEIO,
    FILTRO_CHAMADO_NAO_ENCONTRADO,
    FILTRO_CHAMADO_OPERACAO,
    FILTRO_CHAMADO_PRIORIDADE,
    FILTRO_CHAMADO_SISTEMA,
    FILTRO_CHAMADO_STATUS,
    FILTRO_CHAMADO_TIPO, FILTRO_CHAMADO_VERSAO,
    FILTRO_CHAMADO_PENDENTE
} from './ChamadoAction'

const INITIAL_STATE = {
    lista: [],
    listaOperacao: [],
    listaMeio: [],
    listaPrioridade: [],
    listaSistema: [],
    listaStatus: [],
    listaTipo: [],
    listaVersao: [],
    listaChamado: [],
    chamadoNaoEncontrado: false
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case FILTRO_CHAMADO:
            return { ...state, listaChamado: action.payload, chamadoNaoEncontrado: false }
        case FILTRO_CHAMADO_NAO_ENCONTRADO:
            return { ...state, chamadoNaoEncontrado: true, listaChamado: [] }
        case FILTRO_CHAMADO_OPERACAO:
            return { ...state, listaOperacao: action.payload }
        case FILTRO_CHAMADO_MEIO:
            return { ...state, listaMeio: action.payload}
        case FILTRO_CHAMADO_PRIORIDADE:
            return { ...state, listaPrioridade: action.payload }
        case FILTRO_CHAMADO_SISTEMA:
            return { ...state, listaSistema: action.payload }
        case FILTRO_CHAMADO_STATUS:
            return { ...state, listaStatus: action.payload }
        case FILTRO_CHAMADO_TIPO:
            return { ...state, listaTipo: action.payload }
        case FILTRO_CHAMADO_VERSAO:
            return { ...state, listaVersao: action.payload }
        case FILTRO_CHAMADO_PENDENTE:
            return { ...state, listaChamado: action.payload, chamadoNaoEncontrado: false }
        default:
            return state
    }
}