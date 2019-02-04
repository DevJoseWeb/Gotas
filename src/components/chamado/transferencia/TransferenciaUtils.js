import {ACAO_TRANSFERENCIA_CHAMADO} from "../../../base";

export function montarObjetoTransferencia(listaTransferencias, justificativa = '', isModal = false) {
    let arr = []
    listaTransferencias.map((item) => {
        let obj = {}
        if (isModal === false) {
            obj["idTransferencia"] = item.id
        } else {
            obj["idTransferencia"] = item.transferencia.idTransferencia
        }
        if (justificativa) {

            obj["situacao"]   = ACAO_TRANSFERENCIA_CHAMADO.Recusar
            obj["justificativa"] = justificativa
        }
        else {
            obj["situacao"] = ACAO_TRANSFERENCIA_CHAMADO.Aceitar
        }

        arr.push(obj)

        return null
    })
    let objeto = {}
    objeto["transferencias"] = arr
    return objeto;
}