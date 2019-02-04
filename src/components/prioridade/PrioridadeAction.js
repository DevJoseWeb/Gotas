export const FILTRO_PRIORIDADE = 'FILTRO_PRIORIDADE'
export const FILTRO_PRIORIDADE_NAO_ENCONTRADA = 'FILTRO_PRIORIDADE_NAO_ENCONTRADA'

export function filtrarPrioridade(prioridade) {
    return {
        type: FILTRO_PRIORIDADE,
        payload: prioridade
    }
}

export function exibirPrioridadeNaoEncontrada(){
    return {
        type: FILTRO_PRIORIDADE_NAO_ENCONTRADA
    }
}