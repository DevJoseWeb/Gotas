export const FILTRO_CHAMADO = 'FILTRO_CHAMADO'
export const FILTRO_CHAMADO_NAO_ENCONTRADO = 'FILTRO_CHAMADO_NAO_ENCONTRADO'
export const FILTRO_CHAMADO_OPERACAO = 'FILTRO_CHAMADO_OPERACAO'
export const FILTRO_CHAMADO_MEIO = 'FILTRO_CHAMADO_MEIO'
export const FILTRO_CHAMADO_PRIORIDADE = 'FILTRO_CHAMADO_PRIORIDADE'
export const FILTRO_CHAMADO_SISTEMA = 'FILTRO_CHAMADO_SISTEMA'
export const FILTRO_CHAMADO_STATUS = 'FILTRO_CHAMADO_STATUS'
export const FILTRO_CHAMADO_TIPO = 'FILTRO_CHAMADO_TIPO'
export const FILTRO_CHAMADO_VERSAO = 'FILTRO_CHAMADO_VERSAO'
export const FILTRO_CHAMADO_PENDENTE = 'FILTRO_CHAMADO_PENDENTE'

export function filtrarChamado(chamado) {
    return {
        type: FILTRO_CHAMADO,
        payload: chamado
    }
}

export function filtrarChamadoPendente(chamado) {
    return {
        type: FILTRO_CHAMADO_PENDENTE,
        payload: chamado
    }
}

export function exibirChamadoNaoEncontrado() {
    return {
        type: FILTRO_CHAMADO_NAO_ENCONTRADO
    }
}

export function exibirOperacaoChamado(operacao) {
    return {
        type: FILTRO_CHAMADO_OPERACAO,
        payload: operacao
    }
}

export function exibirMeioChamado(meio) {
    return {
        type: FILTRO_CHAMADO_MEIO,
        payload: meio
    }
}

export function exibirPrioridade(prioridade) {
    return {
        type: FILTRO_CHAMADO_PRIORIDADE,
        payload: prioridade
    }
}

export function exibirSistema(sistema) {
    return {
        type: FILTRO_CHAMADO_SISTEMA,
        payload: sistema
    }
}

export function exibirStatus(status) {
    return {
        type: FILTRO_CHAMADO_STATUS,
        payload: status
    }
}

export function exibirTipo(tipo) {
    return {
        type: FILTRO_CHAMADO_TIPO,
        payload: tipo
    }
}

export function exibirVersao(versao) {
    return {
        type: FILTRO_CHAMADO_VERSAO,
        payload: versao
    }
}