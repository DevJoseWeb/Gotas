import {OPERACAO_ATENDIMENTO} from "../base"

export function classNameOperacao(operacao) {
    switch (operacao) {
        case OPERACAO_ATENDIMENTO.ANDAMENTO:
            return 'label label-success'
        case OPERACAO_ATENDIMENTO.ANEXO_ARQUIVO:
            return 'label label-info'
        case OPERACAO_ATENDIMENTO.CANCELADA:
            return 'label label-danger'
        case OPERACAO_ATENDIMENTO.CONCLUSAO:
            return 'label mylabel-success'
        case OPERACAO_ATENDIMENTO.EM_ANALISE:
            return 'label label-warning'
        case OPERACAO_ATENDIMENTO.MODIFICACAO_CHAMADO:
            return 'label mylabel-secondary'
        case OPERACAO_ATENDIMENTO.PAUSA:
            return 'label mylabel-pausa'
        case OPERACAO_ATENDIMENTO.PREVISAO:
            return 'label mylabel-warning'
        case OPERACAO_ATENDIMENTO.REINICIO:
            return 'label mylabel-reinicio'
        default:
            return ''
    }
}

export function formatName(name, almostActivated) {
    let nome = name.split(" ");
    let firstName = nome[0];
    let lastName = nome[nome.length-1]; 
    let fullName = firstName + " " + lastName;
    let almostName = firstName + " " + lastName.substring(0, 1) + ".";

    if (almostName.length > 15) { almostName = firstName }
    if (almostActivated === true) { 
        return ((fullName.length <= 15) ? fullName : almostName) 
    } else { 
        return fullName 
    }
}

export function tratamentoPromise(response) {
    if (response.content) return response
    else if ((response) && (response.totalPages !== 0)) return response;
    else return [];
}