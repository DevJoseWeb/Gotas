import {
    TEMPO_CACHE_CONSULTAS,
    URL_BASE,
    URL_ENDPOINT_CHAMADO,
    URL_ENDPOINT_CHAMADO_ANDAMENTOS,
    URL_ENDPOINT_CHAMADO_FEEDBACK,
    URL_ENDPOINT_CHAMADO_ATUACAO,
    URL_ENDPOINT_CATEGORIA_TEMPLATE_ANDAMENTO,
    URL_ENDPOINT_TEMPLATE_ANDAMENTO,
    URL_ENDPOINT_STATUS,
    URL_ENDPOINT_TIPO,
    URL_ENDPOINT_CHAMADO_TRANSFERENCIA,
    URL_ENDPOINT_CHAMADO_TRANSFERENCIA_SEGUINDO, URL_ENDPOINT_CLIENTE
} from '../../base'

import {
    headers
} from '../../utils/apiUtils'

export const buscarChamadoPorId = (id) => {
    return fetch(`${URL_BASE}/${URL_ENDPOINT_CHAMADO}/${id}`, {
            headers
        })
        .then(response => response)
}

export const adicionarAnexoArquivoChamado = (id, file) => {
    let data = new FormData()
    data.append('arquivo', file)

    return fetch(`${URL_BASE}/${URL_ENDPOINT_CHAMADO}/${id}/anexo`, {
            method: 'POST',
            body: data
        })
        .then(response => response)
        .catch(error => console.log(error))
}

export const deletarAnexoChamado = (id, anexoList) => {

    return fetch(`${URL_BASE}/${URL_ENDPOINT_CHAMADO}/${id}/anexo`, {
        method: 'DELETE',
        body: JSON.stringify(anexoList),
        headers
    })
        .then(response => response)
}

export const buscarAnexoChamado = (id) => {

    return fetch(`${URL_BASE}/${URL_ENDPOINT_CHAMADO}/${id}/anexo`, {
            headers
        })
        .then(response => response)
};

export const buscarChamadoPorFiltroAvancado = (filtro) => {
    //headers["expiry"] = TEMPO_CACHE_CONSULTAS
    return fetch(`${URL_BASE}/${URL_ENDPOINT_CHAMADO}?${filtro}`, {
            headers
        })
        .then(response => response)
};

/* ========== */
export const buscarAndamentosDoChamado = (idChamado, pagina = 0) => {
    //headers["expiry"] = TEMPO_CACHE_CONSULTAS
    let url = new URL(`${URL_BASE}/${URL_ENDPOINT_CHAMADO}/${idChamado}/${URL_ENDPOINT_CHAMADO_ANDAMENTOS}`)
    let params = {
        pagina
    }
    url.search = new URLSearchParams(params);

    return fetch(url, {
            headers
        })
        .then(response => response)
};

export const buscarFeedbackDoChamado = (idChamado) => {
    return fetch(`${URL_BASE}/${URL_ENDPOINT_CHAMADO}/${idChamado}/${URL_ENDPOINT_CHAMADO_FEEDBACK}`, TEMPO_CACHE_CONSULTAS)
        .then(response => response)
};

export const buscarAtuacoesDoChamado = (idChamado) => {
    return fetch(`${URL_BASE}/${URL_ENDPOINT_CHAMADO}/${idChamado}/${URL_ENDPOINT_CHAMADO_ATUACAO}`, TEMPO_CACHE_CONSULTAS)
        .then(response => response)
};

export const buscarCategoriaTemplateAndamento = () => {
    return fetch(`${URL_BASE}/${URL_ENDPOINT_CATEGORIA_TEMPLATE_ANDAMENTO}`, {
            headers
        })
        .then(response => response)
};

export const buscarTemplateAndamentoPorCategoria = (idCategoria) => {
    return fetch(`${URL_BASE}/${URL_ENDPOINT_CATEGORIA_TEMPLATE_ANDAMENTO}/${idCategoria}/${URL_ENDPOINT_TEMPLATE_ANDAMENTO}`, {
            headers
        })
        .then(response => response)
}

export const buscarStatusChamado = () => {
    return fetch(`${URL_BASE}/${URL_ENDPOINT_STATUS}`, {
            headers
        })
        .then(response => response)
}

export const buscarStatusChamadoPorNome = (nome) => {
    let url = new URL(`${URL_BASE}/${URL_ENDPOINT_STATUS}`)
    let params = {
        nome
    }
    url.search = new URLSearchParams(params)
    return fetch(url, {
            headers
        })
        .then(response => response)
}

export const buscarTipoChamado = () => {
    return fetch(`${URL_BASE}/${URL_ENDPOINT_TIPO}`, {
            headers
        })
        .then(response => response)
}

export const adicionarAndamentoChamado = (idChamado, data) => {
    return fetch(`${URL_BASE}/${URL_ENDPOINT_CHAMADO}/${idChamado}/${URL_ENDPOINT_CHAMADO_ANDAMENTOS}`, {
            method: 'POST',
            headers,
            body: data
        })
        .then(response => response)
        .catch(error => console.log(error))
}

export const adicionarChamado = data => {
    return fetch(`${URL_BASE}/${URL_ENDPOINT_CHAMADO}`, {
            method: 'POST',
            headers,
            body: data
        })
        .then(response => response)
        .catch(error => console.log(error))
}

export const adicionarTransferencia = data => {
    return fetch(`${URL_BASE}/${URL_ENDPOINT_CHAMADO}/${URL_ENDPOINT_CHAMADO_TRANSFERENCIA}`, {
            method: 'POST',
            headers,
            body: data
        })
        .then(response => response)
        .catch(error => console.log(error))
}

export const buscarTransferencias = () => {
    return fetch(`${URL_BASE}/`, {
            headers
        })
        .then(response => response)
}

export const buscaFeedback = (id) => {
    return fetch(`${URL_BASE}/${URL_ENDPOINT_CHAMADO}/${id}/${URL_ENDPOINT_CHAMADO_FEEDBACK}/${URL_ENDPOINT_CHAMADO_TRANSFERENCIA_SEGUINDO}`, {
            headers
        })
        .then(response => response)
}

export const saveFeedback = (id) => {
    return fetch(`${URL_BASE}/${URL_ENDPOINT_CHAMADO}/${id}/${URL_ENDPOINT_CHAMADO_FEEDBACK}`, {
            method: 'POST',
            headers
        })
        .then(response => response)
        .catch(error => console.log(error))
}

export const deleteFeedback = (id) => {
    return fetch(`${URL_BASE}/${URL_ENDPOINT_CHAMADO}/${id}/${URL_ENDPOINT_CHAMADO_FEEDBACK}`, {
            method: 'DELETE',
            headers
        })
        .then(response => response)
        .catch(error => console.log(error))
}

export const buscarClienteComPendencia = (idCliente) => {
    return fetch(`${URL_BASE}/${URL_ENDPOINT_CLIENTE}/${idCliente}`, {headers})
        .then(response => response)
}

export const atualizarChamado = async (data) => {
    return await fetch(`${URL_BASE}/${URL_ENDPOINT_CHAMADO}`, {
            method: 'PATCH',
            headers,
            body: data
        })
}