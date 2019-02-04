export const FILTRO_ANDAMENTO_CHAMADO = 'FILTRO_ANDAMENTO_CHAMADO'
export const FILTRO_ANDAMENTO_CHAMADO_MAO_ENCONTRADO = 'FILTRO_ANDAMENTO_CHAMADO_MAO_ENCONTRADO'
export const FILTRO_ANDAMENTO_CATEGORIA_TEMPLATE = 'FILTRO_ANDAMENTO_CATEGORIA_TEMPLATE'
export const FILTRO_ANDAMENTO_OPERACAO = 'FILTRO_ANDAMENTO_OPERACAO'
export const FILTRO_ANDAMENTO_TEMPLATE = 'FILTRO_ANDAMENTO_TEMPLATE'
export const CONSULTA_FEEDBACK = 'CONSULTA_FEEDBACK'

export function filtrarAndamento(andamento) {
    return {
        type: FILTRO_ANDAMENTO_CHAMADO,
        payload: andamento
    }
}

export function exibirAndamentoNaoEncontrado() {
    return {
        type: FILTRO_ANDAMENTO_CHAMADO_MAO_ENCONTRADO
    }
}

export function exibirCategoriaTemplateAndamento(categoria) {
    return {
        type: FILTRO_ANDAMENTO_CATEGORIA_TEMPLATE,
        payload: categoria
    }
}

export function exibirOperacaoAndamento(operacao) {
    return {
        type: FILTRO_ANDAMENTO_OPERACAO,
        payload: operacao
    }
}

export function exibirTemplateAndamento(template) {
    return {
        type: FILTRO_ANDAMENTO_TEMPLATE,
        payload: template
    }
}

export function exibirFeedback(feedback) {
    return {
        type: CONSULTA_FEEDBACK,
        payload: feedback
    }
}