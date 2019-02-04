export const FILTRO_CLIENTE = 'FILTRO_CLIENTE'
export const FILTRO_TELEFONE_CLIENTE = 'FILTRO_TELEFONE_CLIENTE'
export const FILTRO_CLIENTE_NAO_ENCONTRADO = 'FILTRO_CLIENTE_NAO_ENCONTRADO'
export const FILTRO_EMAIL_CLIENTE = 'FILTRO_EMAIL_CLIENTE'

export function filtrarCliente(cliente) {
    return {
        type: FILTRO_CLIENTE,
        payload: cliente
    }
}

export function filtrarTelefoneCliente(telefone) {
    return {
        type: FILTRO_TELEFONE_CLIENTE,
        payload: telefone
    }
}

export function exibirClienteNaoEncontrado() {
    return {
        type: FILTRO_CLIENTE_NAO_ENCONTRADO    
    }
}

export function filtrarEmailCliente(email) {
    return {
        type: FILTRO_EMAIL_CLIENTE,
        payload: email
    }
}
