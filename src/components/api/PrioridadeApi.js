import { URL_BASE, URL_ENDPOINT_PRIORIDADE } from '../../base'
import { headers } from "../../utils/apiUtils"

export const buscarPrioridadePorId = (id) => {
    return fetch(`${URL_BASE}/${URL_ENDPOINT_PRIORIDADE}/${id}`, {headers})
            .then(response => response)
}

export const buscarPrioridadePorNome = (nome) => {
    let url = new URL(`${URL_BASE}/${URL_ENDPOINT_PRIORIDADE}`)
    let params = { nome }
    url.search = new URLSearchParams(params)
    return fetch(url, { headers })
            .then(response => response)
}