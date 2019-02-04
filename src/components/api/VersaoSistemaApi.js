import {URL_BASE, URL_ENDPOINT_VERSAOSISTEMA} from '../../base'

import {headers} from '../../utils/apiUtils'

export const buscarVersaoSistemaPorId = (id) => {
    return fetch(`${URL_BASE}/${URL_ENDPOINT_VERSAOSISTEMA}/${id}`)
            .then(response => response)
}

export const buscarVersaoSistemaPorNome = (nome) => {
    let url = new URL(`${URL_BASE}/${URL_ENDPOINT_VERSAOSISTEMA}`)
    let params = { nome }
    url.search = new URLSearchParams(params)
    return fetch(url, {headers})
            .then(response => response)
}