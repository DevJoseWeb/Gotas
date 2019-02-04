export const FILTRO_SISTEMA = 'FILTRO_SISTEMA'
export const FILTRO_SISTEMA_NAO_ENCONTRADO = 'FILTRO_SISTEMA_NAO_ENCONTRADO'

export function filtrarSistema(sistema) {
    return {
        type: FILTRO_SISTEMA,
        payload: sistema
    }
}

export function exibirSistemaNaoEncontrado(){
    return {
        type: FILTRO_SISTEMA_NAO_ENCONTRADO
    }
}
