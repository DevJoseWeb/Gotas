import {
    URL_BASE,
    URL_ENDPOINT_CLIENTE,
    URL_ENDPOINT_LIBERACAO,
    URL_ENDPOINT_LIBERACAO_CHAVE
} from "../../base"
import {headers} from "../../utils/apiUtils"

export const executaLiberacaoSistema = async (cliente, filial, idSistema) => {
    return await fetch(`${URL_BASE}/${URL_ENDPOINT_CLIENTE}/${cliente}/${URL_ENDPOINT_LIBERACAO}/${idSistema}/${URL_ENDPOINT_LIBERACAO_CHAVE}/${filial}`, {headers} );
}
