import {URL_BASE} from "../../base"
import decode from 'jwt-decode'

export const USUARIO_LOGOUT = 'USUARIO_LOGOUT'
export const USUARIO_ENCONTRADO = 'USUARIO_ENCONTRADO'

export function usuarioLogado(user) {
    return {
        type: USUARIO_ENCONTRADO,
        payload: user
    };
}

export function login(values) {
    return submit(values)
}

function submit(values) {

    return dispatch => {

        return fetch(`${URL_BASE}/login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: values
        })
            .then(response => {

                if (!response.ok) {
                    throw Error(response.status)
                }
                let user = decode(response.headers.get("authorization"))
                user["token"] = response.headers.get("authorization")
                dispatch(usuarioLogado(user))
                return true
            })
            .catch(error => console.log(error))
    }
}

export function logout() {
    return { type: USUARIO_LOGOUT, payload: true }
}