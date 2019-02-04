export const FILTRO_FEEDBACK_CHAMADO = 'FILTRO_FEEDBACK_CHAMADO'

export function filtrarFeedbackChamado(chamado) {
    return {
        type: FILTRO_FEEDBACK_CHAMADO,
        payload: chamado
    }
}