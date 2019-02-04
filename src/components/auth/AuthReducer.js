import {USUARIO_LOGOUT, USUARIO_ENCONTRADO} from "./AuthAction"
import { userKeyLocalStorage } from '../../base'
import {headers} from "../../utils/apiUtils"

const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem(userKeyLocalStorage))
}

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case USUARIO_LOGOUT:
            if (action.payload) {
                localStorage.removeItem(userKeyLocalStorage)
                return { ...state, user: null}
            }
            break;
        case USUARIO_ENCONTRADO:
            localStorage.setItem(userKeyLocalStorage, JSON.stringify(action.payload))
            headers["Authorization"] = action.payload.token
            return { ...state, user: action.payload}
        default:
            return state
      }
}
