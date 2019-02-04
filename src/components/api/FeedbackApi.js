import {
    URL_BASE,
    URL_ENDPOINT_CHAMADO,
    URL_ENDPOINT_CHAMADO_ANDAMENTOS,
    URL_ENDPOINT_CHAMADO_FEEDBACK
} from "../../base"
import {headers} from "../../utils/apiUtils"

export const buscarFuncionarioFeedbackChamado = (chamado) => {

    return fetch(`${URL_BASE}/${URL_ENDPOINT_CHAMADO}/${chamado}/${URL_ENDPOINT_CHAMADO_FEEDBACK}`, {headers} )
        .then(response => response)
}

export const deletarFuncionarioFeedbackChamado = (chamado) => {

    return fetch(`${URL_BASE}/${URL_ENDPOINT_CHAMADO}/${chamado}/${URL_ENDPOINT_CHAMADO_FEEDBACK}`,{
        method: 'DELETE',
        headers
    })
        .then(response => response)
}

export const inserirFuncionarioFeedbackChamado = (chamado) => {

    return fetch(`${URL_BASE}/${URL_ENDPOINT_CHAMADO}/${chamado}/${URL_ENDPOINT_CHAMADO_FEEDBACK}`,{
        method: 'POST',
        headers
    })
        .then(response => response)
}

