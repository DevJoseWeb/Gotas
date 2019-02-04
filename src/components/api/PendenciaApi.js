import {URL_BASE, URL_ENDPOINT_PENDENCIA_SETOR, URL_ENDPOINT_EXISTE_PENDENCIA} from '../../base'

import {headers} from "../../utils/apiUtils"

export const adicionarPendenciaSetor = (data) => {

    return fetch(`${URL_BASE}/${URL_ENDPOINT_PENDENCIA_SETOR}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(data)
    })
        .then(response => response)
        .catch(error => console.log(error))
}

export const buscarPendenciaSetor = (filtro) => {

    return fetch(`${URL_BASE}/${URL_ENDPOINT_PENDENCIA_SETOR}?${filtro}`, {
        headers
    })
        .then(response => response)
}

export const concluirPendenciaSetor = (id, data) => {
    return fetch(`${URL_BASE}/${URL_ENDPOINT_PENDENCIA_SETOR}/${id}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify(data)
    })
        .then(response => response)
        .catch(error => console.log(error))
}

export const buscarExistePendencia = async () => {
    return await fetch(`${URL_BASE}/${URL_ENDPOINT_PENDENCIA_SETOR}/${URL_ENDPOINT_EXISTE_PENDENCIA}`, { headers })
}