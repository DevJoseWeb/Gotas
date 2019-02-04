export const FILTRO_VERSAOSISTEMA = 'FILTRO_VERSAOSISTEMA'
export const FILTRO_VERSAOSISTEMA_NAO_ENCONTRADO = 'FILTRO_VERSAOSISTEMA_NAO_ENCONTRADO'

export function filtrarVersaoSistema(versao) {
    return {
        type: FILTRO_VERSAOSISTEMA,
        payload: versao
    }
}

export function exibirVersaoSistemaNaoEncontrado(){
    return {
        type: FILTRO_VERSAOSISTEMA_NAO_ENCONTRADO
    }
}