import {FILTRO_TRANSFERENCIA, FILTRO_TRANSFERENCIA_PENDENTE} from "./TransferenciaAction"

const INITIAL_STATE = {
    listaTransferenciaPendente: [],
    listaTransferencia: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FILTRO_TRANSFERENCIA_PENDENTE:
            return { ...state, listaTransferenciaPendente: action.payload}
        case FILTRO_TRANSFERENCIA:
            return { ...state, listaTransferencia: action.payload}
        default:
            return state
    }
}