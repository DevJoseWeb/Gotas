import {
    FILTRO_ANDAMENTO_CATEGORIA_TEMPLATE,
    FILTRO_ANDAMENTO_CHAMADO,
    FILTRO_ANDAMENTO_CHAMADO_MAO_ENCONTRADO, FILTRO_ANDAMENTO_OPERACAO, FILTRO_ANDAMENTO_TEMPLATE,
    CONSULTA_FEEDBACK
} from '../andamento/AndamentoAction'

const INITIAL_STATE = {
    lista: [],
    listaCategoriaTemplate: [],
    listaTemplate: [],
    listaOperacao: [],
    andamentoNaoEncontrado: false,
    feedback: false
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case FILTRO_ANDAMENTO_CHAMADO:
            return { ...state, lista: action.payload, andamentoNaoEncontrado: false }
        case FILTRO_ANDAMENTO_CHAMADO_MAO_ENCONTRADO:
            return { ...state, andamentoNaoEncontrado: true, lista: [] }
        case FILTRO_ANDAMENTO_CATEGORIA_TEMPLATE:
            return { ...state, listaCategoriaTemplate: action.payload, listaTemplate: [] }
        case FILTRO_ANDAMENTO_OPERACAO:
            return { ...state, listaOperacao: action.payload }
        case FILTRO_ANDAMENTO_TEMPLATE:
            return { ...state, listaTemplate: action.payload }
        case CONSULTA_FEEDBACK:
            return { ...state, feedback: action.payload }
        default:
            return state
    }
}