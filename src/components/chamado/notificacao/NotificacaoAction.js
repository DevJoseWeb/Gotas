export const FILTRO_NOTIFICACAO = 'FILTRO_NOTIFICACAO'
export const LOAD_CHAMADOS = 'LOAD_CHAMADOS'
export const FILTRO_TODAS_NOTIFICACOES = 'FILTRO_TODAS_NOTIFICACOES'

export function filtrarNotificacao(notificacao) {
    return {
        type: FILTRO_NOTIFICACAO,
        payload: notificacao
    }
}

export function loadChamados(chamado) {
    return {
        type: LOAD_CHAMADOS,
        payload: chamado
    }
}

export function buscarTodasNotificacoes(notificacoes) {
    return {
        type: FILTRO_TODAS_NOTIFICACOES,
        payload: notificacoes
    }
}