import { URL_BASE, URL_ENDPOINT_MEIO_CHAMADO } from '../../base'
import {headers} from "../../utils/apiUtils";

export const buscarMeioChamadoPorId = (id) => {
    return fetch(`${URL_BASE}/${URL_ENDPOINT_MEIO_CHAMADO}/${id}`, headers)
            .then(response => response)
}

export const buscarMeioChamadoPorNome = (nome) => {
    let url = new URL(`${URL_BASE}/${URL_ENDPOINT_MEIO_CHAMADO}`)
    let params = {nome}
    url.search = new URLSearchParams(params)
    return fetch(url, {headers})
            .then(response => response)
}