import { FILTRO_MEIO_CHAMADO, FILTRO_MEIO_CHAMADO_NAO_ENCONTRADO } from "./MeiochamadoAction";

const INITIAL_STATE = {
    lista: [],
    meioChamadoNaoEncontrado: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FILTRO_MEIO_CHAMADO:
            return { ...state, lista: action.payload, meioChamadoNaoEncontrado: false }
        case FILTRO_MEIO_CHAMADO_NAO_ENCONTRADO:
            return { ...state, meioChamadoNaoEncontrado: true, lista: [] }
        default:
            return state
    }
        
}