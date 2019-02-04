import {URL_BASE, URL_ENDPOINT_NOTIFICACAO, URL_ENDPOINT_CHAMADO, SITUACAO_NOTIFICACAO} from '../../base'
import {headers} from '../../utils/apiUtils'

export const buscarNotificacao = () => {
    return fetch(`${URL_BASE}/${URL_ENDPOINT_NOTIFICACAO}/?situacao=${SITUACAO_NOTIFICACAO.NAO_VISUALIZADA}&itensPorPagina=10`, {headers}) //return fetch(`${URL_BASE}/${URL_ENDPOINT_NOTIFICACAO}/?situacao=${SITUACAO_NOTIFICACAO.NAO_VISUALIZADA}`, {headers})
        .then(response => response)
}

export const buscarTodasNotificacoes = async (itensPorPagina = 20) => {
    return await fetch(`${URL_BASE}/${URL_ENDPOINT_NOTIFICACAO}/?situacao=${SITUACAO_NOTIFICACAO.TODAS}&itensPorPagina=${itensPorPagina}&orderBy=visualizado&direcao=ASC`, {headers})
}

export const marcarNotificacaoVisualizada = async (id) => {
    return await fetch(`${URL_BASE}/${URL_ENDPOINT_NOTIFICACAO}/${id}`, {
        method: 'PATCH',
        headers
    })
}

export const buscarChamado = (id) => {
    return fetch(`${URL_BASE}/${URL_ENDPOINT_CHAMADO}/${id}`, {headers})
        .then(response => response)
}