import { URL_BASE, URL_ENDPOINT_SISTEMA } from '../../base'
import {headers} from "../../utils/apiUtils";

export const buscarSistemaPorId = (id) => {
    return fetch(`${URL_BASE}/${URL_ENDPOINT_SISTEMA}/${id}`, {headers})
            .then(response => response)
}

export const buscarSistemaPorNome = (nome) => {
    let url = new URL(`${URL_BASE}/${URL_ENDPOINT_SISTEMA}`)
    let params = { nome }
    url.search = new URLSearchParams(params)
    return fetch(url, {headers})
            .then(response => response)
}