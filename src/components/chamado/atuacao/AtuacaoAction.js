export const FILTRO_ATUACAO = 'FILTRO_ATUACAO'

export function exibirAtuacao(atuacao) {
    return {
        type: FILTRO_ATUACAO,
        payload: atuacao
    }
}
