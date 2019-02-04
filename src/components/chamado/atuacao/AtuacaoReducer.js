import {
    FILTRO_ATUACAO
} from './AtuacaoAction';

const INITIAL_STATE = {
    listaAtuacao: [],
};

export default (state = INITIAL_STATE, action) => { 
    switch(action.type) {
        case FILTRO_ATUACAO:
            return { ...state, listaAtuacao: action.payload }
        default:
            return state
    }
}
