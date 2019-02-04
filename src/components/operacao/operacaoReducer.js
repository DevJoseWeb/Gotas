import { FILTRO_OPERACAO, FILTRO_OPERACAO_NAO_ENCONTRADA } from './OperacaoAction'

const INITIAL_STATE = {
    lista: [],
    operacaoNaoEncontrada: false
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case FILTRO_OPERACAO:        
            return { ...state, lista: action.payload }
        case FILTRO_OPERACAO_NAO_ENCONTRADA:
            return { ...state, operacaoNaoEncontrada: true, lista: [] }
        default:
            return state
    }
}