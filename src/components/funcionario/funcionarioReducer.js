import { FILTRO_FUNCIONARIO, FILTRO_FUNCIONARIO_NAO_ENCONTRADO } from "./FuncionarioAction";

const INITIAL_STATE = {
    lista: [],
    funcionarioNaoEncontrado: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FILTRO_FUNCIONARIO:
            return { ...state, lista: action.payload }
        case FILTRO_FUNCIONARIO_NAO_ENCONTRADO:
            return { ...state, funcionarioNaoEncontrado: true, lista: [] }
        default:
            return state
    }
}