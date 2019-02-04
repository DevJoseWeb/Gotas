import  { FILTRO_PRIORIDADE, FILTRO_PRIORIDADE_NAO_ENCONTRADA } from './PrioridadeAction'

const INITIAL_STATE = {
    lista: [],
    prioridadeNaoEncontrada: false
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case FILTRO_PRIORIDADE: 
            return { ...state, lista: action.payload }
        case FILTRO_PRIORIDADE_NAO_ENCONTRADA:
            return { ...state, prioridadeNaoEncontrada: true, lista: [] }
        default:
            return state
    }
}