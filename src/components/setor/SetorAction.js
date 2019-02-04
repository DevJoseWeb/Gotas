export const FILTRO_SETOR = 'FILTRO_SETOR'
export const FILTRO_SETOR_NAO_ENCONTRADO = 'FILTRO_SETOR_NAO_ENCONTRADO'

export function filtrarSetor(setor) {
    return {
        type: FILTRO_SETOR,
        payload: setor
    }
}

export function exibirSetorNaoEncontrado(){
    return {
        type: FILTRO_SETOR_NAO_ENCONTRADO
    }
}
