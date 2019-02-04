export const CARREGANDO = 'CARREGANDO'
export const FINALIZADO = 'FINALIZADO'


export function exibirLoading() {
    return {
        type: CARREGANDO,
        payload: true
    }
}

export function encerrarLoading(){
    return {
        type: FINALIZADO,
        payload: false
    }
}