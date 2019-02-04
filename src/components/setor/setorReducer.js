import { FILTRO_SETOR, FILTRO_SETOR_NAO_ENCONTRADO } from './SetorAction'

const INITIAL_STATE = {
    lista: [],
    setorNaoEncontrado: false
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case FILTRO_SETOR:
            return { ...state, lista: action.payload, setorNaoEncontrado: false }
        case FILTRO_SETOR_NAO_ENCONTRADO:
            return { ...state, setorNaoEncontrado: true, lista: [] }
        default:
            return state
    }
}