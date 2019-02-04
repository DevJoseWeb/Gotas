import {TEMPO_CACHE_CONSULTAS, URL_BASE, URL_ENDPOINT_SETOR} from '../../base'
import {cachedFetchSession, headers} from '../../utils/apiUtils'

export const buscarSetorPorNomeCached = (nome = '') => {
    headers["expiry"] = TEMPO_CACHE_CONSULTAS
    let url = new URL(`${URL_BASE}/${URL_ENDPOINT_SETOR}`)
    let params = { nome }
    url.search = new URLSearchParams(params)

    return cachedFetchSession(url, {headers})
        .then(response => response)

}

export const buscarSetorPorIdCached = (id) => {
    return cachedFetchSession(`${URL_BASE}/${URL_ENDPOINT_SETOR}/${id}`, TEMPO_CACHE_CONSULTAS)
        .then(response => response)

}

/*setTimeout ( function () {
        buscarSetorPorNomeCached(nome);
}, 200 ); */


