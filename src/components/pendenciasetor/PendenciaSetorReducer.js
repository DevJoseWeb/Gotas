import {
    FILTRO_EXISTE_PENDENCIA,
    FILTRO_PENDENCIA_SETOR,
} from './PendenciaSetorAction'

const INITIAL_STATE = {
    existePendencia: false,
    listPendencia: [],
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case FILTRO_EXISTE_PENDENCIA:
            return { ...state, existePendencia: action.payload }
        case FILTRO_PENDENCIA_SETOR:
            return { ...state, listPendencia: action.payload }
        default:
            return state
    }
}