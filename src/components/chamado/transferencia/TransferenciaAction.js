export const FILTRO_TRANSFERENCIA_PENDENTE = 'FILTRO_TRANSFERENCIA_PENDENTE'
export const FILTRO_TRANSFERENCIA = 'FILTRO_TRANSFERENCIA'

export function filtrarTransferenciaPendente(transferencia) {
    return {
        type: FILTRO_TRANSFERENCIA_PENDENTE,
        payload: transferencia
    }
}

export function filtrarTransferencia(transferencia) {
    return {
        type: FILTRO_TRANSFERENCIA,
        payload: transferencia
    }
}
