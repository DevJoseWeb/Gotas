import {URL_BASE, URL_ENDPOINT_ATENDIMENTO, URL_ENDPOINT_TIPO_ATENDIMENTO} from '../../base'
import { headers } from '../../utils/apiUtils'

export const buscarAtendimento = async (filtro) => {
    return await fetch(`${URL_BASE}/${URL_ENDPOINT_ATENDIMENTO}?${filtro}`, {headers})
}

export const buscarAtendimentoPorId = async (id) => {
    return await fetch(`${URL_BASE}/${URL_ENDPOINT_ATENDIMENTO}/${id}`, {headers})
}

export const criarAtendimento = () => {
    return fetch(`${URL_BASE}/${URL_ENDPOINT_ATENDIMENTO}`, {
        method: 'POST',
        headers
    })
        .then(response => response)
        .catch(error => console.log(''))
}

export const buscarTipoAtendimento = () => {
    return fetch(`${URL_BASE}/${URL_ENDPOINT_TIPO_ATENDIMENTO}`, {headers})
        .then(response => response)
}

export const atualizarAtendimento = (id, data) => {
    return fetch(`${URL_BASE}/${URL_ENDPOINT_ATENDIMENTO}/${id}`,{
        method: 'PUT',
        headers,
        body: JSON.stringify(data)
    })
        .then(response => response)
}

