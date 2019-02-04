export const FILTRO_EXISTE_PENDENCIA = 'FILTRO_EXISTE_PENDENCIA';
export const FILTRO_PENDENCIA_SETOR = 'FILTRO_PENDENCIA_SETOR';

export function buscarExistenciPendencia(pendencia) {
    return {
        type: FILTRO_EXISTE_PENDENCIA,
        payload: pendencia
    }
}

export function buscarPendencia(pendencia) {
    return {
        type: FILTRO_PENDENCIA_SETOR,
        payload: pendencia
    }
}