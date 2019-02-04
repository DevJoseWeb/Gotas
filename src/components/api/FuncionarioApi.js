import { URL_BASE, URL_ENDPOINT_FUNCIONARIO } from '../../base'
import {headers} from "../../utils/apiUtils";

export const buscarFuncionarioPorId = (id) => {
    return fetch(`${URL_BASE}/${URL_ENDPOINT_FUNCIONARIO}/${id}`, {headers})
            .then(response => response)
}

export const buscarFuncionarioPorNome = (nome) => {
    let url = new URL(`${URL_BASE}/${URL_ENDPOINT_FUNCIONARIO}`)
    let params = {nome}
    url.search = new URLSearchParams(params)
    return fetch(url, {headers})
            .then(response => response)  
}