import {URL_BASE, URL_ENDPOINT_CHAMADO, URL_ENDPOINT_ATUACAO} from '../../base';
import { headers } from '../../utils/apiUtils';

export const buscarAtuacao = async (id) => {
    return await fetch(`${URL_BASE}/${URL_ENDPOINT_CHAMADO}/${id}/${URL_ENDPOINT_ATUACAO}`, {headers})
}

export const saveAtuacao = async (id) => {
    return await fetch(`${URL_BASE}/${URL_ENDPOINT_CHAMADO}/${id}/${URL_ENDPOINT_ATUACAO}`, {
            method: 'POST',
            headers
    })
}

export const deleteAtuacao = async (id) => {
    return await fetch(`${URL_BASE}/${URL_ENDPOINT_CHAMADO}/${id}/${URL_ENDPOINT_ATUACAO}`, {
            method: 'DELETE',
            headers
        })
}