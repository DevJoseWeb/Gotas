import {FILTRO_FEEDBACK_CHAMADO} from './FeedbackAction'

const INITIAL_STATE = {
    listaFeedback: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FILTRO_FEEDBACK_CHAMADO:
            return { ...state, listaFeedback: action.payload}
        default:
            return state
    }
}

