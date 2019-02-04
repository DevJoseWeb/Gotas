import { FILTRO_VERSAOSISTEMA, FILTRO_VERSAOSISTEMA_NAO_ENCONTRADO  } from './VersaoSistemaAction'

const INITIAL_STATE = {
    lista: [],
    versaoSistemaNaoEncontrado: false
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case FILTRO_VERSAOSISTEMA:
            return { ...state, lista: action.payload, versaoSistemaNaoEncontrado: false}
        case FILTRO_VERSAOSISTEMA_NAO_ENCONTRADO:
            return { ...state, versaoSistemaNaoEncontrado: true, lista: [] }
        default:
            return state
    }
}

