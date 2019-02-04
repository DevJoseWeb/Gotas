import { FILTRO_SISTEMA, FILTRO_SISTEMA_NAO_ENCONTRADO } from './SistemaAction'

const INITIAL_STATE = {
    lista: [],
    sistemaNaoEncontrado: false
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case FILTRO_SISTEMA:
            return { ...state, lista: action.payload }
        case FILTRO_SISTEMA_NAO_ENCONTRADO:
            return { ...state, sistemaNaoEncontrado: true, lista: [] }
        default:
            return state
    }
}