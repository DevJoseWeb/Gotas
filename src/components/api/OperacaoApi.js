import { URL_BASE, URL_ENDPOINT_OPERACAO } from '../../base'
import {headers} from "../../utils/apiUtils";

export const buscarOperacoes = () => {
    return fetch(`${URL_BASE}/${URL_ENDPOINT_OPERACAO}`, {headers})
            .then(response => response)
}

export const buscarOperacaoPorId = (id) => {
    return fetch(`${URL_BASE}/${URL_ENDPOINT_OPERACAO}/${id}`, {headers})
            .then(response => response)
}

export const buscarOperacaoPorNome = (nome) => {
    let url = new URL(`${URL_BASE}/${URL_ENDPOINT_OPERACAO}`)
    let params = { nome }
    url.search = new URLSearchParams(params)
    return fetch(url, {headers})
            .then(response => response)
}