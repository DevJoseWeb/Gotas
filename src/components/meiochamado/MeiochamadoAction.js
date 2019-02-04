export const FILTRO_MEIO_CHAMADO = 'FILTRO_MEIO_CHAMADO'
export const FILTRO_MEIO_CHAMADO_NAO_ENCONTRADO = 'FILTRO_MEIO_CHAMADO_NAO_ENCONTRADO'

export function filtrarMeioChamado(meiochamado) {
    return {
        type: FILTRO_MEIO_CHAMADO,
        payload: meiochamado
    }
}

export function exibirMeioChamadoNaoEncontrado() {
    return {
        type: FILTRO_MEIO_CHAMADO_NAO_ENCONTRADO
    }
}

