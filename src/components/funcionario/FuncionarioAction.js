export const FILTRO_FUNCIONARIO = 'FILTRO_FUNCIONARIO'  
export const FILTRO_FUNCIONARIO_NAO_ENCONTRADO = 'FILTRO_FUNCIONARIO_NAO_ENCONTRADO'  

export function filtrarFuncionario(funcionario) {
    return {
        type: FILTRO_FUNCIONARIO,
        payload: funcionario
    }
}

export function exibirFuncionarioNaoEncontrado() {
    return {
        type: FILTRO_FUNCIONARIO_NAO_ENCONTRADO    
    }
}