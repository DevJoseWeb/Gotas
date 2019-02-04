import { FILTRO_CLIENTE, FILTRO_TELEFONE_CLIENTE, FILTRO_CLIENTE_NAO_ENCONTRADO, FILTRO_EMAIL_CLIENTE } from './ClienteAction';

const INITIAL_STATE = {
    lista: [],
    telefones: [],
    clienteNaoEncontrado: false,
    email: [],
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case FILTRO_CLIENTE:
            return { ...state, lista: action.payload, clienteNaoEncontrado: false }
        case FILTRO_TELEFONE_CLIENTE:
            return { ...state, telefones: action.payload, clienteNaoEncontrado: false }
        case FILTRO_CLIENTE_NAO_ENCONTRADO:
            return { ...state, telefones: [], lista: [], clienteNaoEncontrado: true }
        case FILTRO_EMAIL_CLIENTE:
            return { ...state, email: action.payload }
        default:
            return state
    }
}