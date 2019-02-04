import {
    MODO_PESQUISA_CLIENTE,
    URL_BASE, URL_ENDPOINT_ATENDIMENTO, URL_ENDPOINT_CHAMADO,
    URL_ENDPOINT_CLIENTE,
    URL_ENDPOINT_CLIENTE_EMAIL, URL_ENDPOINT_CLIENTE_INTEREACAO,
    URL_ENDPOINT_CLIENTE_TELEFONE,
    URL_ENDPOINT_SISTEMA,
    URL_ENDPOINT_ATENDIMENTO_HOJE
} from '../../base'
import {headers} from "../../utils/apiUtils"

export const buscarClientePorId = (id) => {
    return fetch(`${URL_BASE}/${URL_ENDPOINT_CLIENTE}/${id}`, {headers})
            .then(response => response)             
}

export const buscarCliente = (paramPesquisa, query) => {
    let url = new URL(`${URL_BASE}/${URL_ENDPOINT_CLIENTE}`)
    let params = {}

    if (paramPesquisa === MODO_PESQUISA_CLIENTE.Cnpj) {
        params = {cnpj : query}
    } else if (paramPesquisa === MODO_PESQUISA_CLIENTE.Cpf) {
        params = {cpf: query}
    } else if (paramPesquisa === MODO_PESQUISA_CLIENTE.Nome) {
        params = {nome: query}
    }
    else if (paramPesquisa === MODO_PESQUISA_CLIENTE.Grupo) params = {grupo: query}

    url.search = new URLSearchParams(params)
    return fetch(url, {headers})
        .then((resp) => resp.json())
        .then(items => {

            let cliente = items.content || []

            const options = cliente.map((i) => ({
                nomeFantasia: i.nomeFantasia,
                id: i.id,
                razaoSocial: i.razaoSocial,
                cnpj: i.cnpj
            }));

            let total_count = 10;

            return {options, total_count};
        });

}

export const buscarClientePorCNPJ = (cnpj) => {
    let url = new URL(`${URL_BASE}/${URL_ENDPOINT_CLIENTE}`)
    let params = { cnpj }
    url.search = new URLSearchParams(params)
    return fetch(url, headers)
            .then(response => response)  
}

export const buscarClientePorCPF = (cpf) => {
    let url = new URL(`${URL_BASE}/${URL_ENDPOINT_CLIENTE}`)
    let params = { cpf }
    url.search = new URLSearchParams(params)
    return fetch(url, headers)
            .then(response => response)
}

export const buscarClientePorNome = (nome) => {
    let url = new URL(`${URL_BASE}/${URL_ENDPOINT_CLIENTE}`)    
    let params = { nome }
    url.search = new URLSearchParams(params)
    return fetch(url, headers)
            .then(response => response)
}

export const buscarClientePorGrupo = (grupo) => {
    let url = new URL(`${URL_BASE}/${URL_ENDPOINT_CLIENTE}`)
    let params = { grupo }
    url.search = new URLSearchParams(params)
    return fetch(url)
            .then(response => response)            
}

export const buscarTelefonePorIdCliente = (id) => {
    return fetch(`${URL_BASE}/${URL_ENDPOINT_CLIENTE}/${id}/${URL_ENDPOINT_CLIENTE_TELEFONE}`, {headers})
            .then(response => response)
}

export const buscarEmailPorIdCliente = (id) => {
    return fetch(`${URL_BASE}/${URL_ENDPOINT_CLIENTE}/${id}/${URL_ENDPOINT_CLIENTE_EMAIL}`, {headers})
            .then(response => response)
}

export const buscarChamadosPorIdCliente = (idCliente) => {
    return fetch(`${URL_BASE}/${URL_ENDPOINT_CHAMADO}?cliente=${idCliente}&orderBy=dataHoraAbertura&direcao=DESC`, {headers})
            .then(response => response)
}

export const buscarChamadoFiltroAvancadoCliente = (idCliente, filtro) => {
    return fetch(`${URL_BASE}/${URL_ENDPOINT_CHAMADO}?cliente=${idCliente}&orderBy=dataHoraAbertura&direcao=DESC&${filtro}`, {headers})
        .then(response => response)
}

export const buscarAtendimentosPorIdCliente = (idCliente) => {
    return fetch(`${URL_BASE}/${URL_ENDPOINT_ATENDIMENTO}?cliente=${idCliente}&orderBy=abertura&direcao=DESC`, {headers})
        .then(response => response)
}

export const buscarInteracaoPorIdCliente = (idCliente) => {
    return fetch(`${URL_BASE}/${URL_ENDPOINT_CLIENTE}/${idCliente}/${URL_ENDPOINT_CLIENTE_INTEREACAO}`, {headers})
        .then(response => response)
}

export const buscarAtendimentoPorFiltroAvancado = (idCliente, filtro) => {
    return fetch(`${URL_BASE}/${URL_ENDPOINT_ATENDIMENTO}?cliente=${idCliente}&orderBy=abertura&direcao=DESC&${filtro}`, {headers})
        .then(response => response)
}

export const buscaSistemaCliente = async (id) => {
    return await fetch(`${URL_BASE}/${URL_ENDPOINT_CLIENTE}/${id}/${URL_ENDPOINT_SISTEMA}`, {headers})
}

export const buscarAtendimentoHoje = async (id) => {
    return await fetch(`${URL_BASE}/${URL_ENDPOINT_CLIENTE}/${id}/${URL_ENDPOINT_ATENDIMENTO_HOJE}`, {headers})
}
