import {URL_BASE, URL_ENDPOINT_CHAMADO_TRANSFERENCIA, URL_ENDPOINT_CHAMADO, URL_ENDPOINT_CHAMADO_TRANSFERENCIA_PENDENTE} from '../../base'
import {headers} from "../../utils/apiUtils";

export const buscarTransferenciaPendente = () => {
    return fetch(`${URL_BASE}/${URL_ENDPOINT_CHAMADO}/${URL_ENDPOINT_CHAMADO_TRANSFERENCIA}/${URL_ENDPOINT_CHAMADO_TRANSFERENCIA_PENDENTE}`, {headers})
        .then(response => response)
}

export const adicionarAtualizacaoTransferencia = (data) => {
    return fetch(`${URL_BASE}/${URL_ENDPOINT_CHAMADO}/${URL_ENDPOINT_CHAMADO_TRANSFERENCIA}`, {
        method: 'PATCH',
        headers,
        body: data
    })
        .then(response => response)
        .catch(error => console.log(error))
}

export const buscarTransferenciaChamado = (chamado) => {
    return fetch(`${URL_BASE}/${URL_ENDPOINT_CHAMADO}/${chamado}/${URL_ENDPOINT_CHAMADO_TRANSFERENCIA}`, {headers})
        .then(response => response)
}