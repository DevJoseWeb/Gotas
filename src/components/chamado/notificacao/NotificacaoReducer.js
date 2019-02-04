import {FILTRO_NOTIFICACAO, LOAD_CHAMADOS, FILTRO_TODAS_NOTIFICACOES} from "./NotificacaoAction"

const INITIAL_STATE = {
    listaNotificacao: [],
    chamado: [],
    listaTodasNotificacoes: [],
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FILTRO_NOTIFICACAO:
            return { ...state, listaNotificacao: action.payload}
        case LOAD_CHAMADOS:
            return { ...state, chamado: action.payload}
        case FILTRO_TODAS_NOTIFICACOES:
            return { ...state, listaTodasNotificacoes: action.payload}
        default:
            return state
    }
}
