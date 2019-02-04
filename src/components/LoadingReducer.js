import { CARREGANDO, FINALIZADO } from './LoadingAction'

const INITIAL_STATE = {
    isLoading: false
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case CARREGANDO:
            return { ...state, isLoading: true}
        case FINALIZADO:
            return { ...state, isLoading: false}
        default:
            return state
    }
}

