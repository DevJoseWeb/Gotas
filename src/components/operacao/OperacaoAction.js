export const FILTRO_OPERACAO = 'FILTRO_OPERACAO'
export const FILTRO_OPERACAO_NAO_ENCONTRADA = 'FILTRO_OPERACAO_NAO_ENCONTRADA'

export function filtrarOperacao(operacao) {
    return {
        type: FILTRO_OPERACAO,
        payload: operacao
    }
}

export function exibirOperacaoNaoEncontrada(){
    return {
        type: FILTRO_OPERACAO_NAO_ENCONTRADA
    }
}